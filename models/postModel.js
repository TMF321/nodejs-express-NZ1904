// 帖子模型文件

// 引入已经连接到MongoDB 的 mongoose
const mongoose = require("../config/db");

//定义 schema
const postSchema = new mongoose.Schema(
    {
        // title: String

        /**
         * 帖子标题
         *  type:String   类型
         * required: true 必填项
        */

        title: { type: String ,required: true},

        /**
         * 帖子内容
        */
       content: {type: String ,required: true}
    },{
        // timestamps: true, 会多出两个字段 createdAt   updatedAt
        timestamps: true
    }
)

//创建模型
const PostModel = mongoose.model("post" , postSchema);

//暴露模型
module.exports = PostModel;
