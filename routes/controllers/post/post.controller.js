const Post = require('../../../models/post.models')
const slugify = require('slugify')
const Tag = require('../../../models/tag.models')




//GET REQUESTS

const getPosts = (req, res, next) => {
   Post.find()
      .populate('postedBy')
      .then(posts => res.status(200).json(posts))
      .catch(err => res.status(500).json({ err, message: "Lấy thông tin bài viết thất bại" }))
}
const getTags = (req, res, next) => {
   Tag.find()
      .then(tags => res.status(200).json(tags))
      .catch(err => res.status(500).json({ err, message: "Lấy tag thất bại" }))

}
const getPostByTitle = (req, res, next) => {
   const { titleSlug } = req.params
   Post.findOne({ titleSlug })
      .populate('postedBy')
      .then(post => res.status(200).json(post))
      .catch(err => res.status(500).json({ err, message: "Thất bại" }))
}

const getPostByTag = (req, res, next) => {
   const { tagName } = req.query
   Post.find({ tags: tagName })
      .populate('postedBy')
      .then(posts => res.status(200).json(posts))
      .catch(err => res.status(500).json(err))

}

const sortPostsByTime = (req, res, next) => {
   Post.find().sort({ createdAt: -1 })
      .populate('postedBy')
      .then(sortedPosts => res.status(200).json(sortedPosts))
      .catch(err => res.status(500).json({ err, message: "Thất bại" }))
}

// POST REQUEST
const createTags = (req, res, next) => {
   const { tagName } = req.body
   Tag.findOne({ tagName })
      .then(tag => {
         if (tag) return Promise.reject({ status: 409, message: "Tag này đã tồn tại rồi" })
         let _tag = new Tag({ tagName, slugTag: slugify(tagName).toLowerCase() })
         return _tag.save()
      })
      .then(newTag => res.status(201).json(newTag))
      .catch(err => {
         if (err.status) return res.status(err.status).json(err.messages)
         return res.status(500).json({ err, message: "Thêm tag thất bại" })
      })
}
const createPost = (req, res, next) => {
   const postedBy = req.user._id
   const postThumb = req.file.path.substring(8)
   const { title, content, tags } = req.body
   const titleSlug = slugify(title.toLowerCase())
   Post.findOne({ titleSlug })
      .then(post => {
         if (post) return Promise.reject({ status: 409, message: "Tiêu đề đã tồn tại" })
         let _post = new Post({ title, postedBy, titleSlug, postThumb, tags: tags.split(","), content })
         return _post.save()
      })
      .then(newPost => res.status(201).json(newPost))
      .catch(err => {
         if (err.status) return res.status(err.status).json({ message: err.message })
         return res.status(500).json({ err, message: "Tạo bài viết thất bại" })
      })
}


//PUT REQUEST
const updatePostById = (req, res, next) => {
   const { postId } = req.params
   const { title, content, tags } = req.body
   Post.updateOne({ _id: postId }, { title, titleSlug: slugify(title.toLowerCase()), content, tags })
      .then(updated => res.status(204).json(updated))
      .catch(err => res.status(500).json(err))
}
const updatePostThumbById = (req, res, next) => {
   const { postId } = req.params
   const postThumb = req.file.path.substring(8)
   Post.updateOne({ _id: postId }, { postThumb })
      .then(updated => res.status(204).json(updated))
      .catch(err => res.status(500).json(err))
}
//DELETE REQUEST 

const deletePostById = (req, res, next) => {
   const { postId } = req.params
   Post.deleteOne({ _id: postId })
      .then(result => res.status(202).json({ result, message: "Đã xoá" }))
      .catch(err => res.status(500).json({ err, message: "Xoá thất bại" }))
}





module.exports =
{
   createPost, getPosts, getPostByTitle,
   getTags, createTags, sortPostsByTime, getPostByTag,
   updatePostById, updatePostThumbById, deletePostById
}