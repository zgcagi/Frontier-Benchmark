/* ==========================================================================
   FRONTIER BENCHMARK RESEARCH REPORT · INTERACTIVE VISUALIZATIONS & UI
   Zero external dependencies · Pure SVG + Vanilla ES6 · Offline & Deploy Ready
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
     1. READING PROGRESS BAR + TOC SCROLLSPY + SIDENOTES TOGGLE
     ------------------------------------------------------------------------ */
  function initReadingChrome() {
    const bar = $("#read-progress");
    const pctEl = $("#toc-pct");
    const tocLinks = $$(".toc-link");
    const headings = tocLinks
      .map(a => {
        const id = a.getAttribute("href").slice(1);
        return { id, link: a, el: document.getElementById(id) };
      })
      .filter(x => x.el);

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(100, Math.max(0, (scrollTop / docH) * 100)) : 0;
      if (bar) bar.style.width = pct.toFixed(1) + "%";
      if (pctEl) pctEl.textContent = Math.round(pct) + "%";

      let current = headings[0];
      const offset = 120;
      for (const h of headings) {
        if (h.el.getBoundingClientRect().top <= offset) {
          current = h;
        }
      }
      tocLinks.forEach(a => a.classList.remove("active"));
      if (current) current.link.classList.add("active");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Mobile / narrow-screen inline sidenote toggle
    $$(".sn-ref").forEach(ref => {
      ref.addEventListener("click", () => {
        const targetId = ref.dataset.sn;
        const note = document.getElementById(targetId);
        if (note) note.classList.toggle("open");
      });
    });

    // Copy BibTeX
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
     2. CHART #1 · AA v4.3.2 (10.26) -> v5.0 (10.27) OVERNIGHT SWAP DUMBBELL
     ------------------------------------------------------------------------ */
  function renderAAOvernight() {
    const host = $("#chart-aa-overnight");
    if (!host) return;
    const rows = D.aaOvernight;
    const W = 920, rowH = 44, padL = 190, padR = 130, padT = 46, padB = 42;
    const H = padT + rows.length * rowH + padB;
    const xMin = 20, xMax = 65;
    const toX = v => padL + ((v - xMin) / (xMax - xMin)) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    // Band highlights
    svg += `<rect x="${toX(50)}" y="${padT - 8}" width="${toX(65) - toX(50)}" height="${rows.length * rowH + 8}" fill="#EBF2F7" opacity="0.55"/>`;
    svg += `<text x="${toX(57.5)}" y="${padT - 16}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#26547C">海外闭源区间 (50–65)</text>`;
    svg += `<rect x="${toX(28)}" y="${padT - 8}" width="${toX(48) - toX(28)}" height="${rows.length * rowH + 8}" fill="#FAEDE8" opacity="0.45"/>`;
    svg += `<text x="${toX(38)}" y="${padT - 16}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#B84A2E">换榜后国产区间 (30–46)</text>`;

    // Vertical grid
    [25, 30, 35, 40, 45, 50, 55, 60, 65].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT - 6}" x2="${x}" y2="${H - padB}" stroke="#DFD8CA" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 18}" text-anchor="middle" font-size="11.5" fill="#7E776C">${t}</text>`;
    });

    svg += `<defs>
      <marker id="arr-down" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#B84A2E"/></marker>
      <marker id="arr-up" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#216E5F"/></marker>
    </defs>`;

    rows.forEach((r, i) => {
      const y = padT + i * rowH + rowH / 2;
      const x4 = toX(r.v4);
      const x5 = toX(r.v5);
      const isUp = r.v5 >= r.v4;
      const col = r.group === "us" ? "#26547C" : "#B84A2E";
      const lineCol = isUp ? "#216E5F" : (r.group === "cn" ? "#B84A2E" : "#6E8EA8");

      if (i > 0) {
        svg += `<line x1="12" y1="${padT + i * rowH}" x2="${W - 12}" y2="${padT + i * rowH}" stroke="#EFEAE0"/>`;
      }
      // Separator between US and CN
      if (i === 3) {
        svg += `<line x1="12" y1="${padT + i * rowH}" x2="${W - 12}" y2="${padT + i * rowH}" stroke="#CEC5B4" stroke-dasharray="5,4" stroke-width="1.2"/>`;
      }

      svg += `<g class="aa-row" data-tip="<b>${r.model}</b><br>10.26 (v4.3.2)：<b>${r.v4}</b> → 10.27 (v5.0)：<b>${r.v5}</b> (${r.delta})<br>${r.note}" style="cursor:pointer;">`;
      svg += `<rect x="0" y="${padT + i * rowH}" width="${W}" height="${rowH}" fill="transparent"/>`;
      svg += `<text x="${padL - 14}" y="${y + 4}" text-anchor="end" font-size="13" font-weight="700" fill="${col}">${r.model}</text>`;

      // Connecting arrow
      const offset = isUp ? -7 : 7;
      if (Math.abs(x5 - x4) > 10) {
        svg += `<line x1="${x4}" y1="${y}" x2="${x5 + offset}" y2="${y}" stroke="${lineCol}" stroke-width="2.6" marker-end="url(#${isUp ? "arr-up" : "arr-down"})"/>`;
      } else {
        svg += `<line x1="${x4}" y1="${y}" x2="${x5}" y2="${y}" stroke="${lineCol}" stroke-width="2.4"/>`;
      }

      // v4 hollow dot
      svg += `<circle cx="${x4}" cy="${y}" r="5.5" fill="#FFFFFF" stroke="#847D72" stroke-width="2"/>`;
      svg += `<text x="${x4 + (isUp ? -11 : 11)}" y="${y - 8}" text-anchor="middle" font-size="10.8" fill="#7E776C">${r.v4}</text>`;

      // v5 solid dot
      svg += `<circle cx="${x5}" cy="${y}" r="6.5" fill="${col}" stroke="#FFFFFF" stroke-width="2"/>`;
      svg += `<text x="${x5}" y="${y + 18}" text-anchor="middle" font-size="11.5" font-weight="700" fill="${col}">${r.v5}</text>`;

      // Right Delta Pill
      const pillBg = isUp ? "#E6F3F0" : (r.group === "cn" ? "#FAEDE8" : "#F3EFE6");
      const pillFg = isUp ? "#216E5F" : (r.group === "cn" ? "#B84A2E" : "#5F594F");
      svg += `<rect x="${W - padR + 18}" y="${y - 12}" width="92" height="24" rx="12" fill="${pillBg}"/>`;
      svg += `<text x="${W - padR + 64}" y="${y + 4}" text-anchor="middle" font-size="12" font-weight="700" fill="${pillFg}">${r.delta} 分</text>`;
      svg += `</g>`;
    });

    // Legend
    svg += `<circle cx="${padL}" cy="${H - 8}" r="5" fill="#FFFFFF" stroke="#847D72" stroke-width="2"/>`;
    svg += `<text x="${padL + 10}" y="${H - 4}" font-size="11.5" fill="#5F594F">10.26 旧版 AA v4.3.2</text>`;
    svg += `<circle cx="${padL + 165}" cy="${H - 8}" r="5.5" fill="#26547C"/>`;
    svg += `<text x="${padL + 175}" y="${H - 4}" font-size="11.5" fill="#5F594F">10.27 新版 AA v5.0（海外）</text>`;
    svg += `<circle cx="${padL + 355}" cy="${H - 8}" r="5.5" fill="#B84A2E"/>`;
    svg += `<text x="${padL + 365}" y="${H - 4}" font-size="11.5" fill="#5F594F">10.27 新版 AA v5.0（国产）</text>`;
    svg += `</svg>`;

    host.innerHTML = svg;
    bindTooltips("#chart-aa-overnight .aa-row", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     3. CHART #2 · 10-BENCHMARK US vs CHINA ADOPTION MATRIX
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
      <tr>
        <td><b>${r.name}</b><span class="b-sub">${r.track} · ${r.tag}</span></td>
        ${fmtCell(r.oai)}
        ${fmtCell(r.ant)}
        ${fmtCell(r.goo)}
        ${fmtCell(r.cnOld)}
        ${fmtCell(r.cnNow)}
        <td style="font-size:12.2px;color:var(--muted);">${r.gapNote}</td>
      </tr>
    `).join("");
  }

  /* ------------------------------------------------------------------------
     4. CHART #3 · CODING COST PARETO & LEADERBOARD (FSWE v2 / TB 4.1)
     ------------------------------------------------------------------------ */
  function renderCodeChart(mode = "fswe") {
    const host = $("#chart-code-pareto");
    if (!host) return;

    if (mode === "fswe") {
      // Log-cost ($5 to $1500) vs Score (0 to 78%)
      const data = D.fsweLeaderboard;
      const W = 940, H = 415, padL = 70, padR = 44, padT = 50, padB = 56;
      const xMin = Math.log10(6), xMax = Math.log10(1500);
      const toX = c => padL + ((Math.log10(c) - xMin) / (xMax - xMin)) * (W - padL - padR);
      const toY = s => padT + ((78 - s) / 78) * (H - padT - padB);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

      // Highlight equal-cost vertical comparison band around $96-$110
      const bx1 = toX(82), bx2 = toX(125);
      svg += `<rect x="${bx1}" y="${padT}" width="${bx2 - bx1}" height="${H - padT - padB}" fill="#FDF4E7" opacity="0.85"/>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 20}" text-anchor="middle" font-size="11.2" font-weight="700" fill="#B2620F">同价区 (~$100)</text>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 6}" text-anchor="middle" font-size="10.6" fill="#B2620F">62% vs 30%</text>`;

      // Y grid
      [0, 15, 30, 45, 60, 75].forEach(s => {
        const y = toY(s);
        svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E5DFD3" stroke-dasharray="3,3"/>`;
        svg += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="11.5" fill="#7E776C">${s}%</text>`;
      });

      // X ticks
      [10, 20, 50, 100, 200, 500, 1000].forEach(c => {
        const x = toX(c);
        svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#ECE6DA" stroke-dasharray="3,3"/>`;
        svg += `<text x="${x}" y="${H - padB + 20}" text-anchor="middle" font-size="11.5" fill="#7E776C">$${c}</text>`;
      });
      svg += `<text x="${(padL + W - padR) / 2}" y="${H - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="#1C1A17">FrontierSWE v2 单题平均 Token 成本（对数刻度 · 20 小时预算）</text>`;
      svg += `<text x="18" y="${(padT + H - padB) / 2}" text-anchor="middle" transform="rotate(-90 18 ${(padT + H - padB) / 2})" font-size="12" font-weight="700" fill="#1C1A17">mean@5 解决率 (%)</text>`;

      // Pareto frontier polyline (DeepSeek $8.6 -> Haiku $21 -> Carbon $62 -> Neon $96 -> Fable $169)
      const paretoIds = ["DeepSeek V4 Flash Vision", "Claude Haiku 5.5 (小模型)", "Gemini 4 Carbon", "Gemini 4 Neon", "Claude Fable 5.2"];
      const pts = paretoIds.map(n => data.find(d => d.model === n)).filter(Boolean);
      const pathD = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${toX(p.cost).toFixed(1)},${toY(p.score).toFixed(1)}`).join(" ");
      svg += `<path d="${pathD}" fill="none" stroke="#216E5F" stroke-width="2" stroke-dasharray="6,4" opacity="0.75"/>`;
      svg += `<text x="${toX(14.5)}" y="${toY(53)}" font-size="11.2" font-weight="700" fill="#216E5F">性能-成本 Pareto 前沿 ↗</text>`;

      // Offsets to avoid overlap
      const off = {
        "Claude Fable 5.2": [12, 4],
        "GPT-6 Astra": [-12, 4],
        "Gemini 4 Neon": [12, 16],
        "Gemini 4 Carbon": [-12, -8],
        "Claude Haiku 5.5 (小模型)": [12, 5],
        "GLM-5.3 (最强开源)": [12, -5],
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
        svg += `<circle cx="${x}" cy="${y}" r="7.5" fill="${col}" stroke="#FFFFFF" stroke-width="2.2"/>`;
        svg += `<text x="${x + dx}" y="${y + dy}" text-anchor="${anchor}" font-size="11.6" font-weight="700" fill="${col}">${d.model} (${d.score}%)</text>`;
        svg += `</g>`;
      });

      svg += `</svg>`;
      host.innerHTML = svg;
      bindTooltips("#chart-code-pareto .code-pt", el => el.dataset.tip);
    } else {
      // TB 4.1 Horizontal Bars + Cost Column
      const data = D.tb41Leaderboard;
      const W = 940, rowH = 36, padL = 188, padR = 230, padT = 32, padB = 22;
      const H = padT + data.length * rowH + padB;
      const maxS = 80;
      const toW = s => (s / maxS) * (W - padL - padR);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
      svg += `<text x="${padL - 12}" y="18" text-anchor="end" font-size="11.5" font-weight="700" fill="#7E776C">模型</text>`;
      svg += `<text x="${padL}" y="18" font-size="11.5" font-weight="700" fill="#7E776C">TB 4.1 官方解决率（66 题 · 8h 超时）</text>`;
      svg += `<text x="${W - padR + 82}" y="18" text-anchor="end" font-size="11.5" font-weight="700" fill="#7E776C">单轮总成本</text>`;
      svg += `<text x="${W - padR + 102}" y="18" font-size="11.5" font-weight="700" fill="#7E776C">备注 / Harness</text>`;

      data.forEach((d, i) => {
        const y = padT + i * rowH + 6;
        const barW = toW(d.score);
        const col = d.cn ? "#216E5F" : "#26547C";
        const costCol = d.cost >= 10 ? "#B84A2E" : (d.cost <= 0.4 ? "#216E5F" : "#5F594F");

        svg += `<g class="tb-pt" data-tip="<b>${d.model}</b><br>TB 4.1 解决率：<b>${d.score}%</b> ｜ 跑一轮成本：<b>${d.costLabel}</b><br>框架：${d.harness}" style="cursor:pointer;">`;
        svg += `<rect x="0" y="${y - 4}" width="${W}" height="${rowH - 2}" fill="transparent"/>`;
        svg += `<text x="${padL - 12}" y="${y + 15}" text-anchor="end" font-size="12.5" font-weight="${d.cn ? "700" : "600"}" fill="${d.cn ? "#216E5F" : "#1C1A17"}">${d.model}</text>`;
        svg += `<rect x="${padL}" y="${y + 3}" width="${W - padL - padR}" height="16" rx="4" fill="#EFEAE0"/>`;
        svg += `<rect x="${padL}" y="${y + 3}" width="${barW}" height="16" rx="4" fill="${col}"/>`;
        svg += `<text x="${padL + barW + 8}" y="${y + 15}" font-size="12" font-weight="700" fill="${col}">${d.score}%</text>`;
        svg += `<text x="${W - padR + 82}" y="${y + 15}" text-anchor="end" font-size="12" font-weight="700" fill="${costCol}">${d.costLabel}</text>`;
        svg += `<text x="${W - padR + 102}" y="${y + 15}" font-size="11.3" fill="#7E776C">${d.harness}</text>`;
        svg += `</g>`;
      });

      svg += `</svg>`;
      host.innerHTML = svg;
      bindTooltips("#chart-code-pareto .tb-pt", el => el.dataset.tip);
    }
  }

  /* ------------------------------------------------------------------------
     5. CHART #4 · OFFICE DUAL-METRIC GAP (AutomationBench-AA & ALE v1.1)
     ------------------------------------------------------------------------ */
  function renderOfficeDual(mode = "autobench") {
    const host = $("#chart-office-dual");
    if (!host) return;
    const rows = D.officeDualMetrics[mode] || D.officeDualMetrics.autobench;
    const partialLbl = mode === "autobench" ? "子目标步骤分 (Partial)" : "步骤平均分 (Partial)";
    const strictLbl = mode === "autobench" ? "严格全通率 (Strict · 0 违规)" : "严格全通率 (Strict · 整单零失误)";

    const W = 900, rowH = 48, padL = 180, padR = 110, padT = 36, padB = 34;
    const H = padT + rows.length * rowH + padB;
    const toX = v => padL + (v / 95) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    [0, 20, 40, 60, 80].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#E5DFD3" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 18}" text-anchor="middle" font-size="11.2" fill="#7E776C">${t}%</text>`;
    });

    rows.forEach((r, i) => {
      const y = padT + i * rowH + 6;
      const gap = (r.partial - r.strict).toFixed(1);
      const xp = toX(r.partial), xs = toX(r.strict);
      svg += `<g class="off-pt" data-tip="<b>${r.model}</b><br>${partialLbl}：<b>${r.partial}%</b><br>${strictLbl}：<b>${r.strict}%</b><br>两档口径落差：<b style='color:#E88266;'>−${gap} 个百分点</b>" style="cursor:pointer;">`;
      svg += `<text x="${padL - 12}" y="${y + 20}" text-anchor="end" font-size="12.6" font-weight="700" fill="${r.cn ? "#216E5F" : "#1C1A17"}">${r.model}</text>`;
      // Partial bar (top)
      svg += `<rect x="${padL}" y="${y + 3}" width="${xp - padL}" height="12" rx="3" fill="#CBD9E6"/>`;
      svg += `<text x="${xp + 6}" y="${y + 13}" font-size="11.2" font-weight="600" fill="#26547C">${r.partial}%</text>`;
      // Strict bar (bottom)
      svg += `<rect x="${padL}" y="${y + 18}" width="${xs - padL}" height="12" rx="3" fill="${r.cn ? "#216E5F" : "#B84A2E"}"/>`;
      svg += `<text x="${xs + 6}" y="${y + 28}" font-size="11.2" font-weight="700" fill="${r.cn ? "#216E5F" : "#B84A2E"}">${r.strict}%</text>`;
      // Drop badge
      svg += `<rect x="${W - padR + 14}" y="${y + 6}" width="84" height="22" rx="11" fill="#FAEDE8"/>`;
      svg += `<text x="${W - padR + 56}" y="${y + 21}" text-anchor="middle" font-size="11.4" font-weight="700" fill="#B84A2E">−${gap} pt</text>`;
      svg += `</g>`;
    });

    // Legend
    svg += `<rect x="${padL}" y="8" width="12" height="10" rx="2" fill="#CBD9E6"/>`;
    svg += `<text x="${padL + 17}" y="17" font-size="11.5" fill="#5F594F">${partialLbl}</text>`;
    svg += `<rect x="${padL + 235}" y="8" width="12" height="10" rx="2" fill="#B84A2E"/>`;
    svg += `<text x="${padL + 252}" y="17" font-size="11.5" fill="#5F594F">${strictLbl}（青色为国产模型）</text>`;
    svg += `</svg>`;

    host.innerHTML = svg;
    bindTooltips("#chart-office-dual .off-pt", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     6. CHART #5 · 2D -> DESKTOP -> 3D -> REALTIME CLIFF
     ------------------------------------------------------------------------ */
  function renderEmbodiedCliff() {
    const host = $("#chart-embodied-cliff");
    if (!host) return;
    const stages = D.embodiedProgression;
    const W = 940, H = 340, padL = 56, padR = 24, padT = 44, padB = 68;
    const innerW = W - padL - padR;
    const groupW = innerW / stages.length;
    const toY = v => padT + ((100 - v) / 100) * (H - padT - padB);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    [0, 25, 50, 75, 100].forEach(t => {
      const y = toY(t);
      svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E5DFD3" stroke-dasharray="3,3"/>`;
      svg += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="11.2" fill="#7E776C">${t}%</text>`;
    });

    // Legend
    const leg = [["Claude Fable 5.2", "#B84A2E"], ["GPT-6 Astra", "#26547C"], ["Gemini 4 Carbon", "#216E5F"]];
    leg.forEach(([lbl, col], i) => {
      const lx = padL + i * 165;
      svg += `<rect x="${lx}" y="10" width="12" height="12" rx="3" fill="${col}"/>`;
      svg += `<text x="${lx + 18}" y="20" font-size="12" font-weight="600" fill="#38342E">${lbl}</text>`;
    });

    stages.forEach((st, idx) => {
      const gx = padL + idx * groupW + groupW / 2;
      const bw = 28, gap = 6;
      const vals = [
        { k: "Fable 5.2", v: st.fable, col: "#B84A2E" },
        { k: "GPT-6 Astra", v: st.gpt, col: "#26547C" },
        { k: "Gemini 4", v: st.gemini, col: "#216E5F" }
      ];

      // Special shading for Realtime Cliff
      if (idx === 4) {
        svg += `<rect x="${padL + idx * groupW + 10}" y="${padT}" width="${groupW - 20}" height="${H - padT - padB}" rx="8" fill="#FAEDE8" opacity="0.65"/>`;
        svg += `<text x="${gx}" y="${padT + 22}" text-anchor="middle" font-size="11.2" font-weight="800" fill="#B84A2E">63.0% 任务三家全 0 分</text>`;
        svg += `<rect x="${gx - 38}" y="${toY(37)}" width="76" height="${toY(0) - toY(37)}" rx="5" fill="#7D355B" class="emb-pt" data-tip="<b>Embodied First Exam (456 核心题)</b><br>${st.note}" style="cursor:pointer;"/>`;
        svg += `<text x="${gx}" y="${toY(37) - 7}" text-anchor="middle" font-size="12" font-weight="700" fill="#7D355B">仅 37% 非零</text>`;
      } else {
        const startX = gx - (3 * bw + 2 * gap) / 2;
        vals.forEach((item, j) => {
          const bx = startX + j * (bw + gap);
          if (item.v === null) {
            svg += `<text x="${bx + bw / 2}" y="${toY(0) - 8}" text-anchor="middle" font-size="10.5" fill="#847D72">未报</text>`;
            return;
          }
          const y = toY(item.v);
          const h = toY(0) - y;
          svg += `<g class="emb-pt" data-tip="<b>${st.stage.replace("\n", " · ")}</b><br>${item.k}：<b>${item.v}%</b><br>${st.note}" style="cursor:pointer;">`;
          svg += `<rect x="${bx}" y="${y}" width="${bw}" height="${h}" rx="4" fill="${item.col}"/>`;
          svg += `<text x="${bx + bw / 2}" y="${y - 6}" text-anchor="middle" font-size="10.8" font-weight="700" fill="${item.col}">${item.v}${idx === 3 && j === 0 ? "‡" : ""}</text>`;
          svg += `</g>`;
        });
      }

      // Stage multi-line label
      const lines = st.stage.split("\n");
      lines.forEach((ln, li) => {
        svg += `<text x="${gx}" y="${H - padB + 22 + li * 16}" text-anchor="middle" font-size="${li === 0 ? "12" : "10.8"}" font-weight="${li === 0 ? "700" : "500"}" fill="${li === 0 ? "#1C1A17" : "#5F594F"}">${ln}</text>`;
      });
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips("#chart-embodied-cliff .emb-pt", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     7. WIDGET #6 · 16+3 MASTER EXPLORER TABLE + SLIDE-OUT DRAWER
     ------------------------------------------------------------------------ */
  const trackCls = { code: "b-code", sci: "b-sci", off: "b-off", emb: "b-emb", legacy: "b-leg" };
  const orgCls   = { acad: "org-acad", data: "org-data", prod: "org-prod", lab: "org-lab" };
  const accCls   = { priv: "acc-priv", hyb: "acc-hyb", open: "acc-open" };
  const evInfo   = {
    code:   { cls: "ev-code", label: "代码/精确" },
    rubric: { cls: "ev-rubric", label: "Rubric/LLM" },
    human:  { cls: "ev-human", label: "人工" },
    phys:   { cls: "ev-phys", label: "仿真/实测" }
  };

  const explorerState = { track: "all", org: "all", access: "all", evalType: "all", search: "", sortKey: null, sortAsc: true };

  function renderMasterTable() {
    const tbody = $("#master-tbody");
    if (!tbody) return;
    let list = D.benchmarks.filter(b => {
      if (explorerState.track === "all" && b.track === "legacy") return false;
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
    if (lbl) lbl.textContent = `当前展示 ${list.length} 套基准（点击任意行查看右侧详细档案）`;

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
          <h3 style="font-family:var(--font-serif);font-size:23px;margin:0;color:var(--ink);">${b.name}</h3>
          <div style="font-size:12.5px;color:var(--muted);margin-top:4px;">题量：${b.countStr} ｜ 版本演进：${b.evolution}</div>
        </div>
        <button class="close-btn" id="drawer-close-btn" aria-label="关闭">×</button>
      </div>
      <div class="d-section">
        <h4>01 · 题源与筛选流程</h4>
        <p><b>题源：</b>${b.source}</p>
        <p style="margin-top:7px;"><b>筛选与清洗：</b>${b.funnel}</p>
      </div>
      <div class="d-section">
        <h4>02 · Verifier 与防作弊设计</h4>
        <p><b>验证逻辑：</b>${b.verifier}</p>
        <p style="margin-top:7px;"><b>防作弊隔离：</b>${b.detail.antichat}</p>
      </div>
      <div class="d-section">
        <h4>03 · 典型题目与实测案例</h4>
        <ul>${b.detail.cases.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="d-section">
        <h4>04 · 代表成绩、成本与采用情况</h4>
        <p><b>代表成绩：</b>${b.score}</p>
        <p style="margin-top:7px;"><b>成本门槛：</b>${b.cost}</p>
        <p style="margin-top:7px;"><b>行业采用：</b>${b.detail.adoption}</p>
      </div>
      <div class="d-section" style="background:var(--terra-soft);border-color:var(--terra-line);">
        <h4>★ 核心经验</h4>
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
     8. CHART #7 · LOG SCATTER PLOT & 5-FAMILY EVOLUTION TIMELINE
     ------------------------------------------------------------------------ */
  function renderScatterSVG() {
    const host = $("#chart-scatter");
    if (!host) return;
    const W = 1040, H = 400, padL = 135, padR = 32, padT = 38, padB = 52;
    const xMin = Math.log10(4.5), xMax = Math.log10(3400);
    const toX = n => padL + ((Math.log10(n) - xMin) / (xMax - xMin)) * (W - padL - padR);
    const toY = c => padT + ((5.5 - c) / (5.5 - 0.8)) * (H - padT - padB);
    const trackColor = { code: "#26547C", sci: "#216E5F", off: "#B2620F", emb: "#7D355B", legacy: "#847D72" };

    const x50 = toX(50), x250 = toX(250);
    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    svg += `<rect x="${padL}" y="${padT}" width="${x50 - padL}" height="${H - padT - padB}" fill="#FAEDE8" opacity="0.6"/>`;
    svg += `<rect x="${x50}" y="${padT}" width="${x250 - x50}" height="${H - padT - padB}" fill="#E6F3F0" opacity="0.65"/>`;
    svg += `<rect x="${x250}" y="${padT}" width="${W - padR - x250}" height="${H - padT - padB}" fill="#F4F0E7" opacity="0.7"/>`;

    svg += `<text x="${(padL + x50) / 2}" y="${padT + 18}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#B84A2E">高方差区 (&lt;50 题)</text>`;
    svg += `<text x="${(x50 + x250) / 2}" y="${padT + 18}" text-anchor="middle" font-size="12" font-weight="800" fill="#216E5F">合理题量区间 (50–250 道重题)</text>`;
    svg += `<text x="${(x250 + W - padR) / 2}" y="${padT + 18}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#5F594F">大题量 / 轻量自动化区</text>`;

    svg += `<line x1="${x50}" y1="${padT}" x2="${x50}" y2="${H - padB}" stroke="#B84A2E" stroke-width="1.6" stroke-dasharray="6,4"/>`;
    svg += `<line x1="${x250}" y1="${padT}" x2="${x250}" y2="${H - padB}" stroke="#216E5F" stroke-width="1.6" stroke-dasharray="6,4"/>`;

    [
      [1.2, "单轮静态问答 (秒级)"],
      [2.2, "短程单软件 (分钟级)"],
      [3.2, "跨软件/容器 (0.5–4h)"],
      [4.2, "多轮实验/项目 (数天)"],
      [5.1, "超长程工程 (20–24h)"]
    ].forEach(([val, lbl]) => {
      const y = toY(val);
      svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#DFD8CA" stroke-dasharray="3,3"/>`;
      svg += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="11.2" fill="#5F594F" font-weight="600">${lbl}</text>`;
    });

    [6, 15, 34, 50, 100, 250, 500, 1000, 2500].forEach(n => {
      const x = toX(n);
      svg += `<line x1="${x}" y1="${H - padB}" x2="${x}" y2="${H - padB + 6}" stroke="#847D72"/>`;
      svg += `<text x="${x}" y="${H - padB + 20}" text-anchor="middle" font-size="11.2" fill="${(n === 50 || n === 250) ? "#1C1A17" : "#7E776C"}" font-weight="${(n === 50 || n === 250) ? "800" : "500"}">${n}</text>`;
    });
    svg += `<text x="${(padL + W - padR) / 2}" y="${H - 10}" text-anchor="middle" font-size="11.8" font-weight="700" fill="#1C1A17">题目数量规模（对数横轴 · 点击任意节点查看右侧详细档案）</text>`;

    svg += `<defs><marker id="arr-sc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#B84A2E"/></marker></defs>`;
    [
      ["asb", "twinlab", "38天扩至52题", 0, -10],
      ["osworld1", "osworld", "耗时×48重做", -44, 10],
      ["swe_full", "fc2", "转向合并标准", 28, -12]
    ].forEach(([aId, bId, lbl, dx, dy]) => {
      const a = D.benchmarks.find(x => x.id === aId), b = D.benchmarks.find(x => x.id === bId);
      if (!a || !b) return;
      const x1 = toX(a.countNum), y1 = toY(a.complexity), x2 = toX(b.countNum), y2 = toY(b.complexity);
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#B84A2E" stroke-width="1.6" stroke-dasharray="5,3" marker-end="url(#arr-sc)" opacity="0.72"/>`;
      svg += `<text x="${(x1 + x2) / 2 + dx}" y="${(y1 + y2) / 2 + dy}" text-anchor="middle" font-size="10.4" font-weight="700" fill="#B84A2E">${lbl}</text>`;
    });

    const offsets = {
      fc2: [10, 4], fswe2: [10, 4], tb41: [-10, -10], hle: [-10, -10], biomy: [-10, 15],
      tbs: [-10, 4], asb: [6, 18], twinlab: [10, -8], biobasics: [10, 4], binder: [0, 18],
      autobench: [0, -12], ale: [8, 16], briefcase: [-10, -10], rli: [10, 4], charto: [10, 4],
      osworld: [10, -8], robodojo: [10, 4], firstexam: [10, 4], swe_full: [10, -8], swe_pro: [0, 18], osworld1: [10, 14]
    };

    D.benchmarks.forEach(b => {
      const x = toX(b.countNum), y = toY(b.complexity);
      const col = trackColor[b.track];
      const [dx, dy] = offsets[b.id] || [10, 4];
      const anchor = dx < 0 ? "end" : (dx === 0 ? "middle" : "start");
      const r = b.track === "legacy" ? 5.8 : 7.2;
      svg += `<g class="sc-pt" data-id="${b.id}" style="cursor:pointer;">`;
      svg += `<circle cx="${x}" cy="${y}" r="${r}" fill="${b.track === "legacy" ? "#FFFFFF" : col}" stroke="${col}" stroke-width="2.2"/>`;
      svg += `<text x="${x + dx}" y="${y + dy}" text-anchor="${anchor}" font-size="11" font-weight="700" fill="${col}">${b.name.replace("[旧代对照] ", "")} (${b.countNum})</text>`;
      svg += `</g>`;
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips(
      "#chart-scatter .sc-pt",
      el => {
        const b = D.benchmarks.find(x => x.id === el.dataset.id);
        return `<b>${b.name}</b> (${b.org})<br>题量：${b.countStr} ｜ 开放：${b.accessLabel}<br>代表成绩：${b.score}<br><span style="color:#E88266;">点击节点查看右侧详细档案</span>`;
      },
      el => openDrawer(el.dataset.id)
    );
  }

  function renderTimelineSVG() {
    const host = $("#chart-timeline");
    if (!host) return;
    const W = 1040, H = 330, padL = 152, padR = 42, padT = 36, padB = 38;
    const tMin = 2023.75, tMax = 2027.0;
    const toX = t => padL + ((t - tMin) / (tMax - tMin)) * (W - padL - padR);
    const lanes = D.timelineLanes;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    const x26 = toX(2026.0);
    svg += `<rect x="${x26}" y="${padT - 6}" width="${W - padR - x26}" height="${H - padT - padB + 10}" fill="#FAEDE8" opacity="0.45"/>`;
    svg += `<text x="${(x26 + W - padR) / 2}" y="${padT - 12}" text-anchor="middle" font-size="11.4" font-weight="700" fill="#B84A2E">2026 集中换代与清洗窗口</text>`;

    [2024.0, 2024.5, 2025.0, 2025.5, 2026.0, 2026.5, 2026.92].forEach(t => {
      const x = toX(t);
      const yr = Math.floor(t), mo = Math.round((t - yr) * 12) + 1;
      const lbl = `${yr}.${String(Math.min(12, mo)).padStart(2, "0")}`;
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#E5DFD3" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - 14}" text-anchor="middle" font-size="11" fill="#7E776C">${lbl}</text>`;
    });

    const laneH = (H - padT - padB) / lanes.length;
    lanes.forEach((ln, idx) => {
      const y = padT + laneH * idx + laneH / 2;
      svg += `<text x="10" y="${y - 2}" font-size="12.2" font-weight="800" fill="#1C1A17">${ln.name}</text>`;
      svg += `<text x="10" y="${y + 13}" font-size="10.4" fill="#7E776C">${ln.sub}</text>`;
      const firstX = toX(ln.nodes[0].t), lastX = toX(ln.nodes[ln.nodes.length - 1].t);
      svg += `<line x1="${firstX}" y1="${y}" x2="${lastX}" y2="${y}" stroke="#CEC5B4" stroke-width="2.8" stroke-linecap="round"/>`;
      ln.nodes.forEach((nd, ni) => {
        const x = toX(nd.t);
        let dx = 0;
        let yOff = (ni % 2 === 0) ? -14 : 21;
        if (nd.lbl.includes("锁122题")) { dx = -24; yOff = 21; }
        if (nd.lbl.includes("TwinLab")) { dx = 18; yOff = 21; }
        if (nd.lbl.includes("ASB 0.1")) { dx = 8; yOff = -14; }
        if (nd.lbl.includes("ALE v1.0")) { dx = -10; yOff = -14; }
        svg += `<g class="tl-pt" data-tip="<b>${nd.lbl}</b><br>${nd.tip}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="6.2" fill="${nd.col}" stroke="#FFFFFF" stroke-width="2"/>`;
        svg += `<text x="${x + dx}" y="${y + yOff}" text-anchor="middle" font-size="10.4" font-weight="700" fill="${nd.col}">${nd.lbl}</text>`;
        svg += `</g>`;
      });
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips("#chart-timeline .tl-pt", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     9. WIDGET #8 · BENCHMARK DIAGNOSTIC SCORECARD
     ------------------------------------------------------------------------ */
  function initChecklist() {
    const wrap = $("#checklist-wrap");
    if (!wrap) return;
    wrap.innerHTML = D.checks.map(c => `
      <label class="check-item">
        <input type="checkbox" id="${c.id}" checked>
        <div>
          <div class="check-title">${c.title} <span style="color:var(--terra);font-size:11.2px;font-family:var(--font-mono);">(+${c.pts}分)</span></div>
          <div class="check-desc">${c.desc}</div>
        </div>
      </label>
    `).join("");

    D.checks.forEach(c => {
      const cb = document.getElementById(c.id);
      if (cb) cb.addEventListener("change", updateDiag);
    });

    $$(".preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const presets = {
          gold: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"],
          asb:  ["c2", "c3", "c4", "c6"],
          old:  ["c1"]
        };
        const list = presets[btn.dataset.preset] || [];
        D.checks.forEach(c => {
          const cb = document.getElementById(c.id);
          if (cb) cb.checked = list.includes(c.id);
        });
        updateDiag();
      });
    });

    updateDiag();
  }

  function updateDiag() {
    let score = 0;
    const alerts = [];
    D.checks.forEach(c => {
      const cb = document.getElementById(c.id);
      if (cb && cb.checked) score += c.pts;
      else alerts.push(`<div class="alert-item alert-warn">${c.warn}</div>`);
    });
    const sEl = $("#diag-score");
    const vEl = $("#diag-verdict");
    const aEl = $("#diag-alerts");
    if (sEl) sEl.textContent = `${score} / 100`;
    if (vEl) {
      if (score >= 90) {
        vEl.textContent = "工业级标准（适合进入主榜并复用于 RL）";
        vEl.style.color = "#52C4AD";
      } else if (score >= 65) {
        vEl.textContent = "基本可用，但在审计或防作弊上存在短板";
        vEl.style.color = "#F3B664";
      } else {
        vEl.textContent = "风险较高：容易快速饱和或难以被行业采用";
        vEl.style.color = "#E88266";
      }
    }
    if (aEl) {
      if (alerts.length === 0) {
        aEl.innerHTML = `<div class="alert-item alert-ok">8 项检查全部通过：具备统计稳定性、防作弊隔离，并可直接复用于 RL 训练环境。</div>`;
      } else {
        aEl.innerHTML = alerts.slice(0, 4).join("");
      }
    }
  }

  /* ------------------------------------------------------------------------
     10. WIRE ALL CONTROLS & BOOT
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
    renderAdoptionMatrix("all");
    renderCodeChart("fswe");
    renderOfficeDual("autobench");
    renderEmbodiedCliff();
    renderMasterTable();
    renderScatterSVG();
    renderTimelineSVG();
    initChecklist();

    bindSegmented("adoption-seg", v => renderAdoptionMatrix(v));
    bindSegmented("code-seg", v => renderCodeChart(v));
    bindSegmented("office-seg", v => renderOfficeDual(v));
    bindSegmented("pattern-seg", v => {
      $$(".pattern-pane").forEach(p => {
        p.style.display = (p.id === "pane-" + v) ? "block" : "none";
      });
    });

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
  });
})();
