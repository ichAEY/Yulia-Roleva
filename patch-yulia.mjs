import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceAllRequired(from, to, label = from) {
  if (!source.includes(from)) throw new Error(`Yulia patch marker not found: ${label}`);
  source = source.split(from).join(to);
}

replaceAllRequired("Маникюр", "Стрижки", "haircut category label");
replaceAllRequired("Педикюр", "Окрашивание", "color category label");
replaceAllRequired("Подология", "Уход", "care category label");
replaceAllRequired("Обучение", "Укладка", "styling category label");

source = source.split("Тахмины").join("Юлии Ролевой");
source = source.split("Тахмину").join("Юлию Ролеву");
source = source.split("Тахмина").join("Юлия Ролева");

source = source.replace(
  "Юлия Ролева — мастер<br />Юлия Ролева",
  "Юлия Ролева — эксперт<br />по волосам",
);
source = source.replace(
  "Юлия Ролева, мастер маникюра и педикюра Юлия Ролева",
  "Юлия Ролева, мастер по волосам",
);
source = source.replace(
  "Юлия Ролева, мастер по волосам Юлия Ролева",
  "Юлия Ролева, мастер по волосам",
);
source = source.replace(
  "Подология, большая палитра и обучение мастеров",
  "Стрижки, окрашивание, уход и укладки",
);
source = source.replace(
  "Уход, большая палитра и обучение мастеров",
  "Стрижки, окрашивание, уход и укладки",
);
source = source.replace(
  "Маникюр и педикюр от Юлии Ролевой · Балашиха",
  "Эксперт по волосам · Балашиха",
);
source = source.replace(
  "Стрижки и педикюр от Юлии Ролевой · Балашиха",
  "Эксперт по волосам · Балашиха",
);
source = source.replace(
  '<div className="mct-stat"><strong>6</strong><span>оценок</span></div>',
  '<div className="mct-stat"><strong>6</strong><span>отзывов</span></div>',
);
source = source.replace(
  "6 оценок<br />Все отзывы на Яндексе →",
  "6 отзывов<br />Все отзывы в Dikidi →",
);
source = source.replace(
  "Настоящие отзывы клиентов Юлия Ролева.",
  "Настоящие отзывы клиентов Юлии Ролевой.",
);
source = source.replace(
  '<small>{review.author} · Яндекс Карты</small>',
  '<small>{review.author} · Dikidi</small>',
);
source = source.replace(
  "Выберите свободное время в календаре. Если нужно уточнить услугу, дизайн или длительность процедуры, напишите Юлии Ролевой напрямую.",
  "Выберите свободное время в Dikidi. Если нужно уточнить услугу или подобрать процедуру, напишите Юлии Ролевой напрямую.",
);
source = source.replace(
  '<div className="mct-final-contact-grid" aria-label="Все способы связи с ClayTone">',
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

css += `

/* Yulia-specific exception: no nail palette on mobile. */
@media (max-width: 767px) {
  .mct-palette-stage {
    display: none !important;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Yulia Roleva content labels applied on top of the Tahmina template.");
