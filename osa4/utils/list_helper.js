// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  const likes = blogs.map(each => each.likes)

  return totalLikes.length === 0
    ? 0
    : likes.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}