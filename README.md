🔍 Source Code Analyzer – Audit-Grade Multi-Language Vulnerability Scanner
Source Code Analyzer is a modular, taint-aware static analysis engine designed to detect high and critical vulnerabilities across real-world Java and non-Java codebases. It blends AST parsing, propagation tracking, and smart regex heuristics to deliver context-rich findings with zero fluff—and full audit clarity.

💡 Key Capabilities
Multi-Language Support
Java (via JavaParser): SQLi, command injection, hardcoded secrets, XXE
JavaScript (regex & taint tracking): XSS, SSRF, open redirect, CSRF
JSP & HTML: inline script sinks, escaping flaws, mixed content
XML: entity injection, unvalidated DTDs, XPath abuse
SQL: unsafe grants, mass deletes, credential exposure
Taint-Aware Vulnerability Detection
Tracks user-controlled data across assignments and method calls
Identifies propagation to dangerous sinks (e.g. innerHTML, new URL, raw SQL)
Honors sanitization logic (DOMPurify, encodeForHTML, prepared statements)
Contextual Precision
Every finding includes file, line, variable, and function scope
Filters known false positives when encoding/validation is detected
Audit-Ready Reporting
Structured ReportEntry format with severity, description, and fix guidance
Exports to HTML, CSV, Markdown, and dashboard-ready JSON
ASCII banners + branded CLI output for memorable developer experience

🚀 Use Cases
Scenario	Benefit
✅ Security Audits	Deep-dive static scan before deployment
🎓 Developer Education	Trace vulnerabilities and showcase remediation
🛠️ CI/CD Integration	Gate builds based on severity thresholds
🧱 Enterprise Compliance	Generate offline reports ready for review boards
🛡️ Why It Stands Out
Fully offline-capable: no remote APIs, no telemetry, no surprises

Designed with audit and branding in mind—structure meets UX

Built to scale: scan large multi-format repos with dynamic taint logic
