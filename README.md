# Condition Cockpit – Entry & Maintain

A functional OpenUI5 and TypeScript prototype for purchasing condition maintenance. Uses standard Horizon/Fiori controls with 18 fictional display articles. No SAP backend, authentication or database is required.

## Run

Install Node.js 22.12+ (or 20.19+), then:

```sh
npm install
npm start
```

Open http://127.0.0.1:5173. `npm run build` checks TypeScript and creates `dist`; `npm test` verifies business rules. OpenUI5 1.136.8 is pinned and loaded from its public CDN, so an internet connection is required. For an offline demonstration, mirror that OpenUI5 distribution and change the bootstrap URL in index.html.

## Demo

Use Vendor/Partner value help to choose 0000123456. Open DISPLAY FERRERO (article 000000000000000092) with Detail or a double-click. PB00 and ZFR1 are locked. Select an editable block using its radio button to copy or delete it. Edit individual display/component rows, add a condition, and save. Back navigation offers Save, Discard and Cancel when changes exist and preserves overview filters/results/selection.

## Structure and backend replacement

`src/models` holds string identifiers and domain/service contracts; `src/config` holds all condition types; `src/mock` generates realistic relationships; `src/business` handles filtering, validation and protected conditions; `src/services` implements the repository; `src/main.ts` assembles the two OpenUI5 views, controllers and hash routing; `src/style.css` supplies compact presentation styling. UI construction is intentionally programmatic to keep this prototype straightforward.

The UI calls only the Repository contract for article searches, value help, conditions and saves. Replace MockRepository with an OData implementation of that contract and inject it at the composition root in main.ts. Map SAP identifiers to strings and preserve validation/read-only enforcement on the backend. Purchasing organisations are reference metadata and display-only on the detail screen.

PB00/ZFR1 rules derive from central condition configuration, with additional repository protection against creation, deletion or modification. Module (MM/REA/CCM) is metadata; visible grouping is always condition type → display article → components.

Saves persist in browser localStorage per display article. Drafts are isolated until Save. Filters use OR within each field and AND across fields. Free-entered Vendor IDs require 10 characters; Article/A-ID require 18. No identifier is converted to a number. All reference value helps allow search, multi-selection, Apply and Cancel.

Prototype limitations: single-browser storage, no concurrent editing/conflict handling, no OData integration, and no automatic propagation of parent monetary changes to component values. Copy preserves component-specific values/quantities while applying the dialog's type, dates, currency, unit and description; its Value/Quantity fields adjust the parent. Fictional validity defaults use the 2026 calendar year. No reference screenshots were supplied.

The demonstration UI uses English, including OpenUI5 calendars and standard dialogs regardless of browser language. Known legacy German demo product descriptions are translated for display without changing saved condition records.

