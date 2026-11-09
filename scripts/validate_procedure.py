#!/usr/bin/env python3
"""
scripts/validate_procedure.py
Automated validation script for FixWhat? procedure fixtures, schemas, and persistence records.
Uses Python 3 standard library (zero external dependencies).

Audited and Remediated for:
1. JSON syntax and Draft-07 structural schema compliance.
2. Strict duplicate toolId rejection in procedure.requiredTools.
3. Strict sequential phaseIndex verification (0, 1, 2, ...).
4. Strict ISO-8601 calendar date validation on accessDate.
5. Strict HTTP/HTTPS URI regex validation on sourceDocument.url.
6. Strict alphanumeric model identifier format validation on compatibleModels.
7. Strict safety contract consistency:
   - If isBlockingSafetyBarrier == True: hazardLevel != "NONE" and non-empty safetyNotice required.
   - If hazardLevel == "NONE": isBlockingSafetyBarrier must be False and safetyNotice must be None.
8. Explicit explanationOrigin validation ("MANUFACTURER_VERBATIM" vs "DOMAIN_EXPERT_INFERRED").
9. Comprehensive regression test battery asserting rejection of corrupt/adversarial payloads.
10. Multi-fixture validation support (EC680, EC685, MaintenanceHistory).
"""

import json
import os
import sys
import copy
import re
from datetime import datetime
from typing import Any, Dict, List, Tuple

class ValidationError(Exception):
    """Raised when a procedure fixture fails schema or semantic validation."""
    pass

def validate_type(val: Any, expected_type: Any, path: str):
    """Validates that val matches the expected JSON Schema type or union of types."""
    type_map = {
        "string": str,
        "integer": int,
        "number": (int, float),
        "boolean": bool,
        "array": list,
        "object": dict,
        "null": type(None)
    }
    
    if isinstance(expected_type, list):
        valid_py_types = tuple(type_map[t] for t in expected_type)
        if bool in valid_py_types and int not in valid_py_types:
            if not isinstance(val, bool):
                raise ValidationError(f"[{path}] Expected one of {expected_type}, got {type(val).__name__}")
        elif int in valid_py_types and bool not in valid_py_types:
            if isinstance(val, bool) or not isinstance(val, int):
                raise ValidationError(f"[{path}] Expected integer, got {type(val).__name__}")
        elif not isinstance(val, valid_py_types):
            raise ValidationError(f"[{path}] Expected one of {expected_type}, got {type(val).__name__}")
    elif isinstance(expected_type, str):
        py_type = type_map.get(expected_type)
        if py_type is None:
            raise ValidationError(f"[{path}] Unknown schema type: {expected_type}")
        if expected_type == "integer":
            if isinstance(val, bool) or not isinstance(val, int):
                raise ValidationError(f"[{path}] Expected integer, got {type(val).__name__}")
        elif expected_type == "boolean":
            if not isinstance(val, bool):
                raise ValidationError(f"[{path}] Expected boolean, got {type(val).__name__}")
        elif not isinstance(val, py_type):
            raise ValidationError(f"[{path}] Expected {expected_type}, got {type(val).__name__}")

