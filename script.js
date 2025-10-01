/* =========================
   CONFIG ÚNICO (EDITABLE)
   ========================= */
const CONFIG = {
  kicker: "¡Nos casamos!",
  couple: "Vero & Inti",
  dateInline: "24 octubre del 2025",

  // Frase
  quote:
    "La historia comienza cuando dos personas que ni soñaban conocerse terminan encontrándose en el instante menos esperado, pero en el momento indicado.",

  // Fecha visible y destino del contador
  dateTitle: "24 octubre del 2025",
  countdown: {
    target: "2025-10-24T12:00:00", // hora local del evento
    offset: "-03:00"               // Buenos Aires
  },

  // Lugares
  ceremony: {
    time: "13:30",
    place: "Registro Civil - Patricios argentinas - 277"
  },
  party: {
    time: "Después del acto civil",
    place: "guardia vieja - 3732"
  },

  // Vestimenta
  dress: {
    code: "Semi-formal",
    note: "Colores libres, evitá blanco total"
  },

  // Aviso
  notice:
    "Adoramos a sus hijos, pero creemos que necesitan una noche libre. Será solo adultos. ¡Gracias por entender! ♥",

  // WhatsApp (usar 54 + código de área sin 0 + número sin 15)
  whatsapp: {
    veroNumber: "5491152617410",
    intiNumber: "5491150264999",
    messageVero: "Hola Vero, confirmo mi asistencia a la boda",
    messageInti: "Hola Inti, confirmo mi asistencia a la boda",
    btnVeroText: "Escribir a Vero",
    btnIntiText: "Escribir a Inti"
  },

  /* =========================
     ICONOS POR SECCIÓN
     ========================= */
  icons: {
    fecha:      { inline: null, url: "icons/calendar.svg",  variant: "calendar" },
    lugares:    { inline: null, url: "icons/confetti.svg",  variant: "party"    },
    vestimenta: { inline: null, url: "icons/suit.svg",      variant: "suit"     },
    ninos:      { inline: null, url: "icons/baby.svg",      variant: "baby"     },
    rsvp:       { inline: null, url: "icons/rsvp.svg",      variant: "heart"    }
  }
};

/* =========================
   INYECCIÓN DE TEXTOS
   ========================= */
(function applyTexts(cfg){
  const set = (id, text) => {
    const el = document.getElementById(id);
    if (el && text != null) el.textContent = text;
  };

  set("kicker", cfg.kicker);
  set("couple", cfg.couple);
  set("date-inline", cfg.dateInline);
  set("quote-text", cfg.quote);
  set("date-title", cfg.dateTitle);

  set("ceremony-time", cfg.ceremony.time);
  set("ceremony-place", cfg.ceremony.place);
  set("party-time", cfg.party.time);
  set("party-place", cfg.party.place);

  // Vestimenta
  set("dress-code", cfg.dress.code);
  set("dress-note", cfg.dress.note);

  // Aviso
  set("notice-text", cfg.notice);

  // Botones WhatsApp
  const vero = document.getElementById("btn-vero");
  const inti = document.getElementById("btn-inti");
  if (vero){
    const msg = encodeURIComponent(cfg.whatsapp.messageVero || "");
    vero.href = `https://wa.me/${cfg.whatsapp.veroNumber}?text=${msg}`;
    vero.textContent = cfg.whatsapp.btnVeroText || "Escribir a Vero";
  }
  if (inti){
    const msg = encodeURIComponent(cfg.whatsapp.messageInti || "");
    inti.href = `https://wa.me/${cfg.whatsapp.intiNumber}?text=${msg}`;
    inti.textContent = cfg.whatsapp.btnIntiText || "Escribir a Inti";
  }
})(CONFIG);

/* =========================
   FONDOS POR SECCIÓN (data-bg / data-bg-mobile / data-veil)
   (ahora también incluye al footer porque matchea .snap-child)
   ========================= */
(function applyBackgrounds(){
  const isMobile = window.matchMedia("(max-width: 640px)").matches;

  document.querySelectorAll(".snap-child[data-bg], .snap-child[data-bg-mobile]").forEach(sec=>{
    const urlMobile = sec.getAttribute("data-bg-mobile");
    const url = (isMobile && urlMobile) ? urlMobile : sec.getAttribute("data-bg");
    const veil = parseFloat(sec.getAttribute("data-veil") || "0.06");
    if (!url) return;

    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = url;
    img.addEventListener("load", ()=>{
      sec.style.setProperty("--bg-image", `url('${url}')`);
      if (!Number.isNaN(veil)) sec.style.setProperty("--bg-veil", String(veil));
    }, { once:true });

    // Fallback por si el onload no dispara (cache, etc.)
    setTimeout(()=>{
      const applied = getComputedStyle(sec).getPropertyValue("--bg-image").trim();
      if (!applied || applied === "none"){
        sec.style.setProperty("--bg-image", `url('${url}')`);
        if (!Number.isNaN(veil)) sec.style.setProperty("--bg-veil", String(veil));
      }
    }, 300);
  });
})();

