---
name: jetbrains-search
description: MANDATORY code search via JetBrains MCP. Use BEFORE grep/glob/read-scan for any code lookup across monorepo, TS, Java, or Terraform repos.
---

# JetBrains code search

Use the `jetbrains` MCP server for all code discovery. Do not use OpenCode `grep`/`glob` until JetBrains tools fail.

## Pick projectPath

| Codebase | projectPath |
|----------|-------------|
| Python monorepo | `/abs/path/to/mono` |
| TS/JS app | `/abs/path/to/ts-ui` |
| Java service | `/abs/path/to/java-api` |
| Terraform/IaC | `/abs/path/to/iac` |

Always pass `projectPath` on every JetBrains tool call.

## Search order (no exceptions)

1. **`search_symbol`** — classes, functions, methods, types, known identifiers  
   - Good: `AuthService`, `handleLogin`, `aws_lambda_function` name fragments  
2. **`search_text`** — exact strings, config keys, log lines, annotations  
   - Good: `"retry_policy"`, `X-Request-Id`, `resource "aws_s3_bucket"`  
3. **`search_regex`** — patterns when text is too rigid  
4. **`search_file` / `find_files_by_name_keyword` / `find_files_by_glob`** — locate files by name/path  
5. **`get_symbol_info`** — after you have file + line + column  
6. **`read_file`** (JetBrains) — read hit regions  
7. OpenCode **`grep` / `glob` / `read`** — only if steps 1–6 miss

Never run grep in parallel with JetBrains on the first attempt.

## Query tips

- Prefer identifiers and domain nouns over full sentences.  
- If `search_symbol` is empty: broaden fragment, then `search_text`.  
- Terraform/HCL: start with `search_text` / `search_regex` (`resource "aws_`, `module "`).  
- After edits: `get_file_problems` or `build_project` on that `projectPath`.

## Do not

- Skip `projectPath`  
- Use embedding/RAG search first (if installed): JetBrains only after empty results  
- Call multiple repo MCPs for one question when a single umbrella IDE is configured  
