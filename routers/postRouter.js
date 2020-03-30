// post 路由文件

// 引入 express
const express = require ("express")

//引入 postController

const {
    index,
    create,
    update,
    remove,
    show
} = require("../controllers/postController")

// 生成 express.Router 的实例

const router = express.Router();

/**
 * @api {get} /posts 查询帖子
 * @apiGroup Post
 *
 * @apiParam (query) {String} pageNum=1 页码<可选>
 * @apiParam (query) {String} pageSize=2 每页显示条数<可选>
 * @apiParam (query) {String} title 搜索关键字<可选>
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {Object} data 数据
 * @apiSuccess {Array} data[list] 帖子数据
 * @apiSuccess {Number} data[totalPage] 总的页数
 */
router.get("/", index);

/**
 * @api {post} http://localhost:7778/posts 创建一个帖子
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
 * @api {put} http://localhost:7778/posts/:id 编辑帖子
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
 * @api {delete} http://localhost:7778/posts/:id 删除帖子
 * @apiGroup Post
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.delete("/:id", remove);


/**
 * @api {get} http://localhost:3000/posts/:id 帖子详情
 * @apiGroup Post
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.get("/:id", show);


//暴露 router 的实例
module.exports = router;