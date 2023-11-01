const express = require('express')

const router = express.Router()
const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
  getBlog,
} = require('../controllers/blog')

router.route('/').post(createBlog).get(getAllBlogs)

router.route('/:id').get(getBlog).delete(deleteBlog).patch(updateBlog)

module.exports = router
