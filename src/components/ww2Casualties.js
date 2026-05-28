import * as d3 from "npm:d3";

const CSS = `
.ww2-app { --paper:#f3efe6; --paper-edge:#e9e3d6; --ink:#211c17; --ink-soft:#5c5346;
  --rule:#d7cfbf; --oxblood:#7c2128; --steel:#59707a;
  background: radial-gradient(120% 70% at 50% -8%, #f7f4ec 0%, var(--paper) 55%, var(--paper-edge) 100%);
  color: var(--ink); font-family: "IBM Plex Sans", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased; padding: 30px clamp(14px,3vw,40px) 50px; border-radius: 4px; }
.ww2-app * { box-sizing: border-box; }
.ww2-app .wrap { max-width: 1020px; margin: 0 auto; }
.ww2-app .eyebrow { font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--oxblood); font-weight:600; margin:0 0 10px; }
.ww2-app h1 { font-family:"Spectral",serif; font-weight:800; font-size:clamp(28px,4.6vw,48px); line-height:1.03; margin:0 0 12px; letter-spacing:-.01em; }
.ww2-app .dek { font-family:"Spectral",serif; font-size:clamp(15px,2vw,19px); font-style:italic; color:var(--ink-soft); max-width:62ch; margin:0 0 24px; line-height:1.45; }
.ww2-app .section-head { font-family:"Spectral",serif; font-weight:600; font-size:19px; margin:24px 0 2px; }
.ww2-app .section-sub { font-size:13px; color:var(--ink-soft); margin:0 0 12px; line-height:1.5; }
.ww2-app .panel { border-top:1px solid var(--rule); padding-top:16px; }
.ww2-app .controls { display:flex; flex-wrap:wrap; align-items:flex-end; gap:20px 30px; padding:14px 0; }
.ww2-app .ctl-label { font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-soft); margin-bottom:9px; font-weight:600; }
.ww2-app .segmented { display:inline-flex; flex-wrap:wrap; gap:4px; }
.ww2-app .seg { font:inherit; font-size:13px; font-weight:500; border:1px solid var(--rule); background:transparent; color:var(--ink-soft); padding:7px 13px; border-radius:2px; cursor:pointer; transition:background .18s,color .18s,border-color .18s; }
.ww2-app .seg:hover { border-color:var(--ink-soft); color:var(--ink); }
.ww2-app .seg.active { background:var(--ink); color:var(--paper); border-color:var(--ink); }
.ww2-app .slider-group { min-width:210px; }
.ww2-app .slider-row { display:flex; align-items:center; gap:12px; }
.ww2-app input[type=range] { -webkit-appearance:none; appearance:none; height:3px; width:160px; background:var(--rule); border-radius:2px; outline:none; }
.ww2-app input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:15px; height:15px; border-radius:50%; background:var(--oxblood); cursor:pointer; border:2px solid var(--paper); box-shadow:0 0 0 1px var(--oxblood); }
.ww2-app input[type=range]::-moz-range-thumb { width:15px; height:15px; border-radius:50%; background:var(--oxblood); cursor:pointer; border:2px solid var(--paper); box-shadow:0 0 0 1px var(--oxblood); }
.ww2-app .slider-val { font-size:13px; font-variant-numeric:tabular-nums; min-width:88px; }
.ww2-app .legend { display:flex; align-items:center; gap:9px; }
.ww2-app .legend-bar { width:118px; height:9px; border-radius:2px; background:linear-gradient(90deg,var(--steel),#9a6a4a,var(--oxblood)); }
.ww2-app .legend-cap { font-size:11px; color:var(--ink-soft); }
.ww2-app .hint { font-size:12px; color:var(--ink-soft); font-style:italic; }
.ww2-app .clear-btn { font:inherit; font-size:12px; border:1px solid var(--rule); background:transparent; color:var(--ink-soft); padding:6px 11px; border-radius:2px; cursor:pointer; opacity:0; pointer-events:none; transition:opacity .2s; }
.ww2-app .clear-btn.show { opacity:1; pointer-events:auto; }
.ww2-app .clear-btn:hover { border-color:var(--ink-soft); color:var(--ink); }
.ww2-app .measure-note { font-family:"Spectral",serif; font-style:italic; color:var(--ink-soft); font-size:15px; margin:14px 2px 4px; min-height:22px; line-height:1.4; }
.ww2-app .count-note { font-size:12px; color:var(--ink-soft); margin:0 2px 14px; font-variant-numeric:tabular-nums; }
.ww2-app svg { display:block; width:100%; overflow:visible; font-family:"IBM Plex Sans",system-ui,sans-serif; }
.ww2-app .row-label { font-size:12.5px; fill:var(--ink); }
.ww2-app .val-label { font-size:11.5px; fill:var(--ink-soft); font-variant-numeric:tabular-nums; }
.ww2-app .grid line { stroke:var(--rule); stroke-dasharray:2 3; }
.ww2-app .axis text { fill:var(--ink-soft); font-size:11px; font-variant-numeric:tabular-nums; }
.ww2-app .axis .domain { stroke:var(--rule); }
.ww2-app .axis-title { fill:var(--ink-soft); font-size:11.5px; letter-spacing:.04em; }
.ww2-app .quad { fill:var(--ink-soft); opacity:.5; font-size:11px; font-style:italic; }
.ww2-app .anno { fill:var(--ink); font-size:11.5px; font-weight:500; pointer-events:none; }
.ww2-app .dot { cursor:pointer; stroke:var(--paper); stroke-width:1; transition:stroke .15s; }
.ww2-app .bar { cursor:pointer; }
.ww2-app .ghost { fill:var(--ink); }
.ww2-app footer { margin-top:30px; padding-top:14px; border-top:1px solid var(--rule); font-size:12px; color:var(--ink-soft); line-height:1.5; }
.ww2-app .tip { position:fixed; pointer-events:none; opacity:0; z-index:50; background:var(--ink); color:var(--paper); padding:11px 13px; border-radius:3px; font-size:12.5px; max-width:250px; line-height:1.5; transition:opacity .12s; box-shadow:0 8px 26px rgba(33,28,23,.34); }
.ww2-app .tip .t-name { font-family:"Spectral",serif; font-weight:600; font-size:14px; display:block; margin-bottom:4px; }
.ww2-app .tip .t-big { font-variant-numeric:tabular-nums; }
.ww2-app .tip .t-sub { color:#c9beac; font-size:11.5px; margin-top:4px; }
.ww2-app .selection { stroke:var(--ink); stroke-opacity:.6; fill:var(--ink); fill-opacity:.05; }
`;

