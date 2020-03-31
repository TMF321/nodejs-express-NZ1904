//引入 express
const express = require('express');

// 引入 express-async-errors
require('express-async-errors');

//引入 抽离出去的路由文件
const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');

//实例化一个express的实例
const app = express();

//req.body 中间件处理

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//静态资源托管处理
app.use(express.static('./public'));

//调用路由文件，并设置好前缀
app.use('/posts',postRouter);
app.use(userRouter);


//统一错误处理
app.use((err, req, res, next) => {
    //可以将错误信息写入到某个文件中，方便后续去查看文件
    //fs 模块 fs.writeFile
    // 不能使用 fs.writeFile 要用 fs.appendFile
    console.log(err);
    res.status(500).send(err.message);
})

//监听端口，启动服务
app.listen(7778,() => {
    console.log('服务启动成功');
})