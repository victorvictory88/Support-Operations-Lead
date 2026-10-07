# Three-year vendor cost decision model

This illustrative model estimates vendor spend avoided compared with keeping AI resolution at the exercise's 60% starting point as demand grows. It is a planning scenario, separate from OpenAI forecasts and contract terms. Revenue, customer retention value, direct employee reductions, and product fixes that prevent issues remain outside the dollar estimate.

The calculation is reproducible in [`src/finance.mjs`](../src/finance.mjs). The production build writes `dist/financial-model.json` with every input and unrounded result.

## Public vendor price evidence

| Reference | Published price | Use in this model |
| --- | ---: | --- |
| [SupportOps Global pricing](https://www.supportopsglobal.com/pricing) | $45 per hour for U.S. and Canada support, and $1,950 per month for a dedicated Philippines representative | These anchor the onshore and offshore vendor bill rates. Management, reporting, and quality oversight appear in the published plans. |
| [ConnectPro Philippines pricing](https://connectprooutsourcing.com/services/customer-support-outsourcing) | From $1,400 per agent monthly, or $1,600 for extended hours, with a separate managed-team charge | This cross-checks the offshore price range. |
| [PITON-Global pricing](https://www.piton-global.com/pricing/) | $10–$16 per hour for fully loaded Philippines support | This cross-checks the offshore price with seat, supervision, and quality included. |
| [U.S. Bureau of Labor Statistics](https://www.bls.gov/ooh/office-and-administrative-support/customer-service-representatives.htm) | $21.53 median hourly wage for U.S. customer service representatives in May 2025 | This provides a wage cross-check. Vendor bills also cover management and quality oversight. |

These prices are public reference points. SupportOps Global advertises monthly terms and 30-day notice, showing that flexible contracts exist in the market. OpenAI's prices, contract floors, language mix, service hours, and technical specialization remain unknown. Finance should replace every list price with actual contract terms before making budget decisions.

## Why demand reaches 500k weekly issues

The exercise supplies 1 billion weekly users and 150,000 weekly support issues. My high-growth plan assumes 220k, 330k, and 500k weekly issues across Years 1–3. The Year 3 figure equals 1.5 times as many weekly users and 2.22 times as many issues per user. More products, channels, and demanding use cases could raise the issue rate even as product fixes reduce repeat problems. This is an aggressive planning assumption for the assignment, separate from a verified demand forecast.

The plan raises verified AI resolution from 60% today to 70%, 82%, and 90%. Cases reaching people rise to 66k in Year 1, then fall to 59.4k in Year 2 and 50k in Year 3. That path requires enough eligible issues, approved AI actions, lasting customer resolution, and coverage for the more complex cases left with people.

## Vendor unit costs and planning inputs

| Input | Assumption | Reason |
| --- | ---: | --- |
| Onshore vendor representative | $45 hourly, or $93,600 yearly | Published vendor price multiplied by 40 hours and 52 weeks. |
| Offshore vendor representative | $1,950 monthly, or $23,400 yearly | Published vendor price multiplied by 12 months. |
| Vendor location mix | 30% onshore and 70% offshore | Illustrative coverage for sensitive cases and defined high-volume queues. |
| Blended vendor price | $44,460 per representative year | Weighted average of the two published prices. |
| Vendor case throughput | 3,000 cases yearly, or $14.82 per case | About 12 closures per scheduled workday, assuming 250 days. This reflects more involved cases. Actual handling data must decide the rate for cases AI replaces. |
| Vendor-eligible share | 90% of avoided human cases | AI first addresses repeatable cases that partners might otherwise handle. Issue-level ownership must confirm this share. |
| Budget conversion | 40%, 75%, and 90% in Years 1–3 | Contract changes or avoided future seats put potential capacity value into the budget after customer quality and coverage hold. |
| Program allowance | $4M, $6M, and $10M in Years 1–3 | Illustrative room for AI usage, evaluations, tooling, training, and oversight. Finance must price each line. |

For each year, avoided human cases equal weekly issues multiplied by the difference between the proposed AI rate and a flat 60% rate. Annual avoided cases are multiplied by 90% vendor share, divided by 3,000 cases per vendor rep, and valued at $44,460 per representative year. Only the stated budget-conversion share counts as expense avoided. The program allowance is then deducted.

| Planning result | Year 1 | Year 2 | Year 3 | Three years |
| --- | ---: | ---: | ---: | ---: |
| Weekly issues | 220k | 330k | 500k | — |
| Verified AI resolution | 70% | 82% | 90% | — |
| Cases reaching people | 66k | 59.4k | 50k | — |
| Vendor spend avoided against flat 60% AI | $6.10M | $37.77M | $93.63M | $137.50M |
| AI, tooling, and quality allowance | $4.00M | $6.00M | $10.00M | $20.00M |
| Net cost avoided | +$2.10M | +$31.77M | +$83.63M | +$117.50M |

This figure measures future expense avoided against a flat-automation forecast. Today's vendor budget could still rise under hypergrowth. It is sensitive to throughput. At 6,000 cases per vendor rep, with other plan inputs held constant, the modeled three-year net falls to about $48.8M. Leadership should inspect actual case handling times, partner queue ownership, contract floors and renewal dates, planned seat additions, and AI running costs before treating $117.5M as a budget target.

## Leadership choice and downside

I would approve a limited pilot with access to case, quality, cost, and contract data. Later funding would depend on lasting resolution, repeat contact, severe errors, backlog, qualified coverage, and Finance-confirmed vendor expense avoidance. A lower case count alone cannot release the next budget. Year 1 needs temporary human coverage because cases reaching people rise from 60k to 66k before falling.

A downside path reaches only 65%, 75%, and 82% verified AI resolution. If 70% of avoided cases are vendor eligible, each vendor rep closes 4,000 cases yearly, and just 10% of potential value reaches the budget each year, spending the full $20M creates a $13.1M shortfall. Year 3 would leave about 90k weekly cases for people. Staged funding and a stop decision after a failed pilot aim to contain that loss.

## Lower-demand sensitivity

If demand reaches 186k, 230k, and 281k weekly issues, with 70%, 80%, and 88% verified AI resolution, the financial opportunity shrinks. At 6,000 cases per vendor rep and a $9M program allowance, the cautious vendor and contract assumptions yield about $10.3M net over three years. A 90% vendor share and faster contract changes yield about $30.1M. The website keeps this sensitivity in Appendix E so leadership can compare demand paths without losing the main high-growth recommendation.
