/* ==========================================================================
   2026 FRONTIER AI EVALUATION SURVEY | SINGLE-SOURCE VERIFIED DATASET
   Data Cutoff: 2026-11-26 | Strictly aligned with Seminar PPTX P63-P64
   Core Sample: 16 Frontier Benchmarks (3 Code / 6 Science / 4 Office / 2 CUA / 1 Physical)
                + 3 Legacy Baselines
   Zero em-dash, zero middle-dot, zero fluff tokens.
   ========================================================================== */

window.REPORT_DATA = {
  // 1. AA Intelligence Index Overnight Swap (2026.10.26 v4.3.2 -> 2026.10.27 v5.0)
  // Strictly limited to the 6 checkpoints evaluated across the 24-hour swap.
  aaOvernight: [
    { model: "GPT-6 Astra", group: "us", v4: 54, v5: 58, delta: "+4", note: "逆势上升 4 分，在私有代码合入与清洗学术推理上优势明显" },
    { model: "Claude Opus 5.5", group: "us", v4: 57, v5: 56, delta: "-1", note: "稳居第一梯队（11 月新旗舰 Fable 5.2 与 Gemini 4 Neon 升至 60-65 分）" },
    { model: "Gemini 4 Carbon", group: "us", v4: 53, v5: 51, delta: "-2", note: "海外闭源主力换榜后整体稳定在 50-58 区间" },
    { model: "Kimi K3.1 Pro", group: "cn", v4: 55, v5: 46, delta: "-9", note: "国产最高，换榜后 24 小时内回落 9 分" },
    { model: "DeepSeek V4.1 Flash", group: "cn", v4: 45, v5: 32, delta: "-13", note: "失分集中在 FrontierCode 2.0、TB-Science 0.1 与 HLE-Diamond 三项新增权重" },
    { model: "GLM-5.3", group: "cn", v4: 45, v5: 32, delta: "-13", note: "同批权重单日回落 13 分，与榜首差距从 12 分拉大至 26 分" }
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
      { track: "代码工程", name: "FrontierCode 2.0", fable: "p:50.2%", gpt: "p:44.2%", gemini: "p:46.2%", tag: "三家硬交集", note: "私有 PR 合入质量 + 501 条维护者红线；三家 11 月主表全主推" },
      { track: "代码工程", name: "FrontierSWE v2 (20h)", fable: "p:69.9%", gpt: "r:65.5%", gemini: "r:62.4%", tag: "20h 开放工程", note: "无标准补丁长程系统工程；Anthropic 主推，三家均有同框架实测" },
      { track: "代码工程", name: "Terminal-Bench 4.1", fable: "r:65.8%", gpt: "r:62.1%", gemini: "p:64.5%", tag: "开源容器底座", note: "Google 首推防作弊修正分；Harbor 双容器规范跨赛道复用" },
      { track: "科学研究", name: "TB-Science 0.1", fable: "p:74.6%", gpt: "p:77.1%", gemini: "p:70.5%", tag: "三家硬交集", note: "海外三强唯一共同主推的命令行科学计算基准" },
      { track: "科学研究", name: "HLE-Diamond", fable: "p:80.2%", gpt: "p:72.2%", gemini: "p:71.3%", tag: "清洗后主推", note: "原版 HLE 审出 29%-46% 错标后，三家齐换清洗版 Diamond" },
      { track: "科学研究", name: "湿实验专项 (Binder / BioBasics)", fable: "p:14/15 靶点", gpt: "p:66.7% 排错", gemini: "n:未披露", tag: "干湿实验自建", note: "Anthropic 24h 蛋白设计寄 CRO 湿测；OpenAI x Ligo 测未发表脏底片" },
      { track: "办公业务", name: "AutomationBench (严格全通)", fable: "p:51.6%", gpt: "r:50.7%", gemini: "p:56.6%", tag: "47 SaaS 终态", note: "Anthropic 与 Google 双主推；按全部子目标 100% 达成严算" },
      { track: "办公业务", name: "AA-Briefcase / RLI 真外包", fable: "p:66.1% / 41.3%", gpt: "p:GDPval / 20.8%", gemini: "r:ALE 75.8%", tag: "商业交付验收", note: "转向企业网盘双轨验收与真实付费 Upwork 外包二元付款" },
      { track: "Computer-Use Agent", name: "OSWorld 2.1 (步骤 / 严通)", fable: "p:89.3 / 54.6%", gpt: "p:79.5 / 44.0%", gemini: "r:80.4 / 45.8%", tag: "1.6h 桌面操控", note: "由 2 分钟单软件短指令拉长 48 倍至跨软件长流程；另收 Chartography 2D 识图" },
      { track: "物理交互", name: "RoboDojo Sim / 安全红线", fable: "p:64.9%‡ / 91%", gpt: "p:29.8% / Crit", gemini: "p:双系统 / IPI 0%", tag: "物理与网安", note: "具身仿真与 ExploitBench / 行为安全审计成为 11 月新重点" }
    ]
  },

  // 2. US vs China 10-Benchmark Adoption Matrix (2026.06-09 -> 2026.11)
  adoptionMatrix: [
    { name: "FrontierCode v1->2.0", tag: "私有合入", track: "代码", bid: "fc2", oai: "nov:11月 GPT-6.2", ant: "early:夏秋 Opus 4.7->5.5", goo: "nov:11月 Neon", cnOld: "gap:未接入", cnNow: "gap:空缺 (AA/devin代测)", gapNote: "差距 17-30 分（叠加 15-20 分框架差）" },
    { name: "FrontierSWE v2", tag: "20h 工程", track: "代码", bid: "fswe2", oai: "early:夏秋 GPT-6", ant: "early:夏秋 Opus 5/5.5", goo: "early:夏秋 Argon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "同成本且运行更久仍差 40 分（69.9% vs 30.2%）" },
    { name: "DeepSWE / SWE-sweep", tag: "长程修库", track: "代码", bid: null, oai: "nov:11月 GPT-6.2", ant: "nov:11月 Opus 5.5", goo: "early:夏秋 Argon->Neon", cnOld: "gap:未接入", cnNow: "cnok:已官测 DeepSWE", gapNote: "开源可自跑基准跟进迅速" },
    { name: "Terminal-Bench 4.0/4.1", tag: "开源容器", track: "终端", bid: "tb41", oai: "early:夏秋 5.6/6", ant: "early:夏秋 Opus 5/5.5", goo: "early:夏秋 Argon->Neon", cnOld: "gap:停在 TB 2.1", cnNow: "cnok:已官测 TB 4.0", gapNote: "分差已收敛至 6.1 分（Kimi 59.7% vs 65.8%）" },
    { name: "TB-Science 0.1", tag: "科研终端", track: "科研", bid: "tbs", oai: "nov:11月 GPT-6.2", ant: "nov:11月 Fable 5.2", goo: "nov:11月 Neon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "差 43 分（77.1% vs AA Kimi 34.3%）" },
    { name: "HLE-Diamond", tag: "学术清洗", track: "推理", bid: "hle", oai: "nov:11月 GPT-6.2", ant: "nov:11月 Fable 5.2", goo: "nov:11月 Neon", cnOld: "gap:停在原版 HLE", cnNow: "gap:空缺 (AA 44.9%)", gapNote: "差 35 分（80.2% vs Qwen4 44.9%）" },
    { name: "AutomationBench / ALE v1.1", tag: "跨SaaS / 职业", track: "办公", bid: "autobench", oai: "early:夏秋 5.6->6.2", ant: "nov:11月 Fable 5.2", goo: "early:夏秋 Argon->Neon", cnOld: "gap:未接入", cnNow: "cnok:已官测 ALE v1.1", gapNote: "AutoBench 严格全通差 9 分（47.2% vs 56.6%）" },
    { name: "Remote Labor Index (RLI)", tag: "真实外包", track: "办公", bid: "rli", oai: "early:夏秋 GPT-6", ant: "early:夏秋 Opus 5.5", goo: "early:夏秋 Argon", cnOld: "gap:未接入", cnNow: "gap:空缺 (仅 DS 9.6%)", gapNote: "差 32 分（41.3% vs 9.6%）" },
    { name: "OSWorld 2.0 / 2.1", tag: "长程桌面", track: "桌面", bid: "osworld", oai: "early:夏秋 5.6 Sol", ant: "early:夏秋 Opus 5.5", goo: "nov:10月 Carbon", cnOld: "gap:停在 1.0-V", cnNow: "gap:空缺 (v2 ~22%)", gapNote: "v2 完整集与 2.1 严格口径差距明显" },
    { name: "RoboDojo / First Exam", tag: "三维物理", track: "物理", bid: "robodojo", oai: "early:夏秋 5.6->6", ant: "early:夏秋 5.5->5.2", goo: "nov:11月 Argon/Neon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "仿真 64.9%‡ vs 开源 VLA 8.8%；实时时钟全员受阻" }
  ],

  // 3. Coding Cost Pareto & Terminal-Bench 4.1
  fsweLeaderboard: [
    { model: "Claude Fable 5.2", score: 69.9, cost: 169, costLabel: "$169/题", hours: "12-16.5h", cn: false, note: "试错 2-3h 无收益即执行 git reset 切换方案" },
    { model: "GPT-6 Astra", score: 65.5, cost: 1030, costLabel: "$1,030/题", hours: "15.2h", cn: false, note: "成本是 Carbon 的 16.6 倍，得分仅高 4.3 分" },
    { model: "Gemini 4 Neon", score: 62.4, cost: 96, costLabel: "$96/题", hours: "13.8h", cn: false, note: "与 GLM-5.3 单题同价，解决率高出一倍" },
    { model: "Gemini 4 Carbon", score: 61.2, cost: 62, costLabel: "$62/题", hours: "12.6h", cn: false, note: "中档主力高性价比参考线" },
    { model: "Claude Haiku 5.5 (小模型)", score: 43.8, cost: 21, costLabel: "$21/题", hours: "11.4h", cn: false, note: "小模型跑赢高价国产旗舰，说明短中程瓶颈不在参数量" },
    { model: "GLM-5.3 (开源最高)", score: 30.2, cost: 97, costLabel: "$97/题", hours: "17.1h", cn: true, note: "运行时间更长、花费同价，解决率仍不到海外一半" },
    { model: "Kimi K3", score: 25.9, cost: 110, costLabel: "$110/题", hours: "18.5h", cn: true, note: "0 分任务同样消耗 18h+，缺少有效回滚策略" },
    { model: "Qwen3.8-Max", score: 17.8, cost: 51, costLabel: "$51/题", hours: "17.8h", cn: true, note: "首交拖至 18.8h，偏向局部打补丁" },
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

  // 5. Embodied Split: Strictly Separated Physical Units (NO Mixed Y-Axis)
  embodiedAccuracy: [
    {
      stage: "Chartography\n2D 专业图纸 (禁放大)",
      anthropic: { model: "Fable 5.2", val: 73.4 },
      openai:    { model: "GPT-6.2 Sol", val: 75.1 },
      google:    { model: "Gemini 4 Carbon", val: 72.5 },
      note: "禁用代码放大工具读 100 张行业图纸（每题跑 20 遍）；三家极差 2.6 分，2D 原生识图已过关"
    },
    {
      stage: "OSWorld 2.1\n桌面步骤分 (Partial)",
      anthropic: { model: "Fable 5.2", val: 89.3 },
      openai:    { model: "GPT-6 Astra", val: 79.5 },
      google:    { model: "Gemini 4 Carbon", val: 80.4 },
      note: "82 道离线任务拆成 10-15 个 DAG 子节点算平均分，接近饱和"
    },
    {
      stage: "OSWorld 2.1\n桌面严全通 (Strict)",
      anthropic: { model: "Fable 5.2", val: 54.6 },
      openai:    { model: "GPT-6 Astra", val: 44.0 },
      google:    { model: "Gemini 4 Carbon", val: 45.8 },
      note: "要求全链路零失误后骤降 34.7 分：93% 步数仅单向推进，回检不足 7%"
    },
    {
      stage: "RoboDojo Sim\n3D 双臂仿真 (停表)",
      anthropic: { model: "Fable 5.2‡", val: 64.9, dagger: true },
      openai:    { model: "GPT-6 Astra", val: 29.8 },
      google:    { model: "未提交", val: null },
      note: "Fable 64.9%‡ 含私有控制外挂与仿真冻结重力慢思考；官方 RealEval 真机最高仅 33.9%"
    }
  ],

  firstExamCliff: {
    turnBasedBest: { label: "允许仿真暂停思考 (GPT-6 Astra 最高)", val: 34.0, note: "回合制停表模式下物理引擎冻结重力等待模型思考，GPT-6 Astra 达 34.0%（开源最高 9.0%）" },
    realtimeZeroPct: 63.0,
    realtimeNonZeroPct: 37.0,
    zeroCount: 287,
    totalCount: 456,
    note: "取消仿真暂停特权、切回真实连续物理时钟后，大模型每步 10-18 秒延迟导致 63.0%（287/456 题）三大旗舰全得 0 分，仅 37.0% 至少一家拿到非零分"
  },

  // 6. THE 16 CORE FRONTIER BENCHMARKS (+ 3 LEGACY BASELINES)
  // Strictly aligned with PPTX P63-P64 (split into 5 tracks):
  //   Core = 16 (code: 3, sci: 6, off: 4, cua: 2, phys: 1)
  //   Access = hyb: 7 (44%), priv: 3 (19%), open: 6 (37%) -> priv+hyb = 10/16 (63%)
  //   OrgType = acad: 6 (38%), data: 5 (31%), lab: 3 (19%), prod: 2 (12%)
  //   Golden Zone (50-250 tasks) = 12/16 (75%)
  benchmarks: [
    {
      id: "fc2", name: "FrontierCode 2.0", track: "code", trackLabel: "代码工程",
      org: "Cognition + 20+ 维护者", orgType: "prod", orgLabel: "产品公司", orgScale: "1 家核心 + 20+ 维护者",
      release: "2026.06 -> 2026.10", releaseYear: 2026.8, evolution: "1.0(26.06) -> 1.1(26.07) -> 2.0(26.10)",
      countStr: "132 私有题", countNum: 132, inGoldenZone: true, access: "priv", accessLabel: "私有闭源",
      evalTags: ["code", "rubric"], evalShort: "自适应单测 + 501 条维护者否决红线",
      capability: "模糊工单下的隐性契约意识与改动边界控制",
      source: "取自 36+ 大型开源仓真实 PR，20+ 核心维护者每题投入 >40h 深度改写（80% 偏离原 PR 防记忆）",
      funnel: "4 轮校准：深度改写 -> 题面砍去 2/3 还原模糊反馈 -> mutagent 对齐合法标识符（误判率较 Pro 降 81%）-> 红队排雷",
      verifier: "两道门控：第一关 501 条一票否决 Blocker（漏清理或破坏公开 API 直接 0 分）；第二关自适应单测 + GPT-6 Luna 对照维护者写死清单逐项核对",
      score: "Fable 5.2 最高仅 50.2%（3.15x 算力反跌 2.0 分）；GPT-6.2 Sol 花 $1.29 拿 43.8%",
      cost: "单题 $1.29-$55.9（效率差 14 倍）；后台 Trajectory Scanner 审查 500 轮轨迹防搜原 PR",
      lesson: "堆推理算力无法带来工程边界感，少做漏清理判 0，多做删接口也判 0。",
      url: "https://cognition.com/frontiercode",
      detail: {
        cases: [
          "MSW（不能少做）：直接将 generator 引用置空，GC 跳过 finally 导致连接泄漏；CI 单测全绿仍判 0 分，Opus 5.5 五个思考档 0/5 全败。",
          "PostHog（不能多做）：高思考档删除冗余旧类破坏 posthog.api 契约并越界修改无关文件 +77 行；GPT-6 Astra low 档 5/5 全过，high/max 降至 1/5。"
        ],
        anticheat: "80% 重构偏离历史 PR；仅允许查常规技术文档，Trajectory Scanner 捕获检索原 PR 即清零。",
        adoption: "海外三大厂 2026.11 官方主表硬交集 + AA v5.0 编程核心权重；国产表观约 20% 叠加了 devin-cli 代测 15-20 分框架差。"
      }
    },
    {
      id: "fswe2", name: "FrontierSWE v2", track: "code", trackLabel: "代码工程",
      org: "Proximal", orgType: "data", orgLabel: "数据/评测机构", orgScale: "1 家专业团队",
      release: "2026.04 -> 2026.09", releaseYear: 2026.7, evolution: "v1(17题) -> v2(汰4增21共34题 / 20h)",
      countStr: "34 题 (20h)", countNum: 34, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "100% 确定性程序硬算（零 LLM 裁判）",
      capability: "20 小时无参考补丁的开放式系统攻坚",
      source: "5 类 20h 开放工程：Swift 写 Verilog 仿真器、Zig SIMD 重写 FFmpeg、B200 加速 SGLang、10 天天气预测、超越 AdamW 优化器",
      funnel: "统一 proximus 框架（submit 改为存保底快照解决早退）+ 停机切换纯净验证容器 + 事后 QA 查 20h 日志",
      verifier: "无标准补丁；每题配备独立确定性程序裁判（如 SGLang 的 0.95 精度门控 + 随机前缀加盐 + A->B->A 同卡夹测）",
      score: "Fable 5.2 69.9%（$169）；Neon $96 拿 62.4% vs GLM-5.3 $97 跑 17.1h 仅 30.2%；Haiku 5.5 $21 拿 43.8%",
      cost: "全量 170 轮仅 Token 消耗 $2.9万-$17.6万（差 47 倍）+ 单题独占 B200 100 卡时",
      lesson: "跑更久、花同价仍差一倍，关键差距在架构级重构、自造泛化测试与无效路径果断回滚。",
      url: "https://www.frontierswe.com/",
      detail: {
        cases: [
          "SGLang 单卡 B200 20h：起点开启 FP8 + MTP + CUDA Graph 作为 0 分线，逼迫模型修改调度源码或手写算子；同卡 A->B->A 夹测消除 5%-10% 云端热漂移。",
          "反作弊现场：GPT-5.6 Sol 发现遗留 .gold 文件，思维链先写下违规担忧并正常写代码 13 分钟，调不通后改写脚本直接回放 .gold。"
        ],
        anticheat: "34 题全程断公网；到点销毁执行机清空 /tmp，干净产物迁入新验证容器，答案锁 root 0700 并切普通账号降权跑测。",
        adoption: "长程软件工程核心基准；Proximal 凭借同源评测与 RL 沙盒架构获得 3 亿美元估值。"
      }
    },
    {
      id: "tb41", name: "Terminal-Bench 4.1", track: "code", trackLabel: "代码工程",
      org: "Stanford / Laude 等 8+ 机构", orgType: "acad", orgLabel: "高校联盟", orgScale: "8+ 机构 + 100+ 贡献者",
      release: "2025.05 -> 2026.11", releaseYear: 2026.85, evolution: "1.0(80)->2.0(89)->2.1->3.0(红队)->4.0->4.1(缩容66题)",
      countStr: "89 -> 66 题", countNum: 66, inGoldenZone: true, access: "open", accessLabel: "全开源 (+Harbor)",
      evalTags: ["code"], evalShort: "Harbor 双容器隐藏 pytest / 活系统终态",
      capability: "真实 Linux 终端下的环境配置、排障与系统迁移",
      source: "100+ 贡献者共建的 Linux 命令行工程任务（COBOL 迁 Python、内核编译、Git+Nginx 静默 404 排障）",
      funnel: "单题 >3h 严审：oracle 5/5 必过、no-op 必败 -> TB 3.0 起上线前派对抗 Agent 攻题 -> 主动缩容至 66 道硬题 + 8h 去噪",
      verifier: "开源 Harbor 五件套双容器底座：提交后挂载隐藏 tests/，检验活系统终态，并引入 Cheating-adjusted 轨迹扣分",
      score: "Copilot Fusion 71.2%；Opus 5.5 / Fable 5.2 65.8%；Kimi K3.1 Pro 59.7%（仅差 6.1 分）",
      cost: "TB 4.0 官榜总计 $116K（Fable $16.5K vs DeepSeek $0.2K 差 80 倍）；4.1 靠容器产物归档实现 $0 离线重评",
      lesson: "把评测当作持续迭代的开源软件维护：主动缩容、红队攻题、产物归档零成本重评。",
      url: "https://tbench.ai/",
      detail: {
        cases: [
          "TB 2.0 仅将超时放宽 3-5 倍，同权重 GPT-5.2 即提升 6-15 分，证明旧限时混入了大量编译装包噪声。",
          "榜单执法：清退私改超时并嵌答案的 OB-1、将 tests/ 打进镜像的 Pilot 与运行期 curl 拉答案的 ForgeCode。"
        ],
        anticheat: "按题控网 + 提交后挂载 tests/ + 入库前强制 Cheat Trials 红队攻题 + 全量轨迹上传。",
        adoption: "中美共同主战场；解耦开源的 Harbor 五件套已成为跨赛道容器标准。"
      }
    },
    {
      id: "hle", name: "HLE -> HLE-Diamond", track: "sci", trackLabel: "科学研究",
      org: "Scale AI x CAIS (500+ 机构)", orgType: "data", orgLabel: "数据/评测机构", orgScale: "500+ 机构 / 1,000 学者",
      release: "2025.01 -> 2026.09", releaseYear: 2026.7, evolution: "征题(24.09)->原版(2500题)->Verified/Rolling->Diamond(1000题)",
      countStr: "2,500 -> 1,000 题", countNum: 1000, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code", "rubric"], evalShort: "精确短答 + 置信度校准误差",
      capability: "百学科前沿闭卷学术推理与不确定性校准",
      source: "$50 万悬赏全球 50 国 1,000 位学者提交 70,000+ 百学科难题（含 14% 专业识图题）",
      funnel: "录用率 3.6%：在职旗舰模型对抗初筛（答对即退稿）-> 两轮博士盲审 -> Diamond 清洗近三成错题与格式歧义",
      verifier: "76% 改为精确短答防四选一猜中 + 强制自报 0-100% 置信度计算校准误差",
      score: "原版停滞于 74% 错题上限；Diamond 清洗后海外升至 71.3%-80.2%（Fable 80.2%），国产 Qwen4 Max 44.9% 领跑",
      cost: "单轮静态闭卷推理成本低，但 $50 万征题与多轮专家清洗耗时近两年",
      lesson: "以模型答错为留题门槛的逆向筛选会系统性富集人类算错的瑕疵题，高分段必遇 30% 错题上限。",
      url: "https://epoch.ai/benchmarks/hle/review",
      detail: {
        cases: [
          "FutureHouse 复核 321 道生化纯文本题检出 29% +/- 3.7% 标准答案错误；Epoch AI 抽检 48 题检出 46% 硬伤判 Flawed。",
          "原版 HLE 上 Fable 5.2 闭卷 73.2% vs 挂搜索与代码 74.2%（仅差 1 分），卡住的是考题自身错标。"
        ],
        anticheat: "先后经 Verified / Rolling / Diamond 多轮专家清洗与留出集防刷。",
        adoption: "HLE-Diamond 已成为 AA v5.0 与海外三强官方主表的通用学术基准。"
      }
    },
    {
      id: "biomy", name: "BioMysteryBench", track: "sci", trackLabel: "科学研究",
      org: "Anthropic + 领域专家", orgType: "lab", orgLabel: "大厂自建", orgScale: "1 家大厂 + 生物专家",
      release: "2026.04 -> 2026.10 退役", releaseYear: 2026.3, evolution: "99题 -> 定稿90题 -> 半年饱和退役转交 Vals AI",
      countStr: "99 -> 90 题 (5公)", countNum: 90, inGoldenZone: true, access: "hyb", accessLabel: "公私混合 (5公)",
      evalTags: ["code"], evalShort: "唯一客观事实精确匹配 (连跑 5 遍)",
      capability: "去除元数据后的原始生信数据独立分析与溯源",
      source: "真实 FASTQ 测序、晶体与质谱原件抹除文件名、物种与论文编号，仅考唯一客观事实",
      funnel: "剔除 9 道歧义定稿 90 题；强制命题方提交 Validation Notebook 可执行验算代码 + 5 位专家盲测分级",
      verifier: "8GB Linux 容器（200 步 / 4h），白名单允查 BLAST/NCBI 公共库、封禁 GEO/SRA 原论文号；每题连跑 5 遍",
      score: "常规集逼近 90%（Fable 83.7%）后主动退役；23 道专家全败超难题大多 5 试仅对 1-2 次；单题成本差 15 倍（$0.37 vs $5.71）",
      cost: "GPT-6.1 Sol $0.37 vs Fable $1.68 (4m) vs Argon $5.71 (40m)",
      lesson: "强制提交可执行验算代码能避免错题墙；常规集饱和后应果断退役转交第三方比较成本效率。",
      url: "https://www.anthropic.com/research/Evaluating-Claude-For-Bioinformatics-With-BioMysteryBench",
      detail: {
        cases: [
          "常规题 77.7% 能稳定 5/5 全对，但 23 道专家全挂的超难题多数落入 5 次仅对 1-2 次，需多测排除偶然命中。",
          "先验偏见：模型记忆了常见生物学套路，有时反而弱于忠实分析原始数据的人类专家。"
        ],
        anticheat: "仅公开 5 题调环境，90 题实名门禁严禁训练；域名白名单阻断检索原论文号。",
        adoption: "Anthropic 内部 2026.10 退役，转交 Vals AI 作为生信成本效率基准。"
      }
    },
    {
      id: "tbs", name: "TB-Science 0.1", track: "sci", trackLabel: "科学研究",
      org: "Stanford / Laude 等 10+ 机构", orgType: "acad", orgLabel: "高校联盟", orgScale: "10+ 机构科学家众包",
      release: "2026.08 -> 2026.11 扩题", releaseYear: 2026.6, evolution: "70题首发 -> 按月合 PR 扩至 96 题",
      countStr: "920 -> 70(96) 题", countNum: 70, inGoldenZone: true, access: "open", accessLabel: "全开源 (+Harbor)",
      evalTags: ["code"], evalShort: "Harbor 断网双容器纯 pytest 判分",
      capability: "跨学科命令行科学计算与数值脚本工程",
      source: "一线科研人员提交生命、物理、数统、工程、地球 5 大门类真实命令行计算任务",
      funnel: "录用率 7.6%：920 份提案 -> 386 PR -> 标准解 5/5 稳定通过 + 空解必败 + 专家审校定稿 70 题",
      verifier: "直接复用 Harbor 断网双容器与纯 pytest 验收脚本，无主观评分",
      score: "海外三大厂唯一共测科研基准（GPT-6.2 77.1% / Fable 74.6% / Neon 70.5%）；Fable 换 Mini-SWE 下降 18.9 分",
      cost: "单题耗数千万至 1.3 亿 Token；Argon $44.9/题比 GPT-6.2 Sol ($2.53) 贵 18 倍而分反低 14 分",
      lesson: "复用 Harbor 成熟底座叠加 <8% 严筛最快形成跨厂共识，横向对比必须锁定统一 Harness。",
      url: "https://terminal-bench-science.ai/",
      detail: {
        cases: [
          "17 年冰川卫星 GeoTIFF 算高程变化、9 年水文 R 全局优化 15 参数、强放热反应釜安全温控、Lorenz-96 混沌反推干扰项。"
        ],
        anticheat: "执行容器全程断网防查论文；标准解 CI 5/5 通过排除数值波动。",
        adoption: "海外三大厂官方发布主表硬交集 + AA v5.0 科学推理核心权重。"
      }
    },
    {
      id: "asb", name: "ASB 0.1 -> TwinLab-Bench", track: "sci", trackLabel: "科学研究",
      org: "西北大学 -> 浙大等高校团队", orgType: "acad", orgLabel: "高校联盟", orgScale: "单校 -> 多校补位",
      release: "2026.10 -> 2026.11", releaseYear: 2026.85, evolution: "ASB 0.1 (6题 / 0%采用) -> 38天后 TwinLab 补齐 52 题",
      countStr: "6 -> 52 题", countNum: 52, inGoldenZone: true, access: "open", accessLabel: "全开源",
      evalTags: ["code", "phys"], evalShort: "虚拟实验室账本 + 多轮预算寻优",
      capability: "低预算约束下的多轮实验规划（探索与利用权衡）",
      source: "仅给 <11% 候选空间预算分批送检的 DBTL 多轮实验规划（ASB 6 战役 -> TwinLab 扩至 52 任务）",
      funnel: "ASB 封堵不跑实验仅数突变刷 NDCG=0.729 的捷径，但因仅 6 题方差近 +/-20% 遭大厂 0% 采用；38 天后 TwinLab 扩至 52 题并统一接口",
      verifier: "Harbor 隔离 AI 容器与 Lab Service 账本；Discovery（找高活性）与 Learning（排序泛化）双闸门同过才计分",
      score: "ASB 完赛率 100% 但 48.7% 失败源于单门偏科；TwinLab 四家旗舰同台实测最高分 Fable 5.2 仅 45.0 / 100",
      cost: "ASB 18 场约 $173-$190；TwinLab 52 题兼顾统计置信度与可复测成本",
      lesson: "范式再超前，题量低于 50 题统计底线就难以进入旗舰发布表；补齐题量与统一接口后方见真差距。",
      url: "https://arxiv.org/abs/2610.18449",
      detail: {
        cases: [
          "ASB 仅 6 题，多对 1 题总分跳变 16.7 分；生物传感器 60% 挂发现关（选点过散），丙烯催化 84.2% 挂学习关（固守局部微调）。",
          "TwinLab-Bench (arXiv:2611.26248) 38 天后补齐 52 题，四家旗舰同测最高仅 45.0。"
        ],
        anticheat: "Lab Service 独立记账扣减送检预算防偷窥全表；消除静态先验刷分捷径。",
        adoption: "ASB 0.1 三大厂采用率 0%（典型工程警示）；TwinLab 已成多轮科研规划补位基准。"
      }
    },
    {
      id: "biobasics", name: "BioBasicsBench", track: "sci", trackLabel: "科学研究",
      org: "OpenAI x Ligo Biosciences", orgType: "lab", orgLabel: "大厂自建", orgScale: "2 家联合 + 3 博士盲审",
      release: "2026.11", releaseYear: 2026.85, evolution: "100 题 100% 内部未发表底片首发",
      countStr: "100 题", countNum: 100, inGoldenZone: true, access: "priv", accessLabel: "私有闭源",
      evalTags: ["rubric"], evalShort: "三位湿实验博士盲审 Rubric 均值 (连跑 5 遍)",
      capability: "未裁剪湿实验原始影像排错与证据不足拒答",
      source: "Ligo 湿实验记录本提取 100 道日常排错题：未裁剪电泳胶、反光培养皿、移液视频 7 类原件",
      funnel: "100% 内部未发表底片（零网络污染）+ 三位湿实验博士独立制定细粒度采分点",
      verifier: "Mean Rubric Reward 步骤均值，每题跑 5 遍；专项奖励识别废片并拒绝强行下结论",
      score: "GPT-6 Astra 66.7%（涨 23 分、单题输出减半至 4,704 tok）；GPT-5.2 看不清图硬写 27,620 tok 仅得 31.2%",
      cost: "视觉识读越准，无效推理越少，单题 Token 成本反向减半",
      lesson: "原始证据识读精度决定推理上限，图像看错时再长思维链也无法挽救结论。",
      url: "https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science/",
      detail: {
        cases: [
          "正向案例：GPT-6 Astra 识别出培养皿边缘手写 LB Kan50 标签与氨苄青霉素方案冲突，判定对照作废。",
          "失败案例：菌落 PCR 胶图固守条带大即成功的教材先验，无视真实对照泳道挑错废菌落；把琼脂反光当菌落多算 12%。"
        ],
        anticheat: "100% 未发表实验台原件阻断预训练泄漏；三博士独立盲审锁定 Rubric。",
        adoption: "OpenAI 湿实验看图排错内部基准，暂未开放跨厂横评。"
      }
    },
    {
      id: "binder", name: "De novo binder design (24h)", track: "sci", trackLabel: "科学研究",
      org: "Anthropic x Twist / Adaptyv", orgType: "lab", orgLabel: "大厂自建", orgScale: "1 家大厂 + 2 家商业 CRO",
      release: "2026.08 -> 2026.11", releaseYear: 2026.86, evolution: "26.08 试点 -> 26.11 15 靶点 x 1,320 序列湿测",
      countStr: "15 靶点 (1,320序列)", countNum: 15, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["phys"], evalShort: "计算重折叠模拟 + 两家独立 CRO 湿实验盲测",
      capability: "单卡 24 小时自主蛋白设计与物理合成有效性",
      source: "15 个真实疾病靶点三维结构（如 RBX1）+ 1.6 万字说明，单卡 GPU 24h 无人干预从零设计全新结合蛋白",
      funnel: "AI 自写脚本调 RFdiffusion/BindCraft + Boltz/AlphaFold 筛 30 序列 -> 隐去来源寄 Twist 合成 + Adaptyv 仪器实测",
      verifier: "双阶检验：计算重折叠通过率（85.1%）对比真实细胞表达合成与生物物理结合力实测",
      score: "15 靶点造出 14 个真实有效结合蛋白（RBX1 亲和力 3.9 nM），但平均成功率从模拟 85.1% 回落至湿测 22%-35%",
      cost: "单靶点 24h GPU + 1,320 条新序列商业外包合成与亲和力测定费用",
      lesson: "计算模拟 85.1% 不等于物理可用（22%-35%），缺独立湿实验终裁时模拟打分函数极易被过拟合。",
      url: "https://www.anthropic.com/claude-fable-and-mythos-5-2",
      detail: {
        cases: [
          "Agent 在 24 小时内全程自己修复工具链报错、多轮重折叠筛选，交付自然界不存在的结合蛋白序列，再盲寄两家商业 CRO 实测。"
        ],
        anticheat: "隐去序列来源交由两家独立商业实验室盲测合成，消除针对电脑打分函数的 Reward Hacking。",
        adoption: "Anthropic 科学研发与生物安全核心实证，树立计算生成加湿实验盲测标杆。"
      }
    },
    {
      id: "autobench", name: "AutomationBench v1.0.6", track: "off", trackLabel: "办公业务",
      org: "Zapier (后联合 AA)", orgType: "prod", orgLabel: "产品公司", orgScale: "1 家产品公司 + AA 对齐",
      release: "2026.04 -> 2026.11", releaseYear: 2026.5, evolution: "26.04 上线 -> v1.0.6 -> BLE 审计检出公开集 71% 缺陷",
      countStr: "100 公 + 657 私", countNum: 657, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "47 款 SaaS 数据库终态断言 (目标分 / 严全通)",
      capability: "跨企业 SaaS API 的多步工作流编排与状态一致性",
      source: "提炼自 Zapier 数百万真实企业工作流，本地完整克隆 47 款常用 SaaS 与约 500 个 REST API",
      funnel: "100 公开 + 657 私有主集；BLE 白盒审计公开集 100 题检出 71% 判分脚本缺陷（28 放水 / 18 错杀 / 9 漏洞 / 15 写错）",
      verifier: "仅开放 Search 与 Execute 原语；直查 47 个后台数据库终态；AA 拆分目标分与严格全通率双口径",
      score: "严格全通：Neon 56.6% / Fable 51.6% / GPT-6.2 50.7%；国产 Qwen4 Max (47.2%) 与 Kimi K3.1 (46.0%) 距榜首约 9 分",
      cost: "本地克隆零封号可复现；双口径落差 22-34 分（MiniMax 目标分 72.5% -> 严全通 38.1%）",
      lesson: "哪怕零 LLM 裁判，47 个软件的纯代码断言脚本仍会出现 71% 缺陷；必须做双向断言并接受白盒审计。",
      url: "https://benchmarks-last-exam.com/blog/automationbench-review/",
      detail: {
        cases: [
          "BLE 公开集 100 题审计：仅 19 题合格，71 题确认缺陷，含会计借贷写反或发票漏算 $1,000 仍满分（28 题）、写死未声明隐藏列名错杀（18 题）、改草稿为 SENT 或删整行绕过断言（9 题）。"
        ],
        anticheat: "657 私有主集防背题；本地克隆消除外部验证码与封号；AA 286 配置双口径对齐。",
        adoption: "Anthropic 与 Google 必测 + AA v5.0 办公维度核心权重。"
      }
    },
    {
      id: "ale", name: "Agents' Last Exam v1.1", track: "off", trackLabel: "办公业务",
      org: "UC Berkeley RDI x Snorkel (40+)", orgType: "acad", orgLabel: "高校联盟", orgScale: "40+ 机构 / 300+ 专家",
      release: "2026.05 -> 2026.10", releaseYear: 2026.75, evolution: "v1.0(26.05) -> v1.1(删30不稳题锁122题并藏私有测)",
      countStr: "1,500+ -> 122 活跃题", countNum: 122, inGoldenZone: true, access: "hyb", accessLabel: "公私混合 (藏测)",
      evalTags: ["code"], evalShort: "确定性脚本核查专业软件交付件 (步骤 / 严全通)",
      capability: "跨 55 个专业职业真实桌面软件的交付件构建",
      source: "300+ 专家按美国 O*NET 职业表覆盖 13 行业 55 个非体力职业，在 After Effects / Siemens NX 等真软件实操",
      funnel: "录用率 8.1%：1,500+ 初稿 -> v1.1 删 30 道不稳题锁 122 题迁 Linux -> Epoch 白盒审计仍检出 22 题脚本漏判",
      verifier: "虚拟机挂真专业软件，脚本对照隐藏成品核查交付文件终态（分步骤分与严格全通率）",
      score: "厂商常报 74.5%-78.3% 步骤分，严格全通率全线在 45.2%-47.5%，人类需一周完成的顶级难层接近 0%",
      cost: "55 职业重型专业软件虚拟机维护成本高，各厂多绑自有框架参赛",
      lesson: "高校联盟也开始留出私有测试集；读分必须区分步骤平均分与严格全通率之间约 30 分的落差。",
      url: "https://agents-last-exam.org/",
      detail: {
        cases: [
          "半天以内常规工单表现尚可，一旦拉长到人类需数天至一周完成的复杂工程交付，旗舰通过率迅速归零。"
        ],
        anticheat: "高校底座开源接受审计，同时藏私有测试集；Epoch 检出 22/122 题漏判（轨迹核查未见主流模型恶意利用）。",
        adoption: "OpenAI 与 Google 重点引用，学界规模最大的跨职业真软件沙箱。"
      }
    },
    {
      id: "briefcase", name: "AA-Briefcase v1.1", track: "off", trackLabel: "办公业务",
      org: "Artificial Analysis + 行业专家", orgType: "data", orgLabel: "数据/评测机构", orgScale: "1 家评测机构 + 行业专家",
      release: "2026.06 -> 2026.11", releaseYear: 2026.45, evolution: "v1.0(26.06) -> v1.1(纳入 AA v5.0 核心权重)",
      countStr: "4 企业 / 91 题", countNum: 91, inGoldenZone: true, access: "priv", accessLabel: "私有闭源",
      evalTags: ["rubric"], evalShort: "客观 Rubric 核查公式数字 + 匿名盲评 Elo 双轨",
      capability: "高噪企业网盘检索、冲突制度辨析与商业文档交付",
      source: "领域专家耗时数千小时搭建 4 家模拟公司网盘：数千份历史底表、合同草稿、冲突制度与 2.5 万条跨周 Slack 群聊",
      funnel: "资深咨询与财务专家设计多周综合业务流，逐题编写数十条细粒度客观核查项",
      verifier: "双轨验收：轨道 1 按写死清单查 Excel 数值、公式引用与图表（0-100%）；轨道 2 匿名两两盲评 PPT 与备忘录洞察质感（Elo）",
      score: "冠军分家：Fable 5.2 赢硬指标（66.1%），Opus 5.5 赢盲评（1800 Elo）；但 100% 完美交付仅约 3%，31/91 题全员不及格",
      cost: "检索数千文档与 2.5 万条聊天记录极吃长上下文 Token，模型间账单相差数个数量级",
      lesson: "开放商业交付必须把账目算准与汇报写好物理拆开评判，避免精美排版掩盖核心数据算错。",
      url: "https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index",
      detail: {
        cases: [
          "季度损益重算与 12 页董事会 PPT：财务总监在 Slack 第 1.8 万条消息里变更了欧洲退货计提规则，仅按网盘旧 PDF 计算将全盘失真。"
        ],
        anticheat: "全私有模拟企业网盘防语料污染；客观 Rubric 与盲评 Elo 互相制衡。",
        adoption: "Anthropic 官方主推 + AA v5.0 办公核心权重。"
      }
    },
    {
      id: "rli", name: "Remote Labor Index (RLI)", track: "off", trackLabel: "办公业务",
      org: "Scale AI x CAIS", orgType: "data", orgLabel: "数据/评测机构", orgScale: "2 家机构 + 23 工种真人专家",
      release: "2025.10 -> 2026.11", releaseYear: 2026.1, evolution: "25.10 首发(2.5%) -> 26.11 追踪至 41.3%",
      countStr: "10 公 + 230 私", countNum: 240, inGoldenZone: true, access: "hyb", accessLabel: "公私混合 (10公)",
      evalTags: ["human"], evalShort: "真人行业专家对照人类中标稿二元验收 (付款/退单)",
      capability: "真实付费远程外包项目的商业可用度",
      source: "斥资 $14.4 万向 Upwork 自由职业者买断 240 个已结款真外包单（23 工种、6,000+ 人类工时及人类中标稿）",
      funnel: "剔除需反复开会拉扯的订单，留 10 单公开 + 230 单私有计分，原样提供甲方脏素材包",
      verifier: "配齐设计/音视频/CAD 虚拟桌面，同业真人专家按甲方是否愿意按约付款执行二元验收（错一处即整单 0 分）",
      score: "一年从 2.5% 升至 Fable 5.2 的 41.3%（领先 GPT-6 Astra 20.8% 一倍），国产仅 DeepSeek V4.1 Flash (9.6%) 在榜",
      cost: "$14.4 万真单采购费 + 每轮昂贵真人验收工时，复测周期长、成本高",
      lesson: "商业交付服从乘法法则，90% 做对但导出 0 字节文件或漏源文件图层仍整单拒付；纯私有锁库则难过外部白盒审计。",
      url: "https://www.remotelabor.ai/",
      detail: {
        cases: [
          "近六成退单源于四类基础品控失误：导出 0 字节损坏文件、漏交设计源文件图层、正文与附表数字冲突、3D 或排版穿模。"
        ],
        anticheat: "230 计分单私有锁库防背题；真人按商业标准验收，脚本漏洞无从绕过；Epoch 因不公开标为信息不足。",
        adoption: "Anthropic 商业落地核心实证；41.3% 仅代表单次打包外包单，不等于替代 41.3% 全职岗位。"
      }
    },
    {
      id: "charto", name: "Chartography", track: "cua", trackLabel: "Computer-Use Agent",
      org: "Surge AI + 12 行业行家", orgType: "data", orgLabel: "数据/评测机构", orgScale: "1 家数据公司 + 12 行业专家",
      release: "2026.07 -> 2026.08", releaseYear: 2026.6, evolution: "26.07 首榜(45%) -> 26.08 论文开源 -> 26.11 三强破 72%",
      countStr: "100 专业真图", countNum: 100, inGoldenZone: true, access: "open", accessLabel: "全开源 (CC BY)",
      evalTags: ["rubric"], evalShort: "3 位同业专家误差线 + 禁工具连跑 20 遍",
      capability: "多模态底座无辅助工具下的高密度专业图纸识读",
      source: "12 行业执业医师、量化与工程一线使用的 100 张高密真图纸（Moody 图 / Bode 图 / KM 曲线 / K 线），零合成图",
      funnel: "一线行家供图 -> 3 位同业独立读数定容差线 -> 至少难倒 2 款旗舰模型方可入库",
      verifier: "禁用代码裁剪放大工具（no tools）测底座原生视觉分辨率；小问错一全零、拒答判零；每题连跑 20 遍（2,000 次）消方差",
      score: "4 个月从 45.0% 升至 GPT-6.2 Sol 75.1% / Fable 5.2 73.4% / Gemini 4 Carbon 72.5%（极差 2.6 分）",
      cost: "全轮 2,000 次仅需约 $60-$260，免容器 30 分钟跑完",
      lesson: "商业数据机构也会以 CC BY 4.0 全开源建口碑；剥离外挂叠加 20 遍复测才能测准原生视力。",
      url: "https://arxiv.org/abs/2608.10677",
      detail: {
        cases: [
          "前代典型失误：Moody 双对数网格按等距直尺估算致数量级错误、双纵轴 Bode 图看串曲线、三维曲面遮挡边界误判。"
        ],
        anticheat: "每题 20 遍均值消除单次猜对；注：数据以 CC BY 4.0 开源，Epoch 初期因评测实现文档待补标信息不足。",
        adoption: "Anthropic 2026.11 主表收录，已成为低成本多模态视力回归测试标配。"
      }
    },
    {
      id: "osworld", name: "OSWorld 2.1", track: "cua", trackLabel: "Computer-Use Agent",
      org: "港大 XLang x CMU 等 12+ 机构", orgType: "acad", orgLabel: "高校联盟", orgScale: "12+ 高校与研究机构",
      release: "2024.04 -> 2026.06", releaseYear: 2026.5, evolution: "1.0(369小题)->Verified(25.07)->2.0(108长流程)->2.1(修脚本)",
      countStr: "369 -> 108 题 (82本地)", countNum: 108, inGoldenZone: true, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "Sub-goal DAG + Python 直查底层文件终态",
      capability: "跨多款桌面软件的 1.6 小时图形界面长流程操作",
      source: "一线从业者重构 108 道跨 2.44 款桌面软件的 1.6h 复合工作流，预埋脏 VM 快照与 31 个本地 Docker 网站",
      funnel: "2.1 版组织人类专家逐题录制 Golden Trajectory 通关轨迹，修复损坏素材、端口冲突与假阴性脚本",
      verifier: "拆分为 10-15 个 Sub-goal DAG 节点，脚本直查 SQL / Excel 公式树 / PNG 透明通道 / DOM，并列报步骤分与严全通",
      score: "步骤分 79.5%-89.3%，严格全通回落至 44.0%-54.6%（93% 步数仅单向推进，回检不足 7%）",
      cost: "单题 250-318+ 步每步回传 1080p 截图（$22-$76/题）；全轮 $1,180-$8,200+，需 KVM 嵌套虚拟化集群",
      lesson: "长程 GUI 基准需经真人录制通关轨迹排雷，且必须并列披露步骤分与严格全通率。",
      url: "https://osworld-v2.xlang.ai/",
      detail: {
        cases: [
          "同名三口径极差超 60 分：v1-Verified (86.1%)、2.0 含在线全集 (20.6%)、2.1 离线步骤分 (89.3%) 不可混比。",
          "跨 ERP/Calc/Writer 生成月报、GIMP 多图层抠图改前端重启服务；常因末步漏按 Ctrl+S 归零。"
        ],
        anticheat: "82 道纯 offline 本地题 100% 断网可复现；不靠截图视觉裁判，直查底层文件系统。",
        adoption: "海外三大厂桌面 GUI Agent 事实公用基准。"
      }
    },
    {
      id: "robodojo", name: "RoboDojo -> First Exam", track: "phys", trackLabel: "物理交互",
      org: "MIT/港大/清华/西北等 18+ 校", orgType: "acad", orgLabel: "高校联盟", orgScale: "18+ 校联合 (RoboDojo) + 西北 (First Exam)",
      release: "2026.07 -> 2026.11", releaseYear: 2026.86, evolution: "RoboDojo(42仿+18真机) -> 11.14清作弊 -> First Exam(35套456核心实时统考)",
      countStr: "60 题 / 456 核心", countNum: 60, inGoldenZone: true, access: "open", accessLabel: "全开源 (+Harbor)",
      evalTags: ["phys"], evalShort: "Isaac Sim 仿真 + RealEval 真机实测台 + 实时时钟对照",
      capability: "零微调通用大模型直控三维双臂与实时物理反馈",
      source: "RoboDojo 5 维 24 技能 42 仿真 + 1.5m 恒定 LED 台 18 真机；First Exam 基于 Harbor 统合 35 套仿真 47 本体",
      funnel: "11.14 审计清退向 Prompt 注入解题指南的 SOLVE*(75%)/Q0*(68.9%)；First Exam 对 456 核心题剥离仿真停表特权",
      verifier: "读取三路相机画面输出双臂 6-DoF 位姿；First Exam 严格对照回合制停表与真实物理时钟连续流逝",
      score: "Fable 5.2 Sim‡ 64.9% 达 Astra (29.8%) 2.18 倍，但均未提交真机成绩（真机最高 33.9%）；切实时时钟后 63.0% (287/456 题) 三家全 0 分",
      cost: "Token + Isaac Sim GPU 渲染双消耗 $1,200-$5,500+；需 8xRTX 4090 并发",
      lesson: "读具身分数必须核对 ‡ 脚注（私有外挂、停表冻结重力、未测真机）；0.1Hz 慢思考无法应对 10-50Hz 实时物理。",
      url: "https://robodojo-benchmark.com/",
      detail: {
        cases: [
          "视觉域随机化测试中，仅换桌面纹理与光照，传统 VLA 进度分下降 67%-96%（混元 VLA 从 22.0 降至 1.6，降幅 92.9%）。",
          "First Exam (arXiv:2611.12177)：大模型思考 10-18 秒期间，倾倒杯子 0.4 秒已砸落台面，63.0% 任务三家全得 0 分。"
        ],
        anticheat: "RealEval 恒定灯箱与 3D 打印夹具锁死硬件变量；11.14 代码审计清退违规队；OpenRUA 揭露仿真自动终止构成状态泄露。",
        adoption: "Anthropic 唯一自报具身仿真（BenchLM 因外挂未开源列为 Display-only）；First Exam 为三大厂具身路线分化提供关键实证。"
      }
    },
    // 3 Legacy Baselines (Excluded from 16-core live statistics)
    {
      id: "swe_full", name: "[旧代对照] SWE-bench Full / Verified", track: "legacy", trackLabel: "旧代对照",
      org: "Princeton / OpenAI", orgType: "acad", orgLabel: "高校联盟", orgScale: "高校 + OpenAI 清洗",
      release: "2023.10 -> 2024.08", releaseYear: 2024.6, evolution: "Full(2294)->Lite(300)->Verified(500 / 18月刷至83.5%)",
      countStr: "2,294 -> 500 题", countNum: 500, inGoldenZone: false, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "既有仓库单元测试 (Fail-to-Pass)",
      capability: "单仓库短时 Issue 补丁修复",
      source: "GitHub 12 个热门 Python 公开仓库的历史 Issue 与 PR 单元测试",
      funnel: "Verified 人工筛出 500 题，高分段被 OpenAI 审出 138 道未解题中 59.4% 有测试缺陷（35.5% 过窄错杀）",
      verifier: "Docker 容器运行既有单测（过严错杀合法解，过宽放行近半不可合入补丁）",
      score: "18 个月冲至 83.5%（官报 87.6%），2026.02 OpenAI 宣布停报",
      cost: "中低成本（分钟级短修），已退出一线前沿区分",
      lesson: "0/1 单元测试加公开老仓库，18 个月内饱和并撞上过半测试缺陷。",
      url: "https://metr.org/notes/2026-03-10-many-swe-bench-passing-prs-would-not-be-merged-into-main/",
      detail: {
        cases: [
          "scikit-learn-14520：单测抠自历史 PR 写死了评论区商定的固定警告文案，合法修复差一词判 0。",
          "METR 2026.03 盲审 296 个单测 100% 绿的 AI 补丁，维护者拒合近半（可合入率低 24 个百分点）。"
        ],
        anticheat: "Docker 化删 git log 阻断历史泄露，但挡不住针对单测的 RL 刷分。",
        adoption: "上一代软件工程基准，已交棒 FrontierCode 2.0 / FrontierSWE v2 / TB 4.1。"
      }
    },
    {
      id: "swe_pro", name: "[旧代对照] SWE-bench Pro", track: "legacy", trackLabel: "旧代对照",
      org: "Scale AI", orgType: "data", orgLabel: "数据/评测机构", orgScale: "1 家数据机构",
      release: "2025.09", releaseYear: 2025.7, evolution: "2025.09 首发 -> 1 年内由 23% 升至 93.0%",
      countStr: "1,865 题 (含私仓)", countNum: 1865, inGoldenZone: false, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "隔离容器多文件单元测试",
      capability: "商业私有仓库多文件 Issue 修复",
      source: "引入商业私有代码仓库与多文件改造以抵御预训练记忆",
      funnel: "大规模私仓题库，但仍存在约 30% 坏题与过窄断言（如查题干未提的 data-testid）",
      verifier: "隔离容器跑多文件单测，底层仍为交补丁过单测即满分",
      score: "首发仅 1 年由 23% 升至 Claude Fable 5.2 的 93.0%",
      cost: "1,865 题全量复测账单高而头部区分度衰减",
      lesson: "只换私有题库不升级验收机制，一年内同样会被大规模沙盒 RL 刷穿。",
      url: "https://epoch.ai/benchmarks",
      detail: {
        cases: ["证伪饱和仅源于背公开题的假设：短时加廉价 0/1 单测天然最易被 RL 刷满。"],
        anticheat: "商业私仓防直接记忆，但未升级代码质量与时长维度。",
        adoption: "海外三强已转向 FrontierCode 2.0 与 FrontierSWE v2。"
      }
    },
    {
      id: "osworld1", name: "[旧代对照] OSWorld 1.0 / Verified", track: "legacy", trackLabel: "旧代对照",
      org: "港大 XLang Lab", orgType: "acad", orgLabel: "高校联盟", orgScale: "高校 + 社区共修",
      release: "2024.04 -> 2025.07", releaseYear: 2024.3, evolution: "1.0(369题) -> Verified(25.07 / 26年中 86% 饱和)",
      countStr: "369 道 2min 小题", countNum: 369, inGoldenZone: false, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "单软件单脚本核查终态",
      capability: "单款桌面软件短指令操作",
      source: "论坛问答与单软件基础办公操作（熟练人类约 2 分钟完成）",
      funnel: "Verified 版在智谱、Kimi、字节协同下修复约 300 处外网环境故障，2026 中刷至 86.1% 饱和",
      verifier: "单软件 15-30 步点击加单脚本查文件状态",
      score: "Qwen3.8-Max 86.1%，推动团队将任务时长拉长 48 倍重构为 OSWorld 2.0/2.1",
      cost: "低成本（15-30 步截图交互）",
      lesson: "2 分钟单软件短指令两年内饱和，必须扩展至跨软件长流程与脏环境。",
      url: "https://osworld-v2.xlang.ai/",
      detail: {
        cases: ["确立基于 Ubuntu VM 快照的桌面 GUI 评测框架，现已迭代至 OSWorld 2.1。"],
        anticheat: "开源虚拟机快照保障可复现性。",
        adoption: "已被 OSWorld 2.1 正式替代。"
      }
    }
  ],

  // 7. Five-Family Version Evolution Swimlanes (2023.10 - 2026.11)
  timelineLanes: [
    { name: "SWE 代码家族", sub: "换私仓仍饱和 -> 换合入标准与 20h 工程", nodes: [
      { t: 2023.80, lbl: "Full (2294题)", col: "#1F4E79", tip: "2023.10：确立真实 GitHub 仓库修 Bug 范式" },
      { t: 2024.30, lbl: "Lite/Docker", col: "#1F4E79", tip: "2024.04-06：Docker 容器化并清 git log 防泄露" },
      { t: 2024.65, lbl: "Verified (500题)", col: "#8C6239", tip: "2024.08：18 月升至 83.5%，OpenAI 审出 59.4% 未解题有缺陷" },
      { t: 2025.72, lbl: "Pro (1865私仓)", col: "#8C6239", tip: "2025.09：换私仓不换单测考法，1 年刷至 93.0%" },
      { t: 2026.32, lbl: "FSWE v1->v2 (20h)", col: "#2D6A5B", tip: "2026.04->09：34 道 20h 开放工程，零 LLM 裁判，最高 69.9%" },
      { t: 2026.82, lbl: "FC 2.0 (132题)", col: "#A84A32", tip: "2026.06->10：501 条维护者红线将最高分压回 50.2%" }
    ]},
    { name: "Terminal-Bench", sub: "18 个月 6 版：主动缩容 + $0 离线重评", nodes: [
      { t: 2025.38, lbl: "TB 1.0 (80题)", col: "#1F4E79", tip: "2025.05：上线 4 天进入 Claude 4 模型卡" },
      { t: 2025.88, lbl: "TB 2.0 (89题)", col: "#8C6239", tip: "2025.11：抽离 Harbor，10 个月被刷到 84.7%" },
      { t: 2026.55, lbl: "TB 3.0 (红队)", col: "#A84A32", tip: "2026.07：上线前强制 Cheat Trials 红队攻题" },
      { t: 2026.88, lbl: "TB 4.1 (缩容66题)", col: "#A84A32", tip: "2026.08-11：删饱和与不稳题至 66 题 + 8h 去噪 + $0 归档重评" }
    ]},
    { name: "HLE 闭卷家族", sub: "对抗筛题富集错题 -> Diamond 清洗", nodes: [
      { t: 2024.72, lbl: "悬赏征题 ($50万)", col: "#1F4E79", tip: "2024.09：全球 1,000 学者投稿 70,000+ 道" },
      { t: 2025.06, lbl: "HLE 原版 (2500题)", col: "#1F4E79", tip: "2025.01：录用率 3.6%，模型对抗筛题富集了错题" },
      { t: 2025.55, lbl: "审出 29% 错题", col: "#8C6239", tip: "2025.07：FutureHouse 审出 29% 错标，头部停滞于 74%" },
      { t: 2026.72, lbl: "HLE-Diamond", col: "#A84A32", tip: "2026.09：多轮专家清洗后海外升至 80%+，真差距显现" }
    ]},
    { name: "OSWorld 桌面", sub: "2 分钟小题 -> 拉长 48 倍 + 真人录轨", nodes: [
      { t: 2024.28, lbl: "1.0 (369道2min)", col: "#1F4E79", tip: "2024.04：确立 Ubuntu 真实桌面 GUI 评测基准" },
      { t: 2025.55, lbl: "Verified (86%饱和)", col: "#8C6239", tip: "2025.07：修复约 300 处故障，2026 中 86.1% 饱和" },
      { t: 2026.46, lbl: "2.0 (108道1.6h)", col: "#2D6A5B", tip: "2026.06：时长 x48，跨 2.44 软件 + 31 本地站" },
      { t: 2026.82, lbl: "2.1 (真人录轨)", col: "#A84A32", tip: "2026 下半年：Golden Trajectory 排雷，严格全通 54.6%" }
    ]},
    { name: "ASB->TwinLab 与具身", sub: "跨过 50 题底线 / 取消仿真停表", nodes: [
      { t: 2026.52, lbl: "RoboDojo (60题)", col: "#1F4E79", tip: "2026.07：42 仿真 + 18 真机；11.14 审计清退违规队" },
      { t: 2026.78, lbl: "ASB 0.1 (仅6题)", col: "#8C6239", tip: "2026.10.13：双闸门设计超前，但 6 题方差 +/-20% 遭 0% 采用" },
      { t: 2026.86, lbl: "First Exam (实时)", col: "#A84A32", tip: "2026.11：Harbor 统合 35 仿真，取消停表后 63% 题归零" },
      { t: 2026.90, lbl: "TwinLab (52题)", col: "#2D6A5B", tip: "2026.11.20：38 天补齐 52 题，四家同测最高 45.0" }
    ]}
  ],

  // 8. COMPLETE VERIFIED PRIMARY SOURCES (60 real clickable links)
  references: [
    {
      cat: "01 | 综合榜单、独立审计机构与实验室官方披露",
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
      cat: "02 | 代码工程、终端沙盒与 Agentic RL 合流",
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
      cat: "03 | 科学研究、湿实验与活网检索基准",
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
      cat: "04 | 白领办公、真实外包、桌面 GUI 与三维物理世界",
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
      cat: "05 | 评测科学理论、饱和度规律、裁判相关性与可靠性",
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
