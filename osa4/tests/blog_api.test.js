const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithLotsOfBlogs) // list with 6 blogs
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the right amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.listWithLotsOfBlogs.length)
})

test('blog id returned as "id" rather than "_id"', async () => {
  const response = await api.get('/api/blogs')
  console.log('JOOOO', response.body)
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const newBlog = {
    title: 'TEST adding valid blog',
    author: 'TEST author',
    url: 'TEST.com',
    likes: 7357
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain('TEST adding valid blog')
})

afterAll(() => {
  mongoose.connection.close()
})