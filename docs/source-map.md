# Source and assumption map

## Exercise baseline

The supplied take-home PDF sets a hypothetical starting point of 1 billion weekly active users, about 150,000 weekly support issues, and 60% automated resolution. It asks for a three-year outlook, strategic priorities, a future operating model, and measures of success. The exercise PDF stays outside this public repository.

## Planning assumptions

The stretch scenario assumes 1.25 billion, 1.5 billion, and 2 billion weekly users across Years 1–3. It pairs those figures with 1.76, 2.2, and 2.5 weekly issues per 10,000 users, producing 220,000, 330,000, and 500,000 weekly issues. Verified AI resolution rises from the exercise's 60% starting point to 70%, 80%, and 90% in the stretch path. The 90% case leaves 10% of weekly issues for people in Year 3, or 50,000 cases. The slower 80% path leaves 100,000 cases for people. These are exercise assumptions, separate from OpenAI targets.

The chart shows automated resolution, human-assisted cases, and modeled vendor reps. It does not show total OpenAI staffing because the exercise gives no specialist headcount. Cases reaching people rise to 66,000 in Year 1 and stay there in Year 2. Vendor staffing changes only after the agreed Service Level Agreement target and coverage hold. The proposed invoice/billing reconciliation and product guidance pilots use illustrative Day 90 gates of a five-point checked-resolution gain, 10% fewer eligible cases reaching people, and zero severe AI errors. Human escalation stays available. The initial audit would confirm volume and risk before launch.

The 90% stretch rate is conditional on the issue mix. Total automated resolution is the share safe for automation multiplied by the share of those issues that finish with a checked outcome. A 95% eligible share and 95% success among eligible issues would yield about 90% overall. Those two 95% values are a feasibility example, not observed OpenAI performance. Unanswered exits do not count as resolutions. A seven-day related-contact window is a proposed pilot measure, subject to issue-specific adjustment.

Product and Engineering would connect account context, approved guidance, and limited AI actions. Trust & Safety would approve sensitive action boundaries. Support Delivery would train and check partner teams for defined queues and human handoffs. At selected vendor sites, embedded Support specialists would work with sales reps on complex questions, teach customer self-service, and send recurring blockers back to Product Engagement and Operations. Operations would retain one issue ID, sample outcomes, and send recurring failures into quality tests and Product fixes. A severe privacy, policy, or access error stops the affected AI action. The current route remains available for impacted issues.

The presentation orders its investments by dependency. Process establishes linked issue history, approved guidance, and outcome checks before Product adds more AI help and approved actions. People training runs throughout as specialists and partners take harder cases, teach customer self-service, and review AI failures. The illustrative three-year spending split is $6M Process, $10M Product, and $4M People. Annual spending totals $4M, $6M, and $10M. Finance must validate that Product implementation and embedded specialist coverage fit these amounts. Leadership approval covers two bounded pilots, interoperability owners across teams, and Finance pricing for a broader rollout. The visible risk responses stop harmful AI actions, lower the 90% stretch if the eligible issue share falls short, and count financial savings only when vendor spend can fall while SLA and coverage hold.

The quarterly scorecard compares similar issue types across AI, partners, and specialists. Automated resolution, partner quality and SLA, specialist outcomes, repeat contact, backlog, and confirmed vendor spend are reported separately. During pilots, comparable issues on the current route help estimate the new route's contribution. A severe privacy, policy, or access error stops the affected route. Two weeks with related contact more than two points above baseline are a proposed pause threshold, not an OpenAI standard. Missed SLA or backlog targets pause staffing reductions. Quarterly vendor reviews produce a named gap-to-goal plan where targets are missed.

## External source

[OpenAI's published support model](https://openai.com/index/openai-support-model/) informs the recommendation's connection between customer support surfaces, living knowledge, evaluations, and frontline feedback. It also supplies Glen Worthington's quoted description of the purpose of Support. The exercise supplies the hypothetical baseline, and my planning case supplies the multipliers.

## Albert's experience and the demonstration

Albert supplied four years of Meta BPO management across five onshore and offshore vendor partners, plus Meta scorecard measures for coverage, quality, workforce, sales funnel, and Ads AI adoption. The recommendation uses relevant measures inside four Support operating lenses and keeps business revenue as prioritization context. It makes no historical OpenAI Support performance claim.

The additional operating scenarios use fictional organizations, people, dates, goals, and records. One deterministic browser engine calculates their recommendations, and the visual agent chart replays proposed handoffs. The guide gives fixed answers from page content.

## Financial decision case

The [financial model notes](financial-model.md) document public vendor prices, the exercise comparison, all illustrative inputs, the rounded $111M high case, $41M medium case, and $14M low-case shortfall. They also show $47M with doubled vendor throughput and $64M if comparison automation improves. The [calculation module](../src/finance.mjs) produces the unrounded figures. The model estimates vendor cost saved against a flat-automation forecast and leaves revenue and customer retention outside the dollar estimate.
