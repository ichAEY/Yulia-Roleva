import fs from "node:fs";
import site from "./site-data.mjs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRequired(from, to, label) {
  if (!source.includes(from)) throw new Error(`Yulia v4 marker not found: ${label}`);
  source = source.replace(from, to);
}

function replaceRegexRequired(pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`Yulia v4 regex marker not found: ${label}`);
  pattern.lastIndex = 0;
  source = source.replace(pattern, replacement);
}

const categories = ["manicure", "pedicure", "podology", "training"];
const serviceCount = categories.reduce((sum, key) => sum + (site.services[key]?.length ?? 0), 0);
if (serviceCount !== 23) throw new Error(`Yulia v4 price audit failed: expected 23 services, got ${serviceCount}`);

/* Restore the first group heading in the All tab. Tahmina intentionally hid it; Julia needs
   every subsection clearly separated. */
source = source.replace(
  '...manicure.map((service) => ({ ...service, sectionLabel: undefined, sectionKey: "manicure" })),',
  '...manicure.map((service, index) => ({ ...service, sectionLabel: index === 0 ? "Стрижки" : undefined, sectionKey: "manicure" })),',
);

/* Open on All. Keep all services in the DOM and collapse only the "Все" tab via responsive CSS.
   This avoids viewport-dependent React rendering and keeps desktop stable. */
source = source.replace(
  'const [category, setCategory] = useState<"all" | "manicure" | "pedicure" | "podology" | "training">("manicure");',
  'const [category, setCategory] = useState<"all" | "manicure" | "pedicure" | "podology" | "training">("all");',
);
replaceRegexRequired(
  /  const isCollapsibleCategory = category === "manicure" \|\| category === "all";\n  const visibleServices = useMemo\(\n    \(\) => isCollapsibleCategory && !expanded \? services\.slice\(0, 5\) : services,\n    \[expanded, isCollapsibleCategory, services\],\n  \);/,
  '  const isCollapsibleCategory = category === "all";\n  const visibleServices = useMemo(() => services, [services]);',
  "responsive all-services collapse",
);

replaceRequired(
  '          <div className="mct-service-list">',
  '          <div className={\`mct-service-list\${isCollapsibleCategory && !expanded ? " is-collapsed" : " is-expanded"}\`}>',
  "service list expansion state",
);

replaceRequired(
  'isCollapsibleCategory && services.length > 5',
  'isCollapsibleCategory && services.length > 6',
  "all-services button threshold",
);

replaceRequired(
  '{expanded ? "Свернуть услуги" : \`Показать ещё \${services.length - 5} услуг\`}',
  '{expanded ? "Свернуть услуги" : "Открыть все услуги"}',
  "all-services button label",
);

/* Rebuild the final price renderer around the current STLuxe hierarchy:
   full-width row, one right price edge, variants directly below the title. */
const rendererStart = '            {visibleServices.map((service) => {';
const rendererEnd = '            })}';
const startIndex = source.indexOf(rendererStart);
if (startIndex < 0) throw new Error("Yulia v4: service renderer start not found");
const endIndex = source.indexOf(rendererEnd, startIndex + rendererStart.length);
if (endIndex < 0) throw new Error("Yulia v4: service renderer end not found");
const renderer = `            {visibleServices.map((service) => {
              const hasVariants = Boolean(service.variants?.length);
              return (
                <a className={\`mct-service-row yulia-price-row yulia-service-link\${service.sectionLabel ? " has-group-label" : ""}\${hasVariants ? " has-variants" : ""}\`} href={service.url} target="_blank" rel="noopener noreferrer" aria-label={\`\${service.name} — открыть запись в Dikidi\`} key={\`\${service.sectionKey ?? category}-\${service.name}\`}>
                  {service.sectionLabel && <div className="mct-service-group-label">{service.sectionLabel}</div>}
                  <div className="yulia-service-body">
                    <div className="yulia-service-head">
                      <strong className="yulia-service-title">{service.name}</strong>
                      {!hasVariants && <b className="yulia-service-price">{service.price}</b>}
                    </div>
                    {service.description && <p className="dct-service-description yulia-service-description">{service.description}</p>}
                    {!hasVariants && service.time && <small className="yulia-service-time">{service.time}</small>}
                    {hasVariants && (
                      <div className="yulia-service-variants">
                        {service.variants!.map((item) => (
                          <div className="yulia-service-variant" key={item.label}>
                            <span>{item.label}{item.time ? <small>{item.time}</small> : null}</span>
                            <b>{item.price}</b>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              );
            })}`;
