const mongoose = require('mongoose');
const dataSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        body: {type: String, required: true},
        postImg: {type: String, required: true}
    },
    { timestamps: true, versionKey: false }
)

const PostModel = mongoose.model("posts", dataSchema)
module.exports = PostModel