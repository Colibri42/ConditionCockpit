# Implementation plan

Requirements: two functional screens, six multi-value filters, condition-type hierarchy, read-only base conditions, editable condition workflows, persistence and guarded navigation. No reference screenshots were included in the supplied attachment.

1. Define string-based identifiers, domain models and a replaceable repository interface.
2. Create the central condition catalogue, realistic datasets and repository validation/protection.
3. Assemble standard OpenUI5 controls for the overview and detail screens; use hash routes and preserve overview state.
4. Implement searchable multi-select value help, editing, add/copy/delete, dirty-state navigation and local saves.
5. Install dependencies, check TypeScript and production build, test domain rules and browser workflows, inspect rendered screens, and fix failures.

Structure: models, config, mock, business rules, services, screen/controller composition, styles and tests. The public OpenUI5 bootstrap is pinned; TypeScript is built with Vite.
