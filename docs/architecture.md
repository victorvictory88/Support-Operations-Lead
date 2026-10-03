# Architecture and production boundary

## Implemented path

Four fixtures define Quality, Productivity, Capacity, and Cost to serve. Scenario selection updates the operating brief, chart, scorecard, insight, and action plan immediately.

Each metric specifies a numerator, denominator, goal, unit, direction, and definition. The evaluator calculates actual values, signed gaps, and goal attainment. Quality and funnel metrics use minimum goals. Attrition, no-shows, and lateness use maximum thresholds. Zero or invalid denominators produce unavailable values and block completion.

Quality uses audited conversation pass rates. Productivity distinguishes unique-account funnel stages from repeat-call ratios. Capacity uses a shared MTD cutoff, average active headcount for attrition, and scheduled shifts for attendance. Cost compares matching production hours and includes offshore recovery spending.

## Conditional vendor decision

The cost evaluator checks comparable workload, valid cost inputs, adjusted savings, performance goals, completed checkpoints, passing reviews, and the pilot deadline. Retention requires two completed and passing reviews plus a cost advantage. Failed recovery or exhausted savings triggers transfer review. Mixed or incomplete results at the deadline require a transfer decision or an approved extension with a refreshed budget.

Recommendations remain subject to the fictional Commercial Owner’s approval. Transition costs and actual recovery outcomes require further evidence.

## Action plan

Each action includes its text, named owner, role, due date, progress state, proof, and record references. Status is evaluated against the fixed fictional review date. Blocked or overdue actions appear red, at-risk actions yellow, and on-track actions green. The boxes also contain text, so color carries no exclusive meaning.

Green indicates progress rather than completion. The page records no human approvals or external actions. Closure requires passing metric and vendor gates, complete records, approval, completed actions, and success confirmation.

## Chart and accessibility

An orchestrator and three scenario-specific specialist objects are produced by one deterministic engine. The chart replays their sequential handoffs with a 6.5-second pulse. The final specialist hands off to the displayed human reviewer. Pause and reduced-motion controls keep the chart static.

The green split screen retains the introduction beside the chart. Scorecards and action tables adapt to stacked rows on phones. Question-mark controls explain sections and metric definitions through hover or keyboard focus. Escape dismisses explanations and closes Onigiri while restoring launcher focus.

Calculations and fictional records expand on demand. Action proof is collapsed beneath each action. Evidence links automatically open the supporting record section.

## Proposed specialist teams

| Scenario | Specialist sequence |
| --- | --- |
| Quality | Quality analyst, Coaching designer, Partner lead |
| Productivity | Funnel analyst, Sales coach, Execution lead |
| Capacity | Workforce analyst, Workforce planner, Retention partner |
| Cost to serve | Cost analyst, Recovery designer, Commercial reviewer |

These are proposed responsibility handoffs, and the implementation runs no independent or parallel agents.

## Onigiri and production limits

Onigiri matches question topics to selected page content, calculations, and dated action plans. Visitor input enters text nodes, avoiding HTML execution. The guide uses no remote model, persistent storage, live customer data, or external writes.

Production would require authorized CRM, conversation audits, workforce records, vendor costs, and secure integrations. Engineering would own permissions, source versioning, privacy controls, audit records, rollback, monitoring, and task-specific evaluations. Fixture checks provide no production reliability or financial-outcome estimate.
