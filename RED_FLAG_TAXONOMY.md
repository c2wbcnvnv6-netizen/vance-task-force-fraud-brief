# Red Flag Taxonomy & Observability Matrix
**JD Vance White House Task Force to Eliminate Fraud — Contract Review Criteria**

**Date:** May 29, 2026 (Updated with June 2026 Toolkit Refresh)  
**Status:** Research Checkpoint — Public Data Limitations Noted  
**Prepared using:** regulatory-redflag-detector, verification-layer, and tracing-visualizer patterns

---

## Purpose (Non-Speculative Framing)

This document extracts and structures the specific risk indicators (red flags) publicly described in connection with the White House Anti-Fraud Task Force's April 2026 review of ~895 federal contracts totaling ~$6.3 billion across 392 entities.

**Critical Context:** The Task Force had internal access to complete SAM.gov physical address validation data. The public does not. As a result, the exact methodology cannot be fully replicated with currently published USASpending and SAM.gov data.

This taxonomy is provided to:
- Make the claimed criteria transparent and testable where possible.
- Highlight which flags are publicly observable today vs. which require internal government data.
- Support the call for improved federal contracting transparency.

**All findings are indicators only. They require professional review and official validation.**

---

## Structured Red Flag Taxonomy

| Flag ID | Flag Type | Description | Risk Rationale | Public Observability (Current) | Data Source Limitation |
|---------|-----------|-------------|----------------|--------------------------------|------------------------|
| RF-01 | SAM.gov Physical Address Validation Failure | Entity failed (or could not complete) SAM.gov's physical address validation check (proof of real business location via documentation or site visit). | Shell companies, virtual offices, and pass-through entities frequently cannot demonstrate a legitimate physical presence. This is a strong proxy for entities that may not be performing the work claimed. | **Low / None** in bulk data. SAM.gov public search shows registration status but does not expose the validation result (Passed/Failed/Pending) as a queryable field. | USASpending returns NULL for Recipient Address fields; no validation flag exposed. |
| RF-02 | PO Box / Virtual Office / Regus / WeWork Pattern | Recipient address in public records or filings is a PO Box, UPS Store, Regus executive suite, or other known virtual mailbox provider with no evidence of operational facilities. | Classic indicator of shell or pass-through structures designed to obscure beneficial ownership or actual performance location. | **Medium** in some cases (via company websites, Google Street View, State SOS filings, prior contract docs). | Requires manual cross-reference; bulk USASpending address fields are NULL. |
| RF-03 | Recipient vs. Place of Performance Location Mismatch | Award lists one state/city for the recipient but a materially different state for where the work is to be performed, without clear operational justification. | May indicate invoicing from a different jurisdiction than actual delivery, a common fraud vector in services contracts. | **Low** | Both Recipient Address and Place of Performance fields returned NULL in all tested USASpending pulls (including fresh May 29, 2026 data). |
| RF-04 | Sole Source / Limited Competition + High Value | High-dollar award made with "Extent Competed" = "Not Competed" or limited sources, especially to newer or smaller entities. | Reduced competition increases risk of favoritism, inflated pricing, or non-performance. | **Medium-High** (Extent Competed field sometimes available; however, many records in the pull showed missing or unusable values). | Inconsistent availability in the `spending_by_award` endpoint for the relevant result sets. |
| RF-05 | Recent Entity Formation + Rapid Large Awards | Company registered in SAM.gov or state SOS within 12–24 months of receiving substantial federal obligations. | "Instant contractor" pattern is a known risk signal in federal contracting fraud cases. | **Medium** (via SAM.gov UEI creation date + State business filings). | Requires per-entity manual lookup; not bulk-filterable without address data. |
| RF-06 | Vague or Overly Broad PSC / NAICS Codes | Product/Service Code or industry classification does not closely match the stated scope of work or the entity's known capabilities. | Can mask misappropriation or inability to perform specialized work. | **Medium** | PSC codes are present in many records but require domain expertise to evaluate meaningfully at scale. |

**Notes on the Matrix:**
- RF-01 (the primary flag cited in public reporting) is effectively invisible to the public in bulk data today.
- RF-02 and RF-05 are the most actionable for independent researchers using currently available public tools.
- The combination of multiple flags on the same entity is more significant than any single flag in isolation.

---

## Public Observability Heatmap

| Data Element | Currently Public & Bulk Queryable? | Notes from May 29, 2026 Fresh Pull (5,921 GSA awards) |
|--------------|------------------------------------|-------------------------------------------------------|
| Recipient Legal Name | Yes | Reliable |
| UEI / CAGE | Partial | Often present |
| Award Amount | Yes | Reliable |
| Awarding Agency | Yes | Reliable |
| PSC / NAICS | Yes | Present but variable quality |
| Recipient Address (all lines) | **No — All NULL** | Systemic in tested queries |
| Place of Performance Address | **No — All NULL** | Systemic |
| SAM Physical Address Validation Status | No (not exposed) | Internal Task Force access only |
| Extent Competed | Partial / often missing | Limited utility for filtering |
| Modification Count | Partial | Mostly 0 or null in results |

