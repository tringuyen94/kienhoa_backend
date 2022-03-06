const express = require('express')
const { authentication } = require('../../../middlewares/auth.middlewares')
const uploadImage = require('../../../middlewares/upload.middlewares')
const router = express.Router()
const PostController = require('./post.controller')



//GET REQUEST
router.get('/get-tags', PostController.getTags)
router.get('/get-posts', PostController.getPosts)
router.get('/get-post-by-title/:titleSlug', PostController.getPostByTitle)
router.get('/sort-tags-sorted-by-time', PostController.sortPostsByTime)
router.get('/get-posts-by-tag', PostController.getPostByTag)
//POST REQUEST
router.post('/create-post', authentication, uploadImage('postThumb'), PostController.createPost)
router.post('/create-tags', authentication, PostController.createTags)

//PUT REQUEST
router.put('/update-post-by-id/:postId', PostController.updatePostById)
router.put('/update-postthumb-by-id/:postId', uploadImage('postThumb'), PostController.updatePostThumbById)

//DELETE REQUEST
router.delete('/delete-post-by-id/:postId', authentication, PostController.deletePostById)

module.exports = router