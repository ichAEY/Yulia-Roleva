import fs from "node:fs";
import site from "./site-data.mjs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRequired(from, to, label) {
  if (!source.includes(from)) throw new Error(`Yulia v2 marker not found: ${label}`);
  source = source.replace(from, to);
}

function replaceRegexRequired(pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`Yulia v2 regex marker not found: ${label}`);
  pattern.lastIndex = 0;
  source = source.replace(pattern, replacement);
}

const phoneDigits = String(site.contacts.phoneHref || "").replace(/\D/g, "");
if (!phoneDigits) throw new Error("Yulia v2: phone number is missing for WhatsApp");
const whatsappUrl = `https://wa.me/${phoneDigits}`;

/* 1 + 2. Services: no booking link inside service rows. Keep Tahmina background,
   but use STLuxe's service information hierarchy and grouped-variant spacing. */
replaceRequired(
`                  <div className="mct-service-action">
                    {!hasVariants && <b>{service.price}</b>}
                    <a href={service.url} target="_blank" rel="noopener noreferrer">Записаться →</a>
                  </div>`,
`                  <div className="mct-service-action">
                    {!hasVariants && <b>{service.price}</b>}
                  </div>`,
  "remove booking links from service rows",
);

/* 3. Remove the temporary TANEM badge and replace Yulia's old footer identity
   with the exact STLuxe TANEM wording. */
source = source.replace(
`      <a className="mct-tanem-badge" href="https://tanem.ru/" target="_blank" rel="noopener noreferrer" aria-label="TANEM.ru — цифровой офис мастера">
        <strong>TANEM.ru</strong>
        <span>Цифровой офис мастера</span>
      </a>

`,
  "",
);

replaceRegexRequired(
  /      <footer className="dct-footer">[\s\S]*?      <\/footer>/,
`      <footer className="dct-footer dct-footer-stluxe">
        <a className="mct-tanem-footer" href="https://tanem.ru/" target="_blank" rel="noopener noreferrer">
          <strong>TANEM.ru</strong>
          <span>Цифровой офис для салонов красоты</span>
        </a>
      </footer>`,
  "replace Yulia footer with STLuxe TANEM footer",
);

/* 4. In the contact grid replace only the Dikidi secondary tile with WhatsApp.
   The primary online booking button remains Dikidi. */
replaceRequired(
  '<a className="mct-final-secondary" href={bookingUrl} target="_blank" rel="noopener noreferrer">',
  `<a className="mct-final-secondary is-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">`,
  "Dikidi contact href to WhatsApp",
);
replaceRequired(
  '<span className="mct-contact-copy"><strong>Dikidi</strong><small>Онлайн-запись</small></span>',
  '<span className="mct-contact-copy"><strong>WhatsApp</strong><small>Написать Юлии</small></span>',
  "Dikidi contact text to WhatsApp",
);
source = source.split("<strong>Личный Telegram</strong>").join("<strong>Telegram</strong>");

/* 5. Header monogram is plain typography, not the supplied logo image. */
replaceRequired(
  '<a className="mct-brand mct-brand-yulia-logo" href="#mobile-top" aria-label="Юлия Ролева, наверх"><span className="mct-brand-logo-crop" aria-hidden="true"><img src="/Yulia-Roleva/assets/yulia/logo.webp" alt="" /></span></a>',
  '<a className="mct-brand mct-brand-yulia-text" href="#mobile-top" aria-label="Юлия Ролева, наверх">ЮР</a>',
  "plain ЮР header monogram",
);

