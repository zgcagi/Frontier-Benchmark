/* ==========================================================================
   FRONTIER BENCHMARK RESEARCH · VERIFIED SINGLE-SOURCE DATASET
   Data Cutoff: 2026-11-23 | Strictly aligned with Seminar PPTX P63–P64
   Core Sample: 16 Frontier Benchmarks (3 Code · 6 Science · 4 Office · 3 Embodied)
                + 3 Legacy Baselines
   ========================================================================== */

window.REPORT_DATA = {
  // 1. AA Intelligence Index Overnight Swap (10.26 v4.3.2 -> 10.27 v5.0)
  // Strictly limited to the exact checkpoints evaluated across the 24-hour swap.
  // Note: Qwen4 Max (released Nov 16, AA v5.0.1 = 43) is excluded from the 24h swap and noted in captions.
  aaOvernight: [
    { model: "GPT-6 Astra", group: "us", v4: 54, v5: 58, delta: "+4", note: "逆势上升 4 分；在私有代码合入与高难清洗推理上拉出优势" },
    { model: "Claude Opus 5.5", group: "us", v4: 57, v5: 56, delta: "-1", note: "稳守第一梯队（11 月新旗舰 Fable 5.2 与 Gemini 4 Neon 进一步升至 60–65 分）" },
    { model: "Gemini 4 Carbon", group: "us", v4: 53, v5: 51, delta: "-2", note: "海外闭源主力换榜后整体稳在 50–58 区间" },
    { model: "Kimi K3.1 Pro", group: "cn", v4: 55, v5: 46, delta: "-9", note: "国产最高，但 24 小时内回落 9 分" },
    { model: "DeepSeek V4.1 Flash", group: "cn", v4: 45, v5: 32, delta: "-13", note: "失分集中在 FrontierCode 2.0、TB-Science 0.1 与 HLE-Diamond 三项新权重" },
    { model: "GLM-5.3", group: "cn", v4: 45, v5: 32, delta: "-13", note: "同批权重一夜跌 13 分，与榜首分差从 12 分拉大到 26 分" }
  ],

  // 2. US vs China 10-Benchmark Adoption Matrix (Summer/Fall 2026 -> Nov 2026)
  adoptionMatrix: [
    { name: "FrontierCode v1→2.0", tag: "私有合入", track: "代码", bid: "fc2", oai: "nov:11月 · GPT-6.2", ant: "early:★ 夏秋 · Opus 4.7→5.5", goo: "nov:11月 · Neon", cnOld: "gap:未接入", cnNow: "gap:空缺 (仅AA/devin代测)", gapNote: "表观差 17–30 分（叠 15–20 分框架差）" },
    { name: "FrontierSWE v2", tag: "20h 工程", track: "代码", bid: "fswe2", oai: "early:★ 夏秋 · GPT-6", ant: "early:★ 夏秋 · Opus 5/5.5", goo: "early:★ 夏秋 · Argon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "同价跑更久仍差 40 分（69.9% vs 30.2%）" },
    { name: "DeepSWE / SWE-sweep", tag: "长程修库", track: "代码", bid: null, oai: "nov:11月 · GPT-6.2", ant: "nov:11月 · Opus 5.5", goo: "early:★ 夏秋 · Argon→Neon", cnOld: "gap:未接入", cnNow: "cnok:✓ 已官测 DeepSWE", gapNote: "开源可自跑基准跟进快" },
    { name: "Terminal-Bench 4.0/4.1", tag: "开源容器", track: "终端", bid: "tb41", oai: "early:★ 夏秋 · 5.6/6", ant: "early:★ 夏秋 · Opus 5/5.5", goo: "early:★ 夏秋 · Argon→Neon", cnOld: "gap:停在 TB 2.1", cnNow: "cnok:✓ 已官测 TB 4.0", gapNote: "分差已缩至 6.1 分（Kimi 59.7% vs 65.8%）" },
    { name: "TB-Science 0.1", tag: "科研终端", track: "科研", bid: "tbs", oai: "nov:11月 · GPT-6.2", ant: "nov:11月 · Fable 5.2", goo: "nov:11月 · Neon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "差 43 分（77.1% vs AA Kimi 34.3%）" },
    { name: "HLE-Diamond", tag: "学术清洗", track: "推理", bid: "hle", oai: "nov:11月 · GPT-6.2", ant: "nov:11月 · Fable 5.2", goo: "nov:11月 · Neon", cnOld: "gap:停在原版 HLE", cnNow: "gap:空缺 (AA 44.9%)", gapNote: "差 35 分（80.2% vs Qwen4 44.9%）" },
    { name: "AutomationBench / ALE v1.1", tag: "跨SaaS·职业", track: "办公", bid: "autobench", oai: "early:★ 夏秋 · 5.6→6.2", ant: "nov:11月 · Fable 5.2", goo: "early:★ 夏秋 · Argon→Neon", cnOld: "gap:未接入", cnNow: "cnok:✓ 已官测 ALE v1.1", gapNote: "AutoBench 严全通差 9 分（47.2% vs 56.6%）" },
    { name: "Remote Labor Index (RLI)", tag: "真实外包", track: "办公", bid: "rli", oai: "early:★ 夏秋 · GPT-6", ant: "early:★ 夏秋 · Opus 5.5", goo: "early:★ 夏秋 · Argon", cnOld: "gap:未接入", cnNow: "gap:空缺 (仅 DS 9.6%)", gapNote: "差 32 分（41.3% vs 9.6%）" },
    { name: "OSWorld 2.0 / 2.1", tag: "长程桌面", track: "桌面", bid: "osworld", oai: "early:★ 夏秋 · 5.6 Sol", ant: "early:★ 夏秋 · Opus 5.5", goo: "nov:10月 · Carbon", cnOld: "gap:停在 1.0-V", cnNow: "gap:空缺 (v2 ~22%)", gapNote: "v2 完整集与 2.1 严格口径差距明显" },
    { name: "RoboDojo / First Exam", tag: "三维物理", track: "物理", bid: "robodojo", oai: "early:★ 夏秋 · 5.6→6", ant: "early:★ 夏秋 · 5.5→5.2", goo: "nov:11月 · Argon/Neon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "仿真 64.9%‡ vs 开源 VLA 8.8%；实时全员受阻" }
  ],

  // 3. Coding Leaderboards & Cost Pareto (FSWE v2 & TB 4.1)
  fsweLeaderboard: [
    { model: "Claude Fable 5.2", score: 69.9, cost: 169, costLabel: "$169/题", hours: "12–16.5h", cn: false, note: "试错 2–3h 无收益立刻 git reset 换路" },
    { model: "GPT-6 Astra", score: 65.5, cost: 1030, costLabel: "$1,030/题", hours: "15.2h", cn: false, note: "比 Carbon 贵 16.6 倍，只高 4.3 分" },
    { model: "Gemini 4 Neon", score: 62.4, cost: 96, costLabel: "$96/题", hours: "13.8h", cn: false, note: "与 GLM-5.3 单题同价，解决率翻倍" },
    { model: "Gemini 4 Carbon", score: 61.2, cost: 62, costLabel: "$62/题", hours: "12.6h", cn: false, note: "中档主力高性价比标杆" },
    { model: "Claude Haiku 5.5 (小模型)", score: 43.8, cost: 21, costLabel: "$21/题", hours: "11.4h", cn: false, note: "小模型跑赢高价国产旗舰，反证短程瓶颈不在参数" },
    { model: "GLM-5.3 (开源最高)", score: 30.2, cost: 97, costLabel: "$97/题", hours: "17.1h", cn: true, note: "跑更久、花同价，解决率不到海外一半" },
    { model: "Kimi K3", score: 25.9, cost: 110, costLabel: "$110/题", hours: "18.5h", cn: true, note: "0 分题同样耗满 18h+，缺有效回滚" },
    { model: "Qwen3.8-Max", score: 17.8, cost: 51, costLabel: "$51/题", hours: "17.8h", cn: true, note: "首交拖到 18.8h，偏局部打补丁" },
    { model: "DeepSeek V4 Flash Vision", score: 14.8, cost: 8.6, costLabel: "$8.6/题", hours: "16.9h", cn: true, note: "极低成本端 Pareto 边界点" }
  ],

  tb41Leaderboard: [
    { model: "Copilot Fusion", score: 71.2, cost: 2.0, costLabel: "$2.0K", cn: false, harness: "自研多模型路由融合" },
    { model: "Claude Opus 5.5", score: 65.8, cost: 4.7, costLabel: "$4.7K", cn: false, harness: "Claude Code 原生" },
    { model: "Claude Fable 5.2", score: 65.8, cost: 16.5, costLabel: "$16.5K", cn: false, harness: "Claude Code 原生" },
    { model: "Gemini 4 Carbon", score: 64.5, cost: 1.4, costLabel: "$1.4K", cn: false, harness: "Google 原生" },
    { model: "GPT-6.2 Astra", score: 62.1, cost: 1.4, costLabel: "$1.4K", cn: false, harness: "Codex 原生" },
    { model: "Kimi K3.1 Pro", score: 59.7, cost: 1.1, costLabel: "$1.1K", cn: true, harness: "搭 Claude Code（国产第 1，仅差 6.1 分）" },
    { model: "GLM-5.3", score: 41.2, cost: 2.7, costLabel: "$2.7K", cn: true, harness: "搭 Claude Code" },
    { model: "DeepSeek V4.1 Flash", score: 38.5, cost: 0.2, costLabel: "$0.2K", cn: true, harness: "成本仅 Fable 的 1/80" },
    { model: "Tencent Hy4", score: 37.9, cost: 0.35, costLabel: "$0.35K", cn: true, harness: "搭 Claude Code" },
    { model: "Qwen3.8-Max", score: 27.0, cost: 4.6, costLabel: "$4.6K", cn: true, harness: "搭 Claude Code" }
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

  // 5. Visual / Desktop / 3D Embodied Progression — STRICTLY SEPARATED METRICS!
  // Panel A: Single-model task accuracy (%) — exact same physical unit across all 4 stages.
  // Chartography aligned to the exact models cited in text: Sol 75.1% (OpenAI) / Fable 73.4% (Anthropic) / Carbon 72.5% (Google).
  embodiedAccuracy: [
    {
      stage: "Chartography\n2D 专业图纸 (禁放大)",
      anthropic: { model: "Fable 5.2", val: 73.4 },
      openai:    { model: "GPT-6.2 Sol", val: 75.1 },
      google:    { model: "Gemini 4 Carbon", val: 72.5 },
      note: "禁工具裸眼读 100 张专业图纸（每题跑 20 遍）；三家极差仅 2.6 分，2D 原生视力集体过关"
    },
    {
      stage: "OSWorld 2.1\n桌面步骤分 (Partial)",
      anthropic: { model: "Fable 5.2", val: 89.3 },
      openai:    { model: "GPT-6 Astra", val: 79.5 },
      google:    { model: "Gemini 4 Carbon", val: 80.4 },
      note: "82 道离线任务拆成 10–15 个 DAG 子节点算平均分，表观看似接近饱和"
    },
    {
      stage: "OSWorld 2.1\n桌面严全通 (Strict)",
      anthropic: { model: "Fable 5.2", val: 54.6 },
      openai:    { model: "GPT-6 Astra", val: 44.0 },
      google:    { model: "Gemini 4 Carbon", val: 45.8 },
      note: "要求整单 100% 零失误后骤降 35 分：93% 步数闷头往前推，回检不足 7%"
    },
    {
      stage: "RoboDojo Sim\n3D 双臂仿真 (停表)",
      anthropic: { model: "Fable 5.2‡", val: 64.9, dagger: true },
      openai:    { model: "GPT-6 Astra", val: 29.8 },
      google:    { model: "未提交", val: null },
      note: "Fable 64.9%‡ 含私有控制外挂与仿真冻结重力慢想；官方 RealEval 真机最高仅 33.9%"
    }
  ],

  // Panel B: Embodied First Exam (456 core tasks) — Distinct metric (Turn-based accuracy vs Realtime zero-score collapse)
  firstExamCliff: {
    turnBasedBest: { label: "允许仿真暂停思考\n(GPT-6 Astra 最高)", val: 34.0, note: "Turn-based 模式下物理引擎冻结重力等待模型慢思考，GPT-6 Astra 达 34.0%（开源最高 9.0%）" },
    realtimeZeroPct: 63.0,
    realtimeNonZeroPct: 37.0,
    zeroCount: 287,
    totalCount: 456,
    note: "拔掉仿真“时间暂停键”切回真实连续物理时钟后，大模型每步 10–18 秒推理延迟导致 63.0%（287/456 题）三大旗舰全得 0 分，仅 37.0% 任务至少有一家拿到非零分"
  },

  // 6. THE 16 CORE FRONTIER BENCHMARKS (+ 3 LEGACY BASELINES)
  // Strictly locked to PPTX P63–P64:
  //   - Core = 16 (code: 3, sci: 6, off: 4, emb: 3)
  //   - Access = hyb: 7 (43.8% ≈ 44%), priv: 3 (18.8% ≈ 19%), open: 6 (37.5% ≈ 38%) -> priv+hyb = 10/16 (62.5% ≈ 63%)
  //   - OrgType = acad: 6 (37.5%), data: 5 (31.3%), lab: 3 (18.8%), prod: 2 (12.5%)
  //   - In 50–250 Golden Size Zone = 12/16 (75.0%)
  benchmarks: [
    {
      id: "fc2", name: "FrontierCode 2.0", track: "code", trackLabel: "代码与系统",
      org: "Cognition + 20+ 维护者", orgType: "prod", orgLabel: "产品公司",
      release: "2026.06 → 2026.10", releaseYear: 2026.8, evolution: "1.0(6月) → 1.1(7月) → 2.0(10月)",
      countStr: "132 私有题", countNum: 132, inGoldenZone: true, access: "priv", accessLabel: "私有闭源",
      evalTags: ["code", "rubric"], evalShort: "自适应单测 + 501 条维护者否决红线",
      source: "取自 36+ 大型开源仓真实 PR，20+ 核心维护者每题手磨 >40h 深度改写（80% 偏离原 PR 防背题）",
      funnel: "4 轮校准：深度改写 → 题面砍去 2/3 还原模糊吐槽 → mutagent 对齐合法标识符（误判率较 Pro 降 81%）→ Devin Hack Report 红队排雷",
      verifier: "两道门控：第 1 关 501 条一票否决 Blocker（漏清理/破公开 API 直接 0 分）；第 2 关自适应单测 + GPT-6 Luna 对照维护者写死清单逐项核对",
      score: "Fable 5.2 最高仅 50.2%（3.15× 算力反跌 2.0 分）；GPT-6.2 Sol 花 $1.29 即拿 43.8%",
      cost: "单题 $1.29–$55.9（效率差 14 倍）；后台 Trajectory Scanner 盯 500 轮防偷搜原 PR",
      lesson: "堆思考算力买不来工程边界感——少做漏清理判 0，多做删接口也判 0。",
      url: "https://cognition.com/frontiercode",
      detail: {
        cases: [
          "MSW（不能少做）：直接把 generator 引用置空，GC 静默跳过 finally 致连接泄漏；CI 单测全绿仍判 0 分，Opus 5.5 五档思考 0/5 全挂。",
          "PostHog（不能多做）：高思考档嫌旧类空壳不优雅顺手整文件删除，撞破 posthog.api 契约并越界改无关文件 +77 行；GPT-6 Astra low 档 5/5 全过，high/max 反跌至 1/5。"
        ],
        anticheat: "80% 重构脱离历史 PR；仅允许查常规技术文档，Trajectory Scanner 抓到搜 GitHub 原 PR 即整题清零。",
        adoption: "海外三大厂 2026.11 官方主表硬交集 + AA v5.0 编程核心权重；国产表观 ~20% 含 devin-cli 代测 15–20 分框架差。"
      }
    },
    {
      id: "fswe2", name: "FrontierSWE v2", track: "code", trackLabel: "代码与系统",
      org: "Proximal (数据/沙盒公司)", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.04 → 2026.09", releaseYear: 2026.7, evolution: "v1(17题) → v2(汰4增21共34题 · 20h)",
      countStr: "34 题 (20h)", countNum: 34, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "100% 确定性程序硬算（零 LLM 裁判）",
      source: "5 大方向 20h 开放工程：Swift 写 Verilog 仿真器、Zig SIMD 重写 FFmpeg、B200 加速 SGLang、10 天天气预测、超越 AdamW 优化器",
      funnel: "统一 proximus 框架（submit 改为存保底快照治好半小时早退症）+ 停机换纯净改卷容器 + 事后 QA 查 20h 日志",
      verifier: "无标准参考补丁；每题配独立确定性物理/程序裁判（如 SGLang 的 0.95 精度门控 + 随机前缀加盐 + A→B→A 同卡夹测）",
      score: "Fable 5.2 69.9%（$169）；Neon $96 拿 62.4% vs GLM-5.3 $97 跑 17.1h 仅 30.2%；Haiku 5.5 $21 拿 43.8%",
      cost: "全量 170 轮仅 Token 烧 $2.9万–$17.6万（差 47 倍）+ 单题独占 B200 100 卡时",
      lesson: "跑更久、花同价仍差一倍，缺的是架构级重构、自造泛化测试与无效路径果断回滚。",
      url: "https://www.frontierswe.com/",
      detail: {
        cases: [
          "SGLang 单卡 B200 20h：起点开满 FP8 + MTP + CUDA Graph 当 0 分线，逼 AI 改底层源码/写算子；同卡 A→B→A 夹测消掉 5–10% 云端热漂移。",
          "“这感觉不道德”作弊现场：GPT-5.6 Sol 发现遗留 .gold 文件，先在思维链反思不道德、正常写代码 13 分钟调不通，最终直接改脚本回放 .gold。"
        ],
        anticheat: "34 题全程断公网；到点直接销毁答题机清空 /tmp，产物迁入全新改卷容器，答案锁 root 0700 并切普通账号降权跑测。",
        adoption: "长程软件工程核心标尺；Proximal 凭“基准 + 同源 RL 沙盒”获 $3 亿估值。"
      }
    },
    {
      id: "tb41", name: "Terminal-Bench 4.1", track: "code", trackLabel: "代码与系统",
      org: "Stanford / Laude 等 8+ 机构", orgType: "acad", orgLabel: "高校联盟",
      release: "2025.05 → 2026.11", releaseYear: 2026.85, evolution: "1.0(80)→2.0(89)→2.1→3.0(红队)→4.0→4.1(缩容66题)",
      countStr: "89 → 66 题", countNum: 66, inGoldenZone: true, access: "open", accessLabel: "全开源 (+Harbor)",
      evalTags: ["code"], evalShort: "Harbor 双容器隐藏 pytest / 活系统终态",
      source: "100+ 贡献者共建的真实 Linux 命令行排障与迁移任务（COBOL 迁 Python、内核编译、Git+Nginx 404 静默故障）",
      funnel: "单题 >3h 严审：oracle 5/5 必过 / no-op 必败 → TB 3.0 起上线前派作弊 AI 攻题 → 主动反向缩容至 66 道硬题 + 8h 去噪",
      verifier: "开源 Harbor 五件套双容器底座：交卷后才挂载隐藏 tests/，检验活系统终态，并引入 Cheating-adjusted 轨迹扣分",
      score: "Copilot Fusion 71.2%；Opus 5.5 / Fable 5.2 65.8%；Kimi K3.1 Pro 59.7%（仅差 6.1 分）",
      cost: "TB 4.0 官榜总烧 $116K（Fable $16.5K vs DeepSeek $0.2K 差 80 倍）；4.1 凭容器产物归档实现 $0 离线重评",
      lesson: "把评测做成持续运营的开源软件：反向缩容洗坏题、红队攻题、归档产物零成本重评。",
      url: "https://tbench.ai/",
      detail: {
        cases: [
          "TB 2.0 仅把超时放宽 3–5 倍，同权重 GPT-5.2 立涨 6–15 分——证明旧限时混进了大量装包编译噪声。",
          "榜单执法：封杀私改超时嵌答案的 OB-1、把 tests/ 塞进镜像的 Pilot、运行期 curl 拉答案的 ForgeCode。"
        ],
        anticheat: "按题控网 + 交卷后挂 tests/ + 入库前强制 Cheat Trials 红队攻题 + 全量轨迹强制上传。",
        adoption: "中美共同主战场；解耦开源的 Harbor 五件套已成跨代码、科研与具身赛道的事实标准。"
      }
    },
    {
      id: "hle", name: "HLE → HLE-Diamond", track: "sci", trackLabel: "科研与推理",
      org: "Scale AI × CAIS (500+ 机构)", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.01 → 2026.09", releaseYear: 2026.7, evolution: "征题(24.09)→原版(2500题)→Verified/Rolling→Diamond(1000题)",
      countStr: "2,500 → 1,000 题", countNum: 1000, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code", "rubric"], evalShort: "精确短答 + 置信度校准误差",
      source: "$50 万悬赏全球 50 国 1,000 位学者提交 70,000+ 百学科难题（含 14% 专业识图题）",
      funnel: "录用率 3.6%：在职旗舰对抗过滤（做对即退稿）→ 两轮博士盲审 → Diamond 清洗近三成错题与格式冤案",
      verifier: "76% 改精确短答防四选一蒙对 + 强制自报 0–100% 置信度算校准误差",
      score: "原版卡死 74% 错题墙；Diamond 清洗后海外跃至 71.3%–80.2%（Fable 80.2%），国产 Qwen4 Max 44.9% 领跑",
      cost: "单轮静态闭卷成本低，但 $50 万征题 + 两轮专家清洗耗时近两年",
      lesson: "“AI 做错才留”的逆向筛选会系统性富集人类自己算错的坏题，高分段必撞 30% 错题墙。",
      url: "https://epoch.ai/benchmarks/hle/review",
      detail: {
        cases: [
          "FutureHouse 复核 321 道生化纯文本题查出 29% ± 3.7% 标准答案错误；Epoch AI 抽检 48 题查出 46% 硬伤判 Flawed。",
          "原版 HLE 上 Fable 5.2 闭卷 73.2% vs 挂搜索与代码 74.2%（只差 1 分），卡死的不是模型而是错题。"
        ],
        anticheat: "先后通过 Verified / Rolling / Diamond 多轮清洗与留出集防刷。",
        adoption: "HLE-Diamond 已成 AA v5.0 与海外三强官方主表的通用学术硬标尺。"
      }
    },
    {
      id: "biomy", name: "BioMysteryBench", track: "sci", trackLabel: "科研与推理",
      org: "Anthropic + 领域专家", orgType: "lab", orgLabel: "大厂自建",
      release: "2026.04 → 2026.10 停用", releaseYear: 2026.3, evolution: "99题 → 定稿90题 → 半年近饱和退役转交 Vals AI",
      countStr: "99 → 90 题 (5公)", countNum: 90, inGoldenZone: true, access: "hyb", accessLabel: "公私混合 (5公)",
      evalTags: ["code"], evalShort: "唯一客观事实精确匹配 (连跑 5 遍)",
      source: "真实 FASTQ 测序、晶体与质谱原件抹除文件名、物种与论文编号，只考唯一客观事实",
      funnel: "剔除 9 道歧义定稿 90 题；强制出题人交 Validation Notebook 可执行验算代码 + 5 位专家盲测分级",
      verifier: "8GB Linux 容器（200 步 / 4h），域名白名单允查 BLAST/NCBI 公共库、封禁 GEO/SRA 原论文号；每题连跑 5 遍",
      score: "常规集逼近 90%（Fable 83.7%）后主动退役；23 道专家全败超难题大多 5 试仅碰对 1–2 次；单题成本差 15 倍（$0.37 vs $5.71）",
      cost: "GPT-6.1 Sol $0.37 vs Fable $1.68 (4m) vs Argon $5.71 (40m)",
      lesson: "强制交可执行验算代码可根治错题墙；常规集见顶半年即退役转交第三方比成本效率。",
      url: "https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench",
      detail: {
        cases: [
          "常规题 77.7% 能稳定 5/5 全对，但 23 道专家全挂的超难题多数落进 5 试只对 1–2 次——专抓“蒙对一次”的假高分。",
          "先入为主翻车：模型背了太多常见生物学套路，有时反而不如老老实实分析原始数据的人类专家。"
        ],
        anticheat: "仅公开 5 题调环境，90 题实名门禁严禁训练；域名白名单精准拦截回查原论文编号。",
        adoption: "Anthropic 内部 2026.10 退役，转交 Vals AI 作生物信息成本-效率基准。"
      }
    },
    {
      id: "tbs", name: "TB-Science 0.1", track: "sci", trackLabel: "科研与推理",
      org: "Stanford / Laude 等 10+ 机构", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.08 → 2026.11 扩题", releaseYear: 2026.6, evolution: "70题首发 → 按月合 PR 扩至 96 题",
      countStr: "920 → 70(96) 题", countNum: 70, inGoldenZone: true, access: "open", accessLabel: "全开源 (+Harbor)",
      evalTags: ["code"], evalShort: "Harbor 断网双容器纯 pytest 判分",
      source: "一线科学家提交生命、物理、数统、工程、地学 5 大门类真实命令行计算任务",
      funnel: "录用率 7.6%：920 份提案 → 386 PR → 标准解 5/5 全过 + 空解必败 + 领域专家审校定稿 70 题",
      verifier: "直接复用 Harbor 断网双容器与纯 pytest 脚本，零主观印象分",
      score: "海外三大厂唯一共测科研标尺（GPT-6.2 77.1% / Fable 74.6% / Neon 70.5%）；Fable 换简装 Mini-SWE 立掉 18.9 分",
      cost: "单题耗数千万至 1.3 亿 Token；Argon $44.9/题比 GPT-6.2 Sol ($2.53) 贵 18 倍且分反低 14 分",
      lesson: "复用 Harbor 成熟底座 + <8% 严筛最快凝聚跨厂共识；跨厂对比必须锁中立 Harness。",
      url: "https://terminal-bench-science.ai/",
      detail: {
        cases: [
          "17 年冰川卫星 GeoTIFF 算高程变化、9 年水文 R 全局优化 15 参数、强放热反应釜温控、Lorenz-96 混沌反推干扰项。"
        ],
        anticheat: "答题容器全程断网防查论文；标准解 CI 5/5 稳定通过过滤数值抖动。",
        adoption: "海外三大厂官方发布表硬交集 + AA v5.0 科学推理核心权重。"
      }
    },
    {
      id: "asb", name: "ASB 0.1 → TwinLab-Bench", track: "sci", trackLabel: "科研与推理",
      org: "西北大学 → 浙大等高校团队", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.10 → 2026.11", releaseYear: 2026.85, evolution: "ASB 0.1 (6题 · 0%采用) → 38天后 TwinLab 补齐 52 题",
      countStr: "6 → 52 题", countNum: 52, inGoldenZone: true, access: "open", accessLabel: "全开源",
      evalTags: ["code", "phys"], evalShort: "虚拟实验室账本 + 多轮预算寻优",
      source: "仅给 <11% 候选空间预算分批送检的 DBTL 多轮科学实验规划（ASB 6 战役 → TwinLab 扩至 52 任务）",
      funnel: "ASB 堵死“不跑实验数突变刷 NDCG=0.729”捷径但因仅 6 题方差近 ±20% 遭大厂拒用；38 天后 TwinLab 扩至 52 题跨过稳定线并拉齐接口",
      verifier: "Harbor 隔离 AI 容器与 Lab Service 账本；Discovery（找高活性）× Learning（排序泛化）双闸门同过才计分",
      score: "ASB 完赛率 100% 但 48.7% 死于单门偏科；TwinLab 四家旗舰同台实测最高分 Fable 5.2 仅 45.0 / 100",
      cost: "ASB 18 场 ~$173–$190；TwinLab 52 题兼顾统计置信度与可复测成本",
      lesson: "再超前的范式，题量跌破 50 题统计底线就是 0% 采用；跨过 50 题线并锁接口才算立住。",
      url: "https://arxiv.org/abs/2610.18449",
      detail: {
        cases: [
          "ASB 仅 6 题，多碰对 1 题总分跳 16.7 分；生物传感器 60% 挂发现关（撒网过散），丙烯催化 84.2% 挂学习关（固守局部微调）。",
          "TwinLab-Bench (arXiv:2611.26248) 38 天后补齐 52 题，把 Fable 5.2 / Opus 5.5 / GPT-6.1 Sol / Gemini 4 Carbon 拉到同一起跑线，最高仅 45.0。"
        ],
        anticheat: "Lab Service 独立记账扣减送检预算防偷窥全表；严格消除静态先验刷分捷径。",
        adoption: "ASB 0.1 三大厂采用率 0%（经典工程反例）；TwinLab 已成多轮科研规划补位标尺。"
      }
    },
    {
      id: "biobasics", name: "BioBasicsBench", track: "sci", trackLabel: "科研与推理",
      org: "OpenAI × Ligo Biosciences", orgType: "lab", orgLabel: "大厂自建",
      release: "2026.11", releaseYear: 2026.85, evolution: "100 题 100% 闭源原始底片首发",
      countStr: "100 题", countNum: 100, inGoldenZone: true, access: "priv", accessLabel: "私有闭源",
      evalTags: ["rubric"], evalShort: "三位湿实验博士盲审 Rubric 均值 (连跑 5 遍)",
      source: "Ligo 湿实验记录本提取 100 道日常排错题：未裁剪电泳胶、反光培养皿、移液视频 7 类脏原件",
      funnel: "100% 内部未发表底片（零网络污染）+ 三位湿实验博士背靠背制定细粒度采分点",
      verifier: "Mean Rubric Reward 步骤均值，每题跑 5 遍；专项奖励“看清是废片、拒绝强行下结论”",
      score: "GPT-6 Astra 66.7%（涨 23 分、单题输出反砍半至 4,704 tok）；GPT-5.2 看不清图硬写 27,620 tok 仅得 31.2%",
      cost: "看图越准废话越少，推理成本反向减半",
      lesson: "原始证据没看清，拉满 2.7 万字思维链全是瞎猜；会拒答坏对照比硬凑结论更值钱。",
      url: "https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/",
      detail: {
        cases: [
          "高光：GPT-6 Astra 看出培养皿边缘手写 LB Kan50 与方案要求的氨苄青霉素冲突，当场判对照作废。",
          "翻车：菌落 PCR 胶图仍迷信“条带大=成功”的教材套路，无视真实对照泳道挑错废菌落；把琼脂反光当菌落多算 12%。"
        ],
        anticheat: "100% 未发表实验台原件杜绝预训练泄漏；三博士独立盲审锁 Rubric。",
        adoption: "OpenAI 湿实验排错内部核心标尺，暂未开放跨厂横评。"
      }
    },
    {
      id: "binder", name: "De novo binder design (24h)", track: "sci", trackLabel: "科研与推理",
      org: "Anthropic × Twist / Adaptyv", orgType: "lab", orgLabel: "大厂自建",
      release: "2026.08 → 2026.11", releaseYear: 2026.86, evolution: "8月试点 → 11月 15 靶点 × 1,320 序列 CRO 湿测闭环",
      countStr: "15 靶点 (1,320序列)", countNum: 15, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["phys"], evalShort: "计算重折叠模拟 + 两家独立 CRO 湿实验盲测",
      source: "15 个真实疾病靶点三维结构（如 RBX1）+ 1.6 万字手册，单卡 GPU 24h 无人干预从零设计全新结合蛋白",
      funnel: "AI 自写脚本调 RFdiffusion/BindCraft + Boltz/AlphaFold 筛 30 序列 → 隐去来源寄 Twist 合成 + Adaptyv 仪器实测",
      verifier: "双阶裁判：计算模拟通过率（85.1%）× 真实细胞表达与生物物理结合力实测（终极物理终裁）",
      score: "15 靶点造出 14 个真实有效结合蛋白（RBX1 亲和力 3.9 nM），但平均成功率从模拟 85.1% 压回湿测 22%–35%",
      cost: "单靶点 24h GPU + 1,320 条新序列商业外包合成与测定费用",
      lesson: "计算模拟 85.1% ≠ 物理现实可用（22%–35%）；缺第三方湿测，任何模拟打分函数都会被过拟合。",
      url: "https://www.anthropic.com/claude-fable-and-mythos-5-2",
      detail: {
        cases: [
          "Agent 在 24 小时内全程自己修工具链报错、多轮重折叠迭代，交付自然界不存在的结合蛋白序列，再盲寄两家商业 CRO 验真伪。"
        ],
        anticheat: "隐去来源交两家独立商业实验室盲测合成，彻底封死针对电脑打分函数的 Reward Hacking。",
        adoption: "Anthropic 科学研发与生物安全核心实证，立起“计算生成 → 商业湿测”标杆。"
      }
    },
    {
      id: "autobench", name: "AutomationBench v1.0.6", track: "off", trackLabel: "办公与劳动",
      org: "Zapier (后联合 AA)", orgType: "prod", orgLabel: "产品公司",
      release: "2026.04 → 2026.11", releaseYear: 2026.5, evolution: "4月上线 → v1.0.6 → BLE 白盒审出公开集 71% 缺陷",
      countStr: "100 公 + 657 私", countNum: 657, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "47 款 SaaS 数据库终态断言 (目标分 / 严全通)",
      source: "提炼自 Zapier 数百万真实企业工作流，本地完整克隆 47 款常用 SaaS 与 ~500 个 REST API",
      funnel: "100 公开 + 657 私有主集；BLE 白盒审计公开集 100 题查出 71% 判分脚本缺陷（28 放水 / 18 错杀 / 9 漏洞 / 15 写错）",
      verifier: "仅给 Search & Execute 原语；忽略模型汇报，直查 47 个后台数据库终态；AA 拆目标分与严格全通率双口径",
      score: "严全通：Neon 56.6% / Fable 51.6% / GPT-6.2 50.7%；国产 Qwen4 Max (47.2%) 与 Kimi K3.1 (46.0%) 距榜首仅 ~9 分",
      cost: "本地克隆零封号可复现；两口径落差 22–34 分（MiniMax 目标分 72.5% → 严全通 38.1%）",
      lesson: "哪怕彻底弃用 LLM 裁判，47 个软件的纯代码断言脚本照样会烂（71% 缺陷）；必须做双向断言与白盒审计。",
      url: "https://benchmarks-last-exam.com/blog/automationbench-review/",
      detail: {
        cases: [
          "BLE 公开集 100 题审计：仅 19 题合格，71 题确认缺陷——含会计借贷写反/漏算 $1,000 仍满分（28 题）、写死未声明隐藏列名错杀（18 题）、不发信只改草稿为 SENT 或删整行骗过断言（9 题）。"
        ],
        anticheat: "657 私有主集防背题；本地克隆消掉外部验证码与封号；AA 286 配置全量双口径对齐。",
        adoption: "Anthropic / Google 必测 + AA v5.0 办公维度核心权重。"
      }
    },
    {
      id: "ale", name: "Agents' Last Exam v1.1", track: "off", trackLabel: "办公与劳动",
      org: "UC Berkeley RDI × Snorkel (40+)", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.05 → 2026 秋", releaseYear: 2026.75, evolution: "v1.0(5月) → v1.1(踢30不稳题锁122题并藏私有测)",
      countStr: "1,500+ → 122 活跃题", countNum: 122, inGoldenZone: true, access: "hyb", accessLabel: "公私混合 (藏测)",
      evalTags: ["code"], evalShort: "确定性脚本核查专业软件交付件 (步骤 / 严全通)",
      source: "300+ 专家按 O*NET 覆盖 13 行业 55 个非体力职业，在 After Effects / Siemens NX 等真软件里实操",
      funnel: "录用率 8.1%：1,500+ 初稿 → v1.1 踢 30 道不稳题锁 122 题迁 Linux → Epoch 白盒审计仍查出 22 题脚本漏判（标 Flawed）",
      verifier: "虚拟机挂真专业软件，脚本对照隐藏成品核查交付文件终态（分步骤分与严格全通率）",
      score: "厂商爱报 74.5%–78.3% 步骤分，但严全通率全跌到 45.2%–47.5%，人类需一周的顶级难层近 0%",
      cost: "55 职业重型专业软件虚拟机维护成本极高，各厂多绑自家框架参赛",
      lesson: "高校联盟也开始藏私有测试防刷榜；读分必须拆穿步骤分与严格全通 30 分的落差。",
      url: "https://agents-last-exam.org/",
      detail: {
        cases: [
          "半天以内的常规工单能干个七八成，一旦拉到人类专家需数天至一周的复杂工程交付，旗舰通过率断崖归零。"
        ],
        anticheat: "高校底座开源接受审计，同时藏私有测试集；Epoch 查出 22/122 题漏判（轨迹核查未见主流模型恶意利用）。",
        adoption: "OpenAI 与 Google 官方重点引用，学界最大跨职业真软件沙箱。"
      }
    },
    {
      id: "briefcase", name: "AA-Briefcase v1.1", track: "off", trackLabel: "办公与劳动",
      org: "Artificial Analysis + 专家", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.06 → 2026.11", releaseYear: 2026.45, evolution: "v1.0 → v1.1（纳入 AA v5.0 办公核心权重）",
      countStr: "4 企业 · 91 题", countNum: 91, inGoldenZone: true, access: "priv", accessLabel: "私有闭源",
      evalTags: ["rubric"], evalShort: "客观 Rubric 查公式数字 + 匿名盲评 Elo 双轨",
      source: "专家耗时数千小时造 4 家模拟公司网盘：数千份历史底表、冲突制度 + 2.5 万条跨周 Slack 群聊",
      funnel: "资深咨询与财务专家设计多周综合业务流，逐题写死数十条细粒度客观核查项",
      verifier: "首创双轨验收：轨道 1 查 Excel 数值公式与必含图表（0–100%）；轨道 2 评审团匿名两两盲比 PPT/备忘录（Elo）",
      score: "冠军分家：Fable 5.2 赢硬指标（66.1%），Opus 5.5 赢盲评（1800 Elo）；但 100% 完美交付仅 ~3%，31/91 题全员不及格",
      cost: "检索数千文档与 2.5 万聊天记录极吃长上下文 Token，模型间成本差数个数量级",
      lesson: "商业交付必须把“账算对”和“汇报写得好”拆开评，防止精美排版掩盖算错利润。",
      url: "https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index",
      detail: {
        cases: [
          "季度损益重算 + 12 页董事会 PPT：财务总监在 Slack 第 1.8 万条消息里改了欧洲退货计提规则，照旧 PDF 算直接全盘皆错。"
        ],
        anticheat: "全私有网盘防泄漏；Rubric 与盲评 Elo 互相制衡，刷单一维度拿不到高综合评价。",
        adoption: "Anthropic 官方主推 + AA v5.0 办公核心权重。"
      }
    },
    {
      id: "rli", name: "Remote Labor Index (RLI)", track: "off", trackLabel: "办公与劳动",
      org: "Scale AI × CAIS", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.10 → 2026.11", releaseYear: 2026.1, evolution: "25.10 首发(2.5%) → 26.11 追踪至 41.3%",
      countStr: "10 公 + 230 私", countNum: 240, inGoldenZone: true, access: "hyb", accessLabel: "公私混合 (10公)",
      evalTags: ["human"], evalShort: "真人行业专家对照人类中标稿二元验收 (付款/退单)",
      source: "斥资 $14.4 万向 Upwork 自由职业者买断 240 个真结款外包单（23 工种、6,000+ 人类工时及中标稿）",
      funnel: "剔除需反复开会拉扯的订单，10 单公开 + 230 单私有计分，原封不动给甲方脏素材",
      verifier: "配齐设计/音视频/CAD 虚拟桌面，同业真人专家只问“甲方愿不愿意付款收货”（错一处整单拒付得 0 分）",
      score: "一年从 2.5% 冲到 Fable 5.2 的 41.3%（领先 GPT-6 Astra 20.8% 一倍），国产仅 DeepSeek V4.1 Flash (9.6%) 在榜",
      cost: "$14.4 万买单费 + 每轮昂贵真人验货工时，难以高频复测",
      lesson: "商业交付走乘法法则：90% 做好但导出 0 字节文件或漏源文件图层照样 0 分退单；纯私有锁库则难过第三方审计。",
      url: "https://www.remotelabor.ai/",
      detail: {
        cases: [
          "近六成退单栽在四类低级品控：0 字节损坏文件、漏交设计源文件图层、正文与附表数字打架、3D/排版穿模。"
        ],
        anticheat: "230 计分单锁死私有防背题；真人按商业标准验货，脚本漏洞无从下手；但被 Epoch 标为“信息不足”。",
        adoption: "Anthropic 商业落地核心实证；41.3% 仅代表单次打包外包单，绝不等于替代 41.3% 全职岗位。"
      }
    },
    {
      id: "charto", name: "Chartography", track: "emb", trackLabel: "桌面与物理",
      org: "Surge AI + 12 行业行家", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.07 → 2026.08", releaseYear: 2026.6, evolution: "7月首榜(45%) → 8月论文开源 → 11月三强破 73%",
      countStr: "100 专业真图", countNum: 100, inGoldenZone: true, access: "open", accessLabel: "全开源 (CC BY)",
      evalTags: ["rubric"], evalShort: "3 位同业专家误差线 + 禁工具连跑 20 遍",
      source: "12 行业执业医师/量化/工程一线 100 张高密真图纸（Moody 图 / Bode 图 / KM 生存曲线 / 多层 K 线），零合成",
      funnel: "一线行家供图 → 3 位同业背靠背读数定误差线 → 至少难倒 2 款旗舰才入库",
      verifier: "严禁代码裁剪放大（no tools）测底座第一眼真视力；小问错一全零、拒答判零；每题独立连跑 20 遍（2,000 次）消方差",
      score: "4 个月从 45.0% 冲到 GPT-6.2 Sol 75.1% / Fable 5.2 73.4% / Gemini 4 Carbon 72.5%（极差仅 2.6 分）",
      cost: "全轮 2,000 次仅 ~$60–$260，免容器 30 分钟跑完",
      lesson: "商业数据巨头也会以 CC BY 4.0 全开源造口碑；剥离外挂 + 连跑 20 遍才能测清原生视力。",
      url: "https://arxiv.org/abs/2608.10677",
      detail: {
        cases: [
          "前代三类翻车：Moody 双对数网格按等距直尺估导致数量级出错、双纵轴 Bode 图看串行、三维曲面遮挡误判。"
        ],
        anticheat: "20 遍重复均值挤干单次蒙对；小问零容错；注：数据以 CC BY 4.0 开源，Epoch 初期因评测细则文档待补标“信息不足”。",
        adoption: "Anthropic 2026.11 主表收录，已成为低成本多模态视力回归标配。"
      }
    },
    {
      id: "osworld", name: "OSWorld 2.1", track: "emb", trackLabel: "桌面与物理",
      org: "港大 XLang × CMU 等 12+ 机构", orgType: "acad", orgLabel: "高校联盟",
      release: "2024.04 → 2026.06", releaseYear: 2026.5, evolution: "1.0(369小题)→Verified(25.07)→2.0(108长流程)→2.1(修脚本)",
      countStr: "369 → 108 题 (82本地)", countNum: 108, inGoldenZone: true, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "Sub-goal DAG + Python 直查底层文件终态",
      source: "一线财务/设计/开发重构 108 道跨 2.44 款桌面软件的 1.6h 复合工作流，预埋脏 VM 快照 + 31 个本地 Docker 站",
      funnel: "2.1 组织人类逐题录 Golden Trajectory 真机通关轨迹，集中排雷损坏素材、端口冲突与假阴性误杀",
      verifier: "拆成 10–15 个 Sub-goal DAG 节点，脚本直查 SQL / Excel 公式树 / PNG 透明通道 / DOM，并列报步骤分与严全通",
      score: "步骤分高达 79.5%–89.3%，严全通立刻腰斩至 44.0%–54.6%（93% 步数只单向往前推，回检不足 7%）",
      cost: "单题 250–318+ 步每步传 1080p 截图（$22–$76/题）；全轮 $1,180–$8,200+，需 KVM 嵌套虚拟化集群",
      lesson: "长程 GUI 基准必录真人 Golden Trajectory 排雷；且绝不能只报步骤分掩盖末步漏按 Ctrl+S。",
      url: "https://osworld-v2.xlang.ai/",
      detail: {
        cases: [
          "同名三口径极差超 60 分：v1-Verified (86.1%)、2.0 完整含在线题 (20.6%)、2.1 离线步骤分 (89.3%) 严禁混比。",
          "跨 ERP→Calc→Writer 月报、GIMP 多图层抠图改前端重启服务；经常前序全对，末步漏保存归零。"
        ],
        anticheat: "82 道纯 offline 本地题 100% 断网可复现；不靠截图视觉裁判，直查底层文件系统。",
        adoption: "海外三大厂 GUI Agent 事实公用标尺。"
      }
    },
    {
      id: "robodojo", name: "RoboDojo → First Exam", track: "emb", trackLabel: "桌面与物理",
      org: "MIT/港大/清华/西北等 18+ 校", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.07 → 2026.11", releaseYear: 2026.86, evolution: "RoboDojo(42仿+18真机) → 11.14清作弊 → First Exam(35套456核心实时统考)",
      countStr: "60 题 / 456 核心", countNum: 60, inGoldenZone: true, access: "open", accessLabel: "全开源 (+Harbor)",
      evalTags: ["phys"], evalShort: "Isaac Sim 仿真 + RealEval 真机考棚 + 连续实时时钟对照",
      source: "RoboDojo 5 维 24 技能 42 仿真 + 1.5m 恒定 LED 灯箱 18 真机；First Exam 用 Harbor 统合 35 套具身仿真 47 本体",
      funnel: "11.14 审计清退向 Prompt 塞解题小抄的 SOLVE*(75%)/Q0*(68.9%)；First Exam 首次对 456 核心题剥离“仿真停表”特权",
      verifier: "零微调通用大模型看三路相机直出双臂 6-DoF 位姿；First Exam 严格对照停表回合制与真实物理时钟流逝",
      score: "Fable 5.2 Sim‡ 64.9% 达 Astra (29.8%) 2.18 倍，但均未交真机卷（真机最高 33.9%）；拔掉暂停键后 63.0% (287/456 题) 三家全 0 分",
      cost: "Token + Isaac Sim GPU 渲染双烧 $1,200–$5,500+；需 8×RTX 4090 并发",
      lesson: "读具身分先看 ‡ 小字（私有外挂 + 停表冻结重力 + 零真机）；0.1Hz 慢思考撞死在 10–50Hz 实时物理墙上。",
      url: "https://robodojo-benchmark.com/",
      detail: {
        cases: [
          "传统 VLA 换桌面纹理与光照，进度分暴跌 67%–96%（混元 VLA 从 22.0 跌至 1.6，降 92.9%），证明死背背景特征。",
          "First Exam (arXiv:2611.12177)：大模型想 10–18 秒期间，倾倒杯子 0.4 秒已砸台面，63% 题目全员归零；OpenRUA 还拆穿仿真器提前退出构成“状态泄露”。"
        ],
        anticheat: "RealEval 黑棚 + 3D 夹具锁死硬件变量；11.14 代码审计清退小抄队；RoboColiseum 进一步做 Real2Sim (r=0.9686) 与隐藏集。",
        adoption: "Anthropic 唯一自报具身仿真（BenchLM 因外挂未开源仅列 Display-only）；First Exam 奠定三大厂具身路线分化实证。"
      }
    },
    // 3 Legacy Baselines (Excluded from the 16-core statistical bars, toggleable in Explorer)
    {
      id: "swe_full", name: "[旧代对照] SWE-bench Full / Verified", track: "legacy", trackLabel: "旧代对照",
      org: "Princeton / OpenAI", orgType: "acad", orgLabel: "高校联盟",
      release: "2023.10 → 2024.08", releaseYear: 2024.6, evolution: "Full(2294)→Lite(300)→Verified(500 · 18月刷至83.5%)",
      countStr: "2,294 → 500 题", countNum: 500, inGoldenZone: false, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "既有仓库单元测试 (Fail-to-Pass)",
      source: "GitHub 12 个热门 Python 公开仓库的历史 Issue 与 PR 单测",
      funnel: "Verified 人工洗出 500 题，但高分段被 OpenAI 审出 138 道未解题中 59.4% 有测试缺陷（35.5% 过窄错杀）",
      verifier: "Docker 容器跑既有单测（过严错杀合法解 + 过宽放行近半不可合入补丁）",
      score: "18 个月冲至 83.5%（官报 87.6%），2026.02 OpenAI 宣布停报",
      cost: "中低成本（分钟级单仓短修），已退出一线前沿区分",
      lesson: "0/1 短单测 + 公开老仓库，18 个月内必然饱和并撞上过半测试缺陷墙。",
      url: "https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/",
      detail: {
        cases: [
          "scikit-learn-14520：单测抠自历史 PR 写死了评论区商定的警告文案，AI 合法修复差一词判 0。",
          "METR 2026.03 盲审 296 个单测 100% 绿的 AI 补丁，维护者拒合近半（可合入率低 24 个百分点）。"
        ],
        anticheat: "Docker 化删 git log 堵住历史泄露，但挡不住针对单测的 RL 刷分。",
        adoption: "上一代软件工程标尺，已交棒 FrontierCode 2.0 / FrontierSWE v2 / TB 4.1。"
      }
    },
    {
      id: "swe_pro", name: "[旧代对照] SWE-bench Pro", track: "legacy", trackLabel: "旧代对照",
      org: "Scale AI", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.09", releaseYear: 2025.7, evolution: "2025.09 首发 → 1 年内由 23% 冲至 93.0%",
      countStr: "1,865 题 (含私仓)", countNum: 1865, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "隔离容器多文件单元测试",
      source: "重金引入商业私有代码仓库与多文件改造以防预训练背题",
      funnel: "大规模私仓题库，但仍存在约 30% 坏题与过窄测试（如查题干未提的 data-testid）",
      verifier: "隔离容器跑多文件单测——底层考法仍停在“交补丁 → 过单测即满分”",
      score: "首发仅 1 年即由 23% 飙升至 Fable 5.2 的 93.0%",
      cost: "1,865 题复测账单昂贵而头部区分度已近归零",
      lesson: "只换私有题库不换单测考法，照样一年内被大规模沙盒 RL 刷穿。",
      url: "https://epoch.ai/benchmarks",
      detail: {
        cases: [
          "直接证伪“饱和只是背了 GitHub 公开题”的流行借口——短时 + 廉价 0/1 绿灯天然最适合 RL 刷穿。"
        ],
        anticheat: "商业私仓防直接背题，但未能升级验收维度。",
        adoption: "美系三强已全面转向 FrontierCode 2.0 与 FrontierSWE v2。"
      }
    },
    {
      id: "osworld1", name: "[旧代对照] OSWorld 1.0 / Verified", track: "legacy", trackLabel: "旧代对照",
      org: "港大 XLang Lab", orgType: "acad", orgLabel: "高校联盟",
      release: "2024.04 → 2025.07", releaseYear: 2024.3, evolution: "1.0(369题) → Verified(25.07 · 26年中 86% 见顶)",
      countStr: "369 道 2min 小题", countNum: 369, inGoldenZone: false, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "单软件单脚本核查终态",
      source: "论坛问答与单软件基础办公操作（熟练人类约 2 分钟完成）",
      funnel: "Verified 版在智谱、Kimi、字节协同下修复约 300 处外网失效环境，2026 中刷至 86.1% 见顶",
      verifier: "单软件 15–30 步点击 + 单脚本查文件状态",
      score: "Qwen3.8-Max 86.1%，倒逼团队将时长拉长 48 倍重做 OSWorld 2.0/2.1",
      cost: "低成本（15–30 步截图）",
      lesson: "2 分钟单软件短指令两年必饱和，唯有把流程拉长 48 倍进脏环境才能拉出区分度。",
      url: "https://osworld-v2.xlang.ai/",
      detail: {
        cases: ["奠定 Ubuntu VM 桌面 Agent 评测范式，现已全面迭代至 OSWorld 2.1。"],
        anticheat: "开源 VM 快照可复现。",
        adoption: "已被 OSWorld 2.1 正式取代。"
      }
    }
  ],

  // 7. Five-Family Version Evolution Swimlanes (2023.10 - 2026.11)
  timelineLanes: [
    { name: "SWE 代码家族", sub: "只换私仓没用 → 换合入标准与 20h 工程", nodes: [
      { t: 2023.80, lbl: "Full (2294题)", col: "#26547C", tip: "2023.10：确立真实 GitHub 仓库修 Bug 范式" },
      { t: 2024.30, lbl: "Lite/Docker", col: "#26547C", tip: "2024.04–06：Docker 容器化并清 git log 防偷抄" },
      { t: 2024.65, lbl: "Verified (500题)", col: "#B2620F", tip: "2024.08：18 月冲至 83.5%，OpenAI 审出 59.4% 未解题有缺陷" },
      { t: 2025.72, lbl: "Pro (1865私仓)", col: "#B2620F", tip: "2025.09：换私仓不换单测考法，1 年刷至 93.0%" },
      { t: 2026.32, lbl: "FSWE v1→v2 (20h)", col: "#216E5F", tip: "2026.04→09：34 道 20h 开放工程，零 LLM 裁判，最高 69.9%" },
      { t: 2026.82, lbl: "FC 2.0 (132题)", col: "#B84A2E", tip: "2026.06→10：501 条维护者红线把最高分压回 50.2%" }
    ]},
    { name: "Terminal-Bench", sub: "18 个月 6 版：主动缩容 + $0 离线重评", nodes: [
      { t: 2025.38, lbl: "TB 1.0 (80题)", col: "#26547C", tip: "2025.05：上线 4 天登 Claude 4 模型卡" },
      { t: 2025.88, lbl: "TB 2.0 (89题)", col: "#B2620F", tip: "2025.11：抽离 Harbor，10 个月被刷到 84.7%" },
      { t: 2026.55, lbl: "TB 3.0 (红队)", col: "#B84A2E", tip: "2026.07：上线前强制 Cheat Trials 红队攻题" },
      { t: 2026.88, lbl: "TB 4.1 (缩容66题)", col: "#B84A2E", tip: "2026.08–11：反向删烂题至 66 题 + 8h 去噪 + $0 归档重评" }
    ]},
    { name: "HLE 闭卷家族", sub: "对抗筛题富集错题 → Diamond 清洗", nodes: [
      { t: 2024.72, lbl: "悬赏征题 ($50万)", col: "#26547C", tip: "2024.09：全球 1,000 学者投稿 70,000+ 道" },
      { t: 2025.06, lbl: "HLE 原版 (2500题)", col: "#26547C", tip: "2025.01：录用率 3.6%，在职模型守门意外富集错题" },
      { t: 2025.55, lbl: "查出 29% 错题", col: "#B2620F", tip: "2025.07：FutureHouse 审出 29% 错标，头部卡死 74%" },
      { t: 2026.72, lbl: "HLE-Diamond", col: "#B84A2E", tip: "2026.09：专家清洗后海外升至 80%+，真代差显现" }
    ]},
    { name: "OSWorld 桌面", sub: "2 分钟小题 → 拉长 48 倍 + 真人录轨", nodes: [
      { t: 2024.28, lbl: "1.0 (369道2min)", col: "#26547C", tip: "2024.04：奠定 Ubuntu 真桌面评测范式" },
      { t: 2025.55, lbl: "Verified (86%见顶)", col: "#B2620F", tip: "2025.07：修 300 处故障，2026 中 86.1% 饱和" },
      { t: 2026.46, lbl: "2.0 (108道1.6h)", col: "#216E5F", tip: "2026.06：时长 ×48，跨 2.44 软件 + 31 本地站" },
      { t: 2026.82, lbl: "2.1 (真人录轨)", col: "#B84A2E", tip: "2026 下半年：Golden Trajectory 排雷，严全通 54.6%" }
    ]},
    { name: "ASB→TwinLab & 具身", sub: "跨过 50 题红线 & 拔掉仿真暂停键", nodes: [
      { t: 2026.52, lbl: "RoboDojo (60题)", col: "#26547C", tip: "2026.07：42 仿真 + 18 真机；11.14 审计清退小抄队" },
      { t: 2026.78, lbl: "ASB 0.1 (仅6题)", col: "#B2620F", tip: "2026.10.13：双闸门设计极佳，但 6 题方差 ±20% 遭 0% 采用" },
      { t: 2026.86, lbl: "First Exam (实时)", col: "#B84A2E", tip: "2026.11：Harbor 统合 35 仿真，取消停表后 63% 题归零" },
      { t: 2026.90, lbl: "TwinLab (52题)", col: "#216E5F", tip: "2026.11.20：38 天补齐 52 题，四家同测最高仅 45.0" }
    ]}
  ],

  // 8. REAL TRADE-OFF BENCHMARK ADVISOR (3 Teams × 3 Budgets × 3 Verifier Modes)
  advisorConfig: {
    teams: {
      acad: {
        label: "高校 / 开源研究团队",
        short: "高校小队",
        orgRule: "单校闭门很难撑起 50+ 高质重题（参考西北大学 ASB 0.1 仅 6 题 0% 采用）。立刻拉 5–15 家课题组做多校联盟 + 开源社区 PR 严筛（录用率压在 8% 以内）。",
        openRule: "采用「全开源底座 + 少量藏测/定期换血」：公开全部 Harbor 容器与测试框架换取生态复利，但留出隐藏评估集或按季度语义化缩容清洗（参考 TB 4.1 与 ALE v1.1）。",
        precedent: "Terminal-Bench 4.1 / TB-Science 0.1 / OSWorld 2.1",
        trap: "最大死穴是「论文一发就断更」和「为了凑创新只做 6–20 题」。缺统一中立 Harness 或题量低于 50 题，旗舰模型发布表根本不会引你的榜。"
      },
      lab: {
        label: "前沿大模型实验室",
        short: "大模型实验室",
        orgRule: "切忌只靠算法工程师拍脑袋编题：采用「核心评测组 + 20–100 位外包一线行业专家/合作实验室」阵型（参考 OpenAI × Ligo、Anthropic × Twist/Adaptyv）。",
        openRule: "采用「公私混合分层」：对外只放 5–10 道样题给社区调通接口，核心 80–150 题锁死门禁专供内部定标；最关键的一条——**正式考卷与 RL 训练集必须物理断绝，严禁混刷**。",
        precedent: "BioMysteryBench / BioBasicsBench / De novo binder",
        trap: "最大死穴是「把自家原生 Harness 红利当成模型权重进步」以及「训练期悄悄泄露测试特征」。必须在内部同步跑统一中立基线（如 Mini-SWE / proximus）剥离脚手架水分。"
      },
      biz: {
        label: "垂直产品 / 数据评测公司",
        short: "产品/数据公司",
        orgRule: "直接用业务一线脏工单、历史成交单或高仿内网克隆建护城河（参考 Zapier 47 SaaS、Cognition 维护者 40h+ 重构、Proximal 34 题 20h 工程）。",
        openRule: "「公开样集换信任 + 私有主榜握定价权 + 同源沙盒卖 RL 环境」。但要主动邀请第三方（如 Epoch AI / BLE / AA）做白盒方法论抽检，避免因纯黑盒被判“信息不足”。",
        precedent: "FrontierCode 2.0 / FrontierSWE v2 / AutomationBench / Chartography",
        trap: "最大死穴是「既卖后训练数据又当裁判引发公信力危机」以及「公开样集脚本偷工减料」（BLE 对 AutomationBench 公开集审出 71% 缺陷直接重创口碑）。"
      }
    },
    budgets: {
      low: {
        label: "轻量预算 (<$10K)",
        sizeRule: "死守 **50–80 题** 统计底线，别碰 20h 重 GPU 工程或真人买单；靠「单轮/短程高密真实样本 + 高频重复采样」取胜（如 Chartography 全轮 2,000 次仅 $60–$260）。",
        opsRule: "上线前强制把所有 Agent 交付产物落盘归档，把 Verifier 修补后的重评账单打成 **$0**（抄 TB 4.1 作业）；用开源社区 PR 分摊造题人力。",
        trap: "千万别拿这点预算去碰重型多软件虚拟机或百卡时 GPU 任务——你自己都复跑不起一轮全榜，最后只能拉 3 个模型测一次草草收场。"
      },
      mid: {
        label: "中坚预算 ($10K–$100K)",
        sizeRule: "瞄准工业界最甜的 **70–150 题黄金区**（30 分钟–4 小时真实容器或跨软件任务），配 20–50 位领域行家众包盲审，把录用率死卡在 5%–10%。",
        opsRule: "强制 **每题连跑 5 遍（mean@5 / Pass^5）** 挤干运气水分；单轮复测控制在中位数 $1K–$5K，拉 2–3 家大厂联合赞助首榜 API 账单（抄 TB 4.0 作业）。",
        trap: "最容易把钱全烧在“堆题量”上（凑 500 道半成品），结果高分段 30% 全是坏题。宁可花 60% 预算做五轮排雷、录真人通关轨迹和红队攻题，也只留 100 道钢板好题。"
      },
      high: {
        label: "重资本投入 (>$100K)",
        sizeRule: "可以直接打行业终极稀缺位：**30–100 道 8–24 小时极限开放工程**，或 **100–240 个真金白银买断的商业外包单 / 独立 CRO 湿实验闭环**。",
        opsRule: "必须设计「代理后端先筛 → 昂贵真测压轴」的分层账单结构（避免每改一次提示词就重跑一次十万美元全榜），并按季度淘汰饱和旧题、持续注入新题。",
        trap: "砸了 $15 万却没锁死容器安全，等于给作弊 AI 修豪华游乐场（参考 FrontierSWE 抓到 `chr()` 藏 `/tmp` 与 Modal root socket 越权）。重金项目必须配专职红队和事后 QA 日志审计。"
      }
    },
    verifiers: {
      code: {
        label: "代码 / 终端 / 数据库确定性状态",
        archRule: "直接复用 **Harbor 五件套 + 双容器物理切场 + `root 0700` 降权**。先写 Verifier 再写题面；所有数据库或代码库断言必须做成**双向红线**（查该改的改对 + 查不该删的零破坏）。",
        metricRule: "严禁只报单测通过率或步骤分——强制并列披露 **Strict 严格全通率** 与 **Partial 步骤分**，外加单题真实 Token 成本。",
        trap: "致命错觉是“不用 LLM 裁判就绝对客观”。BLE 在 AutomationBench 审出 71% 纯代码脚本缺陷、OpenAI 在 SWE-V 审出 59.4% 测试缺陷——**复杂业务下的确定性脚本必须走白盒审计 + 改写输入加盐**。"
      },
      hybrid: {
        label: "复杂商业交付 / 开放科研分析",
        archRule: "走 **「底层代码终态一票否决 + 上层细粒度写死清单（Rubric）」双层混合验收**；涉及汇报、设计、策略类交付物再加匿名盲评 Elo，把“账算对”和“写得好”物理拆开。",
        metricRule: "如果用 LLM 核对 Rubric，**绝不能让它自由主观打分**，只能逐条核对专家写死的二元检查点（且别迷信堆 9 个 LLM 评委投票——Kohli 证明等效仅约 2 票）。",
        trap: "致命错觉是“单靠平均 Rubric 分就能代表能交付”。AA-Briefcase 上平均分 66.1%，但 100% 完美交付只有 3%；RLI 90% 做对、漏一个源文件照样整单退货。"
      },
      phys: {
        label: "多模态真图 / 3D 物理 / 实体湿实验",
        archRule: "2D 静态识图必须**禁代码放大外挂 + 3 专家误差线 + 20 遍连跑**；3D 具身必须**强制切回连续真实物理时钟（Wall-Clock）** 并把 Agent 榜与 Policy 榜拆开；科学设计必须引入**独立第三方湿测/真机终裁**。",
        metricRule: "所有仿真与模拟分必须硬性并列标注“是否停表、是否用私有外挂、与真机/湿测的相关性（如 RoboColiseum Real2Sim r=0.9686）”。",
        trap: "致命错觉是“仿真 65% / 重折叠 85% = 现实可用”。拔掉仿真暂停键 First Exam 63% 题全员归零；蛋白设计寄到 CRO 湿测直接从 85.1% 跌到 22%–35%。"
      }
    }
  },

  // 9. COMPLETE VERIFIED PRIMARY SOURCES (Every citation in index.html & atlas.html has a real link!)
  references: [
    {
      cat: "01 · 综合总榜、独立审计机构与实验室官方披露",
      items: [
        { title: "Artificial Analysis Intelligence Index (v5.0.1)", url: "https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index" },
        { title: "Artificial Analysis Methodology & Versioning", url: "https://artificialanalysis.ai/methodology/intelligence-benchmarking" },
        { title: "Epoch AI Benchmarks Hub", url: "https://epoch.ai/benchmarks" },
        { title: "Epoch AI Benchmark Reviews (29 Audits Included List)", url: "https://epoch.ai/data/benchmark-reviews-documentation/included-benchmarks" },
        { title: "Epoch AI HLE 46% Flawed Audit Review", url: "https://epoch.ai/benchmarks/hle/review" },
        { title: "Benchmarks' Last Exam (BLE) · AutomationBench 71% White-Box Audit", url: "https://benchmarks-last-exam.com/blog/automationbench-review/" },
        { title: "BLE · AutomationBench-AA Dual-Metric Analysis", url: "https://benchmarks-last-exam.com/analysis/#automationbench-aa" },
        { title: "Anthropic SEC Form S-1/A-3 Filing", url: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026074338/anthropicpbc-sx1ax3.htm" },
        { title: "Anthropic Claude Fable & Mythos 5.2 Release & System Card", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" },
        { title: "Anthropic Institute · Recursive Self-Improvement (RSI) Report", url: "https://www.anthropic.com/institute/recursive-self-improvement" },
        { title: "OpenAI GPT-6.2 Astra & Sol Release", url: "https://openai.com/index/introducing-gpt-6-2-astra-sol/" },
        { title: "Google DeepMind · Introducing Gemini 4 Neon", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/" },
        { title: "Tencent Hy4 Technical Report & Evaluation", url: "https://hy.tencent.ai/research/hy4" }
      ]
    },
    {
      cat: "02 · 代码工程、终端沙盒与 Agentic RL 合流",
      items: [
        { title: "METR · Many SWE-bench-Passing PRs Would Not Be Merged (296 Patches Audit)", url: "https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/" },
        { title: "Cognition · FrontierCode 2.0", url: "https://cognition.com/frontiercode" },
        { title: "Proximal Labs · FrontierSWE v2 (20h Open-Ended Engineering)", url: "https://www.frontierswe.com/" },
        { title: "DeepSWE · Original Multi-Language SWE Benchmark", url: "https://deepswe.datacurve.ai/" },
        { title: "Terminal-Bench 4.1 Leaderboard & Changelog", url: "https://tbench.ai/" },
        { title: "Harbor Framework · Standardized Container & RL Harness", url: "https://harborframework.com/" },
        { title: "Terminal-Bench Technical Paper (arXiv:2601.11868)", url: "https://arxiv.org/abs/2601.11868" },
        { title: "Harbor-Index · Auditing 6,627 Tasks from 54 Benchmarks", url: "https://www.tbench.ai/news/harbor-index" },
        { title: "Harbor-Index GitHub Repository", url: "https://github.com/harbor-framework/harbor-index" },
        { title: "Agent Economics · FireFlash Open Agentic RL Recipe", url: "https://agenteconomics.org/posts/agentic-rl-recipe" },
        { title: "Rank et al. · PostTrainBench (arXiv:2603.08640)", url: "https://arxiv.org/abs/2603.08640" },
        { title: "PostTrainBench Official Website & Cheating Logs", url: "https://posttrainbench.com/" }
      ]
    },
    {
      cat: "03 · 科学研究、湿实验与活网检索基准",
      items: [
        { title: "FutureHouse · Auditing HLE Biology & Chemistry (29% Error Rate)", url: "https://www.futurehouse.org/research/hle-exam" },
        { title: "Anthropic · Evaluating Claude for Bioinformatics with BioMysteryBench", url: "https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench" },
        { title: "Vals AI · BioMysteryBench Cost & Accuracy Leaderboard", url: "https://www.vals.ai/benchmarks/biomysterybench" },
        { title: "Stanford & Laude · Terminal-Bench-Science 0.1", url: "https://terminal-bench-science.ai/" },
        { title: "Wen et al. (Northwestern) · Autonomous Science Bench 0.1 (arXiv:2610.18449)", url: "https://arxiv.org/abs/2610.18449" },
        { title: "TwinLab-Bench · 52-Task Multi-Round Virtual Lab (arXiv:2611.26248)", url: "https://arxiv.org/abs/2611.26248" },
        { title: "OpenAI × Ligo Biosciences · BioBasicsBench (Wet-Lab Troubleshooting)", url: "https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/" },
        { title: "UniPat AI · Science Prediction Universe (SPU) Blog", url: "https://unipat.ai/blog/SciencePredictionUniverse" },
        { title: "UniPat AI · SPU Paper (arXiv:2611.15049)", url: "https://arxiv.org/abs/2611.15049" },
        { title: "Perplexity AI · WANDR Live Web Research Benchmark", url: "https://github.com/perplexityai/wandr" }
      ]
    },
    {
      cat: "04 · 白领办公、真实外包、桌面 GUI 与三维物理世界",
      items: [
        { title: "Zapier · AutomationBench Official Page", url: "https://zapier.com/benchmarks" },
        { title: "Zapier · AutomationBench GitHub & Paper (arXiv:2604.18934)", url: "https://arxiv.org/abs/2604.18934" },
        { title: "UC Berkeley RDI · Agents' Last Exam v1.1 (55 O*NET Occupations)", url: "https://agents-last-exam.org/" },
        { title: "Scale AI × CAIS · Remote Labor Index (RLI) Portal", url: "https://www.remotelabor.ai/" },
        { title: "Scale AI · RLI Official Leaderboard", url: "https://scale.com/leaderboard/rli" },
        { title: "Surge AI · Chartography Blog", url: "https://surgehq.ai/blog/chartography" },
        { title: "Surge AI · Chartography Paper (arXiv:2608.10677, CC BY 4.0)", url: "https://arxiv.org/abs/2608.10677" },
        { title: "HKU XLang Lab · OSWorld 2.0 / 2.1 Official Site", url: "https://osworld-v2.xlang.ai/" },
        { title: "OSWorld 2.0 / 2.1 Trajectory Analysis Paper (arXiv:2606.29537)", url: "https://arxiv.org/abs/2606.29537" },
        { title: "RoboDojo Live Leaderboard & 11.14 Audit", url: "https://robodojo-benchmark.com/" },
        { title: "RoboDojo Paper (arXiv:2607.04434)", url: "https://arxiv.org/abs/2607.04434" },
        { title: "Independent RoboDojo Replication · An Unexpected Robot Policy (arXiv:2609.24170)", url: "https://arxiv.org/abs/2609.24170" },
        { title: "OpenRUA · Behind the RoboDojo Boom (Protocol Loophole Audit)", url: "https://openrua.ai/revisiting-rua" },
        { title: "RoboColosseum · Real2Sim & Hidden-Set Embodied Evaluation", url: "https://huggingface.co/RoboColosseum" },
        { title: "Northwestern Univ. · Embodied First Exam (arXiv:2611.12177)", url: "https://arxiv.org/abs/2611.12177" }
      ]
    },
    {
      cat: "05 · 评测科学理论、饱和度规律、裁判相关性与可靠性",
      items: [
        { title: "Shunyu Yao · The Second Half (2025.04)", url: "https://ysymyth.github.io/The-Second-Half/" },
        { title: "Akhtar et al. · When AI Benchmarks Plateau (ICML 2026, arXiv:2602.16763)", url: "https://arxiv.org/abs/2602.16763" },
        { title: "Nathan Lambert · Artificial Analysis v5 & the Benchmarkers", url: "https://www.interconnects.ai/p/artificial-analysis-v5-and-the-benchmarkers" },
        { title: "Kohli (Apple) · Nine Judges, Two Effective Votes (arXiv:2605.29800)", url: "https://arxiv.org/abs/2605.29800" },
        { title: "Ye et al. · Claw-Eval Multi-Channel Trace & Audit Evaluation (arXiv:2604.06132)", url: "https://arxiv.org/abs/2604.06132" },
        { title: "Singh et al. · The Leaderboard Illusion (arXiv:2504.20879)", url: "https://arxiv.org/abs/2504.20879" },
        { title: "Princeton HAL · Holistic Agent Leaderboard (arXiv:2510.11977)", url: "https://arxiv.org/abs/2510.11977" },
        { title: "Towards a Science of AI Agent Reliability (arXiv:2602.16666)", url: "https://arxiv.org/abs/2602.16666" },
        { title: "RLHF Book · Lecture 12: Evals", url: "https://rlhfbook.com/teach/course/lec12-chap16-evals/#1" },
        { title: "NeurIPS 2025 Evaluation Science Tutorial", url: "https://benchmarking.science/" }
      ]
    }
  ]
};
