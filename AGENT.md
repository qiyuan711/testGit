# Global agent instructions (context hygiene)

These rules apply to every project. Goal: keep the session context and prompt-cache prefix small. Large tool dumps are the main source of bloat.

## Prefer structured tools over Bash

| Need | Use | Do not use |
|------|-----|------------|
| Find files by name/pattern | `Glob` | `find`, `tree`, `ls -R` |
| Search file contents | `Grep` | `grep`/`rg`/`ag` via Bash |
| Read source | `Read` (with `offset`/`limit` on large files) | `cat`, `head -n 1000`, `sed -n` dumps |
| Broad codebase exploration | `Task` → explore/scout/general | Dozens of search calls in the main session |
| Build, test, install, git, one-off scripts | `Bash` | — |

Bash is for **running commands**, not for **searching or reading the repo**.

## Search discipline

1. Start narrow: known directory, extension (`include`), or symbol name.
2. Tighten the pattern before expanding scope. Prefer fewer precise hits over exhaustive dumps.
3. Stop once you have enough signal to act. Do not “map the whole repo” unless asked.
4. Cap mental budget: if a search would return hundreds of lines, narrow it or delegate via `Task`.
5. Never paste or re-emit large tool outputs in your reply. Summarize paths and conclusions only.

## Read discipline

- Prefer targeted ranges (`offset`/`limit`) over whole-file reads for long files.
- Do not re-read files you already have in recent context unless they may have changed.
- After edits, re-read only the changed region when needed for verification.

## When output is truncated

If a tool result says output was truncated and saved to a file:

- Do **not** read the full spill file into the main session.
- Use `Grep` on that path, or `Read` with small `offset`/`limit`.
- Or `Task` an explore agent to mine it and return a short summary.

## Bash output control

When Bash is necessary, keep stdout small:

- Prefer project scripts (`npm test -- <file>`, `go test ./pkg/...`) over repo-wide noise.
- Pipe through `tail`, `head`, or filters when a command is chatty.
- Avoid printing full logs, full diffs of huge generated files, or directory trees.
- Do not use Bash to circumvent denied search tools (`find`/`grep`/`rg`/`tree`).

## Subagents (Task)

- Use explore/scout for multi-step discovery; ask for a **brief** result: paths, symbols, 1-line why each matters, recommended next read.
- Parent session should receive a summary, not raw search transcripts.
- Do not nest open-ended exploration loops in the primary agent.

## Session hygiene

- One concern per long session when practical. After heavy investigation, compact or start fresh before a large implementation pass.
- Do not keep re-exploring the same areas; reuse prior findings already in context.
- Prefer acting on known paths over another broad search pass.

## Response style (tokens)

- Be concise. Lead with the outcome; skip preamble.
- Cite `path` or `path:line` instead of quoting large code blocks unless the user needs the full snippet.
- Do not dump command output back to the user unless they asked for it.
