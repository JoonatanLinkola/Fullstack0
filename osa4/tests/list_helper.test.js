const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const result = listHelper.dummy(helper.listWithZeroBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(helper.listWithZeroBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.listWithLotsOfBlogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('of empty list returns empty', () => {
    const result = listHelper.favoriteBlog(helper.listWithZeroBlogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog returns itself', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('returns favorite from a big list', () => {
    const result = listHelper.favoriteBlog(helper.listWithLotsOfBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('of empty list returns empty', () => {
    const result = listHelper.mostBlogs(helper.listWithZeroBlogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog returns its author', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('returns correct author and blog count from a big list', () => {
    const result = listHelper.mostBlogs(helper.listWithLotsOfBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('of empty list returns empty', () => {
    const result = listHelper.mostLikes(helper.listWithZeroBlogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog returns its author and likes', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('returns correct author and like countfrom a big list', () => {
    const result = listHelper.mostLikes(helper.listWithLotsOfBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})