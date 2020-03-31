// 演示
const bcryptjs = require("bcryptjs");

const password = "123456";

const hashPassword = bcryptjs.hashSync(password, 10);

console.log(hashPassword);

// $2a$10$huH4wII8at4LMLaiy5SzH.05nuVNN/QiiAMA3x5m.MRKRfx7mqj4e
// $2a$10$iBzIUqSk/.TGsa09Uydh0O..zr7C9XWuudE/ME8lJ3MnV81rzoySi

// 校验
const isOk = bcryptjs.compareSync(
  "123456",
  "$2a$10$h123123sfsdfsdf.05nuVNN/QiiAMA3x5m.MRKRfx7mqj4e"
);

console.log(isOk);
