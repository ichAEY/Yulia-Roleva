import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRequired(from, to, label) {
  if (!source.includes(from)) throw new Error(`Yulia v9 marker not found: ${label}`);
  source = source.replace(from, to);
}

/* Yulia v9 — keep the client's uploaded finished hero image as one untouched image. */
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

/* WhatsApp uses exactly the same message-bubble illustration as the Telegram contact tile. */
source = source.replace(
  /<svg className="mct-whatsapp-svg"[\s\S]*?<\/svg>/,
  '<svg className="mct-whatsapp-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /></svg>',
);
replaceRequired(
  '<span className="mct-contact-copy"><strong>WhatsApp</strong><small>Написать Юлии</small></span>',
  '<span className="mct-contact-copy"><strong>WhatsApp</strong><small>Написать Юлии Ролевой</small></span>',
  "WhatsApp contact text",
);

css += `

/* Yulia v9 — final mobile hero, price-list spacing and contact polish. */
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

  /* The visual row itself is the exact free space between copy and booking controls. */
  .mct-yulia-tools {
    position: absolute !important;
    z-index: 6 !important;
    inset: 0 -3% !important;
    display: grid !important;
    place-items: center !important;
    overflow: hidden !important;
    pointer-events: none !important;
    isolation: isolate !important;
    background: transparent !important;
  }

  /* Only the very top background edge is softened. The scissors and comb remain untouched. */
  .mct-yulia-tools::before {
    content: "" !important;
    position: absolute !important;
    z-index: 2 !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 18px !important;
    background: linear-gradient(to bottom, #f9f6ef 0%, rgba(249,246,239,.72) 45%, rgba(249,246,239,0) 100%) !important;
    pointer-events: none !important;
  }

  .mct-yulia-tools::after {
    display: none !important;
    content: none !important;
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
    object-position: center center !important;
    transform: scale(0.93) !important;
    transform-origin: center center !important;
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

  /* Keep the long one-price Contouring service compact without deleting any wording. */
  .yulia-contouring-detail {
    margin-top: 5px !important;
  }

  /* Prices are only five percent larger than the approved v4 sizing. */
  .yulia-service-price {
    font-size: 18.9px !important;
  }
  .yulia-service-variant > b {
    font-size: 17.3px !important;
  }

  /* WhatsApp copies Telegram's message-bubble icon exactly. */
  .mct-final-secondary.is-whatsapp .mct-contact-icon {
    display: grid !important;
    place-items: center !important;
    overflow: visible !important;
  }
  .mct-final-secondary.is-whatsapp .mct-contact-icon::before,
  .mct-final-secondary.is-whatsapp .mct-contact-icon::after {
    display: none !important;
    content: none !important;
  }
  .mct-final-secondary.is-whatsapp .mct-contact-icon .mct-whatsapp-svg {
    display: block !important;
    width: 21px !important;
    height: 21px !important;
    fill: none !important;
    stroke: currentColor !important;
    stroke-width: 1.5 !important;
    stroke-linecap: round !important;
    stroke-linejoin: round !important;
  }
}

@media (min-width: 768px) {
  .mct-yulia-tools { display: none !important; }
}
`;

fs.writeFileSync(componentPath, source);
fs.writeFileSync(cssPath, css);
console.log("Applied final Yulia mobile hero, service spacing, price sizing and contact polish");
