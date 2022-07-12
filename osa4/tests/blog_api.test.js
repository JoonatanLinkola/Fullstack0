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
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
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
  expect(blogsAtEnd).toHaveLength(helper.listWithLotsOfBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain('TEST adding valid blog')
})

test('a blog without "likes" assigned to it gets 0 likes', async () => {
  const newBlog = {
    title: 'TEST adding blog without likes',
    author: 'TEST author',
    url: 'TEST.com'
  }
  console.log('newBlog: ', newBlog)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.listWithLotsOfBlogs.length + 1)
  console.log(blogsAtEnd)

  const zeros = blogsAtEnd.map(n => n.likes).filter(n => n === 0)
  expect(zeros).toHaveLength(2) // "listWithLotsOfBlogs" has initially one blog with zero likes
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'TEST no title or url',
    likes: 7357
  }
  console.log('newBlog: ', newBlog)
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.listWithLotsOfBlogs.length)
})

test('deleting a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.listWithLotsOfBlogs.length - 1
  )

  const titles = blogsAtEnd.map(n => n.title)

  expect(titles).not.toContain(blogToDelete.content)
})

afterAll(() => {
  mongoose.connection.close()
})