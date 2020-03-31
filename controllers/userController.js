const UserModel = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");

// exports.register = async (req, res) => {
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

//   await UserModel.create(req.body);

//   //响应
//   res.send({ code: 0, msg: "注册成功"})
// } 

exports.register = async (req,res) => {
    //获取email
    const { email } = req.body;
    //判断是否已经注册过，做一个查询操作，能查找到说明注册过了，查找不到说明没有注册
    const data = await UserModel.findOne({ email });
    console.log(data);
    if(data) {
        //存在，不允许再注册
        res.send({code: -1, msg: "用户已经注册了"});
    }else{
        //不存在，允许注册
        await UserModel.create(req.body);
        res.send({ code: 0, msg: "注册成功"});
    }
}

// exports.login = async (req,res) =>{
//   //获取前端传递过来的email与password
//   const { email , password} = req.body;
//   //查询数据库 email 与 password 能否匹配数据库中现有的数据
//   const data = await UserModel.findOne({ email, password});
//   //判断data是否有值
//   if(!data){
//       res.send({ code: -1, msg: "用户邮箱或密码不正确"});
//   }else{
//      res.send({ code: 0 , msg: "登录成功" , data});
//   }
// }


exports.login = async (req,res) => {
    //获取前端传递过来的email 与 password
const { email, password} = req.body;

  //根据 email 去查询数据库
  const data = await UserModel.findOne({ email});

  console.log(data);

  //判断data是否有值
  if(!data) {
       res.send({ code: -1, msg: "用户邮箱不正确"});
       return;
  }


  //校验密码是否正确  bcryptjs
  if(!data.comparePassword(password)) {
      //校验不通过
      res.send({ code: -1, msg: "密码不正确"});
      return;
  }


  //用户可以登录
  /** 
   * 生成token
  */

  const token = jsonwebtoken.sign(
      {
      //思考将那些信息写入到token中， 一般是用户角色信息、用户id信息、用户的一些敏感信息
      //不要写入太多的数据进去

      userId: data._id,
      nickname: data.nickname
    },
    "MYGOD",
    {
        expiresIn:"2h"
    }
  )

  res.send ({ code: 0,msg: "登录成功", token});
}