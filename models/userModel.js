const mongoose = require("../config/db");
const bcryptjs = require("bcryptjs");


const userSchema = new mongoose.Schema(
    {
        /**
         * 电子邮箱
        */
       email: {
           type: String,
           required: true,
           //自定义校验
           validate: {
               //校验的函数，接受的v是传递的值
               validator:function(v) {
                   //需要返回，返回为true， 校验通过
                            //返回是false， 校验不通过
                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
               },
               //校验失败时输出错误的信息
               message: "请输入正确的邮箱地址"
           }
       },

       /**
        * 用户密码
       */

       password: {type:String, required: true},

       /**
        * 用户昵称
        * default ，设置默认值，没有传递字段时，就使用默认值
       */

       nickname: {type: String, default: ""},
   
    /**
     * 用户头像地址，一个完整的url地址
    */
   avatar: {
       type: String,
       default: `${process.env.BASEURL}/assets/img/avatar.png`
      } 
    },
    {
        timestamps:true
    }
)

// 可以提供一些钩子函数，（在一些特定操作的时候会自动执行的函数）
// 下面这个代码就会在 Model.create() 也就是新创建一个 UserModel 实例的时候，会执行 callback
// callback 注意不要写成箭头函数，不然this指向会出问题
// callback 会接受到一个 next 函数，调用这个函数让代码往下流程执行。
//          代码处理完成之后，请记得一定要调用 next()
// callback 中的 this 指向的内容是当前创建的那个 文档（document）

userSchema.pre("save", function(next) {
    console.log(this);
    console.log('创建用户时进来了');


    // 对 this.password 加密之后，再赋值给 this.password
    this.password = bcryptjs.hashSync(this.password, 10);
    next();
})


//给UserModel 的实例（document） 用户 添加一个实例方法
userSchema.methods.hello = function(){
    console.log('hello');
    console.log(this);
}


/**
 * 校验密码
 * @param {string} password 原密码
*/

userSchema.methods.comparePassword = function(password) {
    // bcryptjs.compareSync(原密码，已经加密的密码)
 return bcryptjs.compareSync(password,this.password);
}

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;