def validate_schema_node(data: Any, schema: Dict[str, Any], path: str = "root"):
    """Recursively validates data against a JSON Schema Draft-07 subset."""
    # Check type
    if "type" in schema:
        validate_type(data, schema["type"], path)
        
    # Check enum
    if "enum" in schema:
        if data not in schema["enum"]:
            raise ValidationError(f"[{path}] Value '{data}' is not in allowed enum {schema['enum']}")
            
    # Check string constraints
    if isinstance(data, str):
        if "minLength" in schema and len(data) < schema["minLength"]:
            raise ValidationError(f"[{path}] String length {len(data)} is shorter than minLength {schema['minLength']}")
        if "pattern" in schema:
            if not re.search(schema["pattern"], data):
                raise ValidationError(f"[{path}] String '{data}' does not match pattern '{schema['pattern']}'")
                
    # Check integer constraints
    if isinstance(data, int) and not isinstance(data, bool):
        if "minimum" in schema and data < schema["minimum"]:
            raise ValidationError(f"[{path}] Integer {data} is less than minimum {schema['minimum']}")

    # Object validation
    if isinstance(data, dict):
        required = schema.get("required", [])
        for req_key in required:
            if req_key not in data:
                raise ValidationError(f"[{path}] Missing required property: '{req_key}'")
                
        properties = schema.get("properties", {})
        additional_allowed = schema.get("additionalProperties", True)
        
        for k, v in data.items():
            if k in properties:
                validate_schema_node(v, properties[k], f"{path}.{k}")
            elif not additional_allowed:
                raise ValidationError(f"[{path}] Disallowed additional property: '{k}'")
                
    # Array validation
    elif isinstance(data, list):
        if "minItems" in schema and len(data) < schema["minItems"]:
            raise ValidationError(f"[{path}] Array has {len(data)} items, minimum required is {schema['minItems']}")
            
        items_schema = schema.get("items")
        if items_schema:
            for idx, item in enumerate(data):
                validate_schema_node(item, items_schema, f"{path}[{idx}]")

