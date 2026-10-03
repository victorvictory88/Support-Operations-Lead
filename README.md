# Albert Chan | Support Operations Lead

**[Explore the public demo](https://victorvictory88.github.io/Support-Operations-Lead/)** · [ChatGPT Site](https://support-operations-albert-chan.albe88948804.chatgpt.site/)

![Support Operations Lead demonstration](docs/assets/overview.png)

This independent candidate demonstration presents four fictional scenarios for Quality, Productivity, Capacity, and Cost to serve. Each selection updates the operating brief, specialist team, problem, insight, and operator actions immediately.

## Run locally

Node.js and Python are sufficient. The project has no external package dependencies.

```sh
npm test
npm run lint
npm run build
npm run preview
```

## Reading the page

The green split screen pairs a resume-grounded introduction with an orchestrator and three specialists selected for the scenario. Each box shows its input, output, and next handoff. A slow pulse follows one sequential handoff at a time, with pause and reduced-motion controls.

The analysis shows the problem, insight, requested metric scorecards, next check, and uncertainty. Scorecards expose actual results, goals, and gaps. Calculations and fictional records expand underneath. Each action has a named fictional owner, due date, red/yellow/green status box, and expandable proof. A communication draft remains collapsed until requested.

Question-mark controls explain section purpose and technical labels through hover or keyboard focus. Evidence links open their supporting details automatically.

## Implementation and limits

One deterministic browser engine calculates recommendations and supplies every role object. The animated chart replays a proposed design. Independent agents, parallel execution, LLM calls, external writes, live support integrations, and actual approvals remain outside this implementation.

Every scenario, organization, operating figure, owner, record, and output is fictional. Thresholds illustrate sample rules rather than OpenAI standards. The page includes no OpenAI mark or endorsement claim.

Onigiri answers bounded questions from selected page content and fixed topic rules. Questions remain in browser memory, and switching scenarios clears prior answers.

## Candidate evidence and project isolation

The introduction retains the applicant-provided resume’s Meta vendor governance and Rowland workflow claims. The application resume accompanies the public demonstration. This revision adds no personal career claims.

This repository holds the Support Operations Lead demonstration. The [original Support Delivery Lead project](https://victorvictory88.github.io/Support-Delivery-Lead/) remains the primary public portfolio reference. Each project retains its own source history and deployment.

## Review material

- [Architecture and production boundary](docs/architecture.md)
- [Four scenario details](docs/scenarios.md)
- [Hiring-manager walkthrough](docs/walkthrough.md)
- [Role and design sources](docs/source-map.md)
- [Writing basis and omissions](docs/draft-basis.md)

Tests cover scenario calculations, changed inputs, evidence links, missing records, review rules, uncertainty, completion conditions, and guide limits. Browser checks cover every scenario, responsive layouts, help controls, evidence expansion, pause, reduced motion, and enlarged text.

## Metric and date assumptions

Albert supplied the metrics and confirmed audited pass rates for Quality, recommended solutions per connected call, and fictional dates. The snapshot is October 15, 2026. Goal values and definitions for the remaining funnel and workforce denominators are explicit demonstration assumptions. These metrics represent the requested scenario design, without claiming they are OpenAI operating standards.

## Public hosting

GitHub Actions runs the engine tests, syntax checks, and build before publishing `dist` to GitHub Pages. Relative asset links support the `/Support-Operations-Lead/` project path. The ChatGPT Site is a separately managed public copy.

## Four operating decisions

| Scenario | Problem | Proposed response |
| --- | --- | --- |
| Quality | Tailored Solutions and Commercial Conversations fall below audited pass-rate goals. | Calibrate the rubric, coach the gaps, and require two passing audits. |
| Productivity | Coverage, pitch conversion, and solution depth fall below funnel goals. | Recover coverage, coach discovery, and inspect each denominator. |
| Capacity | MTD hours fall short while attrition and attendance exceed selected limits. | Validate backfill, recover attendance, and track the next retention period. |
| Cost to serve | Offshore delivery costs less but misses performance goals. | Cap the allocation during a timed recovery pilot, then retain or transfer through human review. |

## Repository map

```text
src/                 Interface, fictional scenarios, and deterministic engine
src/assets/          Application resume and Onigiri image
tests/               Engine tests and optional browser verification
docs/                Architecture, scenarios, sources, and walkthrough
.github/workflows/   Build checks and GitHub Pages publication
build.mjs            Dependency-free static build
```

## Optional browser checks

The browser suite requires Playwright and a browser installation. Start the local preview, then run the following commands in another terminal.

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node tests/browser-check.mjs
```

`BASE_URL` can target a deployed copy. `PLAYWRIGHT_MODULE` and `CHROME_PATH` can select an existing local installation. Screenshots and rendered checks remain in the ignored `qa` directory.
