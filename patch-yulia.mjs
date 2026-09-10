import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRequired(from, to, label = from) {
  if (!source.includes(from)) throw new Error(`Yulia patch marker not found: ${label}`);
  source = source.replace(from, to);
}

function replaceAllRequired(from, to, label = from) {
  if (!source.includes(from)) throw new Error(`Yulia patch marker not found: ${label}`);
  source = source.split(from).join(to);
}

function replaceRegexRequired(pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`Yulia patch regex marker not found: ${label}`);
  pattern.lastIndex = 0;
  source = source.replace(pattern, replacement);
}

function replaceBlock(start, end, replacement, label) {
  const startIndex = source.indexOf(start);
  if (startIndex < 0) throw new Error(`Yulia block start not found: ${label}`);
  const endIndex = source.indexOf(end, startIndex + start.length);
  if (endIndex < 0) throw new Error(`Yulia block end not found: ${label}`);
  source = source.slice(0, startIndex) + replacement + source.slice(endIndex + end.length);
}

/* Hair categories keep Tahmina's scrolling structure; only labels/content change. */
replaceAllRequired("Маникюр", "Стрижки", "haircut category label");
replaceAllRequired("Педикюр", "Окрашивание", "color category label");
replaceAllRequired("Подология", "Уход", "care category label");
replaceAllRequired("Обучение", "Укладка", "styling category label");

source = source.split("Тахмины").join("Юлии Ролевой");
source = source.split("Тахмину").join("Юлию Ролеву");
source = source.split("Тахмина").join("Юлия Ролева");
source = source.split("Space Beauty").join("");
source = source.split("салон  ·").join("");

/* Service objects support STLuxe-style length variants inside one service card. */
replaceRequired(
  "type Service = { name: string; price: string; time: string; description: string; url: string };",
  "type Service = { name: string; price: string; time: string; description: string; url: string; variants?: Array<{ label: string; price: string; time?: string }> };",
  "service variant type",
);

/* Header: use only the ЮР monogram area from the supplied logo. */
replaceRequired(
  '<a className="mct-brand" href="#mobile-top" aria-label="Юлия Ролева, наверх">Юлия Ролева</a>',
  '<a className="mct-brand mct-brand-yulia-logo" href="#mobile-top" aria-label="Юлия Ролева, наверх"><span className="mct-brand-logo-crop" aria-hidden="true"><img src="/Yulia-Roleva/assets/yulia/logo.webp" alt="" /></span></a>',
  "Yulia logo in topbar",
);

/* Main hero title and the third stat. */
replaceRequired(
  '<h1>Юлия Ролева — мастер <em>по волосам</em></h1>',
  '<h1>Юлия Ролева — ваш <em>эксперт по волосам</em></h1>',
  "hero expert title",
);
replaceRegexRequired(
  /<div className="mct-stat"><strong>6<\/strong><span>оценок<\/span><\/div>/,
  '<div className="mct-stat"><strong>{allServices.length}</strong><span>услуги</span></div>',
  "hero service count",
);

/* Portfolio heading: remove the redundant note. */
source = source.replace('<p className="mct-section-note">Подборка работ Юлии Ролевой</p>', '');

/* Reviews: no review count, compact cards, Подробнее links directly to Dikidi. */
replaceRegexRequired(
  /<a className="mct-review-summary" href=\{reviewsUrl\} target="_blank" rel="noopener noreferrer"><strong>[^<]*<\/strong><span>[\s\S]*?<\/span><\/a>/,
  '<a className="mct-review-summary" href={reviewsUrl} target="_blank" rel="noopener noreferrer"><span>Все отзывы в Dikidi →</span></a>',
  "review summary without count",
);
source = source.split('<small>{review.author} · Яндекс Карты</small>').join('<small>{review.author} · Dikidi</small>');
source = source.split('<i>Открыть отзыв →</i>').join('<i>Подробнее →</i>');
source = source.replace("Настоящие отзывы клиентов Юлия Ролева.", "Настоящие отзывы клиентов Юлии Ролевой.");

/* About block: clean title, professional copy from site-data and vertical expertise cards. */
replaceRegexRequired(
  /<div><p className="mct-section-kicker">О мастере<\/p><h2>[\s\S]*?<\/h2><\/div>/,
  '<div><p className="mct-section-kicker">О мастере</p><h2>Юлия Ролева</h2></div>',
  "about title",
);
replaceRegexRequired(
  /<div className="mct-amenities-head"><p className="mct-section-kicker">Дополнительно<\/p><span>[\s\S]*?<\/span><\/div>/,
  '<div className="mct-amenities-head"><p className="mct-section-kicker">Дополнительно</p><span>Полезно перед записью</span></div>',
  "amenities heading",
);

/* Keep the existing horizontal scroll, but render each subsection as its own button. */
source = source.replace('<span className="mct-tab-divider" aria-hidden="true" />', '');

