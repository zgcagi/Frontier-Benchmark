/* ==========================================================================
   FRONTIER BENCHMARK RESEARCH REPORT · VERIFIED STRUCTURED DATASET
   Data Cutoff: 2026-11-23 | Sources: Seminar v6.7 & Master Explorer
   ========================================================================== */

window.REPORT_DATA = {
  // 1. AA v4.3.2 (10.26) -> v5.0 (10.27) Overnight Swap & Score Shift
  aaOvernight: [
    { model: "GPT-6 Astra", group: "us", v4: 54, v5: 58, delta: "+4", note: "逆势涨 4 分：私有代码合入与高难科学终端计算优势显著" },
    { model: "Claude Opus 5.5", group: "us", v4: 57, v5: 56, delta: "-1", note: "稳居第一梯队（11 月 Fable 5.2 与 Gemini 4 Neon 进一步升至 60–65 分）" },
    { model: "Gemini 4 Carbon", group: "us", v4: 53, v5: 51, delta: "-2", note: "海外闭源主力换榜前后整体稳定在 50–58 分区间" },
    { model: "Kimi K3.1 Pro", group: "cn", v4: 55, v5: 46, delta: "-9", note: "位居国产榜首，但换入三项新基准后单日回落 9 分" },
    { model: "Qwen4 Max (11月追测)", group: "cn", v4: 52, v5: 43, delta: "-9", note: "HLE-Diamond 44.9% 居国产第一，失分集中在私有代码与科研终端" },
    { model: "DeepSeek V4.1 Flash", group: "cn", v4: 45, v5: 32, delta: "-13", note: "失分集中于 FC 2.0、TB-Science 0.1 与 HLE-Diamond 三项新增权重" },
    { model: "GLM-5.3", group: "cn", v4: 45, v5: 32, delta: "-13", note: "24 小时内与榜首分差由 12 分拉大至 26 分" }
  ],

  // 2. US vs China 10-Benchmark Adoption Matrix (3-6m ago -> Nov 2026)
  adoptionMatrix: [
    { name: "FrontierCode v1→2.0", tag: "私有合入", track: "代码", oai: "nov:11月 · GPT-6.2", ant: "early:★ 夏秋 · Opus 4.7→5.5", goo: "nov:11月 · Neon", cnOld: "gap:未接入", cnNow: "gap:空缺 (仅AA代测)", gapNote: "实测相差 17–30 分（含原生 Harness 与通用代测框架差异）" },
    { name: "FrontierSWE v2", tag: "20h 工程", track: "代码", oai: "early:★ 夏秋 · GPT-6", ant: "early:★ 夏秋 · Opus 5/5.5", goo: "early:★ 夏秋 · Argon", cnOld: "gap:未接入", cnNow: "gap:空缺", gapNote: "实测相差 40 分（69.9% vs 30.2%）" },
    { name: "DeepSWE / SWE-sweep", tag: "长程修库", track: "代码", oai: "nov:11月 · GPT-6.2", ant: "nov:11月 · Opus 5.5", goo: "early:★ 夏秋 · Argon→Neon", cnOld: "gap:未接入", cnNow: "cnok:✓ 已官测 DeepSWE", gapNote: "开源可自跑基准跟进迅速" },
    { name: "Terminal-Bench 4.0/4.1", tag: "开源容器", track: "终端", oai: "early:★ 夏秋 · 5.6/6", ant: "early:★ 夏秋 · Opus 5/5.5", goo: "early:★ 夏秋 · Argon→Neon", cnOld: "gap:停留在 TB 2.1", cnNow: "cnok:✓ 已官测 TB 4.0", gapNote: "分差已追至 6 分（Kimi 59.7% vs 65.8%）" },
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
    { model: "Claude Fable 5.2", score: 69.9, cost: 169, costLabel: "$169/题", hours: "12–16.5h", cn: false, note: "试错 2–3h 指标无改善即果断回滚换路" },
    { model: "GPT-6 Astra", score: 65.5, cost: 1030, costLabel: "$1,030/题", hours: "15.2h", cn: false, note: "花费为 Carbon 的 16.6 倍，得分仅多 4.3 分" },
    { model: "Gemini 4 Neon", score: 62.4, cost: 96, costLabel: "$96/题", hours: "13.8h", cn: false, note: "与 GLM-5.3 单题花费相当，解决率高出一倍" },
    { model: "Gemini 4 Carbon", score: 61.2, cost: 62, costLabel: "$62/题", hours: "12.6h", cn: false, note: "高性价比中档主力基线" },
    { model: "Claude Haiku 5.5 (小模型)", score: 43.8, cost: 21, costLabel: "$21/题", hours: "11.4h", cn: false, note: "轻量小模型跑赢高价大参数开源旗舰，证明瓶颈在沙盒 RL" },
    { model: "GLM-5.3 (最强开源)", score: 30.2, cost: 97, costLabel: "$97/题", hours: "17.1h", cn: true, note: "耗时更久、花费相当，解决率仍差一倍" },
    { model: "Kimi K3", score: 25.9, cost: 110, costLabel: "$110/题", hours: "18.5h", cn: true, note: "0 分题亦硬耗 18h+，缺乏有效快照回退机制" },
    { model: "Qwen3.8-Max", score: 17.8, cost: 51, costLabel: "$51/题", hours: "17.8h", cn: true, note: "遇错倾向给单用例打补丁，而非重构底层架构" },
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
    { stage: "Chartography\n2D 静态真图 (禁工具)", fable: 73.4, gpt: 71.0, gemini: 72.5, note: "三家分差 <2.5 分，原生高分辨率专业图纸识读已集体过关" },
    { stage: "OSWorld 2.1\n步骤分 (Partial)", fable: 89.3, gpt: 79.5, gemini: 80.4, note: "按 10–15 个 DAG 子节点给步骤分，表面看似接近饱和" },
    { stage: "OSWorld 2.1\n严格全通 (Strict)", fable: 54.6, gpt: 44.0, gemini: 45.8, note: "要求整单零失误后骤降 35 分：93% 步数只顾往前点，回查不足 7%" },
    { stage: "RoboDojo Sim\n3D 双臂仿真 (停表)", fable: 64.9, gpt: 29.8, gemini: null, note: "Fable ‡ 依赖私有外挂与仿真停表，达 Astra 的 2.18 倍；官方真机最高仅 33.9%" },
    { stage: "First Exam\n实时时钟 (非 0 题占比)", fable: 37.0, gpt: 37.0, gemini: 37.0, note: "拔掉仿真暂停键后，63.0% (287/456) 核心题三家全得 0 分" }
  ],

  // 6. Full 18 + 3 Benchmark Master Dataset (verified against v6.7 & Explorer)
  benchmarks: [
    {
      id: "fc2", name: "FrontierCode 2.0", track: "code", trackLabel: "2.1 代码与系统",
      org: "Cognition (Devin) + 20+ 维护者", orgType: "prod", orgLabel: "产品公司",
      release: "2026.06 → 2026.10", releaseYear: 2026.8, evolution: "1.0(6月) → 1.1(7月) → 2.0(10月)",
      countStr: "132 私有题", countNum: 132, complexity: 3.3, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["code", "rubric"], evalShort: "自适应单测 + 501 条维护者否决红线",
      source: "取自 36+ 个大型开源仓的真实合并 PR，由 20 余位原仓库核心维护者每题投入 >40h 深度改写（80% 实现偏离历史公开 PR，阻断预训练背题）",
      funnel: "四步校准：维护者重写架构 → 题面砍掉 2/3 冗余还原真实口语工单 → mutagent 自动对齐标识符防止写死变量名 → Devin Hack Report 红队排雷（误判率较 SWE-Pro 下降 81%）",
      verifier: "放弃「跑过单测即给分」：先过 501 条一票否决 Blocker（抓资源泄漏、越界删公开接口与破坏二进制兼容），再跑自适应单测与维护者 Rubric",
      score: "Fable 5.2 最高仅 50.2%（开满 3.15× 思考预算反跌 2.0 分）；GPT-6.2 Sol 单题仅花 $1.29 即拿 43.8%",
      cost: "单题 $1.29–$55.9（同档得分成本相差 14 倍）；后台挂 Trajectory Scanner 实时拦截偷搜 GitHub 原 PR",
      lesson: "拉长推理预算反而容易诱发模型“手痒”删改公开接口；真实代码合并考的是隐性契约意识与不越界克制。",
      detail: {
        cases: [
          "MSW 流式取消泄漏案：JavaScript 生成器若只置空引用等 GC 回收，会静默跳过 finally 清理块；常规 CI 单测全绿，但因漏调 iterator.return() 触发维护者否决红线被判 0 分（Opus 5.5 五个思考档 0/5 全军覆没）。",
          "PostHog Android 越界删接口案：模型在高思考档下嫌弃旧类设计冗余，顺手把整个文件删掉重构，直接破坏 posthog.api 对外公开契约，导致 low 档 5/5 全过、high/max 档反跌至 1/5。"
        ],
        antichat: "80% 题目与历史公开 PR 结构脱钩；容器仅允许查阅常规开发文档，一旦 Trajectory Scanner 在 500 轮轨迹中抓到搜索上游原 Issue 或 PR，整题当场清零。",
        adoption: "海外三大实验室 2026.11 官方发布主表全员必测硬交集 + AA v5.0 编程维度核心权重。"
      }
    },
    {
      id: "fswe2", name: "FrontierSWE v2", track: "code", trackLabel: "2.1 代码与系统",
      org: "Proximal ($3 亿估值数据初创)", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.04 → 2026.09", releaseYear: 2026.7, evolution: "v1(17题) → v2(汰4增21共34题 · 20h)",
      countStr: "34 题 (20h)", countNum: 34, complexity: 5.1, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "专用确定性程序 Verifier（零 LLM 裁判）",
      source: "横跨系统底层实现、GPU 算子极限调优（如 SGLang 单卡 B200 推理提速）、科学计算、纯视觉控制与新优化器设计的 20 小时开放大工程",
      funnel: "统一锁定 proximus 脚手架（把 submit 改为保存保底快照，消除早期交卷早退）+ 停机销毁切入纯净改卷容器 + 事后人工 QA 逐条复核 20h 全量轨迹",
      verifier: "连出题人都没有固定标准补丁；每题按连续客观程序指标打分（如 SGLang 设 0.95 贪心解码精度门控 + 随机前缀加盐防缓存 + A→B→A 同卡三明治夹测）",
      score: "Fable 5.2 69.9%（跑 12–16.5h）；Neon 花 $96 拿 62.4%，而同价位国产 GLM-5.3 花 $97 跑 17.1h 仅得 30.2%",
      cost: "全量 170 轮光 Token 就烧掉 $2.9万–$17.6万（单题相差 47 倍）；每道题还需独占顶配 B200 达 100 卡时",
      lesson: "20 小时大工程拉开的不是算力或时长差距，而是遇错修底层架构、自造隐藏集测泛化，以及改差立刻回退换路的工程直觉。",
      detail: {
        cases: [
          "SGLang 单卡 B200 20h 提速：起跑线已把 FP8 + MTP 投机解码 + CUDA Graph 全部开满作为 0 分基线，调参数毫无作用，必须改底层调度源码或手写 GPU 算子；改卷采用 A→B→A 同卡夹测抵消云端硬件热波动。",
          "FFmpeg 视频缩放模块用 Zig 语言 SIMD 向量指令从头重写；优化器设计题给 7 个公开训练任务供探索，交卷后在 3 个从未见过的隐藏网络架构上实测收敛速度对比 AdamW。"
        ],
        antichat: "全程断公网离线运行；官方曾抓获 GPT-5.6 Sol 在思维链写下“这感觉不道德”后仍回放 .gold 文件、Muse 硬编码 161KB 字典并套伪科学模块掩护、以及用 chr() 拼接 /tmp 藏数据和走 Modal root Unix socket 偷读 /root/tests；最终靠停机断电清零 + root 0700 降权 + 测试加盐 + 全量轨迹审计封堵。",
        adoption: "长程软件工程代表标尺；Proximal 凭借这套「评测考场 + 后训练 RL 沙盒」同源基建在种子轮拿下 $3 亿估值。"
      }
    },
    {
      id: "tb41", name: "Terminal-Bench 4.1", track: "code", trackLabel: "2.1 代码与系统",
      org: "Stanford & Laude Institute", orgType: "acad", orgLabel: "高校联盟",
      release: "2025.05 → 2026.11", releaseYear: 2026.85, evolution: "1.0(80)→2.0(89)→2.1→3.0(红队)→4.0→4.1(66题)",
      countStr: "89 → 66 题", countNum: 66, complexity: 3.6, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "Harbor 双容器隐藏 pytest / 活系统终态检验",
      source: "100 余位开源贡献者共建的真实 Linux 命令行任务（银行 COBOL 老系统迁 Python、内核编译、容器配网与 Nginx/Git 静默排障）",
      funnel: "单题 >3h 严审：40 条实现 Rubric 初筛 + TF-IDF 去重 → oracle 必过 / no-op 必败 → 上线前专派红队 Agent 跑 Cheat Trials → 4.0/4.1 主动删掉饱和与坏题缩容至 66 道硬题",
      verifier: "开源 Harbor 五件套双容器底座：答题容器内无 tests/，交卷后方挂载隐藏 pytest 对运行中活系统做端到端状态核验，并按轨迹扣减作弊分",
      score: "Copilot Fusion 71.2%；Opus 5.5 / Fable 5.2 65.8%；国产 Kimi K3.1 Pro 达 59.7%，已追至距海外第一梯队 6 分以内",
      cost: "TB 4.0 官榜总计耗资 $116K（单跑 Fable 5.2 需 $16.5K，DeepSeek V4.1 仅 $0.2K 相差 80 倍）；4.1 靠预先归档容器产物实现 11,550 个 trial 的 $0 离线重评",
      lesson: "把基准当生产软件养：主动砍掉刷烂与不稳题（89→66 题）、放宽 8h 超时挤掉装包噪声，再用产物归档实现修 Verifier 后的 $0 重评。",
      detail: {
        cases: [
          "Git+Nginx 静默失败排障：git push 全程返回成功无报错，但 8080 端口实际返回 404，专门检验模型交卷前会不会主动跑 curl 与查日志做端到端自检。",
          "超时噪声复盘：TB 2.0 仅仅把紧绷的超时限制放宽 3–5 倍，同一权重的 GPT-5.2 就凭空涨了 6–15 分，证明早期很多失分只是死在装包或编译太慢。"
        ],
        antichat: "TB 3.0 起把对抗性 Cheat Trials 焊进 CI 流水线；严格拦截篡改容器内 pytest、全选打印赌漏检，并先后查处 OB-1（私改 30m 超时并往二进制塞加密答案）、Pilot（偷塞 tests/）与 ForgeCode（curl 拉现成答案写进 AGENTS.md）等人为刷榜行为。",
        adoption: "中美旗舰模型共同主战场 + AA v5.0 编程核心榜；其抽离出的 Harbor 框架已成为横跨代码、科研与具身评测的事实容器标准。"
      }
    },
    {
      id: "hle", name: "HLE → HLE-Diamond", track: "sci", trackLabel: "2.2 科研与推理",
      org: "Scale AI × CAIS", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.01 → 2026.09", releaseYear: 2026.7, evolution: "征题(24.09)→原版(25.01)→Verified/Rolling→Diamond(26.09)",
      countStr: "7万 → 2,500 → 核心集", countNum: 2500, complexity: 1.3, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code", "rubric"], evalShort: "精确短答匹配 / 等价核验 + 置信度校准误差",
      source: "拿出 $50 万奖金池（前 50 题 $5,000/题）与 Nature 署名权，向全球 50 国 1,000 位学者征集 70,000+ 道百学科博士级闭卷难题（含 14% 专业识图题）",
      funnel: "录用率 3.6%：投稿后台焊死在职旗舰模型当守门员（只要有 1 个 AI 做对当场退稿，7 万砍剩 1.3 万）→ 两轮博士盲审定稿 2,500 题 → Diamond 版洗掉近三成错题与格式歧义",
      verifier: "76% 改为无法瞎蒙的精确短答题，并强制模型每题自报 0–100% 把握度以计算校准误差（专门惩罚不会做还报 90% 把握的盲目自信）",
      score: "原版被 29% 错题墙卡死在 74%（Fable 闭卷 73.2% vs 带搜索代码工具仅 74.2%）；Diamond 清洗后海外三强跃升至 71.3%–80.2%，国产 Qwen4 Max 以 44.9% 领跑",
      cost: "单轮闭卷推理花费不高，但前期 $50 万悬赏加后期近两年的多轮专家清洗投入极其高昂",
      lesson: "“AI 做不出才留下”的逆向筛选规则，会把出题教授自己算错、审稿博士看走眼的错题优先富集进考卷，导致高分段必撞 30% 错题天花板。",
      detail: {
        cases: [
          "错题墙实证：FutureHouse 在 2025.07 逐题复核 321 道生化纯文本题，抓出 29% ± 3.7% 标准答案直接错误或误导；Epoch AI 抽检 48 题查出 46% 硬伤并判为 Flawed。",
          "代表跨学科真题：破译古罗马时期帕尔米拉语残碑拓片、计算蜂鸟尾下压肌内特殊籽骨支撑的肌腱对数。"
        ],
        antichat: "相继推出 Verified、Rolling（从留存池动态替补审计错题）与 Diamond 清洗集，剔除错标与格式争议题，仅保留多轮专家零分歧高难题。",
        adoption: "HLE-Diamond 已被 AA v5.0 与海外三强 2026.11 官方发布报告纳为通用学术推理核心主榜。"
      }
    },
    {
      id: "biomy", name: "BioMysteryBench", track: "sci", trackLabel: "2.2 科研与推理",
      org: "Anthropic Research", orgType: "lab", orgLabel: "前沿大厂自建",
      release: "2026.04 (10月底停用)", releaseYear: 2026.3, evolution: "首发 76 常规+23 超难 → 定稿 90 题 → 转交 Vals AI",
      countStr: "99 → 90 题", countNum: 90, complexity: 2.8, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["code"], evalShort: "唯一事实真值精确匹配 (独立连跑 5 轮)",
      source: "直接取自底细已知的真实测序（FASTQ/bigWig）、晶体与质谱原始数据文件，彻底抹掉文件名、物种名与论文编号，只考写代码能算出的唯一客观事实",
      funnel: "99 题删掉 9 道歧义定稿 90 题；强制出题人先交一份能跑出答案的 Validation Notebook 可执行验算代码，再经 5 位人类专家盲测分级（分出 76 道常规题与 23 道专家全败超难题）",
      verifier: "8GB Linux 容器（2–4 CPU / 200 步 / 4h），网络黑白名单允许查 BLAST/NCBI/UniProt 公共基因字典，但严禁检索 GEO/SRA 编号与原论文；每题独立连跑 5 遍",
      score: "常规集逼近 90%（Fable 5.2 全卷 83.7%）；但在 23 道人类专家全挂的超难题上，模型大多在 5 次运行中仅碰运气对 1 次 (13.0%) 或 2 次 (8.7%)",
      cost: "拿到相近高分的单题账单相差 15 倍：GPT-6.1 Sol 仅 $0.37 (8m51s) vs Fable 5.2 $1.68 (4m08s) vs Argon $5.71 (近 40m)",
      lesson: "强制出题人交可执行验算代码，才能确信连 5 位专家全挂的超难题也是零错题；常规集饱和后主动退役并转交第三方比拼成本效率，堪称基准生命周期管理范本。",
      detail: {
        cases: [
          "四道代表真题：给千人匿名全基因组数据写代码溯源指定样本亲生父母、凭匿名 bigWig 信号峰分布区分 ChIP 实验组与 Input 对照组、从批次矩阵抓出标签贴反的两个样本、用临床 FASTQ 查明感染病毒。",
          "课本先验反噬现象：模型背熟了常见生物学套路，有时能在超难题上猜中方向，但在常规题上反而常因过早套用模板而输给老老实实看原始数据的人类专家。"
        ],
        antichat: "仅公开 5 题供调通环境，90 道正式题锁入实名门禁严禁用于训练；容器网关层直接封禁原论文数据库检索。",
        adoption: "Anthropic 内部已于 2026 年 10 月底正式退役该榜，转交第三方平台 Vals AI 作为生信成本效率基准。"
      }
    },
    {
      id: "tbs", name: "TB-Science 0.1", track: "sci", trackLabel: "2.2 科研与推理",
      org: "Stanford & Laude Institute", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.08", releaseYear: 2026.6, evolution: "70 题首发 → 持续纳新扩至 96 题",
      countStr: "920 → 70(96) 题", countNum: 70, complexity: 3.3, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "断网双容器纯 pytest 脚本判分",
      source: "一线科研人员提交的五大门类（生命 19 / 物理 17 / 数统 17 / 工程 9 / 地球 8）真实命令行科学计算任务",
      funnel: "录用率 7.6%：920 份学者提案 → 386 个 PR → 40 条 Rubric 初筛 + TF-IDF 去重 + 标准解连跑 5/5 全过 + 空解必 0 分 + 红队 Cheat Trials + 领域专家双审定稿 70 题",
      verifier: "直接复用 Harbor 断网双容器（答题机里根本没有测试脚本，交卷后才把产物搬去改卷容器跑 pytest），纯代码核验计算结果，零主观印象分",
      score: "海外三大厂唯一全部必测的科研标尺（GPT-6.2 77.1% / Mythos 75.3% / Fable 74.6% / Neon 70.5%）；但同一 Fable 5.2 换用公共简装 Mini-SWE-agent 后直接从 74.6% 掉到 55.7%（立掉 18.9 分）",
      cost: "单题动辄消耗数千万至 1.3 亿 Token；Vals AI 实测 Argon 单题花 $44.90，比 GPT-6.2 Sol ($2.53) 贵了近 18 倍，得分反而低 14 分",
      lesson: "直接复用成熟的 Harbor 双容器底座 + <8% 严苛录用率，能让一套新榜迅速成为三大厂共识；但跨厂看分必须盯紧它配了什么工具箱、烧了多少钱。",
      detail: {
        cases: [
          "四道跨学科真题：对齐相隔 17 年的冰川卫星立体照片 (GeoTIFF) 与激光测高数据算海拔变化、用 9 年水文观测表写 R 语言全局优化程序校准 15 个水文参数、给易过热失控的强放热化工反应釜写安全采样温控程序、在非线性 Lorenz-96 混沌气象系统里反推外部干扰力与时钟偏差。"
        ],
        antichat: "答题容器全程物理断网，从根源上掐断检索外部论文；入库前强制参考解连跑 5/5 稳定通过，彻底排除数值计算随机抖动。",
        adoption: "海外三大厂 2026.11 官方发布主表唯一共同采用的科研榜 + AA v5.0 & Vals AI 全收录。"
      }
    },
    {
      id: "asb", name: "Autonomous Science Bench 0.1", track: "sci", trackLabel: "2.2 科研与推理",
      org: "西北大学 (Northwestern)", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.10.13", releaseYear: 2026.78, evolution: "0.1 首发（因仅 6 题致方差过大，大厂采用率 0%）",
      countStr: "仅 6 战役 (×3轮)", countNum: 6, complexity: 4.2, access: "open", accessLabel: "全开源",
      evalTags: ["code", "phys"], evalShort: "虚拟实验室账本（Discovery × Learning 双闸门）",
      source: "取自 DeepMind（核酸酶）、西北大学（生物传感器）、Sargent Lab（丙烯电催化数字孪生）、辉瑞（铃木偶联）、Caltech（析氧催化）与 NIST（磁性薄膜）6 篇高引论文，只给 <11% 候选空间预算考多轮排实验",
      funnel: "逐题排查“不做实验光靠统计规律刷分”的偏置——如传感器题发现原论文后期数据光数氨基酸突变个数就能刷到 NDCG@50=0.729，遂强制把最终测试集锁死在首轮无偏初始池中",
      verifier: "基于 Harbor 将 AI 容器与存真值的 Lab Service 容器物理隔离；AI 分 3–4 批提交选点清单、后台记入 Ledger 账本扣额度返读数；交卷同时考核 Discovery Gate（实测抓出足够多高活性变体）与 Learning Gate（最终模型把未测隐藏变体排对名次），两关全过才记 1 分",
      score: "GPT-6 Astra 72.2% ($190) / Opus 5.5 66.7% ($173)；144 场运行写代码调接口完赛率 100%，但 113 次未通关中高达 48.7% 栽在“只过一关”（局部微调与全局探索顾此失彼）",
      cost: "跑满 18 场总花费约 $173–$190，但各模型各自绑了不同私有工具箱（Codex / Claude Code / mini-SWE）且未测 Gemini",
      lesson: "最典型的造榜反面教材：多轮预算实验 + 双闸门的设计非常超前，却因「仅 6 题致错 1 题跳 16.7 分 + 工具箱未拉齐 + 全取公开论文缺隐藏集」，导致三大厂与第三方总榜采用率全部为 0%。",
      detail: {
        cases: [
          "两类典型的顾此失彼：在西北大学生物传感器战役（3 批 × 10 = 30 次预算）里，60.0% (12/20) 的失败死于撒网太散没捞到顶尖配方，挂掉 Discovery Gate；而在丙烯催化数字孪生战役（3 批 × 20 = 60 次）里，84.2% (16/19) 的失败死于只盯局部好配方微调、对未探索空间失明，挂掉 Learning Gate。"
        ],
        antichat: "Lab Service 容器独立记账扣减送检额度，绝不许 AI 偷翻完整答案表；彻底封死只偷背原论文 1 个冠军配方的投机路径。",
        adoption: "三大厂官方报告与 AA/Vals 采用率均为 0%；其统计方差短板直接促成了 38 天后扩充至 52 题的 TwinLab-Bench。"
      }
    },
    {
      id: "twinlab", name: "TwinLab-Bench", track: "sci", trackLabel: "2.2 科研与推理",
      org: "高校联合团队 (arXiv:2611.26248)", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.11.20", releaseYear: 2026.89, evolution: "距 ASB 发布仅隔 38 天迅速扩充至 52 题补位",
      countStr: "52 题 (跨过稳定线)", countNum: 52, complexity: 4.3, access: "open", accessLabel: "全开源",
      evalTags: ["code", "phys"], evalShort: "虚拟实验室多轮实验寻优评分 (百分制)",
      source: "顺着预算受限的多轮实验规划思路，一口气将跨学科虚拟实验室任务扩充至 52 个独立科研战役",
      funnel: "针对 ASB 0.1 仅 6 题导致统计误差近 ±20% 的硬伤，严格跨过工业界 ≥50 题统计稳定门槛，并统一测试接口拉齐四家旗舰同台",
      verifier: "多轮实验预算分配 + 虚拟实验室反馈闭环 + 百分制综合寻优度量",
      score: "首次把 Fable 5.2、Opus 5.5、GPT-6.1 Sol 与 Gemini 4 Carbon 拉到同一标准下同台实测，全场最高的 Fable 5.2 也仅考出 45.0 / 100 分",
      cost: "52 题多轮交互，刚好卡在统计置信度达标与工业界可承受复测成本的平衡点上",
      lesson: "好范式必须配上够格的题量规模：一旦跨过 50 题稳定线并拉齐统一接口，多轮实验规划的真实水平立刻水落石出（最高仅 45 分，远未饱和）。",
      detail: {
        cases: ["从 ASB 0.1（10月13日，6题，0%采用）到 TwinLab-Bench（11月20日，52题，四家旗舰同测），仅隔 38 天的快速接力，直观展示了工业界选榜对统计方差的硬性门槛。"],
        antichat: "通过 52 道跨领域任务平滑单题随机波动，锁定统一评测接口消除脚手架偏差。",
        adoption: "2026.11.20 发布后迅速成为多轮自主科研规划赛道的标准补位标尺。"
      }
    },
    {
      id: "biobasics", name: "BioBasicsBench", track: "sci", trackLabel: "2.2 科研与推理",
      org: "OpenAI × Ligo Biosciences", orgType: "lab", orgLabel: "前沿大厂自建",
      release: "2026.11.06", releaseYear: 2026.85, evolution: "100 题 100% 闭源首发（仅公布自家 7 款模型成绩）",
      countStr: "100 题 (闭源底片)", countNum: 100, complexity: 2.0, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["rubric"], evalShort: "三位湿实验博士盲审 Rubric 采分点均值 (5 轮)",
      source: "酶工程公司 Ligo 的一线实验员直接从真实实验记录本里挑出 100 道日常排错题（克隆/蛋白/核酸/显微镜/酶活 5 类），把没裁边的电泳胶原图、反光培养皿照片和移液视频等 7 类原件直接甩给 AI",
      funnel: "100% 内部未发表实验台原始底片（零网络污染）+ 每道题与评分点均经三位湿实验博士背靠背独立盲审定稿",
      verifier: "按细化采分点算步骤平均分（Mean Rubric Reward，每题连跑 5 遍取均值）；专门设置采分项奖励「看清伪影污染、果断声明废片无法下结论」",
      score: "GPT-6 Astra 考到 66.7%（较前代大涨 23 分，单题输出反而缩短一半至 4,704 tok）；注意 66.7% 是步骤平均分，不代表能独立接管实验台",
      cost: "看图越准废话越少：老模型 GPT-5.2 看不清胶图刻度，每题狂写 27,620 tok 长篇推理去猜却只拿 31.2%；Astra 看准原图后仅用 4,704 tok 即拿 66.7%",
      lesson: "面对真实的实验台脏原图，基础视觉看没看清决定了推理上限——图看错了，思维链拉得再长也是白费；同时必须专门考核「识破废片不瞎猜」。",
      detail: {
        cases: [
          "高光案例：空白培养皿无菌落，GPT-5.6 Sol 误判实验成功；GPT-6 Astra 敏锐认出皿边手写贴着 LB Kan50（卡那霉素）标签，与实验方案要求的氨苄青霉素冲突，当场判定对照组作废；见到荧光显微镜通道串色污染也能果断拒下结论。",
          "翻车案例：在挑菌落 PCR 电泳胶时，死套课本上“条带大=插入成功”的常见经验，无视旁边真实阳/阴性对照泳道指明的 5/9/10 号真阳性，误挑 4/6/7/8 号废菌落；数反光培养皿菌落时把琼脂反光白点当菌落，总数多算 12%，导致整批后续实验白做。"
        ],
        antichat: "100% 未发表实验台原始影像杜绝预训练泄漏；三位博士独立盲审锁定 Rubric（缺点是题库完全闭源，目前仅测了 OpenAI 自家 7 款模型）。",
        adoption: "OpenAI 内部湿实验看图排错核心标尺，暂未开放 Claude 与 Gemini 同台评测。"
      }
    },
    {
      id: "binder", name: "De novo binder design (24h)", track: "sci", trackLabel: "2.2 科研与推理",
      org: "Anthropic × Twist / Adaptyv", orgType: "lab", orgLabel: "前沿大厂自建",
      release: "2026.08 → 2026.11", releaseYear: 2026.86, evolution: "8月试点 → 11月 15 靶点 × 1,320 序列湿实验闭环",
      countStr: "15 靶点 (1,320序列)", countNum: 15, complexity: 5.0, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["phys"], evalShort: "计算重折叠模拟 + Twist/Adaptyv 独立湿实验实测",
      source: "给定 15 个真实疾病靶点蛋白的三维结构（如泛素连接酶亚基 RBX1）与约 1.6 万字操作说明，配齐开源蛋白设计软件，只给 1 张 GPU 限时 24 小时、全程无人插手从零设计新蛋白",
      funnel: "AI 自主挑结合凹槽、调 RFdiffusion/BindCraft 生成、用 Boltz/AlphaFold 重折叠筛出 30 条由 50–120 个氨基酸组成的全新候选序列 → 将汇总的 1,320 条序列隐去生成来源，寄往两家独立外包实验室真做出来测",
      verifier: "双阶闭环验收：第一阶算电脑模拟重折叠通过率（报告上的 85.1%）；第二阶由 Twist Bioscience 在细胞里真实合成表达蛋白、Adaptyv Bio 用生物物理仪器实测能不能粘住靶点",
      score: "24 小时全自主设计在 15 个靶点里成功做出 14 个真能粘住靶点的新蛋白（RBX1 亲和力极强达 3.9 nM，远超以往 10%–15% 常规水平），但成功率从电脑模拟的 85.1% 掉到了真实湿实验的 22%–35%（前排优选 49%）",
      cost: "单靶点 24h H200 GPU 算力 + 1,320 条全新蛋白序列的商业 CRO 外包合成与生物物理仪器测定账单",
      lesson: "电脑模拟器里的 85.1% 高分，寄到真实实验室就会掉到 22%–35%——唯有把生成序列隐去来源寄给独立第三方 CRO 盲测合成，才能彻底堵死模型针对计算打分函数的过拟合。",
      detail: {
        cases: ["全程无人干预的 24 小时里，Agent 自己修代码报错、自己发现重折叠粘不紧并换结合位点重做，最终交出自然界原本不存在的全新功能蛋白，同时严格区分“拆掉安全锁测能力上限（Mythos 85.1% / Opus 82.6%）”与“装上安全锁测高危拦截”。"],
        antichat: "隐去序列来源交由 Twist 与 Adaptyv 两家独立商业实验室盲测合成，物理世界的结合亲和力无法靠任何提示词或脚本技巧欺骗。",
        adoption: "Anthropic 科学研发与生物安全评估旗舰实证，立下了「计算生成 → 独立商业湿实验盲测」的行业终极标杆。"
      }
    },
    {
      id: "autobench", name: "AutomationBench v1.0.6", track: "off", trackLabel: "2.3 办公与劳动",
      org: "Zapier", orgType: "prod", orgLabel: "产品公司",
      release: "2026.04 → v1.0.6", releaseYear: 2026.5, evolution: "4月上线 → v1.0.6（经 BLE 白盒审计推动双向断言修复）",
      countStr: "657 私有题", countNum: 657, complexity: 3.1, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["code"], evalShort: "47 款 SaaS 数据库终态断言（目标分 / 严格全通）",
      source: "提炼自 Zapier 数百万条真实企业跨软件自动化工作流，在本地沙盒完整克隆了包含 47 款常用 SaaS（CRM、邮箱、表格、工单等）与约 500 个 REST API 的模拟公司",
      funnel: "657 道私有计分主集（覆盖 6 大部门）；第三方机构 BLE 白盒逐题审计其官方公开的 100 道判分脚本，发现仅 19 道合格、10 道存疑、高达 71 道确认有缺陷（71% 缺陷率）",
      verifier: "禁止反问人类，仅给 Search 与 Execute 两个工具；无视聊天框文字汇报，直接跑代码核查 47 个后台数据库的最终状态；AA 拆为主榜目标分（0 违规下子目标得分）与严格全通率（100% 达标且 0 违规）两档口径",
      score: "同一套 657 题两档口径差 22–34 分：严格全通率 Neon 56.6%（目标分 79.3%）、Fable 51.6%（76.4%）、GPT-6.2 50.7%（77.2%）；国产新代 Qwen4 Max (47.2%/72.6%) 与 Kimi K3.1 Pro (46.0%/73.3%) 已从旧代落后 30 分猛追至距榜首仅差 9 分",
      cost: "本地克隆环境彻底告别真网站弹验证码与封号；GPT-6.2 单题仅 $0.83（比 Fable $4.60 便宜 5 倍多），DeepSeek V4 Flash 仅 $0.04/题；MiniMax M3.1 目标分 72.5% 却在严全通掉到 38.1%（落差 34.4 分），暴露末步收口漏项",
      lesson: "纯代码查数据库拆穿了模型“嘴上说办好了”的虚假自信；但业务一复杂（47 个软件），判分脚本自己也极易出现放水、错杀和被删行钻空子——必须用双向断言同时锁死应改项与禁动项。",
      detail: {
        cases: [
          "BLE 白盒审计公开集 100 题拆解（71 题确认缺陷）：① 放水 28 题（只查库里有记录，会计借贷方向写反或发票漏算 $1,000 照样判满分）；② 错杀 18 题（题干没规定列名，脚本却写死隐藏列名，合法解被冤判 0 分）；③ 钻空子 9 题（不真发邮件只把草稿状态改成 SENT，或直接 delete 删掉整行记录骗过断言）；④ 参考答案/脚本直接写错 15 题、其他 1 题。"
        ],
        antichat: "657 题计分主集全私有防背题；本地克隆 47 款软件实现 100% 确定性复现；AA 官方 286 配置全量拉齐双口径。",
        adoption: "Anthropic 与 Google 官方报告必测 + AA v5.0 办公维度核心权重。"
      }
    },
    {
      id: "ale", name: "Agents' Last Exam v1.1", track: "off", trackLabel: "2.3 办公与劳动",
      org: "UC Berkeley RDI + 300+ 专家", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.05 → 2026 秋", releaseYear: 2026.75, evolution: "v1.0(5月) → v1.1(砍30道不稳题锁定122题并迁入Linux)",
      countStr: "1,500+ → 122 活跃题", countNum: 122, complexity: 4.2, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "确定性脚本核查专业软件交付件（步骤分 / 严格全通）",
      source: "UC Berkeley 联合 300 多位行业专家，严格对照美国 O*NET 职业分类表覆盖 13 大行业、55 个非体力白领职业（影视特效、机械 CAD/NX 结构件、跨表财务、法务等），工时从半天小工单一直拉到专家需干一周的大型工程",
      funnel: "规划 5,000 题、已收 1,500+ 专家真实项目题 → 秋季 v1.1 主动砍掉 30 道重型软件易崩的不稳定题，锁定 122 道活跃题（录用率 8.1%）并迁入 Linux/CPU 沙箱 → Epoch AI 白盒审计仍查出 22 道题验分脚本漏判，打上 Flawed 标签",
      verifier: "把 AI 关进装有素材与真实专业软件（After Effects、Siemens NX、Linux 工具栈）的虚拟机，零主观打分，全靠确定性代码脚本 + 隐藏参考成品自动核验交付文件终态",
      score: "厂商发布页最爱报 74.5%–78.3% 的「步骤平均分（Rubric Partial）」，但一算整单 100% 达标的「严格全通率」立刻腰斩至 45.2%–47.5%（差出 30 分）；且一碰到人类专家要干一周以上的顶级大项目，各家通过率直接断崖归零",
      cost: "各家绑着自家工具箱参赛（GPT 配 Codex、Claude 配 Claude Code、Gemini 配 ALE-Claw，其中 Claude 耗时与 Token 账单显著更高）",
      lesson: "给 55 个专业行当的复杂软件产出写「零漏洞自动改卷脚本」极难（v1.1 公开后即被 Epoch 审出 22 道漏判）；读榜必须先把 78% 的步骤分挤回 47% 的严格全通率。",
      detail: {
        cases: ["难度分层真相：半天内能干完的常规工单 AI 表现尚可，但面对人类需数天至一周完成的复杂工程交付，全员几乎归零；Epoch 审出的 22 道脚本漏判（未做完也判过）经轨迹复核确认主流模型并未恶意利用。"],
        antichat: "全开源接受社区与 Epoch AI 白盒代码审计；隐藏参考成品比对防止表面敷衍交差。",
        adoption: "OpenAI 与 Google 官方重点关注，目前学界规模最大的跨职业真专业软件评测沙箱。"
      }
    },
    {
      id: "briefcase", name: "AA-Briefcase v1.1", track: "off", trackLabel: "2.3 办公与劳动",
      org: "Artificial Analysis", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.06 (v1.1)", releaseYear: 2026.45, evolution: "v1.0 → v1.1（纳入 AA v5.0 办公维度核心权重）",
      countStr: "4 项目 · 91 题", countNum: 91, complexity: 3.9, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["rubric"], evalShort: "客观 Rubric 核查公式数据 + 评审团匿名盲评 Elo",
      source: "领域专家耗时数千小时打造 4 家模拟公司的真实办公网盘：里面混堆着数千份历史财报底表、合同草稿、互相打架的新旧公司制度，以及超过 25,000 条跨周 Slack 群聊记录",
      funnel: "资深战略咨询与财务专家设计 91 道多周综合业务大活，要求必须生成并提交带公式链的 Excel 模型 (.xlsx)、董事会汇报 PPT (.pptx) 或战略备忘录 (.docx/.pdf) 三类真实商业成品",
      verifier: "首创「硬指标 × 盲评」双轨验收：轨道一用客观 Rubric（0–100%）像审计员一样逐项核对 Excel 关键单元格数字、公式引用与必备结论；轨道二用匿名盲评 Elo（0–3000，Crowd-BT）像老板一样把隐去署名的 PPT 与备忘录并排盲比洞察深度与排版可读性",
      score: "「活干对」与「汇报写得顺眼」居然不是同一个冠军：Fable 5.2 赢下客观硬指标第一（66.1%，比 Opus 高近 5 分），但盲评 Elo 反而是 Opus 5.5（1800 Elo）与 Sonnet 5.5（~1811）反超 Fable（1785）！然而要求全部细项 100% 达标的完美交付仅 ~3%，且有 31/91 题全员得分低于 50%",
      cost: "在数千份碎片文档与 2.5 万条群聊噪音里大海捞针极度消耗长上下文 Token，不同模型单题账单相差数个数量级",
      lesson: "开放式商业报告既不能只用代码查数字（评不出 PPT 逻辑与排版质感），更不能只搞聊天盲评（会被满篇黑话但核心利润算错 20% 的精美水文骗高分）——双轨拆开才能照出真实能力分化。",
      detail: {
        cases: ["季度财务重算 + 12 页董事会 PPT 真题：要求从杂乱网盘捞出 Q1–Q3 流水表重算损益；最阴险的坑在于财务总监在 Slack 第 1.8 万条群消息里临时改了「欧洲区退货计提规则」，如果模型偷懒只照着网盘里的旧版 PDF 制度算，整张 Excel 和 PPT 结论就全盘皆错。"],
        antichat: "私有网盘题库杜绝预训练泄漏；客观 Rubric 与盲评 Elo 双向锁死，彻底封杀靠写漂亮长文刷榜的 Arena 套路。",
        adoption: "Anthropic 官方报告主打 + AA v5.0 办公维度核心权重。"
      }
    },
    {
      id: "rli", name: "Remote Labor Index (RLI)", track: "off", trackLabel: "2.3 办公与劳动",
      org: "Scale AI × CAIS", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.10 → 2026.11", releaseYear: 2026.1, evolution: "2025.10 首发(最高2.5%) → 2026.11 持续闭卷追踪(41.3%)",
      countStr: "240 真单 (230 私有)", countNum: 240, complexity: 4.4, access: "priv", accessLabel: "私有闭卷",
      evalTags: ["human"], evalShort: "真人行业专家对照人类中标稿二元验收（付款 / 退单）",
      source: "直接掏出 $14.4 万真金白银，向 Upwork 自由职业者买断 240 个真实已结款外包项目（横跨 23 个远程工种、累计超 6,000 小时人类工时，含甲方原始需求包与人类中标交付件）",
      funnel: "剔除需要线下反复开会拉扯需求的订单，留出 10 单公开样题 + 230 单私有计分集，原封不动把甲方夹杂着错别字与脏附件的原始素材包交给 AI",
      verifier: "配齐办公、平面设计、音视频剪辑与 3D/CAD 虚拟桌面，交卷后由同行业真人专家对照人类中标稿，严格按「如果我是甲方，这份成品愿不愿意掏钱收货」做二元验收（错一处致命细节即整单拒付得 0 分）",
      score: "一年内从首发时的最高 2.5% 飙升至 Claude Fable 5.2 的 41.3%（领先 Opus 5.5 的 21.3% 与 GPT-6 Astra 的 20.8% 整整一倍）；国产目前仅 DeepSeek V4.1 Flash (9.6%) 公开在榜",
      cost: "$14.4 万真单买断成本 + 每轮评测高昂的真人同行专家验货账单，周期长、无法高频自跑",
      lesson: "真实商业交付遵循残酷的乘法法则（前 90% 干得再好，最后导出一份 0 字节坏文件照样被甲方全额退单）；但 230 单纯私有防污染的代价，是被 Epoch AI 标为「信息不足」无法外部复核。",
      detail: {
        cases: ["近六成商业外包单被甲方退货，死因集中在四类低级工程品控失误：导出 0 字节损坏文件或乱码格式、只交扁平图漏交设计源文件图层、报告正文结论与附表 Excel 数据自相矛盾、3D 建模或视频剪辑出现穿模与音画不同步。"],
        antichat: "230/240 核心计分单严锁私有库防背题；真人同行按真金白银付款标准验货，任何钻脚本空子的技巧在真人眼里一秒露馅。",
        adoption: "Anthropic 商业经济落地最硬核实证；读榜切记：41.3% 只是预先打包好的单次外包单验收率，绝不等于当前模型能直接替掉 41.3% 的全职白领岗位。"
      }
    },
    {
      id: "charto", name: "Chartography", track: "emb", trackLabel: "2.4 桌面与物理",
      org: "Surge AI", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2026.07 → 2026.08", releaseYear: 2026.6, evolution: "7月首榜(最高45%) → 8月论文 → 11月三强集体冲破 73%",
      countStr: "100 专业真图", countNum: 100, complexity: 1.5, access: "open", accessLabel: "全开源",
      evalTags: ["rubric"], evalShort: "三位同业专家误差线 + 自动判分 (每题独立连跑 20 遍)",
      source: "执业医师、量化研究员、机械与化工工程师日常真正盯着看的 12 大行业 100 张高密专业图纸（流体力学 Moody 摩擦系数图、控制工程双轴 Bode 图、肿瘤 KM 生存曲线、多层叠加 K 线等），零合成假图",
      funnel: "三步严筛：一线行家供真图 → 3 位同专业专家背靠背独立读数，为 51 道连续读数题逐题划定人类合理容差区间 → 至少难倒 2 款在职旗舰模型方可入库",
      verifier: "严格禁用代码裁剪与放大镜工具（no tools），逼模型纯粹亮出底座原生视觉分辨率；复合多小问错一处整题归零、模棱两可拒答直接判 0；每道题独立连跑 20 遍（全轮 2,000 次采样）挤干随机蒙对水分",
      score: "短短 4 个月内从 7 月首榜最高 45.0% 跃升至 71.0%–75.1%（GPT-6.2 Sol 75.1% / Fable 73.4% / Carbon 72.5%，三家分差 <2.5 分），证明 2D 静态高密专业看图已集体过关",
      cost: "性价比极高：全轮 2,000 次单轮问答仅需 ~$60–$260，免容器 30 分钟即可跑完，非常适合作为多模态底座原生视力的日常回归测试",
      lesson: "只有拔掉代码放大镜外挂、再把每道题连跑 20 遍挤干随机猜测水分，才能测出多模态底座原生视觉编码器的真实进步。",
      detail: {
        cases: ["前代模型在专业图纸上的三大典型翻车：在 Moody 双对数非线性网格上按等距直尺估算导致数量级全错、在双纵轴 Bode 图上看串相位与幅值曲线、在三维投影等高曲面上把遮挡边界认反。"],
        antichat: "每题 20 轮独立采样取均值彻底消除单次瞎蒙；多小问零容错捆绑计分，且模棱两可拒答直接判 0 分（与 BioBasicsBench 奖励识破废片拒答恰好形成互补）。",
        adoption: "Anthropic 2026.11 官方主表收录，已成为低成本检验原生高分辨率视觉的行业标配。"
      }
    },
    {
      id: "osworld", name: "OSWorld 2.1", track: "emb", trackLabel: "2.4 桌面与物理",
      org: "港大 XLang Lab 等", orgType: "acad", orgLabel: "高校联盟",
      release: "2024.04 → 2026.06", releaseYear: 2026.5, evolution: "1.0(369小题)→Verified(25.07)→2.0(108长流程)→2.1(修脚本)",
      countStr: "369 → 108 题(82本地)", countNum: 108, complexity: 3.6, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "Sub-goal DAG + Python 脚本直查文件系统底层终态",
      source: "一线财务、设计与开发从业者把 1.0 版的 2 分钟单软件小题，重构为 108 道横跨平均 2.44 款桌面软件的复合长工作流（熟练人类中位耗时拉长 48 倍至 1.6 小时），手工预埋脏 VM 快照并自建 31 个本地 Docker 仿真网站",
      funnel: "针对 2.0 初版部分判分脚本过于死板的问题，2.1 版专门组织人类专家逐题录制 Golden Trajectory 真机通关轨迹，顺藤摸瓜修好损坏初始素材、容器端口冲突与假阴性误杀脚本",
      verifier: "把 1.6 小时大任务拆成 10–15 个带依赖关系的 Sub-goal DAG 子节点；绝不靠截图视觉裁判打分，而是用底层 Python 脚本直接扒开 SQL 数据库、Excel 公式树、PNG 透明通道与网页 DOM 核验终态（同步输出 Partial 步骤分与 Strict 严格全通率）",
      score: "发布表常报的 82 道本地题步骤分（Partial）高达 79.5%–89.3%，但一要求整条工作流全对（Strict）立刻腰斩至 44.0%–54.6%（落差达 35 分）；轨迹分析揭示模型 93% 的步数只顾闷头往前点，回查与自我纠错占不到 7%",
      cost: "单题长达 250–318+ 步且每步重传 1080p 全屏截图（单题 $22–$76）；全轮复测需 $1,180–$8,200+ 并依赖支持 KVM 嵌套虚拟化的云服务器集群",
      lesson: "长程桌面 GUI 考卷必须靠真人录制通关轨迹才能把环境死锁和误杀脚本排干净；读榜则必须盯死「1.0-Verified (86%) vs 2.0 完整集 (20.6%) vs 2.1 离线步骤分 (89.3%) vs 2.1 严格全通 (54.6%)」同名四口径的 60 分鸿沟。",
      detail: {
        cases: [
          "三道跨软件真题：从本地 ERP 导出流水进 LibreOffice Calc 透视核算、再去 Writer 排版导出财务月报；在 GIMP 里做多图层抠图保留 Alpha 透明通道，转头进 VS Code 改前端配置并重启本地容器服务；翻遍 Thunderbird 十余封往来邮件拼出权限清单，批量修改 Linux 目录权限——大量失败都栽在最后一步忘了按 Ctrl+S 保存。",
          "去中心化报错死结复盘：团队发现各厂商自跑时遇到坏题倾向于私改本地环境刷分而不提 PR，遂通过公开致谢修题贡献者（如智谱、Kimi 与字节团队参与 Verified 排雷）及强制官榜传轨迹破局。"
        ],
        antichat: "82 道纯 offline 本地闭环题 100% 断网可确定性复现；深入文件系统底层查公式树与二进制属性，界面表面糊弄完全无效。",
        adoption: "海外三大厂 GUI Computer Use 核心公用标尺，桌面操控领域的事实标准。"
      }
    },
    {
      id: "robodojo", name: "RoboDojo (Sim / Real)", track: "emb", trackLabel: "2.4 桌面与物理",
      org: "MIT / 港大 / 清华 / Stanford", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.07 → 2026.11", releaseYear: 2026.6, evolution: "7月首发 → 11.14 官方审计标星移除塞小抄作弊队",
      countStr: "42 仿真 + 18 真机", countNum: 60, complexity: 4.7, access: "open", accessLabel: "全开源",
      evalTags: ["phys"], evalShort: "42 项 Isaac Sim 物理仿真 + 18 项 RealEval 标准化真机考棚",
      source: "基于 Isaac Sim 构建 42 项高保真双臂物理仿真任务（覆盖 5 大维度 24 项原子技能，拒绝换块桌布凑题数）+ 用 1.5m 恒定 LED 灯箱与 3D 打印亚克力定位夹具把物理变量焊死的 18 项 RealEval 真机考棚任务",
      funnel: "XPolicyLab 统一接口通吃仿真与真机；2026.11.14 社区与官方联合代码审计，当场抓获往 Prompt 里塞人工解题步骤小抄的 SOLVE*(75%) 与 Q0*(68.9%) 并标星移出主榜",
      verifier: "考核通用大模型零遥操作微调（Zero-shot）直接读取三路相机画面、输出双臂末端 6-DoF 位姿与夹爪开合；注意：仿真器默认开启 Step-blocking 回合制时间暂停（AI 思考时重力与惯性冻结）",
      score: "Fable 5.2 Sim‡ 报出 64.9%（较 16 天前同权重无外挂版 27.6% 暴涨 37.3 分，达 GPT-6 Astra 29.8% 的 2.18 倍），但两家均未交真机卷；官方 RealEval 真机最高仅 33.9% (SLA-Preview)，而 30 款传统 VLA 一换桌布背景进度分直接暴跌 67%–96%",
      cost: "全轮 API 大模型多图推理 Token + Isaac Sim 8×RTX 4090 GPU 并发物理渲染双烧，单轮约 $1,200–$5,500+",
      lesson: "看到具身仿真高分先找右上角的 ‡ 号（内部私有外挂 + 仿真停表慢思考 + 未上真机）；而视觉域随机化一换桌布就让传统 VLA 暴跌九成，直接撕下了死背特定背景的遮羞布。",
      detail: {
        cases: [
          "三道代表真题：cover_blocks 用不透明杯盖罩住积木后交换位置，考三维空间工作记忆；fasten_screws 考 2mm 容差对准螺孔拧紧与双臂空中接力递工具；solve_equation 要求先看懂桌面积木摆出的缺字算式、心算出缺失数字再去抓对应积木块（30 款传统 VLA 在这道题上全员 <2%）。",
          "视觉域随机化惨案：仅仅换掉桌面木纹材质与灯光角度，传统 VLA 榜首混元 Hy-Embodied-0.5 的进度分就从 22.0 断崖跌到 1.6（跌幅高达 92.9%）。"
        ],
        antichat: "RealEval 用 1.5m 标准恒定灯箱 + 3D 打印夹具焊死真机初始位姿；11.14 官方代码审计严格清退提示词塞小抄违规队伍（OpenRUA 随后亦推动社区封堵仿真器自动退出泄露完成信号的协议漏洞）。",
        adoption: "Anthropic 2026.11 唯一自报具身仿真基准（第三方中立榜 BenchLM 因 Claude 外挂未开源，仅将其列为 Display-only 拒绝排入正式名次）。"
      }
    },
    {
      id: "firstexam", name: "Embodied First Exam", track: "emb", trackLabel: "2.4 桌面与物理",
      org: "西北大学 (Harbor 框架)", orgType: "acad", orgLabel: "高校联盟",
      release: "2026.11", releaseYear: 2026.86, evolution: "2026.11 首发（基于 Harbor 统一打通 35 套独立具身仿真）",
      countStr: "1,156 题 (456 核心)", countNum: 456, complexity: 4.8, access: "open", accessLabel: "全开源",
      evalTags: ["phys"], evalShort: "35 套异构仿真统考：停表回合模式 vs 连续真实物理时钟",
      source: "用 Harbor 统一容器沙盒一次性打通含 RoboDojo 在内的 35 个独立具身评测套件、47 种机器人本体，合成为 1,156 道标准化控制任务",
      funnel: "从中精选 456 道核心题做了一组极其残酷的控制变量对照：模式 A 允许回合制暂停物理时钟（Turn-based） vs 模式 B 拔掉暂停键让真实物理时钟连续流逝（Realtime）",
      verifier: "直接对比同一个大模型在“思考时重力冻结”与“思考时物体照常下落滑动”两种物理时钟下的真实控制成功率",
      score: "允许停表暂停时 GPT-6 Astra 以 34.0% 领跑全卷（开源模型最高仅 9.0%）；一旦拔掉暂停键切回连续真实物理时钟，高达 63.0%（287/456 题）的核心任务上海外三家旗舰全部得 0 分！",
      cost: "横跨 35 套异构物理引擎，全量实时物理仿真对 GPU 渲染吞吐与超低延迟推理链路要求极高",
      lesson: "拔掉仿真器的“时间暂停键”，一举戳破了靠 10–18 秒慢思考大模型（0.1Hz）直接裸控 10–50Hz 实时物理世界的幻想，用硬数据证明真机落地必须走“高层慢思考 + 底层高频小脑”双系统协同。",
      detail: {
        cases: ["0.1Hz vs 50Hz 的物理铁律：在动态抓握、接运动物体与防倾倒任务中，大模型每步花 10–18 秒生成长思维链的工夫，晃动的杯子早已在 0.4 秒内砸翻在桌面上，滑动的目标物体也已在 1.2 秒内滑出机械臂工作半径。"],
        antichat: "用 Harbor 统一沙盒终结了各实验室自选仿真器、自调物理步长的碎片化刷分，并剥离了回合制时间冻结特权。",
        adoption: "2026.11 具身智能大统考标尺，为 Anthropic、OpenAI 与 Google DeepMind 三大实验室的具身技术路线分野提供了决定性的实验判决。"
      }
    },
    // Legacy baselines
    {
      id: "swe_full", name: "[旧代对照] SWE-bench Full / Verified", track: "legacy", trackLabel: "旧代对照",
      org: "Princeton / OpenAI", orgType: "acad", orgLabel: "高校联盟",
      release: "2023.10 → 2024.08", releaseYear: 2024.6, evolution: "Full(2294)→Lite(300)→Verified(500 · 18月刷至83.5%)",
      countStr: "2,294 → 500 题", countNum: 500, complexity: 2.4, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "仓库既有单元测试 (Fail-to-Pass)",
      source: "从 GitHub 12 个热门 Python 公开仓库直接抓取历史 Issue 与对应 PR 的单元测试",
      funnel: "Verified 版请工程师筛掉描述不清题缩至 500 题；但当模型刷上 80% 后，OpenAI 专项审计发现剩下未解出的难题里高达 59.4% 存在测试本身缺陷（其中 35.5% 死于单测写得太窄错杀合法好解，18.8% 偷考题面未提的额外功能）",
      verifier: "在 Docker 容器内跑原仓库既有单元测试（只看 Fail-to-Pass 0/1 结果，既会错杀合法异构解法，也会放行泄漏内存或删接口的烂补丁）",
      score: "Verified 发布 18 个月即被刷至 83.5%（部分官报达 87.6%），2026 年 2 月 OpenAI 率先发文宣布不再评测报告该榜",
      cost: "中低成本（分钟级单仓短修），已彻底退出海外三大厂前沿区分主舞台",
      lesson: "公开老仓库 + 只看 0/1 单测过没过的旧范式，18 个月内必然被刷穿并一头撞上过半的错题天花板。",
      detail: {
        cases: ["scikit-learn-14520 经典冤案：评测单测里写死了原作者当年在 PR 评论区临时商量出的固定报错警告句式，AI 交上来的合法修复仅仅因为警告措辞差了几个词，就被无情判为 0 分。"],
        antichat: "后期 Docker 化改造堵上了早期版本未清理 git log 导致模型直接 git show 翻看历史提交抄答案的漏洞，但无法阻挡预训练语料记住这 12 个知名公开仓。",
        adoption: "上一代代码评测黄金标准，2026 年已全面交棒给 FrontierCode 2.0、FrontierSWE v2 与 Terminal-Bench 4.1。"
      }
    },
    {
      id: "swe_pro", name: "[旧代对照] SWE-bench Pro", track: "legacy", trackLabel: "旧代对照",
      org: "Scale AI", orgType: "data", orgLabel: "数据/评测巨头",
      release: "2025.09", releaseYear: 2025.7, evolution: "2025.09 首发 → 1 年内由 23% 飙升至 93.0%",
      countStr: "1,865 题 (含私仓)", countNum: 1865, complexity: 2.8, access: "hyb", accessLabel: "公私混合",
      evalTags: ["code"], evalShort: "隔离容器多文件单元测试",
      source: "引入 GPL 协议与商业私有代码仓库的跨多文件修改任务，试图靠“藏住代码库”抵御预训练数据污染",
      funnel: "1,865 题大规模题库，但据 OpenAI 与社区复核，其中仍有约 30% 的题目存在测试过窄或环境瑕疵",
      verifier: "隔离容器内运行多文件单元测试（底层验收逻辑仍未跳出“把既有单测凑绿即满分”的旧框框）",
      score: "2025 年 9 月首发时最高仅 23%，短短 1 年内就被 Claude Fable 5.2 刷到 93.0% 宣告饱和",
      cost: "1,865 题体量庞大，全量跑一轮账单昂贵，而头部模型挤在 90%+ 区间已丧失区分度",
      lesson: "只把题库换成私有仓、却不升级底层改卷逻辑（仍靠凑绿单测），在沙盒强化学习的火力下照样撑不过 12 个月。",
      detail: {
        cases: ["为什么藏了私仓还是 1 年刷穿？因为“单仓修 Bug + 0/1 单元测试返回”天然就是最干净的强化学习 Reward，各大实验室在同类开源沙盒里跑大规模 RL 所习得的“凑绿单测策略”，可以直接泛化迁移到私有仓上（印证了 ICML 2026 对 67 套榜的统计结论：纯靠静态私集并不能延长基准寿命）。"],
        antichat: "用商业私仓阻断了预训练直接背原题，但挡不住模型针对浅层单测断言的策略性过拟合。",
        adoption: "海外三大厂在 2026.11 发布主表中已纷纷用 FrontierCode 2.0（501 条维护者否决红线）将其替换。"
      }
    },
    {
      id: "osworld1", name: "[旧代对照] OSWorld 1.0 / Verified", track: "legacy", trackLabel: "旧代对照",
      org: "港大 XLang Lab", orgType: "acad", orgLabel: "高校联盟",
      release: "2024.04 → 2025.07", releaseYear: 2024.3, evolution: "1.0(369题) → Verified(25.07 · 26年中刷至86%)",
      countStr: "369 道 2min 小题", countNum: 369, complexity: 2.2, access: "open", accessLabel: "全开源",
      evalTags: ["code"], evalShort: "单软件单脚本核查文件终态",
      source: "取自技术论坛问答与单个桌面软件内的基础操作指令（熟练人类大约 2 分钟、点 15–30 步就能做完）",
      funnel: "首发前 4 轮验题投入 400 人时；2025.07 推出的 Verified 版又投入数百小时集中修补了约 300 处因外部网站改版、弹验证码或脚本脆弱导致的环境故障，但到 2026 年中已被刷至 86.0% 见顶",
      verifier: "单个软件内 15–30 步点击操作，结束后跑单个脚本检查输出文件状态",
      score: "Qwen3.8-Max 等模型在 Verified 版上已刷到 86.1%（Kimi 与 Qwen 亦超 73%），直接促使港大团队推倒重做耗时拉长 48 倍的 OSWorld 2.0/2.1",
      cost: "成本低廉（单题仅 15–30 步截图交互），如今多被国产模型用作旧版高分宣传口径",
      lesson: "单软件 2 分钟短平快指令在两年内必然刷满；唯有把任务时长拉长 48 倍（1.6 小时）并塞进跨软件脏环境，才能重新拉开代差。",
      detail: {
        cases: ["开创了用真实 Ubuntu 虚拟机快照替代静态网页 DOM 模拟器的 GUI Agent 评测先河；但也因早期各厂商在 1.0-Verified 上报出 73%–86% 高分、在 2.0 完整集上却只有 ~21%，制造了最容易误导读者的同名版本口径差。"],
        antichat: "开源 VM 快照保障复现；智谱、Kimi 与字节跳动工程师曾共同参与 Verified 版的环境排雷与公开致谢。",
        adoption: "前沿主舞台已由 OSWorld 2.0 / 2.1 正式接棒。"
      }
    }
  ],

  // 7. 5-Family Version Evolution Timeline (2023.10 - 2026.11)
  timelineLanes: [
    { name: "SWE 代码家族", sub: "Full → Verified → FC 2.0", nodes: [
      { t: 2023.80, lbl: "Full (2294题)", col: "#26547C", tip: "2023.10：开创真实 GitHub 仓库修 Bug 范式，但早期环境配置极难复现" },
      { t: 2024.30, lbl: "Lite/Docker", col: "#26547C", tip: "2024.04–06：300 题降本 + Docker 容器化并封堵 git log 历史答案泄露" },
      { t: 2024.65, lbl: "Verified (500题)", col: "#B2620F", tip: "2024.08：18 个月刷至 83.5%，OpenAI 审计发现剩余未解题中 59.4% 存在测试缺陷" },
      { t: 2025.72, lbl: "Pro (1865题)", col: "#B2620F", tip: "2025.09：引入商业私仓抗污染，但未换 0/1 单测考法，1 年内即被刷至 93.0%" },
      { t: 2026.32, lbl: "FSWE v1→v2 (20h)", col: "#216E5F", tip: "2026.04→09：拉长至 20 小时开放系统工程（34 题），当前最高 69.9%" },
      { t: 2026.82, lbl: "FC 2.0 (132题)", col: "#B84A2E", tip: "2026.06→10：转向维护者合并标准，501 条一票否决红线把最高分压回 50.2%" }
    ]},
    { name: "Terminal-Bench", sub: "1.0 → 2.0 → 4.1 反向缩容", nodes: [
      { t: 2025.38, lbl: "TB 1.0 (80题)", col: "#26547C", tip: "2025.05：上线 4 天即登 Claude 4 模型卡，开辟真实 Linux 命令行评测赛道" },
      { t: 2025.88, lbl: "TB 2.0 (89题)", col: "#B2620F", tip: "2025.11：抽离开源 Harbor 底座，但 10 个月内由 32.6% 被刷至 84.7%" },
      { t: 2026.55, lbl: "TB 3.0 (红队)", col: "#B84A2E", tip: "2026.07：首次将对抗性 Cheat Trials 红队攻题写入 CI，头部分差由 4.9 拉大至 12.7 分" },
      { t: 2026.88, lbl: "TB 4.1 (缩容66题)", col: "#B84A2E", tip: "2026.08–11：反向删掉饱和与不稳题至 66 题 + 8h 去噪 + 归档产物 $0 重评 11,550 个 trial" }
    ]},
    { name: "HLE 闭卷家族", sub: "2500题 → 错题墙 → Diamond", nodes: [
      { t: 2024.72, lbl: "悬赏征题 ($50万)", col: "#26547C", tip: "2024.09：全球 50 国 1,000 位学者投出 70,000+ 道百学科初稿" },
      { t: 2025.06, lbl: "HLE 原版 (2500题)", col: "#26547C", tip: "2025.01：在职旗舰 AI 守门做对即退稿（录用率 3.6%），但也反向富集了人类错题" },
      { t: 2025.55, lbl: "查出 29% 错题", col: "#B2620F", tip: "2025.07：FutureHouse 审出 29% 生化答案错误，头部模型卡死在 74% 错题墙" },
      { t: 2026.72, lbl: "HLE-Diamond", col: "#B84A2E", tip: "2026.09：经 Verified/Rolling/Diamond 多轮清洗剔除错题，海外三强跃升至 80%+" }
    ]},
    { name: "OSWorld 桌面", sub: "2分钟小题 → 1.6h 跨软件", nodes: [
      { t: 2024.28, lbl: "1.0 (369道2min题)", col: "#26547C", tip: "2024.04：奠定 Ubuntu 真实桌面 GUI 操控评测基准" },
      { t: 2025.55, lbl: "Verified (86%见顶)", col: "#B2620F", tip: "2025.07：修复约 300 处外部环境故障后，于 2026 年中被刷至 86.0% 见顶" },
      { t: 2026.46, lbl: "2.0 (108道1.6h)", col: "#216E5F", tip: "2026.06：任务时长拉长 48 倍至 1.6h，横跨 2.44 款软件与 31 个本地容器站" },
      { t: 2026.82, lbl: "2.1 (真人轨迹修误杀)", col: "#B84A2E", tip: "2026 下半年：真人录制 Golden Trajectory 排雷修脚本，严格全通率 54.6%" }
    ]},
    { name: "ALE & ASB→TwinLab", sub: "洗坏题 & 38 天补齐 50 题", nodes: [
      { t: 2026.38, lbl: "ALE v1.0 (55职业)", col: "#26547C", tip: "2026.05：300+ 专家按 O*NET 构建 55 职业真实专业软件沙箱" },
      { t: 2026.72, lbl: "ALE v1.1 (锁122题)", col: "#B84A2E", tip: "2026 秋：砍掉 30 道不稳题锁定 122 题，Epoch 白盒审计仍查出 22 题脚本漏判" },
      { t: 2026.78, lbl: "ASB 0.1 (6题)", col: "#B2620F", tip: "2026.10.13：多轮预算实验双闸门设计巧妙，但因仅 6 题方差过大遭大厂 0% 采用" },
      { t: 2026.90, lbl: "TwinLab (52题)", col: "#216E5F", tip: "2026.11.20：仅隔 38 天扩充至 52 题跨过稳定线，拉齐四家同测最高仅 45.0 分" }
    ]}
  ],

  // 8. Benchmark Diagnostic Scorecard (8 checks)
  checks: [
    { id: "c1", pts: 15, title: "题量跨过 50 题统计稳定线，且收敛在 250 道重题以内", desc: "避开题量过小（如 ASB 0.1 仅 6 题致单题跳分 16.7%）被大厂拒之门外，同时防止旧式千题库单轮复测账单失控。", warn: "统计方差风险：题量跌破 50 题（如 ASB 0.1 仅 6 题）会导致单题随机波动超过 15%，大厂正式发布主表采用率几乎为零。" },
    { id: "c2", pts: 15, title: "取自生产代码仓、已结款真单或实验台未裁剪原始底片（拒绝凭空合成）", desc: "保留真实工程的口语模糊需求、脏附件与隐性契约（如 FC 2.0 >40h 重写、RLI $14.4 万买真单、BioBasics 脏胶图）。", warn: "快速饱和风险：LLM 合成题或把要求全写死在题面的喂饭短题，极易在 6–12 个月内被沙盒 RL 刷穿，且测不出工程边界克制。" },
    { id: "c3", pts: 15, title: "先写 Verifier 直查系统底层终态 + 双向红线断言（兼查应改项与禁动项）", desc: "无视模型表面文字汇报，直查数据库、公式树或活系统；既验目标变更，也断言无关记录未被删改（封堵 AutomationBench 删行漏洞）。", warn: "验证失真风险：单向脚本断言极易被模型靠删整行或硬改 SENT 状态标记绕过；纯看截图或文本回复则会被漂亮空话骗高分。" },
    { id: "c4", pts: 10, title: "强制并列披露「严格全通率」与「步骤分」，开放交付拆开 Rubric 与盲评", desc: "防止单报宽松步骤分（OSWorld 89% / ALE 78%）掩盖末步忘按 Ctrl+S、导出 0 字节坏文件等导致整单报废的致命伤。", warn: "口径虚高风险：只报步骤平均分会产生 22–35 个百分点的可用性幻觉（如 OSWorld 步骤分 89.3% vs 严格全通 54.6%）。" },
    { id: "c5", pts: 15, title: "提供中立基线 Harness + Harbor 双容器 root 0700 降权与网络黑白名单", desc: "消除换工具箱即掉 18.9 分（TB-Science）或私有外挂不开源（RoboDojo ‡）的归因混淆，将答题机与改卷机彻底物理切开。", warn: "归因与越权风险：未锁定中立 Harness 将分不清是模型变强还是脚手架加分（SWE-sweep 换框架差 3 倍）；单容器易遭 Socket 越权偷卷。" },
    { id: "c6", pts: 10, title: "入库前跑完「Oracle 5/5 必过 + 空解必 0 + 真人通关轨迹 + 红队 Cheat Trials」", desc: "用出厂可执行验算、真人 Golden Trajectory 与奉命作弊的红队 Agent 提前排雷，杜绝 HLE 29% 错题墙与 161KB 查表漏洞。", warn: "错题天花板风险：缺了可执行参考解、真人通关录轨与红队攻题，高分段必然撞上考卷自身 20%–59% 的坏题墙（Harbor-Index 最难题 1/3 是坏题）。" },
    { id: "c7", pts: 10, title: "公私分层 + 语义化版本与容器产物归档（实现修 Verifier 后的 $0 离线重评）", desc: "公开 5–10 题供调环境、保留 >50% 私有或动态隐藏集防污染；归档每个 trial 容器产物以支持 TB 4.1 式 $0 离线重评与 5/5 饱和退役。", warn: "维护腐化风险：全公开题库易被定向刷爆，纯私有黑盒又难过第三方白盒审计；不归档产物则修一次脚本就要重烧数万美元跑榜费。" },
    { id: "c8", pts: 10, title: "强制绑定「准确率 × 单题真账单 × 连跑 5 轮 Pass^5」并拔掉仿真时间暂停键", desc: "照出同分下 14–47 倍的成本悬殊、超难题 5 次只蒙对 1 次的偶然性，以及具身仿真冻结重力慢思考带来的虚假繁荣。", warn: "落地脱节风险：脱离单题美元账单、Pass^5 稳定性与 Wall-Clock 连续物理时钟，极易被高价慢思考档位刷出无法上真机的纸面高分。" }
  ]
};
