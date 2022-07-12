const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  console.log('request.body: ', request.body)
  console.log('blog: ', blog)

  const savedblog = await blog.save()
  response.status(201).json(savedblog)
})

module.exports = blogsRouter