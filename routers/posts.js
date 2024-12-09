const express = require('express')
const router = express.Router()

const postsController = require('../controllers/postscontroller.js')
router.get('/posts', postsController.getPosts)
router.get('/posts/:id', postsController.getId)
router.get('/:tags', postsController.getPostsByTag)
router.post(`/posts`, postsController.addPost)
router.put(`/posts/:title`, postsController.updatePost)
router.delete(`/posts/:id`, postsController.deletePost)




module.exports = router