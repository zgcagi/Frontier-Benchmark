/* ==========================================================================
   FRONTIER BENCHMARK RESEARCH · CHARTS, MECHANISM DIAGRAMS & ATLAS UI (v2.0)
   Pure SVG + Vanilla ES6 · Zero external dependencies · Dynamic SSOT stats
   ========================================================================== */

(function () {
  const D = window.REPORT_DATA;
  if (!D) return;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ------------------------------------------------------------------------
     0. TOOLTIP ENGINE
     ------------------------------------------------------------------------ */
  const tip = $("#svg-tooltip");
  function bindTooltips(selector, getHtml, onClick) {
    $$(selector).forEach(el => {
      el.addEventListener("mouseenter", () => {
        if (!tip) return;
        tip.innerHTML = getHtml(el);
        tip.style.display = "block";
      });
      el.addEventListener("mousemove", e => {
        if (!tip) return;
        const x = Math.min(window.innerWidth - 356, e.clientX + 14);
        const y = Math.min(window.innerHeight - 130, Math.max(12, e.clientY - 12));
        tip.style.left = x + "px";
        tip.style.top = y + "px";
      });
      el.addEventListener("mouseleave", () => {
        if (tip) tip.style.display = "none";
      });
      if (onClick) {
        el.addEventListener("click", () => onClick(el));
      }
    });
  }

  /* ------------------------------------------------------------------------
     1. READING PROGRESS BAR + TOC SCROLLSPY + SIDENOTES + BIBTEX
     ------------------------------------------------------------------------ */
  function initReadingChrome() {
    const bar = $("#read-progress");
    const pctEl = $("#toc-pct");
    const tocLinks = $$(".toc-link");
    const headings = tocLinks
      .map(a => {
        const href = a.getAttribute("href") || "";
        if (!href.startsWith("#")) return null;
        const id = href.slice(1);
        return { id, link: a, el: document.getElementById(id) };
      })
      .filter(x => x && x.el);

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, Math.max(0, (scrollTop / docH) * 100)) : 0;
      if (bar) bar.style.width = pct.toFixed(1) + "%";
      if (pctEl) pctEl.textContent = Math.round(pct) + "%";

      if (headings.length) {
        let current = headings[0];
        const offset = 120;
        for (const h of headings) {
          if (h.el.getBoundingClientRect().top <= offset) current = h;
        }
        tocLinks.forEach(a => a.classList.remove("active"));
        if (current) current.link.classList.add("active");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    $$(".sn-ref").forEach(ref => {
      ref.addEventListener("click", () => {
        const note = document.getElementById(ref.dataset.sn);
        if (note) note.classList.toggle("open");
      });
    });

    const copyBtn = $("#copy-bibtex");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const code = $("#bibtex-code");
        if (!code) return;
        navigator.clipboard.writeText(code.textContent.trim()).then(() => {
          const old = copyBtn.textContent;
          copyBtn.textContent = "已复制 BibTeX";
          setTimeout(() => (copyBtn.textContent = old), 1800);
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     2. CHART 1 · AA OVERNIGHT SWAP DUMBBELL (Strictly 10.26 -> 10.27, 6 models)
     ------------------------------------------------------------------------ */
  function renderAAOvernight() {
    const host = $("#chart-aa-overnight");
    if (!host) return;
    const rows = D.aaOvernight;
    const W = 900, rowH = 44, padL = 175, padR = 120, padT = 44, padB = 40;
    const H = padT + rows.length * rowH + padB;
    const xMin = 24, xMax = 64;
    const toX = v => padL + ((v - xMin) / (xMax - xMin)) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    svg += `<rect x="${toX(50)}" y="${padT - 8}" width="${toX(64) - toX(50)}" height="${rows.length * rowH + 8}" fill="#EBF2F7" opacity="0.55"/>`;
    svg += `<text x="${toX(57)}" y="${padT - 15}" text-anchor="middle" font-size="11.2" font-weight="700" fill="#26547C">海外闭源稳守区 (50–64)</text>`;
    svg += `<rect x="${toX(28)}" y="${padT - 8}" width="${toX(48) - toX(28)}" height="${rows.length * rowH + 8}" fill="#FAEDE8" opacity="0.45"/>`;
    svg += `<text x="${toX(38)}" y="${padT - 15}" text-anchor="middle" font-size="11.2" font-weight="700" fill="#B84A2E">国产 24h 回落区 (32–46)</text>`;

    [25, 30, 35, 40, 45, 50, 55, 60].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT - 6}" x2="${x}" y2="${H - padB}" stroke="#DFD8CA" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 18}" text-anchor="middle" font-size="11.2" fill="#7E776C">${t}</text>`;
    });

    svg += `<defs>
      <marker id="arr-down" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#B84A2E"/></marker>
      <marker id="arr-up" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#216E5F"/></marker>
    </defs>`;

    rows.forEach((r, i) => {
      const y = padT + i * rowH + rowH / 2;
      const x4 = toX(r.v4), x5 = toX(r.v5);
      const isUp = r.v5 >= r.v4;
      const col = r.group === "us" ? "#26547C" : "#B84A2E";
      const lineCol = isUp ? "#216E5F" : (r.group === "cn" ? "#B84A2E" : "#6E8EA8");

      if (i > 0) {
        svg += `<line x1="10" y1="${padT + i * rowH}" x2="${W - 10}" y2="${padT + i * rowH}" stroke="${i === 3 ? "#CEC5B4" : "#EFEAE0"}" ${i === 3 ? 'stroke-dasharray="5,4" stroke-width="1.2"' : ""}/>`;
      }

      svg += `<g class="aa-row" data-tip="<b>${r.model}</b><br>10.26 (v4.3.2)：<b>${r.v4}</b> → 10.27 (v5.0)：<b>${r.v5}</b> (${r.delta})<br>${r.note}" style="cursor:pointer;">`;
      svg += `<rect x="0" y="${padT + i * rowH}" width="${W}" height="${rowH}" fill="transparent"/>`;
      svg += `<text x="${padL - 14}" y="${y + 4}" text-anchor="end" font-size="12.8" font-weight="700" fill="${col}">${r.model}</text>`;

      const offset = isUp ? -7 : 7;
      if (Math.abs(x5 - x4) > 10) {
        svg += `<line x1="${x4}" y1="${y}" x2="${x5 + offset}" y2="${y}" stroke="${lineCol}" stroke-width="2.6" marker-end="url(#${isUp ? "arr-up" : "arr-down"})"/>`;
      } else {
        svg += `<line x1="${x4}" y1="${y}" x2="${x5}" y2="${y}" stroke="${lineCol}" stroke-width="2.4"/>`;
      }

      svg += `<circle cx="${x4}" cy="${y}" r="5.5" fill="#FFFFFF" stroke="#847D72" stroke-width="2"/>`;
      svg += `<text x="${x4 + (isUp ? -11 : 11)}" y="${y - 8}" text-anchor="middle" font-size="10.6" fill="#7E776C">${r.v4}</text>`;
      svg += `<circle cx="${x5}" cy="${y}" r="6.5" fill="${col}" stroke="#FFFFFF" stroke-width="2"/>`;
      svg += `<text x="${x5}" y="${y + 18}" text-anchor="middle" font-size="11.4" font-weight="700" fill="${col}">${r.v5}</text>`;

      const pillBg = isUp ? "#E6F3F0" : (r.group === "cn" ? "#FAEDE8" : "#F3EFE6");
      const pillFg = isUp ? "#216E5F" : (r.group === "cn" ? "#B84A2E" : "#5F594F");
      svg += `<rect x="${W - padR + 16}" y="${y - 12}" width="88" height="24" rx="12" fill="${pillBg}"/>`;
      svg += `<text x="${W - padR + 60}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="${pillFg}">${r.delta} 分</text>`;
      svg += `</g>`;
    });

    svg += `<circle cx="${padL}" cy="${H - 8}" r="5" fill="#FFFFFF" stroke="#847D72" stroke-width="2"/>`;
    svg += `<text x="${padL + 10}" y="${H - 4}" font-size="11.2" fill="#5F594F">10.26 旧版 v4.3.2</text>`;
    svg += `<circle cx="${padL + 150}" cy="${H - 8}" r="5.5" fill="#26547C"/>`;
    svg += `<text x="${padL + 160}" y="${H - 4}" font-size="11.2" fill="#5F594F">10.27 新版 v5.0（海外）</text>`;
    svg += `<circle cx="${padL + 325}" cy="${H - 8}" r="5.5" fill="#B84A2E"/>`;
    svg += `<text x="${padL + 335}" y="${H - 4}" font-size="11.2" fill="#5F594F">10.27 新版 v5.0（国产）</text>`;
    svg += `</svg>`;

    host.innerHTML = svg;
    bindTooltips("#chart-aa-overnight .aa-row", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     3. MECHANISM DIAGRAM #1 · OLD EXAM vs MODEL × HARNESS × ENV × RSI LOOP
     ------------------------------------------------------------------------ */
  function renderDiagramEquation() {
    const host = $("#diagram-equation");
    if (!host) return;
    const svg = `<svg viewBox="0 0 920 308" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="eq-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#5F594F"/></marker>
        <marker id="eq-arr-t" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#B84A2E"/></marker>
        <marker id="eq-arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#216E5F"/></marker>
      </defs>

      <!-- Top Row: Old Static Paradigm -->
      <rect x="14" y="12" width="892" height="58" rx="10" fill="#F4F0E7" stroke="#DFD8CA"/>
      <text x="32" y="34" font-size="11" font-weight="700" fill="#847D72" font-family="var(--font-mono)">OLD PARADIGM · 2023–2025 静态考卷</text>
      <text x="32" y="54" font-size="13" fill="#5F594F">单轮问答、公开题海、测的是孤立权重，已于 1–2 年内集体撞顶</text>

      <rect x="470" y="25" width="106" height="32" rx="6" fill="#FFF" stroke="#CEC5B4"/>
      <text x="523" y="45" text-anchor="middle" font-size="12.5" font-weight="600" fill="#5F594F">Prompt</text>
      <line x1="576" y1="41" x2="606" y2="41" stroke="#847D72" stroke-width="1.6" marker-end="url(#eq-arr)"/>
      <rect x="612" y="25" width="114" height="32" rx="6" fill="#FFF" stroke="#CEC5B4"/>
      <text x="669" y="45" text-anchor="middle" font-size="12.5" font-weight="600" fill="#5F594F">Model 权重</text>
      <line x1="726" y1="41" x2="756" y2="41" stroke="#847D72" stroke-width="1.6" marker-end="url(#eq-arr)"/>
      <rect x="762" y="25" width="122" height="32" rx="6" fill="#ECE6DA" stroke="#CEC5B4"/>
      <text x="823" y="45" text-anchor="middle" font-size="12.5" font-weight="700" fill="#5F594F">静态分数</text>

      <!-- Main Row: New Coupled System + RSI Loop -->
      <rect x="14" y="86" width="892" height="210" rx="12" fill="#FFFFFF" stroke="#CEC5B4" stroke-width="1.3"/>
      <text x="32" y="110" font-size="11.2" font-weight="700" fill="#B84A2E" font-family="var(--font-mono)">NEW PARADIGM · 2026 系统级考场 × RSI 共同进化闭环</text>

      <!-- Node 1: Model -->
      <rect x="34" y="128" width="196" height="84" rx="9" fill="#EBF2F7" stroke="#26547C" stroke-width="1.6"/>
      <text x="132" y="150" text-anchor="middle" font-size="13.5" font-weight="800" fill="#26547C">Model · 模型权重</text>
      <text x="132" y="170" text-anchor="middle" font-size="11.4" fill="#34302A">长程规划 · 工程边界克制</text>
      <text x="132" y="187" text-anchor="middle" font-size="11.4" fill="#34302A">自造测试 · 改差果断回滚</text>
      <text x="132" y="203" text-anchor="middle" font-size="10.4" font-weight="700" fill="#26547C">Haiku $21 赢高价旗舰 = 非参数问题</text>

      <text x="247" y="177" text-anchor="middle" font-size="22" font-weight="800" fill="#B84A2E">×</text>

      <!-- Node 2: Harness -->
      <rect x="264" y="128" width="204" height="84" rx="9" fill="#FDF4E7" stroke="#B2620F" stroke-width="1.6"/>
      <text x="366" y="150" text-anchor="middle" font-size="13.5" font-weight="800" fill="#B2620F">Harness · 执行框架</text>
      <text x="366" y="170" text-anchor="middle" font-size="11.4" fill="#34302A">工具接口 · 上下文压缩</text>
      <text x="366" y="187" text-anchor="middle" font-size="11.4" fill="#34302A">保底快照 · 检索与重试策略</text>
      <text x="366" y="203" text-anchor="middle" font-size="10.4" font-weight="700" fill="#B2620F">Neon 换原生框架 3× (12.8%→39%)</text>

      <text x="485" y="177" text-anchor="middle" font-size="22" font-weight="800" fill="#B84A2E">×</text>

      <!-- Node 3: Environment -->
      <rect x="502" y="128" width="212" height="84" rx="9" fill="#E6F3F0" stroke="#216E5F" stroke-width="1.6"/>
      <text x="608" y="150" text-anchor="middle" font-size="13.5" font-weight="800" fill="#216E5F">Environment · 考场沙盒</text>
      <text x="608" y="170" text-anchor="middle" font-size="11.4" fill="#34302A">超时配额 · 网络白名单隔离</text>
      <text x="608" y="187" text-anchor="middle" font-size="11.4" fill="#34302A">双向终态断言 · 红队防作弊</text>
      <text x="608" y="203" text-anchor="middle" font-size="10.4" font-weight="700" fill="#216E5F">TB 放宽超时立涨 +6–15 分</text>

      <!-- Arrow to Outcome -->
      <line x1="714" y1="170" x2="746" y2="170" stroke="#B84A2E" stroke-width="2" marker-end="url(#eq-arr-t)"/>

      <!-- Node 4: Output -->
      <rect x="752" y="128" width="136" height="84" rx="9" fill="#181A20"/>
      <text x="820" y="152" text-anchor="middle" font-size="13.5" font-weight="800" fill="#FFF">可信分数</text>
      <text x="820" y="171" text-anchor="middle" font-size="11.5" font-weight="700" fill="#52C4AD">+ 干净 RL 奖励</text>
      <text x="820" y="190" text-anchor="middle" font-size="10.6" fill="#C7C2B8">轨迹日志 · 成本账单</text>
      <text x="820" y="204" text-anchor="middle" font-size="10.6" fill="#E88266">作弊清零修正</text>

      <!-- Bottom Feedback Loops -->
      <path d="M 820,212 L 820,264 L 132,264 L 132,216" fill="none" stroke="#216E5F" stroke-width="2" stroke-dasharray="6,4" marker-end="url(#eq-arr-g)"/>
      <rect x="186" y="249" width="278" height="24" rx="12" fill="#E6F3F0" stroke="#B1D6CE"/>
      <text x="325" y="265" text-anchor="middle" font-size="11.2" font-weight="700" fill="#216E5F">无噪声 0–1 奖励直接反哺长程 RL（FireFlash +10.4 分）</text>

      <path d="M 790,212 L 790,238 L 366,238 L 366,216" fill="none" stroke="#B84A2E" stroke-width="1.8" marker-end="url(#eq-arr-t)"/>
      <rect x="498" y="225" width="268" height="22" rx="11" fill="#FAEDE8" stroke="#E5B9AA"/>
      <text x="632" y="240" text-anchor="middle" font-size="10.8" font-weight="700" fill="#8F341D">失败轨迹定向修补 Harness（对齐即涨 +4.4 分）</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4. MECHANISM DIAGRAM #2 · FOUR-LAYER WATER-STRIPPING FUNNEL (2026 Scores)
     ------------------------------------------------------------------------ */
  function renderDiagramWaterFunnel() {
    const host = $("#diagram-water-funnel");
    if (!host) return;
    const tracks = [
      {
        name: "桌面 GUI (OSWorld)",
        col: "#26547C",
        steps: [
          { lbl: "宣传常用：2.1 离线步骤分", val: 89.3, note: "82 本地题按 10–15 个 DAG 子节点平均" },
          { lbl: "挤掉水分①：切严格全通", val: 54.6, note: "单步漏 Ctrl+S 即归零（骤降 −34.7 pt）" },
          { lbl: "挤掉水分②：2.0 含在线全集", val: 20.6, note: "接入动态网页与 >163m 超长任务后暴跌" }
        ]
      },
      {
        name: "跨软件办公 (AutoBench / ALE)",
        col: "#B2620F",
        steps: [
          { lbl: "宣传常用：目标/步骤分", val: 79.3, note: "AutoBench Neon 79.3% / ALE Astra 78.3%" },
          { lbl: "挤掉水分①：严格全通率", val: 56.6, note: "AutoBench 56.6% / ALE 仅 47.5%（−23~31 pt）" },
          { lbl: "暗坑警示：BLE 审计缺陷率", val: 29.0, note: "公开集 100 题中仅 19 题完全合格 + 10 存疑，71% 脚本有缺陷", customLbl: "71% 脚本有缺陷 (仅 19 合格)" }
        ]
      },
      {
        name: "从头蛋白设计 (Binder 24h)",
        col: "#216E5F",
        steps: [
          { lbl: "电脑打分：重折叠模拟通过率", val: 85.1, note: "AlphaFold / Boltz 计算重折叠初筛 85.1%" },
          { lbl: "物理终裁：独立 CRO 湿实验", val: 28.5, note: "寄 Twist 合成 + Adaptyv 仪器实测压回 22%–35%", customLbl: "22%–35% 湿测真实结合" }
        ]
      },
      {
        name: "三维双臂物理 (RoboDojo / First Exam)",
        col: "#7D355B",
        steps: [
          { lbl: "带 ‡ 宣传：私有外挂停表仿真", val: 64.9, note: "Fable 5.2‡ 冻结重力慢想 + 未开源外挂" },
          { lbl: "挤掉水分①：标准化真机考棚", val: 33.9, note: "RealEval 18 真机最高仅 33.9%（三大通用旗舰零交卷）" },
          { lbl: "挤掉水分②：拔暂停键切实时", val: 37.0, note: "First Exam 456 题中 63% 三家全得 0 分，仅 37% 非零", customLbl: "63% 题全员归零 (仅 37% 非零)" }
        ]
      }
    ];

    const W = 920, padL = 218, padR = 32, rowH = 26, headerH = 26, blockGap = 16;
    let curY = 16;
    let bodySvg = "";

    tracks.forEach((tr, ti) => {
      const startY = curY;
      const blockH = headerH + tr.steps.length * rowH + 10;
      bodySvg += `<rect x="8" y="${startY}" width="${W - 16}" height="${blockH}" rx="9" fill="${ti % 2 === 0 ? "#FAF8F4" : "#FFFFFF"}" stroke="#E5DFD3"/>`;
      bodySvg += `<text x="22" y="${startY + 20}" font-size="12.6" font-weight="800" fill="${tr.col}">${tr.name}</text>`;
      bodySvg += `<text x="${W - 22}" y="${startY + 20}" text-anchor="end" font-size="10.4" fill="#847D72">逐层剥离水分 →</text>`;

      const barMaxW = W - padL - padR - 196;
      tr.steps.forEach((st, si) => {
        const y = startY + headerH + 4 + si * rowH;
        const w = (st.val / 100) * barMaxW;
        const opacity = si === 0 ? 0.35 : (si === 1 ? 0.72 : 1.0);
        const fillCol = si === tr.steps.length - 1 ? "#B84A2E" : tr.col;

        bodySvg += `<g class="wf-row" data-tip="<b>${tr.name} · ${st.lbl}</b><br>${st.note}" style="cursor:pointer;">`;
        bodySvg += `<text x="${padL - 12}" y="${y + 14}" text-anchor="end" font-size="11.2" font-weight="${si === tr.steps.length - 1 ? "700" : "500"}" fill="${si === tr.steps.length - 1 ? "#8F341D" : "#5F594F"}">${st.lbl}</text>`;
        bodySvg += `<rect x="${padL}" y="${y + 3}" width="${barMaxW}" height="14" rx="4" fill="#ECE6DA"/>`;
        bodySvg += `<rect x="${padL}" y="${y + 3}" width="${w}" height="14" rx="4" fill="${fillCol}" opacity="${opacity}"/>`;
        bodySvg += `<text x="${padL + w + 8}" y="${y + 14}" font-size="11.4" font-weight="700" fill="${fillCol}">${st.customLbl || (st.val + "%")}</text>`;
        bodySvg += `</g>`;
      });
      curY += blockH + blockGap;
    });

    const H = curY;
    host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">${bodySvg}</svg>`;
    bindTooltips("#diagram-water-funnel .wf-row", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     5. MECHANISM DIAGRAM #3 · HARBOR DUAL-CONTAINER + 0700 + RED-TEAM DEFENSE
     ------------------------------------------------------------------------ */
  function renderDiagramHarbor() {
    const host = $("#diagram-harbor");
    if (!host) return;
    const svg = `<svg viewBox="0 0 920 296" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="hb-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#1C1A17"/></marker>
        <marker id="hb-arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#B84A2E"/></marker>
      </defs>

      <!-- Stage 1: Blue Zone (Solver Container) -->
      <rect x="14" y="18" width="230" height="196" rx="10" fill="#EBF2F7" stroke="#26547C" stroke-width="1.6"/>
      <rect x="14" y="18" width="230" height="30" rx="10" fill="#26547C"/>
      <text x="129" y="38" text-anchor="middle" font-size="12" font-weight="700" fill="#FFF">STEP 1 · 蓝区答题机 (受限沙盒)</text>
      <text x="28" y="68" font-size="11.6" font-weight="700" fill="#1C1A17">AI 可见目录：</text>
      <text x="28" y="86" font-size="11.2" font-family="var(--font-mono)" fill="#26547C">├── instruction.md</text>
      <text x="28" y="103" font-size="11.2" font-family="var(--font-mono)" fill="#26547C">├── task.toml (超时/GPU)</text>
      <text x="28" y="120" font-size="11.2" font-family="var(--font-mono)" fill="#26547C">└── environment/Dockerfile</text>
      <line x1="28" y1="134" x2="230" y2="134" stroke="#BDD1E3"/>
      <text x="28" y="153" font-size="11.3" fill="#34302A">• 机内<tspan font-weight="700" fill="#B84A2E">彻底移除</tspan> solution/ 与 tests/</text>
      <text x="28" y="171" font-size="11.3" fill="#34302A">• 按题断公网或锁域名白名单</text>
      <text x="28" y="189" font-size="11.3" fill="#34302A">• submit 只存保底快照、防早退</text>
      <text x="28" y="205" font-size="10.8" fill="#5F594F">（截断 ExploitGym 外网逃逸）</text>

      <!-- Arrow 1 -> 2 -->
      <line x1="244" y1="116" x2="274" y2="116" stroke="#1C1A17" stroke-width="2" marker-end="url(#hb-arr)"/>

      <!-- Stage 2: Air-Gap Kill Switch -->
      <rect x="280" y="42" width="142" height="148" rx="10" fill="#FAEDE8" stroke="#B84A2E" stroke-width="1.6" stroke-dasharray="5,3"/>
      <text x="351" y="68" text-anchor="middle" font-size="12" font-weight="800" fill="#8F341D">STEP 2 · 拔电销毁</text>
      <text x="351" y="90" text-anchor="middle" font-size="11.2" fill="#34302A">到点立刻销毁答题机</text>
      <text x="351" y="110" text-anchor="middle" font-size="11.2" font-weight="700" fill="#B84A2E">清零 /tmp 小抄</text>
      <text x="351" y="128" text-anchor="middle" font-size="11.2" font-weight="700" fill="#B84A2E">杀光后台驻留进程</text>
      <line x1="296" y1="142" x2="406" y2="142" stroke="#E5B9AA"/>
      <text x="351" y="160" text-anchor="middle" font-size="11" fill="#34302A">仅提取干净工作区产物</text>
      <text x="351" y="176" text-anchor="middle" font-size="10.4" fill="#5F594F">并永久归档 → $0 离线重评</text>

      <!-- Arrow 2 -> 3 -->
      <line x1="422" y1="116" x2="452" y2="116" stroke="#1C1A17" stroke-width="2" marker-end="url(#hb-arr)"/>

      <!-- Stage 3: Red Zone (Verifier Container) -->
      <rect x="458" y="18" width="234" height="196" rx="10" fill="#FDF4E7" stroke="#B2620F" stroke-width="1.6"/>
      <rect x="458" y="18" width="234" height="30" rx="10" fill="#B2620F"/>
      <text x="575" y="38" text-anchor="middle" font-size="12" font-weight="700" fill="#FFF">STEP 3 · 红区全新改卷机 (降权)</text>
      <text x="472" y="68" font-size="11.6" font-weight="700" fill="#1C1A17">交卷后才挂载隐藏目录：</text>
      <text x="472" y="86" font-size="11.2" font-family="var(--font-mono)" fill="#8F341D">├── /root/tests/ (chmod 0700)</text>
      <text x="472" y="103" font-size="11.2" font-family="var(--font-mono)" fill="#8F341D">└── solution/solve.sh (5/5 必过)</text>
      <line x1="472" y1="117" x2="678" y2="117" stroke="#E6C9A2"/>
      <text x="472" y="136" font-size="11.3" fill="#34302A">• 切普通 <tspan font-family="var(--font-mono)" font-weight="700">agent</tspan> 账号降权跑待测码</text>
      <text x="472" y="154" font-size="11.3" fill="#34302A">• 封死 root Unix socket 越权读盘</text>
      <text x="472" y="172" font-size="11.3" fill="#34302A">• 测试输入动态加盐 / 1:1 改写文件名</text>
      <text x="472" y="190" font-size="11.3" fill="#34302A">• 双向断言：查改对 + 查未授权删改</text>
      <text x="472" y="206" font-size="10.6" fill="#5F594F">（截断 161KB 查表字典与改 pytest）</text>

      <!-- Arrow 3 -> 4 -->
      <line x1="692" y1="116" x2="722" y2="116" stroke="#1C1A17" stroke-width="2" marker-end="url(#hb-arr)"/>

      <!-- Stage 4: Trace Audit + Clean Reward -->
      <rect x="728" y="18" width="178" height="196" rx="10" fill="#181A20"/>
      <text x="817" y="42" text-anchor="middle" font-size="12" font-weight="800" fill="#52C4AD">STEP 4 · 轨迹终审</text>
      <line x1="744" y1="54" x2="890" y2="54" stroke="#353B4B"/>
      <text x="742" y="76" font-size="11.3" fill="#EAE6DC">• 自动化 Trajectory</text>
      <text x="752" y="92" font-size="11.3" fill="#EAE6DC">Scanner 扫 500 轮日志</text>
      <text x="742" y="114" font-size="11.3" fill="#EAE6DC">• 抓到偷搜原 PR、</text>
      <text x="752" y="130" font-size="11.3" fill="#EAE6DC">回放 .gold、下载权重</text>
      <text x="752" y="148" font-size="11.4" font-weight="700" fill="#F28B72">→ 当场清零 (0 分)</text>
      <rect x="742" y="164" width="150" height="36" rx="6" fill="rgba(33,110,95,0.28)" stroke="#52C4AD"/>
      <text x="817" y="186" text-anchor="middle" font-size="11.6" font-weight="700" fill="#D7F5EE">输出干净 RL Reward</text>

      <!-- Bottom Bar: Pre-launch Red-Team Gate -->
      <rect x="14" y="232" width="892" height="50" rx="9" fill="#F4F0E7" stroke="#CEC5B4"/>
      <text x="32" y="254" font-size="11.6" font-weight="800" fill="#B84A2E">出厂前置硬门禁｜Cheat Trials 红队攻题（TB 3.0+ / FC 2.0 标配）：</text>
      <text x="32" y="272" font-size="11.5" fill="#34302A">每道新题上线前先派奉命找漏洞的「作弊 AI」猛攻，能钻空子立刻打回补强——否则带漏洞的沙盒拿去做 RL，等于拿真金白银把作弊训进模型骨子里。</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     6. CHART 3 · EMBODIED TWO-PANEL SPLIT (ZERO MIXED Y-AXIS!)
     ------------------------------------------------------------------------ */
  function renderEmbodiedSplit() {
    const hostA = $("#chart-embodied-acc");
    const hostB = $("#chart-first-exam");

    if (hostA) {
      const stages = D.embodiedAccuracy;
      const W = 590, H = 315, padL = 44, padR = 14, padT = 40, padB = 64;
      const groupW = (W - padL - padR) / stages.length;
      const toY = v => padT + ((100 - v) / 100) * (H - padT - padB);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
      [0, 25, 50, 75, 100].forEach(t => {
        const y = toY(t);
        svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E5DFD3" stroke-dasharray="3,3"/>`;
        svg += `<text x="${padL - 7}" y="${y + 4}" text-anchor="end" font-size="10.5" fill="#7E776C">${t}%</text>`;
      });

      const leg = [["Anthropic (Fable 5.2)", "#B84A2E"], ["OpenAI (Sol / Astra)", "#26547C"], ["Google (Carbon)", "#216E5F"]];
      leg.forEach(([lbl, col], i) => {
        const lx = padL + i * 172;
        svg += `<rect x="${lx}" y="10" width="10" height="10" rx="2.5" fill="${col}"/>`;
        svg += `<text x="${lx + 15}" y="19" font-size="10.8" font-weight="600" fill="#34302A">${lbl}</text>`;
      });

      stages.forEach((st, idx) => {
        const gx = padL + idx * groupW + groupW / 2;
        const bw = 24, gap = 5;
        const startX = gx - (3 * bw + 2 * gap) / 2;
        const items = [
          { ...st.anthropic, col: "#B84A2E" },
          { ...st.openai, col: "#26547C" },
          { ...st.google, col: "#216E5F" }
        ];
        items.forEach((it, j) => {
          const bx = startX + j * (bw + gap);
          if (it.val === null) {
            svg += `<text x="${bx + bw / 2}" y="${toY(0) - 8}" text-anchor="middle" font-size="9.8" fill="#847D72">未报</text>`;
            return;
          }
          const y = toY(it.val), h = toY(0) - y;
          svg += `<g class="emb-a-pt" data-tip="<b>${st.stage.replace("\n", " · ")}</b><br>${it.model}：<b>${it.val}%</b><br>${st.note}" style="cursor:pointer;">`;
          svg += `<rect x="${bx}" y="${y}" width="${bw}" height="${h}" rx="3.5" fill="${it.col}"/>`;
          svg += `<text x="${bx + bw / 2}" y="${y - 5}" text-anchor="middle" font-size="10" font-weight="700" fill="${it.col}">${it.val}${it.dagger ? "‡" : ""}</text>`;
          svg += `</g>`;
        });

        st.stage.split("\n").forEach((ln, li) => {
          svg += `<text x="${gx}" y="${H - padB + 20 + li * 15}" text-anchor="middle" font-size="${li === 0 ? "11.2" : "10"}" font-weight="${li === 0 ? "700" : "500"}" fill="${li === 0 ? "#1C1A17" : "#5F594F"}">${ln}</text>`;
        });
      });

      svg += `</svg>`;
      hostA.innerHTML = svg;
      bindTooltips("#chart-embodied-acc .emb-a-pt", el => el.dataset.tip);
    }

    if (hostB) {
      const f = D.firstExamCliff;
      const W = 360, H = 315;
      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

      // Top block: Turn-based accuracy bar
      svg += `<text x="14" y="26" font-size="11.2" font-weight="700" fill="#26547C">① 允许仿真器暂停重力 (Turn-based 最高准确率)</text>`;
      svg += `<rect x="14" y="38" width="332" height="26" rx="6" fill="#ECE6DA"/>`;
      svg += `<rect x="14" y="38" width="${(f.turnBasedBest.val / 100) * 332}" height="26" rx="6" fill="#26547C" class="emb-b-pt" data-tip="<b>Turn-based 停表模式</b><br>${f.turnBasedBest.note}" style="cursor:pointer;"/>`;
      svg += `<text x="${14 + (f.turnBasedBest.val / 100) * 332 + 10}" y="56" font-size="12.5" font-weight="800" fill="#26547C">34.0% (GPT-6 Astra)</text>`;
      svg += `<text x="14" y="82" font-size="10.8" fill="#5F594F">开源模型最高 9.0%；每步允许慢思考 10–18 秒</text>`;

      svg += `<line x1="14" y1="102" x2="346" y2="102" stroke="#DFD8CA" stroke-dasharray="4,3"/>`;

      // Bottom block: Realtime 456-task breakdown (distinct metric!)
      svg += `<text x="14" y="126" font-size="11.2" font-weight="700" fill="#B84A2E">② 拔掉暂停键切回真实物理时钟 (456 题结局拆解)</text>`;
      const zeroW = (f.realtimeZeroPct / 100) * 332;
      const nonZeroW = 332 - zeroW;
      svg += `<g class="emb-b-pt" data-tip="<b>Realtime 连续物理时钟 (456 核心题)</b><br>${f.note}" style="cursor:pointer;">`;
      svg += `<rect x="14" y="138" width="${zeroW}" height="44" rx="6" fill="#B84A2E"/>`;
      svg += `<text x="${14 + zeroW / 2}" y="158" text-anchor="middle" font-size="13" font-weight="800" fill="#FFF">63.0% 全员 0 分</text>`;
      svg += `<text x="${14 + zeroW / 2}" y="174" text-anchor="middle" font-size="10.4" fill="#FFE0D6">287 / 456 题三家全挂</text>`;

      svg += `<rect x="${14 + zeroW + 4}" y="138" width="${nonZeroW - 4}" height="44" rx="6" fill="#7D355B"/>`;
      svg += `<text x="${14 + zeroW + 4 + (nonZeroW - 4) / 2}" y="158" text-anchor="middle" font-size="12" font-weight="700" fill="#FFF">37.0%</text>`;
      svg += `<text x="${14 + zeroW + 4 + (nonZeroW - 4) / 2}" y="174" text-anchor="middle" font-size="10" fill="#F6EBF1">至少一家非零</text>`;
      svg += `</g>`;

      // Physical latency callout box
      svg += `<rect x="14" y="202" width="332" height="94" rx="8" fill="#FAEDE8" stroke="#E5B9AA"/>`;
      svg += `<text x="26" y="224" font-size="11.6" font-weight="800" fill="#8F341D">为什么 63% 的题瞬间归零？</text>`;
      svg += `<text x="26" y="244" font-size="11.2" fill="#34302A">• 慢思考大模型决策频率：~0.1 Hz（10–18 秒/步）</text>`;
      svg += `<text x="26" y="263" font-size="11.2" fill="#34302A">• 倾倒水杯砸台面：0.4 秒 ｜ 滑动物体移出：1.2 秒</text>`;
      svg += `<text x="26" y="282" font-size="11.2" font-weight="700" fill="#8F341D">→ 真机落地绕不开「慢思考大脑 + 高频小脑」分层</text>`;

      svg += `</svg>`;
      hostB.innerHTML = svg;
      bindTooltips("#chart-first-exam .emb-b-pt", el => el.dataset.tip);
    }
  }

  /* ------------------------------------------------------------------------
     7. CHART 4 · CODING COST PARETO & TB 4.1 (Used on both Essay & Atlas)
     ------------------------------------------------------------------------ */
  function renderCodeChart(mode = "fswe") {
    const host = $("#chart-code-pareto");
    if (!host) return;

    if (mode === "fswe") {
      const data = D.fsweLeaderboard;
      const W = 920, H = 405, padL = 68, padR = 40, padT = 48, padB = 54;
      const xMin = Math.log10(6), xMax = Math.log10(1500);
      const toX = c => padL + ((Math.log10(c) - xMin) / (xMax - xMin)) * (W - padL - padR);
      const toY = s => padT + ((78 - s) / 78) * (H - padT - padB);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

      const bx1 = toX(82), bx2 = toX(125);
      svg += `<rect x="${bx1}" y="${padT}" width="${bx2 - bx1}" height="${H - padT - padB}" fill="#FDF4E7" opacity="0.88"/>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 19}" text-anchor="middle" font-size="11" font-weight="700" fill="#B2620F">同价区 (~$100)</text>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 5}" text-anchor="middle" font-size="10.4" fill="#B2620F">62% vs 30%</text>`;

      [0, 15, 30, 45, 60, 75].forEach(s => {
        const y = toY(s);
        svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E5DFD3" stroke-dasharray="3,3"/>`;
        svg += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="11.2" fill="#7E776C">${s}%</text>`;
      });

      [10, 20, 50, 100, 200, 500, 1000].forEach(c => {
        const x = toX(c);
        svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#ECE6DA" stroke-dasharray="3,3"/>`;
        svg += `<text x="${x}" y="${H - padB + 19}" text-anchor="middle" font-size="11.2" fill="#7E776C">$${c}</text>`;
      });
      svg += `<text x="${(padL + W - padR) / 2}" y="${H - 10}" text-anchor="middle" font-size="11.8" font-weight="700" fill="#1C1A17">FrontierSWE v2 单题平均 Token 成本（对数刻度 · 20h 预算）</text>`;
      svg += `<text x="18" y="${(padT + H - padB) / 2}" text-anchor="middle" transform="rotate(-90 18 ${(padT + H - padB) / 2})" font-size="11.8" font-weight="700" fill="#1C1A17">mean@5 解决率 (%)</text>`;

      const paretoIds = ["DeepSeek V4 Flash Vision", "Claude Haiku 5.5 (小模型)", "Gemini 4 Carbon", "Gemini 4 Neon", "Claude Fable 5.2"];
      const pts = paretoIds.map(n => data.find(d => d.model === n)).filter(Boolean);
      const pathD = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${toX(p.cost).toFixed(1)},${toY(p.score).toFixed(1)}`).join(" ");
      svg += `<path d="${pathD}" fill="none" stroke="#216E5F" stroke-width="2" stroke-dasharray="6,4" opacity="0.75"/>`;
      svg += `<text x="${toX(14)}" y="${toY(53)}" font-size="11" font-weight="700" fill="#216E5F">性能-成本 Pareto 前沿 ↗</text>`;

      const off = {
        "Claude Fable 5.2": [12, 4],
        "GPT-6 Astra": [-12, 4],
        "Gemini 4 Neon": [12, 16],
        "Gemini 4 Carbon": [-12, -8],
        "Claude Haiku 5.5 (小模型)": [12, 5],
        "GLM-5.3 (开源最高)": [12, -5],
        "Kimi K3": [12, 11],
        "Qwen3.8-Max": [-12, 4],
        "DeepSeek V4 Flash Vision": [12, 4]
      };

      data.forEach(d => {
        const x = toX(d.cost), y = toY(d.score);
        const col = d.cn ? "#B84A2E" : "#26547C";
        const [dx, dy] = off[d.model] || [10, 4];
        const anchor = dx < 0 ? "end" : "start";
        svg += `<g class="code-pt" data-tip="<b>${d.model}</b><br>解决率：<b>${d.score}%</b> ｜ 单题成本：<b>${d.costLabel}</b> ｜ 均耗时：<b>${d.hours}</b><br>${d.note}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="7.2" fill="${col}" stroke="#FFFFFF" stroke-width="2.2"/>`;
        svg += `<text x="${x + dx}" y="${y + dy}" text-anchor="${anchor}" font-size="11.4" font-weight="700" fill="${col}">${d.model} (${d.score}%)</text>`;
        svg += `</g>`;
      });

      svg += `</svg>`;
      host.innerHTML = svg;
      bindTooltips("#chart-code-pareto .code-pt", el => el.dataset.tip);
    } else {
      const data = D.tb41Leaderboard;
      const W = 920, rowH = 36, padL = 178, padR = 236, padT = 30, padB = 20;
      const H = padT + data.length * rowH + padB;
      const toW = s => (s / 80) * (W - padL - padR);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
      svg += `<text x="${padL - 12}" y="17" text-anchor="end" font-size="11.2" font-weight="700" fill="#7E776C">模型</text>`;
      svg += `<text x="${padL}" y="17" font-size="11.2" font-weight="700" fill="#7E776C">TB 4.1 解决率（66 题 · 8h 去噪）</text>`;
      svg += `<text x="${W - padR + 74}" y="17" text-anchor="end" font-size="11.2" font-weight="700" fill="#7E776C">单轮成本</text>`;
      svg += `<text x="${W - padR + 92}" y="17" font-size="11.2" font-weight="700" fill="#7E776C">框架 / 备注</text>`;

      data.forEach((d, i) => {
        const y = padT + i * rowH + 6;
        const barW = toW(d.score);
        const col = d.cn ? "#216E5F" : "#26547C";
        const costCol = d.cost >= 10 ? "#B84A2E" : (d.cost <= 0.4 ? "#216E5F" : "#5F594F");

        svg += `<g class="tb-pt" data-tip="<b>${d.model}</b><br>TB 4.1：<b>${d.score}%</b> ｜ 成本：<b>${d.costLabel}</b><br>${d.harness}" style="cursor:pointer;">`;
        svg += `<rect x="0" y="${y - 4}" width="${W}" height="${rowH - 2}" fill="transparent"/>`;
        svg += `<text x="${padL - 12}" y="${y + 15}" text-anchor="end" font-size="12.2" font-weight="${d.cn ? "700" : "600"}" fill="${d.cn ? "#216E5F" : "#1C1A17"}">${d.model}</text>`;
        svg += `<rect x="${padL}" y="${y + 3}" width="${W - padL - padR}" height="15" rx="4" fill="#EFEAE0"/>`;
        svg += `<rect x="${padL}" y="${y + 3}" width="${barW}" height="15" rx="4" fill="${col}"/>`;
        svg += `<text x="${padL + barW + 8}" y="${y + 15}" font-size="11.8" font-weight="700" fill="${col}">${d.score}%</text>`;
        svg += `<text x="${W - padR + 74}" y="${y + 15}" text-anchor="end" font-size="11.8" font-weight="700" fill="${costCol}">${d.costLabel}</text>`;
        svg += `<text x="${W - padR + 92}" y="${y + 15}" font-size="11" fill="#7E776C">${d.harness}</text>`;
        svg += `</g>`;
      });

      svg += `</svg>`;
      host.innerHTML = svg;
      bindTooltips("#chart-code-pareto .tb-pt", el => el.dataset.tip);
    }
  }

  /* ------------------------------------------------------------------------
     8. ATLAS: DYNAMIC STATS COMPUTED DIRECTLY FROM 16 CORE BENCHMARKS (SSOT!)
     ------------------------------------------------------------------------ */
  function renderDynamicStats() {
    const core = D.benchmarks.filter(b => b.track !== "legacy");
    const legacyCount = D.benchmarks.length - core.length;
    const total = core.length; // strictly 16

    const byTrack = { code: 0, sci: 0, off: 0, emb: 0 };
    const byOrg = { acad: 0, data: 0, lab: 0, prod: 0 };
    const byAcc = { hyb: 0, priv: 0, open: 0 };
    let goldenCount = 0;

    core.forEach(b => {
      if (byTrack[b.track] !== undefined) byTrack[b.track]++;
      if (byOrg[b.orgType] !== undefined) byOrg[b.orgType]++;
      if (byAcc[b.access] !== undefined) byAcc[b.access]++;
      if (b.inGoldenZone) goldenCount++;
    });

    const pct = n => Math.round((n / total) * 100);
    const privDefense = byAcc.hyb + byAcc.priv;

    const kpiHost = $("#dynamic-kpis");
    if (kpiHost) {
      kpiHost.innerHTML = `
        <div class="kpi-card" style="--k-col:var(--slate);">
          <div class="kpi-k">核验核心样本</div>
          <div class="kpi-v">${total} + ${legacyCount} 套</div>
          <div class="kpi-d">代码 ${byTrack.code} · 科研 ${byTrack.sci} · 办公 ${byTrack.off} · 物理 ${byTrack.emb}</div>
        </div>
        <div class="kpi-card" style="--k-col:var(--amber);">
          <div class="kpi-k">最大主流开放形态</div>
          <div class="kpi-v">${pct(byAcc.hyb)}% 公私混合</div>
          <div class="kpi-d">${byAcc.hyb}/${total} 套公私混合 · 打破开源/闭源二分</div>
        </div>
        <div class="kpi-card" style="--k-col:var(--terra);">
          <div class="kpi-k">含私有防线比例</div>
          <div class="kpi-v">${pct(privDefense)}% 含私有</div>
          <div class="kpi-d">公私混合 ${byAcc.hyb} + 纯私有 ${byAcc.priv} vs 全开源 ${byAcc.open}</div>
        </div>
        <div class="kpi-card" style="--k-col:var(--teal);">
          <div class="kpi-k">收敛 50–250 题黄金区</div>
          <div class="kpi-v">${pct(goldenCount)}% (${goldenCount}/${total})</div>
          <div class="kpi-d">&lt;50 题方差失控，&gt;250 题账单失控</div>
        </div>
        <div class="kpi-card" style="--k-col:var(--ink);">
          <div class="kpi-k">一手核验溯源</div>
          <div class="kpi-v">${D.references.reduce((a, g) => a + g.items.length, 0)} 条链接</div>
          <div class="kpi-d">覆盖正文全部论文、榜单与白盒审计</div>
        </div>
      `;
    }

    const barHost = $("#dynamic-dist-bars");
    if (barHost) {
      const pAcad = pct(byOrg.acad), pData = pct(byOrg.data), pLab = pct(byOrg.lab), pProd = 100 - pAcad - pData - pLab;
      const pHyb = pct(byAcc.hyb), pPriv = pct(byAcc.priv), pOpen = 100 - pHyb - pPriv;

      barHost.innerHTML = `
        <div class="info-card" style="--c-top:var(--slate);">
          <div class="ic-k">实时汇总 · 主导阵营分布 (N = ${total})</div>
          <h4>高校搭开源底座，商业机构与专家众包造垂直主榜</h4>
          <div class="stack-bar">
            <div class="stack-seg" style="width:${pAcad}%;background:var(--slate);" title="高校联盟 ${pAcad}% (${byOrg.acad}/16)">高校 ${pAcad}% (${byOrg.acad})</div>
            <div class="stack-seg" style="width:${pData}%;background:var(--terra);" title="数据/评测巨头 ${pData}% (${byOrg.data}/16)">数据巨头 ${pData}% (${byOrg.data})</div>
            <div class="stack-seg" style="width:${pLab}%;background:var(--teal);" title="大厂自建 ${pLab}% (${byOrg.lab}/16)">大厂 ${pLab}%</div>
            <div class="stack-seg" style="width:${pProd}%;background:var(--amber);" title="产品公司 ${pProd}% (${byOrg.prod}/16)">产品 ${pProd}%</div>
          </div>
          <p><strong>动态核验注记：</strong>以上占比由右侧 <code>data.js</code> 中 ${total} 套前沿基准实时计算，与下方交互大表 100% 一致。公共容器与真机协议几乎全部出自多校大联盟（8–40+ 机构）；垂直高难主榜则以 1–3 家核心机构外挂 20–1,000 位一线专家众包为主。</p>
        </div>
        <div class="info-card" style="--c-top:var(--amber);">
          <div class="ic-k">实时汇总 · 真实开放形态 (N = ${total})</div>
          <h4>破除“高校全开源、商业全闭源”误区：${pHyb}% 公私混合成最大主流</h4>
          <div class="stack-bar">
            <div class="stack-seg" style="width:${pHyb}%;background:var(--amber);">公私混合 ${pHyb}% (${byAcc.hyb})</div>
            <div class="stack-seg" style="width:${pPriv}%;background:var(--terra);">纯私有 ${pPriv}% (${byAcc.priv})</div>
            <div class="stack-seg" style="width:${pOpen}%;background:var(--teal);">全开源 ${pOpen}% (${byAcc.open})</div>
          </div>
          <p><strong>反直觉发现：</strong>高校联盟也开始藏私有测试（UC Berkeley ALE v1.1），商业巨头反过来也会做 CC BY 4.0 全开源（Surge AI Chartography）。合计 <strong>${pct(privDefense)}%（${privDefense}/${total}）</strong> 设有私有留出防线，其余全开源基准必须靠月度修题与缩容续命。</p>
        </div>
      `;
    }
  }

  /* ------------------------------------------------------------------------
     9. ATLAS: ADOPTION MATRIX + OFFICE DUAL-METRIC + TIMELINE
     ------------------------------------------------------------------------ */
  function renderAdoptionMatrix(filter = "all") {
    const tbody = $("#adoption-tbody");
    if (!tbody) return;
    const fmtCell = raw => {
      const [cls, txt] = raw.split(":");
      const map = { early: "mx-early", nov: "mx-nov", cnok: "mx-cn-ok", gap: "mx-gap" };
      return `<td class="mx-cell ${map[cls] || ""}">${txt}</td>`;
    };
    const rows = D.adoptionMatrix.filter(r => {
      if (filter === "gap") return r.cnNow.startsWith("gap:");
      if (filter === "ok") return r.cnNow.startsWith("cnok:");
      return true;
    });
    tbody.innerHTML = rows.map(r => `
      <tr ${r.bid ? `data-bid="${r.bid}" style="cursor:pointer;"` : ""}>
        <td><b>${r.name}</b><span class="b-sub">${r.track} · ${r.tag}</span></td>
        ${fmtCell(r.oai)}${fmtCell(r.ant)}${fmtCell(r.goo)}${fmtCell(r.cnOld)}${fmtCell(r.cnNow)}
        <td style="font-size:12px;color:var(--muted);">${r.gapNote}</td>
      </tr>
    `).join("");

    $$("#adoption-tbody tr[data-bid]").forEach(tr => {
      tr.addEventListener("click", () => openDrawer(tr.dataset.bid));
    });
  }

  function renderOfficeDual(mode = "autobench") {
    const host = $("#chart-office-dual");
    if (!host) return;
    const rows = D.officeDualMetrics[mode] || D.officeDualMetrics.autobench;
    const hasCN = rows.some(r => r.cn);
    const partialLbl = mode === "autobench" ? "AA 主榜目标分 (0 违规子目标)" : "步骤平均分 (Rubric Partial)";
    const strictLbl = mode === "autobench" ? "严格全通率 (100% 达标且 0 违规)" : "严格全通率 (整单零失误)";

    const W = 900, rowH = 48, padL = 175, padR = 108, padT = 36, padB = 34;
    const H = padT + rows.length * rowH + padB;
    const toX = v => padL + (v / 95) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    [0, 20, 40, 60, 80].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#E5DFD3" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 18}" text-anchor="middle" font-size="11" fill="#7E776C">${t}%</text>`;
    });

    rows.forEach((r, i) => {
      const y = padT + i * rowH + 6;
      const gap = (r.partial - r.strict).toFixed(1);
      const xp = toX(r.partial), xs = toX(r.strict);
      svg += `<g class="off-pt" data-tip="<b>${r.model}</b><br>${partialLbl}：<b>${r.partial}%</b><br>${strictLbl}：<b>${r.strict}%</b><br>两档口径落差：<b style='color:#E88266;'>−${gap} 个百分点</b>" style="cursor:pointer;">`;
      svg += `<text x="${padL - 12}" y="${y + 20}" text-anchor="end" font-size="12.4" font-weight="700" fill="${r.cn ? "#216E5F" : "#1C1A17"}">${r.model}</text>`;
      svg += `<rect x="${padL}" y="${y + 3}" width="${xp - padL}" height="12" rx="3" fill="#CBD9E6"/>`;
      svg += `<text x="${xp + 6}" y="${y + 13}" font-size="11.2" font-weight="600" fill="#26547C">${r.partial}%</text>`;
      svg += `<rect x="${padL}" y="${y + 18}" width="${xs - padL}" height="12" rx="3" fill="${r.cn ? "#216E5F" : "#B84A2E"}"/>`;
      svg += `<text x="${xs + 6}" y="${y + 28}" font-size="11.2" font-weight="700" fill="${r.cn ? "#216E5F" : "#B84A2E"}">${r.strict}%</text>`;
      svg += `<rect x="${W - padR + 14}" y="${y + 6}" width="82" height="22" rx="11" fill="#FAEDE8"/>`;
      svg += `<text x="${W - padR + 55}" y="${y + 21}" text-anchor="middle" font-size="11.2" font-weight="700" fill="#B84A2E">−${gap} pt</text>`;
      svg += `</g>`;
    });

    svg += `<rect x="${padL}" y="8" width="12" height="10" rx="2" fill="#CBD9E6"/>`;
    svg += `<text x="${padL + 17}" y="17" font-size="11.2" fill="#5F594F">${partialLbl}</text>`;
    svg += `<rect x="${padL + 230}" y="8" width="12" height="10" rx="2" fill="#B84A2E"/>`;
    svg += `<text x="${padL + 247}" y="17" font-size="11.2" fill="#5F594F">${strictLbl}${hasCN ? "（青色为国产模型）" : ""}</text>`;
    svg += `</svg>`;

    host.innerHTML = svg;
    bindTooltips("#chart-office-dual .off-pt", el => el.dataset.tip);
  }

  function renderTimelineSVG() {
    const host = $("#chart-timeline");
    if (!host) return;
    const W = 1040, H = 338, padL = 178, padR = 76, padT = 36, padB = 38;
    const tMin = 2023.75, tMax = 2027.02;
    const toX = t => padL + ((t - tMin) / (tMax - tMin)) * (W - padL - padR);
    const lanes = D.timelineLanes;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    const x26 = toX(2026.0);
    svg += `<rect x="${x26}" y="${padT - 6}" width="${W - padR - x26 + 24}" height="${H - padT - padB + 10}" fill="#FAEDE8" opacity="0.45"/>`;
    svg += `<text x="${(x26 + W - padR + 24) / 2}" y="${padT - 12}" text-anchor="middle" font-size="11.2" font-weight="700" fill="#B84A2E">2026 集中换代与清洗窗口</text>`;

    [2024.0, 2024.5, 2025.0, 2025.5, 2026.0, 2026.5, 2026.92].forEach(t => {
      const x = toX(t);
      const yr = Math.floor(t), mo = Math.round((t - yr) * 12) + 1;
      const lbl = `${yr}.${String(Math.min(12, mo)).padStart(2, "0")}`;
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#E5DFD3" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - 13}" text-anchor="middle" font-size="10.8" fill="#7E776C">${lbl}</text>`;
    });

    const laneH = (H - padT - padB) / lanes.length;
    lanes.forEach((ln, idx) => {
      const y = padT + laneH * idx + laneH / 2;
      svg += `<text x="10" y="${y - 2}" font-size="12" font-weight="800" fill="#1C1A17">${ln.name}</text>`;
      svg += `<text x="10" y="${y + 13}" font-size="10.2" fill="#7E776C">${ln.sub}</text>`;
      const firstX = toX(ln.nodes[0].t), lastX = toX(ln.nodes[ln.nodes.length - 1].t);
      svg += `<line x1="${firstX}" y1="${y}" x2="${lastX}" y2="${y}" stroke="#CEC5B4" stroke-width="2.6" stroke-linecap="round"/>`;
      ln.nodes.forEach((nd, ni) => {
        const x = toX(nd.t);
        let dx = 0, yOff = (ni % 2 === 0) ? -14 : 21;
        if (nd.lbl.includes("RoboDojo")) { dx = -34; yOff = -14; }
        if (nd.lbl.includes("ASB 0.1")) { dx = -38; yOff = 21; }
        if (nd.lbl.includes("First Exam")) { dx = 22; yOff = -14; }
        if (nd.lbl.includes("TwinLab")) { dx = 36; yOff = 21; }
        svg += `<g class="tl-pt" data-tip="<b>${nd.lbl}</b><br>${nd.tip}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="6" fill="${nd.col}" stroke="#FFFFFF" stroke-width="2"/>`;
        svg += `<text x="${x + dx}" y="${y + yOff}" text-anchor="middle" font-size="10.2" font-weight="700" fill="${nd.col}">${nd.lbl}</text>`;
        svg += `</g>`;
      });
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips("#chart-timeline .tl-pt", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     10. ATLAS: 16+3 MASTER EXPLORER TABLE + DRAWER (BUG-FREE LEGACY FILTER!)
     ------------------------------------------------------------------------ */
  const trackCls = { code: "b-code", sci: "b-sci", off: "b-off", emb: "b-emb", legacy: "b-leg" };
  const orgCls   = { acad: "org-acad", data: "org-data", prod: "org-prod", lab: "org-lab" };
  const accCls   = { priv: "acc-priv", hyb: "acc-hyb", open: "acc-open" };
  const evInfo   = {
    code:   { cls: "ev-code", label: "代码/精确" },
    rubric: { cls: "ev-rubric", label: "Rubric/清单" },
    human:  { cls: "ev-human", label: "人工终裁" },
    phys:   { cls: "ev-phys", label: "仿真/湿测" }
  };

  const explorerState = { track: "all", org: "all", access: "all", evalType: "all", search: "", sortKey: null, sortAsc: true };

  function renderMasterTable() {
    const tbody = $("#master-tbody");
    if (!tbody) return;
    let list = D.benchmarks.filter(b => {
      if (explorerState.track === "all" && b.track === "legacy") return false;
      if (explorerState.track === "legacy" && b.track !== "legacy") return false;
      if (explorerState.track !== "all" && explorerState.track !== "legacy" && b.track !== explorerState.track) return false;
      if (explorerState.org !== "all" && b.orgType !== explorerState.org) return false;
      if (explorerState.access !== "all" && b.access !== explorerState.access) return false;
      if (explorerState.evalType !== "all" && !b.evalTags.includes(explorerState.evalType)) return false;
      if (explorerState.search) {
        const blob = (b.name + b.org + b.source + b.funnel + b.verifier + b.score + b.lesson + b.evalShort).toLowerCase();
        if (!blob.includes(explorerState.search.toLowerCase())) return false;
      }
      return true;
    });

    if (explorerState.sortKey) {
      list.sort((a, b) => {
        const va = a[explorerState.sortKey], vb = b[explorerState.sortKey];
        if (typeof va === "number") return explorerState.sortAsc ? va - vb : vb - va;
        return explorerState.sortAsc
          ? String(va).localeCompare(String(vb), "zh-CN")
          : String(vb).localeCompare(String(va), "zh-CN");
      });
    }

    const lbl = $("#row-count-label");
    if (lbl) lbl.textContent = `当前展示 ${list.length} 套基准（点击任意行展开右侧完整造榜解剖）`;

    tbody.innerHTML = list.map(b => {
      const evBadges = b.evalTags.map(t => `<span class="badge ${evInfo[t].cls}">${evInfo[t].label}</span>`).join("");
      return `
        <tr class="${b.track === "legacy" ? "legacy-row" : ""}" data-bid="${b.id}">
          <td><span class="b-name">${b.name}</span><span class="badge ${trackCls[b.track]}" style="margin-top:4px;">${b.trackLabel}</span></td>
          <td><span style="font-weight:600;display:block;">${b.org}</span><span class="badge ${orgCls[b.orgType]}" style="margin-top:4px;">${b.orgLabel}</span></td>
          <td><b style="font-variant-numeric:tabular-nums;">${b.release}</b><span class="b-sub">${b.evolution}</span></td>
          <td><b style="font-variant-numeric:tabular-nums;">${b.countStr}</b></td>
          <td><span class="badge ${accCls[b.access]}">${b.accessLabel}</span></td>
          <td><div class="ev-wrap">${evBadges}</div><span class="b-sub">${b.evalShort}</span></td>
          <td>${b.score}</td>
          <td><span class="warn-note">${b.lesson}</span></td>
        </tr>
      `;
    }).join("");

    $$("#master-tbody tr").forEach(tr => {
      tr.addEventListener("click", () => openDrawer(tr.dataset.bid));
    });
  }

  function openDrawer(id) {
    const b = D.benchmarks.find(x => x.id === id);
    const drawer = $("#drawer-content");
    const bg = $("#drawer-bg");
    if (!b || !drawer || !bg) return;

    drawer.innerHTML = `
      <div class="drawer-head">
        <div>
          <div style="display:flex;gap:6px;margin-bottom:7px;flex-wrap:wrap;">
            <span class="badge ${trackCls[b.track]}">${b.trackLabel}</span>
            <span class="badge ${orgCls[b.orgType]}">${b.orgLabel} · ${b.org}</span>
            <span class="badge ${accCls[b.access]}">${b.accessLabel}</span>
          </div>
          <h3 style="font-family:var(--font-serif);font-size:22px;margin:0;color:var(--ink);">${b.name}</h3>
          <div style="font-size:12.4px;color:var(--muted);margin-top:4px;">题量：${b.countStr} ｜ 演进：${b.evolution}</div>
        </div>
        <button class="close-btn" id="drawer-close-btn" aria-label="关闭">×</button>
      </div>
      <div class="d-section">
        <h4>01 · 题源与筛选漏斗</h4>
        <p><b>题源：</b>${b.source}</p>
        <p style="margin-top:7px;"><b>筛选与清洗：</b>${b.funnel}</p>
      </div>
      <div class="d-section">
        <h4>02 · 验证与防作弊机制</h4>
        <p><b>判分逻辑：</b>${b.verifier}</p>
        <p style="margin-top:7px;"><b>防作弊防线：</b>${b.detail.anticheat}</p>
      </div>
      <div class="d-section">
        <h4>03 · 真题现场与踩坑案例</h4>
        <ul>${b.detail.cases.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="d-section">
        <h4>04 · 实测读数、成本与行业采用</h4>
        <p><b>实测读数：</b>${b.score}</p>
        <p style="margin-top:7px;"><b>成本门槛：</b>${b.cost}</p>
        <p style="margin-top:7px;"><b>行业采用：</b>${b.detail.adoption}</p>
        ${b.url ? `<p style="margin-top:9px;"><a href="${b.url}" target="_blank" rel="noopener">直达一手官网 / 论文溯源 →</a></p>` : ""}
      </div>
      <div class="d-section" style="background:var(--terra-soft);border-color:var(--terra-line);">
        <h4>★ 核心造榜教训</h4>
        <p style="font-weight:700;color:var(--terra-dark);">${b.lesson}</p>
      </div>
    `;
    bg.classList.add("open");
    $("#drawer-close-btn").addEventListener("click", closeDrawer);
  }

  function closeDrawer() {
    const bg = $("#drawer-bg");
    if (bg) bg.classList.remove("open");
  }

  /* ------------------------------------------------------------------------
     11. ATLAS: REAL TRADE-OFF BENCHMARK ADVISOR (3 Constraints -> MVP + Traps)
     ------------------------------------------------------------------------ */
  function initAdvisor() {
    const host = $("#advisor-root");
    if (!host || !D.advisorConfig) return;

    const state = { team: "acad", budget: "low", verifier: "code" };
    const cfg = D.advisorConfig;

    function render() {
      const T = cfg.teams[state.team];
      const B = cfg.budgets[state.budget];
      const V = cfg.verifiers[state.verifier];

      const fmt = s => s
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/`(.+?)`/g, '<code style="background:rgba(255,255,255,0.12);padding:1px 5px;border-radius:4px;font-family:var(--font-mono);font-size:0.88em;color:#FFD8C4;">$1</code>');
      const out = $("#advisor-output");
      if (!out) return;

      out.innerHTML = `
        <div class="adv-out-head">TRADE-OFF BLUEPRINT · 约束下的最小可行造榜配方</div>
        <h3 class="adv-out-title">${T.short} × ${B.label} × ${V.label}</h3>

        <div class="adv-block">
          <div class="adv-block-k">01 · 组织阵型与开放策略（别照抄大厂，抄对标样板）</div>
          <p>${fmt(T.orgRule)}</p>
          <p>${fmt(T.openRule)}</p>
          <p style="color:#52C4AD;font-weight:600;margin-top:6px;">最贴近历史样板：${T.precedent}</p>
        </div>

        <div class="adv-block">
          <div class="adv-block-k">02 · 题量卡位与复测成本控法</div>
          <p>${fmt(B.sizeRule)}</p>
          <p>${fmt(B.opsRule)}</p>
        </div>

        <div class="adv-block">
          <div class="adv-block-k">03 · Verifier 架构与必报指标口径</div>
          <p>${fmt(V.archRule)}</p>
          <p>${fmt(V.metricRule)}</p>
        </div>

        <div class="adv-block trap">
          <div class="adv-block-k">⚠ 你这套组合最容易踩死的三个历史大坑</div>
          <ul>
            <li><strong>组织坑：</strong>${fmt(T.trap)}</li>
            <li><strong>预算坑：</strong>${fmt(B.trap)}</li>
            <li><strong>裁判坑：</strong>${fmt(V.trap)}</li>
          </ul>
        </div>
      `;
    }

    $$(".adv-opt", host).forEach(btn => {
      btn.addEventListener("click", () => {
        const dim = btn.dataset.dim;
        state[dim] = btn.dataset.val;
        $$(`.adv-opt[data-dim="${dim}"]`, host).forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        render();
      });
    });

    render();
  }

  /* ------------------------------------------------------------------------
     12. ATLAS: DYNAMIC COMPLETE PRIMARY REFERENCES RENDERER
     ------------------------------------------------------------------------ */
  function renderReferences() {
    const host = $("#ref-grid-host");
    if (!host || !D.references) return;
    const total = D.references.reduce((acc, g) => acc + g.items.length, 0);
    const titleEl = $("#refs-count-title");
    if (titleEl) titleEl.textContent = `全量一手来源索引（${total} 条核验可点击链接）`;

    host.innerHTML = D.references.map(g => `
      <div class="ref-group">
        <h4>${g.cat} (${g.items.length})</h4>
        <ul>
          ${g.items.map(it => `<li><a href="${it.url}" target="_blank" rel="noopener">${it.title}</a></li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  /* ------------------------------------------------------------------------
     13. WIRE CONTROLS & BOOT
     ------------------------------------------------------------------------ */
  function bindSegmented(groupId, callback) {
    const grp = document.getElementById(groupId);
    if (!grp) return;
    $$(".seg-btn", grp).forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".seg-btn", grp).forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        callback(btn.dataset.val);
      });
    });
  }

  function bindPillGroup(groupId, key) {
    const grp = document.getElementById(groupId);
    if (!grp) return;
    $$(".pill", grp).forEach(p => {
      p.addEventListener("click", () => {
        $$(".pill", grp).forEach(x => x.classList.remove("active"));
        p.classList.add("active");
        explorerState[key] = p.dataset.val;
        renderMasterTable();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initReadingChrome();
    renderAAOvernight();
    renderDiagramEquation();
    renderDiagramWaterFunnel();
    renderDiagramHarbor();
    renderEmbodiedSplit();
    renderCodeChart("fswe");
    renderDynamicStats();
    renderAdoptionMatrix("all");
    renderOfficeDual("autobench");
    renderTimelineSVG();
    renderMasterTable();
    initAdvisor();
    renderReferences();

    bindSegmented("adoption-seg", v => renderAdoptionMatrix(v));
    bindSegmented("code-seg", v => renderCodeChart(v));
    bindSegmented("office-seg", v => renderOfficeDual(v));

    bindPillGroup("track-filters", "track");
    bindPillGroup("org-filters", "org");
    bindPillGroup("access-filters", "access");
    bindPillGroup("eval-filters", "evalType");

    const searchBox = $("#search-box");
    if (searchBox) {
      searchBox.addEventListener("input", e => {
        explorerState.search = e.target.value.trim();
        renderMasterTable();
      });
    }

    $$("table.master thead th[data-sort]").forEach(th => {
      th.addEventListener("click", () => {
        const k = th.dataset.sort;
        if (explorerState.sortKey === k) explorerState.sortAsc = !explorerState.sortAsc;
        else { explorerState.sortKey = k; explorerState.sortAsc = true; }
        renderMasterTable();
      });
    });

    const bg = $("#drawer-bg");
    if (bg) {
      bg.addEventListener("click", e => {
        if (e.target.id === "drawer-bg") closeDrawer();
      });
    }
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeDrawer();
    });

    // Deep-link support: atlas.html#bench=fc2 opens the dossier drawer automatically
    const hash = window.location.hash || "";
    const m = hash.match(/bench=([a-z0-9_]+)/i);
    if (m && $("#drawer-content")) {
      const target = document.getElementById("sec-explorer");
      if (target) target.scrollIntoView({ behavior: "instant" });
      setTimeout(() => openDrawer(m[1]), 120);
    }
  });
})();
