# Albert Chan | Support Operations Lead

**[View the take-home assignment](https://support-operations-albert-chan.albe88948804.chatgpt.site/)** · [Explore additional operating scenarios](https://support-operations-albert-chan.albe88948804.chatgpt.site/operating-scenarios.html) · [Download the PDF](src/assets/Albert-Chan-OpenAI-Support-Operations-Take-Home.pdf)

This repository contains my recommendation for the hypothetical OpenAI Support Operations take-home. The ChatGPT Site is the shareable presentation. GitHub keeps the source, the PDF, and the fictional operating examples available for review.

![Take-home assignment opening page](docs/assets/recommendation.png)

## The recommendation

The assignment asks how Support should evolve over three years from a hypothetical baseline of 1 billion weekly users, 150,000 weekly issues, and 60% automated resolution. I organize the recommendation around the assignment's four areas covering future scale, strategic priorities, operating model, and measures of success. My proposal uses AI to prevent or resolve more issues inside the product, while people govern sensitive decisions and improve the system.

The four-page core presentation follows the case for change, the three-year path, and the plan with its proof gates. The supporting appendix holds the detailed assumptions, operating ownership, and full scorecard. The planning case shows demand rising toward 281,000 weekly issues while verified automation rises toward an illustrative 88% stretch case. Human-assisted cases then fall from 60,000 to about 34,000 weekly despite higher demand. That outcome requires enough issues to qualify for safe automation, measured customer outcomes, and staged expansion. The only external research link in the recommendation is [OpenAI's published support model](https://openai.com/index/openai-support-model/).

The scorecard uses quality, productivity, capacity, and cost to serve to evaluate the customer outcome and each contributor. Human cases count issues that reach a person. Each year shows a verified automation goal, the resulting number of cases reaching people, and customer quality, backlog, and cost checks. People move toward harder cases, quality review, and product fixes before staffing changes. The figures for future growth, automation, and pilot gates are scenario assumptions, separate from OpenAI targets.

## Additional Operating Scenarios

The second tab contains four fictional cases covering quality, productivity, capacity, and cost to serve. Each case shows a proposed specialist handoff, evidence, diagnosis, owner, and recovery plan. The agent chart is a visual replay of one deterministic browser engine. It replays proposed handoffs without separate agents, live support systems, or executed actions.

![Additional operating scenarios](docs/assets/overview.png)

## Review and run locally

- [Architecture and production boundary](docs/architecture.md)
- [Four scenario details](docs/scenarios.md)
- [Hiring-manager walkthrough](docs/walkthrough.md)
- [Source and assumption map](docs/source-map.md)

Node.js and Python are sufficient for local review. The project has no package dependencies.

```sh
npm test
npm run lint
npm run build
npm run preview
```

GitHub Actions checks the project and publishes a lightweight redirect from GitHub Pages to the ChatGPT Site. The full source and PDF remain in this repository.
