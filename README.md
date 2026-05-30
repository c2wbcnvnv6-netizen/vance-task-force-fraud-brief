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

## How to Deploy This Site Publicly (GitHub Pages Preferred)

### Recommended: Use the Automated Setup Script

1. Authenticate with GitHub (one-time):
   ```bash
   gh auth login
   ```

2. Run the setup script:
   ```bash
   ./setup-github.sh
   ```

The script will automatically:
- Create a new public GitHub repository
- Push the research brief
- Enable GitHub Pages

Your live public URL is:
`https://c2wbcnvnv6-netizen.github.io/vance-task-force-fraud-brief`

### Alternative Methods
See `QUICK_DEPLOY.md` for:
- Netlify Drop (fastest manual option)
- Manual GitHub Pages steps
- Vercel instructions

## Files
- `index.html` — The complete interactive research brief
- `RED_FLAG_TAXONOMY.md` — Structured red flag taxonomy + observability matrix (new, using regulatory-redflag-detector / verification-layer patterns)
- `FINAL_VANCE_TASK_FORCE_REPORT_20260529.md` — Comprehensive final investigation report
- `FINAL_FRESH_DATA_TOP20_REPORT_20260529.md` — Top survivors after aggressive filtering on fresh May 29 data
- `FOIA_Transparency_Request.md` — Ready-to-use FOIA template
- `HOW_TO_VIEW_THE_BRIEF.txt` — Local viewing instructions

## Recent Improvements (June 2026)
- Added `RED_FLAG_TAXONOMY.md` — a structured, sourced taxonomy of the specific red flags described in the claim, with public observability ratings, a clear data limitation matrix, and illustrative (non-claimed) vendor examples from the fresh GSA data pull. Produced following patterns from regulatory-redflag-detector, verification-layer, and tracing-visualizer.
- Integrated the taxonomy into the live site with a scannable table, prominent links, and a new Verification & Source Confidence layer.
- Strengthened non-speculative framing and actionability throughout.

## Source & Methodology
All information is sourced from primary government documents (White House, GSA), contemporaneous reporting (Daily Caller, Fox News), and public records. See the "Methodology & Limitations" section inside the brief.

Compiled May 2026 using Firecrawl tools for web research. Enhanced with specialized intelligence analysis skills for red flag systematization and verification.

## License
This research brief is provided for informational purposes. Feel free to share the deployed link.

---

**Need help deploying?** Open an issue or contact the researcher.
