<div align="center">

# 当考卷开始反击
### 2026 前沿 AI 评测的崩塌、重构与权力转移

[![Live Essay](https://img.shields.io/badge/Live%20Essay-深度主文%20(15min)-B84A2E?style=for-the-badge)](https://zgcagi.github.io/Frontier-Benchmark/)
[![Live Atlas](https://img.shields.io/badge/Interactive%20Atlas-16%20榜数据库%20%26%20决策器-26547C?style=for-the-badge)](https://zgcagi.github.io/Frontier-Benchmark/atlas.html)
[![Data Cutoff](https://img.shields.io/badge/Data%20Verified-2026.11.23-216E5F?style=for-the-badge)](https://zgcagi.github.io/Frontier-Benchmark/atlas.html#sec-refs)

**作者：魏楚扬**（基于 *Frontier Benchmark Seminar* 调研，与朱明航合讲、何纪言主持）

[📖 阅读深度主文 (index.html)](https://zgcagi.github.io/Frontier-Benchmark/) · [🗂️ 打开 16 榜交互图鉴 (atlas.html)](https://zgcagi.github.io/Frontier-Benchmark/atlas.html) · [🧭 造榜权衡决策器](https://zgcagi.github.io/Frontier-Benchmark/atlas.html#sec-advisor) · [🔗 60 条一手溯源](https://zgcagi.github.io/Frontier-Benchmark/atlas.html#sec-refs)

</div>

---

## 核心导览

从 **Artificial Analysis v5.0** 一夜之间拉开 26 分差距切入，我们系统拆解了 2026 年代码工程、科学研究、白领办公与三维物理世界四个前沿赛道的 **16 套核心代表基准**（严格对齐一手核验底表，外加 3 套旧代对照）。整套发布采用 **「锋利主文 + 独立交互图鉴」** 双页架构，零构建依赖、零外部字体阻塞，支持在线访问与本地离线秒开。

### 1. 深度主文 · [index.html](https://zgcagi.github.io/Frontier-Benchmark/)（约 8,500 字 · 15 分钟）

- **引子｜一夜之间多出来的 26 分**：严格对比 10.26 → 10.27 同批 6 款模型隔夜换榜分化与 Anthropic S-1 38 分钟财务月结现场。
- **一、裁判本身正在崩塌**：SWE-bench 换商业私仓照样一年刷穿；正面解剖 **MSW**（单测全绿却因跳过 `finally` 判 0）与 **PostHog**（高思考档删 `posthog.api` 反跌至 1/5）镜像真题；揭开 **HLE** 对抗筛题富集 29%–46% 错题与 **BLE** 白盒审出 AutomationBench **71%** 纯代码脚本缺陷的残酷真相。
- **二、戳破高分的三层水分**：内置纯 SVG 机制图拆解 `Model × Harness × Environment` 乘积方程（Neon 换框架 3×、TB 放宽超时 +15 分）、四层水分剥离图（OSWorld 步骤分 89.3% → 严全通 54.6%、蛋白模拟 85.1% → 独立 CRO 湿测 22%–35%），以及严格拆轴的 2D→3D 与 **Embodied First Exam** 拔掉暂停键 63% 归零断崖。
- **三、Eval 即 RL，也是生意与战场**：FireFlash 对齐 Harness 白涨 +4.4 分、SGLang 单卡 B200 20h 三道零 LLM 物理裁判、2026 真实考场攻防实录（“这感觉不道德”→`.gold` 回放、161KB 伪科学查表、ExploitGym 逃逸），以及 **Harbor 双容器物理切场 + `root 0700` 降权** 架构图。
- **四、诚实算清代差两本账**：明确区分 **3–6 个月追得平的**（开源底座、Harness 对齐、短中程沙盒 RL：TB 4.1 差 6.1 分、AutoBench 差 9 分）与 **3–6 个月绝对追不平的**（20h 长程工程习惯、40h+/题闭卷重题与百卡时 B200 账单、内部 90% 代码自迭代的 RSI 飞轮），收束于「读榜七问」与 2027 三个硬方向。

<p align="center">
  <img src="assets/hero-preview.png" alt="深度主文首页预览" width="100%" />
</p>

---

### 2. 独立交互图鉴 · [atlas.html](https://zgcagi.github.io/Frontier-Benchmark/atlas.html)（单一数据源工作台）

- **实时动态统计（零手写穿帮）**：阵营分布与开放形态由 `data.js` 中 16 套核心前沿基准实时计算——**44% 公私混合 (7/16)** 为最大主流、**63% 含私有防线 (10/16)**、**75% 收敛于 50–250 题黄金区 (12/16)**，打破“高校全开源、商业全闭源”误区。
- **16 + 3 多维筛选台与右侧解剖抽屉**：支持按赛道、阵营、开放形态、裁判方式四维筛选与列排序，点击任意基准或从主文徽章直跳（`atlas.html#bench=<id>`）自动滑出完整题源、防作弊防线与踩坑档案。
- **五大家族版本演进泳道 · 10 榜中美跟进矩阵 · 办公双口径落差图**。
- **三约束「造榜权衡决策器」**：按「团队类型 × 预算上限 × 验证对象」实时生成最小可行造榜配方、对标样板与最易踩死的三个历史大坑。
- **中美八厂（海外三强 × 国产五厂）核验底表 + 60 条核验可点击一手来源链接**。

<p align="center">
  <img src="assets/charts-preview.png" alt="Frontier Benchmark Atlas 交互图鉴预览" width="100%" />
</p>

---

## 仓库结构与本地预览

```text
Frontier-Benchmark/
├── index.html          # 深度主文（约 8,500 字 · 3 张 SVG 机制图 + 4 组交互数据图）
├── atlas.html          # 独立交互图鉴（动态统计 · 16+3 筛选台与抽屉 · 造榜权衡决策器 · 60 条一手溯源）
├── data.js             # 单一数据源（截至 2026-11-23，严格对齐 16 核心 + 3 旧代）
├── charts.js           # 纯原生 SVG 图表、机制图与交互引擎（零第三方 JS 依赖）
├── styles.css          # 暖纸感排版系统（零外部字体阻塞，支持全断点响应）
├── assets/             # GitHub 首页预览图（hero-preview.png / charts-preview.png）
├── .nojekyll           # GitHub Pages 静态资源直通配置
└── README.md           # 仓库说明与在线入口
```

本地预览直接双击 `index.html`，或运行：

```bash
git clone https://github.com/zgcagi/Frontier-Benchmark.git
cd Frontier-Benchmark
python3 -m http.server 8080
```

访问 `http://localhost:8080`（主文）与 `http://localhost:8080/atlas.html`（图鉴）。

---

## 引用格式 (BibTeX)

```bibtex
@misc{wei2026frontier_eval_notes,
  title        = {When the Exam Strikes Back: Collapse, Reconstruction, and Power Shift in 2026 Frontier AI Evaluation},
  author       = {Wei, Chuyang},
  year         = {2026},
  month        = {November},
  url          = {https://zgcagi.github.io/Frontier-Benchmark/},
  howpublished = {Frontier Benchmark Research Essay \& Interactive Atlas (based on Frontier Benchmark Seminar with Zhu, Minghang)},
  note         = {Data verified through 2026-11-23 across 16 core frontier benchmarks and 60 primary sources}
}
```
