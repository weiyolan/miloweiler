This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Publish → live (on-demand revalidation)

Pages are static, but re-rendered on the server when Milo publishes in the Studio —
no Netlify rebuild needed for content. A rebuild is only needed for code changes.

- `src/pages/api/revalidate.js` receives a Sanity webhook and re-renders only the
  pages that show the changed document (all 3 locales). Unknown / site-wide types
  (category names, business info, theme, fonts) re-render the whole site (~15 s).
- New projects: `/[category]/[slug]` uses `fallback: "blocking"`, so a project
  published after the build works right away. Deleted, unpublished or moved
  projects return a 404 at their old URL.
- Safety net: every page also re-renders at most once a day on a visit
  (`src/utils/revalidate.js`), in case a webhook delivery is missed.

### One-time setup

1. Netlify → Site configuration → Environment variables: add
   `SANITY_REVALIDATE_SECRET` (any long random string), then redeploy once.
2. sanity.io/manage → project → API → Webhooks → Create webhook:
   - URL: `https://miloweiler.com/api/revalidate`
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: `!(_type match "sanity.*")`
   - Projection:
     ```groq
     {
       "_type": coalesce(after()._type, before()._type),
       "slug": after().slug.current,
       "cat": after().cat,
       "beforeSlug": before().slug.current,
       "beforeCat": before().cat
     }
     ```
   - HTTP method: `POST`, API version: `v2021-03-25`, drafts/versions: off
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`
3. Test: publish a small change in the Studio, then check the webhook's attempt log
   (it should show `200` with `"revalidated": true`) and reload the page.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