source = source.slice(0, startIndex) + renderer + source.slice(endIndex + rendererEnd.length);

/* Put the two supplied transparent tool images into the empty mobile hero visual.
   Comb: lower-left -> upper-right. Scissors: lower-right -> upper-left. */
replaceRequired(
`          <div
            className="mct-hero-visual"
          >
            <figure className="dct-hero-portrait">`,
`          <div
            className="mct-hero-visual"
          >
            <div className="mct-yulia-tools" aria-hidden="true">
              <img className="mct-yulia-tool mct-yulia-comb" src="/Yulia-Roleva/assets/yulia/tools/comb.png" alt="" />
              <img className="mct-yulia-tool mct-yulia-scissors" src="/Yulia-Roleva/assets/yulia/tools/scissors.png" alt="" />
            </div>
            <figure className="dct-hero-portrait">`,
  "hero hair tools",
);

/* Replace the improvised WhatsApp drawing with a clean inline line icon matching the site. */
replaceRegexRequired(
  /(<a className="mct-final-secondary is-whatsapp"[\s\S]*?<span className="mct-contact-icon" aria-hidden="true">)<svg[\s\S]*?<\/svg>(<\/span>)/,
  `$1<svg className="mct-whatsapp-svg" viewBox="0 0 24 24"><path d="M12 3.2a8.7 8.7 0 0 0-7.48 13.13L3.45 20.6l4.38-1.03A8.7 8.7 0 1 0 12 3.2Z"/><path d="M8.25 7.65c.28-.6.57-.62.84-.63h.7c.2 0 .43.08.55.38l.72 1.74c.09.24.05.43-.08.62l-.58.71c-.14.16-.12.34-.03.5.5.9 1.2 1.66 2.08 2.22.18.11.36.1.52-.08l.72-.82c.17-.2.37-.24.6-.15l1.75.83c.25.12.38.27.4.45.03.2-.09 1.15-.67 1.69-.58.53-1.35.78-2.21.59-1.2-.27-2.72-.94-4.18-2.27-1.72-1.57-2.72-3.5-2.82-4.48-.05-.51.1-.91.39-1.24Z"/></svg>$2`,
  "WhatsApp icon",
);

/* Current STLuxe TANEM credit, verbatim structure: T mark + “Создано в TANEM.ru”. */
replaceRegexRequired(
  /<a className="mct-stluxe-footer"[\s\S]*?<\/a>/,
  '<a className="mct-stluxe-footer" href="https://tanem.ru/" target="_blank" rel="noopener noreferrer"><span className="stl-tanem-mark">T</span><span className="stl-tanem-credit">Создано в <strong>TANEM.ru</strong></span></a>',
  "current STLuxe TANEM credit",
);

