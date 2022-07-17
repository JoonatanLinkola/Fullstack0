const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  logger.error('JOOOO', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {

  const authorization = request.get('authorization')
  request.token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null

  next()
}

const userExtractor = async (request, response, next) => {
  // eslint-disable-next-line no-undef
  const decodedToken = jwt.decode(request.token, process.env.SECRET)
  const userId = decodedToken
    ? decodedToken.id
    : null
  request.user = await User.findById(userId)

  next()
}

module.exports = {
  errorHandler, tokenExtractor, userExtractor
}