/* Group prices by length/format inside a single service card, STLuxe-style. */
const serviceMapStart = '            {visibleServices.map((service) => (';
const serviceMapEnd = '            ))}';
replaceBlock(
  serviceMapStart,
  serviceMapEnd,
`            {visibleServices.map((service) => {
              const hasVariants = Boolean(service.variants?.length);
              return (
                <article className={\`mct-service-row\${service.sectionLabel ? " has-group-label" : ""}\${hasVariants ? " has-variants" : ""}\`} key={\`\${service.sectionKey ?? category}-\${service.name}\`}>
                  {service.sectionLabel && <span className="mct-service-group-label">{service.sectionLabel}</span>}
                  <div className="mct-service-name">
                    <strong>{service.name}</strong>
                    <p className="dct-service-description">{service.description}</p>
                    {!hasVariants && <small>{service.time}</small>}
                    {hasVariants && (
                      <div className="mct-service-variants">
                        {service.variants!.map((item) => (
                          <div className="mct-service-variant" key={item.label}>
                            <span>{item.label}{item.time ? <small>{item.time}</small> : null}</span>
                            <b>{item.price}</b>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mct-service-action">
                    {!hasVariants && <b>{service.price}</b>}
                    <a href={service.url} target="_blank" rel="noopener noreferrer">Записаться →</a>
                  </div>
                </article>
              );
            })}`,
  "grouped service renderer",
);

/* Portfolio lightbox: only photos opened from the portfolio get an Open gallery CTA. */
replaceRequired(
`          </figure>
          <button className="mct-lightbox-nav mct-lightbox-next"`,
`          </figure>
          {!galleryOpen && (
            <button
              className="mct-lightbox-gallery-cta"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex(null);
                setGalleryOpen(true);
              }}
            >Открыть галерею</button>
          )}
          <button className="mct-lightbox-nav mct-lightbox-next"`,
  "portfolio lightbox gallery CTA",
);

/* Visit copy and footer brand badge. */
source = source.replace(
  "Выберите свободное время в календаре. Если нужно уточнить услугу, дизайн или длительность процедуры, напишите Юлии Ролевой напрямую.",
  "Выберите свободное время в Dikidi. Если нужно уточнить услугу или подобрать процедуру, напишите Юлии Ролевой напрямую.",
);
source = source.replace(
  '<div className="mct-final-contact-grid" aria-label="Все способы связи с Юлия Ролева">',
  '<div className="mct-final-contact-grid" aria-label="Способы связи с Юлией Ролевой">',
);
source = source.replace(
  '<a className="mct-final-secondary" href={channelTelegramUrl} target="_blank" rel="noopener noreferrer">',
  '<a className="mct-final-secondary" href={bookingUrl} target="_blank" rel="noopener noreferrer">',
);
source = source.replace(
  '<span className="mct-contact-copy"><strong>Telegram-канал</strong><small>Работы и новости</small></span>',
  '<span className="mct-contact-copy"><strong>Dikidi</strong><small>Онлайн-запись</small></span>',
);
source = source.replace(
  '<span className="mct-contact-copy"><strong>Яндекс Карты</strong><small>Отзывы и маршрут</small></span>',
  '<span className="mct-contact-copy"><strong>Яндекс Карты</strong><small>Адрес и маршрут</small></span>',
);
source = source.replace(
  'aria-label="Удобства для визита в Юлия Ролева"',
  'aria-label="О визите к Юлии Ролевой"',
);
source = source.replace(
  'aria-label="Открыть Юлия Ролева в Яндекс Картах"',
  'aria-label="Открыть адрес Юлии Ролевой в Яндекс Картах"',
);
source = source.replace(
  'aria-label="Построить маршрут до Юлия Ролева в Яндекс Картах"',
  'aria-label="Построить маршрут к Юлии Ролевой в Яндекс Картах"',
);

replaceRequired(
  '      <footer className="dct-footer">',
`      <a className="mct-tanem-badge" href="https://tanem.ru/" target="_blank" rel="noopener noreferrer" aria-label="TANEM.ru — цифровой офис мастера">
        <strong>TANEM.ru</strong>
        <span>Цифровой офис мастера</span>
      </a>

      <footer className="dct-footer">`,
  "TANEM badge",
);

