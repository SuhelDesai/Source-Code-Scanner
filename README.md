# Source Code Scanner



Description

The Source Code Scanner is a modular, audit-ready security scanning platform designed to detect high and critical vulnerabilities across Java and non-Java components in real-world codebases. It combines taint-aware static analysis, AST-driven detection, and regex-based heuristics to deliver precise, context-rich security findings.



💡 Key Capabilities

Multi-Language \& Multi-Format Support, Capable of detecting 50+ source code Vulnerability, Specially Owasp top Vulnerabilities.



Java (AST via JavaParser): SQL injection, command injection, insecure randomness, XXE, hardcoded credentials



JavaScript (Regex \& Taint Tracking): XSS, DOM injection, open redirect, CSRF/SSRF, token leakage



JSP, HTML (Inline Script + Output Escaping): reflected XSS, debug artifacts, mixed content



XML: entity injection, unvalidated DTDs, credential leaks, XPath injection



SQL: grant misuse, unsafe queries, mass deletion, embedded secrets





Taint-Aware Detection



Tracks user-controlled input across assignment chains



Flags propagation to unsafe sinks (innerHTML, SQL queries, new URL, window.location, etc.)



Recognizes sanitization (e.g. encodeForHTML, DOMPurify, prepared statements)



Field \& Function Context



Every finding includes line number, variable name, and function/method scope



Filters false positives when input is safely encoded or validated





Reporting \& Branding



Clean, structured Report Entry format with severity, description, and remediation.



Supports export to HTML, CSV, Markdown.



ASCII banners and branded CLI outputs for memorable UX



🚀 Use Cases

Security Auditing: Scan entire repositories before deployment or compliance review.



Static Analysis Education: Teach secure coding by tracing real vulnerabilities and their safe variants.



CI Integration: Plug into pipelines for instant feedback and gating based on severity scores.



