import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
let source = fs.readFileSync(componentPath, "utf8");

source = source
  .split("Юлия Ролева, мастер маникюра и педикюра Юлия Ролева").join("Юлия Ролева — эксперт по волосам")
  .split("Юлия Ролева, мастер по волосам Юлия Ролева").join("Юлия Ролева — эксперт по волосам")
  .split("Индивидуальная работа мастера").join("Эксперт по волосам")
  .split("Стрижки и педикюр от Юлии Ролевой · Балашиха").join("Эксперт по волосам · Балашиха")
  .split("Маникюр и педикюр от Юлии Ролевой · Балашиха").join("Эксперт по волосам · Балашиха");

fs.writeFileSync(componentPath, source, "utf8");
console.log("Final Yulia content cleanup applied.");
