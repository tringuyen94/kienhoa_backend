const mongoose = require('mongoose')


const TagSchema = new mongoose.Schema({
   tagName: { type: String, required: true },
   slugTag: { type: String, required: true },
})

const Tag = mongoose.model("Tag", TagSchema, "Tag")

module.exports = Tag