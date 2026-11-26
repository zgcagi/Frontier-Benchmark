<div align="center">

# 2026 前沿 AI 评测的范式变化

[![Live Blog](https://img.shields.io/badge/Live%20Blog-在线阅读-1F4E79?style=for-the-badge)](https://zgcagi.github.io/Frontier-Benchmark/)
[![Data Verified](https://img.shields.io/badge/Data%20Verified-2026.11.23-2D6A5B?style=for-the-badge)](https://zgcagi.github.io/Frontier-Benchmark/#sec-refs)
[![Core Sample](https://img.shields.io/badge/Benchmarks-16%20Core%20%2B%203%20Legacy-333333?style=for-the-badge)](https://zgcagi.github.io/Frontier-Benchmark/#sec-explorer)

**作者：魏楚扬**（基于 *Frontier Benchmark Seminar* 调研，与朱明航合讲、何纪言主持）

[在线阅读全文](https://zgcagi.github.io/Frontier-Benchmark/) | [四大赛道案例](https://zgcagi.github.io/Frontier-Benchmark/#part-2) | [构建统计](https://zgcagi.github.io/Frontier-Benchmark/#part-3) | [16+3 交互检索台](https://zgcagi.github.io/Frontier-Benchmark/#sec-explorer) | [60 条一手来源](https://zgcagi.github.io/Frontier-Benchmark/#sec-refs)

</div>

---

## 文章结构

全文采用单页技术博客排版（纯白纸面、无外部构建与字体阻塞，正文约 1.1 万字，文末附 16+3 交互式统计检索台）：

1. **一、旧 Benchmark 失效与新一代评测特征**：从 2026.10.26 至 10.27 Artificial Analysis v5.0 隔夜换榜切入，梳理旧静态基准饱和与三大实验室换轨，归纳新基准的四个核心特征（长程无标准答案任务、模糊需求与真实脏上下文、扩展至科研/办公/物理场景、评测对象转为 `Model x Harness x Environment`）。
2. **二、四大前沿赛道案例拆解**：按统一技术粒度拆解 9 个代表性基准（检验能力与设定 / 验证机制 / 实测与失败样本 / 能力边界）：
   - **代码与系统工程**：`FrontierCode 2.0`、`FrontierSWE v2`
   - **科学研究**：`TB-Science 0.1`、`De novo binder design (24h)`
   - **白领办公与真实劳动**：`AutomationBench v1.0.6`、`AA-Briefcase v1.1`、`Remote Labor Index (RLI)`
   - **桌面操控与三维物理世界**：`OSWorld 2.1`、`RoboDojo` 与 `Embodied First Exam`
3. **三、面向真实需求与能力目标的 Benchmark 构建统计**：紧跟第二节 9 个案例及 `HLE`、`ALE v1.1`、`Terminal-Bench 4.1`、`ASB 0.1 / TwinLab`、`BioMysteryBench`、`Chartography`、`SWE-bench Pro` 等典型样本，从能力需求映射表出发，展开题量规模（75% 收敛 50-250 题）、更新周期、机构协作与 44% 公私混合策略、构建与复测成本、验证可靠性与 Harbor 防作弊隔离五个维度的横向统计。
4. **四、评测环境与模型、Harness 的共同进化**：结合 FireFlash 与 PostTrainBench 说明评测环境向 RL 训练场的自然延伸，并以 `Model x Harness x Environment` 共同进化收束，强调 Env 持续直指真需求、真场景才是创造价值的核心。
5. **五、16+3 基准检索台、核验底表与一手来源**：包含与统计条严格同源的 16+3 四维筛选检索台与右侧完整档案抽屉、五大家族版本演进泳道、10 榜中美跟进矩阵、八厂核验底表及 60 条核验一手链接。

<p align="center">
  <img src="assets/hero-preview.png" alt="2026 前沿 AI 评测的范式变化 首页预览" width="100%" />
</p>

<p align="center">
  <img src="assets/charts-preview.png" alt="构建统计与 16+3 检索台预览" width="100%" />
</p>

---

## 仓库结构与本地预览

```text
Frontier-Benchmark/
├── index.html          # 单页长文主体 + 交互图表 + 16+3 检索台与 60 条一手溯源
├── styles.css          # 极简纯白技术博客排版（零外部字体阻塞）
├── data.js             # 单一数据源（截至 2026-11-23，16 核心 + 3 旧代）
├── charts.js           # 纯原生 SVG 图表、机制图、动态统计与检索抽屉
├── assets/             # GitHub 首页预览图
├── .nojekyll           # GitHub Pages 静态直通配置
└── README.md           # 仓库说明
```

无需安装任何依赖，克隆后双击 `index.html` 或启动本地静态服务即可预览：

```bash
git clone https://github.com/zgcagi/Frontier-Benchmark.git
cd Frontier-Benchmark
python3 -m http.server 8080
```

---

## 引用格式 (BibTeX)

```bibtex
@misc{wei2026frontier_benchmark_paradigm,
  title        = {Paradigm Shifts in Frontier AI Evaluation (2026)},
  author       = {Wei, Chuyang},
  year         = {2026},
  month        = {November},
  url          = {https://zgcagi.github.io/Frontier-Benchmark/},
  howpublished = {Frontier Evaluation Notes (based on Frontier Benchmark Seminar with Zhu, Minghang)},
  note         = {Verified through 2026-11-23 across 16 core frontier benchmarks and 60 primary sources}
}
```
