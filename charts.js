/* ==========================================================================
   2026 FRONTIER AI EVALUATION SURVEY | CHARTS, MECHANISM DIAGRAMS & EXPLORER
   Zero external dependencies | Pure SVG + Vanilla ES6 | SSOT dynamic stats
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
        const x = Math.min(window.innerWidth - 340, e.clientX + 14);
        const y = Math.min(window.innerHeight - 130, Math.max(12, e.clientY - 12));
        tip.style.left = x + "px";
        tip.style.top = y + "px";
      });
      el.addEventListener("mouseleave", () => {
        if (tip) tip.style.display = "none";
      });
      if (onClick) el.addEventListener("click", () => onClick(el));
    });
  }

  /* ------------------------------------------------------------------------
     1. FOOTNOTE TOGGLES + BIBTEX COPY + INLINE BENCHMARK DRAWER LINKS
     ------------------------------------------------------------------------ */
  function initUIHelpers() {
    $$(".sn-ref").forEach(ref => {
      ref.addEventListener("click", () => {
        const note = document.getElementById(ref.dataset.sn);
        if (note) note.classList.toggle("open");
      });
    });

    $$("a.bench-ref[data-bid]").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        openDrawer(a.dataset.bid);
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
     2. FIGURE 1 | AA OVERNIGHT SWAP DUMBBELL (Strictly 10.26 -> 10.27, 6 models)
     ------------------------------------------------------------------------ */
  function renderAAOvernight() {
    const host = $("#chart-aa-overnight");
    if (!host) return;
    const rows = D.aaOvernight;
    const W = 860, rowH = 42, padL = 168, padR = 110, padT = 40, padB = 38;
    const H = padT + rows.length * rowH + padB;
    const xMin = 24, xMax = 64;
    const toX = v => padL + ((v - xMin) / (xMax - xMin)) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    svg += `<rect x="${toX(50)}" y="${padT - 6}" width="${toX(64) - toX(50)}" height="${rows.length * rowH + 6}" fill="#F0F5FA"/>`;
    svg += `<text x="${toX(57)}" y="${padT - 13}" text-anchor="middle" font-size="11" font-weight="600" fill="#1F4E79">海外闭源稳定区间 (50-64)</text>`;
    svg += `<rect x="${toX(28)}" y="${padT - 6}" width="${toX(48) - toX(28)}" height="${rows.length * rowH + 6}" fill="#FDF3F0"/>`;
    svg += `<text x="${toX(38)}" y="${padT - 13}" text-anchor="middle" font-size="11" font-weight="600" fill="#A84A32">国产 24h 回落区间 (32-46)</text>`;

    [25, 30, 35, 40, 45, 50, 55, 60].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT - 4}" x2="${x}" y2="${H - padB}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 17}" text-anchor="middle" font-size="11" fill="#8A8A8A">${t}</text>`;
    });

    svg += `<defs>
      <marker id="arr-down" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#A84A32"/></marker>
      <marker id="arr-up" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#2D6A5B"/></marker>
    </defs>`;

    rows.forEach((r, i) => {
      const y = padT + i * rowH + rowH / 2;
      const x4 = toX(r.v4), x5 = toX(r.v5);
      const isUp = r.v5 >= r.v4;
      const col = r.group === "us" ? "#1F4E79" : "#A84A32";
      const lineCol = isUp ? "#2D6A5B" : (r.group === "cn" ? "#A84A32" : "#6E8EA8");

      if (i > 0) {
        svg += `<line x1="8" y1="${padT + i * rowH}" x2="${W - 8}" y2="${padT + i * rowH}" stroke="${i === 3 ? "#D1D5DB" : "#F2F4F7"}" ${i === 3 ? 'stroke-dasharray="5,4" stroke-width="1.2"' : ""}/>`;
      }

      svg += `<g class="aa-row" data-tip="<b>${r.model}</b><br>10.26 (v4.3.2): <b>${r.v4}</b> -> 10.27 (v5.0): <b>${r.v5}</b> (${r.delta})<br>${r.note}" style="cursor:pointer;">`;
      svg += `<rect x="0" y="${padT + i * rowH}" width="${W}" height="${rowH}" fill="transparent"/>`;
      svg += `<text x="${padL - 12}" y="${y + 4}" text-anchor="end" font-size="12.5" font-weight="600" fill="${col}">${r.model}</text>`;

      const offset = isUp ? -7 : 7;
      if (Math.abs(x5 - x4) > 10) {
        svg += `<line x1="${x4}" y1="${y}" x2="${x5 + offset}" y2="${y}" stroke="${lineCol}" stroke-width="2.4" marker-end="url(#${isUp ? "arr-up" : "arr-down"})"/>`;
      } else {
        svg += `<line x1="${x4}" y1="${y}" x2="${x5}" y2="${y}" stroke="${lineCol}" stroke-width="2.2"/>`;
      }

      svg += `<circle cx="${x4}" cy="${y}" r="5" fill="#FFFFFF" stroke="#8A8A8A" stroke-width="1.8"/>`;
      svg += `<text x="${x4 + (isUp ? -11 : 11)}" y="${y - 8}" text-anchor="middle" font-size="10.4" fill="#666666">${r.v4}</text>`;
      svg += `<circle cx="${x5}" cy="${y}" r="6" fill="${col}" stroke="#FFFFFF" stroke-width="1.8"/>`;
      svg += `<text x="${x5}" y="${y + 17}" text-anchor="middle" font-size="11.2" font-weight="700" fill="${col}">${r.v5}</text>`;

      const pillBg = isUp ? "#EDF6F4" : (r.group === "cn" ? "#FDF3F0" : "#F3F4F6");
      const pillFg = isUp ? "#2D6A5B" : (r.group === "cn" ? "#A84A32" : "#666666");
      svg += `<rect x="${W - padR + 14}" y="${y - 11}" width="82" height="22" rx="4" fill="${pillBg}"/>`;
      svg += `<text x="${W - padR + 55}" y="${y + 4}" text-anchor="middle" font-size="11.6" font-weight="600" fill="${pillFg}">${r.delta} 分</text>`;
      svg += `</g>`;
    });

    svg += `<circle cx="${padL}" cy="${H - 8}" r="4.5" fill="#FFFFFF" stroke="#8A8A8A" stroke-width="1.8"/>`;
    svg += `<text x="${padL + 10}" y="${H - 4}" font-size="11" fill="#666666">10.26 旧版 v4.3.2</text>`;
    svg += `<circle cx="${padL + 145}" cy="${H - 8}" r="5" fill="#1F4E79"/>`;
    svg += `<text x="${padL + 155}" y="${H - 4}" font-size="11" fill="#666666">10.27 新版 v5.0 (海外)</text>`;
    svg += `<circle cx="${padL + 315}" cy="${H - 8}" r="5" fill="#A84A32"/>`;
    svg += `<text x="${padL + 325}" y="${H - 4}" font-size="11" fill="#666666">10.27 新版 v5.0 (国产)</text>`;
    svg += `</svg>`;

    host.innerHTML = svg;
    bindTooltips("#chart-aa-overnight .aa-row", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     3. FIGURE 2 | CODING COST PARETO & TB 4.1 SWITCHER
     ------------------------------------------------------------------------ */
  function renderCodeChart(mode = "fswe") {
    const host = $("#chart-code-pareto");
    if (!host) return;

    if (mode === "fswe") {
      const data = D.fsweLeaderboard;
      const W = 860, H = 390, padL = 62, padR = 36, padT = 44, padB = 50;
      const xMin = Math.log10(6), xMax = Math.log10(1500);
      const toX = c => padL + ((Math.log10(c) - xMin) / (xMax - xMin)) * (W - padL - padR);
      const toY = s => padT + ((78 - s) / 78) * (H - padT - padB);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

      const bx1 = toX(82), bx2 = toX(125);
      svg += `<rect x="${bx1}" y="${padT}" width="${bx2 - bx1}" height="${H - padT - padB}" fill="#FAF5EE"/>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 18}" text-anchor="middle" font-size="10.8" font-weight="600" fill="#8C6239">同价区 (~$100)</text>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 5}" text-anchor="middle" font-size="10.2" fill="#8C6239">62% vs 30%</text>`;

      [0, 15, 30, 45, 60, 75].forEach(s => {
        const y = toY(s);
        svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
        svg += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="#8A8A8A">${s}%</text>`;
      });

      [10, 20, 50, 100, 200, 500, 1000].forEach(c => {
        const x = toX(c);
        svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#F2F4F7"/>`;
        svg += `<text x="${x}" y="${H - padB + 18}" text-anchor="middle" font-size="11" fill="#8A8A8A">$${c}</text>`;
      });
      svg += `<text x="${(padL + W - padR) / 2}" y="${H - 8}" text-anchor="middle" font-size="11.5" font-weight="600" fill="#333333">FrontierSWE v2 单题平均 Token 成本（对数刻度 / 20h 预算）</text>`;
      svg += `<text x="16" y="${(padT + H - padB) / 2}" text-anchor="middle" transform="rotate(-90 16 ${(padT + H - padB) / 2})" font-size="11.5" font-weight="600" fill="#333333">mean@5 解决率 (%)</text>`;

      const paretoIds = ["DeepSeek V4 Flash Vision", "Claude Haiku 5.5 (小模型)", "Gemini 4 Carbon", "Gemini 4 Neon", "Claude Fable 5.2"];
      const pts = paretoIds.map(n => data.find(d => d.model === n)).filter(Boolean);
      const pathD = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${toX(p.cost).toFixed(1)},${toY(p.score).toFixed(1)}`).join(" ");
      svg += `<path d="${pathD}" fill="none" stroke="#2D6A5B" stroke-width="1.8" stroke-dasharray="5,4"/>`;
      svg += `<text x="${toX(14)}" y="${toY(53)}" font-size="10.8" font-weight="600" fill="#2D6A5B">性能-成本 Pareto 前沿</text>`;

      const off = {
        "Claude Fable 5.2": [11, 4],
        "GPT-6 Astra": [-11, 4],
        "Gemini 4 Neon": [11, 15],
        "Gemini 4 Carbon": [-11, -8],
        "Claude Haiku 5.5 (小模型)": [11, 5],
        "GLM-5.3 (开源最高)": [11, -5],
        "Kimi K3": [11, 11],
        "Qwen3.8-Max": [-11, 4],
        "DeepSeek V4 Flash Vision": [11, 4]
      };

      data.forEach(d => {
        const x = toX(d.cost), y = toY(d.score);
        const col = d.cn ? "#A84A32" : "#1F4E79";
        const [dx, dy] = off[d.model] || [10, 4];
        const anchor = dx < 0 ? "end" : "start";
        svg += `<g class="code-pt" data-tip="<b>${d.model}</b><br>解决率: <b>${d.score}%</b> | 单题成本: <b>${d.costLabel}</b> | 均耗时: <b>${d.hours}</b><br>${d.note}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="6.5" fill="${col}" stroke="#FFFFFF" stroke-width="2"/>`;
        svg += `<text x="${x + dx}" y="${y + dy}" text-anchor="${anchor}" font-size="11.2" font-weight="600" fill="${col}">${d.model} (${d.score}%)</text>`;
        svg += `</g>`;
      });

      svg += `</svg>`;
      host.innerHTML = svg;
      bindTooltips("#chart-code-pareto .code-pt", el => el.dataset.tip);
    } else {
      const data = D.tb41Leaderboard;
      const W = 860, rowH = 35, padL = 172, padR = 230, padT = 28, padB = 18;
      const H = padT + data.length * rowH + padB;
      const toW = s => (s / 80) * (W - padL - padR);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
      svg += `<text x="${padL - 10}" y="16" text-anchor="end" font-size="11" font-weight="600" fill="#666666">模型</text>`;
      svg += `<text x="${padL}" y="16" font-size="11" font-weight="600" fill="#666666">TB 4.1 解决率 (66 题 / 8h 去噪)</text>`;
      svg += `<text x="${W - padR + 70}" y="16" text-anchor="end" font-size="11" font-weight="600" fill="#666666">单轮成本</text>`;
      svg += `<text x="${W - padR + 86}" y="16" font-size="11" font-weight="600" fill="#666666">框架 / 备注</text>`;

      data.forEach((d, i) => {
        const y = padT + i * rowH + 6;
        const barW = toW(d.score);
        const col = d.cn ? "#2D6A5B" : "#1F4E79";
        const costCol = d.cost >= 10 ? "#A84A32" : (d.cost <= 0.4 ? "#2D6A5B" : "#666666");

        svg += `<g class="tb-pt" data-tip="<b>${d.model}</b><br>TB 4.1: <b>${d.score}%</b> | 成本: <b>${d.costLabel}</b><br>${d.harness}" style="cursor:pointer;">`;
        svg += `<rect x="0" y="${y - 4}" width="${W}" height="${rowH - 2}" fill="transparent"/>`;
        svg += `<text x="${padL - 10}" y="${y + 14}" text-anchor="end" font-size="12" font-weight="${d.cn ? "650" : "500"}" fill="${d.cn ? "#2D6A5B" : "#1A1A1A"}">${d.model}</text>`;
        svg += `<rect x="${padL}" y="${y + 3}" width="${W - padL - padR}" height="14" rx="3" fill="#F2F4F7"/>`;
        svg += `<rect x="${padL}" y="${y + 3}" width="${barW}" height="14" rx="3" fill="${col}"/>`;
        svg += `<text x="${padL + barW + 7}" y="${y + 14}" font-size="11.5" font-weight="600" fill="${col}">${d.score}%</text>`;
        svg += `<text x="${W - padR + 70}" y="${y + 14}" text-anchor="end" font-size="11.5" font-weight="600" fill="${costCol}">${d.costLabel}</text>`;
        svg += `<text x="${W - padR + 86}" y="${y + 14}" font-size="10.8" fill="#666666">${d.harness}</text>`;
        svg += `</g>`;
      });

      svg += `</svg>`;
      host.innerHTML = svg;
      bindTooltips("#chart-code-pareto .tb-pt", el => el.dataset.tip);
    }
  }

  /* ------------------------------------------------------------------------
     4. FIGURE 3 | OFFICE DUAL-METRIC GAP (Fixed ALE legend!)
     ------------------------------------------------------------------------ */
  function renderOfficeDual(mode = "autobench") {
    const host = $("#chart-office-dual");
    if (!host) return;
    const rows = D.officeDualMetrics[mode] || D.officeDualMetrics.autobench;
    const hasCN = rows.some(r => r.cn);
    const partialLbl = mode === "autobench" ? "AA 主榜目标分 (0 违规子目标)" : "步骤平均分 (Rubric Partial)";
    const strictLbl = mode === "autobench" ? "严格全通率 (100% 达标且 0 违规)" : "严格全通率 (整单零失误)";

    const W = 860, rowH = 46, padL = 168, padR = 102, padT = 34, padB = 30;
    const H = padT + rows.length * rowH + padB;
    const toX = v => padL + (v / 95) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    [0, 20, 40, 60, 80].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 16}" text-anchor="middle" font-size="10.8" fill="#8A8A8A">${t}%</text>`;
    });

    rows.forEach((r, i) => {
      const y = padT + i * rowH + 6;
      const gap = (r.partial - r.strict).toFixed(1);
      const xp = toX(r.partial), xs = toX(r.strict);
      svg += `<g class="off-pt" data-tip="<b>${r.model}</b><br>${partialLbl}: <b>${r.partial}%</b><br>${strictLbl}: <b>${r.strict}%</b><br>双口径差距: <b>-${gap} 个百分点</b>" style="cursor:pointer;">`;
      svg += `<text x="${padL - 10}" y="${y + 19}" text-anchor="end" font-size="12.2" font-weight="600" fill="${r.cn ? "#2D6A5B" : "#1A1A1A"}">${r.model}</text>`;
      svg += `<rect x="${padL}" y="${y + 3}" width="${xp - padL}" height="11" rx="2.5" fill="#CBD5E1"/>`;
      svg += `<text x="${xp + 6}" y="${y + 12}" font-size="11" font-weight="600" fill="#475569">${r.partial}%</text>`;
      svg += `<rect x="${padL}" y="${y + 17}" width="${xs - padL}" height="11" rx="2.5" fill="${r.cn ? "#2D6A5B" : "#1F4E79"}"/>`;
      svg += `<text x="${xs + 6}" y="${y + 26}" font-size="11" font-weight="700" fill="${r.cn ? "#2D6A5B" : "#1F4E79"}">${r.strict}%</text>`;
      svg += `<rect x="${W - padR + 12}" y="${y + 6}" width="78" height="20" rx="4" fill="#FDF3F0"/>`;
      svg += `<text x="${W - padR + 51}" y="${y + 20}" text-anchor="middle" font-size="11" font-weight="600" fill="#A84A32">-${gap} pt</text>`;
      svg += `</g>`;
    });

    svg += `<rect x="${padL}" y="8" width="12" height="10" rx="2" fill="#CBD5E1"/>`;
    svg += `<text x="${padL + 17}" y="17" font-size="11" fill="#666666">${partialLbl}</text>`;
    svg += `<rect x="${padL + 228}" y="8" width="12" height="10" rx="2" fill="#1F4E79"/>`;
    svg += `<text x="${padL + 245}" y="17" font-size="11" fill="#666666">${strictLbl}${hasCN ? "（青色为国产模型）" : ""}</text>`;
    svg += `</svg>`;

    host.innerHTML = svg;
    bindTooltips("#chart-office-dual .off-pt", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     5. FIGURE 4 | EMBODIED TWO-PANEL SPLIT (Strictly Separated Physical Units)
     ------------------------------------------------------------------------ */
  function renderEmbodiedSplit() {
    const hostA = $("#chart-embodied-acc");
    const hostB = $("#chart-first-exam");

    if (hostA) {
      const stages = D.embodiedAccuracy;
      const W = 540, H = 300, padL = 42, padR = 12, padT = 36, padB = 60;
      const groupW = (W - padL - padR) / stages.length;
      const toY = v => padT + ((100 - v) / 100) * (H - padT - padB);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
      [0, 25, 50, 75, 100].forEach(t => {
        const y = toY(t);
        svg += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
        svg += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="10.2" fill="#8A8A8A">${t}%</text>`;
      });

      const leg = [["Anthropic (Fable 5.2)", "#A84A32"], ["OpenAI (Sol / Astra)", "#1F4E79"], ["Google (Carbon)", "#2D6A5B"]];
      leg.forEach(([lbl, col], i) => {
        const lx = padL + i * 160;
        svg += `<rect x="${lx}" y="9" width="10" height="10" rx="2" fill="${col}"/>`;
        svg += `<text x="${lx + 14}" y="18" font-size="10.4" font-weight="600" fill="#333333">${lbl}</text>`;
      });

      stages.forEach((st, idx) => {
        const gx = padL + idx * groupW + groupW / 2;
        const bw = 21, gap = 6;
        const startX = gx - (3 * bw + 2 * gap) / 2;
        const items = [
          { ...st.anthropic, col: "#A84A32" },
          { ...st.openai, col: "#1F4E79" },
          { ...st.google, col: "#2D6A5B" }
        ];
        items.forEach(it => {
          const j = items.indexOf(it);
          const bx = startX + j * (bw + gap);
          if (it.val === null) {
            svg += `<text x="${bx + bw / 2}" y="${toY(0) - 8}" text-anchor="middle" font-size="9.5" fill="#8A8A8A">未报</text>`;
            return;
          }
          const y = toY(it.val), h = toY(0) - y;
          svg += `<g class="emb-a-pt" data-tip="<b>${st.stage.replace("\n", " | ")}</b><br>${it.model}: <b>${it.val}%</b><br>${st.note}" style="cursor:pointer;">`;
          svg += `<rect x="${bx}" y="${y}" width="${bw}" height="${h}" rx="3" fill="${it.col}"/>`;
          svg += `<text x="${bx + bw / 2}" y="${y - 5}" text-anchor="middle" font-size="9.1" font-weight="600" fill="${it.col}">${it.val}${it.dagger ? "‡" : ""}</text>`;
          svg += `</g>`;
        });

        st.stage.split("\n").forEach((ln, li) => {
          svg += `<text x="${gx}" y="${H - padB + 19 + li * 14}" text-anchor="middle" font-size="${li === 0 ? "10.8" : "9.8"}" font-weight="${li === 0 ? "650" : "400"}" fill="${li === 0 ? "#1A1A1A" : "#666666"}">${ln}</text>`;
        });
      });

      svg += `</svg>`;
      hostA.innerHTML = svg;
      bindTooltips("#chart-embodied-acc .emb-a-pt", el => el.dataset.tip);
    }

    if (hostB) {
      const f = D.firstExamCliff;
      const W = 340, H = 300;
      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

      svg += `<text x="10" y="22" font-size="11" font-weight="650" fill="#1F4E79">1. 允许仿真暂停重力 (Turn-based 最高准确率)</text>`;
      svg += `<rect x="10" y="34" width="320" height="24" rx="4" fill="#E5E7EB"/>`;
      svg += `<rect x="10" y="34" width="${(f.turnBasedBest.val / 100) * 320}" height="24" rx="4" fill="#1F4E79" class="emb-b-pt" data-tip="<b>Turn-based 停表模式</b><br>${f.turnBasedBest.note}" style="cursor:pointer;"/>`;
      svg += `<text x="${10 + (f.turnBasedBest.val / 100) * 320 + 8}" y="51" font-size="12" font-weight="700" fill="#1F4E79">34.0% (GPT-6 Astra)</text>`;
      svg += `<text x="10" y="76" font-size="10.4" fill="#666666">开源最高 9.0%；每步允许停表思考 10-18 秒</text>`;

      svg += `<line x1="10" y1="95" x2="330" y2="95" stroke="#D1D5DB" stroke-dasharray="4,3"/>`;

      svg += `<text x="10" y="117" font-size="11" font-weight="650" fill="#A84A32">2. 取消暂停键切回连续物理时钟 (456 题结局拆解)</text>`;
      const zeroW = (f.realtimeZeroPct / 100) * 320;
      const nonZeroW = 320 - zeroW;
      svg += `<g class="emb-b-pt" data-tip="<b>Realtime 连续物理时钟 (456 核心题)</b><br>${f.note}" style="cursor:pointer;">`;
      svg += `<rect x="10" y="128" width="${zeroW}" height="42" rx="4" fill="#A84A32"/>`;
      svg += `<text x="${10 + zeroW / 2}" y="147" text-anchor="middle" font-size="12.5" font-weight="700" fill="#FFFFFF">63.0% 全员 0 分</text>`;
      svg += `<text x="${10 + zeroW / 2}" y="162" text-anchor="middle" font-size="10" fill="#FDE8E1">287 / 456 题三家全零</text>`;
      svg += `<rect x="${10 + zeroW + 4}" y="128" width="${nonZeroW - 4}" height="42" rx="4" fill="#64748B"/>`;
      svg += `<text x="${10 + zeroW + 4 + (nonZeroW - 4) / 2}" y="147" text-anchor="middle" font-size="11.6" font-weight="600" fill="#FFFFFF">37.0%</text>`;
      svg += `<text x="${10 + zeroW + 4 + (nonZeroW - 4) / 2}" y="162" text-anchor="middle" font-size="9.8" fill="#E2E8F0">至少一家非零</text>`;
      svg += `</g>`;

      svg += `<rect x="10" y="190" width="320" height="94" rx="5" fill="#FFFFFF" stroke="#E5E7EB"/>`;
      svg += `<text x="22" y="212" font-size="11.2" font-weight="650" fill="#1A1A1A">延迟对比 (实测物理时间尺度)</text>`;
      svg += `<text x="22" y="232" font-size="10.8" fill="#333333">- 慢思考大模型决策周期：约 10-18 秒/步 (~0.1 Hz)</text>`;
      svg += `<text x="22" y="250" font-size="10.8" fill="#333333">- 倾倒水杯落地：0.4 秒 | 滑动目标移出：1.2 秒</text>`;
      svg += `<text x="22" y="270" font-size="10.8" font-weight="600" fill="#A84A32">- 实时物理控制需要高频低延迟策略与高层规划协同</text>`;
      svg += `</svg>`;
      hostB.innerHTML = svg;
      bindTooltips("#chart-first-exam .emb-b-pt", el => el.dataset.tip);
    }
  }

  /* ------------------------------------------------------------------------
     6. DIAGRAM 1 | HARBOR DUAL-CONTAINER + 0700 + RED-TEAM ARCHITECTURE (Part 3)
     ------------------------------------------------------------------------ */
  function renderDiagramHarbor() {
    const host = $("#diagram-harbor");
    if (!host) return;
    const svg = `<svg viewBox="0 0 880 278" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="hb-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#333333"/></marker>
      </defs>

      <!-- Step 1: Blue Zone -->
      <rect x="8" y="14" width="222" height="190" rx="6" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <rect x="8" y="14" width="222" height="28" rx="6" fill="#1F4E79"/>
      <text x="119" y="32" text-anchor="middle" font-size="11.6" font-weight="600" fill="#FFFFFF">Step 1 | 蓝区执行容器</text>
      <text x="20" y="60" font-size="11.2" font-weight="650" fill="#1A1A1A">Agent 可见文件：</text>
      <text x="20" y="78" font-size="10.8" font-family="var(--font-mono)" fill="#1F4E79">|- instruction.md</text>
      <text x="20" y="94" font-size="10.8" font-family="var(--font-mono)" fill="#1F4E79">|- task.toml (超时/GPU)</text>
      <text x="20" y="110" font-size="10.8" font-family="var(--font-mono)" fill="#1F4E79">|- environment/Dockerfile</text>
      <line x1="20" y1="124" x2="218" y2="124" stroke="#CBD5E1"/>
      <text x="20" y="142" font-size="11" fill="#333333">- 机内彻底移除 solution/ 与 tests/</text>
      <text x="20" y="160" font-size="11" fill="#333333">- 按题断公网或设域名白名单</text>
      <text x="20" y="178" font-size="11" fill="#333333">- submit 仅存保底快照防早退</text>
      <text x="20" y="194" font-size="10.4" fill="#666666">(阻断外网检索与原仓偷抄)</text>

      <line x1="230" y1="109" x2="256" y2="109" stroke="#333333" stroke-width="1.6" marker-end="url(#hb-arr)"/>

      <!-- Step 2: Air-gap -->
      <rect x="262" y="38" width="136" height="142" rx="6" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3" stroke-dasharray="4,3"/>
      <text x="330" y="62" text-anchor="middle" font-size="11.6" font-weight="700" fill="#A84A32">Step 2 | 停机清场</text>
      <text x="330" y="84" text-anchor="middle" font-size="10.8" fill="#333333">到点立即销毁执行机</text>
      <text x="330" y="102" text-anchor="middle" font-size="10.8" font-weight="600" fill="#A84A32">清零 /tmp 与后台进程</text>
      <line x1="276" y1="118" x2="384" y2="118" stroke="#EACBC2"/>
      <text x="330" y="138" text-anchor="middle" font-size="10.8" fill="#333333">仅导出干净工作区产物</text>
      <text x="330" y="156" text-anchor="middle" font-size="10.2" fill="#666666">永久归档 -> $0 离线重评</text>

      <line x1="398" y1="109" x2="424" y2="109" stroke="#333333" stroke-width="1.6" marker-end="url(#hb-arr)"/>

      <!-- Step 3: Red Zone -->
      <rect x="430" y="14" width="228" height="190" rx="6" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.3"/>
      <rect x="430" y="14" width="228" height="28" rx="6" fill="#8C6239"/>
      <text x="544" y="32" text-anchor="middle" font-size="11.6" font-weight="600" fill="#FFFFFF">Step 3 | 红区全新验证容器</text>
      <text x="442" y="60" font-size="11.2" font-weight="650" fill="#1A1A1A">提交后挂载隐藏目录：</text>
      <text x="442" y="78" font-size="10.8" font-family="var(--font-mono)" fill="#A84A32">|- /root/tests/ (chmod 0700)</text>
      <text x="442" y="94" font-size="10.8" font-family="var(--font-mono)" fill="#A84A32">|- solution/solve.sh (5/5 必过)</text>
      <line x1="442" y1="108" x2="646" y2="108" stroke="#E5D4BE"/>
      <text x="442" y="126" font-size="11" fill="#333333">- 切普通 agent 账号降权跑待测码</text>
      <text x="442" y="144" font-size="11" fill="#333333">- 封禁宿主机 root socket 越权读盘</text>
      <text x="442" y="162" font-size="11" fill="#333333">- 测试输入随机加盐 / 改写文件名</text>
      <text x="442" y="180" font-size="11" fill="#333333">- 双向断言：查改对 + 查未授权删改</text>
      <text x="442" y="196" font-size="10.4" fill="#666666">(拦截 161KB 查表字典与改 pytest)</text>

      <line x1="658" y1="109" x2="684" y2="109" stroke="#333333" stroke-width="1.6" marker-end="url(#hb-arr)"/>

      <!-- Step 4: Trace Audit -->
      <rect x="690" y="14" width="182" height="190" rx="6" fill="#F8F9FA" stroke="#1A1A1A" stroke-width="1.3"/>
      <rect x="690" y="14" width="182" height="28" rx="6" fill="#1A1A1A"/>
      <text x="781" y="32" text-anchor="middle" font-size="11.6" font-weight="600" fill="#FFFFFF">Step 4 | 轨迹审查</text>
      <text x="702" y="64" font-size="11" fill="#333333">- 自动化 Scanner 查全量</text>
      <text x="710" y="80" font-size="11" fill="#333333">执行日志与审计轨迹</text>
      <text x="702" y="102" font-size="11" fill="#333333">- 捕获回放 .gold、搜原 PR</text>
      <text x="710" y="118" font-size="11" fill="#333333">或下载现成权重即清零</text>
      <rect x="702" y="142" width="158" height="44" rx="4" fill="#EDF6F4" stroke="#2D6A5B"/>
      <text x="781" y="161" text-anchor="middle" font-size="11.2" font-weight="650" fill="#2D6A5B">输出可信分数</text>
      <text x="781" y="177" text-anchor="middle" font-size="10.4" fill="#2D6A5B">与干净 RL Reward</text>

      <!-- Bottom Pre-Launch Gate -->
      <rect x="8" y="218" width="864" height="46" rx="5" fill="#F8F9FA" stroke="#D1D5DB"/>
      <text x="22" y="238" font-size="11.2" font-weight="650" fill="#A84A32">入库前置门禁 | Cheat Trials 红队攻题 (TB 3.0+ / FC 2.0 标配)：</text>
      <text x="22" y="254" font-size="11" fill="#333333">每道新题上线前先派奉命找漏洞的对抗 Agent 尝试攻破，被攻破则打回补强，防止带漏洞环境污染评测结果与后续 RL 训练。</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     7. DIAGRAM 2 | MODEL x HARNESS x ENVIRONMENT CO-EVOLUTION (PPT P08 Aligned)
     ------------------------------------------------------------------------ */
  function renderDiagramCoevolution() {
    const host = $("#diagram-coevolution");
    if (!host) return;
    const svg = `<svg viewBox="0 0 880 286" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="co-arr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#1F4E79"/></marker>
        <marker id="co-arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#2D6A5B"/></marker>
        <marker id="co-arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#A84A32"/></marker>
      </defs>

      <!-- Top External Driver: Real Demand -->
      <rect x="180" y="10" width="520" height="46" rx="6" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3"/>
      <text x="440" y="29" text-anchor="middle" font-size="11.8" font-weight="700" fill="#A84A32">核心驱动力：主动挖掘真实研发与业务需求（防止系统在旧题里空转）</text>
      <text x="440" y="47" text-anchor="middle" font-size="10.8" fill="#5C281A">旧榜被击穿只是被动触发，人类新场景与真需求才是 Env 持续演进的源头</text>

      <line x1="440" y1="56" x2="440" y2="86" stroke="#A84A32" stroke-width="1.8" marker-end="url(#co-arr-r)"/>

      <!-- Center Top: Environment -->
      <rect x="260" y="92" width="360" height="68" rx="6" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.5"/>
      <text x="440" y="114" text-anchor="middle" font-size="13" font-weight="700" fill="#2D6A5B">Environment | 可验证防作弊沙盒环境</text>
      <text x="440" y="134" text-anchor="middle" font-size="11" fill="#333333">真实脏场景 + Harbor 物理隔离 + 双向断言 / 物理实测</text>
      <text x="440" y="150" text-anchor="middle" font-size="10.4" fill="#666666">同时承担「外部基准评测」与「内部长程 RL 训练场」双重角色</text>

      <!-- Bottom Left: Model -->
      <rect x="30" y="198" width="270" height="72" rx="6" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.4"/>
      <text x="165" y="220" text-anchor="middle" font-size="12.6" font-weight="700" fill="#1F4E79">Model | 模型权重迭代</text>
      <text x="165" y="240" text-anchor="middle" font-size="11" fill="#333333">吸收高信噪比 RL 奖励，内化工程边界、</text>
      <text x="165" y="256" text-anchor="middle" font-size="11" fill="#333333">自造测试与无效路径回滚习惯 (FireFlash +10.4 分)</text>

      <!-- Bottom Right: Harness -->
      <rect x="580" y="198" width="270" height="72" rx="6" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.4"/>
      <text x="715" y="220" text-anchor="middle" font-size="12.6" font-weight="700" fill="#8C6239">Harness | 执行框架迭代</text>
      <text x="715" y="240" text-anchor="middle" font-size="11" fill="#333333">依据失败轨迹定向修补工具、上下文压缩与</text>
      <text x="715" y="256" text-anchor="middle" font-size="11" fill="#333333">快照回滚机制 (训练与评测对齐即涨 +4.4 分)</text>

      <!-- Arrows: Env -> Model, Env -> Harness -->
      <path d="M 260,126 L 165,126 L 165,192" fill="none" stroke="#2D6A5B" stroke-width="1.8" marker-end="url(#co-arr-g)"/>
      <rect x="64" y="136" width="156" height="22" rx="4" fill="#FFFFFF" stroke="#C3DFD8"/>
      <text x="142" y="151" text-anchor="middle" font-size="10.6" font-weight="600" fill="#2D6A5B">2. 输出干净 RL 奖励反哺</text>

      <path d="M 620,126 L 715,126 L 715,192" fill="none" stroke="#A84A32" stroke-width="1.8" marker-end="url(#co-arr-r)"/>
      <rect x="660" y="136" width="156" height="22" rx="4" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="738" y="151" text-anchor="middle" font-size="10.6" font-weight="600" fill="#A84A32">3. 失败轨迹回传补短板</text>

      <!-- Bidirectional Model <-> Harness -->
      <line x1="306" y1="226" x2="574" y2="226" stroke="#1F4E79" stroke-width="1.8" marker-end="url(#co-arr-b)"/>
      <line x1="574" y1="246" x2="306" y2="246" stroke="#1F4E79" stroke-width="1.8" marker-end="url(#co-arr-b)"/>
      <rect x="348" y="218" width="184" height="36" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="440" y="234" text-anchor="middle" font-size="10.8" font-weight="700" fill="#1F4E79">4. 耦合演进 (RSI 在路上)</text>
      <text x="440" y="249" text-anchor="middle" font-size="10" fill="#666666">参与自身代码与下一代环境构建</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     8. DYNAMIC STATS COMPUTED DIRECTLY FROM 16 CORE BENCHMARKS (SSOT!)
     ------------------------------------------------------------------------ */
  function renderDynamicStats() {
    const core = D.benchmarks.filter(b => b.track !== "legacy");
    const total = core.length; // strictly 16
    const byOrg = { acad: 0, data: 0, lab: 0, prod: 0 };
    const byAcc = { hyb: 0, priv: 0, open: 0 };
    let goldenCount = 0;

    core.forEach(b => {
      if (byOrg[b.orgType] !== undefined) byOrg[b.orgType]++;
      if (byAcc[b.access] !== undefined) byAcc[b.access]++;
      if (b.inGoldenZone) goldenCount++;
    });

    const pct = n => Math.round((n / total) * 100);
    const pAcad = pct(byOrg.acad), pData = pct(byOrg.data), pLab = pct(byOrg.lab), pProd = 100 - pAcad - pData - pLab;
    const pHyb = pct(byAcc.hyb), pPriv = pct(byAcc.priv), pOpen = 100 - pHyb - pPriv;
    const privDefense = byAcc.hyb + byAcc.priv;

    const host = $("#dynamic-dist-bars");
    if (host) {
      host.innerHTML = `
        <div class="info-card">
          <div class="ic-k">动态统计 | 主导团队阵营 (N = ${total})</div>
          <h4>高校搭公共底座，数据机构与一线专家造垂直主榜</h4>
          <div class="stack-bar">
            <div class="stack-seg" style="width:${pAcad}%;background:#1F4E79;" title="高校联盟 ${pAcad}% (${byOrg.acad}/${total})">高校 ${pAcad}% (${byOrg.acad})</div>
            <div class="stack-seg" style="width:${pData}%;background:#A84A32;" title="数据/评测机构 ${pData}% (${byOrg.data}/${total})">数据机构 ${pData}% (${byOrg.data})</div>
            <div class="stack-seg" style="width:${pLab}%;background:#2D6A5B;" title="大厂自建 ${pLab}% (${byOrg.lab}/${total})">大厂 ${pLab}%</div>
            <div class="stack-seg" style="width:${pProd}%;background:#8C6239;" title="产品公司 ${pProd}% (${byOrg.prod}/${total})">产品 ${pProd}%</div>
          </div>
          <p>公共沙盒底座多出自 8-40+ 机构高校联盟（TB / OSWorld / RoboDojo / ALE）；垂直高难基准多由 1-3 家核心方外挂 20-1,000 位一线专家众包构建。</p>
        </div>
        <div class="info-card">
          <div class="ic-k">动态统计 | 题库开放形态 (N = ${total})</div>
          <h4>${pHyb}% 公私混合成最大主流，合计 ${pct(privDefense)}% 含私有防线</h4>
          <div class="stack-bar">
            <div class="stack-seg" style="width:${pHyb}%;background:#8C6239;" title="公私混合 ${pHyb}% (${byAcc.hyb}/${total})">公私混合 ${pHyb}% (${byAcc.hyb})</div>
            <div class="stack-seg" style="width:${pPriv}%;background:#A84A32;" title="私有闭源 ${pPriv}% (${byAcc.priv}/${total})">纯私有 ${pPriv}% (${byAcc.priv})</div>
            <div class="stack-seg" style="width:${pOpen}%;background:#2D6A5B;" title="全开源 ${pOpen}% (${byAcc.open}/${total})">全开源 ${pOpen}% (${byAcc.open})</div>
          </div>
          <p>高校并非全开源（UC Berkeley ALE 已藏私有测试集），商业机构也并非全闭源（Surge AI Chartography 以 CC BY 4.0 全开源）；题量方面 <strong>${pct(goldenCount)}% (${goldenCount}/${total})</strong> 收敛于 50-250 题。</p>
        </div>
      `;
    }
  }

  /* ------------------------------------------------------------------------
     8B. PER-DOMAIN BUILD STATISTICS SVG (NO CROSS-DOMAIN MIXING, SSOT!)
     ------------------------------------------------------------------------ */
  function renderDomainStatsSVG() {
    const host = $("#chart-domain-stats");
    if (!host) return;
    const core = D.benchmarks.filter(b => b.track !== "legacy");
    const domains = [
      { key: "code", label: "代码与系统工程", sizeTip: "66-132 题 (20h 项 34 题)", orgTip: "1 核心队 + 20 维护者 / 8+ 校底座" },
      { key: "sci",  label: "科学研究",       sizeTip: "52-100 题 (湿测 15 靶点)", orgTip: "1 厂 + CRO / 10+ 校科学家" },
      { key: "off",  label: "白领办公与劳动", sizeTip: "91-240 题 (SaaS 可至 657)", orgTip: "产品方或评测机构 + 23-300 专家" },
      { key: "emb",  label: "桌面与三维物理", sizeTip: "60-108 题 (统考 456 核)",  orgTip: "12-18+ 高校联盟共摊基建" }
    ];

    const W = 940, rowH = 54, padL = 152, barW = 340, colSizeX = 520, colOrgX = 716, padT = 48, padB = 18;
    const H = padT + domains.length * rowH + padB;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    // Legend at top
    const leg = [
      ["全开源 (Open)", "#2D6A5B"],
      ["公私混合 (Hybrid)", "#8C6239"],
      ["私有闭源 (Private)", "#A84A32"]
    ];
    leg.forEach(([txt, col], i) => {
      const lx = padL + i * 136;
      svg += `<rect x="${lx}" y="8" width="10" height="10" rx="2" fill="${col}"/>`;
      svg += `<text x="${lx + 14}" y="17" font-size="10.8" font-weight="600" fill="#333333">${txt}</text>`;
    });

    // Column headers
    svg += `<text x="8" y="39" font-size="11" font-weight="650" fill="#666666">赛道与样本量 (N = 16)</text>`;
    svg += `<text x="${padL}" y="39" font-size="11" font-weight="650" fill="#666666">开放形态按赛道分布（由 data.js 实时计算）</text>`;
    svg += `<text x="${colSizeX}" y="39" font-size="11" font-weight="650" fill="#666666">实测收敛题量</text>`;
    svg += `<text x="${colOrgX}" y="39" font-size="11" font-weight="650" fill="#666666">主流协作阵型</text>`;
    svg += `<line x1="8" y1="45" x2="${W - 8}" y2="45" stroke="#E5E7EB"/>`;

    domains.forEach((dm, idx) => {
      const items = core.filter(b => b.track === dm.key);
      const n = items.length;
      const nOpen = items.filter(b => b.access === "open").length;
      const nHyb = items.filter(b => b.access === "hyb").length;
      const nPriv = items.filter(b => b.access === "priv").length;
      const y = padT + idx * rowH + 14;

      if (idx > 0) {
        svg += `<line x1="8" y1="${padT + idx * rowH}" x2="${W - 8}" y2="${padT + idx * rowH}" stroke="#F2F4F7"/>`;
      }

      svg += `<text x="8" y="${y + 11}" font-size="12.4" font-weight="650" fill="#1A1A1A">${dm.label}</text>`;
      svg += `<text x="8" y="${y + 26}" font-size="10.4" fill="#8A8A8A">核心样本 N = ${n}</text>`;

      let cx = padL;
      const segs = [
        { k: "全开源", cnt: nOpen, col: "#2D6A5B" },
        { k: "公私混合", cnt: nHyb, col: "#8C6239" },
        { k: "纯私有", cnt: nPriv, col: "#A84A32" }
      ];
      segs.forEach(s => {
        if (!s.cnt) return;
        const w = (s.cnt / n) * barW;
        const pctVal = Math.round((s.cnt / n) * 100);
        const lbl = w >= 86 ? `${s.k} ${pctVal}% (${s.cnt})` : (w >= 48 ? `${pctVal}% (${s.cnt})` : `${s.cnt}`);
        const names = items.filter(b => (s.k === "全开源" ? b.access === "open" : s.k === "公私混合" ? b.access === "hyb" : b.access === "priv")).map(b => b.name).join("、");
        svg += `<g class="dom-seg" data-tip="<b>${dm.label} | ${s.k} (${s.cnt}/${n})</b><br>${names}" style="cursor:pointer;">`;
        svg += `<rect x="${cx}" y="${y + 2}" width="${Math.max(w - 2, 4)}" height="24" rx="3" fill="${s.col}"/>`;
        svg += `<text x="${cx + (w - 2) / 2}" y="${y + 18}" text-anchor="middle" font-size="10.6" font-weight="600" fill="#FFFFFF">${lbl}</text>`;
        svg += `</g>`;
        cx += w;
      });

      svg += `<text x="${colSizeX}" y="${y + 18}" font-size="11.6" font-weight="600" fill="#1A1A1A">${dm.sizeTip}</text>`;
      svg += `<text x="${colOrgX}" y="${y + 18}" font-size="11.4" fill="#333333">${dm.orgTip}</text>`;
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips("#chart-domain-stats .dom-seg", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     9. FIVE-FAMILY TIMELINE SWIMLANES
     ------------------------------------------------------------------------ */
  function renderTimelineSVG() {
    const host = $("#chart-timeline");
    if (!host) return;
    const W = 980, H = 330, padL = 176, padR = 72, padT = 34, padB = 36;
    const tMin = 2023.75, tMax = 2027.02;
    const toX = t => padL + ((t - tMin) / (tMax - tMin)) * (W - padL - padR);
    const lanes = D.timelineLanes;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    const x26 = toX(2026.0);
    svg += `<rect x="${x26}" y="${padT - 6}" width="${W - padR - x26 + 22}" height="${H - padT - padB + 10}" fill="#FDF3F0" opacity="0.65"/>`;
    svg += `<text x="${(x26 + W - padR + 22) / 2}" y="${padT - 12}" text-anchor="middle" font-size="10.8" font-weight="650" fill="#A84A32">2026 集中换代与清洗窗口</text>`;

    [2024.0, 2024.5, 2025.0, 2025.5, 2026.0, 2026.5, 2026.92].forEach(t => {
      const x = toX(t);
      const yr = Math.floor(t), mo = Math.round((t - yr) * 12) + 1;
      const lbl = `${yr}.${String(Math.min(12, mo)).padStart(2, "0")}`;
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - 13}" text-anchor="middle" font-size="10.5" fill="#8A8A8A">${lbl}</text>`;
    });

    const laneH = (H - padT - padB) / lanes.length;
    lanes.forEach((ln, idx) => {
      const y = padT + laneH * idx + laneH / 2;
      svg += `<text x="8" y="${y - 2}" font-size="11.6" font-weight="650" fill="#1A1A1A">${ln.name}</text>`;
      svg += `<text x="8" y="${y + 12}" font-size="9.8" fill="#8A8A8A">${ln.sub}</text>`;
      const firstX = toX(ln.nodes[0].t), lastX = toX(ln.nodes[ln.nodes.length - 1].t);
      svg += `<line x1="${firstX}" y1="${y}" x2="${lastX}" y2="${y}" stroke="#D1D5DB" stroke-width="2.4" stroke-linecap="round"/>`;
      ln.nodes.forEach((nd, ni) => {
        const x = toX(nd.t);
        let dx = 0, yOff = (ni % 2 === 0) ? -13 : 20;
        if (nd.lbl.includes("RoboDojo")) { dx = -34; yOff = -13; }
        if (nd.lbl.includes("ASB 0.1")) { dx = -38; yOff = 20; }
        if (nd.lbl.includes("First Exam")) { dx = 22; yOff = -13; }
        if (nd.lbl.includes("TwinLab")) { dx = 36; yOff = 20; }
        svg += `<g class="tl-pt" data-tip="<b>${nd.lbl}</b><br>${nd.tip}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="5.5" fill="${nd.col}" stroke="#FFFFFF" stroke-width="1.8"/>`;
        svg += `<text x="${x + dx}" y="${y + yOff}" text-anchor="middle" font-size="9.9" font-weight="600" fill="${nd.col}">${nd.lbl}</text>`;
        svg += `</g>`;
      });
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips("#chart-timeline .tl-pt", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     10. ADOPTION MATRIX + 16+3 EXPLORER TABLE + DRAWER (BUG-FREE LEGACY FILTER)
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
        <td><b>${r.name}</b><span class="b-sub">${r.track} / ${r.tag}</span></td>
        ${fmtCell(r.oai)}${fmtCell(r.ant)}${fmtCell(r.goo)}${fmtCell(r.cnOld)}${fmtCell(r.cnNow)}
        <td style="font-size:12px;color:var(--muted);">${r.gapNote}</td>
      </tr>
    `).join("");

    $$("#adoption-tbody tr[data-bid]").forEach(tr => {
      tr.addEventListener("click", () => openDrawer(tr.dataset.bid));
    });
  }

  const evLabel = { code: "代码/精确", rubric: "Rubric/清单", human: "人工验收", phys: "仿真/湿测" };
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
        const blob = (b.name + b.org + b.source + b.funnel + b.verifier + b.score + b.lesson + b.capability).toLowerCase();
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
    if (lbl) lbl.textContent = `当前展示 ${list.length} 套基准（点击任意行从右侧查看完整档案）`;

    tbody.innerHTML = list.map(b => {
      const evBadges = b.evalTags.map(t => `<span class="tag">${evLabel[t] || t}</span>`).join("");
      return `
        <tr class="${b.track === "legacy" ? "legacy-row" : ""}" data-bid="${b.id}">
          <td><span class="b-name">${b.name}</span><span class="tag" style="margin-top:3px;">${b.trackLabel}</span></td>
          <td><span style="font-weight:600;display:block;">${b.org}</span><span class="b-sub">${b.orgScale}</span></td>
          <td><b>${b.release}</b><span class="b-sub">${b.evolution}</span></td>
          <td><b>${b.countStr}</b></td>
          <td><span class="tag ${b.access}">${b.accessLabel}</span></td>
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
            <span class="tag">${b.trackLabel}</span>
            <span class="tag">${b.orgLabel} | ${b.org}</span>
            <span class="tag ${b.access}">${b.accessLabel}</span>
          </div>
          <h3>${b.name}</h3>
          <div style="font-size:12.4px;color:var(--muted);margin-top:4px;">题量：${b.countStr} | 演进：${b.evolution}</div>
        </div>
        <button class="close-btn" id="drawer-close-btn" aria-label="关闭">×</button>
      </div>
      <div class="d-section">
        <h4>01 | 检验目标与真实需求</h4>
        <p><b>核心检验能力：</b>${b.capability}</p>
        <p style="margin-top:6px;"><b>题源：</b>${b.source}</p>
        <p style="margin-top:6px;"><b>筛选与清洗：</b>${b.funnel}</p>
      </div>
      <div class="d-section">
        <h4>02 | 验证机制与防作弊防线</h4>
        <p><b>判分逻辑：</b>${b.verifier}</p>
        <p style="margin-top:6px;"><b>防作弊隔离：</b>${b.detail.anticheat}</p>
      </div>
      <div class="d-section">
        <h4>03 | 典型案例与实测现象</h4>
        <ul>${b.detail.cases.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="d-section">
        <h4>04 | 头部读数、成本与行业采用</h4>
        <p><b>实测读数：</b>${b.score}</p>
        <p style="margin-top:6px;"><b>成本门槛：</b>${b.cost}</p>
        <p style="margin-top:6px;"><b>行业采用：</b>${b.detail.adoption}</p>
        ${b.url ? `<p style="margin-top:9px;"><a href="${b.url}" target="_blank" rel="noopener">查看一手官网或论文来源 -></a></p>` : ""}
      </div>
      <div class="d-lesson">
        <div style="font-size:11.6px;font-weight:650;color:var(--muted);margin-bottom:4px;">核心构建启示</div>
        <div style="font-size:13.6px;font-weight:600;color:var(--ink);line-height:1.65;">${b.lesson}</div>
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
     11. DYNAMIC 60-LINK ACADEMIC REFERENCES RENDERER ([1]..[60])
     ------------------------------------------------------------------------ */
  function renderReferences() {
    const host = $("#ref-grid-host");
    if (!host || !D.references) return;
    let seq = 0;
    const hostOf = url => {
      try { return new URL(url).hostname.replace(/^www\./, ""); } catch (_) { return ""; }
    };

    host.innerHTML = D.references.map(g => `
      <div class="ref-group">
        <h4>${g.cat} (${g.items.length})</h4>
        <ol class="ref-list">
          ${g.items.map(it => {
            seq += 1;
            const dom = hostOf(it.url);
            return `<li><span class="ref-idx">[${seq}]</span><span><a href="${it.url}" target="_blank" rel="noopener">${it.title}</a>${dom ? `<span class="ref-host">${dom}</span>` : ""}</span></li>`;
          }).join("")}
        </ol>
      </div>
    `).join("");
  }

  /* ------------------------------------------------------------------------
     12. WIRE CONTROLS & BOOT
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
    initUIHelpers();
    renderAAOvernight();
    renderCodeChart("fswe");
    renderOfficeDual("autobench");
    renderEmbodiedSplit();
    renderDynamicStats();
    renderDomainStatsSVG();
    renderTimelineSVG();
    renderDiagramHarbor();
    renderDiagramCoevolution();
    renderAdoptionMatrix("all");
    renderMasterTable();
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
  });
})();