css += `

/* Yulia v2 — STLuxe service styling without changing Tahmina section backgrounds. */
.mct-brand-yulia-logo,
.mct-brand-logo-crop { display: none !important; }

.mct-brand-yulia-text {
  display: inline-flex !important;
  align-items: center;
  width: auto !important;
  height: auto !important;
  overflow: visible !important;
  font: 600 clamp(26px, 7vw, 31px)/1 "Cormorant Garamond", Georgia, serif !important;
  letter-spacing: -.025em !important;
  color: var(--ink) !important;
  text-decoration: none !important;
}

/* STLuxe service-row hierarchy adapted to Yulia's existing component names. */
.mct-service-list {
  margin-top: 18px !important;
  border-top: 1px solid rgba(55,47,42,.18) !important;
}

.mct-service-row {
  min-height: 84px !important;
  grid-template-columns: minmax(0,1fr) 118px !important;
  gap: 16px !important;
  align-items: center !important;
  border-bottom: 1px solid rgba(55,47,42,.18) !important;
}

.mct-service-name {
  min-width: 0 !important;
  padding: 13px 0 !important;
}

.mct-service-name > strong {
  display: -webkit-box !important;
  -webkit-box-orient: vertical !important;
  -webkit-line-clamp: 2 !important;
  overflow: hidden !important;
  color: #171513 !important;
  font: 600 18px/1.15 "Cormorant Garamond", Georgia, serif !important;
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

.mct-service-action {
  align-self: center !important;
  display: block !important;
  margin: 0 !important;
  text-align: right !important;
}

.mct-service-action > a {
  display: none !important;
}

.mct-service-action b {
  color: #171513 !important;
  white-space: nowrap !important;
  font: 500 23px/1 "Cormorant Garamond", Georgia, serif !important;
  letter-spacing: .005em !important;
}

/* Grouped services copy STLuxe grouped spacing: title -> variants directly, no separator line. */
.mct-service-row.has-variants {
  min-height: 84px !important;
  display: block !important;
  padding: 13px 0 !important;
  border-bottom: 1px solid rgba(55,47,42,.18) !important;
}

.mct-service-row.has-variants .mct-service-name {
  padding: 0 !important;
}

.mct-service-row.has-variants .mct-service-name > strong {
  font: 600 18px/1.15 "Cormorant Garamond", Georgia, serif !important;
}

.mct-service-row.has-variants .mct-service-action {
  display: none !important;
}

.mct-service-variants {
  display: grid !important;
  gap: 5px !important;
  margin-top: 8px !important;
  padding: 0 !important;
  border: 0 !important;
}

.mct-service-variant {
  min-height: 0 !important;
  display: flex !important;
  align-items: baseline !important;
  justify-content: space-between !important;
  gap: 10px !important;
  padding: 0 !important;
  border: 0 !important;
}

.mct-service-variant > span {
  min-width: 0 !important;
  color: #81766f !important;
  font: 400 10px/1.35 "Manrope", Arial, sans-serif !important;
}

.mct-service-variant > span small {
  display: inline !important;
  margin: 0 0 0 7px !important;
  color: #91857d !important;
  font: 400 9px/1.35 "Manrope", Arial, sans-serif !important;
}

.mct-service-variant b {
  flex: 0 0 auto !important;
  color: #171513 !important;
  white-space: nowrap !important;
  font: 500 20px/1 "Cormorant Garamond", Georgia, serif !important;
  letter-spacing: .005em !important;
}

/* WhatsApp contact tile: use WhatsApp visual language, without changing the grid layout. */
.mct-final-secondary.is-whatsapp .mct-contact-icon {
  position: relative;
  background: #e9f7f0 !important;
  color: #128c7e !important;
}
.mct-final-secondary.is-whatsapp .mct-contact-icon svg { display: none !important; }
.mct-final-secondary.is-whatsapp .mct-contact-icon::before {
  content: "";
  width: 19px;
  height: 19px;
  display: block;
  border: 1.8px solid currentColor;
  border-radius: 50%;
  box-sizing: border-box;
}
.mct-final-secondary.is-whatsapp .mct-contact-icon::after {
  content: "";
  position: absolute;
  left: 10px;
  bottom: 9px;
  width: 6px;
  height: 6px;
  border-left: 1.8px solid currentColor;
  border-bottom: 1.8px solid currentColor;
  transform: rotate(-18deg);
}

/* Replace the former Yulia identity footer with STLuxe's TANEM footer treatment. */
.dct-footer.dct-footer-stluxe {
  display: block !important;
  height: auto !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
}

.mct-tanem-badge { display: none !important; }

.mct-tanem-footer {
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

.mct-tanem-footer strong {
  color: #fff !important;
  font: 500 23px/1 "Cormorant Garamond", Georgia, serif !important;
}

.mct-tanem-footer span {
  max-width: 185px !important;
  color: #d6cec8 !important;
  text-align: right !important;
  font: 400 10px/1.35 "Manrope", Arial, sans-serif !important;
}

@media (max-width: 370px) {
  .mct-service-row { grid-template-columns: minmax(0,1fr) 108px !important; gap: 12px !important; }
  .mct-service-name > strong,
  .mct-service-row.has-variants .mct-service-name > strong { font-size: 17px !important; }
  .mct-service-action b { font-size: 22px !important; }
  .mct-service-variant b { font-size: 19px !important; }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Yulia v2 refinements applied.");