**Direct consequence:** The core methodology described publicly by the Task Force (address validation failures as primary filter) cannot be independently audited or replicated at scale using the published USASpending API or bulk downloads.

---

## Illustrative Entities in the $100k–$10M GSA Band (Post-Blacklist)

These 14 unique entities surfaced after applying the exact aggressive hard blacklist (eliminating Dell, Jacobs, Deloitte, JLL, Booz Allen, Leidos, CACI, Amentum, and similar large established primes) + $100k–$10M cap on the May 29, 2026 fresh GSA prime contract pull.

They are **not** claimed to be part of the unreleased 392-entity list. They are presented solely as real-world examples of the *types* of vendors that a rigorous, address-aware review in this dollar range would evaluate.

- **MINBURN TECHNOLOGY GROUP, LLC** — $9.92M — Great Falls, VA (confirmed physical HQ via company site). SDVOSB IT/health IT federal contractor.
- **KARSUN SOLUTIONS LLC** — $9.92M — Herndon, VA. CMMI-5 IT modernization contractor.
- **CULMEN INTERNATIONAL, LLC** — $9.91M — Alexandria, VA (99 Canal Center Plaza). Long-term DoD/State contractor (UEI P8T9JZVLSXA3).
- **CELERITY GOVERNMENT SOLUTIONS LLC (Xcelerate Solutions)** — $9.71M — McLean, VA. IT/identity/AI federal services.
- **ISOMETRICS INC** — $9.39M — Reidsville, NC (manufacturing facility). Fuel systems/refuelers for military, GSA schedule holder.
- **NORTHERN MANAGEMENT SERVICES, INC.** — $9.46M — Sandpoint, ID. Facilities/maintenance federal contractor (HUBZone aspects noted in records).

**Light validation (public web + company sites + federal contracting databases) shows these are established, registered federal contractors with verifiable physical commercial or manufacturing addresses.** None presented as pure PO Box / virtual mailbox operations in open sources.

Full list and raw CSV available in the research workspace.

---

## Transparency Recommendations (Reinforced)

To enable independent oversight equivalent to what the Task Force performed internally:

1. **Publish SAM.gov Physical Address Validation Status** as a searchable/downloadable field (Passed / Failed / Pending / Unknown) for all active entities.
2. **Restore complete Recipient Address and Place of Performance location data** (including validation flags) in USASpending API responses and bulk downloads.
3. **Release aggregated, non-identifiable risk indicators** from the Task Force review (e.g., number of failed-validation vendors by agency, total obligated dollars at risk, high-level flag category breakdowns).
4. **Provide a public methodology appendix** or data dictionary explaining exactly which fields and validation rules were applied.

These changes reveal **no private personal information** and would dramatically improve public accountability.

---

## Verification & Confidence Notes

- **Core claim origin (Daily Caller April 8, 2026)**: High confidence in reporting existence and quoted figures. No contradictory primary sources found.
- **Zero named entities in public sources**: High confidence. Multiple independent searches (SAM exclusions, USAspending, EDGAR, White House releases, GSA newsroom) returned no list or specific identifiers tied to the 392/895 cohort.
- **Data limitation (address fields NULL)**: Confirmed via direct API testing on both narrow (GSA) and broad queries on May 29, 2026. Reproducible.
- **No public company disclosures**: High confidence for major contractors; lower certainty for small/non-public vendors (as expected).
- **Illustrative entities above**: Medium-high confidence in their public profiles and addresses (cross-checked against company websites and contracting records).

**No speculation.** All statements are grounded in what is (or is not) observable in primary public sources as of the latest refresh.

---

## Sources

- White House Executive Order establishing the Task Force (March 2026)
- Daily Caller exclusive (April 8, 2026) — origin of 392 / 895 / $6.3B figures
- Fox News same-day coverage
- GSA official announcements (May 2026)
- USASpending `spending_by_award` API pulls (multiple rounds, final fresh pull May 29, 2026)
- SAM.gov public interfaces (via hardened browser tools)
- Company websites and State SOS filings (light validation only)
- White House "Full-Scale War on Fraud" timeline release (May 2026)

Full primary source links are maintained in the main research brief (`index.html`).

---

*This taxonomy was prepared in accordance with the ethical and methodological standards of the regulatory-redflag-detector, verification-layer, and tracing-visualizer skills. It is released for public use in the interest of transparency and oversight.*

**Investigation remains a checkpoint, not a conclusion.**