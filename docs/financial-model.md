# Three-year financial scenario

This file explains the illustrative cost range shown in the [take-home page](../src/index.html). The calculator in [finance.mjs](../src/finance.mjs) writes all inputs and unrounded results to `dist/financial-model.json` during a build. These figures are planning assumptions for the interview exercise. OpenAI contract costs and case data are unknown.

## Demand and AI path

The exercise supplies 1 billion weekly users, 150,000 weekly issues, and a 60% automated resolution rate. That equals 1.5 weekly support issues per 10,000 weekly users. The stretch scenario assumes 1.25 billion, 1.5 billion, and 2 billion weekly users across Years 1–3. It also assumes 1.76, 2.2, and 2.5 weekly issues per 10,000 users. Multiplying each pair produces 220,000, 330,000, and 500,000 weekly issues. Paid, business, and developer use could raise issue frequency as product needs expand. These scenario inputs are separate from OpenAI growth forecasts.

The high and medium cases reach 70%, 82%, and 90% verified AI resolution. The low case reaches 65%, 75%, and 82%. At 500,000 weekly issues, those final rates send 50,000 or 90,000 cases to people. The 90% stretch target requires enough issues that AI can handle safely, approved actions, and customer outcomes that hold after the initial answer.

## Public vendor prices

[SupportOps Global](https://www.supportopsglobal.com/pricing) lists a dedicated Philippines representative at $1,950 monthly and North American support at $45 hourly. The annualized figures are $23,400 offshore and $93,600 onshore at 2,080 hours. [ConnectPro](https://connectprooutsourcing.com/services/customer-support-outsourcing) provides an additional Philippines price reference. [PITON-Global](https://www.piton-global.com/pricing/) provides another outsourcing cost reference. These public prices indicate an order of magnitude. OpenAI's actual contracts may differ.

Every financial case already assumes 30% onshore and 70% offshore vendor seats, giving an illustrative blended annual bill of $44,460 per representative. Moving 100 suitable seats from onshore to offshore would save $7.02M yearly before transition costs. That separate option is excluded from the AI savings range. It introduces potential quality risk in language nuance, specialist accuracy, and escalation.

## How the model counts savings

The comparison keeps AI resolution at 60% as issue demand grows. In each year, extra cases resolved by AI equal weekly issues multiplied by the difference between that year's proposed AI rate and 60%. The model counts 52 weeks, estimates the portion a vendor would otherwise handle, converts that volume to vendor representative years, and applies the blended vendor bill. Only the share that can reach a contract or planned-seat budget counts as savings. The model then subtracts proposed AI usage, tools, training, evaluation, and oversight spending. It assigns no dollar value to revenue growth, retention, internal staffing changes, or product fixes. New engineering salaries would need a separate budget estimate.

| Input | Low | Medium | High |
| --- | ---: | ---: | ---: |
| Year 3 verified AI resolution | 82% | 90% | 90% |
| Share of AI-shifted cases vendors would handle | 70% | 70% | 90% |
| Cases each vendor rep handles yearly | 4,000 | 4,000 | 3,000 |
| Potential savings that reach budget in Years 1–3 | 10%, 10%, 10% | 25%, 50%, 75% | 40%, 75%, 90% |
| AI and rollout spending across three years | $20.0M | $20.0M | $20.0M |
| Net vendor cost saved across three years | −$13.1M | +$42.4M | +$117.5M |

The high case saves $137.5M in vendor costs against the comparison forecast and subtracts $20M in AI and rollout spending. Its yearly net figures are +$2.1M, +$31.8M, and +$83.6M. This is future expense saved against a growing-demand forecast. Today's vendor bill could still increase.

The headline depends on two sensitive assumptions. Doubling vendor throughput to 6,000 cases per rep each year cuts high-case savings to $48.8M after rollout spending. A separate comparison with 65%, 68%, and 70% automation across Years 1–3 without this plan yields $69.5M. Both figures retain the other high-case assumptions. The calculator exports these checks to `dist/financial-model.json`.

The $20M spending figure is an illustrative planning assumption, with $4M in Year 1, $6M in Year 2, and $10M in Year 3. It covers AI use, tools, training, evaluations, and quality checks. Finance would price the two pilots and set a capped initial budget before committing to broader spending.

## Funding and controls

I would seek a capped first-stage budget and use the first 90 days to confirm issue ownership, contract terms, case handling time, AI costs, and current customer outcomes. Pilot targets are 10% fewer eligible cases reaching people, a five-point improvement in durable resolution, and zero severe AI errors. Later funding would require repeat contact and backlog age at or below baseline, plus vendor savings that Finance confirms can reach a budget. A severe AI error stops the affected action and sends those cases to people. These are proposed planning gates, separate from OpenAI commitments.
