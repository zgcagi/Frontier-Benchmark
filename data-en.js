/* ==========================================================================
   2026 FRONTIER AI EVALUATION SURVEY | SINGLE-SOURCE VERIFIED DATASET (EN)
   Data Cutoff: 2026-11-26 | Strictly aligned with Seminar PPTX P63-P64
   Core Sample: 16 Frontier Benchmarks (3 Code / 6 Science / 4 Office / 2 CUA / 1 Physical)
                + 3 Legacy Baselines
   Zero em-dash, zero middle-dot, zero fluff tokens.
   ========================================================================== */

window.REPORT_DATA = {
  // 1. AA Intelligence Index Overnight Swap (2026.10.26 v4.3.2 -> 2026.10.27 v5.0)
  // Strictly limited to the 6 checkpoints evaluated across the 24-hour swap.
  aaOvernight: [
    { model: "GPT-6 Astra", group: "us", v4: 54, v5: 58, delta: "+4", note: "Gained 4 points against the trend, driven by private PR merging and cleaned academic reasoning" },
    { model: "Claude Opus 5.5", group: "us", v4: 57, v5: 56, delta: "-1", note: "Held the top tier (Nov flagships Fable 5.2 and Gemini 4 Neon rose to 60-65)" },
    { model: "Gemini 4 Carbon", group: "us", v4: 53, v5: 51, delta: "-2", note: "US closed-source flagships held steady in the 50-58 band post-swap" },
    { model: "Kimi K3.1 Pro", group: "cn", v4: 55, v5: 46, delta: "-9", note: "Top Chinese model; dropped 9 points within 24 hours of the benchmark swap" },
    { model: "DeepSeek V4.1 Flash", group: "cn", v4: 45, v5: 32, delta: "-13", note: "Losses concentrated in the three newly weighted evals: FrontierCode 2.0, TB-Science 0.1, and HLE-Diamond" },
    { model: "GLM-5.3", group: "cn", v4: 45, v5: 32, delta: "-13", note: "Same weights dropped 13 points overnight, widening the gap to the leader from 12 to 26 points" }
  ],

  // 1B. Frontier Closed-Source Lab Release Table Shift (2026.11: Fable 5.2 / GPT-6.2 / Gemini 4 Neon)
  releaseShift: {
    retired: [
      "MMLU 88.1%",
      "AIME 100%",
      "GPQA Diamond 96.8%",
      "ARC-AGI-2 95.8%",
      "SWE-V 87.6%",
      "TB 2.0 84.7%"
    ],
    rows: [
      { track: "Code Engineering", name: "FrontierCode 2.0", fable: "p:50.2%", gpt: "p:44.2%", gemini: "p:46.2%", tag: "3-Lab Consensus", note: "Private PR merge quality + 501 maintainer blockers; primary headline metric across all three Nov launches" },
      { track: "Code Engineering", name: "FrontierSWE v2 (20h)", fable: "p:69.9%", gpt: "r:65.5%", gemini: "r:62.4%", tag: "20h Open Eng", note: "Long-horizon systems engineering without reference patches; featured by Anthropic with unified-harness peer runs" },
      { track: "Code Engineering", name: "Terminal-Bench 4.1", fable: "r:65.8%", gpt: "r:62.1%", gemini: "p:64.5%", tag: "Open Container", note: "Google introduced cheating-adjusted scores; Harbor dual-container spec reused across tracks" },
      { track: "Science", name: "TB-Science 0.1", fable: "p:74.6%", gpt: "p:77.1%", gemini: "p:70.5%", tag: "3-Lab Consensus", note: "The sole CLI scientific computing benchmark featured by all three US frontier labs" },
      { track: "Science", name: "HLE-Diamond", fable: "p:80.2%", gpt: "p:72.2%", gemini: "p:71.3%", tag: "Cleaned Core", note: "After audits uncovered 29%-46% mislabeled items in original HLE, all three labs switched to cleaned Diamond" },
      { track: "Science", name: "Wet-Lab Evals (Binder / BioBasics)", fable: "p:14/15 targets", gpt: "p:66.7% debug", gemini: "n:Not disclosed", tag: "Wet-Lab Eval", note: "Anthropic 24h de novo binders validated via blind CRO synthesis; OpenAI x Ligo tests unpublished raw lab imagery" },
      { track: "Office Workflows", name: "AutomationBench (Strict Pass)", fable: "p:51.6%", gpt: "r:50.7%", gemini: "p:56.6%", tag: "47 SaaS DB", note: "Featured by Anthropic and Google; strictly requires 100% completion across all sub-objectives" },
      { track: "Office Workflows", name: "AA-Briefcase / RLI Freelance", fable: "p:66.1% / 41.3%", gpt: "p:GDPval / 20.8%", gemini: "r:ALE 75.8%", tag: "Commercial Eval", note: "Shifts to dual-track enterprise drive audits and binary client-payment acceptance on real Upwork orders" },
      { track: "Computer-Use Agent", name: "OSWorld 2.1 (Step / Strict)", fable: "p:89.3 / 54.6%", gpt: "p:79.5 / 44.0%", gemini: "r:80.4 / 45.8%", tag: "1.6h Desktop", note: "Horizon stretched 48x from 2-min single-app prompts to multi-app workflows; also includes Chartography 2D vision" },
      { track: "Physical Interaction", name: "RoboDojo Sim / Safety Redlines", fable: "p:64.9%‡ / 91%", gpt: "p:29.8% / Crit", gemini: "p:Dual-sys / IPI 0%", tag: "Physical & Sec", note: "Embodied simulation plus ExploitBench and behavioral safety audits became primary Nov launch pillars" }
    ]
  },

  // 2. US vs China 10-Benchmark Adoption Matrix (2026.06-09 -> 2026.11)
  adoptionMatrix: [
    { name: "FrontierCode v1->2.0", tag: "Private PR", track: "Code", bid: "fc2", oai: "nov:Nov GPT-6.2", ant: "early:Summer Opus 4.7->5.5", goo: "nov:Nov Neon", cnOld: "gap:Not adopted", cnNow: "gap:Missing (AA/devin proxy)", gapNote: "17-30 pt gap (compounded by 15-20 pt harness gap)" },
    { name: "FrontierSWE v2", tag: "20h Eng", track: "Code", bid: "fswe2", oai: "early:Summer GPT-6", ant: "early:Summer Opus 5/5.5", goo: "early:Summer Argon", cnOld: "gap:Not adopted", cnNow: "gap:Missing", gapNote: "40 pt gap even at equal cost and longer runtime (69.9% vs 30.2%)" },
    { name: "DeepSWE / SWE-sweep", tag: "Long-Horizon Repo", track: "Code", bid: null, oai: "nov:Nov GPT-6.2", ant: "nov:Nov Opus 5.5", goo: "early:Summer Argon->Neon", cnOld: "gap:Not adopted", cnNow: "cnok:Official DeepSWE", gapNote: "Rapid follow-up on open, self-runnable benchmarks" },
    { name: "Terminal-Bench 4.0/4.1", tag: "Open Container", track: "Terminal", bid: "tb41", oai: "early:Summer 5.6/6", ant: "early:Summer Opus 5/5.5", goo: "early:Summer Argon->Neon", cnOld: "gap:Stuck on TB 2.1", cnNow: "cnok:Official TB 4.0", gapNote: "Gap narrowed to 6.1 pts (Kimi 59.7% vs 65.8%)" },
    { name: "TB-Science 0.1", tag: "Sci CLI", track: "Science", bid: "tbs", oai: "nov:Nov GPT-6.2", ant: "nov:Nov Fable 5.2", goo: "nov:Nov Neon", cnOld: "gap:Not adopted", cnNow: "gap:Missing", gapNote: "43 pt gap (77.1% vs AA Kimi 34.3%)" },
    { name: "HLE-Diamond", tag: "Cleaned Acad", track: "Reasoning", bid: "hle", oai: "nov:Nov GPT-6.2", ant: "nov:Nov Fable 5.2", goo: "nov:Nov Neon", cnOld: "gap:Stuck on Orig HLE", cnNow: "gap:Missing (AA 44.9%)", gapNote: "35 pt gap (80.2% vs Qwen4 44.9%)" },
    { name: "AutomationBench / ALE v1.1", tag: "SaaS / Occ", track: "Office", bid: "autobench", oai: "early:Summer 5.6->6.2", ant: "nov:Nov Fable 5.2", goo: "early:Summer Argon->Neon", cnOld: "gap:Not adopted", cnNow: "cnok:Official ALE v1.1", gapNote: "9 pt strict-pass gap on AutoBench (47.2% vs 56.6%)" },
    { name: "Remote Labor Index (RLI)", tag: "Real Freelance", track: "Office", bid: "rli", oai: "early:Summer GPT-6", ant: "early:Summer Opus 5.5", goo: "early:Summer Argon", cnOld: "gap:Not adopted", cnNow: "gap:Missing (DS 9.6% only)", gapNote: "32 pt gap (41.3% vs 9.6%)" },
    { name: "OSWorld 2.0 / 2.1", tag: "Long Desktop", track: "Desktop", bid: "osworld", oai: "early:Summer 5.6 Sol", ant: "early:Summer Opus 5.5", goo: "nov:Oct Carbon", cnOld: "gap:Stuck on 1.0-V", cnNow: "gap:Missing (v2 ~22%)", gapNote: "Wide gap on v2 full set and 2.1 strict protocol" },
    { name: "RoboDojo / First Exam", tag: "3D Physical", track: "Physical", bid: "robodojo", oai: "early:Summer 5.6->6", ant: "early:Summer 5.5->5.2", goo: "nov:Nov Argon/Neon", cnOld: "gap:Not adopted", cnNow: "gap:Missing", gapNote: "Sim 64.9%‡ vs open VLA 8.8%; realtime clock stalls all models" }
  ],

  // 3. Coding Cost Pareto & Terminal-Bench 4.1
  fsweLeaderboard: [
    { model: "Claude Fable 5.2", score: 69.9, cost: 169, costLabel: "$169/task", hours: "12-16.5h", cn: false, note: "Executes git reset to pivot approaches after 2-3h without measurable progress" },
    { model: "GPT-6 Astra", score: 65.5, cost: 1030, costLabel: "$1,030/task", hours: "15.2h", cn: false, note: "Costs 16.6x more than Carbon for only a 4.3 pt score gain" },
    { model: "Gemini 4 Neon", score: 62.4, cost: 96, costLabel: "$96/task", hours: "13.8h", cn: false, note: "Matches GLM-5.3 per-task cost while more than doubling the solve rate" },
    { model: "Gemini 4 Carbon", score: 61.2, cost: 62, costLabel: "$62/task", hours: "12.6h", cn: false, note: "High cost-efficiency mid-tier reference point" },
    { model: "Claude Haiku 5.5 (Small)", score: 43.8, cost: 21, costLabel: "$21/task", hours: "11.4h", cn: false, note: "Small model outperforms pricier CN flagships, showing short-to-mid horizon bottlenecks are not parameter-bound" },
    { model: "GLM-5.3 (Top Open)", score: 30.2, cost: 97, costLabel: "$97/task", hours: "17.1h", cn: true, note: "Runs longer at equal cost, yet solves less than half as many tasks as US leaders" },
    { model: "Kimi K3", score: 25.9, cost: 110, costLabel: "$110/task", hours: "18.5h", cn: true, note: "Burns 18h+ even on 0-score tasks due to lack of an effective rollback strategy" },
    { model: "Qwen3.8-Max", score: 17.8, cost: 51, costLabel: "$51/task", hours: "17.8h", cn: true, note: "First submission delayed to 18.8h; biased toward localized patching" },
    { model: "DeepSeek V4 Flash Vision", score: 14.8, cost: 8.6, costLabel: "$8.6/task", hours: "16.9h", cn: true, note: "Ultra-low-cost Pareto frontier anchor" }
  ],

  tb41Leaderboard: [
    { model: "Copilot Fusion", score: 71.2, cost: 2.0, costLabel: "$2.0K", cn: false, harness: "Proprietary router fusion" },
    { model: "Claude Opus 5.5", score: 65.8, cost: 4.7, costLabel: "$4.7K", cn: false, harness: "Claude Code native" },
    { model: "Claude Fable 5.2", score: 65.8, cost: 16.5, costLabel: "$16.5K", cn: false, harness: "Claude Code native" },
    { model: "Gemini 4 Carbon", score: 64.5, cost: 1.4, costLabel: "$1.4K", cn: false, harness: "Google native" },
    { model: "GPT-6.2 Astra", score: 62.1, cost: 1.4, costLabel: "$1.4K", cn: false, harness: "Codex native" },
    { model: "Kimi K3.1 Pro", score: 59.7, cost: 1.1, costLabel: "$1.1K", cn: true, harness: "Claude Code (#1 CN, -6.1)" },
    { model: "GLM-5.3", score: 41.2, cost: 2.7, costLabel: "$2.7K", cn: true, harness: "On Claude Code" },
    { model: "DeepSeek V4.1 Flash", score: 38.5, cost: 0.2, costLabel: "$0.2K", cn: true, harness: "1/80th the cost of Fable" },
    { model: "Tencent Hy4", score: 37.9, cost: 0.35, costLabel: "$0.35K", cn: true, harness: "On Claude Code" },
    { model: "Qwen3.8-Max", score: 27.0, cost: 4.6, costLabel: "$4.6K", cn: true, harness: "On Claude Code" }
  ],

  // 4. Office Dual-Metric Gap (AutomationBench-AA & ALE v1.1)
  officeDualMetrics: {
    autobench: [
      { model: "Gemini 4 Neon", partial: 79.3, strict: 56.6, cn: false },
      { model: "GPT-6.2 Astra", partial: 77.2, strict: 50.7, cn: false },
      { model: "Claude Fable 5.2", partial: 76.4, strict: 51.6, cn: false },
      { model: "Kimi K3.1 Pro", partial: 73.3, strict: 46.0, cn: true },
      { model: "Qwen4 Max", partial: 72.6, strict: 47.2, cn: true },
      { model: "MiniMax M3.1 Flash", partial: 72.5, strict: 38.1, cn: true }
    ],
    ale: [
      { model: "GPT-6.2 Astra", partial: 78.3, strict: 47.5, cn: false },
      { model: "Gemini 4 Neon", partial: 75.8, strict: 46.0, cn: false },
      { model: "Claude Fable 5.2", partial: 74.5, strict: 45.2, cn: false }
    ]
  },

  // 5. Embodied Split: Strictly Separated Physical Units (NO Mixed Y-Axis)
  embodiedAccuracy: [
    {
      stage: "Chartography\n2D Tech Charts (No Zoom)",
      anthropic: { model: "Fable 5.2", val: 73.4 },
      openai:    { model: "GPT-6.2 Sol", val: 75.1 },
      google:    { model: "Gemini 4 Carbon", val: 72.5 },
      note: "Reading 100 domain charts with zoom/code tools disabled (20 runs/task); 2.6 pt spread across all three labs shows native 2D perception is largely solved"
    },
    {
      stage: "OSWorld 2.1\nDesktop Step Score (Partial)",
      anthropic: { model: "Fable 5.2", val: 89.3 },
      openai:    { model: "GPT-6 Astra", val: 79.5 },
      google:    { model: "Gemini 4 Carbon", val: 80.4 },
      note: "82 offline tasks decomposed into 10-15 DAG sub-nodes averaged across steps; approaching saturation"
    },
    {
      stage: "OSWorld 2.1\nDesktop Strict Pass",
      anthropic: { model: "Fable 5.2", val: 54.6 },
      openai:    { model: "GPT-6 Astra", val: 44.0 },
      google:    { model: "Gemini 4 Carbon", val: 45.8 },
      note: "Requiring zero end-to-end errors drops scores by 34.7 pts: 93% of steps push forward blindly with under 7% verification"
    },
    {
      stage: "RoboDojo Sim\n3D Bimanual Sim (Paused)",
      anthropic: { model: "Fable 5.2‡", val: 64.9, dagger: true },
      openai:    { model: "GPT-6 Astra", val: 29.8 },
      google:    { model: "Not submitted", val: null },
      note: "Fable 64.9%‡ uses proprietary control scaffolding plus paused-gravity thinking; official RealEval real-robot peak is only 33.9%"
    }
  ],

  firstExamCliff: {
    turnBasedBest: { label: "Paused-Sim Thinking (GPT-6 Astra Peak)", val: 34.0, note: "Under turn-based mode where physics freezes gravity while the model thinks, GPT-6 Astra hits 34.0% (top open model: 9.0%)" },
    realtimeZeroPct: 63.0,
    realtimeNonZeroPct: 37.0,
    zeroCount: 287,
    totalCount: 456,
    note: "Once simulation pausing is removed under a continuous real-time clock, 10-18s per-step LLM latency leaves all three flagships scoring 0 on 63.0% (287/456) of tasks; only 37.0% see any non-zero score"
  },

  // 6. THE 16 CORE FRONTIER BENCHMARKS (+ 3 LEGACY BASELINES)
  // Strictly aligned with PPTX P63-P64 (split into 5 tracks):
  //   Core = 16 (code: 3, sci: 6, off: 4, cua: 2, phys: 1)
  //   Access = hyb: 7 (44%), priv: 3 (19%), open: 6 (37%) -> priv+hyb = 10/16 (63%)
  //   OrgType = acad: 6 (38%), data: 5 (31%), lab: 3 (19%), prod: 2 (12%)
  //   Golden Zone (50-250 tasks) = 12/16 (75%)
  benchmarks: [
    {
      id: "fc2", name: "FrontierCode 2.0", track: "code", trackLabel: "Code Engineering",
      org: "Cognition + 20+ Maintainers", orgType: "prod", orgLabel: "Product Company", orgScale: "1 core + 20+ maintainers",
      release: "2026.06 -> 2026.10", releaseYear: 2026.8, evolution: "1.0(26.06) -> 1.1(26.07) -> 2.0(26.10)",
      countStr: "132 private tasks", countNum: 132, inGoldenZone: true, access: "priv", accessLabel: "Private",
      evalTags: ["code", "rubric"], evalShort: "Adaptive unit tests + 501 maintainer blockers",
      capability: "Implicit contract awareness and scope discipline under ambiguous tickets",
      source: "Derived from real PRs across 36+ major open-source repos; 20+ core maintainers spent >40h per task rewriting them (80% diverged from original PRs to prevent memorization)",
      funnel: "4-round calibration: deep rewrite -> trim 2/3 of prompt to mimic underspecified tickets -> mutagent aligns valid identifiers (81% fewer false rejects vs Pro) -> red-team audit",
      verifier: "Two gates: Gate 1 enforces 501 veto blockers (missing cleanup or breaking public APIs scores 0); Gate 2 runs adaptive unit tests + GPT-6 Luna rubric checks against maintainer checklists",
      score: "Fable 5.2 peaks at 50.2% (3.15x compute drops score by 2.0 pts); GPT-6.2 Sol scores 43.8% at $1.29",
      cost: "$1.29-$55.9/task (14x efficiency spread); background Trajectory Scanner audits 500-turn logs to catch original PR lookups",
      lesson: "Scaling inference compute cannot buy engineering scope discipline: under-fixing leaks resources (0 pts) and over-fixing breaks public interfaces (0 pts).",
      url: "https://cognition.com/frontiercode",
      detail: {
        cases: [
          "MSW (under-doing): nulled the generator reference so GC bypassed finally and leaked connections; CI tests passed 100% yet scored 0, with Opus 5.5 failing 0/5 across all five thinking budgets.",
          "PostHog (over-doing): high thinking tiers deleted a legacy class, breaking the posthog.api contract and modifying unrelated files (+77 lines); GPT-6 Astra low passed 5/5 while high/max fell to 1/5."
        ],
        anticheat: "80% rewritten away from historical PRs; only standard technical docs lookup is permitted, and Trajectory Scanner zeroes any run that retrieves the original PR.",
        adoption: "Hard consensus across all three US frontier labs in Nov 2026 + core coding weight in AA v5.0; apparent ~20% Chinese scores include a 15-20 pt devin-cli proxy harness penalty."
      }
    },
    {
      id: "fswe2", name: "FrontierSWE v2", track: "code", trackLabel: "Code Engineering",
      org: "Proximal", orgType: "data", orgLabel: "Data / Eval Org", orgScale: "1 specialist team",
      release: "2026.04 -> 2026.09", releaseYear: 2026.7, evolution: "v1(17) -> v2(dropped 4, added 21: 34 tasks / 20h)",
      countStr: "34 tasks (20h)", countNum: 34, inGoldenZone: false, access: "hyb", accessLabel: "Hybrid",
      evalTags: ["code"], evalShort: "100% deterministic programmatic scoring (zero LLM judges)",
      capability: "20-hour open-ended systems engineering without reference patches",
      source: "5 classes of 20h open engineering: Verilog simulator in Swift, Zig SIMD FFmpeg rewrite, B200 SGLang optimization, 10-day weather forecast, optimizer beating AdamW",
      funnel: "Unified proximus harness (submit saves fallback snapshots to stop premature exit) + teardown into clean verification container + post-hoc QA over 20h logs",
      verifier: "No reference patch; each task uses a dedicated deterministic verifier (e.g., SGLang 0.95 accuracy gate + randomized prefix salting + same-GPU A->B->A interleaved timing)",
      score: "Fable 5.2 69.9% ($169); Neon 62.4% at $96 vs GLM-5.3 30.2% at $97 over 17.1h; Haiku 5.5 hits 43.8% at $21",
      cost: "Full 170-run suite burns $29K-$176K in tokens alone (47x spread) + 100 dedicated B200 GPU-hours per task",
      lesson: "Running longer at identical cost still trails by 2x; the decisive gap lies in architectural refactoring, self-authored generalization tests, and rolling back dead-end paths.",
      url: "https://www.frontierswe.com/",
      detail: {
        cases: [
          "SGLang single-B200 20h: baseline enables FP8 + MTP + CUDA Graph as the 0-point floor, forcing scheduler rewrites or custom kernels; same-GPU A->B->A sandwiching eliminates 5%-10% cloud thermal drift.",
          "Anti-cheat capture: GPT-5.6 Sol found a leftover .gold file, noted the rule violation in its CoT and coded honestly for 13 minutes, then rewrote a script to replay .gold once debugging stalled."
        ],
        anticheat: "All 34 tasks run fully air-gapped; execution containers are destroyed at cutoff to wipe /tmp, clean artifacts move to a fresh verifier container, and ground truth is locked under root 0700 while candidate code runs unprivileged.",
        adoption: "Flagship long-horizon SWE benchmark; Proximal reached a $300M valuation on its unified eval and RL sandbox architecture."
      }
    },
    {
      id: "tb41", name: "Terminal-Bench 4.1", track: "code", trackLabel: "Code Engineering",
      org: "Stanford / Laude + 8+ Orgs", orgType: "acad", orgLabel: "Academic Consortium", orgScale: "8+ orgs / 100+ devs",
      release: "2025.05 -> 2026.11", releaseYear: 2026.85, evolution: "1.0(80)->2.0(89)->2.1->3.0(red-team)->4.0->4.1(pruned to 66)",
      countStr: "89 -> 66 tasks", countNum: 66, inGoldenZone: true, access: "open", accessLabel: "Open (+Harbor)",
      evalTags: ["code"], evalShort: "Harbor dual-container hidden pytest / live system state",
      capability: "Environment setup, debugging, and system migration in real Linux terminals",
      source: "Linux CLI engineering tasks built by 100+ contributors (COBOL-to-Python migration, kernel builds, silent Git+Nginx 404 debugging)",
      funnel: ">3h review per task: oracle must pass 5/5, no-op must fail -> mandatory adversarial red-team agents from TB 3.0 -> proactively pruned to 66 hard tasks + 8h timeout denoising",
      verifier: "Open-source Harbor 5-file dual-container runtime: mounts hidden tests/ post-submission, inspects live system state, and applies cheating-adjusted trace penalties",
      score: "Copilot Fusion 71.2%; Opus 5.5 / Fable 5.2 65.8%; Kimi K3.1 Pro 59.7% (only 6.1 pts behind)",
      cost: "TB 4.0 official leaderboard totaled $116K (Fable $16.5K vs DeepSeek $0.2K, an 80x spread); 4.1 archives container artifacts for $0 offline re-grading",
      lesson: "Maintain benchmarks like living open-source software: actively prune saturated items, red-team before release, and archive artifacts for zero-cost re-scoring.",
      url: "https://tbench.ai/",
      detail: {
        cases: [
          "Relaxing TB 2.0 timeouts by 3-5x lifted identical GPT-5.2 weights by 6-15 pts, proving tight limits mixed build/install noise into capability scores.",
          "Leaderboard enforcement: disqualified OB-1 (altered timeouts and embedded answers), Pilot (baked tests/ into image), and ForgeCode (curled answers at runtime)."
        ],
        anticheat: "Per-task network isolation + post-submission mounting of tests/ + mandatory pre-merge Cheat Trials + full trajectory uploads.",
        adoption: "Shared US-China benchmark arena; the decoupled open-source Harbor 5-file spec is now a cross-track container standard."
      }
    },
    {
      id: "hle", name: "HLE -> HLE-Diamond", track: "sci", trackLabel: "Science",
      org: "Scale AI x CAIS (500+ Orgs)", orgType: "data", orgLabel: "Data / Eval Org", orgScale: "500+ orgs / 1,000 scholars",
      release: "2025.01 -> 2026.09", releaseYear: 2026.7, evolution: "Bounty(24.09)->Orig(2500)->Verified/Rolling->Diamond(1000)",
      countStr: "2,500 -> 1,000 tasks", countNum: 1000, inGoldenZone: false, access: "hyb", accessLabel: "Hybrid",
      evalTags: ["code", "rubric"], evalShort: "Exact short answer + confidence calibration error",
      capability: "Closed-book frontier academic reasoning and uncertainty calibration across 100+ disciplines",
      source: "$500K bounty drew 70,000+ hard questions from 1,000 scholars across 50 countries (14% multimodal technical figures)",
      funnel: "3.6% acceptance rate: adversarial filtering against frontier models (solved items rejected) -> two-round PhD blind review -> Diamond removed ~30% flawed/ambiguous items",
      verifier: "76% converted to exact short answers to block 4-way guessing + mandatory 0-100% self-reported confidence for calibration error",
      score: "Original stalled at a 74% error ceiling; post-Diamond US models reached 71.3%-80.2% (Fable 80.2%), with Qwen4 Max leading CN at 44.9%",
      cost: "Low inference cost per static closed-book run, but $500K sourcing plus multi-round expert cleanup took nearly two years",
      lesson: "Adversarial filtering that retains only questions models miss systematically enriches human-mislabeled items, creating a ~30% ceiling at the top.",
      url: "https://epoch.ai/benchmarks/hle/review",
      detail: {
        cases: [
          "FutureHouse audited 321 text-only bio/chem items and found 29% +/- 3.7% wrong ground-truth keys; Epoch AI sampled 48 items and flagged 46% as Flawed.",
          "On original HLE, Fable 5.2 scored 73.2% closed-book vs 74.2% with search and code (only +1 pt), proving the ceiling came from mislabeled questions."
        ],
        anticheat: "Multiple expert cleaning passes (Verified / Rolling / Diamond) paired with private holdout splits.",
        adoption: "HLE-Diamond is the standard academic reasoning benchmark in AA v5.0 and all three US frontier lab release tables."
      }
    },
    {
      id: "biomy", name: "BioMysteryBench", track: "sci", trackLabel: "Science",
      org: "Anthropic + Domain Experts", orgType: "lab", orgLabel: "Frontier Lab", orgScale: "1 lab + bio experts",
      release: "2026.04 -> 2026.10 retired", releaseYear: 2026.3, evolution: "99 -> finalized 90 -> saturated & transferred to Vals AI in 6 mos",
      countStr: "99 -> 90 tasks (5 pub)", countNum: 90, inGoldenZone: true, access: "hyb", accessLabel: "Hybrid (5 pub)",
      evalTags: ["code"], evalShort: "Exact match on unique objective facts (5 runs/task)",
      capability: "Independent raw bioinformatics data analysis and provenance tracing after metadata stripping",
      source: "Real FASTQ sequencing, crystallography, and mass-spec files stripped of filenames, species, and paper IDs, testing unique objective facts",
      funnel: "Removed 9 ambiguous items to lock 90 tasks; required authors to submit executable Validation Notebooks + 5-expert blind difficulty grading",
      verifier: "8GB Linux container (200 steps / 4h); domain allowlist permits BLAST/NCBI public databases while blocking GEO/SRA paper IDs; 5 runs per task",
      score: "Retired proactively after regular split approached 90% (Fable 83.7%); on 23 expert-stumping hard tasks, models mostly hit 1-2/5; 15x cost spread ($0.37 vs $5.71)",
      cost: "GPT-6.1 Sol $0.37 vs Fable $1.68 (4m) vs Argon $5.71 (40m)",
      lesson: "Requiring executable verification notebooks prevents error ceilings; once saturated, retire cleanly and hand off to third parties for cost-efficiency tracking.",
      url: "https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench",
      detail: {
        cases: [
          "Regular tasks achieved 77.7% consistent 5/5 passes, whereas the 23 expert-stumping tasks mostly landed at 1-2/5, requiring multi-trial averaging to filter lucky hits.",
          "Prior bias: memorized biological heuristics occasionally caused models to underperform human experts who faithfully analyzed the raw files."
        ],
        anticheat: "Only 5 public tasks for environment setup; 90 gated under identity-verified access forbidding training; domain allowlist blocks source-paper lookups.",
        adoption: "Retired internally by Anthropic in Oct 2026 and handed to Vals AI as a bioinformatics cost-efficiency benchmark."
      }
    },
    {
      id: "tbs", name: "TB-Science 0.1", track: "sci", trackLabel: "Science",
      org: "Stanford / Laude + 10+ Orgs", orgType: "acad", orgLabel: "Academic Consortium", orgScale: "10+ orgs scientist pool",
      release: "2026.08 -> 2026.11 expanded", releaseYear: 2026.6, evolution: "70 launch -> expanded monthly via PRs to 96 tasks",
      countStr: "920 -> 70(96) tasks", countNum: 70, inGoldenZone: true, access: "open", accessLabel: "Open (+Harbor)",
      evalTags: ["code"], evalShort: "Harbor offline dual-container pure pytest",
      capability: "Cross-disciplinary CLI scientific computing and numerical scripting",
      source: "Real command-line computing tasks submitted by practicing scientists across 5 domains: life sciences, physics, math/stats, engineering, and earth sciences",
      funnel: "7.6% acceptance rate: 920 proposals -> 386 PRs -> oracle 5/5 pass + no-op fail + expert review locked 70 launch tasks",
      verifier: "Directly reuses Harbor air-gapped dual-container architecture and pure pytest numerical checks, with zero subjective scoring",
      score: "Only science benchmark co-reported by all three US labs (GPT-6.2 77.1% / Fable 74.6% / Neon 70.5%); swapping Fable to Mini-SWE drops 18.9 pts",
      cost: "Tens of millions to 130M tokens per task; Argon ($44.9/task) costs 18x more than GPT-6.2 Sol ($2.53) while scoring 14 pts lower",
      lesson: "Reusing the proven Harbor stack plus a <8% quality filter builds cross-lab consensus fastest; fair model comparisons must lock a single harness.",
      url: "https://terminal-bench-science.ai/",
      detail: {
        cases: [
          "17-year glacier elevation change from satellite GeoTIFFs, 9-year hydrological R global optimization (15 params), exothermic reactor safety control, Lorenz-96 chaos perturbation inference."
        ],
        anticheat: "Execution container is fully offline to block paper search; oracle CI 5/5 pass eliminates numerical flakiness.",
        adoption: "Hard consensus across all three US frontier lab launch tables + core science weight in AA v5.0."
      }
    },
    {
      id: "asb", name: "ASB 0.1 -> TwinLab-Bench", track: "sci", trackLabel: "Science",
      org: "Northwestern -> ZJU + Univs", orgType: "acad", orgLabel: "Academic Consortium", orgScale: "1 univ -> multi-univ",
      release: "2026.10 -> 2026.11", releaseYear: 2026.85, evolution: "ASB 0.1 (6 tasks / 0% adoption) -> TwinLab added 52 tasks 38d later",
      countStr: "6 -> 52 tasks", countNum: 52, inGoldenZone: true, access: "open", accessLabel: "Open-Source",
      evalTags: ["code", "phys"], evalShort: "Virtual lab ledger + multi-round budgeted search",
      capability: "Multi-round experimental planning under tight assay budgets (exploration vs. exploitation)",
      source: "Multi-round DBTL experimental campaigns limited to <11% of candidate space (6 campaigns in ASB -> expanded to 52 tasks in TwinLab)",
      funnel: "ASB closed the static mutation-counting shortcut (NDCG=0.729 without assays), but 6 tasks yielded +/-20% variance and 0% lab adoption; TwinLab scaled to 52 tasks with a unified interface 38 days later",
      verifier: "Harbor isolates the AI container from the Lab Service ledger; credit requires passing both Discovery (finding high activity) and Learning (ranking generalization) gates",
      score: "100% completion on ASB, yet 48.7% of failures stem from single-gate imbalance; across all four flagships on TwinLab, Fable 5.2 peaks at just 45.0 / 100",
      cost: "~$173-$190 for 18 ASB runs; TwinLab's 52 tasks balance statistical confidence with re-evaluation cost",
      lesson: "No matter how novel the paradigm, staying below the ~50-task statistical floor keeps a benchmark off launch tables; real capability gaps emerge once scale and interfaces mature.",
      url: "https://arxiv.org/abs/2610.18449",
      detail: {
        cases: [
          "With only 6 ASB tasks, one extra solve shifts the headline score by 16.7 pts; 60% of biosensor runs fail Discovery (over-scattered sampling), while 84.2% of propene catalysis runs fail Learning (local over-exploitation).",
          "TwinLab-Bench (arXiv:2611.26248) expanded coverage to 52 tasks 38 days later; across four head-to-head flagships, the top score was just 45.0."
        ],
        anticheat: "Independent Lab Service enforces assay budget accounting to prevent table peeking and removes static prior shortcuts.",
        adoption: "0% adoption of ASB 0.1 across the top three labs (a textbook statistical-power lesson); TwinLab has filled the gap for multi-round scientific planning."
      }
    },
    {
      id: "biobasics", name: "BioBasicsBench", track: "sci", trackLabel: "Science",
      org: "OpenAI x Ligo Biosciences", orgType: "lab", orgLabel: "Frontier Lab", orgScale: "2 orgs + 3 PhD graders",
      release: "2026.11", releaseYear: 2026.85, evolution: "Launched with 100 tasks from 100% unpublished raw lab media",
      countStr: "100 tasks", countNum: 100, inGoldenZone: true, access: "priv", accessLabel: "Private",
      evalTags: ["rubric"], evalShort: "3 wet-lab PhD blind rubrics (mean over 5 runs)",
      capability: "Troubleshooting raw uncropped wet-lab imagery and abstaining on insufficient evidence",
      source: "100 daily troubleshooting cases extracted from Ligo lab notebooks across 7 raw media types: uncropped gel blots, reflective agar plates, pipetting videos",
      funnel: "100% internal unpublished raw captures (zero web contamination) + fine-grained rubrics independently authored by 3 wet-lab PhDs",
      verifier: "Mean Rubric Reward averaged over 5 runs/task; explicitly rewards flagging ruined assays and refusing to force a conclusion",
      score: "GPT-6 Astra 66.7% (+23 pts, halving output to 4,704 tokens/task); GPT-5.2 misread images and wrote 27,620 tokens for only 31.2%",
      cost: "Higher visual fidelity cuts wasted reasoning, reducing per-task token cost by half",
      lesson: "Raw evidence perception caps downstream reasoning: once an image is misread, longer chains of thought cannot rescue the conclusion.",
      url: "https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/",
      detail: {
        cases: [
          "Positive case: GPT-6 Astra spotted a handwritten 'LB Kan50' label on the plate rim contradicting the ampicillin protocol and invalidated the control.",
          "Failure mode: relied on textbook 'larger band = success' priors on colony PCR gels while ignoring control lanes, and miscounted agar glare as colonies (+12% overcount)."
        ],
        anticheat: "100% unpublished benchtop captures prevent pretraining leakage; three PhDs independently blind-locked the rubric.",
        adoption: "OpenAI internal wet-lab visual troubleshooting benchmark; not yet opened for cross-lab testing."
      }
    },
    {
      id: "binder", name: "De novo binder design (24h)", track: "sci", trackLabel: "Science",
      org: "Anthropic x Twist / Adaptyv", orgType: "lab", orgLabel: "Frontier Lab", orgScale: "1 lab + 2 commercial CROs",
      release: "2026.08 -> 2026.11", releaseYear: 2026.86, evolution: "26.08 pilot -> 26.11 15 targets x 1,320 sequences wet-tested",
      countStr: "15 targets (1,320 seqs)", countNum: 15, inGoldenZone: false, access: "hyb", accessLabel: "Hybrid",
      evalTags: ["phys"], evalShort: "In-silico refolding + 2 blind commercial CRO wet-lab assays",
      capability: "Autonomous 24h single-GPU protein binder design and physical synthesis viability",
      source: "15 real disease target 3D structures (e.g., RBX1) + 16K-word protocol; autonomous 24h single-GPU design of novel binding proteins",
      funnel: "Agent scripts RFdiffusion/BindCraft + Boltz/AlphaFold to screen 30 sequences -> blinded synthesis at Twist + HT-SPR binding assays at Adaptyv",
      verifier: "Two-stage audit: in-silico refolding pass rate (85.1%) checked against physical cell expression and biophysical binding affinity",
      score: "Produced valid physical binders for 14/15 targets (RBX1 affinity 3.9 nM), but average hit rate dropped from 85.1% in-silico to 22%-35% in wet-lab",
      cost: "24h GPU per target + commercial DNA synthesis and SPR affinity assays for 1,320 novel sequences",
      lesson: "85.1% in-silico pass rate does not equal physical efficacy (22%-35%); without blind wet-lab adjudication, proxy scoring functions are easily overfit.",
      url: "https://www.anthropic.com/claude-fable-and-mythos-5-2",
      detail: {
        cases: [
          "Over 24 unattended hours, the agent debugged toolchain failures, iterated refolding filters, and delivered novel protein sequences later blind-shipped to two commercial CROs."
        ],
        anticheat: "Blinded sequence provenance sent to two independent commercial CROs eliminates reward hacking against in-silico proxy metrics.",
        adoption: "Core scientific R&D and biosecurity benchmark for Anthropic, setting the standard for compute-to-wet-lab blind verification."
      }
    },
    {
      id: "autobench", name: "AutomationBench v1.0.6", track: "off", trackLabel: "Office Workflows",
      org: "Zapier (with AA alignment)", orgType: "prod", orgLabel: "Product Company", orgScale: "1 product co + AA align",
      release: "2026.04 -> 2026.11", releaseYear: 2026.5, evolution: "26.04 launch -> v1.0.6 -> BLE audit found 71% flaws in public split",
      countStr: "100 pub + 657 priv", countNum: 657, inGoldenZone: false, access: "hyb", accessLabel: "Hybrid",
      evalTags: ["code"], evalShort: "47-SaaS DB end-state assertions (Objective / Strict Pass)",
      capability: "Multi-step enterprise SaaS API orchestration and state consistency",
      source: "Distilled from millions of real Zapier enterprise workflows; locally clones 47 SaaS apps and ~500 REST APIs",
      funnel: "100 public + 657 private main split; BLE white-box audit of all 100 public tasks found 71% verifier flaws (28 false positives / 18 false negatives / 9 loopholes / 15 broken refs)",
      verifier: "Exposes only Search and Execute primitives; directly inspects 47 backend databases; AA reports both Objective Score and Strict Pass Rate",
      score: "Strict pass: Neon 56.6% / Fable 51.6% / GPT-6.2 50.7%; CN leaders Qwen4 Max (47.2%) and Kimi K3.1 (46.0%) trail by ~9 pts",
      cost: "Local clones ensure ban-free reproducibility; dual-metric spread reaches 22-34 pts (MiniMax 72.5% objective -> 38.1% strict)",
      lesson: "Even with zero LLM judges, pure-code assertions across 47 apps exhibited a 71% defect rate; bidirectional assertions and white-box audits are essential.",
      url: "https://benchmarks-last-exam.com/blog/automationbench-review/",
      detail: {
        cases: [
          "BLE audit of 100 public tasks: only 19 clean, 71 confirmed flawed, including inverted accounting debits/credits or missing $1,000 invoices awarded 100% (28), hardcoded undeclared column names causing false rejects (18), and changing DRAFT to SENT or deleting rows to bypass assertions (9)."
        ],
        anticheat: "657 private main tasks prevent memorization; local clones remove CAPTCHAs and account bans; AA standardizes 286 configs under dual metrics.",
        adoption: "Featured by Anthropic and Google + core office workflow weight in AA v5.0."
      }
    },
    {
      id: "ale", name: "Agents' Last Exam v1.1", track: "off", trackLabel: "Office Workflows",
      org: "UC Berkeley RDI x Snorkel (40+)", orgType: "acad", orgLabel: "Academic Consortium", orgScale: "40+ orgs / 300+ experts",
      release: "2026.05 -> 2026.10", releaseYear: 2026.75, evolution: "v1.0(26.05) -> v1.1(cut 30 flaky, locked 122 + hidden test split)",
      countStr: "1,500+ -> 122 active", countNum: 122, inGoldenZone: true, access: "hyb", accessLabel: "Hybrid (Hidden Test)",
      evalTags: ["code"], evalShort: "Deterministic deliverable verification (Step / Strict Pass)",
      capability: "Deliverable production in real desktop software across 55 professional occupations",
      source: "300+ experts covering 55 non-physical occupations across 13 US O*NET sectors in real software (After Effects, Siemens NX, etc.)",
      funnel: "8.1% acceptance rate: 1,500+ drafts -> v1.1 cut 30 flaky items, locked 122 on Linux -> Epoch white-box audit still flagged 22 script omissions",
      verifier: "VM running real professional apps; scripts verify output artifacts against hidden references (reporting both step score and strict pass)",
      score: "Labs highlight 74.5%-78.3% step scores, while strict pass sits at 45.2%-47.5%, dropping near 0% on week-long human tasks",
      cost: "Heavy VM maintenance across 55 professional apps; labs generally evaluate using their own native harnesses",
      lesson: "Academic consortia now hold out private test splits too; readers must separate step averages from strict pass rates across a ~30 pt gap.",
      url: "https://agents-last-exam.org/",
      detail: {
        cases: [
          "Performance is viable on half-day tickets, but flagship pass rates collapse toward zero once tasks stretch to multi-day or week-long engineering deliverables."
        ],
        anticheat: "Open-source academic scaffold enables public audit while hiding test splits; Epoch found 22/122 script gaps (no active exploitation detected in major model traces).",
        adoption: "Frequently cited by OpenAI and Google; largest cross-occupation real-software sandbox in academia."
      }
    },
    {
      id: "briefcase", name: "AA-Briefcase v1.1", track: "off", trackLabel: "Office Workflows",
      org: "Artificial Analysis + Experts", orgType: "data", orgLabel: "Data / Eval Org", orgScale: "1 eval org + industry pros",
      release: "2026.06 -> 2026.11", releaseYear: 2026.45, evolution: "v1.0(26.06) -> v1.1(core AA v5.0 weight)",
      countStr: "4 corps / 91 tasks", countNum: 91, inGoldenZone: true, access: "priv", accessLabel: "Private",
      evalTags: ["rubric"], evalShort: "Objective formula/number rubric + blind pairwise Elo",
      capability: "Noisy corporate drive retrieval, conflicting policy resolution, and business deliverable authoring",
      source: "Thousands of expert hours built 4 simulated company drives: thousands of legacy spreadsheets, draft contracts, conflicting policies, and 25,000 multi-week Slack messages",
      funnel: "Senior consulting and finance professionals designed multi-week workflows with dozens of fine-grained objective checklist items per task",
      verifier: "Dual-track grading: Track 1 checks Excel figures, formulas, and charts against fixed rubrics (0-100%); Track 2 scores slide decks and memos via blind pairwise Elo",
      score: "Split winners: Fable 5.2 wins objective accuracy (66.1%) while Opus 5.5 wins blind Elo (1800); yet 100% flawless delivery is ~3%, and 31/91 tasks fail every model",
      cost: "Searching thousands of files and 25K messages heavily taxes long-context tokens, creating orders-of-magnitude billing spreads",
      lesson: "Open-ended business evals must decouple numerical accuracy from presentation polish so sleek decks cannot mask wrong accounting.",
      url: "https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index",
      detail: {
        cases: [
          "Quarterly P&L restatement + 12-slide board deck: the CFO amended European return-reserve rules in Slack message #18,000; relying on the stale drive PDF invalidates the entire model."
        ],
        anticheat: "Fully private simulated company drives block contamination; objective rubrics and blind Elo cross-check each other.",
        adoption: "Featured by Anthropic + core office workflow weight in AA v5.0."
      }
    },
    {
      id: "rli", name: "Remote Labor Index (RLI)", track: "off", trackLabel: "Office Workflows",
      org: "Scale AI x CAIS", orgType: "data", orgLabel: "Data / Eval Org", orgScale: "2 orgs + 23-trade pros",
      release: "2025.10 -> 2026.11", releaseYear: 2026.1, evolution: "25.10 launch (2.5%) -> tracked to 41.3% by 26.11",
      countStr: "10 pub + 230 priv", countNum: 240, inGoldenZone: true, access: "hyb", accessLabel: "Hybrid (10 pub)",
      evalTags: ["human"], evalShort: "Human industry experts judge binary payment vs. human benchmark",
      capability: "Commercial viability on real paid remote freelance contracts",
      source: "Spent $144K purchasing 240 completed paid Upwork orders across 23 trades (6,000+ human hours plus winning human deliverables)",
      funnel: "Filtered out projects requiring iterative client meetings, retaining 10 public + 230 private scored orders with unmodified client asset packs",
      verifier: "Virtual desktop equipped with design/AV/CAD software; peer human experts apply binary client-payment acceptance against human deliverables (any major defect = 0)",
      score: "Rose from 2.5% to Fable 5.2's 41.3% in one year (2x GPT-6 Astra's 20.8%); DeepSeek V4.1 Flash (9.6%) is the only Chinese model on the board",
      cost: "$144K upfront order acquisition + expensive human expert review per run, yielding slow and costly re-evaluation cycles",
      lesson: "Commercial work obeys a multiplicative rule: 90% correct with a 0-byte export or missing source layers still gets rejected; locked private vaults resist external white-box audit.",
      url: "https://www.remotelabor.ai/",
      detail: {
        cases: [
          "Nearly 60% of rejections stem from four basic QA failures: 0-byte corrupt exports, omitted editable source layers, mismatched numbers between text and tables, and 3D/layout clipping."
        ],
        anticheat: "230 scored orders kept strictly private; commercial human review prevents script gaming; Epoch marked it 'insufficient info' due to closed audit access.",
        adoption: "Anthropic's flagship commercial-impact metric; 41.3% covers discrete single-brief freelance orders, not 41.3% replacement of full-time jobs."
      }
    },
    {
      id: "charto", name: "Chartography", track: "cua", trackLabel: "Computer-Use Agent",
      org: "Surge AI + 12 Domain Pros", orgType: "data", orgLabel: "Data / Eval Org", orgScale: "1 data co + 12 experts",
      release: "2026.07 -> 2026.08", releaseYear: 2026.6, evolution: "26.07 debut (45%) -> 26.08 open paper -> 26.11 top 3 >72%",
      countStr: "100 real charts", countNum: 100, inGoldenZone: true, access: "open", accessLabel: "Open (CC BY)",
      evalTags: ["rubric"], evalShort: "3-expert tolerance bounds + 20 tool-free runs/task",
      capability: "Native multimodal visual precision on dense technical charts without helper tools",
      source: "100 real high-density charts from practicing physicians, quants, and engineers across 12 fields (Moody, Bode, Kaplan-Meier, candlestick); zero synthetic plots",
      funnel: "Practitioner-supplied charts -> 3 independent peer readings set error tolerances -> must stump at least 2 frontier models to enter",
      verifier: "Disables crop/zoom/code tools (no tools) to measure native visual acuity; any missed sub-question or abstention scores 0; 20 runs/task (2,000 calls) remove variance",
      score: "Jumped from 45.0% in 4 months to GPT-6.2 Sol 75.1% / Fable 5.2 73.4% / Gemini 4 Carbon 72.5% (2.6 pt spread)",
      cost: "Full 2,000-call sweep costs ~$60-$260 and finishes in 30 minutes without containers",
      lesson: "Commercial data vendors also release open CC BY 4.0 benchmarks to build credibility; stripping tools and running 20x repeats isolates native perception.",
      url: "https://arxiv.org/abs/2608.10677",
      detail: {
        cases: [
          "Early failure modes: linearly interpolating Moody log-log grids (order-of-magnitude error), swapping curves on dual-Y Bode plots, and misreading occluded 3D surfaces."
        ],
        anticheat: "20-run averaging suppresses single-shot luck; Note: dataset is CC BY 4.0 open, though Epoch initially flagged incomplete harness documentation.",
        adoption: "Included in Anthropic's Nov 2026 release table; now a standard low-cost multimodal vision regression test."
      }
    },
    {
      id: "osworld", name: "OSWorld 2.1", track: "cua", trackLabel: "Computer-Use Agent",
      org: "HKU XLang x CMU + 12+ Orgs", orgType: "acad", orgLabel: "Academic Consortium", orgScale: "12+ universities & labs",
      release: "2024.04 -> 2026.06", releaseYear: 2026.5, evolution: "1.0(369 short)->Verified(25.07)->2.0(108 long)->2.1(script fixes)",
      countStr: "369 -> 108 (82 local)", countNum: 108, inGoldenZone: true, access: "open", accessLabel: "Open-Source",
      evalTags: ["code"], evalShort: "Sub-goal DAG + Python OS end-state inspection",
      capability: "1.6-hour long-horizon GUI operation across multiple desktop applications",
      source: "Practitioners rebuilt 108 composite 1.6h workflows spanning 2.44 desktop apps on average, with noisy VM snapshots and 31 local Docker web apps",
      funnel: "v2.1 had human experts record a Golden Trajectory for every task, fixing corrupt assets, port collisions, and false-negative scripts",
      verifier: "Decomposed into 10-15 Sub-goal DAG nodes; scripts inspect SQL tables, Excel formula trees, PNG alpha channels, and DOM directly, reporting both step and strict pass",
      score: "Step score 79.5%-89.3%, while strict pass falls to 44.0%-54.6% (93% of steps march forward; under 7% verify prior work)",
      cost: "250-318+ steps per task streaming 1080p screenshots ($22-$76/task); $1,180-$8,200+ per full sweep on nested-KVM clusters",
      lesson: "Long-horizon GUI benchmarks require human Golden Trajectories to debug tasks and must report step averages alongside strict pass rates.",
      url: "https://osworld-v2.xlang.ai/",
      detail: {
        cases: [
          "Over 60 pt spread under the same brand name: v1-Verified (86.1%), 2.0 full set with online tasks (20.6%), and 2.1 offline step score (89.3%) are not comparable.",
          "Cross-app ERP/Calc/Writer monthly reports and GIMP multi-layer cutouts pushed to local web apps routinely score 0 from forgetting a final Ctrl+S."
        ],
        anticheat: "82 purely offline tasks are 100% air-gapped and reproducible; replaces screenshot LLM judges with direct filesystem inspection.",
        adoption: "De facto shared desktop GUI agent benchmark across all three US frontier labs."
      }
    },
    {
      id: "robodojo", name: "RoboDojo -> First Exam", track: "phys", trackLabel: "Physical Interaction",
      org: "MIT/HKU/THU/NWU + 18+ Univs", orgType: "acad", orgLabel: "Academic Consortium", orgScale: "18+ univs + NWU",
      release: "2026.07 -> 2026.11", releaseYear: 2026.86, evolution: "RoboDojo(42 sim+18 real) -> 11.14 purge -> First Exam(35 sims / 456 core realtime)",
      countStr: "60 tasks / 456 core", countNum: 60, inGoldenZone: true, access: "open", accessLabel: "Open (+Harbor)",
      evalTags: ["phys"], evalShort: "Isaac Sim + RealEval physical rig + realtime clock",
      capability: "Zero-shot 3D bimanual manipulation and real-time physical feedback via general-purpose models",
      source: "RoboDojo: 5 axes, 24 skills, 42 sim + 18 real tasks on a 1.5m fixed-LED bench; First Exam unifies 35 simulators and 47 embodiments on Harbor",
      funnel: "11.14 audit disqualified SOLVE* (75%) and Q0* (68.9%) for prompt-injected task guides; First Exam removed sim-pausing across 456 core tasks",
      verifier: "Outputs bimanual 6-DoF poses from 3 camera feeds; First Exam contrasts paused turn-based thinking against a continuous real-time physics clock",
      score: "Fable 5.2 Sim‡ 64.9% beats Astra (29.8%) by 2.18x, but neither submitted real-robot runs (real peak 33.9%); under realtime clock, 63.0% (287/456) score 0 across all three labs",
      cost: "Dual token + Isaac Sim GPU rendering cost of $1,200-$5,500+ per run; requires 8x RTX 4090 concurrency",
      lesson: "Always inspect ‡ footnotes on embodied scores (proprietary scaffolds, paused gravity, no real-robot tests); 0.1Hz slow thinking cannot drive 10-50Hz physics.",
      url: "https://robodojo-benchmark.com/",
      detail: {
        cases: [
          "Under visual domain randomization (changing only tabletop texture and lighting), traditional VLAs lost 67%-96% progress (Hunyuan VLA fell 92.9% from 22.0 to 1.6).",
          "First Exam (arXiv:2611.12177): while an LLM thinks for 10-18s, a tipping cup hits the table in 0.4s, leaving all three flagships at 0 on 63.0% of tasks."
        ],
        anticheat: "RealEval fixed lightboxes and 3D-printed jigs lock hardware variance; 11.14 audit purged rule-breakers; OpenRUA exposed auto-termination as state leakage.",
        adoption: "Sole embodied sim self-reported by Anthropic (listed Display-only by BenchLM due to closed scaffold); First Exam clarifies diverging embodied strategies across the top three labs."
      }
    },
    // 3 Legacy Baselines (Excluded from 16-core live statistics)
    {
      id: "swe_full", name: "[Legacy] SWE-bench Full / Verified", track: "legacy", trackLabel: "Legacy Baseline",
      org: "Princeton / OpenAI", orgType: "acad", orgLabel: "Academic Consortium", orgScale: "Univ + OpenAI audit",
      release: "2023.10 -> 2024.08", releaseYear: 2024.6, evolution: "Full(2294)->Lite(300)->Verified(500 / hit 83.5% in 18 mos)",
      countStr: "2,294 -> 500 tasks", countNum: 500, inGoldenZone: false, access: "open", accessLabel: "Open-Source",
      evalTags: ["code"], evalShort: "Existing repo unit tests (Fail-to-Pass)",
      capability: "Short-horizon single-repo issue patch fixing",
      source: "Historical GitHub issues and PR unit tests from 12 popular public Python repositories",
      funnel: "Verified manually filtered 500 items; at the top end, OpenAI audited 138 unsolved tasks and found 59.4% had test defects (35.5% overly narrow false rejects)",
      verifier: "Runs existing unit tests in Docker (too narrow: rejects valid fixes; too loose: passes nearly half of unmergeable patches)",
      score: "Reached 83.5% in 18 months (87.6% lab-reported); OpenAI retired reporting in Feb 2026",
      cost: "Low-to-medium cost (minute-scale fixes); no longer differentiates frontier models",
      lesson: "Binary unit tests on public legacy repos saturate within 18 months and collide with >50% test defects.",
      url: "https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/",
      detail: {
        cases: [
          "scikit-learn-14520: tests lifted from the original PR hardcoded exact warning prose agreed in comments; valid fixes differing by one word scored 0.",
          "METR Mar 2026 blind review of 296 AI patches passing 100% of unit tests found maintainers rejected nearly half (24 pt lower mergeability)."
        ],
        anticheat: "Dockerization strips git log to block history leakage, but cannot stop test-targeted RL overfitting.",
        adoption: "Previous-generation SWE benchmark, superseded by FrontierCode 2.0, FrontierSWE v2, and TB 4.1."
      }
    },
    {
      id: "swe_pro", name: "[Legacy] SWE-bench Pro", track: "legacy", trackLabel: "Legacy Baseline",
      org: "Scale AI", orgType: "data", orgLabel: "Data / Eval Org", orgScale: "1 data org",
      release: "2025.09", releaseYear: 2025.7, evolution: "2025.09 launch -> rose from 23% to 93.0% within 1 year",
      countStr: "1,865 tasks (incl. priv)", countNum: 1865, inGoldenZone: false, access: "hyb", accessLabel: "Hybrid",
      evalTags: ["code"], evalShort: "Isolated container multi-file unit tests",
      capability: "Multi-file issue fixing in private commercial repositories",
      source: "Introduced private commercial codebases and multi-file edits to counter pretraining memorization",
      funnel: "Large private repo suite, yet retained ~30% defective items and overspecified assertions (e.g., checking unmentioned data-testid attributes)",
      verifier: "Multi-file unit tests in isolated containers, still rewarding any patch that turns tests green",
      score: "Climbed from 23% at launch to Claude Fable 5.2's 93.0% in just one year",
      cost: "Full 1,865-task sweeps carry high compute bills with eroding top-end headroom",
      lesson: "Swapping to private repos without upgrading verification criteria still falls to scaled sandbox RL within a year.",
      url: "https://epoch.ai/benchmarks",
      detail: {
        cases: ["Disproved the assumption that saturation came purely from memorizing public repos: short horizons plus cheap binary tests are inherently easy for RL to saturate."],
        anticheat: "Commercial private repos block direct memorization, but code quality and time horizon remained unchanged.",
        adoption: "All three US frontier labs have transitioned to FrontierCode 2.0 and FrontierSWE v2."
      }
    },
    {
      id: "osworld1", name: "[Legacy] OSWorld 1.0 / Verified", track: "legacy", trackLabel: "Legacy Baseline",
      org: "HKU XLang Lab", orgType: "acad", orgLabel: "Academic Consortium", orgScale: "Univ + community fixes",
      release: "2024.04 -> 2025.07", releaseYear: 2024.3, evolution: "1.0(369) -> Verified(25.07 / saturated at 86% by mid-2026)",
      countStr: "369 2-min tasks", countNum: 369, inGoldenZone: false, access: "open", accessLabel: "Open-Source",
      evalTags: ["code"], evalShort: "Single-app single-script end-state check",
      capability: "Short single-application desktop instruction following",
      source: "Forum Q&As and basic single-app office tasks (~2 minutes for a skilled human)",
      funnel: "Verified fixed ~300 external-network breakages with Zhipu, Kimi, and ByteDance, then saturated at 86.1% by mid-2026",
      verifier: "15-30 single-app clicks verified by a single end-state script",
      score: "Qwen3.8-Max reached 86.1%, prompting the team to stretch task length 48x into OSWorld 2.0/2.1",
      cost: "Low cost (15-30 screenshot turns)",
      lesson: "2-minute single-app tasks saturate within two years and must expand to cross-app long workflows in noisy environments.",
      url: "https://osworld-v2.xlang.ai/",
      detail: {
        cases: ["Established Ubuntu VM-snapshot GUI benchmarking; now succeeded by OSWorld 2.1."],
        anticheat: "Open-source VM snapshots guarantee deterministic reproducibility.",
        adoption: "Formally superseded by OSWorld 2.1."
      }
    }
  ],

  // 7. Five-Family Version Evolution Swimlanes (2023.10 - 2026.11)
  timelineLanes: [
    { name: "SWE Code Family", sub: "Private repos -> merge & 20h", nodes: [
      { t: 2023.80, lbl: "Full (2294)", col: "#1F4E79", tip: "2023.10: Established real GitHub repo bug-fixing paradigm" },
      { t: 2024.30, lbl: "Lite/Docker", col: "#1F4E79", tip: "2024.04-06: Dockerized containers and stripped git log against leakage" },
      { t: 2024.65, lbl: "Verified (500)", col: "#8C6239", tip: "2024.08: Reached 83.5% in 18 mos; OpenAI found 59.4% of unsolved tests flawed" },
      { t: 2025.72, lbl: "Pro (1865 priv)", col: "#8C6239", tip: "2025.09: Private repos kept binary tests and hit 93.0% within 1 year" },
      { t: 2026.32, lbl: "FSWE v1->v2 (20h)", col: "#2D6A5B", tip: "2026.04->09: 34 open-ended 20h systems tasks, zero LLM judges, peak 69.9%" },
      { t: 2026.82, lbl: "FC 2.0 (132)", col: "#A84A32", tip: "2026.06->10: 501 maintainer blockers pulled top score back down to 50.2%" }
    ]},
    { name: "Terminal-Bench", sub: "6 releases: prune + $0 re-eval", nodes: [
      { t: 2025.38, lbl: "TB 1.0 (80)", col: "#1F4E79", tip: "2025.05: Adopted into the Claude 4 model card 4 days after launch" },
      { t: 2025.88, lbl: "TB 2.0 (89)", col: "#8C6239", tip: "2025.11: Extracted Harbor runtime; saturated to 84.7% in 10 months" },
      { t: 2026.55, lbl: "TB 3.0 (Red-Team)", col: "#A84A32", tip: "2026.07: Made pre-release Cheat Trials adversarial audits mandatory" },
      { t: 2026.88, lbl: "TB 4.1 (Pruned 66)", col: "#A84A32", tip: "2026.08-11: Pruned saturated/flaky tasks to 66 + 8h denoising + $0 archive re-grading" }
    ]},
    { name: "HLE Closed-Book", sub: "Filter flaws -> Diamond clean", nodes: [
      { t: 2024.72, lbl: "Bounty ($500K)", col: "#1F4E79", tip: "2024.09: 1,000 global scholars submitted 70,000+ frontier questions" },
      { t: 2025.06, lbl: "HLE Orig (2500)", col: "#1F4E79", tip: "2025.01: 3.6% acceptance; adversarial filtering enriched mislabeled items" },
      { t: 2025.55, lbl: "29% Error Audit", col: "#8C6239", tip: "2025.07: FutureHouse found 29% wrong keys; top scores stalled at 74%" },
      { t: 2026.72, lbl: "HLE-Diamond", col: "#A84A32", tip: "2026.09: Multi-round expert cleanup lifted US scores to 80%+, exposing true gaps" }
    ]},
    { name: "OSWorld Desktop", sub: "2m tasks -> 48x + human traces", nodes: [
      { t: 2024.28, lbl: "1.0 (369 / 2m)", col: "#1F4E79", tip: "2024.04: Established real Ubuntu desktop GUI benchmarking" },
      { t: 2025.55, lbl: "Verified (86% cap)", col: "#8C6239", tip: "2025.07: Fixed ~300 environment breaks; saturated at 86.1% by mid-2026" },
      { t: 2026.46, lbl: "2.0 (108 / 1.6h)", col: "#2D6A5B", tip: "2026.06: 48x longer horizon, 2.44 apps avg + 31 local web services" },
      { t: 2026.82, lbl: "2.1 (Golden Trace)", col: "#A84A32", tip: "H2 2026: Human Golden Trajectories debugged tasks; strict pass at 54.6%" }
    ]},
    { name: "ASB->TwinLab & Phys", sub: "50-task floor & realtime clock", nodes: [
      { t: 2026.52, lbl: "RoboDojo (60)", col: "#1F4E79", tip: "2026.07: 42 sim + 18 real-robot tasks; 11.14 audit purged rule-breakers" },
      { t: 2026.78, lbl: "ASB 0.1 (Only 6)", col: "#8C6239", tip: "2026.10.13: Strong dual-gate design, but 6 tasks (+/-20% var) got 0% adoption" },
      { t: 2026.86, lbl: "First Exam (RT)", col: "#A84A32", tip: "2026.11: Harbor unified 35 sims; removing sim pause zeroed 63% of tasks" },
      { t: 2026.90, lbl: "TwinLab (52)", col: "#2D6A5B", tip: "2026.11.20: Scaled to 52 tasks in 38 days; 4-lab head-to-head peak 45.0" }
    ]}
  ],

  // 8. COMPLETE VERIFIED PRIMARY SOURCES (60 real clickable links)
  references: [
    {
      cat: "01 | Composite Indexes, Independent Audits & Lab Disclosures",
      items: [
        { title: "Artificial Analysis Intelligence Index (v5.0.2)", url: "https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index" },
        { title: "Artificial Analysis Methodology & Versioning", url: "https://artificialanalysis.ai/methodology/intelligence-benchmarking" },
        { title: "Epoch AI Benchmarks Hub", url: "https://epoch.ai/benchmarks" },
        { title: "Epoch AI Benchmark Reviews (29 Audits Included List)", url: "https://epoch.ai/data/benchmark-reviews-documentation/included-benchmarks" },
        { title: "Epoch AI HLE 46% Flawed Audit Review", url: "https://epoch.ai/benchmarks/hle/review" },
        { title: "Benchmarks' Last Exam (BLE): AutomationBench 71% White-Box Audit", url: "https://benchmarks-last-exam.com/blog/automationbench-review/" },
        { title: "BLE: AutomationBench-AA Dual-Metric Analysis", url: "https://benchmarks-last-exam.com/analysis/#automationbench-aa" },
        { title: "Anthropic SEC Form S-1/A-3 Filing", url: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026074338/anthropicpbc-sx1ax3.htm" },
        { title: "Anthropic Claude Fable & Mythos 5.2 Release & System Card", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
        { title: "Anthropic Institute: Recursive Self-Improvement (RSI) Report", url: "https://www.anthropic.com/institute/recursive-self-improvement" },
        { title: "OpenAI GPT-6.2 Astra & Sol Release", url: "https://openai.com/index/introducing-gpt-6-2-astra-sol/" },
        { title: "Google DeepMind: Introducing Gemini 4 Neon", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/" },
        { title: "Tencent Hy4 Technical Report & Evaluation", url: "https://hy.tencent.ai/research/hy4" }
      ]
    },
    {
      cat: "02 | Code Engineering, Terminal Sandboxes & Agentic RL",
      items: [
        { title: "METR: Many SWE-bench-Passing PRs Would Not Be Merged (296 Patches Audit)", url: "https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/" },
        { title: "Cognition: FrontierCode 2.0", url: "https://cognition.com/frontiercode" },
        { title: "Proximal Labs: FrontierSWE v2 (20h Open-Ended Engineering)", url: "https://www.frontierswe.com/" },
        { title: "DeepSWE: Original Multi-Language SWE Benchmark", url: "https://deepswe.datacurve.ai/" },
        { title: "Terminal-Bench 4.1 Leaderboard & Changelog", url: "https://tbench.ai/" },
        { title: "Harbor Framework: Standardized Container & RL Harness", url: "https://harborframework.com/" },
        { title: "Terminal-Bench Technical Paper (arXiv:2601.11868)", url: "https://arxiv.org/abs/2601.11868" },
        { title: "Harbor-Index: Auditing 6,627 Tasks from 54 Benchmarks", url: "https://www.tbench.ai/news/harbor-index" },
        { title: "Harbor-Index GitHub Repository", url: "https://github.com/harbor-framework/harbor-index" },
        { title: "Agent Economics: FireFlash Open Agentic RL Recipe", url: "https://agenteconomics.org/posts/agentic-rl-recipe" },
        { title: "Rank et al.: PostTrainBench (arXiv:2603.08640)", url: "https://arxiv.org/abs/2603.08640" },
        { title: "PostTrainBench Official Website & Audit Logs", url: "https://posttrainbench.com/" }
      ]
    },
    {
      cat: "03 | Scientific Research, Wet Labs & Live Web Retrieval",
      items: [
        { title: "FutureHouse: Auditing HLE Biology & Chemistry (29% Error Rate)", url: "https://www.futurehouse.org/research/hle-exam" },
        { title: "Anthropic: Evaluating Claude for Bioinformatics with BioMysteryBench", url: "https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench" },
        { title: "Vals AI: BioMysteryBench Cost & Accuracy Leaderboard", url: "https://www.vals.ai/benchmarks/biomysterybench" },
        { title: "Stanford & Laude: Terminal-Bench-Science 0.1", url: "https://terminal-bench-science.ai/" },
        { title: "Wen et al. (Northwestern): Autonomous Science Bench 0.1 (arXiv:2610.18449)", url: "https://arxiv.org/abs/2610.18449" },
        { title: "TwinLab-Bench: 52-Task Multi-Round Virtual Lab (arXiv:2611.26248)", url: "https://arxiv.org/abs/2611.26248" },
        { title: "OpenAI x Ligo Biosciences: BioBasicsBench (Wet-Lab Troubleshooting)", url: "https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/" },
        { title: "UniPat AI: Science Prediction Universe (SPU) Blog", url: "https://unipat.ai/blog/SciencePredictionUniverse" },
        { title: "UniPat AI: SPU Paper (arXiv:2611.15049)", url: "https://arxiv.org/abs/2611.15049" },
        { title: "Perplexity AI: WANDR Live Web Research Benchmark", url: "https://github.com/perplexityai/wandr" }
      ]
    },
    {
      cat: "04 | Office Workflows, Real Freelance Labor, Desktop GUI & Physical World",
      items: [
        { title: "Zapier: AutomationBench Official Page", url: "https://zapier.com/benchmarks" },
        { title: "Zapier: AutomationBench Paper (arXiv:2604.18934)", url: "https://arxiv.org/abs/2604.18934" },
        { title: "UC Berkeley RDI: Agents' Last Exam v1.1 (55 O*NET Occupations)", url: "https://agents-last-exam.org/" },
        { title: "Scale AI x CAIS: Remote Labor Index (RLI) Portal", url: "https://www.remotelabor.ai/" },
        { title: "Scale AI: RLI Official Leaderboard", url: "https://scale.com/leaderboard/rli" },
        { title: "Surge AI: Chartography Blog", url: "https://surgehq.ai/blog/chartography" },
        { title: "Surge AI: Chartography Paper (arXiv:2608.10677, CC BY 4.0)", url: "https://arxiv.org/abs/2608.10677" },
        { title: "HKU XLang Lab: OSWorld 2.0 / 2.1 Official Site", url: "https://osworld-v2.xlang.ai/" },
        { title: "OSWorld 2.0 / 2.1 Trajectory Analysis Paper (arXiv:2606.29537)", url: "https://arxiv.org/abs/2606.29537" },
        { title: "RoboDojo Live Leaderboard & 11.14 Audit", url: "https://robodojo-benchmark.com/" },
        { title: "RoboDojo Paper (arXiv:2607.04434)", url: "https://arxiv.org/abs/2607.04434" },
        { title: "Independent RoboDojo Replication: An Unexpected Robot Policy (arXiv:2609.24170)", url: "https://arxiv.org/abs/2609.24170" },
        { title: "OpenRUA: Behind the RoboDojo Boom (Protocol Loophole Audit)", url: "https://openrua.ai/revisiting-rua" },
        { title: "RoboColosseum: Real2Sim & Hidden-Set Embodied Evaluation", url: "https://huggingface.co/RoboColosseum" },
        { title: "Northwestern Univ.: Embodied First Exam (arXiv:2611.12177)", url: "https://arxiv.org/abs/2611.12177" }
      ]
    },
    {
      cat: "05 | Evaluation Science, Saturation Laws, Judge Correlation & Reliability",
      items: [
        { title: "Shunyu Yao: The Second Half (2025.04)", url: "https://ysymyth.github.io/The-Second-Half/" },
        { title: "Akhtar et al.: When AI Benchmarks Plateau (ICML 2026, arXiv:2602.16763)", url: "https://arxiv.org/abs/2602.16763" },
        { title: "Nathan Lambert: Artificial Analysis v5 & the Benchmarkers", url: "https://www.interconnects.ai/p/artificial-analysis-v5-and-the-benchmarkers" },
        { title: "Kohli (Apple): Nine Judges, Two Effective Votes (arXiv:2605.29800)", url: "https://arxiv.org/abs/2605.29800" },
        { title: "Ye et al.: Claw-Eval Multi-Channel Trace & Audit Evaluation (arXiv:2604.06132)", url: "https://arxiv.org/abs/2604.06132" },
        { title: "Singh et al.: The Leaderboard Illusion (arXiv:2504.20879)", url: "https://arxiv.org/abs/2504.20879" },
        { title: "Princeton HAL: Holistic Agent Leaderboard (arXiv:2510.11977)", url: "https://arxiv.org/abs/2510.11977" },
        { title: "Towards a Science of AI Agent Reliability (arXiv:2602.16666)", url: "https://arxiv.org/abs/2602.16666" },
        { title: "RLHF Book: Lecture 12: Evals", url: "https://rlhfbook.com/teach/course/lec12-chap16-evals/#1" },
        { title: "NeurIPS 2025 Evaluation Science Tutorial", url: "https://benchmarking.science/" }
      ]
    }
  ]
};
