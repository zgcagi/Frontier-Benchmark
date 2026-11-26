# Frontier Benchmark Research Blog (2026.11)

**Benchmark Is All You Need? — 前沿 AI 评测的范式转向、造榜经济学与 RSI 时代的共同进化**

一套零构建依赖、可直接离线打开或一键部署至 GitHub Pages / Vercel 的交互式研究长文网站。

## 目录结构

- `index.html` — 旗舰长文主体（约 1.2–1.5 万字，含左侧目录 ScrollSpy、右侧边注 Sidenotes、折叠 Deep-Dive 案例卡、8 组交互图表/工作台、国产五厂与海外三强附录底表、33 条可点击一手来源与 BibTeX）
- `styles.css` — 暖纸感实验室研究报告设计体系（融合 Anthropic Research / Thinking Machines *Connectionism* / Epoch AI 排版）
- `data.js` — 截至 2026.11.23 的核验结构化数据（16+3 套代表基准完整档案、AA v5.0 隔夜换榜数据、10 项前沿新榜跟进矩阵、代码成本 Pareto、办公双口径落差、具身分水岭与 8 项造榜体检项）
- `charts.js` — 纯原生 SVG 交互图表、筛选排序大表、右侧解剖抽屉与实时体检器逻辑（无第三方 JS 依赖）

## 本地预览

直接用浏览器双击打开 `index.html`，或在当前目录运行：

```bash
python3 -m http.server 8080
```

访问 `http://localhost:8080`。

## 一键部署

### GitHub Pages
1. 将本目录推送至 GitHub 仓库（或放入仓库的 `docs/` 目录）。
2. 在仓库 `Settings → Pages` 中将 Source 指向对应分支与目录，保存即可上线。

### Vercel
```bash
npx vercel --prod
```
（无需配置 build command，直接按静态站部署。）
