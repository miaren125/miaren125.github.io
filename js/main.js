(() => {
  const $ = (s, r = document) => r.querySelector(s);
  let lang = localStorage.getItem("lang") || "es";
  const t = k => I18N[lang][k] ?? k;
  const bg = u => `background-image:url('${encodeURI(u)}'),linear-gradient(135deg,var(--leaf-2),var(--rose-2))`;

  /* ---------- Render ---------- */
  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll(".langs button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));

    $("#hardSkills").innerHTML = HARD_SKILLS.map(s =>
      `<li>${typeof s.name === "string" ? s.name : s.name[lang]}<div class="track"><div class="fill" data-w="${s.level}"></div></div></li>`).join("");
    $("#softSkills").innerHTML = SOFT_SKILLS[lang].map(s => `<li>${s}</li>`).join("");
    $("#eduList").innerHTML = EDUCATION[lang].map(e =>
      `<li><strong>${e.title}</strong><br>${e.place}<br><small>${e.years}</small></li>`).join("");
    $("#aspireList").innerHTML = ASPIRE[lang].map(a => `<li>${a}</li>`).join("");
    requestAnimationFrame(() => document.querySelectorAll(".fill").forEach(f => f.style.width = f.dataset.w + "%"));

    $("#cards").innerHTML = PROJECTS.map(p => `
      <article class="card">
        <div class="thumb" style="${bg(p.cover)}"></div>
        <div class="info"><span class="type">${t("type." + (p.type || p.kind))}</span>
          <h3>${p.name[lang]}</h3>
          <button class="btn glass" data-open="${p.id}" type="button">${t("card.details")}</button>
        </div>
      </article>`).join("");

  }

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  function openProject(id) {
    const p = PROJECTS.find(x => x.id === id);
    const gal = p.photos.length ? `<div class="gallery" style="--cols:${p.photos.length === 4 ? 2 : 3}">${p.photos.map(u => `<div style="${bg(u)}"></div>`).join("")}</div>` : "";
    const body = p.kind === "repo" ? `
      <p>${p.what[lang]}</p>${gal}
      <h3>${t("m.tech")}</h3><ul class="chips">${p.tech.map(x => `<li>${x}</li>`).join("")}</ul>
      <h3>${t("m.feat")}</h3><ul class="feat">${p.features[lang].map(x => `<li>${x}</li>`).join("")}</ul>
      ${p.repo ? `<a class="btn glass" href="${p.repo}" target="_blank" rel="noopener">${t("m.repo")}</a>` : ""}` : `
      ${gal}<dl>
        <dt>${t("m.desc")}</dt><dd>${p.desc[lang]}</dd>
        <dt>${t("m.req")}</dt><dd>${p.req[lang]}</dd>
        <dt>${t("m.design")}</dt><dd>${p.design[lang]}</dd>
        <dt>${t("m.impl")}</dt><dd>${p.impl[lang]}</dd>
        <dt>${t("m.result")}</dt><dd>${p.result[lang]}</dd></dl>`;
    $("#modalBody").innerHTML = `<h2>${p.name[lang]}</h2>${body}`;
    modal.showModal();
  }
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]"); if (o) openProject(o.dataset.open);
    if (e.target === modal) modal.close();
  });
  $("#closeModal").onclick = () => modal.close();

  /* ---------- Idioma ---------- */
  document.querySelectorAll(".langs button").forEach(btn => btn.addEventListener("click", () => {
    lang = btn.dataset.lang; localStorage.setItem("lang", lang); render();
  }));

