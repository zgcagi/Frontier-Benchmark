/* ==========================================================================
   FRONTIER EVALUATION SURVEY · MINIMALIST SVG CHARTS & INTERACTIONS
   Zero external dependencies · Calm 2–3 tone academic palette
   ========================================================================== */

(function () {
  const D = window.REPORT_DATA;
  if (!D) return;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Calm academic palette
  const C = {
    ink: "#1A1A1A",
    muted: "#666666",
    faint: "#8A8A8A",
    grid: "#E5E7EB",
    track: "#F3F4F6",
    blue: "#1F4E79",
    blueLight: "#B8CCE0",
    rust: "#A84A32",
    sage: "#3D6B5E",
    grayBar: "#CBD5E1"
  };

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
        const x = Math.min(window.innerWidth - 336, e.clientX + 14);
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
     1. INLINE FOOTNOTES & COPY BIBTEX
     ------------------------------------------------------------------------ */
  function initReadingChrome() {
    $$(".sn-ref").forEach(ref => {
      ref.addEventListener("click", () => {
        const targetId = ref.dataset.sn;
        const note = document.getElementById(targetId);
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
          copyBtn.textContent = "已复制";
          setTimeout(() => (copyBtn.textContent = old), 1600);
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     2. CHART #1 · AA v4.3.2 (10.26) -> v5.0 (10.27) OVERNIGHT SWAP
     ------------------------------------------------------------------------ */
  function renderAAOvernight() {
    const host = $("#chart-aa-overnight");
    if (!host) return;
    const rows = D.aaOvernight;
    const W = 860, rowH = 40, padL = 178, padR = 88, padT = 32, padB = 42;
    const H = padT + rows.length * rowH + padB;
    const xMin = 20, xMax = 65;
    const toX = v => padL + ((v - xMin) / (xMax - xMin)) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    // Vertical gridlines
    [25, 30, 35, 40, 45, 50, 55, 60, 65].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT - 6}" x2="${x}" y2="${H - padB}" stroke="${C.grid}" stroke-dasharray="2,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 16}" text-anchor="middle" font-size="11" fill="${C.faint}">${t}</text>`;
    });

    svg += `<defs>
      <marker id="arr-down" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="${C.rust}"/></marker>
      <marker id="arr-up" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="${C.sage}"/></marker>
    </defs>`;

    rows.forEach((r, i) => {
      const y = padT + i * rowH + rowH / 2;
      const x4 = toX(r.v4);
      const x5 = toX(r.v5);
      const isUp = r.v5 >= r.v4;
      const col = r.group === "us" ? C.blue : C.rust;
      const lineCol = isUp ? C.sage : (r.group === "cn" ? C.rust : "#8FA7BE");

      if (i === 3) {
        svg += `<line x1="8" y1="${padT + i * rowH}" x2="${W - 8}" y2="${padT + i * rowH}" stroke="#D1D5DB" stroke-dasharray="4,4"/>`;
      } else if (i > 0) {
        svg += `<line x1="8" y1="${padT + i * rowH}" x2="${W - 8}" y2="${padT + i * rowH}" stroke="#F3F4F6"/>`;
      }

      svg += `<g class="aa-row" data-tip="<b>${r.model}</b><br>10.26 (v4.3.2)：<b>${r.v4}</b> → 10.27 (v5.0)：<b>${r.v5}</b> (${r.delta})<br>${r.note}" style="cursor:pointer;">`;
      svg += `<rect x="0" y="${padT + i * rowH}" width="${W}" height="${rowH}" fill="transparent"/>`;
      svg += `<text x="${padL - 14}" y="${y + 4}" text-anchor="end" font-size="12.5" font-weight="600" fill="${C.ink}">${r.model}</text>`;

      const offset = isUp ? -6.5 : 6.5;
      if (Math.abs(x5 - x4) > 10) {
        svg += `<line x1="${x4}" y1="${y}" x2="${x5 + offset}" y2="${y}" stroke="${lineCol}" stroke-width="2" marker-end="url(#${isUp ? "arr-up" : "arr-down"})"/>`;
      } else {
        svg += `<line x1="${x4}" y1="${y}" x2="${x5}" y2="${y}" stroke="${lineCol}" stroke-width="2"/>`;
      }

      svg += `<circle cx="${x4}" cy="${y}" r="4.5" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1.8"/>`;
      svg += `<text x="${x4 + (isUp ? -10 : 10)}" y="${y - 8}" text-anchor="middle" font-size="10.5" fill="${C.faint}">${r.v4}</text>`;

      svg += `<circle cx="${x5}" cy="${y}" r="5.5" fill="${col}" stroke="#FFFFFF" stroke-width="1.5"/>`;
      svg += `<text x="${x5}" y="${y + 16}" text-anchor="middle" font-size="11" font-weight="600" fill="${col}">${r.v5}</text>`;

      const deltaCol = isUp ? C.sage : (r.group === "cn" ? C.rust : C.muted);
      svg += `<text x="${W - 14}" y="${y + 4}" text-anchor="end" font-family="var(--font-mono)" font-size="12" font-weight="600" fill="${deltaCol}">${r.delta} 分</text>`;
      svg += `</g>`;
    });

    // Clean bottom legend
    svg += `<circle cx="${padL}" cy="${H - 8}" r="4.5" fill="#FFFFFF" stroke="#9CA3AF" stroke-width="1.8"/>`;
    svg += `<text x="${padL + 10}" y="${H - 4}" font-size="11.2" fill="${C.muted}">10.26 v4.3.2</text>`;
    svg += `<circle cx="${padL + 115}" cy="${H - 8}" r="5" fill="${C.blue}"/>`;
    svg += `<text x="${padL + 125}" y="${H - 4}" font-size="11.2" fill="${C.muted}">10.27 v5.0（海外）</text>`;
    svg += `<circle cx="${padL + 265}" cy="${H - 8}" r="5" fill="${C.rust}"/>`;
    svg += `<text x="${padL + 275}" y="${H - 4}" font-size="11.2" fill="${C.muted}">10.27 v5.0（国产）</text>`;
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
      const data = D.fsweLeaderboard;
      const W = 880, H = 390, padL = 62, padR = 36, padT = 36, padB = 52;
      const xMin = Math.log10(6), xMax = Math.log10(1500);
      const toX = c => padL + ((Math.log10(c) - xMin) / (xMax - xMin)) * (W - padL - padR);
      const toY = s => padT + ((78 - s) / 78) * (H - padT - padB);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

      // Subtle ~$100 band
      const bx1 = toX(82), bx2 = toX(125);
      svg += `<rect x="${bx1}" y="${padT}" width="${bx2 - bx1}" height="${H - padT - padB}" fill="#F8F9FA"/>`;
      svg += `<line x1="${bx1}" y1="${padT}" x2="${bx1}" y2="${H - padB}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<line x1="${bx2}" y1="${padT}" x2="${bx2}" y2="${H - padB}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 10}" text-anchor="middle" font-size="10.8" fill="${C.muted}">~$100 同成本带 (62% vs 30%)</text>`;

      [0, 15, 30, 45, 60, 75].forEach(s => {
        const y = toY(s);
        svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${C.grid}" stroke-dasharray="2,3"/>`;
        svg += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="${C.faint}">${s}%</text>`;
      });

      [10, 20, 50, 100, 200, 500, 1000].forEach(c => {
        const x = toX(c);
        svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#F3F4F6"/>`;
        svg += `<text x="${x}" y="${H - padB + 18}" text-anchor="middle" font-size="11" fill="${C.faint}">$${c}</text>`;
      });
      svg += `<text x="${(padL + W - padR) / 2}" y="${H - 10}" text-anchor="middle" font-size="11.5" font-weight="600" fill="${C.muted}">单题平均 Token 成本（对数刻度 · 20 小时上限）</text>`;
      svg += `<text x="16" y="${(padT + H - padB) / 2}" text-anchor="middle" transform="rotate(-90 16 ${(padT + H - padB) / 2})" font-size="11.5" font-weight="600" fill="${C.muted}">mean@5 解决率 (%)</text>`;

      const paretoIds = ["DeepSeek V4 Flash Vision", "Claude Haiku 5.5 (小模型)", "Gemini 4 Carbon", "Gemini 4 Neon", "Claude Fable 5.2"];
      const pts = paretoIds.map(n => data.find(d => d.model === n)).filter(Boolean);
      const pathD = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${toX(p.cost).toFixed(1)},${toY(p.score).toFixed(1)}`).join(" ");
      svg += `<path d="${pathD}" fill="none" stroke="#9CA3AF" stroke-width="1.5" stroke-dasharray="5,4"/>`;
      svg += `<text x="${toX(14)}" y="${toY(53)}" font-size="10.8" fill="${C.muted}">Pareto 前沿</text>`;

      const off = {
        "Claude Fable 5.2": [11, 4],
        "GPT-6 Astra": [-11, 4],
        "Gemini 4 Neon": [11, 15],
        "Gemini 4 Carbon": [-11, -7],
        "Claude Haiku 5.5 (小模型)": [11, 4],
        "GLM-5.3 (最强开源)": [11, -5],
        "Kimi K3": [11, 11],
        "Qwen3.8-Max": [-11, 4],
        "DeepSeek V4 Flash Vision": [11, 4]
      };

      data.forEach(d => {
        const x = toX(d.cost), y = toY(d.score);
        const col = d.cn ? C.rust : C.blue;
        const [dx, dy] = off[d.model] || [10, 4];
        const anchor = dx < 0 ? "end" : "start";
        svg += `<g class="code-pt" data-tip="<b>${d.model}</b><br>解决率：<b>${d.score}%</b> ｜ 单题成本：<b>${d.costLabel}</b> ｜ 均耗时：<b>${d.hours}</b><br>${d.note}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="6" fill="${col}" stroke="#FFFFFF" stroke-width="1.8"/>`;
        svg += `<text x="${x + dx}" y="${y + dy}" text-anchor="${anchor}" font-size="11.2" font-weight="600" fill="${col}">${d.model} (${d.score}%)</text>`;
        svg += `</g>`;
      });

      svg += `</svg>`;
      host.innerHTML = svg;
      bindTooltips("#chart-code-pareto .code-pt", el => el.dataset.tip);
    } else {
      const data = D.tb41Leaderboard;
      const W = 880, rowH = 34, padL = 176, padR = 230, padT = 28, padB = 16;
      const H = padT + data.length * rowH + padB;
      const maxS = 80;
      const toW = s => (s / maxS) * (W - padL - padR);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
      svg += `<text x="${padL - 12}" y="16" text-anchor="end" font-size="11" font-weight="600" fill="${C.faint}">模型</text>`;
      svg += `<text x="${padL}" y="16" font-size="11" font-weight="600" fill="${C.faint}">TB 4.1 官方解决率（66 题 · 8h 超时）</text>`;
      svg += `<text x="${W - padR + 74}" y="16" text-anchor="end" font-size="11" font-weight="600" fill="${C.faint}">单轮成本</text>`;
      svg += `<text x="${W - padR + 94}" y="16" font-size="11" font-weight="600" fill="${C.faint}">Harness / 说明</text>`;

      data.forEach((d, i) => {
        const y = padT + i * rowH + 5;
        const barW = toW(d.score);
        const col = d.cn ? C.rust : C.blue;

        svg += `<g class="tb-pt" data-tip="<b>${d.model}</b><br>TB 4.1 解决率：<b>${d.score}%</b> ｜ 跑一轮成本：<b>${d.costLabel}</b><br>Harness：${d.harness}" style="cursor:pointer;">`;
        svg += `<rect x="0" y="${y - 4}" width="${W}" height="${rowH - 2}" fill="transparent"/>`;
        svg += `<text x="${padL - 12}" y="${y + 14}" text-anchor="end" font-size="12.2" font-weight="${d.cn ? "600" : "500"}" fill="${d.cn ? C.rust : C.ink}">${d.model}</text>`;
        svg += `<rect x="${padL}" y="${y + 4}" width="${W - padL - padR}" height="13" rx="2" fill="${C.track}"/>`;
        svg += `<rect x="${padL}" y="${y + 4}" width="${barW}" height="13" rx="2" fill="${col}"/>`;
        svg += `<text x="${padL + barW + 7}" y="${y + 14}" font-family="var(--font-mono)" font-size="11.5" font-weight="600" fill="${col}">${d.score}%</text>`;
        svg += `<text x="${W - padR + 74}" y="${y + 14}" text-anchor="end" font-family="var(--font-mono)" font-size="11.5" fill="${C.muted}">${d.costLabel}</text>`;
        svg += `<text x="${W - padR + 94}" y="${y + 14}" font-size="11.2" fill="${C.faint}">${d.harness}</text>`;
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

    const W = 860, rowH = 44, padL = 170, padR = 86, padT = 32, padB = 30;
    const H = padT + rows.length * rowH + padB;
    const toX = v => padL + (v / 95) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    [0, 20, 40, 60, 80].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="${C.grid}" stroke-dasharray="2,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 16}" text-anchor="middle" font-size="11" fill="${C.faint}">${t}%</text>`;
    });

    rows.forEach((r, i) => {
      const y = padT + i * rowH + 5;
      const gap = (r.partial - r.strict).toFixed(1);
      const xp = toX(r.partial), xs = toX(r.strict);
      const strictCol = r.cn ? C.rust : C.blue;

      svg += `<g class="off-pt" data-tip="<b>${r.model}</b><br>${partialLbl}：<b>${r.partial}%</b><br>${strictLbl}：<b>${r.strict}%</b><br>两项指标落差：<b>−${gap} 个百分点</b>" style="cursor:pointer;">`;
      svg += `<text x="${padL - 12}" y="${y + 19}" text-anchor="end" font-size="12.4" font-weight="600" fill="${r.cn ? C.rust : C.ink}">${r.model}</text>`;
      svg += `<rect x="${padL}" y="${y + 3}" width="${xp - padL}" height="10" rx="2" fill="${C.grayBar}"/>`;
      svg += `<text x="${xp + 6}" y="${y + 12}" font-family="var(--font-mono)" font-size="10.8" fill="${C.muted}">${r.partial}%</text>`;
      svg += `<rect x="${padL}" y="${y + 16}" width="${xs - padL}" height="10" rx="2" fill="${strictCol}"/>`;
      svg += `<text x="${xs + 6}" y="${y + 25}" font-family="var(--font-mono)" font-size="10.8" font-weight="600" fill="${strictCol}">${r.strict}%</text>`;
      svg += `<text x="${W - 10}" y="${y + 19}" text-anchor="end" font-family="var(--font-mono)" font-size="11.5" font-weight="600" fill="${C.rust}">−${gap} pt</text>`;
      svg += `</g>`;
    });

    svg += `<rect x="${padL}" y="7" width="11" height="9" rx="1.5" fill="${C.grayBar}"/>`;
    svg += `<text x="${padL + 16}" y="15" font-size="11.2" fill="${C.muted}">${partialLbl}</text>`;
    svg += `<rect x="${padL + 215}" y="7" width="11" height="9" rx="1.5" fill="${C.blue}"/>`;
    svg += `<text x="${padL + 231}" y="15" font-size="11.2" fill="${C.muted}">${strictLbl}（深红为国产模型）</text>`;
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
    const W = 880, H = 320, padL = 48, padR = 16, padT = 36, padB = 64;
    const innerW = W - padL - padR;
    const groupW = innerW / stages.length;
    const toY = v => padT + ((100 - v) / 100) * (H - padT - padB);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    [0, 25, 50, 75, 100].forEach(t => {
      const y = toY(t);
      svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${C.grid}" stroke-dasharray="2,3"/>`;
      svg += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="${C.faint}">${t}%</text>`;
    });

    const leg = [["Claude Fable 5.2", C.rust], ["GPT-6 Astra", C.blue], ["Gemini 4 Carbon", C.sage]];
    leg.forEach(([lbl, col], i) => {
      const lx = padL + i * 158;
      svg += `<rect x="${lx}" y="8" width="10" height="10" rx="2" fill="${col}"/>`;
      svg += `<text x="${lx + 15}" y="17" font-size="11.5" fill="${C.muted}">${lbl}</text>`;
    });

    stages.forEach((st, idx) => {
      const gx = padL + idx * groupW + groupW / 2;
      const bw = 24, gap = 5;
      const vals = [
        { k: "Fable 5.2", v: st.fable, col: C.rust },
        { k: "GPT-6 Astra", v: st.gpt, col: C.blue },
        { k: "Gemini 4", v: st.gemini, col: C.sage }
      ];

      if (idx === 4) {
        svg += `<line x1="${padL + idx * groupW}" y1="${padT}" x2="${padL + idx * groupW}" y2="${H - padB}" stroke="#D1D5DB" stroke-dasharray="4,4"/>`;
        svg += `<text x="${gx}" y="${padT + 18}" text-anchor="middle" font-size="11" font-weight="600" fill="${C.rust}">63.0% 三家全 0 分</text>`;
        svg += `<rect x="${gx - 30}" y="${toY(37)}" width="60" height="${toY(0) - toY(37)}" rx="2" fill="#4B5563" class="emb-pt" data-tip="<b>Embodied First Exam (456 核心题)</b><br>${st.note}" style="cursor:pointer;"/>`;
        svg += `<text x="${gx}" y="${toY(37) - 6}" text-anchor="middle" font-family="var(--font-mono)" font-size="11.2" font-weight="600" fill="${C.ink}">37% 非零</text>`;
      } else {
        const startX = gx - (3 * bw + 2 * gap) / 2;
        vals.forEach((item, j) => {
          const bx = startX + j * (bw + gap);
          if (item.v === null) {
            svg += `<text x="${bx + bw / 2}" y="${toY(0) - 6}" text-anchor="middle" font-size="10" fill="${C.faint}">未报</text>`;
            return;
          }
          const y = toY(item.v);
          const h = toY(0) - y;
          svg += `<g class="emb-pt" data-tip="<b>${st.stage.replace("\n", " · ")}</b><br>${item.k}：<b>${item.v}%</b><br>${st.note}" style="cursor:pointer;">`;
          svg += `<rect x="${bx}" y="${y}" width="${bw}" height="${h}" rx="2" fill="${item.col}"/>`;
          svg += `<text x="${bx + bw / 2}" y="${y - 5}" text-anchor="middle" font-family="var(--font-mono)" font-size="10.2" font-weight="600" fill="${item.col}">${item.v}${idx === 3 && j === 0 ? "‡" : ""}</text>`;
          svg += `</g>`;
        });
      }

      const lines = st.stage.split("\n");
      lines.forEach((ln, li) => {
        svg += `<text x="${gx}" y="${H - padB + 20 + li * 15}" text-anchor="middle" font-size="${li === 0 ? "11.6" : "10.6"}" font-weight="${li === 0 ? "600" : "400"}" fill="${li === 0 ? C.ink : C.muted}">${ln}</text>`;
      });
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips("#chart-embodied-cliff .emb-pt", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     7. WIDGET #6 · 18+3 EXPLORER TABLE + MINIMAL SLIDE-OUT DRAWER
     ------------------------------------------------------------------------ */
  const evLabel = {
    code: "代码/精确",
    rubric: "Rubric/LLM",
    human: "人工",
    phys: "仿真/实测"
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
    if (lbl) lbl.textContent = `当前展示 ${list.length} 套基准（点击任意行查看详细档案）`;

    tbody.innerHTML = list.map(b => {
      const evTags = b.evalTags.map(t => `<span class="tag">${evLabel[t]}</span>`).join("");
      return `
        <tr class="${b.track === "legacy" ? "legacy-row" : ""}" data-bid="${b.id}">
          <td><span class="b-name">${b.name}</span><span class="b-sub">${b.trackLabel}</span></td>
          <td><span style="font-weight:500;display:block;">${b.org}</span><span class="b-sub">${b.orgLabel}</span></td>
          <td><span style="font-variant-numeric:tabular-nums;font-weight:500;">${b.release}</span><span class="b-sub">${b.evolution}</span></td>
          <td><span style="font-variant-numeric:tabular-nums;font-weight:500;">${b.countStr}</span></td>
          <td><span class="tag">${b.accessLabel}</span></td>
          <td><div class="ev-wrap">${evTags}</div><span class="b-sub">${b.evalShort}</span></td>
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
          <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;">
            <span class="tag">${b.trackLabel}</span>
            <span class="tag">${b.orgLabel} · ${b.org}</span>
            <span class="tag">${b.accessLabel}</span>
          </div>
          <h3>${b.name}</h3>
          <div style="font-size:12.6px;color:var(--muted);margin-top:4px;">题量：${b.countStr} ｜ 版本演进：${b.evolution}</div>
        </div>
        <button class="close-btn" id="drawer-close-btn" aria-label="关闭">×</button>
      </div>
      <div class="d-section">
        <h4>1. 题源与筛选流程</h4>
        <p><b>题源：</b>${b.source}</p>
        <p style="margin-top:7px;"><b>筛选与清洗：</b>${b.funnel}</p>
      </div>
      <div class="d-section">
        <h4>2. Verifier 与防作弊设计</h4>
        <p><b>验证逻辑：</b>${b.verifier}</p>
        <p style="margin-top:7px;"><b>防作弊隔离：</b>${b.detail.antichat}</p>
      </div>
      <div class="d-section">
        <h4>3. 典型题目与实测案例</h4>
        <ul>${b.detail.cases.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="d-section">
        <h4>4. 代表成绩、成本与采用情况</h4>
        <p><b>代表成绩：</b>${b.score}</p>
        <p style="margin-top:7px;"><b>成本门槛：</b>${b.cost}</p>
        <p style="margin-top:7px;"><b>行业采用：</b>${b.detail.adoption}</p>
      </div>
      <div class="d-lesson">
        <div style="font-size:12px;font-weight:650;color:var(--muted);margin-bottom:4px;">核心经验</div>
        <div style="font-size:13.8px;line-height:1.68;color:var(--ink);font-weight:500;">${b.lesson}</div>
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
    const W = 980, H = 380, padL = 132, padR = 28, padT = 34, padB = 48;
    const xMin = Math.log10(4.5), xMax = Math.log10(3400);
    const toX = n => padL + ((Math.log10(n) - xMin) / (xMax - xMin)) * (W - padL - padR);
    const toY = c => padT + ((5.5 - c) / (5.5 - 0.8)) * (H - padT - padB);
    const trackColor = { code: C.blue, sci: C.sage, off: C.rust, emb: "#4B5563", legacy: "#9CA3AF" };

    const x50 = toX(50), x250 = toX(250);
    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    svg += `<rect x="${x50}" y="${padT}" width="${x250 - x50}" height="${H - padT - padB}" fill="#F8F9FA"/>`;
    svg += `<line x1="${x50}" y1="${padT}" x2="${x50}" y2="${H - padB}" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4,4"/>`;
    svg += `<line x1="${x250}" y1="${padT}" x2="${x250}" y2="${H - padB}" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4,4"/>`;

    svg += `<text x="${(padL + x50) / 2}" y="${padT + 16}" text-anchor="middle" font-size="11" fill="${C.faint}">高方差区 (&lt;50 题)</text>`;
    svg += `<text x="${(x50 + x250) / 2}" y="${padT + 16}" text-anchor="middle" font-size="11.5" font-weight="600" fill="${C.ink}">合理题量区间 (50–250 道重题)</text>`;
    svg += `<text x="${(x250 + W - padR) / 2}" y="${padT + 16}" text-anchor="middle" font-size="11" fill="${C.faint}">大题量 / 轻量自动化区</text>`;

    [
      [1.2, "单轮静态问答 (秒级)"],
      [2.2, "短程单软件 (分钟级)"],
      [3.2, "跨软件/容器 (0.5–4h)"],
      [4.2, "多轮实验/项目 (数天)"],
      [5.1, "超长程工程 (20–24h)"]
    ].forEach(([val, lbl]) => {
      const y = toY(val);
      svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="${C.grid}" stroke-dasharray="2,3"/>`;
      svg += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="${C.muted}">${lbl}</text>`;
    });

    [6, 15, 34, 50, 100, 250, 500, 1000, 2500].forEach(n => {
      const x = toX(n);
      svg += `<line x1="${x}" y1="${H - padB}" x2="${x}" y2="${H - padB + 5}" stroke="#9CA3AF"/>`;
      svg += `<text x="${x}" y="${H - padB + 18}" text-anchor="middle" font-size="11" fill="${(n === 50 || n === 250) ? C.ink : C.faint}" font-weight="${(n === 50 || n === 250) ? "700" : "400"}">${n}</text>`;
    });
    svg += `<text x="${(padL + W - padR) / 2}" y="${H - 8}" text-anchor="middle" font-size="11.4" fill="${C.muted}">题目数量规模（对数横轴 · 点击节点查看详细档案）</text>`;

    svg += `<defs><marker id="arr-sc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="${C.rust}"/></marker></defs>`;
    [
      ["asb", "twinlab", "38天扩至52题", 0, -10],
      ["osworld1", "osworld", "耗时×48重做", -44, 10],
      ["swe_full", "fc2", "转向合并标准", 28, -12]
    ].forEach(([aId, bId, lbl, dx, dy]) => {
      const a = D.benchmarks.find(x => x.id === aId), b = D.benchmarks.find(x => x.id === bId);
      if (!a || !b) return;
      const x1 = toX(a.countNum), y1 = toY(a.complexity), x2 = toX(b.countNum), y2 = toY(b.complexity);
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.rust}" stroke-width="1.3" stroke-dasharray="4,3" marker-end="url(#arr-sc)" opacity="0.7"/>`;
      svg += `<text x="${(x1 + x2) / 2 + dx}" y="${(y1 + y2) / 2 + dy}" text-anchor="middle" font-size="10.2" fill="${C.rust}">${lbl}</text>`;
    });

    const offsets = {
      fc2: [10, 4], fswe2: [10, 4], tb41: [-10, -10], hle: [-10, -10], biomy: [-10, 15],
      tbs: [-10, 4], asb: [6, 17], twinlab: [10, -8], biobasics: [10, 4], binder: [0, 17],
      autobench: [0, -11], ale: [8, 15], briefcase: [-10, -10], rli: [10, 4], charto: [10, 4],
      osworld: [10, -8], robodojo: [10, 4], firstexam: [10, 4], swe_full: [10, -8], swe_pro: [0, 17], osworld1: [10, 14]
    };

    D.benchmarks.forEach(b => {
      const x = toX(b.countNum), y = toY(b.complexity);
      const col = trackColor[b.track];
      const [dx, dy] = offsets[b.id] || [10, 4];
      const anchor = dx < 0 ? "end" : (dx === 0 ? "middle" : "start");
      const r = b.track === "legacy" ? 5 : 6;
      svg += `<g class="sc-pt" data-id="${b.id}" style="cursor:pointer;">`;
      svg += `<circle cx="${x}" cy="${y}" r="${r}" fill="${b.track === "legacy" ? "#FFFFFF" : col}" stroke="${col}" stroke-width="1.8"/>`;
      svg += `<text x="${x + dx}" y="${y + dy}" text-anchor="${anchor}" font-size="10.8" font-weight="500" fill="${col}">${b.name.replace("[旧代对照] ", "")} (${b.countNum})</text>`;
      svg += `</g>`;
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips(
      "#chart-scatter .sc-pt",
      el => {
        const b = D.benchmarks.find(x => x.id === el.dataset.id);
        return `<b>${b.name}</b> (${b.org})<br>题量：${b.countStr} ｜ 开放：${b.accessLabel}<br>代表成绩：${b.score}<br><span style="color:${C.accent};">点击查看详细档案</span>`;
      },
      el => openDrawer(el.dataset.id)
    );
  }

  function renderTimelineSVG() {
    const host = $("#chart-timeline");
    if (!host) return;
    const W = 980, H = 315, padL = 148, padR = 36, padT = 32, padB = 34;
    const tMin = 2023.75, tMax = 2027.0;
    const toX = t => padL + ((t - tMin) / (tMax - tMin)) * (W - padL - padR);
    const lanes = D.timelineLanes;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    const x26 = toX(2026.0);
    svg += `<rect x="${x26}" y="${padT - 6}" width="${W - padR - x26}" height="${H - padT - padB + 8}" fill="#F8F9FA"/>`;
    svg += `<text x="${(x26 + W - padR) / 2}" y="${padT - 12}" text-anchor="middle" font-size="11" fill="${C.muted}">2026 集中换代与清洗期</text>`;

    [2024.0, 2024.5, 2025.0, 2025.5, 2026.0, 2026.5, 2026.92].forEach(t => {
      const x = toX(t);
      const yr = Math.floor(t), mo = Math.round((t - yr) * 12) + 1;
      const lbl = `${yr}.${String(Math.min(12, mo)).padStart(2, "0")}`;
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="${C.grid}" stroke-dasharray="2,3"/>`;
      svg += `<text x="${x}" y="${H - 12}" text-anchor="middle" font-size="10.8" fill="${C.faint}">${lbl}</text>`;
    });

    const laneH = (H - padT - padB) / lanes.length;
    lanes.forEach((ln, idx) => {
      const y = padT + laneH * idx + laneH / 2;
      svg += `<text x="6" y="${y - 2}" font-size="12" font-weight="600" fill="${C.ink}">${ln.name}</text>`;
      svg += `<text x="6" y="${y + 12}" font-size="10.4" fill="${C.faint}">${ln.sub}</text>`;
      const firstX = toX(ln.nodes[0].t), lastX = toX(ln.nodes[ln.nodes.length - 1].t);
      svg += `<line x1="${firstX}" y1="${y}" x2="${lastX}" y2="${y}" stroke="#D1D5DB" stroke-width="2" stroke-linecap="round"/>`;
      ln.nodes.forEach((nd, ni) => {
        const x = toX(nd.t);
        const col = ni === ln.nodes.length - 1 ? C.rust : (ni === 0 ? C.blue : "#4B5563");
        let dx = 0;
        let yOff = (ni % 2 === 0) ? -13 : 19;
        if (nd.lbl.includes("锁122题")) { dx = -24; yOff = 19; }
        if (nd.lbl.includes("TwinLab")) { dx = 18; yOff = 19; }
        if (nd.lbl.includes("ASB 0.1")) { dx = 8; yOff = -13; }
        if (nd.lbl.includes("ALE v1.0")) { dx = -10; yOff = -13; }
        svg += `<g class="tl-pt" data-tip="<b>${nd.lbl}</b><br>${nd.tip}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="5" fill="${col}" stroke="#FFFFFF" stroke-width="1.6"/>`;
        svg += `<text x="${x + dx}" y="${y + yOff}" text-anchor="middle" font-size="10.4" font-weight="500" fill="${col}">${nd.lbl}</text>`;
        svg += `</g>`;
      });
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips("#chart-timeline .tl-pt", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     9. WIDGET #8 · FLAT BENCHMARK DESIGN CHECKLIST
     ------------------------------------------------------------------------ */
  function initChecklist() {
    const wrap = $("#checklist-wrap");
    if (!wrap) return;
    wrap.innerHTML = D.checks.map(c => `
      <label class="check-item">
        <input type="checkbox" id="${c.id}" checked>
        <div>
          <div class="check-title">${c.title}<span class="check-pts">(+${c.pts})</span></div>
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
        vEl.style.color = C.sage;
      } else if (score >= 65) {
        vEl.textContent = "基本可用，但在审计或防作弊上存在短板";
        vEl.style.color = "#8A5A19";
      } else {
        vEl.textContent = "风险较高：容易快速饱和或难以被行业采用";
        vEl.style.color = C.rust;
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
     10. WIRE CONTROLS & BOOT
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
        if (e.target === bg) closeDrawer();
      });
    }
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeDrawer();
    });
  });
})();
