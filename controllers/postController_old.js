// 帖子控制器，暴露一系列中间件方法给到帖子的路由去使用

//引入 PostModel
const PostModel = require("../models/postModel");
const jsonwebtoken = require('jsonwebtoken');

/**
 * 查询帖子
*/

exports.index = async(req, res) => {
    // //Model.find()
    // try {
    //     const data = await PostModel.find();
    //     res.send({ code: 0, msg: '成功', data: data});
    // }catch(error){
    //   console.log(error);
    //   res.send({code: -1, msg: '失败'});
    // }

    // 获取前端传递过来的分页的数据 pageNum 、pageSize query
    const pageNum = parseInt(req.query.pageNum) || 1; //页码
    const pageSize = parseInt(req.query.pageSize) || 2; //每页显示条数
    // 获取前端传递过来的搜索数据 title
    const title = req.query.title;

  //查询数据库 Model。find().skip((pageNum -1)*pageSize).limit(pageSize)
  // /title/ 这样是去模糊搜索 标题中包含有  title 这个字符串的数据
  // 而我们想要的是 标题中包含有 title 这个变量所代表的值 的数据
  // 这时需要使用正则对象来生成正则表达式 title = 张三  new RegExp(title) => /张三/
  //                                   title = 李四  new RegExp(title) => /李四/
  // 为什么这里用这种模板字符串不行 `/${title}/` =>  "/李四/"  这时就不是正则表达式，做的是精准匹配
  //          /`${title}`/    /"张三"/
  const data = await PostModel.find({ title: new RegExp(title)})
  .skip((pageNum - 1) * pageSize)
  .limit(pageSize);

  //前端还需要知道一共有多少页，需要后台告诉他
 //totalPage = Math.ceil(总条数 / 每页显示条数) = Math.ceil(总条数 / pageSize)
 //先计算出 total
 const total = await PostModel.find({
     title:new RegExp(title)
 }).countDocuments();

 //console.log(total);
 //在计算出 totalPage
 const totalPage = Math.ceil(total / pageSize);

 //响应
 res.send({
     code: 0,
     msg: "ok",
     data: {
         list: data,
         totalPage:totalPage
     }
 })
}


/**
 * 创建帖子
*/

// exports.create = async (req,res) => {
//     //获取前端传递过来的参数
//     const {title, content} = req.body;
    //    console.log(req.body)


      // Model.create()
  // PostModel.create({
  //   title,
  //   content
  // })
  //   .then(() => {
  //     // 成功
  //     res.send({
  //       code: 0,
  //       msg: "成功"
  //     });
  //   })
  //   .catch(error => {
  //     // 失败
  //     console.log(error);
  //     res.send({
  //       code: -1,
  //       msg: "失败"
  //     });
  //   });


//   try {
//       await PostModel.create({ title, content});
//       res.send({ code: 0, msg: '成功'});
//   } catch (error) {
//     console.log(error);
//     res.send({ code: -1, msg: "失败" });
//   }
exports.create = async (req, res) => {
   // const { title, content, userId } = req.body;
  // await PostModel.create({ title, content, userId });

  // 获取出 req.auth 中的 userId
  const { userId } = req.auth;
  req.body.userId = userId;

  await PostModel.create(req.body);
  res.send({ code: 0, msg: "成功"});
}



/**
 * 更新帖子
*/
exports.update = async (req,res) => {
    const {id} = req.params;

    //更新的内容 req.body
    // const {title, content} = req.body;

    // Model.updateOne()

    // try {
    //     // await PostModel.updateOne({ _id: id},{title:title, content:content});
    //     await PostModel.updateOne({ _id: id},req.body); //{content: '2'}
    //     res.send({code: 0 , msg: '成功'});
    // } catch (error) {
    //     console.log(error);
    //     res.send({ code: -1, msg: "失败" });
    // }

    await PostModel.updateMany({ _id: id}, req.body);
    const data = await PostModel.findOne({_id: id}); // { content: '2' }
    res.send({ code: 0, msg: "成功",data});
}


/**
 * 删除帖子
*/

exports.remove = async (req, res) => {
    //获取id
    const { id } = req.params;

    //Model.deleteOne()

    // try {
    //     await PostModel.deleteOne({ _id: id});
    //     res.send({code: 0, msg: '成功'});
    // } catch (error) {
    //     console.log(error);
    //     res.send({ code: -1, msg: "失败" });
    // }

    await PostModel.deleteOne({ _id: id });
    res.send({ code: 0, msg: "成功"});
}


/**
 * 帖子详情
*/
exports.show = async (req, res) => {
 //获取id
 const { id } = req.params;

 //Model.find() => []
//  Model.findOne() => {}

const data = await PostModel.findOne({ _id: id});
res.send({ code: 0, msg: "ok" , data});
}