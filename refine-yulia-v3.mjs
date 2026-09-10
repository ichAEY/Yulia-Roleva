import fs from "node:fs";
import site from "./site-data.mjs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

const categories = ["manicure", "pedicure", "podology", "training"];
const serviceCount = categories.reduce((sum, key) => sum + (site.services[key]?.length ?? 0), 0);
if (serviceCount !== 23) {
  throw new Error(`Yulia price audit failed: expected 23 complete service cards, got ${serviceCount}`);
}

/* Keep every confirmed service from Julia's price list. This audit intentionally fails
   the build if one of the source services disappears from site-data. */
const expectedServices = [
  "Стрижка женская",
  "Стрижка — ровный срез",
  "Стрижка с мытьём головы",
  "Моделирование челки",
  "Коррекция челки",
  "Полировка волос",
  "Окрашивание корней 1–2 см",
  "Окрашивание тон в тон / тонирование",
  "Глазирование волос",
  "Total blond — блондирование корней / тонирование",
  "Контуринг / осветление краевой линии волос / тонирование",
  "Затемнение блонда / репигментация / окрашивание тон в тон",
  "Выход из чёрного / тёмного",
  "Мелирование / тонирование",
  "Комплекс: стрижка + окрашивание",
  "Аминокератиновая реконструкция",
  "Протеиновое насыщение",
  "Кератиновая реконструкция",
  "Коллагеновый уход",
  "Spa Keratin от Dr Sorbie",
  "Локоны на брашинг",
  "Дневная укладка",
  "Коктейльная укладка на горячий инструмент",
];
const allNames = categories.flatMap((key) => (site.services[key] ?? []).map((item) => item.name));
for (const name of expectedServices) {
  if (!allNames.includes(name)) throw new Error(`Yulia price audit failed: missing service «${name}»`);
}

/* Correct the hero count so it always reflects the complete confirmed price list. */
source = source.replace(
  '<div className="mct-stat"><strong>{allServices.length}</strong><span>услуги</span></div>',
  `<div className="mct-stat"><strong>${serviceCount}</strong><span>услуги</span></div>`,
);

/* Use source wording for the few titles that were unnecessarily editorialized. */
source = source
  .split("Стрижка — ровный срез").join("Стрижка ровный срез")
  .split("Стрижка с мытьём головы").join("С мытьем головы")
  .split("Окрашивание тон в тон / тонирование").join("Окрашивание тон в тон / тонирование длины")
  .split("Мелирование / тонирование").join("Мелирование / тонирование волос")
  .split("Комплекс: стрижка + окрашивание").join("Комплекс стрижка + окрашивание волос")
  .split("Коктейльная укладка на горячий инструмент").join("Укладка коктейльная на горячий инструмент");

/* Exact STLuxe service structure: title + optional detail on the left, price on the right;
   grouped length prices sit directly under the title with no separator. No booking buttons. */
const mapStart = '            {visibleServices.map((service) => {';
const mapEnd = '            })}';
const startIndex = source.indexOf(mapStart);
if (startIndex < 0) throw new Error("Yulia v3: service renderer start not found");
const endIndex = source.indexOf(mapEnd, startIndex + mapStart.length);
if (endIndex < 0) throw new Error("Yulia v3: service renderer end not found");
const renderer = `            {visibleServices.map((service) => {
              const hasVariants = Boolean(service.variants?.length);
              return (
                <article className={\`mct-service-row\${service.sectionLabel ? " has-group-label" : ""}\${hasVariants ? " stl-grouped-service" : ""}\`} key={\`\${service.sectionKey ?? category}-\${service.name}\`}>
                  {service.sectionLabel && <span className="mct-service-group-label">{service.sectionLabel}</span>}
                  <div className="mct-service-name">
                    <strong>{service.name}</strong>
                    {service.description && <p className="dct-service-description">{service.description}</p>}
                    {!hasVariants && service.time && <small>{service.time}</small>}
                    {hasVariants && (
                      <div className="stl-price-variants">
                        {service.variants!.map((item) => (
                          <div className="stl-price-variant" key={item.label}>
                            <span>{item.label}{item.time ? <small>{item.time}</small> : null}</span>
                            <b>{item.price}</b>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mct-service-action">
                    {!hasVariants && <b>{service.price}</b>}
                  </div>
                </article>
              );
            })}`;
source = source.slice(0, startIndex) + renderer + source.slice(endIndex + mapEnd.length);

/* Replace the previous footer wrapper with the current STLuxe TANEM badge itself.
   It starts immediately after the preceding content, so no white strip remains above it. */
source = source.replace(
  /\s*<footer className="dct-footer dct-footer-stluxe">[\s\S]*?<\/footer>/,
  `\n      <a className="mct-stluxe-footer" href="https://tanem.ru/" target="_blank" rel="noopener noreferrer"><strong>TANEM.ru</strong><span>Цифровой офис для салонов красоты</span></a>`,
);

