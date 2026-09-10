import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRequired(from, to, label) {
  if (!source.includes(from)) throw new Error(`Yulia v10 marker not found: ${label}`);
  source = source.replace(from, to);
}

/* Yulia v10 — keep the client's uploaded finished hero image as one untouched image. */
source = source.replace(
  /<div className="mct-yulia-tools" aria-hidden="true">[\s\S]*?<\/div>/,
  '<div className="mct-yulia-tools" aria-hidden="true"><img className="mct-yulia-hero-image" src="/Yulia-Roleva/assets/yulia/tools/hero.png" alt="" /></div>',
);

/* Contouring keeps every word, but uses the spare second line as a description. */
replaceRequired(
  '<strong className="yulia-service-title">{service.name}</strong>',
  '<strong className="yulia-service-title">{service.name === "Контуринг / осветление краевой линии волос / тонирование" ? "Контуринг" : service.name}</strong>',
  "service title renderer",
);
replaceRequired(
  '{service.description && <p className="dct-service-description yulia-service-description">{service.description}</p>}',
  '{service.name === "Контуринг / осветление краевой линии волос / тонирование" && <p className="dct-service-description yulia-service-description yulia-contouring-detail">Осветление краевой линии волос / тонирование</p>}\n                    {service.description && <p className="dct-service-description yulia-service-description">{service.description}</p>}',
  "contouring description",
);

/* WhatsApp is literally the same contact tile structure and message-bubble icon as Telegram. */
source = source.replace(
  '<a className="mct-final-secondary is-whatsapp"',
  '<a className="mct-final-secondary"',
);
source = source.replace(
  /<svg className="mct-whatsapp-svg"[\s\S]*?<\/svg>/,
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg>',
);
replaceRequired(
  '<span className="mct-contact-copy"><strong>WhatsApp</strong><small>Написать Юлии</small></span>',
  '<span className="mct-contact-copy"><strong>WhatsApp</strong><small>Написать Юлии Ролевой</small></span>',
  "WhatsApp contact text",
);

css += `

/* Yulia v10 — restore the approved hero from the previous version; keep service polish. */
@media (max-width: 767px) {
  .mct-hero,
  .mct-hero .mct-shell,
  .mct-hero-visual {
    background: #f9f6ef !important;
    background-image: none !important;
  }

  .mct-hero-visual {
    position: relative !important;
    overflow: hidden !important;
    isolation: isolate !important;
  }

  /* Exact hero placement from the version before v9. */
  .mct-yulia-tools {
    position: absolute !important;
    z-index: 6 !important;
    inset: 0 -3% -3% !important;
    display: flex !important;
    align-items: flex-end !important;
    justify-content: center !important;
    overflow: hidden !important;
    pointer-events: none !important;
    isolation: isolate !important;
    background: transparent !important;
  }

  .mct-yulia-tools::before,
  .mct-yulia-tools::after {
    display: none !important;
    content: none !important;
    background: none !important;
    filter: none !important;
    opacity: 0 !important;
  }

  .mct-yulia-tool,
  .mct-yulia-comb,
  .mct-yulia-scissors {
    display: none !important;
  }

  .mct-yulia-hero-image {
    position: relative !important;
    z-index: 1 !important;
    display: block !important;
    width: min(110vw, 452px) !important;
    max-width: none !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: center bottom !important;
    transform: translateY(22px) scale(0.93) !important;
    transform-origin: center bottom !important;
    user-select: none !important;
    -webkit-user-drag: none !important;
    filter: none !important;
    opacity: 1 !important;
    -webkit-mask-image: none !important;
    mask-image: none !important;
    -webkit-mask: none !important;
    mask: none !important;
  }

  /* Variant services have no headline price, so their title gets the full row width. */
  .yulia-price-row.has-variants .yulia-service-head {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 0 !important;
  }

  .yulia-price-row.has-variants .yulia-service-title {
    width: 100% !important;
    max-width: none !important;
  }

  .yulia-contouring-detail {
    margin-top: 5px !important;
  }

  /* Prices stay five percent larger than the approved v4 sizing. */
  .yulia-service-price {
    font-size: 18.9px !important;
  }
  .yulia-service-variant > b {
    font-size: 17.3px !important;
  }
}

@media (min-width: 768px) {
  .mct-yulia-tools { display: none !important; }
}
`;

fs.writeFileSync(componentPath, source);
fs.writeFileSync(cssPath, css);
console.log("Restored previous Yulia hero and made WhatsApp contact tile identical to Telegram");
