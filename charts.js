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
     0. GPU-COMPOSITED TOOLTIP ENGINE (translate3d: zero layout thrash)
     ------------------------------------------------------------------------ */
  const tip = $("#svg-tooltip");
  function bindTooltips(selector, getHtml, onClick) {
    $$(selector).forEach(el => {
      el.addEventListener("mouseenter", () => {
        if (!tip) return;
        tip.innerHTML = getHtml(el);
        tip.classList.add("visible");
      });
      el.addEventListener("mousemove", e => {
        if (!tip) return;
        const x = Math.min(window.innerWidth - 336, e.clientX + 14);
        const y = Math.min(window.innerHeight - 134, Math.max(12, e.clientY - 12));
        tip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      el.addEventListener("mouseleave", () => {
        if (tip) tip.classList.remove("visible");
      });
      if (onClick) el.addEventListener("click", () => onClick(el));
    });
  }

  /* ------------------------------------------------------------------------
     1. FOOTNOTE TOGGLES + BIBTEX COPY + LIGHTBOX + 60FPS READING PROGRESS
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

    initScrollEnhancements();
    initImageLightbox();
  }

  function initScrollEnhancements() {
    const bar = $("#read-progress");
    const topBtn = $("#back-to-top");
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const docH = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (bar) {
        const pct = Math.min(1, Math.max(0, scrollY / docH));
        bar.style.transform = `scaleX(${pct.toFixed(4)})`;
      }
      if (topBtn) {
        topBtn.classList.toggle("visible", scrollY > 560);
      }
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScroll);
      }
    }, { passive: true });
    updateScroll();

    if (topBtn) {
      topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Active section highlight in sticky nav via IntersectionObserver (zero scroll jank)
    const navLinks = $$('.header-nav a[href^="#"]');
    const targets = navLinks
      .map(a => ({ a, el: document.querySelector(a.getAttribute("href")) }))
      .filter(x => x.el);

    if (targets.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === id));
          }
        });
      }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
      targets.forEach(t => io.observe(t.el));
    }
  }

  let lbEl = null;
  function closeLightbox() {
    if (!lbEl || !lbEl.classList.contains("open")) return;
    lbEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  function initImageLightbox() {
    const imgs = $$(".fig-img-wrap img");
    if (!imgs.length) return;

    lbEl = document.createElement("div");
    lbEl.className = "lightbox-backdrop";
    lbEl.setAttribute("role", "dialog");
    lbEl.setAttribute("aria-modal", "true");
    lbEl.setAttribute("aria-label", "查看大图");
    lbEl.innerHTML = `
      <div class="lightbox-frame">
        <img class="lightbox-img" src="" alt="">
        <div class="lightbox-bar">
          <div class="lightbox-cap"></div>
          <button type="button" class="lightbox-close">关闭 (Esc)</button>
        </div>
      </div>`;
    document.body.appendChild(lbEl);

    const lbImg = $(".lightbox-img", lbEl);
    const lbCap = $(".lightbox-cap", lbEl);
    $(".lightbox-close", lbEl).addEventListener("click", closeLightbox);
    lbEl.addEventListener("click", e => {
      if (e.target === lbEl) closeLightbox();
    });

    imgs.forEach(img => {
      const wrap = img.closest(".fig-img-wrap");
      if (wrap) wrap.classList.add("is-zoomable");
      img.addEventListener("click", () => {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || "";
        const fig = img.closest("figure");
        const titleEl = fig ? $(".fig-title", fig) : null;
        const capEl = wrap ? $(".fig-img-cap", wrap) : null;
        lbCap.textContent = (capEl && capEl.textContent.trim()) || (titleEl && titleEl.textContent.trim()) || img.alt || "";
        lbEl.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
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
     2B. FIGURE 1.2 | FRONTIER CLOSED-SOURCE RELEASE SHIFT (2026.11)
     Shows retired saturated benchmarks vs Claude Fable 5.2 / GPT-6.2 / Neon
     ------------------------------------------------------------------------ */
  function renderReleaseShiftSVG() {
    const host = $("#chart-release-shift");
    if (!host || !D.releaseShift) return;
    const { retired, rows } = D.releaseShift;

    const W = 980, rowH = 34;
    const topBannerH = 62;
    const tblHeadY = topBannerH + 46;
    const H = tblHeadY + rows.length * rowH + 34;

    const colTrack = 12;
    const colName = 148;
    const colFable = 420;
    const colGpt = 576;
    const colGemini = 732;
    const colTag = 900;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    // Top Strip: Retired Static Benchmarks
    svg += `<rect x="8" y="6" width="${W - 16}" height="52" rx="6" fill="#F8F9FA" stroke="#E5E7EB"/>`;
    svg += `<text x="20" y="25" font-size="11.2" font-weight="700" fill="#666666">已撤出 2026.11 发布主表的旧静态榜（传统选择题 = 0）</text>`;
    svg += `<rect x="${W - 350}" y="13" width="330" height="22" rx="4" fill="#FDF3F0" stroke="#EACBC2"/>`;
    svg += `<text x="${W - 185}" y="28" text-anchor="middle" font-size="10.6" font-weight="650" fill="#A84A32">Claude Fable 5.2 主表 14 项：8 项 2026 新发 / 2 项自建 / 0 项单选</text>`;

    let rx = 20;
    retired.forEach(item => {
      const pw = Math.max(88, item.length * 6.8 + 16);
      svg += `<rect x="${rx}" y="34" width="${pw}" height="18" rx="3" fill="#FFFFFF" stroke="#D1D5DB"/>`;
      svg += `<text x="${rx + pw / 2}" y="46.5" text-anchor="middle" font-size="9.8" fill="#8A8A8A" text-decoration="line-through">${item}</text>`;
      rx += pw + 8;
    });

    // Legend Row
    svg += `<circle cx="16" cy="${topBannerH + 17}" r="4.5" fill="#1F4E79"/>`;
    svg += `<text x="26" y="${topBannerH + 21}" font-size="10.6" fill="#333333">实心点：该厂 2026.11 官方发布页主推</text>`;
    svg += `<circle cx="246" cy="${topBannerH + 17}" r="4.5" fill="#FFFFFF" stroke="#666666" stroke-width="1.6"/>`;
    svg += `<text x="256" y="${topBannerH + 21}" font-size="10.6" fill="#333333">空心圈：竞品对照或第三方统测可比读数</text>`;
    svg += `<text x="484" y="${topBannerH + 21}" font-size="10.6" fill="#8A8A8A">悬停任意一行查看评测细则</text>`;

    // Table Headers
    svg += `<line x1="8" y1="${tblHeadY - 18}" x2="${W - 8}" y2="${tblHeadY - 18}" stroke="#1A1A1A" stroke-width="1.3"/>`;
    svg += `<text x="${colTrack}" y="${tblHeadY - 4}" font-size="11" font-weight="650" fill="#666666">所属领域</text>`;
    svg += `<text x="${colName}" y="${tblHeadY - 4}" font-size="11" font-weight="650" fill="#1A1A1A">2026 前沿基准</text>`;
    svg += `<text x="${colFable}" y="${tblHeadY - 4}" text-anchor="middle" font-size="11.2" font-weight="700" fill="#A84A32">Anthropic Fable 5.2 (11.09)</text>`;
    svg += `<text x="${colGpt}" y="${tblHeadY - 4}" text-anchor="middle" font-size="11.2" font-weight="700" fill="#2D6A5B">OpenAI GPT-6.2 (11.17)</text>`;
    svg += `<text x="${colGemini}" y="${tblHeadY - 4}" text-anchor="middle" font-size="11.2" font-weight="700" fill="#1F4E79">Google Neon (11.18)</text>`;
    svg += `<text x="${colTag}" y="${tblHeadY - 4}" text-anchor="middle" font-size="11" font-weight="650" fill="#666666">转向特征</text>`;
    svg += `<line x1="8" y1="${tblHeadY + 4}" x2="${W - 8}" y2="${tblHeadY + 4}" stroke="#D1D5DB"/>`;

    const drawCell = (raw, cx, y, color) => {
      const [mode, val] = raw.split(":");
      if (mode === "n") {
        return `<text x="${cx}" y="${y + 4}" text-anchor="middle" font-size="10.5" fill="#9CA3AF">${val}</text>`;
      }
      const isPrimary = mode === "p";
      const dotX = cx - 44;
      const circle = isPrimary
        ? `<circle cx="${dotX}" cy="${y}" r="4.8" fill="${color}"/>`
        : `<circle cx="${dotX}" cy="${y}" r="4.5" fill="#FFFFFF" stroke="${color}" stroke-width="1.6"/>`;
      return `${circle}<text x="${dotX + 10}" y="${y + 4}" font-size="11" font-weight="${isPrimary ? "650" : "400"}" fill="${isPrimary ? "#1A1A1A" : "#666666"}">${val}</text>`;
    };

    rows.forEach((r, idx) => {
      const rowTop = tblHeadY + 5 + idx * rowH;
      const y = rowTop + rowH / 2;
      const isHard = r.tag === "三家硬交集";
      if (isHard) {
        svg += `<rect x="8" y="${rowTop}" width="${W - 16}" height="${rowH}" fill="#FDF3F0" opacity="0.55"/>`;
      } else if (idx % 2 === 1) {
        svg += `<rect x="8" y="${rowTop}" width="${W - 16}" height="${rowH}" fill="#FAFAFA"/>`;
      }
      svg += `<g class="shift-row" data-tip="<b>${r.name}</b> (${r.track})<br>${r.note}" style="cursor:pointer;">`;
      svg += `<rect x="8" y="${rowTop}" width="${W - 16}" height="${rowH}" fill="transparent"/>`;
      svg += `<text x="${colTrack}" y="${y + 4}" font-size="10.8" fill="#666666">${r.track}</text>`;
      svg += `<text x="${colName}" y="${y + 4}" font-size="11.6" font-weight="${isHard ? "700" : "600"}" fill="${isHard ? "#A84A32" : "#1A1A1A"}">${r.name}</text>`;
      svg += drawCell(r.fable, colFable, y, "#A84A32");
      svg += drawCell(r.gpt, colGpt, y, "#2D6A5B");
      svg += drawCell(r.gemini, colGemini, y, "#1F4E79");
      const tagBg = isHard ? "#FDF3F0" : "#F2F4F7";
      const tagFg = isHard ? "#A84A32" : "#4B5563";
      const tagBd = isHard ? "#EACBC2" : "#E5E7EB";
      svg += `<rect x="${colTag - 44}" y="${y - 10}" width="88" height="20" rx="3" fill="${tagBg}" stroke="${tagBd}"/>`;
      svg += `<text x="${colTag}" y="${y + 3.5}" text-anchor="middle" font-size="10.2" font-weight="600" fill="${tagFg}">${r.tag}</text>`;
      svg += `</g>`;
      svg += `<line x1="8" y1="${rowTop + rowH}" x2="${W - 8}" y2="${rowTop + rowH}" stroke="#EFEFEF"/>`;
    });

    svg += `<line x1="8" y1="${tblHeadY + 5 + rows.length * rowH}" x2="${W - 8}" y2="${tblHeadY + 5 + rows.length * rowH}" stroke="#1A1A1A" stroke-width="1.2"/>`;
    svg += `</svg>`;

    host.innerHTML = svg;
    bindTooltips("#chart-release-shift .shift-row", el => el.dataset.tip);
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
     4. PART 2.2 DIAGRAM | TB-SCIENCE 0.1 HARBOR EXECUTION + BLACK ICE CASE
     ------------------------------------------------------------------------ */
  function renderDiagramTBS() {
    const host = $("#diagram-tbs-exec");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 296" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="tbs-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
      </defs>

      <!-- Col 1: Disconnected Execution Container -->
      <rect x="6" y="8" width="260" height="202" rx="8" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <rect x="6" y="8" width="260" height="30" rx="8" fill="#1F4E79"/>
      <text x="136" y="28" text-anchor="middle" font-size="12.2" font-weight="700" fill="#FFFFFF">1. 断网执行容器 (复用 Harbor)</text>
      <text x="18" y="57" font-size="11.4" font-weight="700" fill="#111827">学科工具链与原始脏数据：</text>
      <text x="18" y="76" font-size="11.2" font-family="var(--font-mono)" fill="#1F4E79">C++ / Fortran / R / Python</text>
      <text x="18" y="95" font-size="11" fill="#334155">GeoTIFF 影像 / 9年水文表 / 混沌序列</text>
      <line x1="18" y1="109" x2="254" y2="109" stroke="#CBD5E1"/>
      <text x="18" y="129" font-size="11.2" fill="#334155">- 全程断公网，阻断检索原论文</text>
      <text x="18" y="149" font-size="11.2" fill="#334155">- 机内彻底移除 tests/ 与参考解</text>
      <text x="18" y="169" font-size="11.2" fill="#334155">- 入库三闸：oracle 5/5 必过</text>
      <text x="18" y="189" font-size="11" fill="#475569">  no-op 必 0 分 + 红队攻题排雷</text>

      <line x1="266" y1="109" x2="292" y2="109" stroke="#334155" stroke-width="1.8" marker-end="url(#tbs-arr)"/>

      <!-- Col 2: Concrete Task Execution (Black Ice Trap) -->
      <rect x="298" y="8" width="266" height="202" rx="8" fill="#F8FAFC" stroke="#2D6A5B" stroke-width="1.3"/>
      <rect x="298" y="8" width="266" height="30" rx="8" fill="#2D6A5B"/>
      <text x="431" y="28" text-anchor="middle" font-size="12.2" font-weight="700" fill="#FFFFFF">2. 真题执行：门多塔湖结冰日</text>
      <text x="310" y="56" font-size="11" fill="#334155">输入：10 年 Landsat + MODIS 脏影像</text>
      <rect x="310" y="66" width="242" height="62" rx="6" fill="#FDF3F0" stroke="#EACBC2"/>
      <text x="320" y="85" font-size="11.2" font-weight="700" fill="#A84A32">踩坑：朴素亮度阈值掉进“黑冰”坑</text>
      <text x="320" y="103" font-size="10.6" fill="#5C281A">光滑透明薄冰不反光，波段如深水发暗</text>
      <text x="320" y="119" font-size="10.6" fill="#5C281A">代码零报错但结冰日偏晚 -> 判 0 分</text>
      <rect x="310" y="137" width="242" height="62" rx="6" fill="#EDF6F4" stroke="#B7DDD3"/>
      <text x="320" y="156" font-size="11.2" font-weight="700" fill="#2D6A5B">正解：去云 + 双星配准 + 时序修正</text>
      <text x="320" y="174" font-size="10.6" fill="#1E4D42">统一坐标系，融合多波段与连续性</text>
      <text x="320" y="190" font-size="10.6" font-family="var(--font-mono)" fill="#1E4D42">-> 写出 ice_dates.csv (单向迁出)</text>

      <line x1="564" y1="109" x2="590" y2="109" stroke="#334155" stroke-width="1.8" marker-end="url(#tbs-arr)"/>

      <!-- Col 3: Isolated Scientific Verifier -->
      <rect x="596" y="8" width="258" height="202" rx="8" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.3"/>
      <rect x="596" y="8" width="258" height="30" rx="8" fill="#8C6239"/>
      <text x="725" y="28" text-anchor="middle" font-size="12.2" font-weight="700" fill="#FFFFFF">3. 独立验证容器 (确定性 pytest)</text>
      <text x="608" y="57" font-size="11.4" font-weight="700" fill="#111827">科学家手写硬验收（零主观打分）：</text>
      <text x="608" y="78" font-size="11.1" fill="#334155">- 遥感结冰日：逐年实测误差容差</text>
      <text x="608" y="98" font-size="11.1" fill="#334155">- 水文 15 参校准：拟合精度 NSE</text>
      <text x="608" y="118" font-size="11.1" fill="#334155">- 混沌/化工题：物理守恒与安全界</text>
      <rect x="608" y="135" width="234" height="62" rx="6" fill="#FFFFFF" stroke="#E5D4BE"/>
      <text x="725" y="156" text-anchor="middle" font-size="11.6" font-weight="700" fill="#8C6239">非 0 即 1 科学数值硬裁决</text>
      <text x="725" y="174" text-anchor="middle" font-size="10.6" fill="#475569">不看代码长短与回复文采，只验</text>
      <text x="725" y="189" text-anchor="middle" font-size="10.6" fill="#475569">数值结果是否满足物理与统计边界</text>

      <!-- Bottom Compact Strip: 5-Discipline Composition + Non-Model Variables -->
      <rect x="6" y="222" width="848" height="66" rx="7" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="242" font-size="11.2" font-weight="700" fill="#111827">首发 70 题学科构成（920 提案 7.6% 录用，现扩至 96 题）</text>
      <rect x="18" y="251" width="114" height="24" rx="4" fill="#1F4E79"/><text x="75" y="267" text-anchor="middle" font-size="10.8" font-weight="650" fill="#FFF">生命 19</text>
      <rect x="135" y="251" width="102" height="24" rx="4" fill="#2D6A5B"/><text x="186" y="267" text-anchor="middle" font-size="10.8" font-weight="650" fill="#FFF">物理 17</text>
      <rect x="240" y="251" width="102" height="24" rx="4" fill="#4B6B8A"/><text x="291" y="267" text-anchor="middle" font-size="10.8" font-weight="650" fill="#FFF">数统 17</text>
      <rect x="345" y="251" width="54" height="24" rx="4" fill="#8C6239"/><text x="372" y="267" text-anchor="middle" font-size="10.6" font-weight="650" fill="#FFF">工 9</text>
      <rect x="402" y="251" width="48" height="24" rx="4" fill="#A84A32"/><text x="426" y="267" text-anchor="middle" font-size="10.6" font-weight="650" fill="#FFF">地 8</text>

      <line x1="466" y1="230" x2="466" y2="280" stroke="#CBD5E1"/>
      <text x="480" y="242" font-size="11.2" font-weight="700" fill="#A84A32">横向读榜须拆清的两项非模型变量：</text>
      <text x="480" y="261" font-size="10.8" fill="#334155">- 框架差：同一权重换 Mini-SWE 直掉 18.9 分（74.6% -> 55.7%）</text>
      <text x="480" y="278" font-size="10.8" fill="#334155">- 算力差：单题耗千万至 1.3 亿 tok，Vals 实测单题成本差 18 倍</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4B. PART 2.2 DIAGRAM | DE NOVO BINDER DESIGN 24H PIPELINE & WET-LAB GAP
     ------------------------------------------------------------------------ */
  function renderDiagramBinder() {
    const host = $("#diagram-binder-pipeline");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 272" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="bnd-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
      </defs>

      <!-- 4-Step Autonomous Protein Design Pipeline -->
      <rect x="6" y="8" width="194" height="168" rx="8" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <rect x="6" y="8" width="194" height="30" rx="8" fill="#1F4E79"/>
      <text x="103" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">01 | 靶点输入与限额</text>
      <text x="18" y="57" font-size="11.2" fill="#111827" font-weight="700">16 靶点 (15 可测)</text>
      <text x="18" y="76" font-size="10.8" fill="#334155">- 三维结构（如 RBX1）</text>
      <text x="18" y="95" font-size="10.8" fill="#334155">- 1.6 万字专家协议提示</text>
      <text x="18" y="114" font-size="10.8" fill="#334155">- 开源结构建模软件栈</text>
      <rect x="18" y="130" width="170" height="34" rx="5" fill="#FFFFFF" stroke="#BDD4E7"/>
      <text x="103" y="151" text-anchor="middle" font-size="11" font-weight="700" fill="#1F4E79">1 GPU / 24h 全自主</text>

      <line x1="200" y1="92" x2="220" y2="92" stroke="#334155" stroke-width="1.8" marker-end="url(#bnd-arr)"/>

      <rect x="226" y="8" width="194" height="168" rx="8" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.3"/>
      <rect x="226" y="8" width="194" height="30" rx="8" fill="#2D6A5B"/>
      <text x="323" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">02 | 自主驱动生成栈</text>
      <text x="238" y="57" font-size="11.2" fill="#111827" font-weight="700">无人工干预写脚本排错</text>
      <text x="238" y="76" font-size="10.8" fill="#334155">- 解析靶点挑结合表位</text>
      <text x="238" y="95" font-size="10.8" fill="#334155">- 编排 RFdiffusion 骨架</text>
      <text x="238" y="114" font-size="10.8" fill="#334155">- 调 BindCraft 批量生成</text>
      <rect x="238" y="130" width="170" height="34" rx="5" fill="#FFFFFF" stroke="#B7DDD3"/>
      <text x="323" y="151" text-anchor="middle" font-size="10.8" font-weight="700" fill="#2D6A5B">自然界不存在的新序列</text>

      <line x1="420" y1="92" x2="440" y2="92" stroke="#334155" stroke-width="1.8" marker-end="url(#bnd-arr)"/>

      <rect x="446" y="8" width="194" height="168" rx="8" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.3"/>
      <rect x="446" y="8" width="194" height="30" rx="8" fill="#8C6239"/>
      <text x="543" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">03 | 计算重折叠筛选</text>
      <text x="458" y="57" font-size="11.2" fill="#111827" font-weight="700">多轮自验与择优排序</text>
      <text x="458" y="76" font-size="10.8" fill="#334155">- Boltz / AlphaFold 重折叠</text>
      <text x="458" y="95" font-size="10.8" fill="#334155">- 按失败反馈换位点重算</text>
      <text x="458" y="114" font-size="10.8" fill="#334155">- 共生成 1,440 候选设计</text>
      <rect x="458" y="130" width="170" height="34" rx="5" fill="#FFFFFF" stroke="#E5D4BE"/>
      <text x="543" y="151" text-anchor="middle" font-size="11" font-weight="700" fill="#8C6239">电脑模拟过关率 85.1%</text>

      <line x1="640" y1="92" x2="660" y2="92" stroke="#334155" stroke-width="1.8" marker-end="url(#bnd-arr)"/>

      <rect x="666" y="8" width="188" height="168" rx="8" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3"/>
      <rect x="666" y="8" width="188" height="30" rx="8" fill="#A84A32"/>
      <text x="760" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">04 | 盲寄 CRO 湿测终裁</text>
      <text x="678" y="57" font-size="11.2" fill="#111827" font-weight="700">抹去来源寄独立实验室</text>
      <text x="678" y="76" font-size="10.8" fill="#334155">- Twist：合成 1,320 序列</text>
      <text x="678" y="95" font-size="10.8" fill="#334155">- Adaptyv：HT-SPR 实测</text>
      <text x="678" y="114" font-size="10.8" fill="#334155">- 14/15 靶点真结合命中</text>
      <rect x="678" y="130" width="164" height="34" rx="5" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="760" y="151" text-anchor="middle" font-size="10.8" font-weight="700" fill="#A84A32">湿测 22.6%-35.1% (3.9nM)</text>

      <!-- Bottom Compact Gap Strip -->
      <rect x="6" y="190" width="848" height="72" rx="7" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="211" font-size="11.4" font-weight="700" fill="#111827">代理指标过拟合断层：电脑重折叠模拟 85.1% 寄去真实细胞表达与 SPR 测定后命中率折半</text>
      <rect x="18" y="222" width="206" height="27" rx="5" fill="#8C6239"/>
      <text x="121" y="240" text-anchor="middle" font-size="11.2" font-weight="700" fill="#FFFFFF">电脑重折叠模拟：85.1%</text>
      <text x="236" y="240" font-size="13" font-weight="700" fill="#A84A32">-></text>
      <rect x="260" y="222" width="168" height="27" rx="5" fill="#2D6A5B"/>
      <text x="344" y="240" text-anchor="middle" font-size="11.2" font-weight="700" fill="#FFFFFF">前排优选湿测：49.0%</text>
      <text x="440" y="240" font-size="13" font-weight="700" fill="#A84A32">-></text>
      <rect x="464" y="222" width="194" height="27" rx="5" fill="#A84A32"/>
      <text x="561" y="240" text-anchor="middle" font-size="11.2" font-weight="700" fill="#FFFFFF">1,320 序列湿测：22.6%-35.1%</text>
      <rect x="668" y="222" width="174" height="27" rx="5" fill="#E2E8F0"/>
      <text x="755" y="240" text-anchor="middle" font-size="10.8" font-weight="650" fill="#475569">传统人类基线：10%-15%</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4C. PART 2.3 DIAGRAM 1 | AUTOMATIONBENCH 47 SAAS ARCH + BLE 71% AUDIT
     ------------------------------------------------------------------------ */
  function renderDiagramAutobench() {
    const host = $("#diagram-autobench-arch");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 322" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="ab-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
        <marker id="ab-arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#2D6A5B"/></marker>
      </defs>

      <!-- Left: Minimal 2-Primitive Agent -->
      <rect x="6" y="8" width="222" height="206" rx="8" fill="#1E293B" stroke="#0F172A"/>
      <text x="117" y="31" text-anchor="middle" font-size="12.2" font-weight="700" fill="#F8FAFC">被测 Agent (无预封装工具)</text>
      <rect x="18" y="44" width="198" height="66" rx="6" fill="#293548" stroke="#475569"/>
      <text x="28" y="64" font-size="11.6" font-weight="700" fill="#93C5FD">1. search (BM25 检索)</text>
      <text x="28" y="83" font-size="10.8" fill="#CBD5E1">从 ~500 份 OpenAPI 文档</text>
      <text x="28" y="99" font-size="10.8" fill="#CBD5E1">自行搜出候选 REST 接口</text>
      <rect x="18" y="120" width="198" height="82" rx="6" fill="#293548" stroke="#475569"/>
      <text x="28" y="140" font-size="11.6" font-weight="700" fill="#86EFAC">2. execute (裸 HTTP 请求)</text>
      <text x="28" y="159" font-size="10.8" fill="#CBD5E1">自拼 Method / URL / JSON</text>
      <text x="28" y="175" font-size="10.8" fill="#CBD5E1">自扛分页、4xx 报错与回查</text>
      <text x="28" y="192" font-size="10.3" fill="#FDE68A">禁向人类反问澄清需求</text>

      <!-- Bidirectional arrows -->
      <line x1="228" y1="92" x2="254" y2="92" stroke="#2D6A5B" stroke-width="1.8" marker-end="url(#ab-arr-g)"/>
      <line x1="254" y1="126" x2="228" y2="126" stroke="#334155" stroke-width="1.8" marker-end="url(#ab-arr)"/>

      <!-- Center: 47 Local SaaS Sandbox -->
      <rect x="260" y="8" width="328" height="206" rx="8" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.3"/>
      <text x="424" y="30" text-anchor="middle" font-size="12" font-weight="700" fill="#2D6A5B">本地隔离模拟公司 (47 款 SaaS / 6 大部门)</text>

      <rect x="272" y="42" width="148" height="74" rx="6" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="282" y="61" font-size="11.4" font-weight="700" fill="#A84A32">CRM 客户库</text>
      <text x="282" y="80" font-size="10.6" fill="#475569">预埋 3 条近似同名客户</text>
      <text x="282" y="99" font-size="10.2" font-family="var(--font-mono)" fill="#A84A32">Meridian Corp/Sol.</text>

      <rect x="428" y="42" width="148" height="74" rx="6" fill="#FFFFFF" stroke="#E5D4BE"/>
      <text x="438" y="61" font-size="11.4" font-weight="700" fill="#8C6239">Sheets 电子表格</text>
      <text x="438" y="80" font-size="10.6" fill="#475569">混杂新旧两行汇率/等级</text>
      <text x="438" y="99" font-size="10.2" font-family="var(--font-mono)" fill="#8C6239">1.10(旧) -> 1.30(新)</text>

      <rect x="272" y="126" width="148" height="74" rx="6" fill="#FFFFFF" stroke="#BDD4E7"/>
      <text x="282" y="145" font-size="11.4" font-weight="700" fill="#1F4E79">Gmail 往来邮箱</text>
      <text x="282" y="164" font-size="10.6" fill="#475569">隐性抄送与禁发规矩</text>
      <text x="282" y="182" font-size="10.6" fill="#475569">藏在杂乱历史邮件串</text>

      <rect x="428" y="126" width="148" height="74" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="438" y="145" font-size="11.4" font-weight="700" fill="#334155">Slack / 工单 / 日历</text>
      <text x="438" y="164" font-size="10.6" fill="#475569">排查未关闭升级客服单</text>
      <text x="438" y="182" font-size="10.6" fill="#475569">按内部制度路由通知</text>

      <line x1="588" y1="110" x2="614" y2="110" stroke="#334155" stroke-width="1.8" marker-end="url(#ab-arr)"/>

      <!-- Right: Objectives + Guardrails Judge -->
      <rect x="620" y="8" width="234" height="206" rx="8" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3"/>
      <rect x="620" y="8" width="234" height="30" rx="8" fill="#A84A32"/>
      <text x="737" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">数据库终态双闸门 (零 LLM)</text>
      <text x="632" y="57" font-size="11.1" font-weight="700" fill="#111827">无视聊天汇报，直查后台库表：</text>
      <text x="632" y="77" font-size="10.8" fill="#2D6A5B" font-weight="700">Objectives 正向目标</text>
      <text x="632" y="94" font-size="10.4" fill="#334155">该建的行、金额、邮件全写对</text>
      <text x="632" y="114" font-size="10.8" fill="#A84A32" font-weight="700">Guardrails 负向红线</text>
      <text x="632" y="131" font-size="10.4" fill="#334155">禁发受限频道、禁改错同名户</text>
      <rect x="632" y="143" width="210" height="59" rx="6" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="642" y="161" font-size="10.9" font-weight="700" fill="#1F4E79">触发任一红线即整题清零</text>
      <text x="642" y="178" font-size="10.4" fill="#475569">目标分 79.3% -> 严全通 56.6%</text>
      <text x="642" y="194" font-size="10.1" fill="#A84A32">双口径普遍落差 22-34 个百分点</text>

      <!-- Bottom Strip: BLE 100-Task White-Box Audit -->
      <rect x="6" y="228" width="848" height="86" rx="7" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="250" font-size="11.4" font-weight="700" fill="#111827">BLE 白盒逐行审计公开集 v1.0.6（100 道纯代码数据库脚本）：71% 确认存在断言或参考解缺陷</text>
      <rect x="18" y="260" width="156" height="26" rx="4" fill="#2D6A5B"/><text x="96" y="277" text-anchor="middle" font-size="10.8" font-weight="700" fill="#FFF">19 合格</text>
      <rect x="177" y="260" width="82" height="26" rx="4" fill="#94A3B8"/><text x="218" y="277" text-anchor="middle" font-size="10.8" font-weight="700" fill="#FFF">10 存疑</text>
      <rect x="262" y="260" width="228" height="26" rx="4" fill="#A84A32"/><text x="376" y="277" text-anchor="middle" font-size="10.8" font-weight="700" fill="#FFF">28 假阳性放水 (错账满分)</text>
      <rect x="493" y="260" width="146" height="26" rx="4" fill="#C46B48"/><text x="566" y="277" text-anchor="middle" font-size="10.8" font-weight="700" fill="#FFF">18 假阴性错杀</text>
      <rect x="642" y="260" width="76" height="26" rx="4" fill="#8C6239"/><text x="680" y="277" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFF">9 单向漏</text>
      <rect x="721" y="260" width="121" height="26" rx="4" fill="#64748B"/><text x="781" y="277" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFF">16 参考解错/他</text>
      <text x="18" y="303" font-size="10.4" fill="#475569">审计结论：复杂业务下的纯代码验证并非天然免错，隐蔽时间依赖、未声明字段与单向断言都会扭曲分数。</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4D. PART 2.3 DIAGRAM 2 | AA-BRIEFCASE v1.1 WORKSPACE & 3-PILLAR SCORING
     ------------------------------------------------------------------------ */
  function renderDiagramBriefcase() {
    const host = $("#diagram-briefcase-flow");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 288" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="bc-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
      </defs>

      <!-- Step 1: 4 Simulated Corporate Archives -->
      <rect x="6" y="8" width="248" height="196" rx="8" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <rect x="6" y="8" width="248" height="30" rx="8" fill="#1F4E79"/>
      <text x="130" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">1. 四大模拟企业档案馆 (91 题)</text>
      <text x="18" y="56" font-size="11.2" font-weight="700" fill="#111827">Google / McKinsey / BCG 专家共创</text>
      <text x="18" y="75" font-size="10.8" fill="#1F4E79" font-weight="650">数据科学 | 产品管理 | 银行 | 重工</text>
      <line x1="18" y1="87" x2="242" y2="87" stroke="#CBD5E1"/>
      <text x="18" y="106" font-size="11" fill="#334155">- &gt;25,000 条跨周 Slack 群聊</text>
      <text x="18" y="125" font-size="11" fill="#334155">- &gt;3,500 封往来邮件与纪要</text>
      <text x="18" y="144" font-size="11" fill="#334155">- 互相打架的新旧公司制度手册</text>
      <text x="18" y="163" font-size="11" fill="#334155">- 原始 CSV / 财务底表导出库</text>
      <text x="18" y="186" font-size="10.4" font-weight="650" fill="#A84A32">暗坑：第 1.8 万条群聊改退货口径</text>

      <line x1="254" y1="106" x2="278" y2="106" stroke="#334155" stroke-width="1.8" marker-end="url(#bc-arr)"/>

      <!-- Step 2: Agentic Workspace Execution -->
      <rect x="284" y="8" width="214" height="196" rx="8" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.3"/>
      <rect x="284" y="8" width="214" height="30" rx="8" fill="#2D6A5B"/>
      <text x="391" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">2. 工作区实操与交付</text>
      <text x="296" y="57" font-size="11.2" font-weight="700" fill="#111827">沙盒内自主检索与跑数：</text>
      <text x="296" y="77" font-size="10.8" fill="#334155">- 多跳翻查群聊/邮件辨冲突</text>
      <text x="296" y="96" font-size="10.8" fill="#334155">- Docker/E2B 跑 Python 分析</text>
      <text x="296" y="115" font-size="10.8" fill="#334155">- 产出老板可直接签字的成品：</text>
      <rect x="296" y="127" width="190" height="64" rx="6" fill="#FFFFFF" stroke="#B7DDD3"/>
      <text x="306" y="146" font-size="10.8" font-family="var(--font-mono)" fill="#2D6A5B">.xlsx 财务模型公式链</text>
      <text x="306" y="164" font-size="10.8" font-family="var(--font-mono)" fill="#2D6A5B">.pptx 董事会汇报演示</text>
      <text x="306" y="182" font-size="10.8" font-family="var(--font-mono)" fill="#2D6A5B">.docx / .pdf 战略备忘录</text>

      <line x1="498" y1="106" x2="522" y2="106" stroke="#334155" stroke-width="1.8" marker-end="url(#bc-arr)"/>

      <!-- Step 3: Decoupled 3-Pillar Verifier -->
      <rect x="528" y="8" width="326" height="196" rx="8" fill="#F8FAFC" stroke="#8C6239" stroke-width="1.3"/>
      <rect x="528" y="8" width="326" height="30" rx="8" fill="#8C6239"/>
      <text x="691" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">3. 三支柱双轨终裁 (防“文雅错账”)</text>

      <rect x="540" y="48" width="302" height="68" rx="6" fill="#FFFFFF" stroke="#BDD4E7"/>
      <text x="552" y="67" font-size="11.4" font-weight="700" fill="#1F4E79">轨道 A | 客观可验证 Rubric（算账准不准）</text>
      <text x="552" y="86" font-size="10.6" fill="#334155">逐条硬查数据行、Excel 公式引用与隐性制度约束</text>
      <text x="552" y="104" font-size="10.6" font-weight="700" fill="#A84A32">冠军：Fable 5.2 (66.1%) | 100% 全对仅 ~3%</text>

      <rect x="540" y="124" width="302" height="68" rx="6" fill="#FAF5EE" stroke="#E5D4BE"/>
      <text x="552" y="143" font-size="11.4" font-weight="700" fill="#8C6239">轨道 B | 分析深度 + 呈现质感 (Crowd-BT Elo)</text>
      <text x="552" y="162" font-size="10.6" fill="#334155">隐去署名两两合成对战，经最大似然模型折算 Elo</text>
      <text x="552" y="180" font-size="10.6" font-weight="700" fill="#8C6239">冠军反超：Opus 5.5 / Sonnet 5.5 (1800+ Elo)</text>

      <!-- Bottom Insight Strip -->
      <rect x="6" y="218" width="848" height="62" rx="7" fill="#FDF3F0" stroke="#EACBC2"/>
      <text x="18" y="239" font-size="11.3" font-weight="700" fill="#A84A32">原发布核心发现：两轨冠军分家 + 可靠性悬崖 + 800 倍成本极差</text>
      <text x="18" y="258" font-size="10.8" fill="#5C281A">- 失误分化：弱模型错在漏找整份文件，强模型错在悄悄漏掉跨文档细微矛盾（91 题中有 31 题所有参测模型均不及格）。</text>
      <text x="18" y="274" font-size="10.8" fill="#5C281A">- 成本极差：海量长上下文检索使单题成本跨度超过 800 倍（重度思考链单题可超 $30），读榜须同时核对费用与两轨分数。</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4E. PART 2.3 DIAGRAM 3 | RLI UPWORK LOOP & 4 PUBLISHED FAILURE MODES
     ------------------------------------------------------------------------ */
  function renderDiagramRLI() {
    const host = $("#diagram-rli-anatomy");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 296" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="rli-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
      </defs>

      <!-- Top Row: Real Economic Workflow -->
      <rect x="6" y="8" width="252" height="106" rx="8" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <text x="18" y="30" font-size="11.8" font-weight="700" fill="#1F4E79">1. Upwork 真金白银采购</text>
      <text x="18" y="51" font-size="10.9" fill="#334155">- $14.4 万买断 240 个已结款真单</text>
      <text x="18" y="69" font-size="10.9" fill="#334155">- 跨 23 工种（CAD/3D/Web/音视频）</text>
      <text x="18" y="87" font-size="10.9" fill="#334155">- 中位耗时 11.5h / 中位 $200（均 &gt;$600）</text>
      <text x="18" y="104" font-size="10.4" fill="#64748B">打包：甲方原简报 + 脏素材 + 人类中标稿</text>

      <line x1="258" y1="61" x2="284" y2="61" stroke="#334155" stroke-width="1.8" marker-end="url(#rli-arr)"/>

      <rect x="290" y="8" width="246" height="106" rx="8" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.3"/>
      <text x="302" y="30" font-size="11.8" font-weight="700" fill="#2D6A5B">2. 单次简报端到端交付</text>
      <text x="302" y="51" font-size="10.9" fill="#334155">- 剔除需反复开会拉扯的项目</text>
      <text x="302" y="69" font-size="10.9" fill="#334155">- 留 10 公 + 230 私进虚拟桌面</text>
      <text x="302" y="87" font-size="10.9" fill="#334155">- 全程无人介入、限单题算力预算</text>
      <text x="302" y="104" font-size="10.4" fill="#64748B">使用真实设计/剪辑/CAD/开发软件</text>

      <line x1="536" y1="61" x2="562" y2="61" stroke="#334155" stroke-width="1.8" marker-end="url(#rli-arr)"/>

      <rect x="568" y="8" width="286" height="106" rx="8" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3"/>
      <text x="580" y="30" font-size="11.8" font-weight="700" fill="#A84A32">3. 同业专家二元付款验收</text>
      <text x="580" y="50" font-size="10.8" fill="#334155">对照人类中标稿：达标可收货才给 1 分</text>
      <rect x="580" y="62" width="108" height="24" rx="4" fill="#2D6A5B"/>
      <text x="634" y="78" text-anchor="middle" font-size="10.6" font-weight="700" fill="#FFFFFF">41.3% 达标</text>
      <rect x="692" y="62" width="150" height="24" rx="4" fill="#A84A32"/>
      <text x="767" y="78" text-anchor="middle" font-size="10.6" font-weight="700" fill="#FFFFFF">58.7% 商业退单</text>
      <text x="580" y="104" font-size="10.2" fill="#64748B">1 年由 2.5% 涨至 41.3%，但单单错一处即归零</text>

      <!-- Bottom Row: Published Failure Mode Taxonomy from RLI Paper -->
      <rect x="6" y="128" width="848" height="160" rx="8" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="150" font-size="11.6" font-weight="700" fill="#111827">RLI 原论文商业退单四类实测归因（可重叠统计）：不是完全不懂专业，而是死在交付品控最后一公里</text>

      <text x="18" y="177" font-size="11.1" font-weight="700" fill="#A84A32">质感不足 / 业余观感</text>
      <rect x="176" y="164" width="246" height="18" rx="4" fill="#A84A32"/>
      <text x="430" y="177" font-size="11.1" font-weight="700" fill="#A84A32">45.6%</text>
      <text x="484" y="177" font-size="10.6" fill="#475569">建筑平面图与草图冲突、Web 界面简陋、配音机械僵硬</text>

      <text x="18" y="206" font-size="11.1" font-weight="700" fill="#C46B48">交付残缺 / 提前停工</text>
      <rect x="176" y="193" width="193" height="18" rx="4" fill="#C46B48"/>
      <text x="377" y="206" font-size="11.1" font-weight="700" fill="#C46B48">35.7%</text>
      <text x="484" y="206" font-size="10.6" fill="#475569">漏简报子要求、漏交可编辑源文件图层、渲染中途截断</text>

      <text x="18" y="235" font-size="11.1" font-weight="700" fill="#8C6239">文件与技术损坏</text>
      <rect x="176" y="222" width="95" height="18" rx="4" fill="#8C6239"/>
      <text x="279" y="235" font-size="11.1" font-weight="700" fill="#8C6239">17.6%</text>
      <text x="484" y="235" font-size="10.6" fill="#475569">导出 0 字节坏文件、空文件夹、压缩包/程序打不开</text>

      <text x="18" y="264" font-size="11.1" font-weight="700" fill="#1F4E79">跨文件前后不一致</text>
      <rect x="176" y="251" width="80" height="18" rx="4" fill="#1F4E79"/>
      <text x="264" y="264" font-size="11.1" font-weight="700" fill="#1F4E79">14.8%</text>
      <text x="484" y="264" font-size="10.6" fill="#475569">报告正文核心数与附表冲突、样式表或 3D 贴图引用断链</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4E. PART 2.4 DIAGRAM | OSWORLD 2.1 CROSS-APP DAG & 93% ONE-WAY CLIFF
     ------------------------------------------------------------------------ */
  function renderDiagramOSWorldDAG() {
    const host = $("#diagram-osworld-dag");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 282" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="os-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#475569"/></marker>
      </defs>

      <!-- Header context strip -->
      <rect x="6" y="8" width="848" height="30" rx="5" fill="#F0F5FA" stroke="#BDD4E7"/>
      <text x="430" y="27" text-anchor="middle" font-size="10.8" font-weight="650" fill="#1F4E79">82 道纯本地离线长流程：中位 1.6h（较 1.0 拉长 48 倍）| 跨 2.44 款软件 | 250-318+ 步 | 弃用截图打分，直查 OS 底层终态</text>

      <!-- Example Workflow 1: Finance Report -->
      <text x="10" y="59" font-size="10.6" font-weight="700" fill="#111827">真题链路 A | 财务月报（跨 3 软件）</text>
      <rect x="6" y="66" width="154" height="44" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="83" y="84" text-anchor="middle" font-size="10.4" font-weight="650" fill="#1F4E79">本地脏 ERP 数据库</text>
      <text x="83" y="100" text-anchor="middle" font-size="9.6" fill="#64748B">导出含错账原始流水</text>
      <line x1="160" y1="88" x2="180" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="186" y="66" width="176" height="44" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="274" y="84" text-anchor="middle" font-size="10.4" font-weight="650" fill="#1F4E79">LibreOffice Calc</text>
      <text x="274" y="100" text-anchor="middle" font-size="9.6" fill="#64748B">清洗异常行 + 动态跨表公式</text>
      <line x1="362" y1="88" x2="382" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="388" y="66" width="144" height="44" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="460" y="84" text-anchor="middle" font-size="10.4" font-weight="650" fill="#1F4E79">Writer 月报文档</text>
      <text x="460" y="100" text-anchor="middle" font-size="9.6" fill="#64748B">嵌入图表并 Ctrl+S 落盘</text>
      <line x1="532" y1="88" x2="554" y2="88" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="560" y="66" width="294" height="44" rx="5" fill="#EDF6F4" stroke="#2D6A5B"/>
      <text x="572" y="84" font-size="10.4" font-weight="700" fill="#2D6A5B">Python 底层核验 (10–15 个 DAG 节点)</text>
      <text x="572" y="100" font-size="9.8" fill="#1E4D42">直读 SQL 表与电子表格公式树，手填静态死数判 0</text>

      <!-- Example Workflow 2: Design to Frontend -->
      <text x="10" y="131" font-size="10.6" font-weight="700" fill="#111827">真题链路 B | 抠图改前端（跨 3 软件）</text>
      <rect x="6" y="138" width="154" height="44" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="83" y="156" text-anchor="middle" font-size="10.4" font-weight="650" fill="#8C6239">GIMP 多图层 .xcf</text>
      <text x="83" y="172" text-anchor="middle" font-size="9.6" fill="#64748B">抠图保留透明通道导出 PNG</text>
      <line x1="160" y1="160" x2="180" y2="160" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="186" y="138" width="176" height="44" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="274" y="156" text-anchor="middle" font-size="10.4" font-weight="650" fill="#8C6239">VS Code 前端工程</text>
      <text x="274" y="172" text-anchor="middle" font-size="9.6" fill="#64748B">更新样式与图片资源路径</text>
      <line x1="362" y1="160" x2="382" y2="160" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="388" y="138" width="144" height="44" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="460" y="156" text-anchor="middle" font-size="10.4" font-weight="650" fill="#8C6239">本地 Web 服务</text>
      <text x="460" y="172" text-anchor="middle" font-size="9.6" fill="#64748B">重启站点并验证渲染</text>
      <line x1="532" y1="160" x2="554" y2="160" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="560" y="138" width="294" height="44" rx="5" fill="#EDF6F4" stroke="#2D6A5B"/>
      <text x="572" y="156" font-size="10.4" font-weight="700" fill="#2D6A5B">Python 底层核验 (零视觉裁判)</text>
      <text x="572" y="172" font-size="9.8" fill="#1E4D42">逐像素校验 PNG Alpha 通道 + 抓取渲染后页面 DOM</text>

      <!-- Bottom Strip: 93% Forward vs <7% Verify + Partial/Strict Cliff -->
      <rect x="6" y="196" width="848" height="78" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="216" font-size="10.6" font-weight="700" fill="#111827">XLang 轨迹动作归类：步骤均值高但严全通暴跌 34.7 分的根因</text>
      <rect x="18" y="224" width="756" height="23" rx="4" fill="#1F4E79"/>
      <text x="396" y="239" text-anchor="middle" font-size="10.4" font-weight="650" fill="#FFFFFF">&gt;93% 操作步数一路闷头往前推进（写完不回查、跨软件单点错沿下游滚雪球）</text>
      <rect x="778" y="224" width="64" height="23" rx="4" fill="#A84A32"/>
      <text x="810" y="239" text-anchor="middle" font-size="10" font-weight="700" fill="#FFFFFF">&lt;7% 回检</text>
      <text x="18" y="264" font-size="10.1" fill="#475569">结果映射：82 题离线步骤均值（Partial）达 <tspan font-weight="700" fill="#1F4E79">89.3%</tspan>，切到 10–15 个 DAG 节点零失误（Strict）回落至 <tspan font-weight="700" fill="#A84A32">54.6% (-34.7 pt)</tspan>；常见死因是漏按 Ctrl+S 或忘重启服务。</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4F. PART 2.5 DIAGRAM | TURN-BASED VS REALTIME PHYSICS CLOCK TIMING
     ------------------------------------------------------------------------ */
  function renderDiagramRealtimeClock() {
    const host = $("#diagram-realtime-clock");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 278" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="rt-arr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#1F4E79"/></marker>
        <marker id="rt-arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#A84A32"/></marker>
      </defs>

      <!-- Track A: Turn-based Step-blocking -->
      <rect x="6" y="8" width="848" height="78" rx="7" fill="#F0F5FA" stroke="#BDD4E7"/>
      <text x="18" y="27" font-size="11" font-weight="700" fill="#1F4E79">模式 A | 回合制停表（Turn-based，Isaac Sim 默认）</text>
      <text x="842" y="27" text-anchor="end" font-size="10.2" font-weight="600" fill="#1F4E79">只考静态空间规划，跳过推理耗时</text>

      <rect x="18" y="38" width="150" height="38" rx="5" fill="#FFFFFF" stroke="#93B4D1"/>
      <text x="93" y="54" text-anchor="middle" font-size="10.2" font-weight="700" fill="#111827">t = 0s 拍三路相机</text>
      <text x="93" y="69" text-anchor="middle" font-size="9.6" fill="#475569">杯子刚开始向右倾倒</text>
      <line x1="168" y1="57" x2="188" y2="57" stroke="#1F4E79" stroke-width="1.6" marker-end="url(#rt-arr-b)"/>

      <rect x="194" y="38" width="388" height="38" rx="5" fill="#E0EDF8" stroke="#1F4E79" stroke-dasharray="4,3"/>
      <text x="388" y="54" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1F4E79">[物理时钟冻结 10–18 秒] 重力暂停，杯子悬在半空等大模型思考</text>
      <text x="388" y="69" text-anchor="middle" font-size="9.6" fill="#334155">模型从容做满思维链推演，算出 6-DoF 目标位姿与夹爪开合</text>
      <line x1="582" y1="57" x2="602" y2="57" stroke="#1F4E79" stroke-width="1.6" marker-end="url(#rt-arr-b)"/>

      <rect x="608" y="38" width="234" height="38" rx="5" fill="#EDF6F4" stroke="#2D6A5B"/>
      <text x="725" y="54" text-anchor="middle" font-size="10.4" font-weight="700" fill="#2D6A5B">下发位姿 -> 接住成功</text>
      <text x="725" y="69" text-anchor="middle" font-size="9.6" fill="#1E4D42">停表最高 GPT-6 Astra 34.0% / 开源 9.0%</text>

      <!-- Track B: Realtime Continuous Physics Clock -->
      <rect x="6" y="98" width="848" height="82" rx="7" fill="#FDF3F0" stroke="#EACBC2"/>
      <text x="18" y="117" font-size="11" font-weight="700" fill="#A84A32">模式 B | 连续物理时钟（Realtime，Embodied First Exam 拔掉暂停键）</text>
      <text x="842" y="117" text-anchor="end" font-size="10.2" font-weight="600" fill="#A84A32">0.1 Hz 慢思考 vs 10–50 Hz 物理反馈</text>

      <rect x="18" y="128" width="150" height="40" rx="5" fill="#FFFFFF" stroke="#E2B9AC"/>
      <text x="93" y="145" text-anchor="middle" font-size="10.2" font-weight="700" fill="#111827">t = 0s 拍三路相机</text>
      <text x="93" y="160" text-anchor="middle" font-size="9.6" fill="#475569">杯子向右倾倒，时钟继续</text>
      <line x1="168" y1="148" x2="188" y2="148" stroke="#A84A32" stroke-width="1.6" marker-end="url(#rt-arr-r)"/>

      <rect x="194" y="128" width="186" height="40" rx="5" fill="#FCE7E1" stroke="#A84A32"/>
      <text x="287" y="145" text-anchor="middle" font-size="10.4" font-weight="700" fill="#A84A32">t = 0.4s 杯子已砸落桌面</text>
      <text x="287" y="160" text-anchor="middle" font-size="9.6" fill="#7A2E1B">大模型首步思维链刚起头</text>
      <line x1="380" y1="148" x2="400" y2="148" stroke="#A84A32" stroke-width="1.6" marker-end="url(#rt-arr-r)"/>

      <rect x="406" y="128" width="176" height="40" rx="5" fill="#FCE7E1" stroke="#A84A32"/>
      <text x="494" y="145" text-anchor="middle" font-size="10.4" font-weight="700" fill="#A84A32">t = 1.2s 目标滑出抓取区</text>
      <text x="494" y="160" text-anchor="middle" font-size="9.6" fill="#7A2E1B">场景态彻底失效不可逆</text>
      <line x1="582" y1="148" x2="602" y2="148" stroke="#A84A32" stroke-width="1.6" marker-end="url(#rt-arr-r)"/>

      <rect x="608" y="128" width="234" height="40" rx="5" fill="#A84A32"/>
      <text x="725" y="145" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFFFFF">t = 10–18s 动作指令才到达</text>
      <text x="725" y="160" text-anchor="middle" font-size="9.8" fill="#FDE8E1">彻底扑空！63.0% 题三家全拿 0 分</text>

      <!-- Bottom Summary Strip: First Exam 456 Outcomes + RoboDojo 4-Metric Reality Check -->
      <rect x="6" y="194" width="510" height="74" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="213" font-size="10.5" font-weight="700" fill="#111827">First Exam 456 核心题（35 套仿真）实时时钟结局</text>
      <rect x="18" y="222" width="306" height="24" rx="4" fill="#A84A32"/>
      <text x="171" y="238" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFFFFF">63.0% 全员 0 分 (287 / 456 题)</text>
      <rect x="328" y="222" width="176" height="24" rx="4" fill="#2D6A5B"/>
      <text x="416" y="238" text-anchor="middle" font-size="10.2" font-weight="650" fill="#FFFFFF">37.0% 静态慢题非零</text>
      <text x="18" y="261" font-size="9.7" fill="#64748B">结论：纯慢思考通用大模型直接控臂存在数量级时钟断层，必须配合高频低延迟底层策略。</text>

      <rect x="528" y="194" width="326" height="74" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="540" y="213" font-size="10.5" font-weight="700" fill="#111827">RoboDojo 四类口径参照（防混比）</text>
      <text x="540" y="231" font-size="10.1" fill="#334155">- 私有插件+停表仿真 (Fable 5.2)：<tspan font-weight="700" fill="#A84A32">64.9%‡</tspan></text>
      <text x="540" y="246" font-size="10.1" fill="#334155">- 11.14 审计清退违规后合规仿真最高：<tspan font-weight="700" fill="#1F4E79">56.4%</tspan></text>
      <text x="540" y="261" font-size="10.1" fill="#334155">- RealEval 真机最高：<tspan font-weight="700" fill="#2D6A5B">33.9%</tspan>（三旗舰未提交真机）</text>
    </svg>`;
    host.innerHTML = svg;
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
      <text x="440" y="29" text-anchor="middle" font-size="11.8" font-weight="700" fill="#A84A32">源头动力：把真实研发和业务需求持续做进环境（防止在旧题里空转）</text>
      <text x="440" y="47" text-anchor="middle" font-size="10.8" fill="#5C281A">旧榜考满只是被动提醒，人类新场景与真需求才是 Env 持续演进的起点</text>

      <line x1="440" y1="56" x2="440" y2="86" stroke="#A84A32" stroke-width="1.8" marker-end="url(#co-arr-r)"/>

      <!-- Center Top: Environment -->
      <rect x="260" y="92" width="360" height="68" rx="6" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.5"/>
      <text x="440" y="114" text-anchor="middle" font-size="13" font-weight="700" fill="#2D6A5B">Environment | 可自动验分的防作弊沙盒</text>
      <text x="440" y="134" text-anchor="middle" font-size="11" fill="#333333">真实脏场景 + Harbor 物理隔离 + 双向断言 / 物理实测</text>
      <text x="440" y="150" text-anchor="middle" font-size="10.4" fill="#666666">同时用作「外部基准评测」与「内部长程 RL 训练场」</text>

      <!-- Bottom Left: Model -->
      <rect x="30" y="198" width="270" height="72" rx="6" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.4"/>
      <text x="165" y="220" text-anchor="middle" font-size="12.6" font-weight="700" fill="#1F4E79">Model | 模型权重迭代</text>
      <text x="165" y="240" text-anchor="middle" font-size="11" fill="#333333">靠干净 RL 奖励学会控制改动边界、</text>
      <text x="165" y="256" text-anchor="middle" font-size="11" fill="#333333">自造测试与走不通时果断回滚 (FireFlash +10.4 分)</text>

      <!-- Bottom Right: Harness -->
      <rect x="580" y="198" width="270" height="72" rx="6" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.4"/>
      <text x="715" y="220" text-anchor="middle" font-size="12.6" font-weight="700" fill="#8C6239">Harness | 执行框架迭代</text>
      <text x="715" y="240" text-anchor="middle" font-size="11" fill="#333333">按失败记录修补工具、上下文压缩与</text>
      <text x="715" y="256" text-anchor="middle" font-size="11" fill="#333333">快照回滚机制 (训练与评测锁同套即涨 +4.4 分)</text>

      <!-- Arrows: Env -> Model, Env -> Harness -->
      <path d="M 260,126 L 165,126 L 165,192" fill="none" stroke="#2D6A5B" stroke-width="1.8" marker-end="url(#co-arr-g)"/>
      <rect x="64" y="136" width="156" height="22" rx="4" fill="#FFFFFF" stroke="#C3DFD8"/>
      <text x="142" y="151" text-anchor="middle" font-size="10.6" font-weight="600" fill="#2D6A5B">2. 输出干净 RL 奖励训练</text>

      <path d="M 620,126 L 715,126 L 715,192" fill="none" stroke="#A84A32" stroke-width="1.8" marker-end="url(#co-arr-r)"/>
      <rect x="660" y="136" width="156" height="22" rx="4" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="738" y="151" text-anchor="middle" font-size="10.6" font-weight="600" fill="#A84A32">3. 失败记录回传修短板</text>

      <!-- Bidirectional Model <-> Harness -->
      <line x1="306" y1="226" x2="574" y2="226" stroke="#1F4E79" stroke-width="1.8" marker-end="url(#co-arr-b)"/>
      <line x1="574" y1="246" x2="306" y2="246" stroke="#1F4E79" stroke-width="1.8" marker-end="url(#co-arr-b)"/>
      <rect x="348" y="218" width="184" height="36" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="440" y="234" text-anchor="middle" font-size="10.8" font-weight="700" fill="#1F4E79">4. 三者一起迭代 (RSI)</text>
      <text x="440" y="249" text-anchor="middle" font-size="10" fill="#666666">参与自身研发与下一代环境搭建</text>
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
     8B. INDEPENDENT 16-BENCHMARK STATS SVG GROUPED BY COLORED DOMAIN PLATES
     Every benchmark is plotted independently (zero cross-benchmark averaging).
     ------------------------------------------------------------------------ */
  function renderDomainStatsSVG() {
    const host = $("#chart-domain-stats");
    if (!host) return;
    const core = D.benchmarks.filter(b => b.track !== "legacy");
    const groups = [
      { key: "code", label: "代码工程",           bg: "#F5F8FC", bar: "#1F4E79" },
      { key: "sci",  label: "科学研究",           bg: "#F3F8F6", bar: "#2D6A5B" },
      { key: "off",  label: "办公业务",           bg: "#FBF7F1", bar: "#8C6239" },
      { key: "cua",  label: "Computer-Use Agent", bg: "#F5F6F9", bar: "#4B5563" },
      { key: "phys", label: "物理交互",           bg: "#FCF4F1", bar: "#A84A32" }
    ];

    const W = 980, padL = 224, padR = 294, padT = 56, padB = 34, rowH = 27, groupGap = 8;
    const plotW = W - padL - padR;
    const logMin = Math.log10(10), logMax = Math.log10(1500);
    const toX = n => padL + ((Math.log10(Math.max(10, n)) - logMin) / (logMax - logMin)) * plotW;

    let totalRows = 0;
    groups.forEach(g => { totalRows += core.filter(b => b.track === g.key).length; });
    const H = padT + totalRows * rowH + (groups.length - 1) * groupGap + padB;

    const accColor = { open: "#2D6A5B", hyb: "#8C6239", priv: "#A84A32" };
    const accShort = { open: "全开源", hyb: "公私混合", priv: "私有闭源" };

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    // Legend row
    const leg = [["全开源 (6)", "#2D6A5B"], ["公私混合 (7)", "#8C6239"], ["私有闭源 (3)", "#A84A32"]];
    leg.forEach(([txt, col], i) => {
      const lx = padL + i * 114;
      svg += `<rect x="${lx}" y="8" width="10" height="10" rx="2" fill="${col}"/>`;
      svg += `<text x="${lx + 14}" y="17" font-size="10.6" font-weight="600" fill="#333333">${txt}</text>`;
    });
    svg += `<rect x="${padL + 356}" y="8" width="14" height="10" rx="2" fill="#E8F1F8" stroke="#BDD4E7"/>`;
    svg += `<text x="${padL + 375}" y="17" font-size="10.4" fill="#1F4E79">50-250 题收敛区 (12/16)</text>`;

    // Column Headers
    svg += `<text x="12" y="42" font-size="10.8" font-weight="650" fill="#666666">领域底板与独立基准名称</text>`;
    svg += `<text x="${padL}" y="42" font-size="10.8" font-weight="650" fill="#666666">独立题量规模 (对数刻度，颜色表开放形态)</text>`;
    svg += `<text x="${W - padR + 18}" y="42" font-size="10.8" font-weight="650" fill="#666666">协作规模与开放策略</text>`;
    svg += `<line x1="8" y1="49" x2="${W - 8}" y2="49" stroke="#D1D5DB"/>`;

    // Golden zone vertical band (50-250 tasks)
    const gx1 = toX(50), gx2 = toX(250);
    const chartBottom = H - padB;
    svg += `<rect x="${gx1}" y="${padT - 2}" width="${gx2 - gx1}" height="${chartBottom - padT + 4}" fill="#E8F1F8" opacity="0.55"/>`;

    // Vertical grid ticks
    [15, 50, 100, 250, 1000].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT - 2}" x2="${x}" y2="${chartBottom + 2}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - 12}" text-anchor="middle" font-size="10" fill="#8A8A8A">${t} 题</text>`;
    });

    let curY = padT;
    groups.forEach((g, gi) => {
      const items = core.filter(b => b.track === g.key);
      const bandH = items.length * rowH;

      // Subtle domain background plate
      svg += `<rect x="8" y="${curY}" width="${W - 16}" height="${bandH}" rx="4" fill="${g.bg}" opacity="0.72"/>`;
      svg += `<rect x="8" y="${curY}" width="3.5" height="${bandH}" rx="1.5" fill="${g.bar}"/>`;

      // Re-draw golden zone tint lightly on top of domain plate so it stays visible
      svg += `<rect x="${gx1}" y="${curY}" width="${gx2 - gx1}" height="${bandH}" fill="#1F4E79" opacity="0.06"/>`;

      items.forEach((b, bi) => {
        const y = curY + bi * rowH;
        const cy = y + rowH / 2;
        const bx = toX(b.countNum);
        const col = accColor[b.access] || "#4B5563";

        if (bi > 0) {
          svg += `<line x1="16" y1="${y}" x2="${W - 14}" y2="${y}" stroke="#FFFFFF" stroke-width="1"/>`;
        }

        svg += `<g class="ind-bench-row" data-bid="${b.id}" data-tip="<b>${b.name}</b> (${g.label})<br>题量：${b.countStr}<br>协作：${b.orgScale}<br>开放：${b.accessLabel}<br>成本：${b.cost}" style="cursor:pointer;">`;
        svg += `<rect x="12" y="${y}" width="${W - 24}" height="${rowH}" fill="transparent"/>`;
        svg += `<text x="20" y="${cy + 4}" font-size="11.2" font-weight="600" fill="#1A1A1A">${b.name}</text>`;

        // Horizontal lollipop bar from padL to bx
        svg += `<line x1="${padL}" y1="${cy}" x2="${bx}" y2="${cy}" stroke="${col}" stroke-width="3.2" stroke-linecap="round" opacity="0.85"/>`;
        svg += `<circle cx="${bx}" cy="${cy}" r="4.8" fill="${col}" stroke="#FFFFFF" stroke-width="1.4"/>`;
        const lblX = bx + 9;
        svg += `<text x="${lblX}" y="${cy + 3.8}" font-size="10.2" font-weight="650" fill="${col}">${b.countNum}</text>`;

        // Right metadata: open/priv pill + orgScale
        svg += `<text x="${W - padR + 18}" y="${cy + 3.8}" font-size="10.2" font-weight="600" fill="${col}">${accShort[b.access]}</text>`;
        svg += `<text x="${W - padR + 68}" y="${cy + 3.8}" font-size="10.2" fill="#4B5563">${b.orgScale}</text>`;
        svg += `</g>`;
      });

      curY += bandH + groupGap;
    });

    svg += `</svg>`;
    host.innerHTML = svg;
    bindTooltips("#chart-domain-stats .ind-bench-row", el => el.dataset.tip);
    $$("#chart-domain-stats .ind-bench-row").forEach(el => {
      el.addEventListener("click", () => openDrawer(el.dataset.bid));
    });
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
    document.body.style.overflow = "hidden";
    $("#drawer-close-btn").addEventListener("click", closeDrawer);
  }

  function closeDrawer() {
    const bg = $("#drawer-bg");
    if (bg) bg.classList.remove("open");
    document.body.style.overflow = "";
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

  function initHeadingAnchors() {
    const targets = $$("article.chapter[id] > h2, .prose h3[id], section[id] > h2");
    targets.forEach(h => {
      if (h.querySelector(".h-anchor")) return;
      const id = h.id || h.parentElement?.id;
      if (!id) return;
      const a = document.createElement("a");
      a.className = "h-anchor";
      a.href = `#${id}`;
      a.textContent = "#";
      a.setAttribute("aria-label", "链接到此小节");
      h.appendChild(a);
    });
  }

  function initLangSwitch() {
    $$("a[data-lang-switch]").forEach(a => {
      a.addEventListener("click", e => {
        const hash = window.location.hash;
        if (!hash) return;
        e.preventDefault();
        const base = a.getAttribute("href").split("#")[0];
        window.location.href = base + hash;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initUIHelpers();
    initHeadingAnchors();
    initLangSwitch();
    renderAAOvernight();
    renderReleaseShiftSVG();
    renderCodeChart("fswe");
    renderDiagramTBS();
    renderDiagramBinder();
    renderDiagramAutobench();
    renderDiagramBriefcase();
    renderDiagramRLI();
    renderDiagramOSWorldDAG();
    renderDiagramRealtimeClock();
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
      if (e.key === "Escape") {
        closeLightbox();
        closeDrawer();
      }
    });
  });
})();