css += `

/* Yulia-specific production refinements */
.mct-palette-stage { display: none !important; }

/* Header logo: crop the supplied square artwork to its ЮР monogram and blend away the light artwork background. */
.mct-brand-yulia-logo {
  width: 66px;
  height: 38px;
  display: flex !important;
  align-items: center;
  overflow: hidden;
}
.mct-brand-logo-crop {
  position: relative;
  display: block;
  width: 66px;
  height: 34px;
  overflow: hidden;
  background: transparent;
}
.mct-brand-logo-crop img {
  position: absolute;
  left: -21px;
  top: -27px;
  width: 106px !important;
  height: 106px !important;
  max-width: none !important;
  object-fit: cover;
  mix-blend-mode: multiply;
  filter: brightness(1.08) contrast(1.13) saturate(.9);
}

/* Reviews stay medium-sized; the whole card and the Подробнее label lead to Dikidi. */
.mct-review-summary {
  width: max-content !important;
  max-width: 100%;
  margin-left: auto !important;
  padding: 10px 13px !important;
  border: 1px solid rgba(65, 52, 47, .10);
  border-radius: 999px !important;
  justify-content: flex-end !important;
}
.mct-review-summary span {
  text-align: left !important;
  white-space: nowrap;
  font-size: 9.5px !important;
  font-weight: 600;
}
.mct-review-card {
  height: 208px !important;
  min-height: 208px !important;
  max-height: 208px !important;
  padding-bottom: 36px !important;
  overflow: hidden;
}
.mct-review-card blockquote {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  max-height: 5.6em;
}
.mct-review-card i {
  font-size: 8.5px !important;
  bottom: 14px !important;
}

/* Horizontal categories remain scrollable, but every category is an independent control. */
.mct-tabs-track {
  background: transparent !important;
  border-radius: 0 !important;
  padding: 0 !important;
  gap: 8px !important;
}
.mct-tab-divider { display: none !important; }
.mct-tabs-scroll .mct-tab {
  border: 1px solid rgba(65, 52, 47, .12) !important;
  background: #eee5df !important;
  box-shadow: 0 3px 12px rgba(69, 54, 48, .04) !important;
}
.mct-tabs-scroll .mct-tab.is-active {
  background: #fff !important;
  border-color: rgba(65, 52, 47, .18) !important;
  box-shadow: 0 5px 16px rgba(69, 54, 48, .08) !important;
}

/* Price typography and grouped variants, matching the STLuxe information hierarchy. */
.mct-service-action b,
.mct-service-variant b {
  font-family: "Cormorant Garamond", Georgia, serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  line-height: 1.05 !important;
  letter-spacing: -.012em;
}
.mct-service-row.has-variants {
  grid-template-columns: minmax(0, 1fr) !important;
  align-items: stretch !important;
  gap: 0 !important;
  padding: 16px 0 13px;
}
.mct-service-row.has-variants .mct-service-name > strong {
  font-size: clamp(18px, 5.2vw, 21px) !important;
  line-height: 1.08 !important;
}
.mct-service-variants {
  margin-top: 12px;
  border-top: 1px solid rgba(65, 52, 47, .11);
}
.mct-service-variant {
  min-height: 39px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  border-bottom: 1px solid rgba(65, 52, 47, .09);
  padding: 8px 0;
}
.mct-service-variant:last-child { border-bottom: 0; }
.mct-service-variant > span {
  color: #514b47;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.3;
}
.mct-service-variant > span small {
  display: inline !important;
  margin: 0 0 0 7px !important;
  color: #8a817c;
  font-size: 8.5px !important;
  white-space: nowrap;
}
.mct-service-row.has-variants .mct-service-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 7px;
  text-align: right;
}

/* About: three areas of expertise are separate vertical cards like STLuxe facts. */
.mct-about-list {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 8px !important;
  margin-top: 20px !important;
}
.mct-about-list li {
  min-height: 54px;
  display: flex !important;
  align-items: center;
  margin: 0 !important;
  padding: 0 15px !important;
  border: 1px solid rgba(64, 52, 45, .09) !important;
  border-radius: 14px;
  background: rgba(255,255,255,.78);
  box-shadow: 0 4px 12px rgba(50,39,32,.035);
  color: #292521 !important;
  text-align: left !important;
  font: 500 12.5px/1.3 "Manrope", Arial, sans-serif !important;
}

/* Unconfirmed opening hours are not shown. */
.mct-open-status { display: none !important; }

/* Portfolio-only lightbox CTA. It is absent when the lightbox is opened from the full gallery. */
.mct-lightbox-gallery-cta {
  position: absolute;
  z-index: 4;
  left: 50%;
  bottom: max(14px, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  min-width: 172px;
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  color: #fff;
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  font: 600 11px/1 "Manrope", Arial, sans-serif;
  box-shadow: 0 10px 30px rgba(0,0,0,.16);
}
.mct-lightbox-gallery-cta:active {
  transform: translateX(-50%) translateY(1px) scale(.985);
}

/* TANEM badge follows the compact STLuxe footer treatment. */
.mct-tanem-badge {
  width: calc(100% - 32px);
  max-width: 488px;
  min-height: 58px;
  margin: 18px auto calc(22px + env(safe-area-inset-bottom));
  padding: 13px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border: 1px solid rgba(65, 52, 47, .11);
  border-radius: 15px;
  background: rgba(255,255,255,.58);
  color: #282321;
  text-decoration: none;
}
.mct-tanem-badge strong {
  font: 600 14px/1 "Manrope", Arial, sans-serif;
  letter-spacing: -.02em;
}
.mct-tanem-badge span {
  color: #756c67;
  text-align: right;
  font: 500 8.5px/1.3 "Manrope", Arial, sans-serif;
}

@media (min-width: 768px) {
  .mct-review-card {
    height: 220px !important;
    min-height: 220px !important;
    max-height: 220px !important;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Yulia Roleva production refinements applied.");