/* =========================
   ICONOS POR SECCIÓN (SVG inline o URL)
   ========================= */
(function injectSectionIcons(cfg){
  const applyHostStylesFromData = (host) => {
    if (!host) return;
    const sz = host.getAttribute("data-size");
    const col = host.getAttribute("data-color");
    if (sz){
      const hasUnit = /[a-z%]+$/i.test(sz);
      host.style.setProperty("--icon-size", hasUnit ? sz : `${sz}px`);
    }
    if (col){
      host.style.setProperty("--icon-color", col);
    }
  };

  const mount = (hostId, srcOrHtml) => {
    const host = document.getElementById(hostId);
    if (!host || !srcOrHtml) return;

    const txt = String(srcOrHtml).trim();
    if (txt.startsWith("<")) {
      host.innerHTML = txt;       // inline SVG
    } else {
      host.innerHTML = `<img src="${txt}" alt="" loading="lazy" decoding="async">`;
    }
    applyHostStylesFromData(host);
  };

  const svgs = {
    calendar: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <rect x="7" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"></rect>
        <rect x="12" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"></rect>
        <rect x="17" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"></rect>
      </svg>
    `,
    clock: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 7v5l3 2"></path>
      </svg>
    `,
    party: `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M2 22l6-14 14 6-14 8-6 0z"></path>
        <path d="M14 3c1.5.5 2.5 1.5 3 3m-7-1c1 .3 1.7 1 2 2m7-2c.8.2 1.4.8 1.6 1.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
    `,
    outfits: `
      <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 20l3-11 3-2h4l3 2 3 11H6z"></path>
        <path d="M16 7l-2 3 2 3 2-3-2-3z" fill="currentColor" stroke="none"></path>
        <path d="M30 6l2-2 2 2-2 3-2-3z" fill="currentColor" stroke="none"></path>
        <path d="M26 20l3-9h6l3 9H26z"></path>
      </svg>
    `,
    baby: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M9 13c.5 1 1.5 1.5 3 1.5s2.5-.5 3-1.5"></path>
        <circle cx="9" cy="10" r="1.2" fill="currentColor" stroke="none"></circle>
        <circle cx="15" cy="10" r="1.2" fill="currentColor" stroke="none"></circle>
        <path d="M12 5c1.5 0 2.5 1 2.5 1"></path>
      </svg>
    `,
    heart: `
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 21s-6.5-4.35-9-7.5C1.3 11.5 2 8 5.5 7.5 7.7 7.2 9 8.8 12 11c3-2.2 4.3-3.8 6.5-3.5 3.5.5 4.2 4 2.5 6C18.5 16.65 12 21 12 21z"></path>
      </svg>
    `,
    check: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    `
  };
  svgs.suit = svgs.outfits;

  const pick = (cfgItem, fallback) => {
    if (!cfgItem) return fallback;
    if (cfgItem.inline && String(cfgItem.inline).trim()) return String(cfgItem.inline).trim();
    if (cfgItem.url && String(cfgItem.url).trim()) return String(cfgItem.url).trim();
    if (cfgItem.variant && svgs[cfgItem.variant]) return svgs[cfgItem.variant];
    return fallback;
  };

  mount("icon-fecha",      pick(cfg.icons.fecha,      svgs.calendar));
  mount("icon-lugares",    pick(cfg.icons.lugares,    svgs.party));
  mount("icon-vestimenta", pick(cfg.icons.vestimenta, svgs.outfits));
  mount("icon-ninos",      pick(cfg.icons.ninos,      svgs.baby));
  mount("icon-rsvp",       pick(cfg.icons.rsvp,       svgs.heart));
})(CONFIG);

/* =========================
   COUNTDOWN
   ========================= */
