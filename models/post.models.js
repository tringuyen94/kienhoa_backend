const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
   title: { type: String, unique: true, required: true },
   titleSlug: { type: String, unique: true, required: true },
   postThumb: { type: String, required: true },
   content: { type: mongoose.Schema.Types.Mixed, required: true },
   postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   tags: [String],
}, { timestamps: true })


const Post = mongoose.model("Post", PostSchema, "Post")

module.exports = Post