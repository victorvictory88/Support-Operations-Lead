export const ROLE_URL='https://openai.com/careers/support-operations-lead-san-francisco/';
export const SCENARIOS=[
 {
  "id": "quality",
  "title": "Quality",
  "category": "CONVERSATION QUALITY",
  "summary": "Tailoring and commercial quality miss goal.",
  "priority": "High",
  "reviewDate": "2026-10-15",
  "organization": "Cedar Partner Operations",
  "signal": "Audited conversations fall short on Tailored Solutions and Commercial Conversations.",
  "data": {
   "metrics": [
    {
     "id": "tailored",
     "label": "Tailored Solutions",
     "numerator": 72,
     "denominator": 100,
     "goal": 90,
     "unit": "%",
     "direction": "up",
     "help": "Audited conversations passing the tailored-solution standard ÷ all 100 audited conversations. Passing requires a recommendation tied to the customer’s stated needs."
    },
    {
     "id": "commercial",
     "label": "Commercial Conversations",
     "numerator": 78,
     "denominator": 100,
     "goal": 90,
     "unit": "%",
     "direction": "up",
     "help": "Audited conversations passing the commercial-conversation standard ÷ all 100 audited conversations. Passing requires a value discussion, relevant commercial context, and an agreed next step."
    }
   ]
  },
  "required": [
   "audit",
   "rubric",
   "coaching"
  ],
  "records": [
   {
    "id": "audit",
    "title": "Conversation audit",
    "text": "72 of 100 audited conversations pass Tailored Solutions. 78 of 100 pass Commercial Conversations. Both fictional goals are 90%. The sample spans two teams, with customer complexity still to be matched.",
    "fictional": true
   },
   {
    "id": "rubric",
    "title": "Quality scoring rubric",
    "text": "Tailored Solutions requires discovery and a recommendation linked to customer needs. Commercial Conversations requires value, relevant commercial context, and an agreed next step. Scorers must calibrate against the same examples.",
    "fictional": true
   },
   {
    "id": "coaching",
    "title": "Coaching review",
    "text": "Sampled misses include generic recommendations and conversations ending without an agreed next step. A coached pilot and a fresh, complexity-matched audit are proposed. These observations suggest coaching topics, without proving a cause.",
    "fictional": true
   }
  ],
  "uncertainty": "The 100-conversation sample may differ from the wider book. Calibration and a matched follow-up audit are required.",
  "nextCheck": "Calibrate the rubric, coach the two observed gaps, and audit 100 fresh conversations by October 29.",
  "success": "Reach 90% on both quality measures in two consecutive calibrated audits before closing the plan.",
  "owners": [
   {
    "name": "Nina Patel",
    "role": "Quality Lead",
    "action": "Calibrate scoring and confirm the two defect categories.",
    "due": "2026-10-14",
    "state": "blocked",
    "proof": "An agreed rubric and scored calibration examples.",
    "refs": [
     "audit",
     "rubric"
    ]
   },
   {
    "name": "Maya Chen",
    "role": "Enablement Lead",
    "action": "Coach discovery, solution fit, value, and explicit next steps.",
    "due": "2026-10-20",
    "state": "at-risk",
    "proof": "Observed proficiency checks from both teams.",
    "refs": [
     "coaching"
    ]
   },
   {
    "name": "Leo Grant",
    "role": "Partner Operations",
    "action": "Re-audit 100 conversations and review recovery against both goals.",
    "due": "2026-10-29",
    "state": "on-track",
    "proof": "Two consecutive audits at or above 90%.",
    "refs": [
     "audit",
     "rubric"
    ]
   }
  ],
  "draft": "Tailored Solutions and Commercial Conversations are below their 90% goals. Nina will confirm scoring consistency, and Maya will coach the observed gaps. Leo will review a fresh audit before approving closure.",
  "test": "Checks both quality gaps and requires calibrated evidence before declaring recovery.",
  "specialists": [
   {
    "id": "service",
    "label": "Quality analyst",
    "help": "Measures the two quality gaps and checks sampling and scoring consistency.",
    "input": "Audit and rubric",
    "key": "quality"
   },
   {
    "id": "change",
    "label": "Coaching designer",
    "help": "Turns observed conversation defects into targeted practice and proficiency checks.",
    "input": "Defect examples",
    "key": "coaching"
   },
   {
    "id": "vendor",
    "label": "Partner lead",
    "help": "Assigns the recovery plan and checks sustained results before closure.",
    "input": "Fresh audit plan",
    "key": "review"
   }
  ]
 },
 {
  "id": "productivity",
  "title": "Productivity",
  "category": "SALES FUNNEL",
  "summary": "Book coverage and pitch execution lag.",
  "priority": "High",
  "reviewDate": "2026-10-15",
  "organization": "Orchard Partner Operations",
  "signal": "Connection rate reaches goal, but book coverage and pitch execution leave gaps in the sales funnel.",
  "data": {
   "book": 1000,
   "attempted": 700,
   "connected": 420,
   "pitched": 252,
   "pitchedCalls": 300,
   "connectedCalls": 500,
   "recommendedSolutions": 450,
   "metrics": [
    {
     "id": "attempted",
     "label": "% book attempted",
     "numerator": 700,
     "denominator": 1000,
     "goal": 90,
     "unit": "%",
     "direction": "up",
     "help": "Unique assigned accounts attempted ÷ the 1,000-account book during the review period."
    },
    {
     "id": "connected",
     "label": "% connected",
     "numerator": 420,
     "denominator": 700,
     "goal": 60,
     "unit": "%",
     "direction": "up",
     "help": "Unique accounts connected ÷ unique accounts attempted. This is a stage conversion rate, with repeat calls excluded."
    },
    {
     "id": "pitched",
     "label": "% pitched",
     "numerator": 252,
     "denominator": 420,
     "goal": 80,
     "unit": "%",
     "direction": "up",
     "help": "Unique accounts receiving a pitch ÷ unique connected accounts. A pitch requires a relevant recommendation and documented next step."
    },
    {
     "id": "callsBook",
     "label": "Pitched Calls / Book",
     "numerator": 300,
     "denominator": 1000,
     "goal": 0.5,
     "unit": "ratio",
     "direction": "up",
     "help": "All pitched calls ÷ the assigned account book. Repeat pitched calls count, so this differs from the unique-account pitch rate."
    },
    {
     "id": "solutions",
     "label": "Pitched Rec Sol / Call",
     "numerator": 450,
     "denominator": 500,
     "goal": 1.2,
     "unit": "ratio",
     "direction": "up",
     "help": "Recommended solutions pitched ÷ connected calls, including repeat calls. The connected-call denominator was confirmed by Albert."
    }
   ]
  },
  "required": [
   "funnel",
   "calls",
   "routing"
  ],
  "records": [
   {
    "id": "funnel",
    "title": "Unique-account funnel",
    "text": "The period contains 1,000 assigned accounts, 700 attempted accounts, 420 connected accounts, and 252 pitched accounts. Fictional stage goals are 90% attempted, 60% connected, and 80% pitched.",
    "fictional": true
   },
   {
    "id": "calls",
    "title": "Call and recommendation ledger",
    "text": "The period contains 500 connected calls, 300 pitched calls, and 450 recommended solutions pitched. Repeat calls are counted here. Goals are 0.50 pitched calls per assigned account and 1.20 recommendations per connected call.",
    "fictional": true
   },
   {
    "id": "routing",
    "title": "Coverage and coaching review",
    "text": "300 assigned accounts have no recorded attempt. The proposed plan protects outreach blocks, validates account eligibility, and coaches discovery-to-pitch transitions. Quality scoring remains a guardrail against low-value pitches.",
    "fictional": true
   }
  ],
  "uncertainty": "Stage rates use unique accounts, while call ratios include repeats. Eligibility and contact mix need validation before extrapolating gains.",
  "nextCheck": "Validate unattempted accounts, protect outreach blocks, and review pitch conversion with quality on October 22.",
  "success": "Reach the five funnel goals for two weekly reviews while retaining the 90% quality floors.",
  "owners": [
   {
    "name": "Jo Kim",
    "role": "Sales Operations",
    "action": "Validate the 300 untouched accounts and assign daily coverage blocks.",
    "due": "2026-10-17",
    "state": "at-risk",
    "proof": "An eligible-account list and logged outreach coverage.",
    "refs": [
     "funnel",
     "routing"
    ]
   },
   {
    "name": "Maya Chen",
    "role": "Enablement Lead",
    "action": "Coach discovery-to-pitch transitions and relevant solution recommendations.",
    "due": "2026-10-21",
    "state": "on-track",
    "proof": "Observed practice and call audits retaining quality floors.",
    "refs": [
     "calls",
     "routing"
    ]
   },
   {
    "name": "Nina Patel",
    "role": "Funnel Analytics",
    "action": "Reconcile account and call denominators before the weekly review.",
    "due": "2026-10-14",
    "state": "blocked",
    "proof": "A reconciled funnel with account IDs and repeat-call counts.",
    "refs": [
     "funnel",
     "calls"
    ]
   }
  ],
  "draft": "Connection rate reaches goal, while coverage and pitch execution need recovery. Jo will protect outreach coverage, Maya will coach relevant pitches, and Nina will reconcile account and call counts before the next review.",
  "test": "Checks every funnel denominator and keeps unique accounts separate from repeat calls.",
  "specialists": [
   {
    "id": "service",
    "label": "Funnel analyst",
    "help": "Locates stage gaps using explicit account and call denominators.",
    "input": "Account and call ledger",
    "key": "funnel"
   },
   {
    "id": "change",
    "label": "Sales coach",
    "help": "Improves discovery, relevant pitching, and next-step discipline while retaining quality.",
    "input": "Pitch-quality examples",
    "key": "coaching"
   },
   {
    "id": "vendor",
    "label": "Execution lead",
    "help": "Assigns outreach blocks and monitors funnel recovery across vendor teams.",
    "input": "Coverage plan",
    "key": "review"
   }
  ]
 },
 {
  "id": "capacity",
  "title": "Capacity",
  "category": "WORKFORCE HEALTH",
  "summary": "Hours, attendance, and retention miss goal.",
  "priority": "High",
  "reviewDate": "2026-10-15",
  "organization": "Northstar Partner Operations",
  "signal": "MTD production hours miss the cutoff plan, with elevated voluntary attrition, no-shows, and lateness.",
  "data": {
   "metrics": [
    {
     "id": "hours",
     "label": "MTD Production Hours",
     "numerator": 9200,
     "denominator": 1,
     "goal": 10000,
     "unit": "hours",
     "direction": "up",
     "help": "Verified production hours from October 1 through the October 15 cutoff, compared with the cumulative plan for that identical cutoff. Training and absence are excluded."
    },
    {
     "id": "voluntary",
     "label": "Voluntary attrition",
     "numerator": 10,
     "denominator": 200,
     "goal": 3,
     "unit": "%",
     "direction": "down",
     "help": "Voluntary exits during October 1–15 ÷ average active headcount of 200 during that period. This is a month-to-date rate, without annualization."
    },
    {
     "id": "involuntary",
     "label": "Involuntary attrition",
     "numerator": 2,
     "denominator": 200,
     "goal": 1.5,
     "unit": "%",
     "direction": "down",
     "help": "Involuntary exits during October 1–15 ÷ average active headcount of 200. The goal is a maximum monitoring threshold, with individual decisions subject to HR review."
    },
    {
     "id": "noshow",
     "label": "Agent No Show",
     "numerator": 50,
     "denominator": 1000,
     "goal": 2,
     "unit": "%",
     "direction": "down",
     "help": "No-show agent shifts ÷ 1,000 scheduled agent shifts during the cutoff period. No-shows are excluded from the late-shift numerator."
    },
    {
     "id": "late",
     "label": "Agent Late",
     "numerator": 80,
     "denominator": 1000,
     "goal": 4,
     "unit": "%",
     "direction": "down",
     "help": "Late attended shifts ÷ 1,000 scheduled agent shifts, using the fictional 10-minute grace rule. No-show shifts remain excluded from late counts."
    }
   ]
  },
  "required": [
   "hours",
   "workforce",
   "attendance"
  ],
  "records": [
   {
    "id": "hours",
    "title": "MTD hours reconciliation",
    "text": "October 1–15 production totals 9,200 hours against a cumulative 10,000-hour plan. A proposed catch-up plan adds 600 qualified backfill hours and 200 attendance-recovery hours above the future baseline across separate shifts. Both remain unapproved estimates.",
    "fictional": true
   },
   {
    "id": "workforce",
    "title": "Workforce movement",
    "text": "Average active headcount is 200 during the cutoff period. Ten voluntary exits produce 5% against a 3% maximum. Two involuntary exits produce 1% against a 1.5% maximum. Exit reasons require an aggregated retention review. October exits remain historical facts. A plan agreed on October 22 targets voluntary attrition at or below 3% in November, using that month’s average active headcount.",
    "fictional": true
   },
   {
    "id": "attendance",
    "title": "Shift attendance ledger",
    "text": "Across 1,000 scheduled shifts, 50 are no-shows and 80 attended shifts start beyond the 10-minute grace rule. Goals are at most 2% no-shows and 4% late shifts. These categories are mutually exclusive.",
    "fictional": true
   }
  ],
  "uncertainty": "The hours gap needs incremental coverage above the forward plan. October exits cannot be reversed, so retention outcomes are checked in November.",
  "nextCheck": "Reconcile lost hours by shift, validate non-overlapping recovery hours, and review retention themes on October 22.",
  "success": "Recover the 800-hour gap above the forward plan, sustain attendance goals, and reduce voluntary attrition to 3% or below in November.",
  "owners": [
   {
    "name": "Maya Chen",
    "role": "Workforce Management",
    "action": "Approve 600 backfill hours and 200 attendance-recovery hours above the forward plan.",
    "due": "2026-10-18",
    "state": "at-risk",
    "proof": "An incremental roster with qualified coverage, separate shifts, and no double counting.",
    "refs": [
     "hours",
     "attendance"
    ]
   },
   {
    "name": "Leo Grant",
    "role": "Partner Operations",
    "action": "Address no-show and lateness patterns through shift-level follow-up.",
    "due": "2026-10-14",
    "state": "blocked",
    "proof": "A reviewed attendance plan and daily exception log.",
    "refs": [
     "attendance"
    ]
   },
   {
    "name": "Asha Rao",
    "role": "People Partner",
    "action": "Launch retention actions and verify November voluntary attrition at or below 3%.",
    "due": "2026-11-30",
    "state": "on-track",
    "proof": "An aggregated retention plan and November exit/headcount report.",
    "refs": [
     "workforce"
    ]
   }
  ],
  "draft": "MTD production is 800 hours below the cutoff plan. Maya will validate qualified recovery hours, Leo will address attendance patterns, and Asha will review voluntary exit themes. Involuntary attrition remains within its monitoring threshold.",
  "test": "Checks matched MTD cutoffs, attrition denominators, and separate late and no-show counts.",
  "specialists": [
   {
    "id": "service",
    "label": "Workforce analyst",
    "help": "Reconciles hours, exits, and attendance using a common cutoff.",
    "input": "Hours and shift records",
    "key": "capacity"
   },
   {
    "id": "capacity",
    "label": "Workforce planner",
    "help": "Builds a qualified recovery schedule without double-counting hours.",
    "input": "Available coverage",
    "key": "planning"
   },
   {
    "id": "change",
    "label": "Retention partner",
    "help": "Reviews aggregated exit themes with HR and vendor leaders before selecting actions.",
    "input": "Workforce movement",
    "key": "review"
   }
  ]
 },
 {
  "id": "cost",
  "title": "Cost to serve",
  "category": "VENDOR LOCATION",
  "summary": "Offshore savings need a performance recovery.",
  "priority": "High",
  "reviewDate": "2026-10-15",
  "organization": "Harbor Partner Operations • two fictional vendors",
  "signal": "The offshore vendor costs less, but trails goals for conversation quality, pitching, and attendance.",
  "data": {
   "productionHours": 1000,
   "onshoreHourly": 48,
   "offshoreHourly": 28,
   "recoveryCost": 6000,
   "reviewCyclesFailed": 0,
   "consecutivePasses": 0,
   "reviewedCheckpoints": 0,
   "pilotEnd": "2026-11-14",
   "comparable": true,
   "metrics": [
    {
     "id": "tailored",
     "label": "Tailored Solutions",
     "numerator": 75,
     "denominator": 100,
     "goal": 90,
     "unit": "%",
     "direction": "up",
     "help": "Passing audited conversations ÷ the offshore audit sample. Compare equivalent customer complexity using the Quality scenario rubric."
    },
    {
     "id": "commercial",
     "label": "Commercial Conversations",
     "numerator": 80,
     "denominator": 100,
     "goal": 90,
     "unit": "%",
     "direction": "up",
     "help": "Passing audited conversations ÷ the offshore audit sample, using the shared commercial-quality rubric."
    },
    {
     "id": "pitched",
     "label": "% pitched",
     "numerator": 280,
     "denominator": 400,
     "goal": 80,
     "unit": "%",
     "direction": "up",
     "help": "Unique pitched accounts ÷ unique connected accounts for the offshore vendor."
    },
    {
     "id": "noshow",
     "label": "Agent No Show",
     "numerator": 50,
     "denominator": 1000,
     "goal": 2,
     "unit": "%",
     "direction": "down",
     "help": "Offshore no-show shifts ÷ scheduled shifts. The onshore comparator uses the matching cutoff and shift definition."
    }
   ],
   "onshore": {
    "tailored": 93,
    "commercial": 92,
    "pitched": 82,
    "noshow": 1.5
   }
  },
  "required": [
   "costs",
   "scorecard",
   "recovery"
  ],
  "records": [
   {
    "id": "costs",
    "title": "Matched vendor cost model",
    "text": "Each vendor supplies 1,000 verified production hours for an equivalent eligible-work cohort. Onshore costs $48 per production hour and offshore costs $28. Offshore recovery adds $6,000 for coaching and oversight during a 30-day pilot. Transition costs and actual recovery effectiveness remain unknown.",
    "fictional": true
   },
   {
    "id": "scorecard",
    "title": "Vendor performance comparison",
    "text": "Onshore versus offshore results are 93% versus 75% Tailored Solutions, 92% versus 80% Commercial Conversations, 82% versus 70% pitched, and 1.5% versus 5% no-shows. Goals are 90%, 90%, 80%, and at most 2%, respectively. Geography alone does not establish the cause.",
    "fictional": true
   },
   {
    "id": "recovery",
    "title": "Conditional location review",
    "text": "Retain the current offshore allocation during a bounded 30-day recovery pilot, with no expansion. Review on October 29 and November 14. Retain offshore after two passing reviews if its adjusted cost stays below onshore. After two failed reviews or loss of cost advantage, review a phased transfer and transition costs before approval. At the November 14 deadline or after two completed checkpoints without two passing results, the owner must decide on a transfer or an approved extension with a refreshed budget.",
    "fictional": true
   }
  ],
  "uncertainty": "This compares two fictional vendors, without generalizing by geography. Recovery effectiveness and transition costs remain unproven.",
  "nextCheck": "Run matched audits and verify recovery spending on October 29, then make the location decision on November 14.",
  "success": "Retain offshore only after two passing performance reviews with an adjusted cost advantage. Otherwise review a phased transfer.",
  "owners": [
   {
    "name": "Nina Patel",
    "role": "Cost Analytics",
    "action": "Validate the comparable workload and the $6,000 recovery budget.",
    "due": "2026-10-17",
    "state": "on-track",
    "proof": "Matched workload records and approved cost allocation.",
    "refs": [
     "costs"
    ]
   },
   {
    "name": "Maya Chen",
    "role": "Vendor Enablement",
    "action": "Coach tailored recommendations, commercial value, and pitch transitions.",
    "due": "2026-10-22",
    "state": "at-risk",
    "proof": "Matched audits showing movement toward each quality and pitch goal.",
    "refs": [
     "scorecard",
     "recovery"
    ]
   },
   {
    "name": "Leo Grant",
    "role": "Partner Operations",
    "action": "Resolve attendance gaps and review the first recovery checkpoint.",
    "due": "2026-10-29",
    "state": "at-risk",
    "proof": "A shift-level attendance report and calibrated scorecard.",
    "refs": [
     "scorecard"
    ]
   },
   {
    "name": "Sam Ortiz",
    "role": "Commercial Owner",
    "action": "Choose retention or phased transfer after two checkpoints.",
    "due": "2026-11-14",
    "state": "on-track",
    "proof": "Two reviewed scorecards, adjusted costs, and a transition estimate.",
    "refs": [
     "costs",
     "recovery"
    ]
   }
  ],
  "draft": "Offshore has a modeled cost advantage after the recovery budget, while its performance gaps remain open. Current allocation stays capped during the 30-day pilot. Sam will review two checkpoints and adjusted costs before approving retention or a phased transfer.",
  "test": "Checks adjusted cost, performance gates, and a conditional location decision without assuming recovery.",
  "specialists": [
   {
    "id": "service",
    "label": "Cost analyst",
    "help": "Compares costs at equivalent production hours and includes recovery spending.",
    "input": "Matched vendor costs",
    "key": "cost"
   },
   {
    "id": "change",
    "label": "Recovery designer",
    "help": "Targets the offshore quality, pitching, and attendance gaps through a bounded pilot.",
    "input": "Vendor scorecard",
    "key": "recovery"
   },
   {
    "id": "vendor",
    "label": "Commercial reviewer",
    "help": "Applies cost and performance gates before retaining or transferring allocation.",
    "input": "Two-checkpoint rule",
    "key": "review"
   }
  ]
 }
];