css += `

/* Yulia v4 — final approved service layout, tools, WhatsApp icon and TANEM credit. */
@media (max-width: 767px) {
  /* Hair tools in the hero. The PNGs remain untouched; only position/rotation is applied. */
  .mct-yulia-tools {
    position: absolute;
    z-index: 6;
    inset: 2% 3% 0;
    display: block;
    overflow: visible;
    pointer-events: none;
  }
  .mct-yulia-tool {
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    width: min(54vw, 225px);
    height: min(54vw, 225px);
    object-fit: contain;
    object-position: center;
    transform-origin: 50% 50%;
    filter: drop-shadow(0 10px 18px rgba(57,45,40,.10));
    user-select: none;
    -webkit-user-drag: none;
  }
  .mct-yulia-comb {
    z-index: 1;
    transform: translate(-54%, -47%) rotate(42deg) scale(.98);
  }
  .mct-yulia-scissors {
    z-index: 2;
    transform: translate(-45%, -50%) rotate(-42deg) scale(.94);
  }

  /* The horizontal category controls stay scrollable and independent. */
  .mct-tabs-track {
    gap: 8px !important;
    background: transparent !important;
    padding: 0 !important;
    border-radius: 0 !important;
  }
  .mct-tabs-scroll .mct-tab {
    border: 1px solid rgba(65,52,47,.14) !important;
    border-radius: 999px !important;
    background: rgba(238,229,223,.72) !important;
    box-shadow: none !important;
  }
  .mct-tabs-scroll .mct-tab.is-active {
    border-color: #282321 !important;
    background: #282321 !important;
    color: #fff !important;
  }

  /* Services: no clipping, no shortened names, no booking button, one price edge. */
  .mct-service-list {
    margin-top: 18px !important;
    border-top: 0 !important;
  }

  .yulia-service-link {
    color: inherit !important;
    text-decoration: none !important;
    cursor: pointer !important;
    -webkit-tap-highlight-color: transparent !important;
  }

  .yulia-service-link:active {
    opacity: .72 !important;
  }
  .mct-service-row.yulia-price-row,
  .mct-service-row.yulia-price-row.has-variants,
  .mct-service-row.yulia-price-row.stl-grouped-service {
    display: block !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 20px 0 21px !important;
    border-bottom: 1px solid rgba(55,47,42,.16) !important;
  }
  .mct-service-row.yulia-price-row.has-group-label {
    margin-top: 34px !important;
    padding-top: 0 !important;
  }
  .mct-service-row.yulia-price-row.has-group-label:first-child {
    margin-top: 8px !important;
  }
  .mct-service-group-label {
    display: block !important;
    margin: 0 0 17px !important;
    color: #6f5d55 !important;
    font: 600 11px/1.2 "Manrope", Arial, sans-serif !important;
    letter-spacing: .15em !important;
    text-transform: uppercase !important;
  }
  .mct-service-group-label::after { display: none !important; content: none !important; }

  .yulia-service-body { width: 100% !important; min-width: 0 !important; }
  .yulia-service-head {
    display: grid !important;
    grid-template-columns: minmax(0,1fr) 112px !important;
    align-items: baseline !important;
    gap: 16px !important;
    width: 100% !important;
  }
  .yulia-service-title {
    display: block !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow: visible !important;
    white-space: normal !important;
    -webkit-line-clamp: unset !important;
    -webkit-box-orient: initial !important;
    color: #171513 !important;
    font: 600 19px/1.16 "Cormorant Garamond", Georgia, serif !important;
    letter-spacing: -.005em !important;
  }
  .yulia-service-price {
    display: block !important;
    width: 112px !important;
    text-align: right !important;
    color: #171513 !important;
    white-space: nowrap !important;
    font: 600 18px/1 "Cormorant Garamond", Georgia, serif !important;
    letter-spacing: 0 !important;
  }
  .yulia-service-description {
    display: block !important;
    max-width: none !important;
    margin: 7px 0 0 !important;
    overflow: visible !important;
    white-space: normal !important;
    text-overflow: clip !important;
    color: #81766f !important;
    font: 400 10.5px/1.45 "Manrope", Arial, sans-serif !important;
  }
  .yulia-service-time {
    display: block !important;
    margin-top: 7px !important;
    color: #91857d !important;
    font: 400 10px/1.35 "Manrope", Arial, sans-serif !important;
  }
  .yulia-service-variants {
    display: grid !important;
    gap: 8px !important;
    width: 100% !important;
    margin-top: 14px !important;
  }
  .yulia-service-variant {
    display: grid !important;
    grid-template-columns: minmax(0,1fr) 112px !important;
    align-items: baseline !important;
    gap: 16px !important;
    width: 100% !important;
    padding: 0 !important;
    border: 0 !important;
  }
  .yulia-service-variant > span {
    min-width: 0 !important;
    color: #5f5752 !important;
    white-space: normal !important;
    font: 400 12.5px/1.36 "Manrope", Arial, sans-serif !important;
  }
  .yulia-service-variant > span small {
    display: inline !important;
    margin-left: 7px !important;
    color: #91857d !important;
    white-space: nowrap !important;
    font: 400 9.5px/1.3 "Manrope", Arial, sans-serif !important;
  }
  .yulia-service-variant > b {
    display: block !important;
    width: 112px !important;
    text-align: right !important;
    color: #171513 !important;
    white-space: nowrap !important;
    font: 600 16.5px/1 "Cormorant Garamond", Georgia, serif !important;
    letter-spacing: 0 !important;
  }
  .mct-service-list.is-collapsed > .mct-service-row.yulia-price-row:nth-child(n + 7) {
    display: none !important;
  }

  .mct-more-services {
    display: flex !important;
    width: 100% !important;
    min-height: 46px !important;
    margin: 16px 0 0 !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    border: 1px solid rgba(87,68,61,.14) !important;
    border-radius: 999px !important;
    background: #f0e7e1 !important;
    color: #3f3936 !important;
    font: 600 10px/1 "Manrope", Arial, sans-serif !important;
    cursor: pointer !important;
  }

  /* WhatsApp is a clean monochrome line icon in the same visual language as the site. */
  .mct-final-secondary.is-whatsapp .mct-contact-icon {
    background: rgba(255,255,255,.52) !important;
    color: #76675f !important;
  }
  .mct-final-secondary.is-whatsapp .mct-contact-icon::before,
  .mct-final-secondary.is-whatsapp .mct-contact-icon::after { display: none !important; content: none !important; }
  .mct-final-secondary.is-whatsapp .mct-contact-icon .mct-whatsapp-svg {
    display: block !important;
    width: 21px !important;
    height: 21px !important;
    fill: none !important;
    stroke: currentColor !important;
    stroke-width: 1.55 !important;
    stroke-linecap: round !important;
    stroke-linejoin: round !important;
  }

  /* Current STLuxe TANEM credit: no white strip before it. */
  .mct-visit { margin-bottom: 0 !important; padding-bottom: 0 !important; }
  .mct-visit > .mct-shell { padding-bottom: 0 !important; }
  .mct-stluxe-footer {
    width: 100% !important;
    min-height: 92px !important;
    height: auto !important;
    margin: -1px 0 0 !important;
    padding: 15px 24px 16px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 5px !important;
    border: 0 !important;
    background: #171513 !important;
    color: #fff !important;
    text-align: center !important;
    text-decoration: none !important;
  }
  .mct-stluxe-footer .stl-tanem-mark {
    width: 31px !important;
    height: 31px !important;
    border: 1px solid rgba(255,255,255,.34) !important;
    border-radius: 9px !important;
    display: grid !important;
    place-items: center !important;
    color: #fff !important;
    font: 600 20px/1 "Cormorant Garamond", Georgia, serif !important;
  }
  .mct-stluxe-footer .stl-tanem-credit {
    max-width: none !important;
    margin: 0 !important;
    color: rgba(255,255,255,.72) !important;
    text-align: center !important;
    font: 500 10px/1.2 "Manrope", Arial, sans-serif !important;
    letter-spacing: .04em !important;
  }
  .mct-stluxe-footer .stl-tanem-credit strong {
    color: rgba(255,255,255,.92) !important;
    font-size: 11.5px !important;
    font-weight: 600 !important;
  }
}

@media (max-width: 370px) {
  .yulia-service-head,
  .yulia-service-variant { grid-template-columns: minmax(0,1fr) 100px !important; gap: 12px !important; }
  .yulia-service-price,
  .yulia-service-variant > b { width: 100px !important; }
  .yulia-service-title { font-size: 18px !important; }
  .yulia-service-price { font-size: 17px !important; }
  .yulia-service-variant > b { font-size: 15.5px !important; }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log(`Yulia v4 applied: ${serviceCount} services preserved; responsive All-tab collapse enabled.`);
