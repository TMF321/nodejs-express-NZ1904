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
       content: {type: String ,required: true},
        /**
         * 用户id，关联的是 users 集合
         * 在mongoose中， 不说集合，说模型
         * 
         * type 固定用ObjectId
         *     mongoose.Schema.Types.ObjectId
         * mongoose.SchemaTypes.ObjectId
         * 
         * ref 关联的是那个模型 也就是 mongoose.model() 时传递的第一个参数
        */
       userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true}
    },{
        // timestamps: true, 会多出两个字段 createdAt   updatedAt
        timestamps: true
    }
)

//创建模型
const PostModel = mongoose.model("post" , postSchema);

//暴露模型
module.exports = PostModel;
