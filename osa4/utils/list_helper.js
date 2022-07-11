// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  const likes = blogs.map(each => each.likes)

  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  const fav = [...blogs].sort((a, b) => b.likes - a.likes)[0] // blogs sorted in descending order by likes

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const authors = blogs.map(each => each.author)
  const map = authors.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map) // Map(author => blog count)
  const most = [...map.entries()].sort((a, b) => b[1] - a[1])[0] // pairs [author, blog count] sorted in descending order

  return {
    author: most[0],
    blogs: most[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const authors = blogs.map(each => each.author)
  const map = new Map
  const countLikes = (of_author) => { // function that counts the likes of a single author
    return blogs
      .filter(each => each.author === of_author)
      .map(each => each.likes)
      .reduce((a, b) => a + b, 0)
  }

  authors.map(each => map.set(each, countLikes(each))) // initialise the Map as Map(author => like count)
  const most = [...map.entries()].sort((a, b) => b[1] - a[1])[0] // pairs [author, like count] sorted in descending order

  return {
    author: most[0],
    likes: most[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}