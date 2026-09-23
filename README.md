This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cloudflare Workers

The optional OpenNext target preserves the existing Next.js/Vercel build. It uses
R2 for the blog's one-hour incremental cache and a Durable Object queue for
revalidation. Cloudflare Images handles `next/image` optimization.

```bash
pnpm install --frozen-lockfile
pnpm cf:check    # Build and validate the Worker bundle without deploying
pnpm cf:preview  # Run the Worker locally with local cache storage
```

Before the first remote deployment, enable R2 on the target Cloudflare account
and create the `automaktab-web-cache` bucket. Confirm Workers and Images access.
The Worker name, self-reference service and cache binding are in `wrangler.jsonc`.
Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` in the build environment; `CRM_API_BASE_URL`
defaults to `https://api.automaktab.uz` and can be set in the Worker environment.

`pnpm cf:deploy` builds the Worker, uploads its initial cache and deploys it.
Deployment and domain cutover require separate approval. Before cutover, check
`/`, `/ru`, `/en`, `/uz` (404), blog revalidation, image optimization, security
headers and the demo-request proxy on the Worker URL. Keep the current Vercel
deployment until that parity check passes.