def validate_semantic_rules(data: Dict[str, Any]):
    """Enforces high-integrity domain constraints beyond structural schema."""
    procedure = data.get("procedure", {})
    steps = procedure.get("steps", [])
    phases = procedure.get("phases", [])
    tools = procedure.get("requiredTools", [])
    source_doc = data.get("sourceDocument", {})
    appliance = data.get("appliance", {})
    
    # 1. Access Date calendar validity
    access_date_str = source_doc.get("accessDate")
    if access_date_str:
        try:
            datetime.strptime(access_date_str, "%Y-%m-%d")
        except ValueError:
            raise ValidationError(
                f"[sourceDocument.accessDate] '{access_date_str}' is not a valid ISO-8601 calendar date (YYYY-MM-DD)."
            )
            
    # 2. Source URL regex validity
    url_str = source_doc.get("url")
    if url_str:
        if not re.match(r"^https?://[a-zA-Z0-9.-]+(/.*)?$", url_str):
            raise ValidationError(
                f"[sourceDocument.url] '{url_str}' is not a valid HTTP/HTTPS URL."
            )

    # 3. Compatible models identifier validation
    models = appliance.get("compatibleModels", [])
    for idx, model in enumerate(models):
        if not re.match(r"^[A-Z0-9._-]+$", model) or len(model) < 3:
            raise ValidationError(
                f"[appliance.compatibleModels[{idx}]] Model '{model}' is not a valid model identifier."
            )

    # 4. Tool uniqueness in procedure.requiredTools
    seen_tool_ids = set()
    for idx, tool in enumerate(tools):
        t_id = tool.get("toolId")
        if t_id in seen_tool_ids:
            raise ValidationError(
                f"[procedure.requiredTools[{idx}]] Duplicate toolId '{t_id}' declared."
            )
        seen_tool_ids.add(t_id)

    # 5. Phase indices must be strictly sequential starting at 0
    seen_phase_indices = set()
    for expected_p_idx, phase in enumerate(phases):
        actual_p_idx = phase.get("phaseIndex")
        if actual_p_idx != expected_p_idx:
            raise ValidationError(
                f"[procedure.phases[{expected_p_idx}]] Non-sequential phaseIndex: expected {expected_p_idx}, got {actual_p_idx}"
            )
        seen_phase_indices.add(actual_p_idx)

    # 6. Step indices must be strictly sequential starting at 0 and unique
    seen_step_ids = set()
    for expected_idx, step in enumerate(steps):
        actual_idx = step.get("stepIndex")
        if actual_idx != expected_idx:
            raise ValidationError(
                f"[procedure.steps[{expected_idx}].stepIndex] Non-sequential step index: expected {expected_idx}, got {actual_idx}"
            )
        step_id = step.get("stepId")
        if not step_id:
            raise ValidationError(f"[procedure.steps[{expected_idx}]] stepId cannot be empty")
        if step_id in seen_step_ids:
            raise ValidationError(f"[procedure.steps[{expected_idx}]] Duplicate stepId '{step_id}'")
        seen_step_ids.add(step_id)

    # 7. Step phase referencing
    for step in steps:
        p_idx = step.get("phaseIndex")
        if p_idx not in seen_phase_indices:
            raise ValidationError(
                f"[procedure.steps.{step.get('stepId')}] References invalid phaseIndex {p_idx}. Available: {seen_phase_indices}"
            )

    # 8. Step tool referencing
    for step in steps:
        for tool_id in step.get("requiredToolIds", []):
            if tool_id not in seen_tool_ids:
                raise ValidationError(
                    f"[procedure.steps.{step.get('stepId')}] References unknown toolId '{tool_id}'. Registered tools: {seen_tool_ids}"
                )

    # 9. Safety contract consistency
    for step in steps:
        hazard = step.get("hazardLevel")
        safety_notice = step.get("safetyNotice")
        is_blocking = step.get("isBlockingSafetyBarrier")
        
        # Rule A: If blocking barrier is True, hazard cannot be NONE, and safetyNotice cannot be empty
        if is_blocking:
            if hazard == "NONE":
                raise ValidationError(
                    f"[procedure.steps.{step.get('stepId')}] isBlockingSafetyBarrier is True, but hazardLevel is 'NONE'. Blocking barriers require an explicit hazard level."
                )
            if not safety_notice or not isinstance(safety_notice, str) or len(safety_notice.strip()) == 0:
                raise ValidationError(
                    f"[procedure.steps.{step.get('stepId')}] isBlockingSafetyBarrier is True, but 'safetyNotice' is missing or empty."
                )
                
        # Rule B: If hazard is CAUTION or DANGER, safetyNotice cannot be empty
        if hazard in ("CAUTION", "DANGER"):
            if not safety_notice or not isinstance(safety_notice, str) or len(safety_notice.strip()) == 0:
                raise ValidationError(
                    f"[procedure.steps.{step.get('stepId')}] Hazard level is '{hazard}', but 'safetyNotice' is missing or empty."
                )
                
        # Rule C: If hazard is NONE, safetyNotice must be null or empty, and isBlocking must be False
        if hazard == "NONE":
            if safety_notice is not None and len(safety_notice.strip()) > 0:
                raise ValidationError(
                    f"[procedure.steps.{step.get('stepId')}] Hazard level is 'NONE', but 'safetyNotice' contains text. Safety notices require INFO, CAUTION, or DANGER."
                )
            if is_blocking:
                raise ValidationError(
                    f"[procedure.steps.{step.get('stepId')}] Hazard level is 'NONE', but isBlockingSafetyBarrier is True."
                )

    # 10. Source grounding citation integrity
    for step in steps:
        citation = step.get("sourceCitation", {})
        excerpt = citation.get("exactExcerpt", "")
        if not excerpt or len(excerpt.strip()) == 0:
            raise ValidationError(
                f"[procedure.steps.{step.get('stepId')}.sourceCitation] 'exactExcerpt' cannot be empty."
            )
        page = citation.get("pageNumber")
        if not isinstance(page, int) or page <= 0:
            raise ValidationError(
                f"[procedure.steps.{step.get('stepId')}.sourceCitation] 'pageNumber' must be a positive integer, got {page}."
            )

    # 11. Training explanation origin distinction
    for step in steps:
        training = step.get("trainingExplanation", {})
        origin = training.get("explanationOrigin")
        if origin not in ("MANUFACTURER_VERBATIM", "DOMAIN_EXPERT_INFERRED"):
            raise ValidationError(
                f"[procedure.steps.{step.get('stepId')}.trainingExplanation] Invalid explanationOrigin '{origin}'."
            )

