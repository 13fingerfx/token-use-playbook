# Codex Token Use Playbook

A practical Codex token-saving playbook inspired by Redditor u/gneusse, with workflow tips, compact-output prompts, and a savings calculator.

## What This Covers

- Compact raw logs, JSON, CSVs, repo scans, and command output before Codex reads them.
- Limit noisy command output by default.
- Use helper scripts for repeatable summaries.
- Keep a small handoff file so Codex does not rediscover the same context.
- Use hooks for rules Codex should not forget.

## Agent Instruction Hygiene

Keep agent instructions deliberately concise while preserving useful precision.

Before adding to or updating instructions:

- Check for relevant existing guidance first.
- Prefer a small wording change over adding a new rule.
- Avoid duplicating rules across global and project-local files.
- Move task-specific workflows into runbooks such as `git.md`, `deploy.md`, or `cloudflare.md`.
- Keep global instructions limited to behavior that applies to most tasks.

## Hooks Over Hints

Markdown guidance can be ignored or forgotten. For command-output rules that matter, use Codex hooks to steer noisy commands toward compact output before raw output enters the working context.

For example, RTK-style hooks can intercept commands such as `git diff`, `rg`, test runners, and build commands, then ask Codex to retry with a compacted form.

Do not make “output truncated, read this temp file for the rest” the default hook behavior. That can waste tokens through extra tool calls and broad raw-file reads. Prefer this shape:

- Return counts and totals.
- Return the top errors or most relevant matches.
- Return deduplicated examples.
- Return filenames, timestamps, or line ranges that look useful.
- Suggest narrower follow-up commands.
- Save raw output only as an audit artifact.
- Require an explicit range, timestamp, pattern, or reason before reading raw output.

Raw output should be available, but opt-in.

See: https://github.com/v1kstrand/rtk-codex-hooks

## Publishing

This repo is a static site. Enable GitHub Pages from the `main` branch and `/root` directory.