css += `

/* Yulia v3 — copy the current STLuxe price hierarchy exactly; keep Julia/Tahmina backgrounds. */
.mct-service-list {
  margin-top: 18px !important;
  border-top: 1px solid rgba(55,47,42,.18) !important;
}

.mct-service-row,
.mct-service-row.has-variants,
.mct-service-row.stl-grouped-service {
  min-height: 84px !important;
  display: grid !important;
  grid-template-columns: minmax(0,1fr) 108px !important;
  gap: 16px !important;
  align-items: center !important;
  padding: 0 !important;
  border-bottom: 1px solid rgba(55,47,42,.18) !important;
}

.mct-service-row.stl-grouped-service {
  align-items: start !important;
}

.mct-service-name,
.mct-service-row.has-variants .mct-service-name,
.mct-service-row.stl-grouped-service .mct-service-name {
  min-width: 0 !important;
  padding: 13px 0 !important;
}

.mct-service-name > strong,
.mct-service-row.has-variants .mct-service-name > strong,
.mct-service-row.stl-grouped-service .mct-service-name > strong {
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 2 !important;
  overflow: hidden !important;
  color: #171513 !important;
  font: 600 18px/1.15 "Cormorant Garamond", Georgia, serif !important;
  letter-spacing: 0 !important;
}

.dct-service-description {
  display: block !important;
  margin: 5px 0 0 !important;
  color: #81766f !important;
  font: 400 9.5px/1.35 "Manrope", Arial, sans-serif !important;
}

.mct-service-name > small {
  display: block !important;
  margin-top: 5px !important;
  color: #81766f !important;
  font: 400 9.5px/1.35 "Manrope", Arial, sans-serif !important;
}

.mct-service-action,
.mct-service-row.has-variants .mct-service-action,
.mct-service-row.stl-grouped-service .mct-service-action {
  align-self: center !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
  text-align: right !important;
}

.mct-service-row.stl-grouped-service .mct-service-action {
  padding-top: 14px !important;
}

.mct-service-action > a { display: none !important; }

.mct-service-action b {
  color: #171513 !important;
  white-space: nowrap !important;
  font: 500 20px/1 "Cormorant Garamond", Georgia, serif !important;
  letter-spacing: .005em !important;
}

/* This is the current grouped-price block used by STLuxe. */
.stl-price-variants {
  display: grid !important;
  gap: 5px !important;
  margin-top: 8px !important;
  padding: 0 !important;
  border: 0 !important;
}

.stl-price-variant {
  min-height: 0 !important;
  display: flex !important;
  align-items: baseline !important;
  justify-content: space-between !important;
  gap: 8px !important;
  padding: 0 !important;
  border: 0 !important;
  color: #81766f !important;
  font: 400 10px/1.35 "Manrope", Arial, sans-serif !important;
}

.stl-price-variant > span { min-width: 0 !important; }
.stl-price-variant > span small {
  display: inline !important;
  margin: 0 0 0 7px !important;
  color: #91857d !important;
  font: 400 9px/1.35 "Manrope", Arial, sans-serif !important;
  white-space: nowrap !important;
}
.stl-price-variant > b {
  flex: 0 0 auto !important;
  color: #4d4641 !important;
  white-space: nowrap !important;
  font: 500 11px/1.2 "Manrope", Arial, sans-serif !important;
  letter-spacing: 0 !important;
}

/* Neutralize the previous experimental grouped styles completely. */
.mct-service-variants,
.mct-service-variant { display: none !important; }

/* Current STLuxe TANEM footer: exact text hierarchy, no white gap above. */
.dct-footer,
.dct-footer-stluxe,
.mct-tanem-badge,
.mct-tanem-footer { display: none !important; }

.mct-stluxe-footer {
  width: 100% !important;
  height: 76px !important;
  margin: 0 !important;
  padding: 0 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 16px !important;
  background: #171513 !important;
  color: #fff !important;
  text-decoration: none !important;
}
.mct-stluxe-footer strong {
  color: #fff !important;
  font: 500 23px/1 "Cormorant Garamond", Georgia, serif !important;
}
.mct-stluxe-footer span {
  max-width: 185px !important;
  color: #d6cec8 !important;
  text-align: right !important;
  font: 400 10px/1.35 "Manrope", Arial, sans-serif !important;
}

@media (max-width: 370px) {
  .mct-service-row,
  .mct-service-row.has-variants,
  .mct-service-row.stl-grouped-service {
    grid-template-columns: minmax(0,1fr) 100px !important;
    gap: 12px !important;
  }
  .mct-service-name > strong,
  .mct-service-row.has-variants .mct-service-name > strong,
  .mct-service-row.stl-grouped-service .mct-service-name > strong {
    font-size: 17px !important;
  }
  .mct-service-action b { font-size: 19px !important; }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log(`Yulia v3 applied: ${serviceCount} complete services; STLuxe price/footer structure copied.`);
