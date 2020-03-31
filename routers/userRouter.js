const express = require('express');

const userController = require("../controllers/userController");

const router = express.Router();

/**
 * @api {post} http://localhost:7778/register 用户注册
 * @apiGroup 用户
 *
 * @apiParam (body) {String} email 用户邮箱
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */

router.post("/register", userController.register);

/**
 * @api {post} http://localhost:7778/login 用户登录
 * @apiGroup 用户
 *
 * @apiParam (body) {String} email 用户邮箱
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {String} token token
 */
router.post("/login", userController.login);

module.exports = router;