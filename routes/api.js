const express = require('express')
const AuthRouter = require('./controllers/auth/auth.routes')
const PostRouter = require('./controllers/post/post.routes')
const ProjectRouter = require('./controllers/project/project.routes')
const InteriorRouter = require('./controllers/interior/interior.routes')
const ProductRouter= require('./controllers/product/product.router')
const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/posts', PostRouter)
router.use('/projects', ProjectRouter)
router.use('/interiors', InteriorRouter)
router.use('/products',ProductRouter)

module.exports = router