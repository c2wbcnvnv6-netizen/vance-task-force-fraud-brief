# QUICK PUBLIC DEPLOY — 30 Seconds

This folder is 100% ready to become a live public website.

## Fastest Method (Recommended Right Now)

1. Open this link in your browser:  
   **https://app.netlify.com/drop**

2. Drag the entire folder `public-task-force-brief` (or just the `index.html` file) onto the page.

3. Done. You will immediately get a real public URL like:
   `https://beautiful-name-12345.netlify.app`

You can send that URL to anyone.

---

## Permanent Method (GitHub Pages)

1. Go to https://github.com/new and create a **public** repository.  
   Suggested name: `vance-task-force-fraud-brief`

2. In your terminal, run these commands **from inside this folder**:

```bash
git init
git add .
git commit -m "Publish research brief"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/vance-task-force-fraud-brief.git
git push -u origin main
```

3. On GitHub, go to your new repo → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
   - Click **Save**

4. Your site will be live in 1–2 minutes at:
   `https://YOUR_GITHUB_USERNAME.github.io/vance-task-force-fraud-brief`

---

## Files in This Package
- `index.html` — The complete public research brief (ready to serve)
- `README.md` — Full documentation
- `netlify.toml` — Optimized config for Netlify
- `.nojekyll` — Required for GitHub Pages

Everything is self-contained. No build step needed.

Need help with any step? Just ask.