def validate_fixture_file(schema_path: str, fixture_path: str) -> Tuple[bool, str]:
    """Validates a single fixture file against the schema and semantic rules."""
    if not os.path.exists(schema_path):
        return False, f"Schema file not found at {schema_path}"
    if not os.path.exists(fixture_path):
        return False, f"Fixture file not found at {fixture_path}"
        
    try:
        with open(schema_path, "r", encoding="utf-8") as f:
            schema = json.load(f)
    except Exception as e:
        return False, f"Failed to parse schema JSON: {e}"
        
    try:
        with open(fixture_path, "r", encoding="utf-8") as f:
            fixture = json.load(f)
    except Exception as e:
        return False, f"Failed to parse fixture JSON: {e}"
        
    try:
        validate_schema_node(fixture, schema)
        validate_semantic_rules(fixture)
    except ValidationError as ve:
        return False, str(ve)
        
    return True, f"Passed structural schema and semantic procedural validation ({len(fixture.get('procedure', {}).get('steps', []))} steps verified)."

def run_regression_tests(schema: Dict[str, Any], valid_fixture: Dict[str, Any]) -> List[Tuple[str, bool, str]]:
    """Runs an expanded battery of negative tests asserting rejection of corrupt and adversarial payloads."""
    results = []
    
    # 1. Missing sourceCitation
    m = copy.deepcopy(valid_fixture)
    del m["procedure"]["steps"][0]["sourceCitation"]
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Missing step sourceCitation", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Missing step sourceCitation", True, f"Caught: {e}"))

    # 2. Non-sequential stepIndex
    m = copy.deepcopy(valid_fixture)
    m["procedure"]["steps"][1]["stepIndex"] = 99
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Non-sequential stepIndex", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Non-sequential stepIndex", True, f"Caught: {e}"))

    # 3. Hazard CAUTION with null safetyNotice
    m = copy.deepcopy(valid_fixture)
    m["procedure"]["steps"][1]["safetyNotice"] = None
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Hazard CAUTION with null safetyNotice", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Hazard CAUTION with null safetyNotice", True, f"Caught: {e}"))

    # 4. Invalid hazardLevel enum
    m = copy.deepcopy(valid_fixture)
    m["procedure"]["steps"][0]["hazardLevel"] = "EXTREME_EXPLOSIVE"
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Invalid hazardLevel enum", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Invalid hazardLevel enum", True, f"Caught: {e}"))

    # 5. Unregistered toolId reference
    m = copy.deepcopy(valid_fixture)
    m["procedure"]["steps"][0]["requiredToolIds"] = ["tool_unregistered_laser"]
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Unregistered toolId reference", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Unregistered toolId reference", True, f"Caught: {e}"))

    # 6. Empty compatibleModels array
    m = copy.deepcopy(valid_fixture)
    m["appliance"]["compatibleModels"] = []
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Empty compatibleModels array", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Empty compatibleModels array", True, f"Caught: {e}"))

    # 7. Disallowed additional property
    m = copy.deepcopy(valid_fixture)
    m["unauthorized_hack"] = True
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Disallowed additionalProperty", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Disallowed additionalProperty", True, f"Caught: {e}"))

    # 8. NEW: Duplicate toolId in procedure.requiredTools
    m = copy.deepcopy(valid_fixture)
    m["procedure"]["requiredTools"].append(copy.deepcopy(m["procedure"]["requiredTools"][0]))
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Duplicate toolId in requiredTools", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Duplicate toolId in requiredTools", True, f"Caught: {e}"))

    # 9. NEW: Non-sequential phaseIndex (0, 3)
    m = copy.deepcopy(valid_fixture)
    m["procedure"]["phases"][1]["phaseIndex"] = 3
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Non-sequential phaseIndex", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Non-sequential phaseIndex", True, f"Caught: {e}"))

    # 10. NEW: Invalid calendar date in accessDate (Feb 31)
    m = copy.deepcopy(valid_fixture)
    m["sourceDocument"]["accessDate"] = "2026-02-31"
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Invalid calendar date (2026-02-31)", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Invalid calendar date (2026-02-31)", True, f"Caught: {e}"))

    # 11. NEW: Malformed URL in sourceDocument.url
    m = copy.deepcopy(valid_fixture)
    m["sourceDocument"]["url"] = "ftp://not-http-url"
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Malformed URL (ftp://)", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Malformed URL (ftp://)", True, f"Caught: {e}"))

    # 12. NEW: Unsupported model identifier pattern (spaces/symbols)
    m = copy.deepcopy(valid_fixture)
    m["appliance"]["compatibleModels"] = ["INVALID MODEL$$#"]
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Unsupported model identifier ('INVALID MODEL$$#')", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Unsupported model identifier ('INVALID MODEL$$#')", True, f"Caught: {e}"))

    # 13. NEW: Blocking barrier is True but hazardLevel is NONE
    m = copy.deepcopy(valid_fixture)
    m["procedure"]["steps"][0]["isBlockingSafetyBarrier"] = True
    m["procedure"]["steps"][0]["hazardLevel"] = "NONE"
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Blocking barrier True but hazardLevel NONE", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Blocking barrier True but hazardLevel NONE", True, f"Caught: {e}"))

    # 14. NEW: Missing explanationOrigin in trainingExplanation
    m = copy.deepcopy(valid_fixture)
    del m["procedure"]["steps"][0]["trainingExplanation"]["explanationOrigin"]
    try:
        validate_schema_node(m, schema); validate_semantic_rules(m)
        results.append(("Missing explanationOrigin in trainingExplanation", False, "Expected failure but passed!"))
    except ValidationError as e:
        results.append(("Missing explanationOrigin in trainingExplanation", True, f"Caught: {e}"))

    return results

