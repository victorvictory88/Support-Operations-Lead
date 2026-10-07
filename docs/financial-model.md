# Three-year financial scenario

This file explains the illustrative cost range shown in the [take-home page](../src/index.html). The calculator in [finance.mjs](../src/finance.mjs) writes all inputs and unrounded results to `dist/financial-model.json` during a build. These figures are planning assumptions for the interview exercise. OpenAI contract costs and case data are unknown.

## Demand and AI path

The exercise supplies 1 billion weekly users, 150,000 weekly issues, and a 60% automated resolution rate. That equals 1.5 weekly support issues per 10,000 weekly users. The stretch scenario assumes 1.25 billion, 1.5 billion, and 2 billion weekly users across Years 1–3. It also assumes 1.76, 2.2, and 2.5 weekly issues per 10,000 users. Multiplying each pair produces 220,000, 330,000, and 500,000 weekly issues. Paid, business, and developer use could raise issue frequency as product needs expand. These scenario inputs are separate from OpenAI growth forecasts.

The high and medium cases reach 70%, 80%, and 90% verified AI resolution. The low case reaches 65%, 75%, and 80%. At 500,000 weekly issues, those final rates send 50,000 or 100,000 cases to people. The 90% stretch target requires enough issues that AI can handle safely, approved actions, and customer outcomes that hold after the initial answer.

## Public vendor prices

[SupportOps Global](https://www.supportopsglobal.com/pricing) lists a dedicated Philippines representative at $1,950 monthly and North American support at $45 hourly. The annualized figures are $23,400 offshore and $93,600 onshore at 2,080 hours. [ConnectPro](https://connectprooutsourcing.com/services/customer-support-outsourcing) provides an additional Philippines price reference. [PITON-Global](https://www.piton-global.com/pricing/) provides another outsourcing cost reference. These public prices indicate an order of magnitude. OpenAI's actual contracts may differ.

Every financial case already assumes 30% onshore and 70% offshore vendor reps, giving an illustrative blended annual bill of about $44k per rep. Moving 100 suitable reps from onshore to offshore would save about $7M yearly before transition costs. The high-case model implies about 940 vendor reps today. The 100-rep location option is separate from the AI savings range and introduces potential quality risk in language nuance, specialist accuracy, and escalation.

## How the model counts savings

The comparison keeps AI resolution at 60% as issue demand grows. In each year, extra cases resolved by AI equal weekly issues multiplied by the difference between that year's proposed AI rate and 60%. The model counts 52 weeks, estimates the portion vendor teams would otherwise handle, converts that volume to vendor representative years, and applies the blended vendor bill. Only the share Finance can reflect in future staffing plans under existing arrangements counts as savings. The model then subtracts assumed AI usage, product integration, linked issue data, specialist coverage, training, evaluation, and oversight spending. It assigns no dollar value to revenue growth, retention, internal staffing changes, or product fixes. Finance needs to validate the investment estimate, including Engineering and embedded specialist costs. Any additional cost would lower net savings.

| Input | Low | Medium | High |
| --- | ---: | ---: | ---: |
| Year 3 verified AI resolution | 80% | 90% | 90% |
| Human-assisted cases vendors would handle | 70% | 70% | 90% |
| Cases each vendor rep handles yearly | 4,000 | 4,000 | 3,000 in Years 1 and 3, with 3,300 in Year 2 |
| Potential savings included in future budgets in Years 1–3 | 10%, 10%, 10% | 25%, 50%, 75% | 40%, 75%, 90% |
| AI and rollout spending across three years | $20M | $20M | $20M |
| Net vendor cost saved across three years | −$14M | +$41M | +$111M |

Both the medium and high cases reach 90% AI resolution in Year 3. The high case is about $70M above the medium case because it assumes vendors would have handled 90% rather than 70% of human-assisted cases, lower cases per rep, and a larger share of vendor cost removed from future budgets. The high case saves about $131M in vendor costs against the comparison forecast and subtracts $20M in assumed AI and rollout spending. Its rounded yearly net figures are +$2M, +$25M, and +$84M. These are future expenses saved against a growing-demand forecast. The Year 2 staffing estimate assumes AI assistance and better routing raise vendor capacity from 3,000 to 3,300 cases per rep. Year 3 returns to 3,000 as the remaining human cases get harder. The modeled vendor reps are about 940 today, 1,030 in Year 1, about 940 in Year 2, and 780 in Year 3. The 60%-AI comparison would require about 1,370, 1,870, and 3,120 vendor reps in Years 1–3. These are workload estimates, not OpenAI staffing figures or a hiring plan. Today's vendor bill could still increase during the transition.

Break-even requires Finance to remove at least $20M in future vendor costs over three years while quality, SLA, and coverage hold. That covers the assumed $20M investment and equals about 15% of the high case gross savings. The headline depends on two sensitive assumptions. Doubling vendor throughput to 6,000 cases per rep each year cuts high-case savings to about $47M after rollout spending. A separate comparison with 65%, 68%, and 70% automation across Years 1–3 without this plan yields about $64M. Both figures retain the other high-case assumptions. The calculator exports these checks to `dist/financial-model.json`.

The $20M spending figure is a round illustrative planning assumption, with $4M in Year 1, $6M in Year 2, and $10M in Year 3. It was not derived from a vendor quote or an OpenAI budget. The proposed allocation is $6M for Process, $10M for Product, and $4M for People. The annual Process amounts are $2M, $2M, and $2M. The Product amounts are $1M, $3M, and $6M. The People amounts are $1M, $1M, and $2M. Spending recurs as AI use, product integration, issue data, quality checks, specialist coverage, and training grow. The high case has 12,376,000 additional AI-resolved issues over three years against the 60%-AI comparison. That implies an assumed cost near $2 per additional AI-resolved issue after rounding, which is not evidence that the budget is sufficient. Finance would price invoice/billing reconciliation and product guidance pilots before setting a budget. No vendor contract changes are assumed. The high case depends on existing arrangements allowing the modeled staffing reductions.

## Funding and controls

In the first 90 days, I would audit demand, customer friction, vendor performance, staffing, tooling, and team capability. Support Delivery, Operations, Product, Engineering, Product Engagement, and Trust & Safety would align on owners and scorecards. Invoice/billing reconciliation and product guidance are the first proposed AI pilots. The audit would confirm their demand and risk before launch. Human escalation would be available. Pilot targets are 10% fewer eligible cases reaching people, a five-point improvement in checked resolution, and zero severe AI errors. Quarterly top-to-top reviews with each vendor would assess Quality, Productivity, Capacity, and Cost to Serve against shared targets. Any gap would have a vendor-specific plan, owner, milestones, and follow-up date. A severe AI error stops the affected action and sends those cases to people. These are proposed planning targets, separate from OpenAI commitments.
