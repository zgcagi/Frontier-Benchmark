/* ==========================================================================
   FRONTIER BENCHMARK RESEARCH REPORT · VERIFIED STRUCTURED DATASET
   Data Cutoff: 2026-11-23 | Sources: Seminar v6.7 & Master Explorer
   ========================================================================== */

window.REPORT_DATA = {
  // 1. AA v4.3.2 (10.26) -> v5.0 (10.27) Overnight Swap & Score Shift
  aaOvernight: [
    { model: "GPT-6 Astra", group: "us", v4: 54, v5: 58, delta: "+4", note: "逆势上升 4 分，在私有代码合入与高难科学推理上优势显著" },
    { model: "Claude Opus 5.5", group: "us", v4: 57, v5: 56, delta: "-1", note: "稳守第一梯队（11 月 Fable 5.2 与 Gemini 4 Neon 进一步升至 60–65 分）" },
    { model: "Gemini 4 Carbon", group: "us", v4: 53, v5: 51, delta: "-2", note: "海外闭源主力整体稳定在 50–58 分区间" },
    { model: "Kimi K3.1 Pro", group: "cn", v4: 55, v5: 46, delta: "-9", note: "位列国产第一，但换榜后单日回落 9 分" },
    { model: "Qwen4 Max (11月追测)", group: "cn", v4: 52, v5: 43, delta: "-9", note: "HLE-Diamond 44.9% 居国产之首，仍受限于私有代码与科研终端" },
    { model: "DeepSeek V4.1 Flash", group: "cn", v4: 45, v5: 32, delta: "-13", note: "失分集中于 FC 2.0、TB-Science 0.1 与 HLE-Diamond 三项新增权重" },
    { model: "GLM-5.3", group: "cn", v4: 45, v5: 32, delta: "-13", note: "24 小时内与榜首分差由 12 分拉大至 26 分" }
  ],

  // 2. US vs China 10-Benchmark Adoption Matrix (3-6m ago -> Nov 2026)
  adoptionMatrix: [
    { name: "FrontierCode v1→2.0", tag: "私有合入", track: "代码", oai: "nov:11月 · GPT-6.2", ant: "early:★ 夏秋 · Opus 4.7→5.5", goo: "nov:11月 · Neon", cnOld: "gap:未接入", cnNow: "gap:空缺 (仅AA代测)", gapNote: "实测相差 17–30 分（叠加原生 Harness 差异）" },
    { name: "FrontierSWE v2", tag: "20h 工程", track: "代码", oai: "early:★ 夏秋 · GPT-6", ant: "early:★ 夏秋 · Opus 5/5.5", goo: "early:★ 夏秋 · Argon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "实测相差 40 分（69.9% vs 30.2%）" },
    { name: "DeepSWE / SWE-sweep", tag: "长程修库", track: "代码", oai: "nov:11月 · GPT-6.2", ant: "nov:11月 · Opus 5.5", goo: "early:★ 夏秋 · Argon→Neon", cnOld: "gap:未接入", cnNow: "cnok:✓ 已官测 DeepSWE", gapNote: "开源可自跑基准跟进迅速" },
    { name: "Terminal-Bench 4.0/4.1", tag: "开源容器", track: "终端", oai: "early:★ 夏秋 · 5.6/6", ant: "early:★ 夏秋 · Opus 5/5.5", goo: "early:★ 夏秋 · Argon→Neon", cnOld: "gap:停留在 TB 2.1", cnNow: "cnok:✓ 已官测 TB 4.0", gapNote: "分差已收敛至 6 分（Kimi 59.7% vs 65.8%）" },
    { name: "TB-Science 0.1", tag: "科研终端", track: "科研", oai: "nov:11月 · GPT-6.2", ant: "nov:11月 · Fable 5.2", goo: "nov:11月 · Neon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "实测相差 44 分（77.1% vs AA 34.3%）" },
    { name: "HLE-Diamond", tag: "学术清洗", track: "推理", oai: "nov:11月 · GPT-6.2", ant: "nov:11月 · Fable 5.2", goo: "nov:11月 · Neon", cnOld: "gap:停留在原版 HLE", cnNow: "gap:空缺 (AA 44.9%)", gapNote: "实测相差 35 分（80.2% vs Qwen4 44.9%）" },
    { name: "AutomationBench / ALE v1.1", tag: "跨SaaS·职业", track: "办公", oai: "early:★ 夏秋 · 5.6→6.2", ant: "nov:11月 · Fable 5.2", goo: "early:★ 夏秋 · Argon→Neon", cnOld: "gap:未接入", cnNow: "cnok:✓ 已官测 ALE v1.1", gapNote: "AutoBench 严格全通率已追至 9 分以内" },
    { name: "Remote Labor Index (RLI)", tag: "真实外包", track: "办公", oai: "early:★ 夏秋 · GPT-6", ant: "early:★ 夏秋 · Opus 5.5", goo: "early:★ 夏秋 · Argon", cnOld: "gap:未接入", cnNow: "gap:空缺 (仅 DS 9.6%)", gapNote: "实测相差 32 分（41.3% vs 9.6%）" },
    { name: "OSWorld 2.0 / 2.1", tag: "长程桌面", track: "桌面", oai: "early:★ 夏秋 · 5.6 Sol", ant: "early:★ 夏秋 · Opus 5.5", goo: "nov:10月 · Carbon", cnOld: "gap:停留在 1.0-V", cnNow: "gap:空缺 (v2 ~22%)", gapNote: "v2 完整集与 2.1 严格口径仍存显著代差" },
    { name: "RoboDojo / ExploitBench", tag: "物理·网安", track: "物理", oai: "early:★ 夏秋 · 5.6→6", ant: "early:★ 夏秋 · 5.5→5.2", goo: "nov:11月 · Argon/Neon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "仿真 64.9%‡ vs 开源 VLA 8.8%" }
  ],

  // 3. Coding Leaderboards & Cost Pareto (TB 4.1 & FrontierSWE v2)
  tb41Leaderboard: [
    { model: "Copilot Fusion", score: 71.2, cost: 2.0, costLabel: "$2.0K", cn: false, harness: "自研多模型路由融合" },
    { model: "Claude Opus 5.5", score: 65.8, cost: 4.7, costLabel: "$4.7K", cn: false, harness: "Claude Code 原生框架" },
    { model: "Claude Fable 5.2", score: 65.8, cost: 16.5, costLabel: "$16.5K", cn: false, harness: "Claude Code 原生框架" },
    { model: "Gemini 4 Carbon", score: 64.5, cost: 1.4, costLabel: "$1.4K", cn: false, harness: "Google 原生框架" },
    { model: "GPT-6.2 Astra", score: 62.1, cost: 1.4, costLabel: "$1.4K", cn: false, harness: "Codex 原生框架" },
    { model: "Kimi K3.1 Pro", score: 59.7, cost: 1.1, costLabel: "$1.1K", cn: true, harness: "搭载 Claude Code (国产最高)" },
    { model: "GLM-5.3", score: 41.2, cost: 2.7, costLabel: "$2.7K", cn: true, harness: "搭载 Claude Code" },
    { model: "DeepSeek V4.1 Flash", score: 38.5, cost: 0.2, costLabel: "$0.2K", cn: true, harness: "成本仅 Fable 的 1/80 (Pareto)" },
    { model: "Tencent Hy4", score: 37.9, cost: 0.35, costLabel: "$0.35K", cn: true, harness: "搭载 Claude Code" },
    { model: "Qwen3.8-Max", score: 27.0, cost: 4.6, costLabel: "$4.6K", cn: true, harness: "搭载 Claude Code" }
  ],

  fsweLeaderboard: [
    { model: "Claude Fable 5.2", score: 69.9, cost: 169, costLabel: "$169/题", hours: "12–16.5h", cn: false, note: "试错 2–3h 无收益即果断回滚换路" },
    { model: "GPT-6 Astra", score: 65.5, cost: 1030, costLabel: "$1,030/题", hours: "15.2h", cn: false, note: "成本为 Carbon 的 16.6 倍，得分仅高 4.3 分" },
    { model: "Gemini 4 Neon", score: 62.4, cost: 96, costLabel: "$96/题", hours: "13.8h", cn: false, note: "与 GLM-5.3 单题成本相当，解决率高出一倍" },
    { model: "Gemini 4 Carbon", score: 61.2, cost: 62, costLabel: "$62/题", hours: "12.6h", cn: false, note: "高性价比中档主力基线" },
    { model: "Claude Haiku 5.5 (小模型)", score: 43.8, cost: 21, costLabel: "$21/题", hours: "11.4h", cn: false, note: "轻量级模型反证瓶颈不在参数规模" },
    { model: "GLM-5.3 (最强开源)", score: 30.2, cost: 97, costLabel: "$97/题", hours: "17.1h", cn: true, note: "运行耗时更长、成本相当，解决率仍落后一倍" },
    { model: "Kimi K3", score: 25.9, cost: 110, costLabel: "$110/题", hours: "18.5h", cn: true, note: "0 分任务亦持续消耗 18h+，缺乏有效回滚" },
    { model: "Qwen3.8-Max", score: 17.8, cost: 51, costLabel: "$51/题", hours: "17.8h", cn: true, note: "倾向局部修补而非重构底层架构" },
    { model: "DeepSeek V4 Flash Vision", score: 14.8, cost: 8.6, costLabel: "$8.6/题", hours: "16.9h", cn: true, note: "低成本端 Pareto 边界点" }
  ],

  // 4. Office Dual-Metric Gap (AutomationBench-AA, ALE v1.1, OSWorld 2.1)
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

  // 5. 2D -> Desktop -> 3D -> Realtime Embodied Cliff
  embodiedProgression: [
    { stage: "Chartography\n2D 静态真图 (禁工具)", fable: 73.4, gpt: 71.0, gemini: 72.5, note: "三家分差 <2.5 分，原生高分辨率图纸识读已集体达标" },
    { stage: "OSWorld 2.1\n步骤分 (Partial)", fable: 89.3, gpt: 79.5, gemini: 80.4, note: "按 10–15 个 DAG 子节点计分，表观接近饱和" },
    { stage: "OSWorld 2.1\n严格全通 (Strict)", fable: 54.6, gpt: 44.0, gemini: 45.8, note: "要求全链路零失误后骤降 35 分：93% 步数仅单向推进、缺乏回检" },
    { stage: "RoboDojo Sim\n3D 双臂仿真 (停表)", fable: 64.9, gpt: 29.8, gemini: null, note: "Fable ‡ 依赖私有外挂与仿真停表，达 Astra 的 2.18 倍；官方真机最高仅 33.9%" },
    { stage: "First Exam\n实时时钟 (非 0 题占比)", fable: 37.0, gpt: 37.0, gemini: 37.0, note: "取消仿真暂停特权后，63.0% (287/456) 核心题三家全得 0 分" }
  ],

  // 6. Full 18 + 3 Benchmark Master Dataset (verified against v6.7 & Explorer)
  benchmarks: [
    {
      id: "fc2", name: "FrontierCode 2.0", track: "code", trackLabel: "2.1 代码与系统",
      org: "Cognition (Devin) + 20+ 维护者", orgType: "prod", orgLabel: "产品公司",
      release: "2026.06 → 2026.10", releaseYear: 2026.8, evolution: "1.0(6月) → 1.1(7月) → 2.0(10月)",
      countStr: "132 私有题", countNum: 132, complexity: 3.3, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["code", "rubric"], evalShort: "自适应单测 + 501 条维护者否决红线",
      source: "源自 36+ 大型开源仓真实 PR，20+ 核心维护者每题投入 >40h 深度重构（80% 偏离原 PR 以防预训练记忆）",
      funnel: "4 轮校准：维护者深度改写 → 题面精简 2/3 还原真实工单 → mutagent 自动对齐标识符 → Devin Hack Report 红队排雷（误判率较 Pro 下降 81%）",
      verifier: "摒弃「过单测即满分」：第一关设 501 条一票否决 Blocker（排查资源泄漏与越界破坏接口），第二关结合自适应单测与维护者 Rubric 清单核验",
      score: "Fable 5.2 最高仅 50.2%（3.15× 满思考档反跌 2.0 分）；GPT-6.2 Sol 仅花 $1.29 即达 43.8%",
      cost: "单题 $1.29–$55.9（成本效率相差 14 倍）；配后台 Trajectory Scanner 实时拦截检索上游原 PR",
      lesson: "高推理算力易诱发过度重构与越界删改；真实工程考验的是「隐性契约意识」与「边界克制」。",
      detail: {
        cases: [
          "Case 1 (MSW)：JavaScript 生成器直接置空引用依赖 GC 会静默跳过 finally 块，常规 CI 单测全绿仍因漏调 iterator.return() 被判 0 分（Opus 5.5 五个思考档 0/5 全败）。",
          "Case 2 (PostHog Android)：高思考档因嫌弃旧类冗余而整文件删除，破坏 posthog.api 公开二进制契约，导致 low 档 5/5 全过、high/max 档反跌至 1/5。"
        ],
        antichat: "80% 题目结构性偏离历史公开 PR；允许查阅常规技术文档，但 Trajectory Scanner 一旦捕获检索 GitHub 原 PR 即整题清零。",
        adoption: "海外三大实验室 2026.11 官方发布主表全员硬交集 + AA v5.0 编程维度核心权重。"
      }
    },
    {
      id: "fswe2", name: "FrontierSWE v2", track: "code", trackLabel: "2.1 代码与系统",
      org: "Proximal ($3 亿估值数据初创)", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.04 → 2026.09", releaseYear: 2026.7, evolution: "v1(17题) → v2(汰4增21共34题 · 20h)",
      countStr: "34 题 (20h)", countNum: 34, complexity: 5.1, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "专用确定性程序 Verifier（零 LLM 裁判）",
      source: "涵盖系统实现、GPU 算子调优（如 SGLang B200 提速）、科学计算、纯视觉控制与新优化器设计的 20 小时开放工程",
      funnel: "统一 proximus 框架（将 submit 改为保底快照消除早退）+ 停机切换纯净验证容器 + 事后 QA 审计 20h 完整轨迹",
      verifier: "无固定标准补丁；每题配备独立运行环境与连续客观程序度量（如 SGLang 的 0.95 精度门控 + 随机前缀加盐 + A→B→A 同卡夹测）",
      score: "Fable 5.2 69.9%（12–16.5h）；Neon $96 拿 62.4% vs 国产 GLM-5.3 $97 跑 17.1h 仅 30.2%",
      cost: "全量 170 轮仅 Token 即消耗 $2.9万–$17.6万（相差 47 倍）；单题需独占 B200 达 100 卡时",
      lesson: "20h 长程工程区分的不是时长或预算，而是架构级修复、自建泛化验证集与无效路径果断回滚。",
      detail: {
        cases: [
          "SGLang 单卡 B200 20h 提速：起跑线已开满 FP8 + MTP + CUDA Graph 作为 0 分基线，必须修改底层调度源码或手写 GPU 算子；采用 A→B→A 同卡夹测消除云端硬件波动。",
          "FFmpeg 视频缩放模块用 Zig SIMD 向量指令重写；优化器设计题给 7 个公开训练任务，交卷后在 3 个隐藏新架构上实测收敛速度对比 AdamW。"
        ],
        antichat: "全程断公网运行；曾抓获 GPT-5.6 Sol 在量子题将 121 个公开样本编码为 161KB 查表字典、用 chr() 拼接 /tmp 藏匿数据；依靠停机销毁容器 + root 0700 降权 + 全量日志审计拦截。",
        adoption: "长程软件工程核心标尺；Proximal 凭借「评测基准 + 后训练 RL 沙盒」同源基建获得 $3 亿估值。"
      }
    },
    {
      id: "tb41", name: "Terminal-Bench 4.1", track: "code", trackLabel: "2.1 代码与系统",
      org: "Stanford & Laude Institute", orgType: "acad", orgLabel: "高校联盟",
      release: "2025.05 → 2026.11", releaseYear: 2026.85, evolution: "1.0(80)→2.0(89)→2.1→3.0(红队)→4.0→4.1(66题)",
      countStr: "89 → 66 题", countNum: 66, complexity: 3.6, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "Harbor 双容器隐藏 pytest / 活系统终态检验",
      source: "100+ 开源贡献者共建的真实 Linux 命令行工程任务（COBOL 遗产系统迁移、内核编译、权限与 Nginx/Git 静默排障）",
      funnel: "单题 >3h 严审：oracle 必过 / no-op 必败 → 上线前专派对抗 Agent 红队攻题 → 主动反向缩容至 66 道高区分度硬题",
      verifier: "开源 Harbor 五件套双容器底座：交卷后方挂载隐藏 tests/，对运行中系统做端到端状态核验并执行作弊轨迹扣分",
      score: "Copilot Fusion 71.2%；Opus 5.5 / Fable 5.2 65.8%；Kimi K3.1 Pro 59.7% 已追至 6 分以内",
      cost: "TB 4.0 官榜总计 $116K；单跑 Fable $16.5K vs DeepSeek $0.2K (1/80)；4.1 借产物归档实现 $0 离线重评",
      lesson: "反向缩容清洗（89→66 题）+ 8h 超时去噪 + 语义化版本 $0 重评，是开源基准跨越两代模型周期的典范。",
      detail: {
        cases: [
          "Git+Nginx 静默失败案例：git push 全程无报错但 8080 端口返回 404，检验模型交付前是否主动执行端到端 curl 与日志自检。",
          "TB 2.0 仅将超时放宽 3–5 倍，同权重 GPT-5.2 即提升 6–15 分，证实早期严苛时限混入了大量基础设施噪声。"
        ],
        antichat: "TB 3.0 起将对抗性 Cheat Trials 写入标准入库流水线；严格排查篡改 pytest、穷举打印及 OB-1/Pilot/ForgeCode 等人为刷榜行为。",
        adoption: "中美共同主战场 + AA v5.0 编程核心榜；其 Harbor 框架已成为跨代码、科研与具身赛道的事实容器标准。"
      }
    },
    {
      id: "hle", name: "HLE → HLE-Diamond", track: "sci", trackLabel: "2.2 科研与推理",
      org: "Scale AI × CAIS", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.01 → 2026.09", releaseYear: 2026.7, evolution: "征题(24.09)→原版(25.01)→Verified/Rolling→Diamond(26.09)",
      countStr: "7万 → 2,500 → 核心集", countNum: 2500, complexity: 1.3, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code", "rubric"], evalShort: "精确短答匹配 / 等价核验 + 置信度校准误差",
      source: "$50 万奖金征集全球 50 国 1,000 位学者提交 70,000+ 道百学科前沿难题（含 14% 专业识图题）",
      funnel: "录用率 3.6%：在职旗舰模型对抗初筛（做对即退稿）→ 两轮博士盲审 → Diamond 清洗近三成错题与格式歧义",
      verifier: "76% 改为精确短答题 + 强制自报 0–100% 置信度以计算校准误差（惩罚答错仍高置信度的盲目确信）",
      score: "原版受困于 29% 错题墙停滞在 74%；Diamond 清洗后海外三强跃升至 71.3%–80.2%，国产 Qwen4 Max 以 44.9% 领跑",
      cost: "单轮推理成本适中（静态闭卷），但前期 $50 万悬赏与后续多轮专家清洗耗时近两年",
      lesson: "「AI 做错才留」的逆向筛选机制会系统性富集人类出题者算错的瑕疵题，导致高分段必撞 30% 错题天花板。",
      detail: {
        cases: [
          "FutureHouse 复核 321 道生化纯文本题查出 29% ± 3.7% 标准答案错误或误导；Epoch AI 抽检 48 题查出 46% 硬伤并判为 Flawed。",
          "原版 HLE 上 Fable 5.2 闭卷 73.2% vs 挂载搜索与代码工具 74.2%（仅差 1 分），反映考卷自身错题墙而非模型能力上限。"
        ],
        antichat: "相继推出 Verified、Rolling 与 Diamond 清洗集，剔除错标与格式争议题，仅保留多轮专家零分歧高难题。",
        adoption: "HLE-Diamond 已被 AA v5.0 与海外三强官方发布报告纳为通用学术推理核心主榜。"
      }
    },
    {
      id: "biomy", name: "BioMysteryBench", track: "sci", trackLabel: "2.2 科研与推理",
      org: "Anthropic Research", orgType: "lab", orgLabel: "前沿大厂自建",
      release: "2026.04 (10月底停用)", releaseYear: 2026.3, evolution: "首发 76 常规+23 超难 → 定稿 90 题 → 转交 Vals AI",
      countStr: "99 → 90 题", countNum: 90, complexity: 2.8, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["code"], evalShort: "唯一事实真值精确匹配 (独立连跑 5 轮)",
      source: "取自底细已知的真实测序(FASTQ)、晶体与质谱原始数据文件，抹除文件名、物种与论文编号，仅考唯一客观事实",
      funnel: "99 题剔除 9 道歧义定稿 90 题；强制出题人提交 Validation Notebook 可执行验算代码 + 5 位专家盲测分级",
      verifier: "8GB Linux 容器（200步/4h），网络白名单允查 BLAST/NCBI 公共库但封禁 GEO/SRA 原始论文号，每题连跑 5 遍",
      score: "常规集逼近 90%（Fable 5.2 全卷 83.7%）；但 23 道人类专家全败的超难题大多在 5 次运行中仅碰对 1–2 次",
      cost: "单题成本相差 15 倍：GPT-6.1 Sol $0.37 vs Fable $1.68 (4m) vs Argon $5.71 (40m)",
      lesson: "强制提交可执行验算代码可确保专家全败题亦零错题；常规集逼近饱和后主动退役并转交第三方比拼成本效率。",
      detail: {
        cases: [
          "代表任务：千人匿名基因组溯源亲生父母、匿名表观测序 bigWig 区分 ChIP 与 Input、定位批次贴反标签样本、临床 FASTQ 鉴定感染病毒。",
          "先验偏见现象：模型记忆了大量常见生物学套路，在常规题上有时因过早套用模板而输给忠实分析原始数据的人类专家。"
        ],
        antichat: "仅公开 5 题供环境调试，90 题锁入实名门禁严禁训练；通过域名黑白名单阻断检索原论文编号。",
        adoption: "Anthropic 内部已于 2026 年 10 月底正式退役该榜，转交第三方平台 Vals AI 作为生物信息成本效率基准。"
      }
    },
    {
      id: "tbs", name: "TB-Science 0.1", track: "sci", trackLabel: "2.2 科研与推理",
      org: "Stanford & Laude Institute", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.08", releaseYear: 2026.6, evolution: "70 题首发 → 持续纳新扩至 96 题",
      countStr: "920 → 70(96) 题", countNum: 70, complexity: 3.3, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "断网双容器纯 pytest 脚本判分",
      source: "一线科研人员提交五大门类（生命 19 / 物理 17 / 数统 17 / 工程 9 / 地球 8）真实命令行科学计算任务",
      funnel: "录用率 7.6%：920 份提案 → 386 个 PR → 标准解连跑 5/5 全过 + 空解必败 + 领域专家审校定稿 70 题",
      verifier: "复用 Harbor 断网双容器（做题与改卷物理分离），纯 pytest 脚本核验计算结果，零主观印象分",
      score: "海外三大厂唯一共同采用的科研标尺（GPT-6.2 77.1% / Fable 74.6% / Neon 70.5%）；Fable 换用简装 Mini-SWE 即骤降 18.9 分",
      cost: "单题消耗数千万至 1.3 亿 Token；Argon 单题 $44.9 比 GPT-6.2 Sol ($2.53) 贵近 18 倍而得分反低 14 分",
      lesson: "复用成熟 Harbor 容器底座 + <8% 严苛录用率可迅速建立行业共识；但跨厂对比必须锁定统一中立 Harness。",
      detail: {
        cases: [
          "代表真题：17 年冰川卫星立体图 GeoTIFF 算高程变化、9 年水文数据写 R 全局优化 15 参数、强放热反应釜安全温控、Lorenz-96 混沌系统反推干扰项。"
        ],
        antichat: "做题容器彻底断网以杜绝外部论文检索；参考解必须 5/5 稳定通过以排除数值随机波动。",
        adoption: "海外三大厂官方主表硬交集 + AA v5.0 & Vals AI 共同收录。"
      }
    },
    {
      id: "asb", name: "Autonomous Science Bench 0.1", track: "sci", trackLabel: "2.2 科研与推理",
      org: "西北大学 (Northwestern)", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.10.13", releaseYear: 2026.78, evolution: "0.1 首发（因仅 6 题致方差过大，大厂采用率 0%）",
      countStr: "仅 6 战役 (×3轮)", countNum: 6, complexity: 4.2, access: "open", accessLabel: "全开源",
      evalTags: ["code", "phys"], evalShort: "虚拟实验室账本（Discovery × Learning 双闸门）",
      source: "取自 DeepMind、辉瑞、Caltech、NIST 等 6 篇高引公开论文（仅给 <11% 候选空间预算分批送检）",
      funnel: "逐题排查分布偏置与统计捷径（如传感器题将测试集锁死在首轮无偏初始池，封堵不跑实验仅数突变个数刷至 NDCG=0.729 的漏洞）",
      verifier: "基于 Harbor 分离 AI 容器与 Lab Service 账本 (Ledger)；要求同时达成高活性配方发现（Discovery）与未知样本排序建模（Learning）",
      score: "GPT-6 Astra 72.2% / Opus 66.7%；代码完赛率 100%，但 48.7% 的失败源于只过一关（局部微调与全局探索顾此失彼）",
      cost: "18 场总计约 $173–$190，但各模型绑定不同私有框架且未测 Gemini",
      lesson: "典型工程警示：范式设计极具前瞻性，但因「仅 6 题致单题波动 16.7 分 + 框架不统一 + 缺隐藏题」导致三大厂 0% 采用。",
      detail: {
        cases: [
          "生物传感器战役（3批×10=30次预算）：60.0% 失败源于选点过散未触达高活性区（挂 Discovery 关）；丙烯催化 84.2% 失败源于固守局部微调致未探索空间失明（挂 Learning 关）。"
        ],
        antichat: "Lab Service 独立记账扣减送检额度防偷阅全表；严格消除静态先验刷分捷径。",
        adoption: "三大厂与第三方总榜采用率均为 0%；直接促成 38 天后扩充至 52 题的 TwinLab-Bench。"
      }
    },
    {
      id: "twinlab", name: "TwinLab-Bench", track: "sci", trackLabel: "2.2 科研与推理",
      org: "高校联合团队 (arXiv:2611.26248)", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.11.20", releaseYear: 2026.89, evolution: "距 ASB 发布仅隔 38 天迅速扩充至 52 题补位",
      countStr: "52 题 (跨过稳定线)", countNum: 52, complexity: 4.3, access: "open", accessLabel: "全开源",
      evalTags: ["code", "phys"], evalShort: "虚拟实验室多轮实验寻优评分 (百分制)",
      source: "延续预算受限的多轮实验规划范式，将跨学科虚拟实验室扩展至 52 个独立科研任务",
      funnel: "严格对齐工业界 ≥50 题统计稳定阈值，并统一评测接口拉齐四款主流旗舰同台实测",
      verifier: "多轮实验预算分配 + 虚拟实验室反馈闭环 + 百分制综合寻优度量",
      score: "首次拉齐 Fable 5.2、Opus 5.5、GPT-6.1 Sol 与 Gemini 4 Carbon 同台测试，最高分 Fable 5.2 仅得 45.0 / 100",
      cost: "52 题多轮交互，兼具统计置信度与工业界可承受复测成本",
      lesson: "优秀评测范式一旦跨过 50 题统计稳定线并统一测试接口，即可真实揭示多轮科学规划的当前短板（最高仅 45 分）。",
      detail: {
        cases: ["直接修正 ASB 0.1 仅 6 题导致统计误差近 ±20% 的结构缺陷，证实前沿模型的多轮实验设计能力远未饱和。"],
        antichat: "扩大任务分布覆盖度以平滑单题随机方差，统一 Harness 消除脚手架偏差。",
        adoption: "2026.11.20 发布后迅速成为多轮自主科研赛道的标准补位标尺。"
      }
    },
    {
      id: "biobasics", name: "BioBasicsBench", track: "sci", trackLabel: "2.2 科研与推理",
      org: "OpenAI × Ligo Biosciences", orgType: "lab", orgLabel: "前沿大厂自建",
      release: "2026.11.06", releaseYear: 2026.85, evolution: "100 题 100% 闭源首发（仅公布自家 7 款模型成绩）",
      countStr: "100 题 (闭源底片)", countNum: 100, complexity: 2.0, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["rubric"], evalShort: "三位湿实验博士盲审 Rubric 采分点均值 (5 轮)",
      source: "Ligo 湿实验人员从真实实验记录本提取 100 道日常排错题，直接输入未裁剪电泳胶、反光培养皿与移液视频",
      funnel: "100% 内部未发表原始底片（零网络污染）+ 三位湿实验博士背靠背独立盲审制定细粒度采分点",
      verifier: "按 Mean Rubric Reward 计算步骤平均分，每题连跑 5 遍；专门设置采分项奖励「识破伪影并拒绝强行下结论」",
      score: "GPT-6 Astra 达 66.7%（较前代提升 23 分，单题输出反缩减一半至 4,704 tok）；注：66.7% 为步骤平均分",
      cost: "底层视觉识读越准反而越省 Token（GPT-5.2 因看不清原图耗费 27,620 tok 冗长推理仅得 31.2%）",
      lesson: "原始证据识读精度决定推理上限，图像看错再长思维链亦无济于事；专门考核「识别废片不强猜」。",
      detail: {
        cases: [
          "正向案例：GPT-6 Astra 识别出培养皿边缘手写 LB Kan50（卡那霉素）标签与实验方案要求的氨苄青霉素冲突，当场判定对照组无效。",
          "翻车案例：在菌落 PCR 电泳胶上固守「条带大=插入成功」的教材经验，无视真实阳/阴性对照泳道而误挑废菌落；受琼脂反光干扰将菌落数高估 12%。"
        ],
        antichat: "100% 未发表实验台原始影像杜绝预训练泄漏；三位博士独立盲审锁定 Rubric。",
        adoption: "OpenAI 内部湿实验看图排错核心标尺，暂未开放外部实验室跨厂评测。"
      }
    },
    {
      id: "binder", name: "De novo binder design (24h)", track: "sci", trackLabel: "2.2 科研与推理",
      org: "Anthropic × Twist / Adaptyv", orgType: "lab", orgLabel: "前沿大厂自建",
      release: "2026.08 → 2026.11", releaseYear: 2026.86, evolution: "8月试点 → 11月 15 靶点 × 1,320 序列湿实验闭环",
      countStr: "15 靶点 (1,320序列)", countNum: 15, complexity: 5.0, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["phys"], evalShort: "计算重折叠模拟 + Twist/Adaptyv 独立湿实验实测",
      source: "给定 15 个真实疾病靶点蛋白三维结构（如 RBX1）与 1.6 万字操作说明，单卡 GPU 限时 24h 无人干预全自主设计",
      funnel: "电脑重折叠初筛最优 30 条序列 → 隐去生成来源寄往两家独立商业 CRO（Twist 合成蛋白 + Adaptyv 仪器实测结合亲和力）",
      verifier: "双阶验收：计算重折叠通过率（85.1%）× 真实细胞表达合成与生物物理仪器实测结合力（终极物理裁判）",
      score: "15 个靶点成功设计出 14 个真实有效结合蛋白（RBX1 亲和力达 3.9 nM），但成功率由计算模拟的 85.1% 回落至湿实验的 22%–35%",
      cost: "单靶点 24h H200/GPU 算力 + 1,320 条全新蛋白序列的商业外包合成与生物物理测定费用",
      lesson: "计算模拟高分（85.1%）不等于物理现实可用（22%–35%），引入独立第三方 CRO 盲测是科学设计评测的终极闭环。",
      detail: {
        cases: ["Agent 自主调用 RFdiffusion / BindCraft 编写脚本修复报错、使用 Boltz / AlphaFold 多轮重折叠筛选，最终交付自然界不存在的 30 条全新结合蛋白序列。"],
        antichat: "隐去序列来源交由两家独立商业实验室盲测合成，彻底杜绝模型针对电脑打分函数的过拟合（Reward Hacking）。",
        adoption: "Anthropic 科学研发与生物安全评估核心实证，树立「计算生成 → 商业湿实验盲测」的行业标杆。"
      }
    },
    {
      id: "autobench", name: "AutomationBench v1.0.6", track: "off", trackLabel: "2.3 办公与劳动",
      org: "Zapier", orgType: "prod", orgLabel: "产品公司",
      release: "2026.04 → v1.0.6", releaseYear: 2026.5, evolution: "4月上线 → v1.0.6（经 BLE 白盒审计推动双向断言修复）",
      countStr: "657 私有题", countNum: 657, complexity: 3.1, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["code"], evalShort: "47 款 SaaS 数据库终态断言（目标分 / 严格全通）",
      source: "提炼自 Zapier 数百万条真实企业工作流，在本地沙盒完整克隆 47 款常用 SaaS 应用与约 500 个 REST API",
      funnel: "657 题私有主集；第三方 BLE 白盒抽检公开集 100 题查出 71% 脚本缺陷率（28 题放水 / 18 题错杀 / 9 题可钻空子 / 15 题参考解写错）",
      verifier: "仅提供 Search 与 Execute 工具；直接核查 47 个后台数据库终态；AA 拆分为主榜目标分（最高 79.3%）与严格全通率（56.6%）两档口径",
      score: "严格全通率：Neon 56.6% / Fable 51.6% / GPT-6.2 50.7%；国产 Qwen4 Max (47.2%) 与 Kimi K3.1 (46.0%) 已追至距榜首 9 分以内",
      cost: "本地克隆环境零封号、100% 确定性复现；MiniMax 目标分 72.5% → 严格全通 38.1%（落差 34.4 分）暴露末步收口短板",
      lesson: "复杂业务下的纯代码断言极易漏查或错杀（BLE 审出 71% 缺陷）；读榜必须拆解双口径（相差 22–34 分）。",
      detail: {
        cases: [
          "BLE 白盒审计公开集 v1.0.6（100 题）：仅 19 题合格，71 题确认缺陷——含会计借贷写反或发票漏算 $1,000 仍判满分（28 题）、写死未声明隐藏列名致合法解判 0（18 题）、不发邮件仅将草稿标为 SENT 或删除整行骗过断言（9 题）。"
        ],
        antichat: "657 题主集全私有防背题；本地克隆 47 款软件彻底消除外部验证码与账号封禁干扰；AA 官方 286 配置实现全量双口径对齐。",
        adoption: "Anthropic 与 Google 官方报告必测 + AA v5.0 办公维度核心权重。"
      }
    },
    {
      id: "ale", name: "Agents' Last Exam v1.1", track: "off", trackLabel: "2.3 办公与劳动",
      org: "UC Berkeley RDI + 300+ 专家", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.05 → 2026 秋", releaseYear: 2026.75, evolution: "v1.0(5月) → v1.1(剔除30道不稳题锁定122题并迁入Linux)",
      countStr: "1,500+ → 122 活跃题", countNum: 122, complexity: 4.2, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "确定性脚本核查专业软件交付件（步骤分 / 严格全通）",
      source: "300+ 行业专家按美国 O*NET 职业分类表覆盖 13 大行业、55 个非体力职业，在真实专业软件（After Effects / Siemens NX）内实操",
      funnel: "录用率 8.1%：1,500+ 专家初稿 → v1.1 剔除 30 道环境不稳题锁定 122 题 → Epoch AI 白盒审计仍查出 22 题验分脚本漏判（标 Flawed）",
      verifier: "虚拟机挂载真实专业软件，由确定性脚本 + 隐藏参考成品自动核验交付文件终态（区分步骤得分率与严格全通率）",
      score: "厂商常报 74.5%–78.3% 步骤分，但严格全通率均停留在 45.2%–47.5%，人类需一周以上的顶级难度层接近 0%",
      cost: "各家绑定自研框架参赛（Codex / Claude Code / ALE-Claw），跨 55 职业重型软件虚拟机维护成本高昂",
      lesson: "为 55 款复杂专业软件编写「零漏洞确定性判分脚本」难度极高；读分必须拆穿步骤分与严格全通率之间 30 分的落差。",
      detail: {
        cases: ["半天以内常规工单表现尚可，但面对人类专家需数天至一周完成的复杂工程交付，各旗舰模型通过率断崖式归零。"],
        antichat: "全开源接受社区白盒审计，Epoch AI 查出 22/122 题脚本存在未完成亦判过的漏洞（轨迹复核显示主流模型未恶意利用）。",
        adoption: "OpenAI 与 Google 官方重点引用，目前学界规模最大的跨职业专业软件评测沙箱。"
      }
    },
    {
      id: "briefcase", name: "AA-Briefcase v1.1", track: "off", trackLabel: "2.3 办公与劳动",
      org: "Artificial Analysis", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.06 (v1.1)", releaseYear: 2026.45, evolution: "v1.0 → v1.1（纳入 AA v5.0 办公维度核心权重）",
      countStr: "4 项目 · 91 题", countNum: 91, complexity: 3.9, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["rubric"], evalShort: "客观 Rubric 核查公式数据 + 评审团匿名盲评 Elo",
      source: "领域专家耗时数千小时构建 4 家模拟公司企业网盘：混合数千份历史底表、合同草稿、冲突制度与 2.5 万条跨周 Slack 群聊",
      funnel: "资深咨询与财务专家设计多周综合业务流 + 为每道任务预写数十条细粒度客观核查清单",
      verifier: "首创双轨验收：客观 Rubric（0–100% 逐项核查 Excel 单元格数字与公式引用）× 匿名盲评 Elo（0–3000 评判 PPT 与备忘录洞察质感）",
      score: "双轨冠军分家：Fable 5.2 赢硬指标（66.1%），Opus 5.5 赢盲评（1800 Elo）；但全要求 100% 达标的完美交付仅 ~3%，31/91 题全员不及格",
      cost: "检索数千份文档与 2.5 万条聊天记录极度消耗长上下文 Token，不同模型单题账单相差数个数量级",
      lesson: "开放商业交付必须将「事实算准」与「汇报写好」解耦双轨评判，防止纯盲评被数字算错的精美长文误导。",
      detail: {
        cases: ["典型任务（季度损益重算 + 12 页董事会 PPT）：财务总监在 Slack 第 1.8 万条消息临时变更了欧洲区退货计提规则，若仅照旧版 PDF 制度计算则全盘皆错。"],
        antichat: "私有题库杜绝语料泄漏；客观 Rubric 与盲评 Elo 双向制衡，防止刷单一维度。",
        adoption: "Anthropic 官方报告主推 + AA v5.0 办公维度核心权重。"
      }
    },
    {
      id: "rli", name: "Remote Labor Index (RLI)", track: "off", trackLabel: "2.3 办公与劳动",
      org: "Scale AI × CAIS", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.10 → 2026.11", releaseYear: 2026.1, evolution: "2025.10 首发(最高2.5%) → 2026.11 持续闭卷追踪(41.3%)",
      countStr: "240 真单 (230 私有)", countNum: 240, complexity: 4.4, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["human"], evalShort: "真人行业专家对照人类中标稿二元验收（付款 / 退单）",
      source: "斥资 $14.4 万向 Upwork 自由职业者买断 240 个真实已结款外包项目（横跨 23 个远程工种、累计 6,000+ 小时人类工时及中标交付稿）",
      funnel: "剔除需反复线下会议沟通的订单，保留 10 单公开 + 230 单私有，原封不动向 AI 提供甲方原始脏素材包",
      verifier: "配齐办公、设计、音视频剪辑与 3D/CAD 虚拟桌面，由同行业真人专家按「甲方是否愿意付款收货」执行二元验收（错一处即整单拒付得 0 分）",
      score: "一年内从 2.5% 跃升至 Fable 5.2 的 41.3%（领先 GPT-6 Astra 20.8% 整整一倍），国产仅 DeepSeek V4.1 Flash (9.6%) 公开在榜",
      cost: "$14.4 万真单采购成本 + 每轮评测高昂的真人专家验货费用，周期长、成本高",
      lesson: "真实商业交付遵循残酷的乘法法则（90% 完成度因一处低级失误仍遭退单）；纯私有防污染的代价是被 Epoch 标为「信息不足」。",
      detail: {
        cases: ["近六成退单源于四类低级工程品控失误：导出 0 字节损坏文件、漏交设计源文件图层、报告正文与附表数据冲突、3D 建模或排版穿模粗糙。"],
        antichat: "230/240 核心计分单严格锁入私有库防背题；真人专家按商业标准验收，无法通过脚本漏洞绕过。",
        adoption: "Anthropic 商业落地能力核心实证；注：41.3% 仅代表单次打包外包单验收率，绝不等于可替代 41.3% 的全职白领岗位。"
      }
    },
    {
      id: "charto", name: "Chartography", track: "emb", trackLabel: "2.4 桌面与物理",
      org: "Surge AI", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.07 → 2026.08", releaseYear: 2026.6, evolution: "7月首榜(最高45%) → 8月论文 → 11月三强集体冲破 73%",
      countStr: "100 专业真图", countNum: 100, complexity: 1.5, access: "open", accessLabel: "全开源",
      evalTags: ["rubric"], evalShort: "三位同业专家误差线 + 自动判分 (每题独立连跑 20 遍)",
      source: "执业医师、量化研究员、机械与化工工程师日常使用的 12 行业 100 张真实高密专业图纸（Moody 图 / Bode 图 / KM 生存曲线 / 多层 K 线），零合成图",
      funnel: "3 步严筛：一线行家供图 → 3 位同专业专家背靠背独立读数并逐题设定容差线（51 道读数题）→ 至少难倒 2 款旗舰模型方可入库",
      verifier: "严格禁用代码裁剪放大工具 (no tools) 以检验底座原生视觉分辨率；多小问错一全零、拒答判零；每题独立连跑 20 遍（2,000 次）消减随机方差",
      score: "4 个月内由 45.0% 跃升至 71.0%–75.1%（三家分差 <2.5 分），证实 2D 静态高密专业识图已集体过关",
      cost: "极高性价比：全轮 2,000 次单轮问答仅需 ~$60–$260，免容器 30 分钟即可跑完，适合高频回归摸底",
      lesson: "剥离代码放大外挂 + 连跑 20 遍挤干随机猜测水分，方能准确度量多模态底座原生视力的真实进步。",
      detail: {
        cases: ["前代模型三大典型失误：在 Moody 双对数网格上按等距直尺估算致数量级错误、在双纵轴 Bode 图上看串曲线、在三维投影曲面上误判遮挡边界。"],
        antichat: "每题 20 轮重复采样均值消除单次蒙对；复合小问零容错、模棱两可拒答直接判 0。",
        adoption: "Anthropic 2026.11 官方主表收录，成为低成本原生视觉分辨率回归测试标配。"
      }
    },
    {
      id: "osworld", name: "OSWorld 2.1", track: "emb", trackLabel: "2.4 桌面与物理",
      org: "港大 XLang Lab 等", orgType: "acad", orgLabel: "高校联盟",
      release: "2024.04 → 2026.06", releaseYear: 2026.5, evolution: "1.0(369小题)→Verified(25.07)→2.0(108长流程)→2.1(修脚本)",
      countStr: "369 → 108 题(82本地)", countNum: 108, complexity: 3.6, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "Sub-goal DAG + Python 脚本直查文件系统底层终态",
      source: "一线财务、设计与开发从业者重构 108 道跨 2.44 款桌面软件的复合工作流（中位耗时 1.6h），手工预埋脏 VM 快照与 31 个本地 Docker 网站",
      funnel: "2.1 版组织人类专家逐题录制 Golden Trajectory 真机通关轨迹，彻底修复损坏初始素材、端口冲突与假阴性误杀脚本",
      verifier: "将 1.6h 任务拆解为 10–15 个 Sub-goal DAG 依赖节点，通过底层 Python 脚本直查 SQL、Excel 公式树、PNG 透明通道与 DOM（同步输出 Partial 与 Strict）",
      score: "步骤分（Partial）高达 79.5%–89.3%，但严格全通（Strict）腰斩至 44.0%–54.6%（轨迹显示 93% 步数仅单向推进，回检修正不足 7%）",
      cost: "单题 250–318+ 步且每步重传 1080p 全屏截图（$22–$76/题）；全轮 $1,180–$8,200+，需 KVM 嵌套虚拟化集群",
      lesson: "长程 GUI 基准必须经由真人录制 Golden Trajectory 排雷，且必须并列披露步骤分与严格全通率以防可用性虚高。",
      detail: {
        cases: [
          "代表真题：跨 ERP→Calc→Writer 生成财务月报、GIMP 多图层抠图保留透明通道并改 VS Code 前端重启服务、检索 Thunderbird 十余封邮件批改 Linux 权限；常因末步漏按 Ctrl+S 前功尽弃。",
          "同名三口径警示：v1-Verified (86.1%)、2.0 完整集含在线题 (20.6%) 与 2.1 离线步骤分 (89.3%) 存在超 60 分的口径落差，严禁直接混比。"
        ],
        antichat: "82 道纯 offline 本地闭环题 100% 断网可确定性复现；不依赖截图视觉裁判，直接深入文件系统底层核验终态。",
        adoption: "海外三大厂 GUI Agent 核心公用标尺，桌面计算机操控领域事实标准。"
      }
    },
    {
      id: "robodojo", name: "RoboDojo (Sim / Real)", track: "emb", trackLabel: "2.4 桌面与物理",
      org: "MIT / 港大 / 清华 / Stanford", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.07 → 2026.11", releaseYear: 2026.6, evolution: "7月首发 → 11.14 官方审计标星移除塞小抄作弊队",
      countStr: "42 仿真 + 18 真机", countNum: 60, complexity: 4.7, access: "open", accessLabel: "全开源",
      evalTags: ["phys"], evalShort: "42 项 Isaac Sim 物理仿真 + 18 项 RealEval 标准化真机考棚",
      source: "基于 Isaac Sim 构建 42 项仿真任务（5 大维度 24 项技能，拒绝换桌布凑题）+ 1.5m 恒定 LED 灯箱与 3D 打印夹具锁死的 18 项 RealEval 真机任务",
      funnel: "XPolicyLab 统一接口通吃仿真与真机；2026.11.14 社区与官方审计查获向 Prompt 注入人工解题小抄的 SOLVE*(75%)/Q0*(68.9%) 并标星移出",
      verifier: "通用大模型零遥操作微调读取三路相机画面直出双臂 6-DoF 位姿；注：仿真默认采用 Step-blocking 回合制暂停时钟",
      score: "Fable 5.2 Sim‡ 64.9% 达 GPT-6 Astra (29.8%) 的 2.18 倍，但均未交真机卷；官方真机最高仅 33.9%，传统 VLA 换桌布背景暴跌 67%–96%",
      cost: "全轮 API Token + Isaac Sim GPU 渲染双烧约 $1,200–$5,500+；需 8×RTX 4090 并发物理仿真",
      lesson: "读榜须紧盯右上角 ‡ 注记（私有外挂 + 仿真停表慢想 + 未上真机）；视觉域随机化直接拆穿传统 VLA 的死背背景脆弱性。",
      detail: {
        cases: [
          "五维真题：cover_blocks 考核不透明杯盖遮挡后的三维空间记忆、fasten_screws 考核 2mm 容差拧螺丝与双臂接力、solve_equation 考核心算缺字算式抓积木（30 款传统 VLA 全 <2%）。",
          "视觉域随机化测试中，仅更换桌面纹理与光照，传统 VLA 排名第一的混元进度分即从 22.0 跌至 1.6（跌幅 92.9%）。"
        ],
        antichat: "RealEval 以 1.5m 恒定 LED 黑棚 + 3D 打印夹具焊死硬件变量；11.14 代码审计严格清退提示词塞小抄违规队伍。",
        adoption: "Anthropic 2026.11 唯一自报具身仿真基准（中立榜 BenchLM 因外挂未开源仅列为 Display-only）。"
      }
    },
    {
      id: "firstexam", name: "Embodied First Exam", track: "emb", trackLabel: "2.4 桌面与物理",
      org: "西北大学 (Harbor 框架)", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.11", releaseYear: 2026.86, evolution: "2026.11 首发（基于 Harbor 统一打通 35 套独立具身仿真）",
      countStr: "1,156 题 (456 核心)", countNum: 456, complexity: 4.8, access: "open", accessLabel: "全开源",
      evalTags: ["phys"], evalShort: "35 套异构仿真统考：停表回合模式 vs 连续真实物理时钟",
      source: "利用 Harbor 统一沙盒打通含 RoboDojo 在内的 35 个具身评测套件、47 种机器人本体，合成为 1,156 道标准化任务",
      funnel: "精选 456 道核心题执行严格双模式对照：模式 A 允许回合制暂停物理时钟 vs 模式 B 连续真实物理时钟流逝 (Realtime)",
      verifier: "直接对比允许冻结重力与惯性思考（Turn-based）与取消暂停键后真实物理时钟下的实时控制成功率",
      score: "允许暂停时 GPT-6 Astra 以 34.0% 领跑（开源最高 9.0%）；一旦取消暂停键切回实时模式，63.0% (287/456 题) 三家旗舰全得 0 分",
      cost: "横跨 35 套异构物理引擎，全量实时物理仿真对 GPU 渲染与超低延迟推理基础设施要求极高",
      lesson: "取消仿真器「时间暂停键」一举戳破 10–18s 慢思考大模型直控实时物理的幻想，证实真机落地必须走快慢双系统协同。",
      detail: {
        cases: ["在动态抓握与防倾倒任务中，大模型每步思考 10–18 秒期间，倾倒杯子已在 0.4 秒内砸落台面、滑动目标已在 1.2 秒内移出工作区。"],
        antichat: "以 Harbor 统一沙盒终结各实验室自选仿真器的碎片化偏差，并剥离回合制时间冻结特权。",
        adoption: "2026.11 具身智能统考标尺，为三大实验室具身技术路线分化提供了决定性的实证依据。"
      }
    },
    // Legacy baselines
    {
      id: "swe_full", name: "[旧代对照] SWE-bench Full / Verified", track: "legacy", trackLabel: "旧代对照",
      org: "Princeton / OpenAI", orgType: "acad", orgLabel: "高校联盟",
      release: "2023.10 → 2024.08", releaseYear: 2024.6, evolution: "Full(2294)→Lite(300)→Verified(500 · 18月刷至83.5%)",
      countStr: "2,294 → 500 题", countNum: 500, complexity: 2.4, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "仓库既有单元测试 (Fail-to-Pass)",
      source: "从 GitHub 12 个热门 Python 公开仓库抓取真实 Issue 与对应 PR 单元测试",
      funnel: "Verified 经人工筛除描述不清题缩至 500 题，但高分段仍被 OpenAI 审计查出未解题中 59.4% 存在测试缺陷（35.5% 单测过窄错杀）",
      verifier: "Docker 容器运行原仓库既有单元测试（兼具错杀合法修复与放行不可合入补丁的双重局限）",
      score: "18 个月内冲至 83.5%（官报 87.6%），2026.02 OpenAI 率先宣布停报",
      cost: "中低成本（分钟级单仓短修），已退出海外三大厂前沿区分主舞台",
      lesson: "0/1 单测验收范式 + 长期公开语料，18 个月内必然饱和并撞上过半测试缺陷墙。",
      detail: {
        cases: ["scikit-learn-14520 典型冤案：单测脚本写死原作者当年在 PR 评论区临时商定的固定警告句式，AI 合法修复因措辞微差被判 0 分。"],
        antichat: "Docker 化改造修复了早期未清理 git log 导致历史提交泄露答案的漏洞。",
        adoption: "上一代软件工程黄金标准，现已全面交棒予 FC 2.0、FSWE v2 与 TB 4.1。"
      }
    },
    {
      id: "swe_pro", name: "[旧代对照] SWE-bench Pro", track: "legacy", trackLabel: "旧代对照",
      org: "Scale AI", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.09", releaseYear: 2025.7, evolution: "2025.09 首发 → 1 年内由 23% 飙升至 93.0%",
      countStr: "1,865 题 (含私仓)", countNum: 1865, complexity: 2.8, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "隔离容器多文件单元测试",
      source: "引入商业私有代码仓库与跨多文件改造任务以抵御预训练数据污染",
      funnel: "大规模工业级题库，但据 OpenAI 与社区评估仍存在约 30% 坏题与过窄测试误判",
      verifier: "隔离容器内运行多文件单元测试（底层仍未跳出 0/1 单测范式）",
      score: "首发仅 1 年即由 23% 飙升至 Claude Fable 5.2 的 93.0% 趋近饱和",
      cost: "1,865 题体量庞大，全量复测账单高昂而头部边际区分度急剧衰减",
      lesson: "仅更换私有题库而不升级底层验收机制（仍靠凑绿单测），一年内照样被大规模沙盒 RL 刷穿。",
      detail: {
        cases: ["印证了核心规律：单仓修 Bug + 0/1 单测天然契合大规模强化学习奖励，单纯藏题无法延长基准寿命。"],
        antichat: "采用 GPL 与商业私仓阻断预训练直接记忆，但未能抵御模型针对单测通过策略的泛化刷分。",
        adoption: "美系大厂已逐步将其替换为 FrontierCode 2.0 与 FrontierSWE v2。"
      }
    },
    {
      id: "osworld1", name: "[旧代对照] OSWorld 1.0 / Verified", track: "legacy", trackLabel: "旧代对照",
      org: "港大 XLang Lab", orgType: "acad", orgLabel: "高校联盟",
      release: "2024.04 → 2025.07", releaseYear: 2024.3, evolution: "1.0(369题) → Verified(25.07 · 26年中刷至86%)",
      countStr: "369 道 2min 小题", countNum: 369, complexity: 2.2, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "单软件单脚本核查文件终态",
      source: "源自论坛问答与单软件基础办公指令（熟练人类约 2 分钟即可完成）",
      funnel: "Verified 版集中修复了早期依赖外部真实网站改版与验证码导致的约 300 处环境故障，但 2026 年中已被刷至 86.0% 见顶",
      verifier: "单软件内 15–30 步点击操作 + 任务结束后单个脚本检查文件状态",
      score: "Qwen3.8-Max 达 86.1%，促使团队彻底重构出耗时拉长 48 倍的 OSWorld 2.0/2.1",
      cost: "低成本（单题仅 15–30 步截图交互）",
      lesson: "单软件 2 分钟短指令在两年内即告饱和；唯有将任务时长拉长 48 倍并引入跨软件脏环境方能重塑区分度。",
      detail: {
        cases: ["奠定了基于 Ubuntu VM 镜像的 GUI Agent 评测范式，现已全面演进为 OSWorld 2.1。"],
        antichat: "开源虚拟机快照保障可复现性，智谱、Kimi 与字节团队曾共同参与 Verified 版环境修复。",
        adoption: "已被 OSWorld 2.1 正式接替。"
      }
    }
  ],

  // 7. 5-Family Version Evolution Timeline (2023.10 - 2026.11)
  timelineLanes: [
    { name: "SWE 代码家族", sub: "Full → Verified → FC 2.0", nodes: [
      { t: 2023.80, lbl: "Full (2294题)", col: "#26547C", tip: "2023.10：确立真实 GitHub 仓库修 Bug 范式，但早期环境复现困难" },
      { t: 2024.30, lbl: "Lite/Docker", col: "#26547C", tip: "2024.04–06：300 题降本 + Docker 容器化并封堵 git log 历史泄露" },
      { t: 2024.65, lbl: "Verified (500题)", col: "#B2620F", tip: "2024.08：18 个月冲至 83.5%，OpenAI 审计发现未解题中 59.4% 存在测试缺陷" },
      { t: 2025.72, lbl: "Pro (1865题)", col: "#B2620F", tip: "2025.09：引入商业私仓抗污染，但未换单测考法，1 年内即刷至 93.0%" },
      { t: 2026.32, lbl: "FSWE v1→v2 (20h)", col: "#216E5F", tip: "2026.04→09：拉长至 20 小时开放系统工程（34 题），当前榜首 69.9%" },
      { t: 2026.82, lbl: "FC 2.0 (132题)", col: "#B84A2E", tip: "2026.06→10：转向维护者合并标准，501 条一票否决红线将最高分压回 50.2%" }
    ]},
    { name: "Terminal-Bench", sub: "1.0 → 2.0 → 4.1 反向缩容", nodes: [
      { t: 2025.38, lbl: "TB 1.0 (80题)", col: "#26547C", tip: "2025.05：上线 4 天即登 Claude 4 模型卡，开辟真实 Linux 命令行评测赛道" },
      { t: 2025.88, lbl: "TB 2.0 (89题)", col: "#B2620F", tip: "2025.11：抽离开源 Harbor 底座，但 10 个月内由 32.6% 被刷至 84.7%" },
      { t: 2026.55, lbl: "TB 3.0 (红队)", col: "#B84A2E", tip: "2026.07：首次将对抗性 Cheat Trials 红队攻题写入标准入库流水线" },
      { t: 2026.88, lbl: "TB 4.1 (缩容66题)", col: "#B84A2E", tip: "2026.08–11：反向剔除饱和与不稳题至 66 题 + 8h 去噪 + 归档产物 $0 重评" }
    ]},
    { name: "HLE 闭卷家族", sub: "2500题 → 错题墙 → Diamond", nodes: [
      { t: 2024.72, lbl: "悬赏征题 ($50万)", col: "#26547C", tip: "2024.09：全球 50 国 1,000 位学者提交 70,000+ 道百学科初稿" },
      { t: 2025.06, lbl: "HLE 原版 (2500题)", col: "#26547C", tip: "2025.01：在职旗舰 AI 守门初筛（录用率 3.6%），但也反向富集了学者错题" },
      { t: 2025.55, lbl: "查出 29% 错题", col: "#B2620F", tip: "2025.07：FutureHouse 审出 29% 生化答案错误，头部模型卡死在 74% 错题墙" },
      { t: 2026.72, lbl: "HLE-Diamond", col: "#B84A2E", tip: "2026.09：经多轮专家清洗剔除错题与歧义，海外三强真实得分跃升至 80%+" }
    ]},
    { name: "OSWorld 桌面", sub: "2分钟小题 → 1.6h 跨软件", nodes: [
      { t: 2024.28, lbl: "1.0 (369道2min题)", col: "#26547C", tip: "2024.04：奠定 Ubuntu 真实桌面 GUI 操控评测基准" },
      { t: 2025.55, lbl: "Verified (86%见顶)", col: "#B2620F", tip: "2025.07：修复外部网页失效环境后，于 2026 年中被刷至 86.0% 见顶" },
      { t: 2026.46, lbl: "2.0 (108道1.6h)", col: "#216E5F", tip: "2026.06：任务时长拉长 48 倍至 1.6h，横跨 2.44 款软件与 31 个本地容器站" },
      { t: 2026.82, lbl: "2.1 (真人轨迹修误杀)", col: "#B84A2E", tip: "2026 下半年：真人录制 Golden Trajectory 排雷修脚本，严格全通率 54.6%" }
    ]},
    { name: "ALE & ASB→TwinLab", sub: "洗坏题 & 38 天补齐 50 题", nodes: [
      { t: 2026.38, lbl: "ALE v1.0 (55职业)", col: "#26547C", tip: "2026.05：300+ 专家按 O*NET 构建 55 职业真实专业软件沙箱" },
      { t: 2026.72, lbl: "ALE v1.1 (锁122题)", col: "#B84A2E", tip: "2026 秋：砍掉 30 道不稳题锁定 122 题，Epoch 白盒审计仍查出 22 题脚本漏判" },
      { t: 2026.78, lbl: "ASB 0.1 (6题)", col: "#B2620F", tip: "2026.10.13：多轮预算实验双闸门设计超前，但因仅 6 题方差过大遭大厂 0% 采用" },
      { t: 2026.90, lbl: "TwinLab (52题)", col: "#216E5F", tip: "2026.11.20：仅隔 38 天扩充至 52 题跨过稳定线，拉齐四家同测最高仅 45.0 分" }
    ]}
  ],

  // 8. Benchmark Diagnostic Scorecard (8 checks)
  checks: [
    { id: "c1", pts: 15, title: "题量跨过 50 题统计稳定阈值，且控制在 250 题以内", desc: "规避题量过小（如 ASB 0.1 仅 6 题致单题波动 16.7 分）遭大厂拒用，同时防止千题库单轮复测账单失控。", warn: "统计风险：题量 <50 题（如 ASB 0.1 仅 6 题）会导致单题随机波动超过 15%，无法进入大厂官方发布主表。" },
    { id: "c2", pts: 15, title: "源自生产/科研一线真实脏场景、成交单或代码提交反查（拒绝凭空编题）", desc: "保留真实业务的天然模糊性、脏附件与隐性契约（如 FC 2.0 >40h 重构、RLI $14.4 万真单、OSWorld 脏 VM）。", warn: "寿命风险：合成题或高度结构化的显式短题极易在 6–12 个月内被沙盒 RL 刷穿，且测不出工程边界克制。" },
    { id: "c3", pts: 15, title: "直查底层系统终态 + 双向红线断言（兼顾应改项与禁动项）", desc: "不采信模型表层文字汇报，既核查目标状态变更，也断言无关记录未被删除或污染（封堵 AutomationBench 删行漏洞）。", warn: "验证风险：单向脚本断言极易被模型通过删除整行或硬改状态标记绕过；纯文本/截图裁判易被空洞长文误导。" },
    { id: "c4", pts: 10, title: "并列披露「严格全通率」与「步骤分」，开放交付叠加 Rubric + 盲评双轨", desc: "防止仅报宽松步骤分（OSWorld 89% / ALE 78%）掩盖末步漏保存、0 字节损坏文件等导致整单不可用的致命失误。", warn: "口径风险：仅报步骤平均分会产生 22–35 个百分点的可用性虚高（如 OSWorld 89.3% → 严格全通 54.6%）。" },
    { id: "c5", pts: 15, title: "锁定统一中立 Harness + Harbor 双容器 0700 降权与网络隔离", desc: "消除更换工具箱即掉 18.9 分（TB-Science）或私有外挂无法入榜（RoboDojo ‡）的混淆，物理隔离做题与改卷环境。", warn: "归因风险：未锁定中立 Harness 将无法区分模型权重能力与脚手架增益（如 SWE-sweep 换框架分数相差 3 倍）。" },
    { id: "c6", pts: 10, title: "入库前走完「可执行验算 + 真人 Golden Trajectory + 对抗 Agent 红队攻题」", desc: "规避 HLE 29% 错题墙、SWE-Verified 59% 测试缺陷与 ALE 22 题脚本漏判，上线前主动暴露查表与篡改测试漏洞。", warn: "质量风险：缺乏可执行参考解、真人通关轨迹与红队攻题，高分段必然撞上 20%–59% 的考卷自身错题天花板。" },
    { id: "c7", pts: 10, title: "公私混合分层（公开 5–10 题供调试 + >50% 私有留出集定期换血）", desc: "兼顾外部研究者的环境可复现与白盒审计（避免 RLI 被判信息不足），同时以私有留出集抵御预训练语料污染。", warn: "治理风险：全公开题库极易被定向合成数据刷爆，纯私有黑盒又难以通过第三方审计建立行业公信力。" },
    { id: "c8", pts: 10, title: "强制绑定「准确率 × 单题真账单 × 多轮稳定性 Pass^5」与真实物理时钟", desc: "揭示同档得分下 14–47 倍的成本差异、超难题 5 次仅碰对 1 次的偶然性，以及具身仿真器暂停时间带来的虚高。", warn: "落地风险：脱离单题成本、Pass^5 稳定性与 Wall-Clock 实时时钟，极易被高价慢思考档位刷出无法落地的纸面高分。" }
  ]
};
