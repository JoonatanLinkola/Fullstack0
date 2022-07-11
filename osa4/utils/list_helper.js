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
  if (blogs.length === 0) return []
  // const findFavorite = (sameBlogs) => {
  //   const maxLikes = Math.max(sameBlogs.map(each => each.likes))
  //   const favorite = sameBlogs.find(each => each.likes === maxLikes)
  //   return favorite
  // }  old implementation
  const findFavorite = (sameBlogs) => {
    const favorite = [...sameBlogs].sort((a, b) => b.likes - a.likes)[0]
    return favorite
  }
  const fav = findFavorite(blogs)

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}