function injectStyles() {
  if (document.getElementById("ww2-styles")) return;
  const s = document.createElement("style");
  s.id = "ww2-styles";
  s.textContent = CSS;
  document.head.appendChild(s);
}

const MEASURES = {
  total:    { label: "Total deaths",        acc: d => d.total_deaths,    fmt: v => d3.format(",")(Math.round(v)),
              note: "By sheer numbers, the giants dominate: the Soviet Union and China lost more people than the next dozen nations combined." },
  pct:      { label: "% of 1939 population", acc: d => d.pct_1939,        fmt: v => d3.format(".2f")(v) + "%",
              note: "Against their pre-war populations, small occupied nations rise to the top — Poland and the Baltic states lost a devastating share of their people." },
  military: { label: "Military deaths",      acc: d => d.military_deaths, fmt: v => d3.format(",")(Math.round(v)),
              note: "Counting only soldiers reshuffles the list, lifting nations whose armies bore the brunt of the fighting." },
  civilian: { label: "Civilian deaths",      acc: d => d.civilian_deaths, fmt: v => d3.format(",")(Math.round(v)),
              note: "For most of the hardest-hit nations, civilian deaths far outnumber military ones — a war waged on populations." },
  civshare: { label: "Civilian share",       acc: d => d.civilian_share,  fmt: v => d3.format(".0%")(v),
              note: "The fraction of each nation's dead who were civilians — from soldiers' wars at the bottom to near-total civilian catastrophes at the top." },
};
const ANCHORS = { "Soviet Union": [-9, 4, "end"], "China": [-9, 4, "end"], "Poland": [9, -5, "start"],
  "Germany": [9, 4, "start"], "Nauru": [9, 4, "start"], "Greece": [9, 4, "start"], "United States": [-9, 4, "end"] };
