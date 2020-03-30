const UserModel = require("../models/userModel");

exports.register = async (req, res) => {
    //要获取前端传递过来的用户信息 body
   // const {email ,password, nickname} = req.body;

  // Model.create() 写入数据库

  // 1. await UserModel.create(req.body);
  //
  // 2. await UserModel.create(
  //   Object.assign({}, req.body, {
  //     password: bcryptjs.hashSync(req.body.password, 10)
  //   })
  // );
  // 上面代码可以1可以不用修改为2. 而是在 userSchema 去提供一个 钩子函数，详见
  // modes/userModel.js

  await UserModel.create(req.body);

  //响应
  res.send({ code: 0, msg: "注册成功"})
} 

exports.login = (req,res) =>{
    res.send("用户登录")
}