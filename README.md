# Albert Chan | Support Operations Lead

**[View the take-home assignment](https://support-operations-albert-chan.albe88948804.chatgpt.site/)** · [Explore additional operating scenarios](https://support-operations-albert-chan.albe88948804.chatgpt.site/operating-scenarios.html) · [Download the PDF](src/assets/Albert-Chan-OpenAI-Support-Operations-Take-Home.pdf)

This repository contains my recommendation for the hypothetical OpenAI Support Operations take-home. The ChatGPT Site is the shareable presentation. GitHub keeps the source, the PDF, and the fictional operating examples available for review.

![Take-home assignment opening page](docs/assets/recommendation.png)

## The recommendation

The assignment asks how Support should evolve over three years from a hypothetical baseline of 1 billion weekly users, 150,000 weekly issues, and 60% automated resolution. I organize the recommendation around the assignment's four areas covering future scale, strategic priorities, operating model, and measures of success. My proposal uses AI to prevent or resolve more issues inside the product, while people govern sensitive decisions and improve the system.

The five-page core presentation follows the case for change, the three-year path, the plan with proof gates, and the financial choice. The supporting appendix holds detailed assumptions, operating ownership, and the full scorecard. The planning case tests demand rising toward 500,000 weekly issues while verified AI resolution rises toward an illustrative 90% stretch target. Cases reaching people rise from 60,000 to 66,000 in Year 1, then fall to about 50,000 weekly by Year 3. That outcome requires enough issues to qualify for safe AI action, measured customer outcomes, temporary human coverage, and staged expansion. The strategy references [OpenAI's published support model](https://openai.com/index/openai-support-model/). The financial appendix cites public vendor prices.

The scorecard uses quality, productivity, capacity, and cost to serve to evaluate the customer outcome and each contributor. Human cases count issues that reach a person. Each year shows a verified automation goal, the resulting number of cases reaching people, and customer quality, backlog, and cost checks. People move toward harder cases, quality review, and product fixes before staffing changes. The figures for future growth, automation, and pilot gates are scenario assumptions, separate from OpenAI targets.

## The financial decision

Core 01 shows **about $118 million of illustrative net vendor cost avoided** as the financial opportunity under the 500,000-issue high-growth plan. It assumes 90% verified AI resolution by Year 3, 3,000 cases per vendor rep yearly, 90% vendor-eligible avoided cases, flexible contracts, and a $20 million program allowance. The downside creates a $13.1 million shortfall if AI progress and budget conversion stall while the full program budget is spent. Every case compares with keeping automated resolution at 60% as demand grows. Published onshore and Philippines vendor prices anchor the representative costs. Vendor case share, throughput, contract timing, and program spend remain planning assumptions. The [financial model notes](docs/financial-model.md) show the evidence, formulas, and limits. A lower-demand sensitivity appears in the appendix.

![Illustrative financial decision](docs/assets/financial-case.png)

## Additional Operating Scenarios

The second tab contains four fictional cases covering quality, productivity, capacity, and cost to serve. Each case shows a proposed specialist handoff, evidence, diagnosis, owner, and recovery plan. The agent chart is a visual replay of one deterministic browser engine. It replays proposed handoffs without separate agents, live support systems, or executed actions.

![Additional operating scenarios](docs/assets/overview.png)

## Review and run locally

- [Architecture and production boundary](docs/architecture.md)
- [Four scenario details](docs/scenarios.md)
- [Hiring-manager walkthrough](docs/walkthrough.md)
- [Source and assumption map](docs/source-map.md)
- [Financial model notes and public price references](docs/financial-model.md)

Node.js and Python are sufficient for local review. The project has no package dependencies.

```sh
npm test
npm run lint
npm run build
npm run preview
```

GitHub Actions checks the project and publishes a lightweight redirect from GitHub Pages to the ChatGPT Site. The full source and PDF remain in this repository.