def validate_maintenance_record():
    """Validates a sample maintenance history record against MaintenanceHistorySchema.json."""
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    schema_path = os.path.join(repo_root, "data", "schemas", "MaintenanceHistorySchema.json")
    if not os.path.exists(schema_path):
        return False, "MaintenanceHistorySchema.json not found"
        
    with open(schema_path, "r", encoding="utf-8") as f:
        schema = json.load(f)
        
    sample_record = {
        "$schema": "https://fixwhat.dev/schemas/MaintenanceHistorySchema.json",
        "schemaVersion": "1.0.0",
        "recordId": "rec_delonghi_ec680_20261028_01",
        "applianceId": "delonghi_dedica_ec680",
        "procedureId": "proc_delonghi_ec680_descaling",
        "executionMode": "REPAIR",
        "sessionTimestamp": "2026-10-28T13:30:00Z",
        "status": "COMPLETED",
        "stepsCompleted": 10,
        "totalSteps": 10,
        "safetyBarriersAcknowledged": [
            "step_prep_dose_chemical",
            "step_descale_open_valve",
            "step_rinse2_final_flush_and_reset"
        ],
        "completionVerification": {
            "verified": True,
            "userConfirmedSafety": True,
            "notes": "Descaling completed with De'Longhi EcoDecalk. Two clean water flushes executed."
        }
    }
    
    try:
        validate_schema_node(sample_record, schema)
        return True, "Sample maintenance history record conforms strictly to MaintenanceHistorySchema.json."
    except ValidationError as e:
        return False, str(e)

