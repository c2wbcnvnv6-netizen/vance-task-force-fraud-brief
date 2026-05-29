# Public Research Brief: JD Vance White House Task Force $6.3B Fraud Claim

This repository contains a self-contained, publicly viewable research brief.

**Live Version:** https://[your-deployed-url-here]

## What This Is

A detailed investigation into the origin, development, and amplification of the claim that the JD Vance-led White House Task Force to Eliminate Fraud uncovered **$6.3 billion** in suspected fraudulent government contracts involving **392 entities** and **895 contracts**.

### Key Findings
- The detailed claim (specific numbers 392 / 895 / $6.3B) first appeared publicly in a Daily Caller exclusive on April 8, 2026.
- No list of the 392 entities has been released by the government.
- No public companies have made SEC disclosures related to these specific flags.
- The claim has been widely amplified across conservative media and official channels.

## How to Deploy This Site Publicly

### Option 1: Netlify Drop (Fastest — 30 seconds)
1. Go to https://app.netlify.com/drop
2. Drag the entire `public-task-force-brief` folder (or just the `index.html`) onto the page.
3. You will instantly get a public `https://` URL.

### Option 2: GitHub Pages (Recommended for permanence)
1. Create a new public repository on GitHub (name it something like `task-force-fraud-brief`).
2. In this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial public research brief"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
3. Go to your repo → **Settings** → **Pages**
4. Set Source to "Deploy from a branch" → `main` branch → `/ (root)`
5. Save. Your site will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### Option 3: Vercel
1. Go to https://vercel.com/new
2. Import the GitHub repo (after pushing), or drag the folder.

## Files
- `index.html` — The complete interactive research brief
- `HOW_TO_VIEW_THE_BRIEF.txt` — Local viewing instructions

## Source & Methodology
All information is sourced from primary government documents (White House, GSA), contemporaneous reporting (Daily Caller, Fox News), and public records. See the "Methodology & Limitations" section inside the brief.

Compiled May 2026 using Firecrawl tools for web research.

## License
This research brief is provided for informational purposes. Feel free to share the deployed link.

---

**Need help deploying?** Open an issue or contact the researcher.
