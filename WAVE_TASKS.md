# SoroGuard — Drips Wave 5 Task Backlog

Welcome to the SoroGuard Drips Wave task backlog! We have prepared a structured list of funded opportunities for contributors. Follow the instructions in [CONTRIBUTING.md](./CONTRIBUTING.md) to apply.

---

## 🟢 Trivial Tasks (100 Points)

### SG-T01: Add Support for Dynamic WASM Export Extraction
* **Description:** Add parsing utility inside `soroguard-engine/src/core` to extract all exported functions and map them to their corresponding WASM byte ranges.
* **Complexity:** Trivial (100 pts)
* **Status:** Open 🚀
* **Files to Edit:**
  * `soroguard-engine/src/core/parser.rs`
  * `soroguard-engine/src/core/types.rs`
* **Acceptance Criteria:**
  * Extracted exports are mapped perfectly with exact WASM start/end offsets.
  * Extracted export JSON structure passes all unit tests.

### SG-T02: Dark Mode Contrast Improvements
* **Description:** Enhance readability of low-contrast elements under dark mode inside the React dashboard.
* **Complexity:** Trivial (100 pts)
* **Status:** Open 🚀
* **Files to Edit:**
  * `soroguard-app/src/index.css`
  * `soroguard-app/src/components/ThemeToggle.tsx`

---

## 🟡 Medium Tasks (150 Points)

### SG-M01: Implement SG-004 Type Verification
* **Description:** Add the static analysis rule `SG-004` to flag unvalidated type-casting when unpacking `Map` or `Vec` objects from Soroban storage.
* **Complexity:** Medium (150 pts)
* **Status:** Open 🚀
* **Files to Edit:**
  * `soroguard-engine/src/detectors/type_validation.rs`
  * `soroguard-engine/src/core/analyzer.rs`
* **Acceptance Criteria:**
  * Detects storage extraction operations and verifies if type constraints are explicitly checked before return.
  * Exposes diagnostic outputs adhering to the SARIF 2.1.0 specification.

---

## 🔴 High Tasks (200 Points)

### SG-H01: Implement SG-005 Cross-Contract Reentrancy Tracker
* **Description:** Code a deep symbolic execution detector `SG-005` to trace calls to external contracts (`invoke_contract`) and flag scenarios where contract storage is mutated *after* the external invocation.
* **Complexity:** High (200 pts)
* **Status:** Open 🚀
* **Files to Edit:**
  * `soroguard-engine/src/detectors/reentrancy.rs`
  * `soroguard-engine/src/core/cfg.rs`
* **Acceptance Criteria:**
  * Reconstructs the Control Flow Graph (CFG) of target WASM files.
  * Correctly identifies reentrancy vulnerabilities with zero false-positives on the `soroguard-fixtures` test suite.
