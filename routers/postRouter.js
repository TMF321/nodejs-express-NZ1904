// post 路由文件

// 引入 express
const express = require ("express")

//引入 postController

const {
    index,
    create,
    update,
    remove
} = require("../controllers/postController")

// 生成 express.Router 的实例

const router = express.Router();

/**
 * @api {get} /posts 获取帖子列表
 * @apiName index
 * @apiGroup Post
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {Array} data 帖子数组.
 */
router.get("/", index);

/**
 * @api {post} http://localhost:3000/posts 创建一个帖子
 * @apiName create
 * @apiGroup Post
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.post("/", create);

/**
 * @api {put} http://localhost:3000/posts/:id 编辑帖子
 * @apiName update
 * @apiGroup Post
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.put("/:id", update);

/**
 * @api {delete} http://localhost:3000/posts/:id 删除帖子
 * @apiGroup Post
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.delete("/:id", remove);


//暴露 router 的实例
module.exports = router;