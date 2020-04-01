# nodejs-express-NZ1904

## 一、项目起步

1. 创建了远程仓库
2. 克隆到本地电脑
3. 做一些项目初始化的一些操作
4. 创建一个 .gitignore 文件，对不需要版本管理的文件做忽略
5. 基本机构搭建好之后，做一次版本提交

## 二、项目目录结构介绍

## 三、MVC 的架构模式

1. M model 数据层
2. V view 视图层
3. C controller 控制层

## 四、接口文档

#### 使用步骤

1. 安装 apidoc

```bash
$ npm install apidoc
```

apidoc 提供了一个 apidoc 的命令，可以通过 apidoc -v 去验证。

由于这块我们是本地安装，要验证 apidoc 命令的话有如下三种方式：

    - cd node_modules/.bin 再去 apidoc -v
    - npx apidoc -v   (npx 是 npm 5.x 版本之后提供的一个命令)
    - package.json 中写脚本

2. 在每一个路由代码前写上 apidoc 规定的注释信息
3. 在项目根目录下创建一个 apidoc.json 文件，配置 api 接口文档的一些描述信息
4. 通过 apidoc 的命令去生成 api 接口文档

```bash
$ apidoc -i 写注释的路径 -o 文档输出路径

$ apidoc -i ./routers -o ./public/docs
```

5. 访问文档

## 五、重构与改进

### 1. 期待能够统一的去做错误处理

在 sever.js 定义一个错误处理中间件。 放在最后


```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
```

为了能够处理 async await 产生的异常，还需要去使用一个依赖包
express-async-errors


```bash
$ npm install express-async-errors
```

在server.js 中头午引入这个包即可

## 六、api 接口的校验

创建帖子时，必须登录才可以创建。对后端的 api 接口来说，也就是必须在请求头中携带一个 token 。我们校验 token 是否 OK.

ok 的话才允许你创建帖子。

否则不能创建帖子，并返回 401 状态码

## 七、每个帖子需要有一个作者

数据库集合间的关系问题

一个帖子属于一个用户

一个用户可以拥有多个帖子



mongodb 是一种非关系型数据库。能实现集合间的关系吗？

MongoDB 3.2 之后，也有像 sql 里 join 的聚合操作，那就是 [$lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/) 

而 Mongoose，拥有更强大的 populate()



帖子表

| id   | title | content | userId |
| ---- | ----- | ------- | ------ |
| 1    | 早餐  | 西瓜    | 2      |
| 2    | 午餐  | 香蕉    | 1      |
| 3    | 晚餐  | 屁      | 3      |

用户表

| id   | username | password |
| ---- | -------- | -------- |
| 1    | admin    | admin    |
| 2    | zhangsan | 123456   |
| 3    | lisi     | 123456   |

## 八、问题1

? 思考前端已经做了创建页面的展示权限（如果没有的登录的话，创建页面是进不去的）。前端已经做了这个限制之后，没什么后端的api接口也需要去做限制呢（jwt）

! 可以绕过前端页面直接通过一些请求模拟工具（postman）直接对 api接口发请求。那这样就不安全了。