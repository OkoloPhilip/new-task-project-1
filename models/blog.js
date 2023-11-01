const { encodeBase64 } = require('bcryptjs')
const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: 100,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Blog', BlogSchema)
