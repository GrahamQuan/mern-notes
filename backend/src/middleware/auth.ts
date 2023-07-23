import type { RequestHandler } from 'express'
import createHttpError from 'http-errors'

export const authenticate: RequestHandler = (req, res, next) => {
  // console.log('req.session', req.session)
  if (req.session.userId) {
    next()
  } else {
    throw createHttpError(401, 'User not authenticated')
  }
}