(function(){
  const el = document.getElementById('countdown');
  if(!el) return;

  el.setAttribute('data-target', CONFIG.countdown.target);
  el.setAttribute('data-offset', CONFIG.countdown.offset);

  const targetStr = el.getAttribute('data-target') || '2025-10-24T12:00:00';
  const offset = el.getAttribute('data-offset') || '-03:00';

  const targetIso = /Z|[+-]\d{2}:\d{2}$/.test(targetStr) ? targetStr : `${targetStr}${offset}`;
  const targetMs = new Date(targetIso).getTime();

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');

  function tick(){
    const now = Date.now();
    let diff = Math.max(0, targetMs - now);

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / 86400);
    const hours = Math.floor((sec % 86400) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    dEl.textContent = String(days);
    hEl.textContent = String(hours).padStart(2,'0');
    mEl.textContent = String(mins).padStart(2,'0');
    sEl.textContent = String(secs).padStart(2,'0');

    if (diff === 0) clearInterval(timer);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();

/* =========================
   FLECHAS: ir a la siguiente sección
   ========================= */
(function(){
  const container = document.getElementById('snap');
  if (!container) return;

  const sections = Array.from(container.querySelectorAll('.snap-child'));
  const last = sections[sections.length - 1];
  const lastArrow = last.querySelector('.scroll-down');
  if (lastArrow) lastArrow.style.display = 'none';

  container.querySelectorAll('.scroll-down').forEach(anchor=>{
    anchor.addEventListener('click', (e)=>{
      const href = anchor.getAttribute('href');
      const parent = anchor.closest('.snap-child');
      const nextId = href && href.startsWith('#')
        ? href.slice(1)
        : (parent?.dataset.next || null);

      if (nextId){
        const target = document.getElementById(nextId);
        if (target){
          e.preventDefault();
          target.scrollIntoView({ behavior:'smooth', block:'start' });
        }
      }
    });
  });

  container.addEventListener('keydown', (e)=>{
    const activeIndex = currentSectionIndex();
    if (e.key === 'PageDown' || e.key === 'ArrowDown'){
      e.preventDefault();
      goToIndex(Math.min(activeIndex + 1, sections.length - 1));
    }
    if (e.key === 'PageUp' || e.key === 'ArrowUp'){
      e.preventDefault();
      goToIndex(Math.max(activeIndex - 1, 0));
    }
  });

  function currentSectionIndex(){
    let idx = 0;
    let minDist = Infinity;
    const top = container.scrollTop;
    sections.forEach((sec, i)=>{
      const d = Math.abs(sec.offsetTop - top);
      if (d < minDist){ minDist = d; idx = i; }
    });
    return idx;
  }
  function goToIndex(i){
    sections[i].scrollIntoView({ behavior:'smooth', block:'start' });
  }
})();

/* =========================
   Ken Burns (zoom lento) en portada
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
  const bg = document.querySelector('#inicio .hero-bg');
  if (bg) bg.classList.add('kenburns');
});

/* =========================
   Ken Burns en el FOOTER
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
  const root   = document.getElementById('snap');
  const footer = document.getElementById('pie');
  if (!root || !footer) return;

  // crear/reusar capa de fondo independiente para animar
  let fbg = footer.querySelector('.footer-bg');
  if (!fbg){
    fbg = document.createElement('div');
    fbg.className = 'footer-bg';
    // que quede detrás del contenido
    footer.prepend(fbg);
  }

  // tomar la misma imagen declarada en data-bg / data-bg-mobile
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  const urlMobile = footer.getAttribute("data-bg-mobile");
  const url = (isMobile && urlMobile) ? urlMobile : footer.getAttribute("data-bg");
  if (url) fbg.style.backgroundImage = `url('${url}')`;

  // arrancar animación
  fbg.classList.add('kenburns');

  // reiniciar animación cada vez que el footer vuelve a ocupar casi toda la vista
  if ('IntersectionObserver' in window){
    const restart = () => {
      fbg.classList.remove('kenburns');
      void fbg.offsetWidth; // reflow
      fbg.classList.add('kenburns');
    };
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting && entry.intersectionRatio > 0.95){
          restart();
        }
      });
    }, { root, threshold: [0.95] });
    io.observe(footer);
  }
});

/* =========================
   Reinicio de Ken Burns al reentrar portada
   ========================= */
(function(){
  const root = document.getElementById('snap');
  const section = document.getElementById('inicio');
  const bg = document.querySelector('#inicio .hero-bg');
  if (!root || !section || !bg || !('IntersectionObserver' in window)) return;

  const restart = () => {
    bg.classList.remove('kenburns');
    void bg.offsetWidth; // reflow
    bg.classList.add('kenburns');
  };

  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting && entry.intersectionRatio > 0.95){
        restart();
      }
    });
  }, { root, threshold: [0.95] });

  io.observe(section);
})();