const STOPS = [0, 1000, 10000, 50000, 100000, 500000, 1000000];

// DATA = array of country objects (the `countries` array from ww2-casualties.json)
export function renderWW2(DATA) {
  injectStyles();

  const color = d3.scaleLinear().domain([0, 0.5, 1]).range(["#59707a", "#9a6a4a", "#7c2128"]).interpolate(d3.interpolateLab);
  const colorFor = d => d.civilian_share == null ? "#b9b2a4" : color(d.civilian_share);

  let hovered = null, selected = null, measure = "total", threshold = 0;
  const prevY = new Map();

  // ---- build DOM ----
  const root = d3.create("div").attr("class", "ww2-app");
  const wrap = root.append("div").attr("class", "wrap");
  wrap.append("p").attr("class", "eyebrow").text("World War II, 1939–1945");
  wrap.append("h1").text("Who suffered most depends on how you count.");
  wrap.append("p").attr("class", "dek").text("Two views of the same loss. Above, every nation plotted by scale and by proportion at once — drag a box to focus. Below, a ranking that rearranges itself when you change the measure.");

  const tip = root.append("div").attr("class", "tip");

  // scatter panel
  const sp = wrap.append("div").attr("class", "panel");
  sp.append("div").attr("class", "section-head").text("The whole field");
  sp.append("p").attr("class", "section-sub").html('Each circle is a country — placed by total deaths (left to right) and by the share of its 1939 population lost (bottom to top), sized by pre-war population, coloured by civilian share. <span class="hint">Hover to inspect · drag to select · selection filters the ranking below.</span>');
  const sSvg = sp.append("svg");
  const clearBtn = sp.append("div").style("margin-top", "8px").append("button").attr("class", "clear-btn").text("✕ Clear selection");

  // bars panel
  const bp = wrap.append("div").attr("class", "panel").style("margin-top", "26px");
  bp.append("div").attr("class", "section-head").text("The ranking");
  bp.append("p").attr("class", "section-sub").text("Switch the measure and the order rearranges — faint marks show where each country stood a moment before.");
  const ctl = bp.append("div").attr("class", "controls");
  const segWrap = ctl.append("div"); segWrap.append("div").attr("class", "ctl-label").text("Measure");
  const seg = segWrap.append("div").attr("class", "segmented");
  const slg = ctl.append("div").attr("class", "slider-group"); slg.append("div").attr("class", "ctl-label").text("Minimum total deaths");
  const srow = slg.append("div").attr("class", "slider-row");
  const slider = srow.append("input").attr("type", "range").attr("min", 0).attr("max", 6).attr("step", 0.01).attr("value", 0);
  const sliderVal = srow.append("span").attr("class", "slider-val").text("all");
  const lg = ctl.append("div"); lg.append("div").attr("class", "ctl-label").text("Bar colour");
  const lgr = lg.append("div").attr("class", "legend");
  lgr.append("span").attr("class", "legend-cap").text("Military");
  lgr.append("span").attr("class", "legend-bar");
  lgr.append("span").attr("class", "legend-cap").text("Civilian");
  const measureNote = bp.append("div").attr("class", "measure-note");
  const countNote = bp.append("div").attr("class", "count-note");
  const bSvg = bp.append("svg");

  wrap.append("footer").html('Source: Wikipedia, <em>World War II casualties</em> (“Total deaths by country”). Figures are midpoints of published ranges; hover for the low–high estimate. Holocaust deaths are counted within civilian totals.');

  // ---- shared helpers ----
  function showTip(event, d) {
    const cs = d.civilian_share == null ? "—" : d3.format(".0%")(d.civilian_share);
    const rng = d.is_range ? `<div class="t-sub">range ${d3.format(",")(d.total_low)}–${d3.format(",")(d.total_high)}</div>` : "";
    tip.html(
      `<span class="t-name">${d.country}${d.note ? ` <span class="t-sub" style="font-style:italic">(${d.note})</span>` : ""}</span>` +
      `<span class="t-big">Total deaths: <strong>${d3.format(",")(d.total_deaths)}</strong></span>${rng}` +
      `<div class="t-sub">${d3.format(".2f")(d.pct_1939)}% of population · ${cs} civilian` +
      (d.population_1939 ? ` · pop. ${d3.format(".2s")(d.population_1939)}` : "") + `</div>`
    );
    const pad = 16, w = 250; let left = event.clientX + pad;
    if (left + w > window.innerWidth) left = event.clientX - w - pad;
    tip.style("left", left + "px").style("top", (event.clientY + pad) + "px").style("opacity", 1);
  }
  const hideTip = () => tip.style("opacity", 0);
  const setHover = name => { hovered = name; styleDots(); styleBars(); };

  // ---- scatter ----
  const sM = { top: 28, right: 24, left: 52, bottom: 46 };
  const sGrid = sSvg.append("g").attr("class", "grid");
  const sQuad = sSvg.append("g");
  const sAxX = sSvg.append("g").attr("class", "axis");
  const sAxY = sSvg.append("g").attr("class", "axis");
  const sBrushG = sSvg.append("g");
  const sDots = sSvg.append("g");
  const sAnno = sSvg.append("g");
  let sx, sy, sr;

  function renderScatter() {
    const width = sSvg.node().clientWidth; if (!width) return;
    const height = 470;
    sSvg.attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);
    const iw = width - sM.left - sM.right, ih = height - sM.top - sM.bottom;
    sx = d3.scaleLog().domain([80, d3.max(DATA, d => d.total_deaths) * 1.15]).range([sM.left, sM.left + iw]);
    sy = d3.scaleLinear().domain([0, d3.max(DATA, d => d.pct_1939) * 1.08]).range([sM.top + ih, sM.top]);
    sr = d3.scaleSqrt().domain([0, d3.max(DATA, d => d.population_1939 || 0)]).range([2.5, 22]);

    const xt = [100, 1000, 10000, 100000, 1000000, 10000000];
    sGrid.selectAll("line").data(xt).join("line").attr("x1", d => sx(d)).attr("x2", d => sx(d)).attr("y1", sM.top).attr("y2", sM.top + ih);
    sAxX.attr("transform", `translate(0,${sM.top + ih})`).call(d3.axisBottom(sx).tickValues(xt).tickFormat(d3.format("~s")).tickSize(4));
    sAxY.attr("transform", `translate(${sM.left},0)`).call(d3.axisLeft(sy).ticks(6).tickFormat(d => d + "%").tickSize(4));

    sQuad.selectAll("*").remove();
    sQuad.append("text").attr("class", "axis-title").attr("x", sM.left + iw).attr("y", sM.top + ih + 38).attr("text-anchor", "end").text("Total deaths (log scale) →");
    sQuad.append("text").attr("class", "axis-title").attr("transform", `translate(14,${sM.top + 6}) rotate(-90)`).attr("text-anchor", "end").text("← Share of 1939 population lost");

    sDots.selectAll("circle").data(DATA, d => d.country).join("circle")
      .attr("class", "dot").attr("cx", d => sx(d.total_deaths)).attr("cy", d => sy(d.pct_1939))
      .attr("r", d => sr(d.population_1939 || 0)).attr("fill", colorFor)
      .on("mousemove", (e, d) => { showTip(e, d); setHover(d.country); })
      .on("mouseleave", () => { hideTip(); setHover(null); });

    sAnno.selectAll("text").data(DATA.filter(d => ANCHORS[d.country])).join("text")
      .attr("class", "anno")
      .attr("x", d => sx(d.total_deaths) + ANCHORS[d.country][0])
      .attr("y", d => sy(d.pct_1939) + ANCHORS[d.country][1])
      .attr("text-anchor", d => ANCHORS[d.country][2]).text(d => d.country);

    const brush = d3.brush().extent([[sM.left, sM.top], [sM.left + iw, sM.top + ih]]).on("brush end", onBrush);
    sBrushG.call(brush);
    styleDots();
  }

  function onBrush({ selection: sel }) {
    if (!sel) selected = null;
    else {
      const [[x0, y0], [x1, y1]] = sel;
      selected = new Set(DATA.filter(d => { const cx = sx(d.total_deaths), cy = sy(d.pct_1939); return cx >= x0 && cx <= x1 && cy >= y0 && cy <= y1; }).map(d => d.country));
      if (selected.size === 0) selected = null;
    }
    clearBtn.classed("show", !!selected);
    styleDots(); renderBars();
  }
  clearBtn.on("click", () => { sBrushG.call(d3.brush().clear); selected = null; clearBtn.classed("show", false); styleDots(); renderBars(); });

  function styleDots() {
    sDots.selectAll("circle")
      .attr("opacity", d => hovered ? (d.country === hovered ? 1 : 0.18) : (selected ? (selected.has(d.country) ? 0.95 : 0.12) : 0.85))
      .attr("stroke", d => d.country === hovered ? "var(--ink)" : "var(--paper)")
      .attr("stroke-width", d => d.country === hovered ? 2 : 1);
  }

  // ---- bars ----
  const bM = { top: 30, right: 78, left: 196, bottom: 6 };
  const rowH = 23;
  const bGrid = bSvg.append("g").attr("class", "grid");
  const bGhost = bSvg.append("g");
  const bBars = bSvg.append("g");
  const bLabs = bSvg.append("g");
  const bVals = bSvg.append("g");
  const bAxis = bSvg.append("g").attr("class", "axis");

  Object.entries(MEASURES).forEach(([k, m]) => {
    seg.append("button").attr("class", "seg" + (k === measure ? " active" : "")).attr("data-k", k).text(m.label)
      .on("click", function () { measure = k; seg.selectAll(".seg").classed("active", function () { return this.dataset.k === k; }); renderBars(); });
  });
  slider.on("input", function () {
    const t = +this.value, lo = Math.floor(t), hi = Math.min(lo + 1, STOPS.length - 1);
    threshold = STOPS[lo] + (STOPS[hi] - STOPS[lo]) * (t - lo);
    sliderVal.text(threshold < 500 ? "all" : "≥ " + d3.format(",")(Math.round(threshold / 1000) * 1000));
    renderBars();
  });

  function styleBars() {
    bBars.selectAll("rect.bar")
      .attr("opacity", d => hovered && d.country !== hovered ? 0.32 : 1)
      .attr("stroke", d => d.country === hovered ? "var(--ink)" : "none")
      .attr("stroke-width", d => d.country === hovered ? 1.5 : 0);
  }

  function renderBars() {
    const m = MEASURES[measure];
    const width = bSvg.node().clientWidth; if (!width) return;
    const iw = width - bM.left - bM.right;
    const rows = DATA
      .filter(d => (d.total_deaths || 0) >= threshold && (!selected || selected.has(d.country)))
      .map(d => ({ ...d, _v: +m.acc(d) || 0 }))
      .sort((a, b) => d3.descending(a._v, b._v));

    const height = bM.top + bM.bottom + rows.length * rowH;
    bSvg.attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);
    const x = d3.scaleLinear().domain([0, d3.max(rows, d => d._v) || 1]).range([0, iw]).nice();
    const yOf = i => bM.top + i * rowH + rowH / 2;

    measureNote.text(m.note);
    countNote.text(`${rows.length} of ${DATA.length} countries shown${selected ? " · filtered by your selection above" : ""} · figures are range midpoints`);

    const T = bSvg.transition().duration(800).ease(d3.easeCubicInOut);

    bGhost.selectAll("rect").remove();
    rows.forEach(d => { const py = prevY.get(d.country); if (py != null)
      bGhost.append("rect").attr("class", "ghost").attr("x", bM.left).attr("y", py - 1).attr("height", 2).attr("width", iw)
        .attr("opacity", 0.14).transition().duration(800).attr("opacity", 0).remove(); });

    const ticks = x.ticks(5);
    bGrid.selectAll("line").data(ticks, d => d).join(
      enter => enter.append("line").attr("y1", bM.top - 6).attr("y2", height).attr("opacity", 0).attr("x1", d => bM.left + x(d)).attr("x2", d => bM.left + x(d)),
      update => update, exit => exit.transition(T).attr("opacity", 0).remove()
    ).transition(T).attr("x1", d => bM.left + x(d)).attr("x2", d => bM.left + x(d)).attr("y2", height).attr("opacity", 1);

    bAxis.attr("transform", `translate(${bM.left},${bM.top - 8})`).transition(T)
      .call(d3.axisTop(x).ticks(5).tickFormat(measure === "civshare" ? d3.format(".0%") : (measure === "pct" ? d => d + "%" : d3.format("~s"))).tickSize(0));
    bAxis.select(".domain").remove();

    const key = d => d.country;
    bBars.selectAll("rect.bar").data(rows, key).join(
      enter => enter.append("rect").attr("class", "bar").attr("x", bM.left).attr("height", rowH - 7).attr("rx", 1)
        .attr("y", (d, i) => yOf(i) - (rowH - 7) / 2).attr("width", 0).attr("fill", colorFor)
        .on("mousemove", (e, d) => { showTip(e, d); setHover(d.country); })
        .on("mouseleave", () => { hideTip(); setHover(null); }),
      update => update, exit => exit.transition(T).attr("width", 0).attr("opacity", 0).remove()
    ).transition(T).attr("y", (d, i) => yOf(i) - (rowH - 7) / 2).attr("width", d => Math.max(0, x(d._v))).attr("fill", colorFor);

    bLabs.selectAll("text.row-label").data(rows, key).join(
      enter => enter.append("text").attr("class", "row-label").attr("x", bM.left - 10).attr("text-anchor", "end").attr("dy", "0.32em")
        .attr("y", (d, i) => yOf(i)).attr("opacity", 0).text(d => d.country)
        .on("mousemove", (e, d) => setHover(d.country)).on("mouseleave", () => setHover(null)),
      update => update.text(d => d.country), exit => exit.transition(T).attr("opacity", 0).remove()
    ).transition(T).attr("y", (d, i) => yOf(i)).attr("opacity", 1);

    bVals.selectAll("text.val-label").data(rows, key).join(
      enter => enter.append("text").attr("class", "val-label").attr("dy", "0.32em").attr("opacity", 0).attr("data-v", 0)
        .attr("x", d => bM.left + Math.max(0, x(d._v)) + 6).attr("y", (d, i) => yOf(i)),
      update => update, exit => exit.transition(T).attr("opacity", 0).remove()
    ).transition(T).attr("x", d => bM.left + Math.max(0, x(d._v)) + 6).attr("y", (d, i) => yOf(i)).attr("opacity", 1)
      .tween("text", function (d) { const self = d3.select(this); const i = d3.interpolateNumber(self.attr("data-v") || 0, d._v); self.attr("data-v", d._v); return t => self.text(MEASURES[measure].fmt(i(t))); });

    rows.forEach((d, i) => prevY.set(d.country, yOf(i)));
    DATA.forEach(d => { if (!rows.find(r => r.country === d.country)) prevY.delete(d.country); });
    styleBars();
  }

  // render when the element has a width (handles Framework layout + resizing)
  const ro = new ResizeObserver(() => { renderScatter(); renderBars(); });
  ro.observe(root.node());

  return root.node();
}
