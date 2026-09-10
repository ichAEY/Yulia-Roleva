import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRegexRequired(pattern, replacement, label) {
  if (!pattern.test(source)) throw new Error(`Yulia desktop marker not found: ${label}`);
  pattern.lastIndex = 0;
  source = source.replace(pattern, replacement);
}

/* Desktop hero: use Julia's second supplied portrait (IMG_2962 / master.webp).
   Mobile hero stays untouched because the desktop portrait is hidden there. */
replaceRegexRequired(
  /(<figure className="dct-hero-portrait">\s*<img src=")[^"]+(" alt="[^"]*" \/>)/,
  '$1/assets/yulia/master.webp$2',
  "desktop hero portrait",
);

css += `

/* Yulia desktop — desktop-only composition based on the Tahmina structure. */
@media (min-width: 768px) {
  /* Keep the existing desktop composition active. */
  .mct-mobile {
    display: block !important;
  }

  .dct-desktop {
    display: none !important;
  }

  /* HERO: real second portrait on the right, fully visible. */
  .mct-yulia-tools {
    display: none !important;
  }

  .mct-hero-visual {
    position: relative !important;
    overflow: hidden !important;
    pointer-events: none !important;
    background: transparent !important;
  }

  .dct-hero-portrait {
    position: absolute !important;
    inset: 0 !important;
    display: block !important;
    overflow: hidden !important;
    border: 0 !important;
    border-radius: 0 !important;
    background: #f3eee8 !important;
    box-shadow: none !important;
  }

  .dct-hero-portrait::after {
    display: none !important;
    content: none !important;
  }

  .dct-hero-portrait img {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center 38% !important;
    filter: none !important;
  }

  .dct-hero-portrait figcaption {
    display: none !important;
  }

  /* HERO fine tuning requested for the desktop first screen only. */
  .mct-hero-content h1,
  .mct-hero-content .mct-hero-copy {
    position: relative !important;
    top: -22px !important;
  }

  .mct-hero-actions {
    display: grid !important;
    grid-template-columns: auto minmax(0, 1fr) !important;
    width: 100% !important;
    gap: 0 !important;
    align-items: center !important;
  }

  .mct-quiet-link {
    justify-self: center !important;
  }

  /* PORTFOLIO: every visible photo is a real clickable button on desktop. */
  .mct-work-grid,
  .dct-film-strip,
  .dct-gallery-viewport,
  .dct-film-track,
  .dct-film-set,
  .dct-film-frames {
    pointer-events: auto !important;
  }

  .mct-work-tile,
  .dct-film-frame,
  .mct-gallery-image {
    position: relative !important;
    cursor: zoom-in !important;
    pointer-events: auto !important;
  }

  .mct-work-tile:focus-visible,
  .dct-film-frame:focus-visible,
  .mct-gallery-image:focus-visible {
    outline: 2px solid rgba(113,91,83,.55) !important;
    outline-offset: 4px !important;
  }

  /* Same lightbox interaction as mobile, but sized correctly for a computer screen. */
  .mct-lightbox {
    position: fixed !important;
    z-index: 500 !important;
    inset: 0 !important;
    display: grid !important;
    grid-template-columns: 64px minmax(0, 1080px) 64px !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 20px !important;
    padding: 34px 48px !important;
    overflow: hidden !important;
    background: rgba(25,21,19,.88) !important;
    backdrop-filter: blur(16px) !important;
  }

  .mct-lightbox-figure {
    grid-column: 2 !important;
    display: grid !important;
    width: min(78vw, 1080px) !important;
    max-width: 1080px !important;
    max-height: 90vh !important;
    margin: 0 !important;
    overflow: hidden !important;
    border-radius: 22px !important;
    background: #161311 !important;
    box-shadow: 0 28px 80px rgba(0,0,0,.34) !important;
  }

  .mct-lightbox-image-stage {
    display: grid !important;
    min-height: 0 !important;
    max-height: calc(90vh - 66px) !important;
    place-items: center !important;
    overflow: hidden !important;
    background: #161311 !important;
  }

  .mct-lightbox-image-stage img {
    display: block !important;
    width: auto !important;
    max-width: 100% !important;
    height: auto !important;
    max-height: calc(90vh - 66px) !important;
    object-fit: contain !important;
    user-select: none !important;
  }

  .mct-lightbox-figure figcaption {
    display: flex !important;
    min-height: 58px !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 20px !important;
    padding: 14px 18px !important;
    color: rgba(255,255,255,.78) !important;
    font: 500 11px/1.4 "Manrope", Arial, sans-serif !important;
  }

  .mct-lightbox-figure figcaption small {
    color: rgba(255,255,255,.48) !important;
    white-space: nowrap !important;
  }

  .mct-lightbox-close {
    position: absolute !important;
    z-index: 3 !important;
    top: 22px !important;
    right: 26px !important;
    display: grid !important;
    width: 44px !important;
    height: 44px !important;
    place-items: center !important;
    padding: 0 !important;
    border: 1px solid rgba(255,255,255,.2) !important;
    border-radius: 50% !important;
    background: rgba(255,255,255,.08) !important;
    color: #fff !important;
    font: 300 28px/1 Arial, sans-serif !important;
    cursor: pointer !important;
  }

  .mct-lightbox-nav {
    position: relative !important;
    inset: auto !important;
    display: grid !important;
    width: 52px !important;
    height: 52px !important;
    place-items: center !important;
    padding: 0 !important;
    border: 1px solid rgba(255,255,255,.18) !important;
    border-radius: 50% !important;
    background: rgba(255,255,255,.08) !important;
    color: #fff !important;
    font: 300 32px/1 Arial, sans-serif !important;
    cursor: pointer !important;
  }

  .mct-lightbox-prev { grid-column: 1 !important; }
  .mct-lightbox-next { grid-column: 3 !important; }
  .mct-lightbox-hint { display: none !important; }

  .mct-lightbox-gallery-cta {
    position: absolute !important;
    left: 50% !important;
    bottom: 18px !important;
    z-index: 4 !important;
    transform: translateX(-50%) !important;
    min-height: 40px !important;
    padding: 0 17px !important;
    border: 1px solid rgba(255,255,255,.2) !important;
    border-radius: 999px !important;
    background: rgba(28,24,22,.72) !important;
    color: #fff !important;
    font: 600 10px/1 "Manrope", Arial, sans-serif !important;
    cursor: pointer !important;
  }

  /* Full gallery opened from the lightbox/button also works on desktop. */
  .mct-gallery-overlay {
    position: fixed !important;
    z-index: 480 !important;
    inset: 0 !important;
    display: block !important;
    overflow-y: auto !important;
    padding: 0 0 56px !important;
    background: #f7f2ed !important;
  }

  .mct-gallery-top {
    position: sticky !important;
    z-index: 5 !important;
    top: 0 !important;
    display: flex !important;
    min-height: 72px !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 max(40px, calc((100vw - 1280px) / 2)) !important;
    border-bottom: 1px solid rgba(65,52,47,.12) !important;
    background: rgba(247,242,237,.94) !important;
    backdrop-filter: blur(14px) !important;
  }

  .mct-gallery-top strong {
    font: 500 32px/1 "Cormorant Garamond", Georgia, serif !important;
  }

  .mct-gallery-close {
    width: 42px !important;
    height: 42px !important;
    border: 0 !important;
    border-radius: 50% !important;
    background: rgba(65,52,47,.08) !important;
    color: #332d2a !important;
    font-size: 26px !important;
    cursor: pointer !important;
  }

  .mct-gallery-content {
    width: min(calc(100% - 80px), 1280px) !important;
    margin: 42px auto 0 !important;
  }

  .mct-gallery-content h3 {
    margin: 0 0 20px !important;
    font: 500 42px/1 "Cormorant Garamond", Georgia, serif !important;
  }

  .mct-gallery-works {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: 14px !important;
  }

  .mct-gallery-works .mct-gallery-image {
    overflow: hidden !important;
    border-radius: 18px !important;
    background: #e9dfd8 !important;
  }

  .mct-gallery-works img {
    display: block !important;
    width: 100% !important;
    aspect-ratio: .82 !important;
    object-fit: cover !important;
  }

  /* SERVICES: same categories and hierarchy as mobile/Tahmina, laid out for desktop. */
  .mct-tabs-scroll {
    display: block !important;
    width: 100% !important;
    margin: 26px 0 22px !important;
    padding: 4px !important;
    overflow: hidden !important;
    border-radius: 999px !important;
    background: #eee5df !important;
  }

  .mct-tabs-track {
    display: grid !important;
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
    width: 100% !important;
    min-width: 0 !important;
    gap: 4px !important;
    padding: 0 !important;
    background: transparent !important;
  }

  .mct-tab-divider {
    display: none !important;
  }

  .mct-tab-all,
  .mct-tabs-scroll .mct-tab {
    display: inline-flex !important;
    width: 100% !important;
    min-width: 0 !important;
    min-height: 48px !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 14px !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: transparent !important;
    color: #5d5652 !important;
    font: 600 11px/1 "Manrope", Arial, sans-serif !important;
    white-space: nowrap !important;
    cursor: pointer !important;
  }

  .mct-tabs-scroll .mct-tab.is-active {
    background: #fff !important;
    color: #282321 !important;
    box-shadow: 0 5px 16px rgba(69,54,48,.08) !important;
  }

  .mct-service-list {
    margin-top: 0 !important;
    border-top: 0 !important;
  }

  .mct-service-row.yulia-price-row,
  .mct-service-row.yulia-price-row.has-variants,
  .mct-service-row.yulia-price-row.stl-grouped-service {
    display: block !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 28px 0 29px !important;
    border-bottom: 1px solid rgba(55,47,42,.15) !important;
  }

  .mct-service-row.yulia-price-row.has-group-label {
    margin-top: 38px !important;
    padding-top: 0 !important;
  }

  .mct-service-row.yulia-price-row.has-group-label:first-child {
    margin-top: 8px !important;
  }

  .mct-service-group-label {
    display: flex !important;
    width: 100% !important;
    align-items: center !important;
    gap: 14px !important;
    margin: 0 0 24px !important;
    color: #806b62 !important;
    font: 600 10px/1 "Manrope", Arial, sans-serif !important;
    letter-spacing: .15em !important;
    text-transform: uppercase !important;
  }

  .mct-service-group-label::after {
    display: block !important;
    height: 1px !important;
    flex: 1 1 auto !important;
    background: rgba(65,52,47,.13) !important;
    content: "" !important;
  }

  .yulia-service-body {
    width: 100% !important;
    min-width: 0 !important;
  }

  .yulia-service-head {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) 190px !important;
    align-items: baseline !important;
    gap: 42px !important;
    width: 100% !important;
  }

  .yulia-price-row.has-variants .yulia-service-head {
    grid-template-columns: minmax(0, 1fr) !important;
    gap: 0 !important;
  }

  .yulia-service-title {
    display: block !important;
    min-width: 0 !important;
    max-width: 100% !important;
    overflow: visible !important;
    color: #171513 !important;
    font: 600 clamp(25px, 2.1vw, 31px)/1.12 "Cormorant Garamond", Georgia, serif !important;
    letter-spacing: -.012em !important;
    white-space: normal !important;
    -webkit-line-clamp: unset !important;
    -webkit-box-orient: initial !important;
  }

  .yulia-service-price {
    display: block !important;
    width: 190px !important;
    text-align: right !important;
    color: #171513 !important;
    font: 600 25px/1 "Cormorant Garamond", Georgia, serif !important;
    white-space: nowrap !important;
  }

  .yulia-service-description,
  .yulia-contouring-detail {
    display: block !important;
    max-width: 760px !important;
    margin: 8px 0 0 !important;
    color: #81766f !important;
    font: 400 11px/1.55 "Manrope", Arial, sans-serif !important;
    white-space: normal !important;
  }

  .yulia-service-time {
    display: block !important;
    margin-top: 8px !important;
    color: #948981 !important;
    font: 400 10px/1.4 "Manrope", Arial, sans-serif !important;
  }

  .yulia-service-variants {
    display: grid !important;
    gap: 0 !important;
    width: 100% !important;
    max-width: 860px !important;
    margin-top: 18px !important;
    border-top: 1px solid rgba(55,47,42,.10) !important;
  }

  .yulia-service-variant {
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) 190px !important;
    align-items: baseline !important;
    gap: 42px !important;
    width: 100% !important;
    padding: 11px 0 !important;
    border-bottom: 1px solid rgba(55,47,42,.08) !important;
  }

  .yulia-service-variant:last-child {
    border-bottom: 0 !important;
  }

  .yulia-service-variant > span {
    min-width: 0 !important;
    color: #5f5752 !important;
    font: 500 12px/1.4 "Manrope", Arial, sans-serif !important;
  }

  .yulia-service-variant > span small {
    display: inline !important;
    margin-left: 9px !important;
    color: #948981 !important;
    font: 400 10px/1.35 "Manrope", Arial, sans-serif !important;
    white-space: nowrap !important;
  }

  .yulia-service-variant > b {
    display: block !important;
    width: 190px !important;
    text-align: right !important;
    color: #171513 !important;
    font: 600 21px/1 "Cormorant Garamond", Georgia, serif !important;
    white-space: nowrap !important;
  }

  .mct-service-list.is-collapsed > .mct-service-row.yulia-price-row:nth-child(n + 10) {
    display: none !important;
  }

  .mct-more-services {
    display: flex !important;
    width: min(100%, 420px) !important;
    min-height: 48px !important;
    margin: 24px auto 0 !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 9px !important;
    border: 1px solid rgba(87,68,61,.14) !important;
    border-radius: 999px !important;
    background: #f0e7e1 !important;
    color: #3f3936 !important;
    font: 600 11px/1 "Manrope", Arial, sans-serif !important;
    cursor: pointer !important;
  }

  /* REVIEWS: desktop uses the exact same real review array as mobile, without fake summary cards. */
  .mct-review-card {
    width: 410px !important;
    min-height: 285px !important;
    height: auto !important;
    max-height: none !important;
    padding: 28px 28px 24px !important;
    overflow: visible !important;
  }

  .mct-review-card blockquote {
    display: block !important;
    max-height: none !important;
    overflow: visible !important;
    -webkit-line-clamp: unset !important;
    -webkit-box-orient: initial !important;
    font-size: 22px !important;
    line-height: 1.3 !important;
  }

  .mct-review-card i {
    position: static !important;
    margin-top: auto !important;
  }

  /* TANEM: exact centered mobile badge treatment on desktop too. */
  .mct-stluxe-footer {
    width: 100% !important;
    min-height: 104px !important;
    height: auto !important;
    margin: -1px 0 0 !important;
    padding: 16px 24px 18px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    border: 0 !important;
    background: #171513 !important;
    color: #fff !important;
    text-align: center !important;
    text-decoration: none !important;
  }

  .mct-stluxe-footer .stl-tanem-mark {
    display: grid !important;
    width: 31px !important;
    height: 31px !important;
    place-items: center !important;
    border: 1px solid rgba(255,255,255,.34) !important;
    border-radius: 9px !important;
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

@media (min-width: 768px) and (max-width: 1040px) {
  .mct-shell {
    width: min(calc(100% - 48px), 1120px) !important;
  }

  .mct-hero > .mct-shell {
    grid-template-columns: minmax(330px, .9fr) minmax(360px, 1.1fr) !important;
    column-gap: 34px !important;
  }

  .mct-hero h1 {
    font-size: clamp(50px, 6vw, 64px) !important;
  }

  .mct-tabs-track {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }

  .mct-tabs-scroll .mct-tab {
    padding-inline: 8px !important;
    font-size: 10px !important;
  }

  .yulia-service-head,
  .yulia-service-variant {
    grid-template-columns: minmax(0, 1fr) 160px !important;
    gap: 26px !important;
  }

  .yulia-service-price,
  .yulia-service-variant > b {
    width: 160px !important;
  }

  .mct-gallery-works {
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Yulia desktop refinements applied");
