# Schwesterherz Completed UI/UX Additions

Status record for the **2 completed tasks** from the boutique spa UI/UX upgrade roadmap (tracked in [todo.md](./todo.md)).

---

## Completed Task 1 — Feature #1: Editorial Typography & "Quiet Luxury" Aesthetics
- **Status:** Completed & pushed to `main` (Commit `6387678`)
- **Files Modified:**
  - `index.html`
  - `components/Section.tsx`
  - `components/Layout.tsx`
  - `pages/Home.tsx`
  - `pages/Prices.tsx`
- **Summary of Changes:**
  - Replaced Google Fonts with **Cormorant Garamond** (regular & italic) for headings/editorial quotes paired with **Plus Jakarta Sans** for UI and body text.
  - Added `font-size-adjust: from-font` (body) and `cap-height from-font` (headings) for fallback metric stability.
  - Added CSS utilities in `index.html` using progressive `in oklab` gradient interpolation (`--in-oklab` via `@supports`) for `.luxury-surface` and `.luxury-card-shadow`.
  - Refined section vertical spacing, added uppercase tracked eyebrows, balanced `Cormorant Garamond` headings, and styled client testimonials with italic serif pull-quotes while preserving the responsive Hero layout and tagline hierarchy.

---

## Completed Task 2 — Feature #5: Digital Gift Voucher ("Gutschein") Configurator with Live Preview
- **Status:** Completed & pushed to `main` (Commit `6387678`)
- **Files Created & Modified:**
  - Created `components/VoucherConfigurator.tsx`
  - Created `pages/Vouchers.tsx`
  - Modified `App.tsx`, `constants.tsx`, `index.html`, `components/Layout.tsx`, `pages/Home.tsx`, `pages/Prices.tsx`
- **Summary of Changes:**
  - Built an interactive configurator on `/gutscheine` with a sticky live voucher card preview supporting 3 visual finishes (*Champagner & Kaschmir*, *Espresso & Gold*, *Salbei & Ruhe*).
  - Added selection controls for treatment vouchers (`VOUCHER_TREATMENTS`) and value vouchers (`VOUCHER_AMOUNTS` plus custom numeric input), personal dedication (*Für wen*, *Von wem*, message up to 140 chars), and studio pickup vs. digital PDF delivery.
  - Implemented dual submission channels: one-click pre-filled **WhatsApp** inquiry to studio phone (`CONTACT_INFO.phone`) and validated **Netlify Forms** submission (`form-name="gutschein"`) with an automatic `mailto:info@sh-pflegeoase.de` fallback.
  - Linked `/gutscheine` in navigation (`NAV_ITEMS`), footer, home page voucher teaser section, and the packages page callout strip.

---

> **Note:** Roadmap item **#2 (Interactive "Before & After" Comparison Slider)** has not been started yet and remains open in [todo.md](./todo.md).