def main():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    schema_path = os.path.join(repo_root, "data", "schemas", "ManualSchema.json")
    remote_fixture_path = os.path.join(repo_root, "data", "procedures", "ge_33709_remote_setup.json")
    wire_fixture_path = os.path.join(repo_root, "data", "procedures", "wire_soldering_splice.json")
    ec680_fixture_path = os.path.join(repo_root, "data", "procedures", "delonghi_ec680_descaling.json")
    ec685_fixture_path = os.path.join(repo_root, "data", "procedures", "delonghi_ec685_descaling.json")
    
    print("=" * 76)
    print("FixWhat? Procedure Data Contract & Multi-Fixture Validation Suite")
    print("=" * 76)
    print(f"Repository Root: {repo_root}")
    print(f"Manual Schema:   {schema_path}")
    print("-" * 76)
    
    # 1. Validate MVP Fixture 1: GE 33709 Universal Remote (Consumer)
    passed_remote, msg_remote = validate_fixture_file(schema_path, remote_fixture_path)
    if passed_remote:
        print(f"\033[92m[PASS]\033[0m Consumer MVP (GE 33709 Remote): {msg_remote}")
    else:
        print(f"\033[91m[FAIL]\033[0m Consumer MVP (GE 33709 Remote): {msg_remote}")
        sys.exit(1)

    # 2. Validate MVP Fixture 2: NASA/Weller Wire Splicing (Workshop)
    passed_wire, msg_wire = validate_fixture_file(schema_path, wire_fixture_path)
    if passed_wire:
        print(f"\033[92m[PASS]\033[0m Workshop MVP (Wire Splicing & Soldering): {msg_wire}")
    else:
        print(f"\033[91m[FAIL]\033[0m Workshop MVP (Wire Splicing & Soldering): {msg_wire}")
        sys.exit(1)

    # 3. Validate Historical Regression: EC680 Fixture
    passed_ec680, msg_ec680 = validate_fixture_file(schema_path, ec680_fixture_path)
    if passed_ec680:
        print(f"\033[92m[PASS]\033[0m Historical Regression (EC680): {msg_ec680}")
    else:
        print(f"\033[91m[FAIL]\033[0m Historical Regression (EC680): {msg_ec680}")
        sys.exit(1)

    # 4. Validate Historical Regression: EC685 Fixture
    passed_ec685, msg_ec685 = validate_fixture_file(schema_path, ec685_fixture_path)
    if passed_ec685:
        print(f"\033[92m[PASS]\033[0m Historical Regression (EC685): {msg_ec685}")
    else:
        print(f"\033[91m[FAIL]\033[0m Historical Regression (EC685): {msg_ec685}")
        sys.exit(1)

    # 5. Validate Maintenance History Schema & Sample
    passed_maint, msg_maint = validate_maintenance_record()
    if passed_maint:
        print(f"\033[92m[PASS]\033[0m Maintenance History: {msg_maint}")
    else:
        print(f"\033[91m[FAIL]\033[0m Maintenance History: {msg_maint}")
        sys.exit(1)
        
    print("-" * 76)
    print("Executing Expanded Negative Regression Suite (14 Corrupt/Adversarial Payloads)...")
    
    with open(schema_path, "r", encoding="utf-8") as f:
        schema = json.load(f)
    with open(ec680_fixture_path, "r", encoding="utf-8") as f:
        fixture = json.load(f)
        
    neg_results = run_regression_tests(schema, fixture)
    all_neg_passed = True
    for test_name, success, detail in neg_results:
        if success:
            print(f"  \033[92m[REJECTED AS EXPECTED]\033[0m {test_name}: {detail}")
        else:
            print(f"  \033[91m[UNEXPECTED SUCCESS]\033[0m   {test_name}: {detail}")
            all_neg_passed = False
            
    print("=" * 76)
    if passed_ec680 and passed_ec685 and passed_maint and all_neg_passed:
        print("\033[92mALL 5 FIXTURE/SCHEMA VALIDATIONS AND 14 NEGATIVE REGRESSION TESTS PASSED CLEANLY.\033[0m")
        sys.exit(0)
    else:
        print("\033[91mONE OR MORE VALIDATION SUITES FAILED.\033[0m")
        sys.exit(1)

if __name__ == "__main__":
    main()
