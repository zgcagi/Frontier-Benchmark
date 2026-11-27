/* ==========================================================================
   2026 FRONTIER AI EVALUATION SURVEY | CHARTS, MECHANISM DIAGRAMS & EXPLORER (EN)
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
          copyBtn.textContent = "Copied BibTeX";
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
    lbEl.setAttribute("aria-label", "Enlarge figure");
    lbEl.innerHTML = `
      <div class="lightbox-frame">
        <img class="lightbox-img" src="" alt="">
        <div class="lightbox-bar">
          <div class="lightbox-cap"></div>
          <button type="button" class="lightbox-close">Close (Esc)</button>
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
     2. FIGURE 1 | AA OVERNIGHT SWAP DUMBBELL (Strictly Oct 26 -> Oct 27, 6 models)
     ------------------------------------------------------------------------ */
  function renderAAOvernight() {
    const host = $("#chart-aa-overnight");
    if (!host) return;
    const rows = D.aaOvernight;
    const W = 860, rowH = 42, padL = 168, padR = 110, padT = 40, padB = 40;
    const H = padT + rows.length * rowH + padB;
    const xMin = 24, xMax = 64;
    const toX = v => padL + ((v - xMin) / (xMax - xMin)) * (W - padL - padR);

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    svg += `<rect x="${toX(50)}" y="${padT - 6}" width="${toX(64) - toX(50)}" height="${rows.length * rowH + 6}" fill="#F0F5FA"/>`;
    svg += `<text x="${toX(57)}" y="${padT - 13}" text-anchor="middle" font-size="10.4" font-weight="600" fill="#1F4E79">US Closed-Source Band (50–64)</text>`;
    svg += `<rect x="${toX(28)}" y="${padT - 6}" width="${toX(48) - toX(28)}" height="${rows.length * rowH + 6}" fill="#FDF3F0"/>`;
    svg += `<text x="${toX(38)}" y="${padT - 13}" text-anchor="middle" font-size="10.4" font-weight="600" fill="#A84A32">CN 24h Drop Band (32–46)</text>`;

    [25, 30, 35, 40, 45, 50, 55, 60].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT - 4}" x2="${x}" y2="${H - padB}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - padB + 16}" text-anchor="middle" font-size="10.8" fill="#8A8A8A">${t}</text>`;
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

      svg += `<g class="aa-row" data-tip="<b>${r.model}</b><br>Oct 26 (v4.3.2): <b>${r.v4}</b> -> Oct 27 (v5.0): <b>${r.v5}</b> (${r.delta} pts)<br>${r.note}" style="cursor:pointer;">`;
      svg += `<rect x="0" y="${padT + i * rowH}" width="${W}" height="${rowH}" fill="transparent"/>`;
      svg += `<text x="${padL - 12}" y="${y + 4}" text-anchor="end" font-size="12.2" font-weight="600" fill="${col}">${r.model}</text>`;

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
      svg += `<text x="${W - padR + 55}" y="${y + 4}" text-anchor="middle" font-size="11.4" font-weight="600" fill="${pillFg}">${r.delta} pts</text>`;
      svg += `</g>`;
    });

    svg += `<circle cx="${padL}" cy="${H - 8}" r="4.5" fill="#FFFFFF" stroke="#8A8A8A" stroke-width="1.8"/>`;
    svg += `<text x="${padL + 10}" y="${H - 4}" font-size="10.8" fill="#666666">Oct 26 v4.3.2</text>`;
    svg += `<circle cx="${padL + 124}" cy="${H - 8}" r="5" fill="#1F4E79"/>`;
    svg += `<text x="${padL + 134}" y="${H - 4}" font-size="10.8" fill="#666666">Oct 27 v5.0 (US)</text>`;
    svg += `<circle cx="${padL + 272}" cy="${H - 8}" r="5" fill="#A84A32"/>`;
    svg += `<text x="${padL + 282}" y="${H - 4}" font-size="10.8" fill="#666666">Oct 27 v5.0 (CN)</text>`;
    svg += `</svg>`;

    host.innerHTML = svg;
    bindTooltips("#chart-aa-overnight .aa-row", el => el.dataset.tip);
  }

  /* ------------------------------------------------------------------------
     2B. FIGURE 1.2 | FRONTIER CLOSED-SOURCE RELEASE SHIFT (Nov 2026)
     Shows retired saturated benchmarks vs Claude Fable 5.2 / GPT-6.2 / Neon
     ------------------------------------------------------------------------ */
  function renderReleaseShiftSVG() {
    const host = $("#chart-release-shift");
    if (!host || !D.releaseShift) return;
    const { retired, rows } = D.releaseShift;

    const W = 980, rowH = 34;
    const topBannerH = 64;
    const tblHeadY = topBannerH + 56;
    const H = tblHeadY + rows.length * rowH + 34;

    const colTrack = 12;
    const colName = 158;
    const colFable = 436;
    const colGpt = 592;
    const colGemini = 748;
    const colTag = 918;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    // Top Strip: Retired Static Benchmarks
    svg += `<rect x="8" y="6" width="${W - 16}" height="54" rx="6" fill="#F8F9FA" stroke="#E5E7EB"/>`;
    svg += `<text x="20" y="24" font-size="10.8" font-weight="700" fill="#666666">Retired from Nov 2026 Frontier Release Tables (Traditional MCQ = 0)</text>`;
    svg += `<rect x="${W - 420}" y="10" width="402" height="21" rx="4" fill="#FDF3F0" stroke="#EACBC2"/>`;
    svg += `<text x="${W - 219}" y="24" text-anchor="middle" font-size="10.2" font-weight="650" fill="#A84A32">Claude Fable 5.2 Table (14): 8 New in 2026 / 2 Custom / 0 MCQ</text>`;

    let rx = 20;
    retired.forEach(item => {
      const pw = Math.max(82, Math.ceil(item.length * 6.5 + 16));
      svg += `<rect x="${rx}" y="36" width="${pw}" height="18" rx="3" fill="#FFFFFF" stroke="#D1D5DB"/>`;
      svg += `<text x="${rx + pw / 2}" y="48.5" text-anchor="middle" font-size="9.8" fill="#8A8A8A" text-decoration="line-through">${item}</text>`;
      rx += pw + 8;
    });

    // Legend Row
    svg += `<circle cx="16" cy="${topBannerH + 15}" r="4.5" fill="#1F4E79"/>`;
    svg += `<text x="26" y="${topBannerH + 19}" font-size="10.4" fill="#333333">Filled dot: Primary Nov 2026 release table</text>`;
    svg += `<circle cx="294" cy="${topBannerH + 15}" r="4.5" fill="#FFFFFF" stroke="#666666" stroke-width="1.6"/>`;
    svg += `<text x="304" y="${topBannerH + 19}" font-size="10.4" fill="#333333">Hollow circle: Peer or 3rd-party comparable reading</text>`;
    svg += `<text x="614" y="${topBannerH + 19}" font-size="10.4" fill="#8A8A8A">Hover any row for protocol notes</text>`;

    // Table Headers (2-line lab + flagship header to avoid column collisions)
    svg += `<line x1="8" y1="${tblHeadY - 28}" x2="${W - 8}" y2="${tblHeadY - 28}" stroke="#1A1A1A" stroke-width="1.3"/>`;
    svg += `<text x="${colTrack}" y="${tblHeadY - 6}" font-size="10.8" font-weight="650" fill="#666666">Domain</text>`;
    svg += `<text x="${colName}" y="${tblHeadY - 6}" font-size="10.8" font-weight="650" fill="#1A1A1A">2026 Frontier Benchmark</text>`;

    svg += `<text x="${colFable}" y="${tblHeadY - 15}" text-anchor="middle" font-size="9.6" font-weight="600" fill="#A84A32" opacity="0.85">Anthropic</text>`;
    svg += `<text x="${colFable}" y="${tblHeadY - 2}" text-anchor="middle" font-size="10.8" font-weight="700" fill="#A84A32">Fable 5.2 (Nov 9)</text>`;

    svg += `<text x="${colGpt}" y="${tblHeadY - 15}" text-anchor="middle" font-size="9.6" font-weight="600" fill="#2D6A5B" opacity="0.85">OpenAI</text>`;
    svg += `<text x="${colGpt}" y="${tblHeadY - 2}" text-anchor="middle" font-size="10.8" font-weight="700" fill="#2D6A5B">GPT-6.2 (Nov 17)</text>`;

    svg += `<text x="${colGemini}" y="${tblHeadY - 15}" text-anchor="middle" font-size="9.6" font-weight="600" fill="#1F4E79" opacity="0.85">Google DeepMind</text>`;
    svg += `<text x="${colGemini}" y="${tblHeadY - 2}" text-anchor="middle" font-size="10.8" font-weight="700" fill="#1F4E79">Gemini 4 Neon (Nov 18)</text>`;

    svg += `<text x="${colTag}" y="${tblHeadY - 6}" text-anchor="middle" font-size="10.8" font-weight="650" fill="#666666">Shift Signal</text>`;
    svg += `<line x1="8" y1="${tblHeadY + 4}" x2="${W - 8}" y2="${tblHeadY + 4}" stroke="#D1D5DB"/>`;

    const drawCell = (raw, cx, y, color) => {
      const idx = raw.indexOf(":");
      const mode = idx > -1 ? raw.slice(0, idx) : "n";
      const val = idx > -1 ? raw.slice(idx + 1) : raw;
      if (mode === "n") {
        return `<text x="${cx}" y="${y + 4}" text-anchor="middle" font-size="10.3" fill="#9CA3AF">${val}</text>`;
      }
      const isPrimary = mode === "p";
      const dotX = cx - 44;
      const circle = isPrimary
        ? `<circle cx="${dotX}" cy="${y}" r="4.6" fill="${color}"/>`
        : `<circle cx="${dotX}" cy="${y}" r="4.3" fill="#FFFFFF" stroke="${color}" stroke-width="1.6"/>`;
      return `${circle}<text x="${dotX + 10}" y="${y + 3.8}" font-size="10.6" font-weight="${isPrimary ? "650" : "400"}" fill="${isPrimary ? "#1A1A1A" : "#666666"}">${val}</text>`;
    };

    rows.forEach((r, idx) => {
      const rowTop = tblHeadY + 5 + idx * rowH;
      const y = rowTop + rowH / 2;
      const isHard = r.tag === "3-Lab Consensus";
      if (isHard) {
        svg += `<rect x="8" y="${rowTop}" width="${W - 16}" height="${rowH}" fill="#FDF3F0" opacity="0.55"/>`;
      } else if (idx % 2 === 1) {
        svg += `<rect x="8" y="${rowTop}" width="${W - 16}" height="${rowH}" fill="#FAFAFA"/>`;
      }
      svg += `<g class="shift-row" data-tip="<b>${r.name}</b> (${r.track})<br>${r.note}" style="cursor:pointer;">`;
      svg += `<rect x="8" y="${rowTop}" width="${W - 16}" height="${rowH}" fill="transparent"/>`;
      svg += `<text x="${colTrack}" y="${y + 3.8}" font-size="10.4" fill="#666666">${r.track}</text>`;
      svg += `<text x="${colName}" y="${y + 3.8}" font-size="11.1" font-weight="${isHard ? "700" : "600"}" fill="${isHard ? "#A84A32" : "#1A1A1A"}">${r.name}</text>`;
      svg += drawCell(r.fable, colFable, y, "#A84A32");
      svg += drawCell(r.gpt, colGpt, y, "#2D6A5B");
      svg += drawCell(r.gemini, colGemini, y, "#1F4E79");
      const tagBg = isHard ? "#FDF3F0" : "#F2F4F7";
      const tagFg = isHard ? "#A84A32" : "#4B5563";
      const tagBd = isHard ? "#EACBC2" : "#E5E7EB";
      svg += `<rect x="${colTag - 51}" y="${y - 10}" width="102" height="20" rx="3" fill="${tagBg}" stroke="${tagBd}"/>`;
      svg += `<text x="${colTag}" y="${y + 3.5}" text-anchor="middle" font-size="9.8" font-weight="600" fill="${tagFg}">${r.tag}</text>`;
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
      const W = 860, H = 394, padL = 62, padR = 36, padT = 46, padB = 50;
      const xMin = Math.log10(6), xMax = Math.log10(1500);
      const toX = c => padL + ((Math.log10(c) - xMin) / (xMax - xMin)) * (W - padL - padR);
      const toY = s => padT + ((78 - s) / 78) * (H - padT - padB);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

      const bx1 = toX(82), bx2 = toX(125);
      svg += `<rect x="${bx1}" y="${padT}" width="${bx2 - bx1}" height="${H - padT - padB}" fill="#FAF5EE"/>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 19}" text-anchor="middle" font-size="10.4" font-weight="600" fill="#8C6239">Same-Cost Band (~$100)</text>`;
      svg += `<text x="${(bx1 + bx2) / 2}" y="${padT - 6}" text-anchor="middle" font-size="10.1" fill="#8C6239">62% vs 30%</text>`;

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
      svg += `<text x="${(padL + W - padR) / 2}" y="${H - 8}" text-anchor="middle" font-size="11.2" font-weight="600" fill="#333333">FrontierSWE v2 Mean Token Cost per Task (Log Scale / 20h Budget)</text>`;
      svg += `<text x="16" y="${(padT + H - padB) / 2}" text-anchor="middle" transform="rotate(-90 16 ${(padT + H - padB) / 2})" font-size="11.2" font-weight="600" fill="#333333">mean@5 Solve Rate (%)</text>`;

      const paretoPrefixes = ["DeepSeek", "Claude Haiku", "Gemini 4 Carbon", "Gemini 4 Neon", "Claude Fable"];
      const pts = paretoPrefixes.map(pre => data.find(d => d.model.startsWith(pre))).filter(Boolean);
      const pathD = pts.map((p, idx) => `${idx === 0 ? "M" : "L"}${toX(p.cost).toFixed(1)},${toY(p.score).toFixed(1)}`).join(" ");
      svg += `<path d="${pathD}" fill="none" stroke="#2D6A5B" stroke-width="1.8" stroke-dasharray="5,4"/>`;
      svg += `<text x="${toX(14)}" y="${toY(53)}" font-size="10.6" font-weight="600" fill="#2D6A5B">Pareto Frontier</text>`;

      const offPrefixes = [
        ["Claude Fable", [11, 4]],
        ["GPT-6 Astra", [-11, 4]],
        ["Gemini 4 Neon", [11, 15]],
        ["Gemini 4 Carbon", [-11, -8]],
        ["Claude Haiku", [11, 5]],
        ["GLM-5.3", [11, -5]],
        ["Kimi K3", [11, 11]],
        ["Qwen3.8-Max", [11, 4]],
        ["DeepSeek", [11, 4]]
      ];
      const getOff = model => {
        const hit = offPrefixes.find(([pre]) => model.startsWith(pre));
        return hit ? hit[1] : [10, 4];
      };

      data.forEach(d => {
        const x = toX(d.cost), y = toY(d.score);
        const col = d.cn ? "#A84A32" : "#1F4E79";
        const [dx, dy] = getOff(d.model);
        const anchor = dx < 0 ? "end" : "start";
        svg += `<g class="code-pt" data-tip="<b>${d.model}</b><br>Solve Rate: <b>${d.score}%</b> | Cost/Task: <b>${d.costLabel}</b> | Mean Time: <b>${d.hours}</b><br>${d.note}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="6.5" fill="${col}" stroke="#FFFFFF" stroke-width="2"/>`;
        svg += `<text x="${x + dx}" y="${y + dy}" text-anchor="${anchor}" font-size="10.8" font-weight="600" fill="${col}">${d.model} (${d.score}%)</text>`;
        svg += `</g>`;
      });

      svg += `</svg>`;
      host.innerHTML = svg;
      bindTooltips("#chart-code-pareto .code-pt", el => el.dataset.tip);
    } else {
      const data = D.tb41Leaderboard;
      const W = 860, rowH = 35, padL = 168, padR = 258, padT = 28, padB = 18;
      const H = padT + data.length * rowH + padB;
      const toW = s => (s / 80) * (W - padL - padR);

      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
      svg += `<text x="${padL - 10}" y="16" text-anchor="end" font-size="10.8" font-weight="600" fill="#666666">Model</text>`;
      svg += `<text x="${padL}" y="16" font-size="10.8" font-weight="600" fill="#666666">TB 4.1 Solve Rate (66 Tasks / 8h Denoised)</text>`;
      svg += `<text x="${W - padR + 58}" y="16" text-anchor="end" font-size="10.8" font-weight="600" fill="#666666">Run Cost</text>`;
      svg += `<text x="${W - padR + 70}" y="16" font-size="10.8" font-weight="600" fill="#666666">Harness / Notes</text>`;

      data.forEach((d, i) => {
        const y = padT + i * rowH + 6;
        const barW = toW(d.score);
        const col = d.cn ? "#2D6A5B" : "#1F4E79";
        const costCol = d.cost >= 10 ? "#A84A32" : (d.cost <= 0.4 ? "#2D6A5B" : "#666666");

        svg += `<g class="tb-pt" data-tip="<b>${d.model}</b><br>TB 4.1: <b>${d.score}%</b> | Run Cost: <b>${d.costLabel}</b><br>${d.harness}" style="cursor:pointer;">`;
        svg += `<rect x="0" y="${y - 4}" width="${W}" height="${rowH - 2}" fill="transparent"/>`;
        svg += `<text x="${padL - 10}" y="${y + 14}" text-anchor="end" font-size="11.6" font-weight="${d.cn ? "650" : "500"}" fill="${d.cn ? "#2D6A5B" : "#1A1A1A"}">${d.model}</text>`;
        svg += `<rect x="${padL}" y="${y + 3}" width="${W - padL - padR}" height="14" rx="3" fill="#F2F4F7"/>`;
        svg += `<rect x="${padL}" y="${y + 3}" width="${barW}" height="14" rx="3" fill="${col}"/>`;
        svg += `<text x="${padL + barW + 7}" y="${y + 14}" font-size="11.2" font-weight="600" fill="${col}">${d.score}%</text>`;
        svg += `<text x="${W - padR + 58}" y="${y + 14}" text-anchor="end" font-size="11.2" font-weight="600" fill="${costCol}">${d.costLabel}</text>`;
        svg += `<text x="${W - padR + 70}" y="${y + 14}" font-size="10.2" fill="#666666">${d.harness}</text>`;
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
    const svg = `<svg viewBox="0 0 860 304" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="tbs-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
      </defs>

      <!-- Col 1: Disconnected Execution Container -->
      <rect x="6" y="8" width="260" height="206" rx="8" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <rect x="6" y="8" width="260" height="30" rx="8" fill="#1F4E79"/>
      <text x="136" y="28" text-anchor="middle" font-size="11.8" font-weight="700" fill="#FFFFFF">1. Offline Container (Harbor)</text>
      <text x="18" y="56" font-size="11" font-weight="700" fill="#111827">Domain Toolchains &amp; Raw Data:</text>
      <text x="18" y="75" font-size="10.8" font-family="var(--font-mono)" fill="#1F4E79">C++ / Fortran / R / Python</text>
      <text x="18" y="94" font-size="10.5" fill="#334155">GeoTIFF / 9-yr hydrology / chaos data</text>
      <line x1="18" y1="108" x2="254" y2="108" stroke="#CBD5E1"/>
      <text x="18" y="128" font-size="10.5" fill="#334155">- Zero internet: blocks paper lookup</text>
      <text x="18" y="148" font-size="10.5" fill="#334155">- tests/ &amp; reference stripped out</text>
      <text x="18" y="168" font-size="10.5" fill="#334155">- 3-gate intake: oracle 5/5 pass,</text>
      <text x="18" y="187" font-size="10.3" fill="#475569">  no-op 0% + red-team audit</text>

      <line x1="266" y1="111" x2="292" y2="111" stroke="#334155" stroke-width="1.8" marker-end="url(#tbs-arr)"/>

      <!-- Col 2: Concrete Task Execution (Black Ice Trap) -->
      <rect x="298" y="8" width="266" height="206" rx="8" fill="#F8FAFC" stroke="#2D6A5B" stroke-width="1.3"/>
      <rect x="298" y="8" width="266" height="30" rx="8" fill="#2D6A5B"/>
      <text x="431" y="28" text-anchor="middle" font-size="11.8" font-weight="700" fill="#FFFFFF">2. Case: Lake Mendota Ice</text>
      <text x="310" y="55" font-size="10.5" fill="#334155">Input: 10-yr Landsat + MODIS imagery</text>
      <rect x="310" y="66" width="242" height="64" rx="6" fill="#FDF3F0" stroke="#EACBC2"/>
      <text x="320" y="84" font-size="10.6" font-weight="700" fill="#A84A32">Trap: Brightness hits "black ice"</text>
      <text x="320" y="102" font-size="10.2" fill="#5C281A">Clear smooth ice looks dark like water</text>
      <text x="320" y="118" font-size="10.2" fill="#5C281A">Zero code errors, wrong dates -> 0%</text>
      <rect x="310" y="139" width="242" height="64" rx="6" fill="#EDF6F4" stroke="#B7DDD3"/>
      <text x="320" y="157" font-size="10.6" font-weight="700" fill="#2D6A5B">Fix: Cloud mask + dual-sat align</text>
      <text x="320" y="175" font-size="10.2" fill="#1E4D42">Unify CRS, fuse bands &amp; time series</text>
      <text x="320" y="191" font-size="10" font-family="var(--font-mono)" fill="#1E4D42">-> write ice_dates.csv (1-way out)</text>

      <line x1="564" y1="111" x2="590" y2="111" stroke="#334155" stroke-width="1.8" marker-end="url(#tbs-arr)"/>

      <!-- Col 3: Isolated Scientific Verifier -->
      <rect x="596" y="8" width="258" height="206" rx="8" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.3"/>
      <rect x="596" y="8" width="258" height="30" rx="8" fill="#8C6239"/>
      <text x="725" y="28" text-anchor="middle" font-size="11.8" font-weight="700" fill="#FFFFFF">3. Isolated Verifier (pytest)</text>
      <text x="608" y="56" font-size="10.6" font-weight="700" fill="#111827">Scientist-authored tests (zero LLM):</text>
      <text x="608" y="77" font-size="10.4" fill="#334155">- Freeze dates: yearly obs tolerance</text>
      <text x="608" y="97" font-size="10.4" fill="#334155">- 15-param hydrology: NSE fit score</text>
      <text x="608" y="117" font-size="10.4" fill="#334155">- Chaos/Chem: physical safety bounds</text>
      <rect x="608" y="136" width="234" height="65" rx="6" fill="#FFFFFF" stroke="#E5D4BE"/>
      <text x="725" y="157" text-anchor="middle" font-size="11" font-weight="700" fill="#8C6239">Binary 0/1 Numerical Verdict</text>
      <text x="725" y="175" text-anchor="middle" font-size="10.2" fill="#475569">Ignores code style &amp; prose polish;</text>
      <text x="725" y="191" text-anchor="middle" font-size="10.2" fill="#475569">checks physical &amp; statistical bounds</text>

      <!-- Bottom Compact Strip: 5-Discipline Composition + Non-Model Variables -->
      <rect x="6" y="226" width="848" height="70" rx="7" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="246" font-size="10.6" font-weight="700" fill="#111827">Launch 70 Tasks (7.6% of 920 proposals; expanded to 96)</text>
      <rect x="18" y="256" width="114" height="26" rx="4" fill="#1F4E79"/><text x="75" y="273" text-anchor="middle" font-size="10.6" font-weight="650" fill="#FFF">Bio 19</text>
      <rect x="135" y="256" width="102" height="26" rx="4" fill="#2D6A5B"/><text x="186" y="273" text-anchor="middle" font-size="10.6" font-weight="650" fill="#FFF">Phys 17</text>
      <rect x="240" y="256" width="102" height="26" rx="4" fill="#4B6B8A"/><text x="291" y="273" text-anchor="middle" font-size="10.6" font-weight="650" fill="#FFF">Math 17</text>
      <rect x="345" y="256" width="54" height="26" rx="4" fill="#8C6239"/><text x="372" y="273" text-anchor="middle" font-size="10.2" font-weight="650" fill="#FFF">Eng 9</text>
      <rect x="402" y="256" width="48" height="26" rx="4" fill="#A84A32"/><text x="426" y="273" text-anchor="middle" font-size="10.2" font-weight="650" fill="#FFF">Geo 8</text>

      <line x1="464" y1="234" x2="464" y2="288" stroke="#CBD5E1"/>
      <text x="476" y="246" font-size="10.6" font-weight="700" fill="#A84A32">Two Non-Model Confounders to Separate:</text>
      <text x="476" y="265" font-size="10.1" fill="#334155">- Harness: Mini-SWE drops same weights 18.9 pt (74.6->55.7%)</text>
      <text x="476" y="283" font-size="10.1" fill="#334155">- Compute: 10M–130M tok/task; Vals shows 18x cost spread</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4B. PART 2.2 DIAGRAM | DE NOVO BINDER DESIGN 24H PIPELINE & WET-LAB GAP
     ------------------------------------------------------------------------ */
  function renderDiagramBinder() {
    const host = $("#diagram-binder-pipeline");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 278" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="bnd-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
      </defs>

      <!-- 4-Step Autonomous Protein Design Pipeline -->
      <rect x="6" y="8" width="194" height="170" rx="8" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <rect x="6" y="8" width="194" height="30" rx="8" fill="#1F4E79"/>
      <text x="103" y="28" text-anchor="middle" font-size="11.4" font-weight="700" fill="#FFFFFF">01 | Targets &amp; Budget</text>
      <text x="18" y="56" font-size="10.8" fill="#111827" font-weight="700">16 Targets (15 Testable)</text>
      <text x="18" y="75" font-size="10.3" fill="#334155">- 3D structure (e.g. RBX1)</text>
      <text x="18" y="94" font-size="10.3" fill="#334155">- 16k-word expert protocol</text>
      <text x="18" y="113" font-size="10.3" fill="#334155">- Open structural tool stack</text>
      <rect x="18" y="131" width="170" height="34" rx="5" fill="#FFFFFF" stroke="#BDD4E7"/>
      <text x="103" y="152" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1F4E79">1 GPU / 24h Autonomous</text>

      <line x1="200" y1="93" x2="220" y2="93" stroke="#334155" stroke-width="1.8" marker-end="url(#bnd-arr)"/>

      <rect x="226" y="8" width="194" height="170" rx="8" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.3"/>
      <rect x="226" y="8" width="194" height="30" rx="8" fill="#2D6A5B"/>
      <text x="323" y="28" text-anchor="middle" font-size="11.4" font-weight="700" fill="#FFFFFF">02 | Autonomous Design</text>
      <text x="238" y="56" font-size="10.8" fill="#111827" font-weight="700">Zero-Human Scripting</text>
      <text x="238" y="75" font-size="10.3" fill="#334155">- Parse target &amp; epitopes</text>
      <text x="238" y="94" font-size="10.3" fill="#334155">- Run RFdiffusion backbones</text>
      <text x="238" y="113" font-size="10.3" fill="#334155">- Batch generate BindCraft</text>
      <rect x="238" y="131" width="170" height="34" rx="5" fill="#FFFFFF" stroke="#B7DDD3"/>
      <text x="323" y="152" text-anchor="middle" font-size="10.4" font-weight="700" fill="#2D6A5B">Novel De Novo Sequences</text>

      <line x1="420" y1="93" x2="440" y2="93" stroke="#334155" stroke-width="1.8" marker-end="url(#bnd-arr)"/>

      <rect x="446" y="8" width="194" height="170" rx="8" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.3"/>
      <rect x="446" y="8" width="194" height="30" rx="8" fill="#8C6239"/>
      <text x="543" y="28" text-anchor="middle" font-size="11.4" font-weight="700" fill="#FFFFFF">03 | Refolding Filter</text>
      <text x="458" y="56" font-size="10.8" fill="#111827" font-weight="700">Iterative Self-Screening</text>
      <text x="458" y="75" font-size="10.3" fill="#334155">- Boltz / AlphaFold refold</text>
      <text x="458" y="94" font-size="10.3" fill="#334155">- Re-target on failed poses</text>
      <text x="458" y="113" font-size="10.3" fill="#334155">- 1,440 candidate designs</text>
      <rect x="458" y="131" width="170" height="34" rx="5" fill="#FFFFFF" stroke="#E5D4BE"/>
      <text x="543" y="152" text-anchor="middle" font-size="10.5" font-weight="700" fill="#8C6239">In-Silico Pass: 85.1%</text>

      <line x1="640" y1="93" x2="660" y2="93" stroke="#334155" stroke-width="1.8" marker-end="url(#bnd-arr)"/>

      <rect x="666" y="8" width="188" height="170" rx="8" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3"/>
      <rect x="666" y="8" width="188" height="30" rx="8" fill="#A84A32"/>
      <text x="760" y="28" text-anchor="middle" font-size="11.4" font-weight="700" fill="#FFFFFF">04 | Blind CRO Wet Lab</text>
      <text x="678" y="56" font-size="10.8" fill="#111827" font-weight="700">Blinded Lab Synthesis</text>
      <text x="678" y="75" font-size="10.3" fill="#334155">- Twist: 1,320 synthesized</text>
      <text x="678" y="94" font-size="10.3" fill="#334155">- Adaptyv: HT-SPR assay</text>
      <text x="678" y="113" font-size="10.3" fill="#334155">- 14/15 targets bound</text>
      <rect x="678" y="131" width="164" height="34" rx="5" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="760" y="152" text-anchor="middle" font-size="9.9" font-weight="700" fill="#A84A32">Wet Lab 22.6–35.1% (3.9nM)</text>

      <!-- Bottom Compact Gap Strip -->
      <rect x="6" y="192" width="848" height="78" rx="7" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="213" font-size="10.8" font-weight="700" fill="#111827">Proxy Overfitting Cliff: 85.1% In-Silico Refolding Halves Under Blind Expression &amp; SPR Assays</text>
      <rect x="18" y="226" width="196" height="28" rx="5" fill="#8C6239"/>
      <text x="116" y="244" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFFFFF">In-Silico Refolding: 85.1%</text>
      <text x="228" y="244" text-anchor="middle" font-size="12.5" font-weight="700" fill="#A84A32">-></text>
      <rect x="242" y="226" width="196" height="28" rx="5" fill="#2D6A5B"/>
      <text x="340" y="244" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFFFFF">Top-Ranked Wet Lab: 49.0%</text>
      <text x="452" y="244" text-anchor="middle" font-size="12.5" font-weight="700" fill="#A84A32">-></text>
      <rect x="466" y="226" width="200" height="28" rx="5" fill="#A84A32"/>
      <text x="566" y="244" text-anchor="middle" font-size="10.3" font-weight="700" fill="#FFFFFF">1,320 Wet Lab: 22.6%–35.1%</text>
      <rect x="678" y="226" width="164" height="28" rx="5" fill="#E2E8F0"/>
      <text x="760" y="244" text-anchor="middle" font-size="10.2" font-weight="650" fill="#475569">Human Baseline: 10%–15%</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4C. PART 2.3 DIAGRAM 1 | AUTOMATIONBENCH 47 SAAS ARCH + BLE 71% AUDIT
     ------------------------------------------------------------------------ */
  function renderDiagramAutobench() {
    const host = $("#diagram-autobench-arch");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 326" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="ab-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
        <marker id="ab-arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#2D6A5B"/></marker>
      </defs>

      <!-- Left: Minimal 2-Primitive Agent -->
      <rect x="6" y="8" width="222" height="208" rx="8" fill="#1E293B" stroke="#0F172A"/>
      <text x="117" y="30" text-anchor="middle" font-size="11.4" font-weight="700" fill="#F8FAFC">Agent Under Test (No Wrappers)</text>
      <rect x="18" y="44" width="198" height="66" rx="6" fill="#293548" stroke="#475569"/>
      <text x="28" y="63" font-size="11" font-weight="700" fill="#93C5FD">1. search (BM25)</text>
      <text x="28" y="81" font-size="10.2" fill="#CBD5E1">Queries ~500 OpenAPI specs</text>
      <text x="28" y="97" font-size="10.2" fill="#CBD5E1">to discover REST endpoints</text>
      <rect x="18" y="120" width="198" height="84" rx="6" fill="#293548" stroke="#475569"/>
      <text x="28" y="139" font-size="11" font-weight="700" fill="#86EFAC">2. execute (Raw HTTP)</text>
      <text x="28" y="157" font-size="10.2" fill="#CBD5E1">Builds Method / URL / JSON</text>
      <text x="28" y="173" font-size="10.2" fill="#CBD5E1">Handles paging, 4xx &amp; retries</text>
      <text x="28" y="191" font-size="9.9" fill="#FDE68A">No clarifying questions allowed</text>

      <!-- Bidirectional arrows -->
      <line x1="228" y1="93" x2="254" y2="93" stroke="#2D6A5B" stroke-width="1.8" marker-end="url(#ab-arr-g)"/>
      <line x1="254" y1="127" x2="228" y2="127" stroke="#334155" stroke-width="1.8" marker-end="url(#ab-arr)"/>

      <!-- Center: 47 Local SaaS Sandbox -->
      <rect x="260" y="8" width="328" height="208" rx="8" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.3"/>
      <text x="424" y="30" text-anchor="middle" font-size="11.3" font-weight="700" fill="#2D6A5B">Local Isolated Enterprise (47 SaaS / 6 Depts)</text>

      <rect x="272" y="42" width="148" height="75" rx="6" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="282" y="60" font-size="11" font-weight="700" fill="#A84A32">CRM</text>
      <text x="282" y="79" font-size="10.1" fill="#475569">3 lookalike accounts</text>
      <text x="282" y="98" font-size="9.8" font-family="var(--font-mono)" fill="#A84A32">Meridian Corp / Sol.</text>

      <rect x="428" y="42" width="148" height="75" rx="6" fill="#FFFFFF" stroke="#E5D4BE"/>
      <text x="438" y="60" font-size="11" font-weight="700" fill="#8C6239">Sheets</text>
      <text x="438" y="79" font-size="10.1" fill="#475569">Stale vs active rows</text>
      <text x="438" y="98" font-size="9.8" font-family="var(--font-mono)" fill="#8C6239">1.10 (old) -> 1.30</text>

      <rect x="272" y="127" width="148" height="75" rx="6" fill="#FFFFFF" stroke="#BDD4E7"/>
      <text x="282" y="145" font-size="11" font-weight="700" fill="#1F4E79">Gmail</text>
      <text x="282" y="164" font-size="10.1" fill="#475569">Hidden CC &amp; no-send</text>
      <text x="282" y="182" font-size="10.1" fill="#475569">rules in messy threads</text>

      <rect x="428" y="127" width="148" height="75" rx="6" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="438" y="145" font-size="10.4" font-weight="700" fill="#334155">Slack / Tickets / Cal</text>
      <text x="438" y="164" font-size="10.1" fill="#475569">Check open escalations</text>
      <text x="438" y="182" font-size="10.1" fill="#475569">Route per internal SOP</text>

      <line x1="588" y1="111" x2="614" y2="111" stroke="#334155" stroke-width="1.8" marker-end="url(#ab-arr)"/>

      <!-- Right: Objectives + Guardrails Judge -->
      <rect x="620" y="8" width="234" height="208" rx="8" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3"/>
      <rect x="620" y="8" width="234" height="30" rx="8" fill="#A84A32"/>
      <text x="737" y="28" text-anchor="middle" font-size="11.4" font-weight="700" fill="#FFFFFF">DB Final-State Gate (Zero LLM)</text>
      <text x="632" y="55" font-size="10.5" font-weight="700" fill="#111827">Ignores chat; audits DB tables:</text>
      <text x="632" y="75" font-size="10.5" fill="#2D6A5B" font-weight="700">Objectives (Required Writes)</text>
      <text x="632" y="92" font-size="10" fill="#334155">Rows, amounts &amp; emails exact</text>
      <text x="632" y="112" font-size="10.5" fill="#A84A32" font-weight="700">Guardrails (Prohibitions)</text>
      <text x="632" y="129" font-size="10" fill="#334155">No restricted posts or wrong IDs</text>
      <rect x="632" y="142" width="210" height="62" rx="6" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="642" y="160" font-size="10.4" font-weight="700" fill="#1F4E79">Any guardrail breach -> 0%</text>
      <text x="642" y="177" font-size="10" fill="#475569">Objective 79.3% -> Strict 56.6%</text>
      <text x="642" y="193" font-size="9.8" fill="#A84A32">Typical strict drop: 22–34 pts</text>

      <!-- Bottom Strip: BLE 100-Task White-Box Audit -->
      <rect x="6" y="228" width="848" height="90" rx="7" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="249" font-size="10.6" font-weight="700" fill="#111827">BLE Line-by-Line White-Box Audit of Public v1.0.6 (100 DB Scripts): 71% Had Assertion or Reference Bugs</text>
      <rect x="18" y="260" width="146" height="26" rx="4" fill="#2D6A5B"/><text x="91" y="277" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFF">19 Pass</text>
      <rect x="167" y="260" width="84" height="26" rx="4" fill="#94A3B8"/><text x="209" y="277" text-anchor="middle" font-size="10.2" font-weight="700" fill="#FFF">10 Unclear</text>
      <rect x="254" y="260" width="230" height="26" rx="4" fill="#A84A32"/><text x="369" y="277" text-anchor="middle" font-size="10.3" font-weight="700" fill="#FFF">28 False Pos (Wrong Passed)</text>
      <rect x="487" y="260" width="140" height="26" rx="4" fill="#C46B48"/><text x="557" y="277" text-anchor="middle" font-size="10.3" font-weight="700" fill="#FFF">18 False Neg</text>
      <rect x="630" y="260" width="76" height="26" rx="4" fill="#8C6239"/><text x="668" y="277" text-anchor="middle" font-size="10" font-weight="700" fill="#FFF">9 1-Way</text>
      <rect x="709" y="260" width="133" height="26" rx="4" fill="#64748B"/><text x="775.5" y="277" text-anchor="middle" font-size="10.2" font-weight="700" fill="#FFF">16 Ref/Other</text>
      <text x="18" y="306" font-size="9.9" fill="#475569">Takeaway: Pure-code verifiers in complex SaaS workflows are not bug-free; hidden timestamps, undeclared columns &amp; one-way checks distort scores.</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4D. PART 2.3 DIAGRAM 2 | AA-BRIEFCASE v1.1 WORKSPACE & 3-PILLAR SCORING
     ------------------------------------------------------------------------ */
  function renderDiagramBriefcase() {
    const host = $("#diagram-briefcase-flow");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 294" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="bc-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
      </defs>

      <!-- Step 1: 4 Simulated Corporate Archives -->
      <rect x="6" y="8" width="248" height="198" rx="8" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <rect x="6" y="8" width="248" height="30" rx="8" fill="#1F4E79"/>
      <text x="130" y="28" text-anchor="middle" font-size="11.4" font-weight="700" fill="#FFFFFF">1. 4 Simulated Enterprises (91)</text>
      <text x="18" y="55" font-size="10.6" font-weight="700" fill="#111827">Built w/ Google, McKinsey &amp; BCG</text>
      <text x="18" y="74" font-size="10" fill="#1F4E79" font-weight="650">Data Sci | PM | Banking | Industrials</text>
      <line x1="18" y1="86" x2="242" y2="86" stroke="#CBD5E1"/>
      <text x="18" y="105" font-size="10.4" fill="#334155">- &gt;25,000 multi-week Slack msgs</text>
      <text x="18" y="124" font-size="10.4" fill="#334155">- &gt;3,500 emails &amp; meeting notes</text>
      <text x="18" y="143" font-size="10.4" fill="#334155">- Conflicting old vs new SOPs</text>
      <text x="18" y="162" font-size="10.4" fill="#334155">- Raw CSVs &amp; financial ledgers</text>
      <text x="18" y="186" font-size="10" font-weight="650" fill="#A84A32">Trap: Msg #18k changes return policy</text>

      <line x1="254" y1="107" x2="278" y2="107" stroke="#334155" stroke-width="1.8" marker-end="url(#bc-arr)"/>

      <!-- Step 2: Agentic Workspace Execution -->
      <rect x="284" y="8" width="214" height="198" rx="8" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.3"/>
      <rect x="284" y="8" width="214" height="30" rx="8" fill="#2D6A5B"/>
      <text x="391" y="28" text-anchor="middle" font-size="11.4" font-weight="700" fill="#FFFFFF">2. Workspace &amp; Deliverables</text>
      <text x="296" y="55" font-size="10.6" font-weight="700" fill="#111827">Autonomous sandbox work:</text>
      <text x="296" y="75" font-size="10.3" fill="#334155">- Multi-hop search across silos</text>
      <text x="296" y="94" font-size="10.3" fill="#334155">- Docker/E2B Python analysis</text>
      <text x="296" y="113" font-size="10.3" fill="#334155">- Board-ready office artifacts:</text>
      <rect x="296" y="126" width="190" height="66" rx="6" fill="#FFFFFF" stroke="#B7DDD3"/>
      <text x="306" y="145" font-size="10.1" font-family="var(--font-mono)" fill="#2D6A5B">.xlsx linked formula models</text>
      <text x="306" y="164" font-size="10.1" font-family="var(--font-mono)" fill="#2D6A5B">.pptx executive board decks</text>
      <text x="306" y="183" font-size="10.1" font-family="var(--font-mono)" fill="#2D6A5B">.docx / .pdf strategy memos</text>

      <line x1="498" y1="107" x2="522" y2="107" stroke="#334155" stroke-width="1.8" marker-end="url(#bc-arr)"/>

      <!-- Step 3: Decoupled 3-Pillar Verifier -->
      <rect x="528" y="8" width="326" height="198" rx="8" fill="#F8FAFC" stroke="#8C6239" stroke-width="1.3"/>
      <rect x="528" y="8" width="326" height="30" rx="8" fill="#8C6239"/>
      <text x="691" y="28" text-anchor="middle" font-size="11.4" font-weight="700" fill="#FFFFFF">3. Decoupled 3-Pillar Judge</text>

      <rect x="540" y="47" width="302" height="70" rx="6" fill="#FFFFFF" stroke="#BDD4E7"/>
      <text x="552" y="66" font-size="10.5" font-weight="700" fill="#1F4E79">Track A | Binary Rubric (Factual Accuracy)</text>
      <text x="552" y="85" font-size="10.1" fill="#334155">Audits rows, Excel formulas &amp; policy constraints</text>
      <text x="552" y="103" font-size="10.2" font-weight="700" fill="#A84A32">Leader: Fable 5.2 (66.1%) | 100% pass: ~3%</text>

      <rect x="540" y="125" width="302" height="70" rx="6" fill="#FAF5EE" stroke="#E5D4BE"/>
      <text x="552" y="144" font-size="10.5" font-weight="700" fill="#8C6239">Track B | Analytical + Presentation Elo</text>
      <text x="552" y="163" font-size="10.1" fill="#334155">Blind pairwise battles ranked via Crowd-BT MLE</text>
      <text x="552" y="181" font-size="10.2" font-weight="700" fill="#8C6239">Leader: Opus 5.5 / Sonnet 5.5 (1800+ Elo)</text>

      <!-- Bottom Insight Strip -->
      <rect x="6" y="220" width="848" height="66" rx="7" fill="#FDF3F0" stroke="#EACBC2"/>
      <text x="18" y="240" font-size="10.9" font-weight="700" fill="#A84A32">Key Findings: Divergent Leaders + Reliability Cliff + 800x Cost Spread</text>
      <text x="18" y="259" font-size="10.1" fill="#5C281A">- Error split: weak models miss whole files; top models miss subtle cross-doc conflicts (31/91 tasks failed by all models).</text>
      <text x="18" y="276" font-size="10.1" fill="#5C281A">- Cost spread: heavy search spans &gt;800x per task (deep reasoning &gt;$30/task); read accuracy, Elo &amp; cost together.</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4E. PART 2.3 DIAGRAM 3 | RLI UPWORK LOOP & 4 PUBLISHED FAILURE MODES
     ------------------------------------------------------------------------ */
  function renderDiagramRLI() {
    const host = $("#diagram-rli-anatomy");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 300" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="rli-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#334155"/></marker>
      </defs>

      <!-- Top Row: Real Economic Workflow -->
      <rect x="6" y="8" width="252" height="110" rx="8" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <text x="18" y="30" font-size="11.4" font-weight="700" fill="#1F4E79">1. Upwork Procurement</text>
      <text x="18" y="51" font-size="10.4" fill="#334155">- $144K for 240 paid client jobs</text>
      <text x="18" y="69" font-size="10.4" fill="#334155">- 23 domains (CAD/3D/Web/AV)</text>
      <text x="18" y="87" font-size="10.4" fill="#334155">- Median 11.5h / $200 (mean &gt;$600)</text>
      <text x="18" y="106" font-size="9.9" fill="#64748B">Bundle: raw brief + assets + human work</text>

      <line x1="258" y1="63" x2="284" y2="63" stroke="#334155" stroke-width="1.8" marker-end="url(#rli-arr)"/>

      <rect x="290" y="8" width="246" height="110" rx="8" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.3"/>
      <text x="302" y="30" font-size="11.4" font-weight="700" fill="#2D6A5B">2. Single-Brief Execution</text>
      <text x="302" y="51" font-size="10.4" fill="#334155">- Filtered out multi-meeting jobs</text>
      <text x="302" y="69" font-size="10.4" fill="#334155">- 10 public + 230 private in VMs</text>
      <text x="302" y="87" font-size="10.4" fill="#334155">- Zero human help, capped budget</text>
      <text x="302" y="106" font-size="9.9" fill="#64748B">Real design, video, CAD &amp; dev suites</text>

      <line x1="536" y1="63" x2="562" y2="63" stroke="#334155" stroke-width="1.8" marker-end="url(#rli-arr)"/>

      <rect x="568" y="8" width="286" height="110" rx="8" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3"/>
      <text x="580" y="30" font-size="11.4" font-weight="700" fill="#A84A32">3. Expert Binary Payout</text>
      <text x="580" y="50" font-size="10.3" fill="#334155">Vs human deliverable: 1 iff worth paying</text>
      <rect x="580" y="62" width="108" height="24" rx="4" fill="#2D6A5B"/>
      <text x="634" y="78" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFFFFF">41.3% Paid</text>
      <rect x="692" y="62" width="150" height="24" rx="4" fill="#A84A32"/>
      <text x="767" y="78" text-anchor="middle" font-size="10.4" font-weight="700" fill="#FFFFFF">58.7% Rejected</text>
      <text x="580" y="106" font-size="9.9" fill="#64748B">2.5% -> 41.3% in 1 yr; any flaw -> 0%</text>

      <!-- Bottom Row: Published Failure Mode Taxonomy from RLI Paper -->
      <rect x="6" y="132" width="848" height="160" rx="8" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="154" font-size="11" font-weight="700" fill="#111827">RLI Paper Rejection Taxonomy (Overlapping): Most Failures Happen in Last-Mile Delivery QA</text>

      <text x="18" y="181" font-size="10.6" font-weight="700" fill="#A84A32">Poor / Amateur Quality</text>
      <rect x="194" y="168" width="236" height="18" rx="4" fill="#A84A32"/>
      <text x="438" y="181" font-size="10.8" font-weight="700" fill="#A84A32">45.6%</text>
      <text x="498" y="181" font-size="10.1" fill="#475569">Floorplans violate drafts, crude UI, robotic voiceovers</text>

      <text x="18" y="210" font-size="10.6" font-weight="700" fill="#C46B48">Incomplete / Cut Short</text>
      <rect x="194" y="197" width="185" height="18" rx="4" fill="#C46B48"/>
      <text x="387" y="210" font-size="10.8" font-weight="700" fill="#C46B48">35.7%</text>
      <text x="498" y="210" font-size="10.1" fill="#475569">Missed brief items, missing source layers, cut renders</text>

      <text x="18" y="239" font-size="10.6" font-weight="700" fill="#8C6239">Corrupt / Broken Files</text>
      <rect x="194" y="226" width="91" height="18" rx="4" fill="#8C6239"/>
      <text x="293" y="239" font-size="10.8" font-weight="700" fill="#8C6239">17.6%</text>
      <text x="498" y="239" font-size="10.1" fill="#475569">0-byte exports, empty folders, broken zips or scripts</text>

      <text x="18" y="268" font-size="10.6" font-weight="700" fill="#1F4E79">Cross-File Inconsistency</text>
      <rect x="194" y="255" width="77" height="18" rx="4" fill="#1F4E79"/>
      <text x="279" y="268" font-size="10.8" font-weight="700" fill="#1F4E79">14.8%</text>
      <text x="498" y="268" font-size="10.1" fill="#475569">Report figures clash w/ sheets; broken CSS/3D links</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4F. PART 2.4 DIAGRAM | OSWORLD 2.1 CROSS-APP DAG & 93% ONE-WAY CLIFF
     ------------------------------------------------------------------------ */
  function renderDiagramOSWorldDAG() {
    const host = $("#diagram-osworld-dag");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 288" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="os-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#475569"/></marker>
      </defs>

      <!-- Header context strip -->
      <rect x="6" y="8" width="848" height="30" rx="5" fill="#F0F5FA" stroke="#BDD4E7"/>
      <text x="430" y="27" text-anchor="middle" font-size="10.4" font-weight="650" fill="#1F4E79">82 Offline Long-Horizon Tasks: Median 1.6h (48x v1.0) | 2.44 Apps | 250–318+ Steps | Native OS State Verifiers</text>

      <!-- Example Workflow 1: Finance Report -->
      <text x="10" y="59" font-size="10.5" font-weight="700" fill="#111827">Workflow A | Monthly Finance Report (3 Apps)</text>
      <rect x="6" y="66" width="154" height="46" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="83" y="85" text-anchor="middle" font-size="10.2" font-weight="650" fill="#1F4E79">Local Dirty ERP DB</text>
      <text x="83" y="101" text-anchor="middle" font-size="9.4" fill="#64748B">Export noisy raw ledger</text>
      <line x1="160" y1="89" x2="180" y2="89" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="186" y="66" width="176" height="46" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="274" y="85" text-anchor="middle" font-size="10.2" font-weight="650" fill="#1F4E79">LibreOffice Calc</text>
      <text x="274" y="101" text-anchor="middle" font-size="9.4" fill="#64748B">Clean rows + dynamic formulas</text>
      <line x1="362" y1="89" x2="382" y2="89" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="388" y="66" width="144" height="46" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="460" y="85" text-anchor="middle" font-size="10.2" font-weight="650" fill="#1F4E79">Writer Report</text>
      <text x="460" y="101" text-anchor="middle" font-size="9.4" fill="#64748B">Embed charts &amp; Ctrl+S</text>
      <line x1="532" y1="89" x2="554" y2="89" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="560" y="66" width="294" height="46" rx="5" fill="#EDF6F4" stroke="#2D6A5B"/>
      <text x="572" y="85" font-size="10.2" font-weight="700" fill="#2D6A5B">Python State Verifier (10–15 DAG Nodes)</text>
      <text x="572" y="101" font-size="9.6" fill="#1E4D42">Audits SQL &amp; formula AST; static values -> 0%</text>

      <!-- Example Workflow 2: Design to Frontend -->
      <text x="10" y="133" font-size="10.5" font-weight="700" fill="#111827">Workflow B | Asset Edit to Web Deploy (3 Apps)</text>
      <rect x="6" y="140" width="154" height="46" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="83" y="159" text-anchor="middle" font-size="10" font-weight="650" fill="#8C6239">GIMP Multi-Layer .xcf</text>
      <text x="83" y="175" text-anchor="middle" font-size="9.4" fill="#64748B">Cutout w/ alpha -> PNG</text>
      <line x1="160" y1="163" x2="180" y2="163" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="186" y="140" width="176" height="46" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="274" y="159" text-anchor="middle" font-size="10.2" font-weight="650" fill="#8C6239">VS Code Frontend</text>
      <text x="274" y="175" text-anchor="middle" font-size="9.4" fill="#64748B">Update CSS &amp; asset paths</text>
      <line x1="362" y1="163" x2="382" y2="163" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="388" y="140" width="144" height="46" rx="5" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="460" y="159" text-anchor="middle" font-size="10.2" font-weight="650" fill="#8C6239">Local Web Server</text>
      <text x="460" y="175" text-anchor="middle" font-size="9.4" fill="#64748B">Restart &amp; verify render</text>
      <line x1="532" y1="163" x2="554" y2="163" stroke="#475569" stroke-width="1.5" marker-end="url(#os-arr)"/>

      <rect x="560" y="140" width="294" height="46" rx="5" fill="#EDF6F4" stroke="#2D6A5B"/>
      <text x="572" y="159" font-size="10.2" font-weight="700" fill="#2D6A5B">Python State Verifier (Zero Visual Judge)</text>
      <text x="572" y="175" font-size="9.6" fill="#1E4D42">Pixel-checks PNG alpha + live rendered DOM</text>

      <!-- Bottom Strip: 93% Forward vs <7% Verify + Partial/Strict Cliff -->
      <rect x="6" y="200" width="848" height="80" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="220" font-size="10.5" font-weight="700" fill="#111827">XLang Trajectory Action Audit: Why High Step Scores Drop 34.7 pts Under Strict All-Pass</text>
      <rect x="18" y="228" width="746" height="24" rx="4" fill="#1F4E79"/>
      <text x="391" y="244" text-anchor="middle" font-size="10" font-weight="650" fill="#FFFFFF">&gt;93% Forward Execution Steps (No back-checking; single cross-app slip snowballs downstream)</text>
      <rect x="768" y="228" width="74" height="24" rx="4" fill="#A84A32"/>
      <text x="805" y="244" text-anchor="middle" font-size="9.8" font-weight="700" fill="#FFFFFF">&lt;7% Verify</text>
      <text x="18" y="269" font-size="9.9" fill="#475569">Result: Offline Partial hits <tspan font-weight="700" fill="#1F4E79">89.3%</tspan>, while Strict 10–15 DAG All-Pass drops to <tspan font-weight="700" fill="#A84A32">54.6% (-34.7 pt)</tspan>; top killers: missed Ctrl+S or server restart.</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     4G. PART 2.5 DIAGRAM | TURN-BASED VS REALTIME PHYSICS CLOCK TIMING
     ------------------------------------------------------------------------ */
  function renderDiagramRealtimeClock() {
    const host = $("#diagram-realtime-clock");
    if (!host) return;
    const svg = `<svg viewBox="0 0 860 284" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="rt-arr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#1F4E79"/></marker>
        <marker id="rt-arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#A84A32"/></marker>
      </defs>

      <!-- Track A: Turn-based Step-blocking -->
      <rect x="6" y="8" width="848" height="80" rx="7" fill="#F0F5FA" stroke="#BDD4E7"/>
      <text x="18" y="27" font-size="10.8" font-weight="700" fill="#1F4E79">Mode A | Turn-Based Step-Blocking (Isaac Sim Default)</text>
      <text x="842" y="27" text-anchor="end" font-size="10" font-weight="600" fill="#1F4E79">Tests static spatial planning; skips inference latency</text>

      <rect x="18" y="39" width="150" height="40" rx="5" fill="#FFFFFF" stroke="#93B4D1"/>
      <text x="93" y="56" text-anchor="middle" font-size="10" font-weight="700" fill="#111827">t = 0s: 3-Cam Frame</text>
      <text x="93" y="71" text-anchor="middle" font-size="9.3" fill="#475569">Cup begins tipping right</text>
      <line x1="168" y1="59" x2="188" y2="59" stroke="#1F4E79" stroke-width="1.6" marker-end="url(#rt-arr-b)"/>

      <rect x="194" y="39" width="388" height="40" rx="5" fill="#E0EDF8" stroke="#1F4E79" stroke-dasharray="4,3"/>
      <text x="388" y="56" text-anchor="middle" font-size="10.2" font-weight="700" fill="#1F4E79">[Clock Frozen 10–18s] Gravity pauses; cup hovers mid-air</text>
      <text x="388" y="71" text-anchor="middle" font-size="9.4" fill="#334155">Model runs full CoT to compute 6-DoF pose &amp; gripper state</text>
      <line x1="582" y1="59" x2="602" y2="59" stroke="#1F4E79" stroke-width="1.6" marker-end="url(#rt-arr-b)"/>

      <rect x="608" y="39" width="234" height="40" rx="5" fill="#EDF6F4" stroke="#2D6A5B"/>
      <text x="725" y="56" text-anchor="middle" font-size="10.2" font-weight="700" fill="#2D6A5B">Send Pose -> Clean Catch</text>
      <text x="725" y="71" text-anchor="middle" font-size="9.3" fill="#1E4D42">Peak: GPT-6 Astra 34.0% / Open 9.0%</text>

      <!-- Track B: Realtime Continuous Physics Clock -->
      <rect x="6" y="99" width="848" height="82" rx="7" fill="#FDF3F0" stroke="#EACBC2"/>
      <text x="18" y="118" font-size="10.8" font-weight="700" fill="#A84A32">Mode B | Realtime Continuous Physics Clock (First Exam Unpaused)</text>
      <text x="842" y="118" text-anchor="end" font-size="10" font-weight="600" fill="#A84A32">0.1 Hz slow thinking vs 10–50 Hz physics</text>

      <rect x="18" y="130" width="150" height="41" rx="5" fill="#FFFFFF" stroke="#E2B9AC"/>
      <text x="93" y="147" text-anchor="middle" font-size="10" font-weight="700" fill="#111827">t = 0s: 3-Cam Frame</text>
      <text x="93" y="162" text-anchor="middle" font-size="9.3" fill="#475569">Cup tips; clock runs live</text>
      <line x1="168" y1="150" x2="188" y2="150" stroke="#A84A32" stroke-width="1.6" marker-end="url(#rt-arr-r)"/>

      <rect x="194" y="130" width="186" height="41" rx="5" fill="#FCE7E1" stroke="#A84A32"/>
      <text x="287" y="147" text-anchor="middle" font-size="10.2" font-weight="700" fill="#A84A32">t = 0.4s: Cup Hits Table</text>
      <text x="287" y="162" text-anchor="middle" font-size="9.3" fill="#7A2E1B">LLM CoT has barely started</text>
      <line x1="380" y1="150" x2="400" y2="150" stroke="#A84A32" stroke-width="1.6" marker-end="url(#rt-arr-r)"/>

      <rect x="406" y="130" width="176" height="41" rx="5" fill="#FCE7E1" stroke="#A84A32"/>
      <text x="494" y="147" text-anchor="middle" font-size="10.2" font-weight="700" fill="#A84A32">t = 1.2s: Out of Reach</text>
      <text x="494" y="162" text-anchor="middle" font-size="9.3" fill="#7A2E1B">World state irreversibly lost</text>
      <line x1="582" y1="150" x2="602" y2="150" stroke="#A84A32" stroke-width="1.6" marker-end="url(#rt-arr-r)"/>

      <rect x="608" y="130" width="234" height="41" rx="5" fill="#A84A32"/>
      <text x="725" y="147" text-anchor="middle" font-size="10.2" font-weight="700" fill="#FFFFFF">t = 10–18s: Action Arrives</text>
      <text x="725" y="162" text-anchor="middle" font-size="9.4" fill="#FDE8E1">Total miss! 63.0% scored 0% across all 3</text>

      <!-- Bottom Summary Strip: First Exam 456 Outcomes + RoboDojo 4-Metric Reality Check -->
      <rect x="6" y="195" width="500" height="80" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="18" y="214" font-size="10.4" font-weight="700" fill="#111827">First Exam 456 Core Tasks (35 Sims) Under Realtime Clock</text>
      <rect x="18" y="224" width="298" height="24" rx="4" fill="#A84A32"/>
      <text x="167" y="240" text-anchor="middle" font-size="10.1" font-weight="700" fill="#FFFFFF">63.0% All-Zero (287 / 456 Tasks)</text>
      <rect x="320" y="224" width="174" height="24" rx="4" fill="#2D6A5B"/>
      <text x="407" y="240" text-anchor="middle" font-size="10" font-weight="650" fill="#FFFFFF">37.0% Static Non-Zero</text>
      <text x="18" y="265" font-size="9.4" fill="#64748B">Verdict: 0.1 Hz slow CoT cannot drive arms directly; needs fast low-level policy.</text>

      <rect x="518" y="195" width="336" height="80" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
      <text x="530" y="214" font-size="10.4" font-weight="700" fill="#111827">RoboDojo 4-Metric Reality Check (No Mixing)</text>
      <text x="530" y="233" font-size="9.8" fill="#334155">- Private plugin + paused sim (Fable 5.2): <tspan font-weight="700" fill="#A84A32">64.9%‡</tspan></text>
      <text x="530" y="249" font-size="9.8" fill="#334155">- Compliant sim peak (post Nov 14 audit): <tspan font-weight="700" fill="#1F4E79">56.4%</tspan></text>
      <text x="530" y="265" font-size="9.8" fill="#334155">- RealEval robot peak: <tspan font-weight="700" fill="#2D6A5B">33.9%</tspan> (0 of 3 labs submitted)</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     6. DIAGRAM 1 | HARBOR DUAL-CONTAINER + 0700 + RED-TEAM ARCHITECTURE (Part 3)
     ------------------------------------------------------------------------ */
  function renderDiagramHarbor() {
    const host = $("#diagram-harbor");
    if (!host) return;
    const svg = `<svg viewBox="0 0 880 284" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="hb-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#333333"/></marker>
      </defs>

      <!-- Step 1: Blue Zone -->
      <rect x="8" y="14" width="222" height="194" rx="6" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.3"/>
      <rect x="8" y="14" width="222" height="28" rx="6" fill="#1F4E79"/>
      <text x="119" y="32" text-anchor="middle" font-size="11.2" font-weight="600" fill="#FFFFFF">Step 1 | Blue Execution Box</text>
      <text x="20" y="59" font-size="10.6" font-weight="650" fill="#1A1A1A">Visible to Agent:</text>
      <text x="20" y="77" font-size="10.2" font-family="var(--font-mono)" fill="#1F4E79">|- instruction.md</text>
      <text x="20" y="93" font-size="10.2" font-family="var(--font-mono)" fill="#1F4E79">|- task.toml (timeout/GPU)</text>
      <text x="20" y="109" font-size="10.2" font-family="var(--font-mono)" fill="#1F4E79">|- environment/Dockerfile</text>
      <line x1="20" y1="123" x2="218" y2="123" stroke="#CBD5E1"/>
      <text x="20" y="141" font-size="10.2" fill="#333333">- solution/ &amp; tests/ stripped</text>
      <text x="20" y="159" font-size="10.2" fill="#333333">- Offline or domain allowlist</text>
      <text x="20" y="177" font-size="10.2" fill="#333333">- submit saves safety snapshot</text>
      <text x="20" y="194" font-size="9.8" fill="#666666">(Blocks web lookup &amp; repo copies)</text>

      <line x1="230" y1="111" x2="256" y2="111" stroke="#333333" stroke-width="1.6" marker-end="url(#hb-arr)"/>

      <!-- Step 2: Air-gap -->
      <rect x="262" y="38" width="136" height="146" rx="6" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3" stroke-dasharray="4,3"/>
      <text x="330" y="61" text-anchor="middle" font-size="11" font-weight="700" fill="#A84A32">Step 2 | Teardown</text>
      <text x="330" y="83" text-anchor="middle" font-size="10.2" fill="#333333">Kill exec container</text>
      <text x="330" y="101" text-anchor="middle" font-size="10.1" font-weight="600" fill="#A84A32">Wipe /tmp &amp; daemons</text>
      <line x1="276" y1="118" x2="384" y2="118" stroke="#EACBC2"/>
      <text x="330" y="138" text-anchor="middle" font-size="10.1" fill="#333333">Export clean workspace</text>
      <text x="330" y="156" text-anchor="middle" font-size="9.8" fill="#666666">Archive -> $0 re-eval</text>

      <line x1="398" y1="111" x2="424" y2="111" stroke="#333333" stroke-width="1.6" marker-end="url(#hb-arr)"/>

      <!-- Step 3: Red Zone -->
      <rect x="430" y="14" width="228" height="194" rx="6" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.3"/>
      <rect x="430" y="14" width="228" height="28" rx="6" fill="#8C6239"/>
      <text x="544" y="32" text-anchor="middle" font-size="11.2" font-weight="600" fill="#FFFFFF">Step 3 | Red Verifier Box</text>
      <text x="442" y="59" font-size="10.6" font-weight="650" fill="#1A1A1A">Mounted Post-Submission:</text>
      <text x="442" y="77" font-size="10.1" font-family="var(--font-mono)" fill="#A84A32">|- /root/tests/ (chmod 0700)</text>
      <text x="442" y="93" font-size="10.1" font-family="var(--font-mono)" fill="#A84A32">|- solution/solve.sh (5/5 OK)</text>
      <line x1="442" y1="108" x2="646" y2="108" stroke="#E5D4BE"/>
      <text x="442" y="126" font-size="10.2" fill="#333333">- Drop privileges to agent user</text>
      <text x="442" y="144" font-size="10.2" fill="#333333">- Block host root socket reads</text>
      <text x="442" y="162" font-size="10.2" fill="#333333">- Salt inputs &amp; rename files</text>
      <text x="442" y="180" font-size="10.2" fill="#333333">- 2-way checks: target + side-fx</text>
      <text x="442" y="196" font-size="9.8" fill="#666666">(Stops 161KB lookup &amp; pytest edits)</text>

      <line x1="658" y1="111" x2="684" y2="111" stroke="#333333" stroke-width="1.6" marker-end="url(#hb-arr)"/>

      <!-- Step 4: Trace Audit -->
      <rect x="690" y="14" width="182" height="194" rx="6" fill="#F8F9FA" stroke="#1A1A1A" stroke-width="1.3"/>
      <rect x="690" y="14" width="182" height="28" rx="6" fill="#1A1A1A"/>
      <text x="781" y="32" text-anchor="middle" font-size="11.2" font-weight="600" fill="#FFFFFF">Step 4 | Trace Audit</text>
      <text x="702" y="63" font-size="10.2" fill="#333333">- Auto-scanner audits all</text>
      <text x="710" y="79" font-size="10.2" fill="#333333">exec logs &amp; trajectories</text>
      <text x="702" y="101" font-size="10.2" fill="#333333">- Flags .gold replays, PR</text>
      <text x="710" y="117" font-size="10.2" fill="#333333">lookups &amp; weight pulls</text>
      <rect x="702" y="142" width="158" height="46" rx="4" fill="#EDF6F4" stroke="#2D6A5B"/>
      <text x="781" y="162" text-anchor="middle" font-size="10.8" font-weight="650" fill="#2D6A5B">Trusted Score</text>
      <text x="781" y="178" text-anchor="middle" font-size="10.1" fill="#2D6A5B">&amp; Clean RL Reward</text>

      <!-- Bottom Pre-Launch Gate -->
      <rect x="8" y="222" width="864" height="50" rx="5" fill="#F8F9FA" stroke="#D1D5DB"/>
      <text x="22" y="242" font-size="10.6" font-weight="650" fill="#A84A32">Pre-Launch Gate | Red-Team Cheat Trials (Standard in TB 3.0+ &amp; FC 2.0):</text>
      <text x="22" y="260" font-size="10.3" fill="#333333">Before release, adversarial agents actively probe every task for exploits; breached tasks are patched before entering evals or RL training.</text>
    </svg>`;
    host.innerHTML = svg;
  }

  /* ------------------------------------------------------------------------
     7. DIAGRAM 2 | MODEL x HARNESS x ENVIRONMENT CO-EVOLUTION
     ------------------------------------------------------------------------ */
  function renderDiagramCoevolution() {
    const host = $("#diagram-coevolution");
    if (!host) return;
    const svg = `<svg viewBox="0 0 880 292" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">
      <defs>
        <marker id="co-arr-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#1F4E79"/></marker>
        <marker id="co-arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#2D6A5B"/></marker>
        <marker id="co-arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L9,5 L0,9 z" fill="#A84A32"/></marker>
      </defs>

      <!-- Top External Driver: Real Demand -->
      <rect x="150" y="10" width="580" height="48" rx="6" fill="#FDF3F0" stroke="#A84A32" stroke-width="1.3"/>
      <text x="440" y="29" text-anchor="middle" font-size="11.2" font-weight="700" fill="#A84A32">1. Root Driver: Encode Real R&amp;D &amp; Business Demand into Environments</text>
      <text x="440" y="47" text-anchor="middle" font-size="10.3" fill="#5C281A">Saturation is only a lagging alarm; live workflows drive continuous environment renewal</text>

      <line x1="440" y1="58" x2="440" y2="88" stroke="#A84A32" stroke-width="1.8" marker-end="url(#co-arr-r)"/>

      <!-- Center Top: Environment -->
      <rect x="240" y="94" width="400" height="68" rx="6" fill="#EDF6F4" stroke="#2D6A5B" stroke-width="1.5"/>
      <text x="440" y="116" text-anchor="middle" font-size="12.2" font-weight="700" fill="#2D6A5B">Environment | Verifiable Anti-Cheat Sandbox</text>
      <text x="440" y="136" text-anchor="middle" font-size="10.4" fill="#333333">Dirty workflows + Harbor isolation + 2-way / wet-lab checks</text>
      <text x="440" y="152" text-anchor="middle" font-size="10" fill="#666666">Dual role: External Benchmark &amp; Internal Long-Horizon RL Gym</text>

      <!-- Bottom Left: Model -->
      <rect x="24" y="202" width="282" height="76" rx="6" fill="#F0F5FA" stroke="#1F4E79" stroke-width="1.4"/>
      <text x="165" y="224" text-anchor="middle" font-size="12" font-weight="700" fill="#1F4E79">Model | Weight Iteration</text>
      <text x="165" y="244" text-anchor="middle" font-size="10.3" fill="#333333">Clean RL rewards teach scope control,</text>
      <text x="165" y="260" text-anchor="middle" font-size="10.3" fill="#333333">self-testing &amp; rollbacks (FireFlash +10.4 pt)</text>

      <!-- Bottom Right: Harness -->
      <rect x="574" y="202" width="282" height="76" rx="6" fill="#FAF5EE" stroke="#8C6239" stroke-width="1.4"/>
      <text x="715" y="224" text-anchor="middle" font-size="12" font-weight="700" fill="#8C6239">Harness | Execution Iteration</text>
      <text x="715" y="244" text-anchor="middle" font-size="10.3" fill="#333333">Failure traces upgrade tools, context</text>
      <text x="715" y="260" text-anchor="middle" font-size="10.3" fill="#333333">compaction &amp; snapshots (+4.4 pt locked)</text>

      <!-- Arrows: Env -> Model, Env -> Harness -->
      <path d="M 240,128 L 165,128 L 165,196" fill="none" stroke="#2D6A5B" stroke-width="1.8" marker-end="url(#co-arr-g)"/>
      <rect x="52" y="138" width="176" height="22" rx="4" fill="#FFFFFF" stroke="#C3DFD8"/>
      <text x="140" y="153" text-anchor="middle" font-size="10.2" font-weight="600" fill="#2D6A5B">2. Clean RL Reward Signal</text>

      <path d="M 640,128 L 715,128 L 715,196" fill="none" stroke="#A84A32" stroke-width="1.8" marker-end="url(#co-arr-r)"/>
      <rect x="652" y="138" width="176" height="22" rx="4" fill="#FFFFFF" stroke="#EACBC2"/>
      <text x="740" y="153" text-anchor="middle" font-size="10.2" font-weight="600" fill="#A84A32">3. Failure Trace Feedback</text>

      <!-- Bidirectional Model <-> Harness -->
      <line x1="312" y1="228" x2="568" y2="228" stroke="#1F4E79" stroke-width="1.8" marker-end="url(#co-arr-b)"/>
      <line x1="568" y1="248" x2="312" y2="248" stroke="#1F4E79" stroke-width="1.8" marker-end="url(#co-arr-b)"/>
      <rect x="344" y="219" width="192" height="38" rx="4" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="440" y="235" text-anchor="middle" font-size="10.5" font-weight="700" fill="#1F4E79">4. Joint Co-Evolution (RSI)</text>
      <text x="440" y="250" text-anchor="middle" font-size="9.7" fill="#666666">Helps build next-gen evals &amp; R&amp;D</text>
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
          <div class="ic-k">LIVE STATS | LEAD ORGANIZATIONS (N = ${total})</div>
          <h4>Universities Build Shared Harnesses; Data Orgs &amp; Experts Build Verticals</h4>
          <div class="stack-bar">
            <div class="stack-seg" style="width:${pAcad}%;background:#1F4E79;" title="Academic Consortia ${pAcad}% (${byOrg.acad}/${total})">Academia ${pAcad}% (${byOrg.acad})</div>
            <div class="stack-seg" style="width:${pData}%;background:#A84A32;" title="Eval / Data Orgs ${pData}% (${byOrg.data}/${total})">Eval/Data ${pData}% (${byOrg.data})</div>
            <div class="stack-seg" style="width:${pLab}%;background:#2D6A5B;" title="Frontier Labs ${pLab}% (${byOrg.lab}/${total})">Labs ${pLab}%</div>
            <div class="stack-seg" style="width:${pProd}%;background:#8C6239;padding:0 3px;font-size:10.6px;" title="Product Companies ${pProd}% (${byOrg.prod}/${total})">Prod ${pProd}%</div>
          </div>
          <p>Shared sandbox infrastructure comes largely from 8–40+ university consortia (TB / OSWorld / RoboDojo / ALE); deep vertical suites are built by 1–3 core orgs backed by 20–1,000 domain practitioners.</p>
        </div>
        <div class="info-card">
          <div class="ic-k">LIVE STATS | ACCESS &amp; LEAKAGE DEFENSE (N = ${total})</div>
          <h4>${pHyb}% Hybrid Leads the Field; ${pct(privDefense)}% Keep Private Holdouts</h4>
          <div class="stack-bar">
            <div class="stack-seg" style="width:${pHyb}%;background:#8C6239;" title="Hybrid Public/Private ${pHyb}% (${byAcc.hyb}/${total})">Hybrid ${pHyb}% (${byAcc.hyb})</div>
            <div class="stack-seg" style="width:${pPriv}%;background:#A84A32;" title="Private Closed ${pPriv}% (${byAcc.priv}/${total})">Private ${pPriv}%</div>
            <div class="stack-seg" style="width:${pOpen}%;background:#2D6A5B;" title="Fully Open ${pOpen}% (${byAcc.open}/${total})">Open ${pOpen}% (${byAcc.open})</div>
          </div>
          <p>Universities are no longer purely open (UC Berkeley ALE keeps private holdouts), nor are commercial firms purely closed (Surge AI Chartography is CC BY 4.0); <strong>${pct(goldenCount)}% (${goldenCount}/${total})</strong> converge on 50–250 tasks.</p>
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
      { key: "code", label: "Code Engineering",   bg: "#F5F8FC", bar: "#1F4E79" },
      { key: "sci",  label: "Science",            bg: "#F3F8F6", bar: "#2D6A5B" },
      { key: "off",  label: "Office Workflows",   bg: "#FBF7F1", bar: "#8C6239" },
      { key: "cua",  label: "Computer-Use Agent", bg: "#F5F6F9", bar: "#4B5563" },
      { key: "phys", label: "Physical Interaction", bg: "#FCF4F1", bar: "#A84A32" }
    ];

    const W = 980, padL = 228, padR = 296, padT = 56, padB = 34, rowH = 27, groupGap = 8;
    const plotW = W - padL - padR;
    const logMin = Math.log10(10), logMax = Math.log10(1500);
    const toX = n => padL + ((Math.log10(Math.max(10, n)) - logMin) / (logMax - logMin)) * plotW;

    let totalRows = 0;
    groups.forEach(g => { totalRows += core.filter(b => b.track === g.key).length; });
    const H = padT + totalRows * rowH + (groups.length - 1) * groupGap + padB;

    const accColor = { open: "#2D6A5B", hyb: "#8C6239", priv: "#A84A32" };
    const accShort = { open: "Open", hyb: "Hybrid", priv: "Private" };
    const nOpen = core.filter(b => b.access === "open").length;
    const nHyb = core.filter(b => b.access === "hyb").length;
    const nPriv = core.filter(b => b.access === "priv").length;
    const nGold = core.filter(b => b.inGoldenZone).length;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;

    // Legend row
    const leg = [
      [`Open (${nOpen})`, "#2D6A5B", 0],
      [`Hybrid (${nHyb})`, "#8C6239", 96],
      [`Private (${nPriv})`, "#A84A32", 204]
    ];
    leg.forEach(([txt, col, dx]) => {
      const lx = padL + dx;
      svg += `<rect x="${lx}" y="8" width="10" height="10" rx="2" fill="${col}"/>`;
      svg += `<text x="${lx + 14}" y="17" font-size="10.5" font-weight="600" fill="#333333">${txt}</text>`;
    });
    svg += `<rect x="${padL + 314}" y="8" width="14" height="10" rx="2" fill="#E8F1F8" stroke="#BDD4E7"/>`;
    svg += `<text x="${padL + 333}" y="17" font-size="10.4" fill="#1F4E79">50–250 Task Band (${nGold}/${core.length})</text>`;

    // Column Headers
    svg += `<text x="12" y="42" font-size="10.6" font-weight="650" fill="#666666">Domain &amp; Independent Benchmark</text>`;
    svg += `<text x="${padL}" y="42" font-size="10.6" font-weight="650" fill="#666666">Task Count (Log Scale; Color = Access)</text>`;
    svg += `<text x="${W - padR + 18}" y="42" font-size="10.6" font-weight="650" fill="#666666">Access &amp; Team Scale</text>`;
    svg += `<line x1="8" y1="49" x2="${W - 8}" y2="49" stroke="#D1D5DB"/>`;

    // Golden zone vertical band (50-250 tasks)
    const gx1 = toX(50), gx2 = toX(250);
    const chartBottom = H - padB;
    svg += `<rect x="${gx1}" y="${padT - 2}" width="${gx2 - gx1}" height="${chartBottom - padT + 4}" fill="#E8F1F8" opacity="0.55"/>`;

    // Vertical grid ticks
    [15, 50, 100, 250, 1000].forEach(t => {
      const x = toX(t);
      svg += `<line x1="${x}" y1="${padT - 2}" x2="${x}" y2="${chartBottom + 2}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - 12}" text-anchor="middle" font-size="10" fill="#8A8A8A">${t.toLocaleString("en-US")}</text>`;
    });

    let curY = padT;
    groups.forEach(g => {
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

        svg += `<g class="ind-bench-row" data-bid="${b.id}" data-tip="<b>${b.name}</b> (${g.label})<br>Size: ${b.countStr}<br>Team: ${b.orgScale}<br>Access: ${b.accessLabel}<br>Cost: ${b.cost}" style="cursor:pointer;">`;
        svg += `<rect x="12" y="${y}" width="${W - 24}" height="${rowH}" fill="transparent"/>`;
        svg += `<text x="20" y="${cy + 3.8}" font-size="11" font-weight="600" fill="#1A1A1A">${b.name}</text>`;

        // Horizontal lollipop bar from padL to bx
        svg += `<line x1="${padL}" y1="${cy}" x2="${bx}" y2="${cy}" stroke="${col}" stroke-width="3.2" stroke-linecap="round" opacity="0.85"/>`;
        svg += `<circle cx="${bx}" cy="${cy}" r="4.8" fill="${col}" stroke="#FFFFFF" stroke-width="1.4"/>`;
        const lblX = bx + 9;
        svg += `<text x="${lblX}" y="${cy + 3.8}" font-size="10.2" font-weight="650" fill="${col}">${b.countNum.toLocaleString("en-US")}</text>`;

        // Right metadata: open/priv label + orgScale
        svg += `<text x="${W - padR + 18}" y="${cy + 3.8}" font-size="10.2" font-weight="600" fill="${col}">${accShort[b.access]}</text>`;
        svg += `<text x="${W - padR + 66}" y="${cy + 3.8}" font-size="9.8" fill="#4B5563">${b.orgScale}</text>`;
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
    const W = 980, H = 336, padL = 188, padR = 76, padT = 36, padB = 36;
    const tMin = 2023.62, tMax = 2027.02;
    const toX = t => padL + ((t - tMin) / (tMax - tMin)) * (W - padL - padR);
    const lanes = D.timelineLanes;

    let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:var(--font-sans);">`;
    const x26 = toX(2026.0);
    svg += `<rect x="${x26}" y="${padT - 6}" width="${W - padR - x26 + 26}" height="${H - padT - padB + 10}" fill="#FDF3F0" opacity="0.65"/>`;
    svg += `<text x="${(x26 + W - padR + 26) / 2}" y="${padT - 13}" text-anchor="middle" font-size="10.6" font-weight="650" fill="#A84A32">2026 Turnover &amp; Audit Window</text>`;

    [2024.0, 2024.5, 2025.0, 2025.5, 2026.0, 2026.5, 2026.92].forEach(t => {
      const x = toX(t);
      const yr = Math.floor(t), mo = Math.round((t - yr) * 12) + 1;
      const lbl = `${yr}.${String(Math.min(12, mo)).padStart(2, "0")}`;
      svg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H - padB}" stroke="#E5E7EB" stroke-dasharray="3,3"/>`;
      svg += `<text x="${x}" y="${H - 13}" text-anchor="middle" font-size="10.4" fill="#8A8A8A">${lbl}</text>`;
    });

    const laneH = (H - padT - padB) / lanes.length;
    lanes.forEach((ln, idx) => {
      const y = padT + laneH * idx + laneH / 2;
      svg += `<text x="8" y="${y - 2}" font-size="11.1" font-weight="650" fill="#1A1A1A">${ln.name}</text>`;
      svg += `<text x="8" y="${y + 12}" font-size="9.3" fill="#8A8A8A">${ln.sub}</text>`;
      const firstX = toX(ln.nodes[0].t), lastX = toX(ln.nodes[ln.nodes.length - 1].t);
      svg += `<line x1="${firstX}" y1="${y}" x2="${lastX}" y2="${y}" stroke="#D1D5DB" stroke-width="2.4" stroke-linecap="round"/>`;
      ln.nodes.forEach((nd, ni) => {
        const x = toX(nd.t);
        let dx = 0, yOff = (ni % 2 === 0) ? -13 : 20;
        if (nd.lbl.includes("RoboDojo")) { dx = -36; yOff = -13; }
        if (nd.lbl.includes("ASB")) { dx = -40; yOff = 20; }
        if (nd.lbl.includes("First Exam")) { dx = 24; yOff = -13; }
        if (nd.lbl.includes("TwinLab")) { dx = 38; yOff = 20; }
        svg += `<g class="tl-pt" data-tip="<b>${nd.lbl}</b><br>${nd.tip}" style="cursor:pointer;">`;
        svg += `<circle cx="${x}" cy="${y}" r="5.5" fill="${nd.col}" stroke="#FFFFFF" stroke-width="1.8"/>`;
        svg += `<text x="${x + dx}" y="${y + yOff}" text-anchor="middle" font-size="9.7" font-weight="600" fill="${nd.col}">${nd.lbl}</text>`;
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
      const idx = raw.indexOf(":");
      const cls = idx > -1 ? raw.slice(0, idx) : "";
      const txt = idx > -1 ? raw.slice(idx + 1) : raw;
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

  const evLabel = { code: "Code / Exact", rubric: "Rubric / Checklist", human: "Human QA", phys: "Sim / Wet Lab" };
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
          ? String(va).localeCompare(String(vb), "en-US")
          : String(vb).localeCompare(String(va), "en-US");
      });
    }

    const lbl = $("#row-count-label");
    if (lbl) lbl.textContent = `Showing ${list.length} ${list.length === 1 ? "benchmark" : "benchmarks"} (click any row for full dossier)`;

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
          <div style="font-size:12.4px;color:var(--muted);margin-top:4px;">Size: ${b.countStr} | Evolution: ${b.evolution}</div>
        </div>
        <button class="close-btn" id="drawer-close-btn" aria-label="Close">×</button>
      </div>
      <div class="d-section">
        <h4>01 | Target Capability &amp; Demand</h4>
        <p><b>Core Capability:</b> ${b.capability}</p>
        <p style="margin-top:6px;"><b>Task Source:</b> ${b.source}</p>
        <p style="margin-top:6px;"><b>Curation &amp; Filtering:</b> ${b.funnel}</p>
      </div>
      <div class="d-section">
        <h4>02 | Verification &amp; Anti-Cheat Defense</h4>
        <p><b>Scoring Logic:</b> ${b.verifier}</p>
        <p style="margin-top:6px;"><b>Anti-Cheat Isolation:</b> ${b.detail.anticheat}</p>
      </div>
      <div class="d-section">
        <h4>03 | Representative Cases &amp; Findings</h4>
        <ul>${b.detail.cases.map(c => `<li>${c}</li>`).join("")}</ul>
      </div>
      <div class="d-section">
        <h4>04 | Top Readings, Cost &amp; Industry Adoption</h4>
        <p><b>Measured Readings:</b> ${b.score}</p>
        <p style="margin-top:6px;"><b>Cost Barrier:</b> ${b.cost}</p>
        <p style="margin-top:6px;"><b>Industry Adoption:</b> ${b.detail.adoption}</p>
        ${b.url ? `<p style="margin-top:9px;"><a href="${b.url}" target="_blank" rel="noopener">View primary source or paper -></a></p>` : ""}
      </div>
      <div class="d-lesson">
        <div style="font-size:11.6px;font-weight:650;color:var(--muted);margin-bottom:4px;">Key Engineering Takeaway</div>
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
      a.setAttribute("aria-label", "Link to this section");
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
