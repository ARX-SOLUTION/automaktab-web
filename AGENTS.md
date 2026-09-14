<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Automaktab web routing

The workspace-root `../AGENTS.md` is canonical. This file adds marketing-site routing and keeps the generated Next.js rule above intact.

| Trigger | Read |
| --- | --- |
| Product boundary, design tokens, i18n, content, blog API, SEO, or deploy assumptions | `CONTEXT.md` |
| Branch, commit, rebase, conflict, or PR work | `../docs/agents/git-workflow.md` |
| Beads task lookup or tracker updates | `../docs/agents/issue-tracker.md` |
| Framework versions or validation commands | `package.json` |

This is the public marketing site, not the tenant CRM. Validate changes with `pnpm run typecheck && pnpm run lint && pnpm run build && pnpm test`.
