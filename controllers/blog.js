const Blog = require('../models/Blog')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ blogs, count: blogs.length })
}
const getBlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: blogId }
  ,} = req

  const blog = await Blog.findOne({
    _id: blogId,
    createdBy: userId,
  })
  if (!blog) {
    throw new NotFoundError(`No Blog
     with id ${blogId}`)
  }
  res.status(StatusCodes.OK).json({ blog
   })
}

const createBlog = async (req, res) => {
  req.body.createdBy = req.user.userId

  const blog = await Blog.create(req.body)
  res.status(StatusCodes.CREATED).json({ blog
   })
}

const updateBlog = async (req, res) => {
  const {
    body: { title, description,image },
    user: { userId },
    params: { id: blogId },
  } = req

  if (title === '' || description === ''|| image) {
    throw new BadRequestError('Title or Description or Image fields cannot be empty')
  }
  const blog = await Blog.findByIdAndUpdate(
    { _id: blogId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!blog) {
    throw new NotFoundError(`No Blog
     with id ${blogId}`)
  }
  res.status(StatusCodes.OK).json({ blog
   })
}

const deleteBlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: blogId },
  } = req

  const blog = await Blog.findByIdAndRemove({
    _id: blogId,
    createdBy: userId,
  })
  if (!blog) {
    throw new NotFoundError(`No Blog
     with id ${blogId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createBlog, deleteBlog,getAllBlogs,updateBlog,getBlog,
}
