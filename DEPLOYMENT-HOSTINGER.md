# Deploying to Hostinger (Node.js App)

This is a **Next.js app with a live server** (the `/api/contact` route sends email
via SMTP, and `next/image` optimisation + security headers need the Next.js
runtime). It is **not** a static site — you cannot drop HTML files into
`public_html`. It must run on Hostinger's **Node.js app** feature (hPanel →
*Advanced* → *Node.js*, powered by Phusion Passenger).

You deploy a **standalone build**: `npm run build` produces a self-contained
`.next/standalone/` folder (~35 MB) containing a server plus only the
`node_modules` it actually needs. That folder is the *only* thing you upload —
no full `node_modules`, no source tree, no `.next` cache.

---

## A. Build the artifact (on your computer)

```bash
npm install
npm run build
```

`postbuild` automatically:
1. generates `sitemap.xml` / `robots.txt`, then
2. copies `public/` and `.next/static/` into `.next/standalone/`.

When it finishes you'll have a ready-to-upload folder at **`.next/standalone/`**
containing: `server.js`, `node_modules/`, `public/`, `.next/`, `package.json`.

> Build on your machine (or CI), not on Hostinger — shared plans often don't have
> enough memory to run `next build`. The standalone artifact already includes its
> dependencies, so the server doesn't need `npm install`.

---

## B. Create the Node.js app in hPanel

1. hPanel → **Advanced → Node.js** → **Create application**.
2. Set:
   - **Node.js version:** `20.x` (or `18.x` — minimum 18.17).
   - **Application mode:** `Production`.
   - **Application root:** a folder in your account, e.g. `webnetic` (this becomes
     `/home/<user>/webnetic`).
   - **Application URL:** your domain (e.g. `webnetic.com.au`).
   - **Application startup file:** `server.js`.
3. Create it. hPanel will create the folder and a virtual environment.

---

## C. Upload the build

Upload the **contents of `.next/standalone/`** into the **Application root** you set
above — so that `server.js` sits directly in the application root
(`/home/<user>/webnetic/server.js`), with `node_modules/`, `public/`, and `.next/`
beside it.

Use either:
- **File Manager / FTP:** zip `.next/standalone`, upload, extract into the app root.
  Make sure files land *in* the root, not in a nested `standalone/` subfolder.
- **Git:** if you prefer pulling on the server, see section F.

> ⚠️ **Upload the hidden `.next` folder too.** `.next` starts with a dot, so many
> FTP clients and File Managers hide and silently skip it. Always **zip
> `.next/standalone` and upload the single zip, then Extract on the server** —
> that preserves the hidden `.next/` folder. After extracting, enable "show
> hidden files" and confirm `.next/static/css/` contains a `.css` file.

> Do **not** run "Run NPM Install" in the panel — the standalone build already
> bundles its dependencies. Running install is unnecessary and can be skipped.

### Troubleshooting: site loads as unstyled raw HTML

If the page text appears with no CSS/layout, the `/_next/static/*` assets are
404ing. Causes, in order of likelihood:

1. **The hidden `.next/static` folder didn't upload.** Re-upload via zip + Extract
   (see warning above) and verify `.next/static/css/*.css` exists on the server.
2. **Passenger serves from the `public/` document root and doesn't forward
   `/_next/*` to Node.** This build mirrors the assets to `public/_next/static`
   to cover that case, so a fresh `npm run build` + re-upload fixes it.
3. **Stale app** — click **Restart** on the Node.js app after re-uploading.

Confirm the fix in the browser: DevTools → Network → reload → the `.css` request
should be `200` with type `text/css` (not `404`).

---

## D. Set environment variables (this is where SMTP credentials go)

In the Node.js app screen there's an **Environment variables** section. Add each
of these (the contact form will not work until they're set):

| Variable        | Value                                   |
| --------------- | --------------------------------------- |
| `SMTP_HOST`     | `smtp.hostinger.com`                    |
| `SMTP_PORT`     | `465`                                   |
| `SMTP_SECURE`   | `true`                                  |
| `SMTP_USER`     | `info@webnetic.com.au`                  |
| `SMTP_PASS`     | your email-account password             |
| `CONTACT_EMAIL` | `info@webnetic.com.au`                  |
| `NODE_ENV`      | `production`                            |

**Important:**
- Paste `SMTP_PASS` **raw — no quotes.** The single-quote trick is only for
  `.env.local` files; panel fields take the literal value, so quotes would become
  part of the password.
- Never commit these to git. They live only in the panel.
- Optional: `SEND_CONFIRMATION=false` to disable the visitor auto-reply.

---

## E. Start and verify

1. Click **Restart** (or **Start**) on the Node.js app.
2. Visit your domain — the site should load.
3. Enable **SSL** for the domain in hPanel (Security → SSL) so it serves over HTTPS.
4. Submit the contact form with a **real** email address and confirm:
   - the enquiry arrives at `info@webnetic.com.au`,
   - the visitor receives the confirmation,
   - no bounce (bounces only happen for fake/blocked test addresses).

> The dev-only SMTP test page (`/api/contact/test`) automatically returns 403 in
> production, so it's safe — but you can't use it to debug prod. If prod email
> fails, check the app's **logs** in hPanel for `[contact]` lines.

---

## F. (Optional) Updating later

Each time you change the site:

```bash
npm run build          # regenerates .next/standalone
```

Then re-upload the contents of `.next/standalone/` over the app root and
**Restart** the app in hPanel. Environment variables persist across restarts —
you only set them once.

If you'd rather deploy from git on the server, you'd instead upload the full
source, run `npm install` then `npm run build` in the app root, and set the
startup file to `.next/standalone/server.js` — but the upload-the-artifact flow
above is simpler and lighter.

---

## What you do NOT upload

- `node_modules/` (the standalone build bundles a minimal copy)
- your source folders as a separate step (already compiled into `.next/standalone`)
- `.env.local` / `.env*` (secrets go in the panel's Environment variables)
- `.git/`, `scripts/`, `README`, config source files — none are needed at runtime