/* ---------- Gafete: péndulo con cuerda rígida (lanyard) ---------- */
  const badge = $("#badge"), box = $("#lanyard"), ribbon = $("#lanyard-ribbon");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mq = matchMedia("(max-width:820px)"); 

  // Ajustes de física para hacerlo más "liviano" y fluido:
  let PIVOT_Y = -30; // El listón sale desde más arriba
  const L = 420; // Longitud del listón (más largo)
  const K = 0.003; // Reducimos la constante del resorte (menos rebote agresivo)
  const DAMP = 0.98; // Aumentamos un poco la amortiguación para que pare más suave
  const MAXA = 1.0; // Ángulo máximo reducido ligeramente

  let th = still ? 0 : 0.35, w = 0, drag = false;

  function frame() {
    PIVOT_Y = mq.matches ? -20 : -50; // Punto de anclaje virtual (cuello)
    badge.style.top = (PIVOT_Y + L) + "px";
    
    if (!drag) { 
        w += -K * Math.sin(th); 
        w *= DAMP; 
        th += w; 
    }
    
    const sin = Math.sin(th), cos = Math.cos(th);
    badge.style.transform = `translate(${L * sin}px,${L * (cos - 1)}px) rotate(${-th}rad)`;
    
    const cx = box.clientWidth / 2;
    // Posición del broche (clip)
    const kx = cx + L * sin;
    const ky = PIVOT_Y + L * cos;

    // Dibujamos la forma de V
    // startLeft: punto izquierdo en la parte superior (hombro/cuello izquierdo)
    // startRight: punto derecho en la parte superior (hombro/cuello derecho)
    const startLeft = cx - 110;
    const startRight = cx + 110;
    
    ribbon.setAttribute("d", `M ${startLeft} ${PIVOT_Y} L ${kx} ${ky} L ${startRight} ${PIVOT_Y}`);

    requestAnimationFrame(frame);
  }
  
  function aim(e) {
    const r = box.getBoundingClientRect();
    const next = Math.max(-MAXA, Math.min(MAXA, Math.atan2(e.clientX - r.left - r.width / 2, Math.max(e.clientY - r.top - PIVOT_Y, 20))));
    // Suavizamos el seguimiento del ratón al arrastrar
    w = w * 0.4 + (next - th) * 0.4; 
    th = next;
  }
  
  badge.addEventListener("pointerdown", e => { drag = true; badge.classList.add("dragging"); badge.setPointerCapture(e.pointerId); aim(e); });
  badge.addEventListener("pointermove", e => { if (drag) aim(e); });
  const end = () => { drag = false; badge.classList.remove("dragging"); };
  badge.addEventListener("pointerup", end); 
  badge.addEventListener("pointercancel", end);

  /* ---------- Laptop: se cierra al bajar a Proyectos ---------- */
  const aboutSec = $("#about"), lap = $(".laptop");
  const small = matchMedia("(max-width:820px)");
  function lid() {
    if (still || small.matches) { lap.style.setProperty("--p", 0); return; }
    const extra = Math.max(aboutSec.offsetHeight - innerHeight, 1);
    const s = Math.min(Math.max(-aboutSec.getBoundingClientRect().top / extra, 0), 1);
    const p = Math.min(Math.max((s - .2) / .7, 0), 1);
    lap.style.setProperty("--p", (p * p * (3 - 2 * p)).toFixed(3));
  }
  addEventListener("scroll", lid, { passive: true });
  addEventListener("resize", lid);
  lid();

  // Clic en "Proyectos": scroll suave y lento para que se vea cerrarse la laptop
  let gliding = false;
  ["wheel", "touchstart", "keydown"].forEach(ev => addEventListener(ev, () => gliding = false, { passive: true }));
  document.querySelectorAll('a[href="#proyectos"]').forEach(a => a.addEventListener("click", e => {
    if (still || small.matches) return;
    e.preventDefault();
    const root = document.documentElement, y0 = scrollY;
    const y1 = $("#proyectos").getBoundingClientRect().top + y0 - 84;
    const ms = Math.min(2400, 900 + Math.abs(y1 - y0) * .6), t0 = performance.now();
    root.style.scrollBehavior = "auto"; gliding = true;
    (function step(t) {
      const k = Math.min((t - t0) / ms, 1), ease = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      if (gliding) scrollTo(0, y0 + (y1 - y0) * ease);
      if (gliding && k < 1) requestAnimationFrame(step); else root.style.scrollBehavior = "";
    })(t0);
    history.pushState(null, "", "#proyectos");
  }));

  /* ---------- Tema claro / oscuro ---------- */
  const setTheme = m => {
    document.documentElement.dataset.theme = m;
    try { localStorage.setItem("theme", m); } catch (e) {}
    document.querySelectorAll(".theme button").forEach(b => b.setAttribute("aria-pressed", b.dataset.mode === m));
  };
  document.querySelectorAll(".theme button").forEach(b => b.addEventListener("click", () => setTheme(b.dataset.mode)));
  setTheme(document.documentElement.dataset.theme || "light");

  render(); frame();
})();