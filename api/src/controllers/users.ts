import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import UserModel from '../models/users'
import bcrypt from 'bcrypt'

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const authUserId = req.session.userId
    // if (!authUserId) {
    //   throw createHttpError(401, 'Invalid credentials')
    // }
    const user = await UserModel.findById(authUserId).select('+email').exec()

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

interface SignUpBody {
  username?: string
  email?: string
  password?: string
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body
  const saltRounds = 12
  try {
    if (!username || !email || !password) {
      throw createHttpError(400, 'Parameters missing')
    }
    const existingUsername = await UserModel.findOne({ username }).exec()
    if (existingUsername) {
      throw createHttpError(409, 'username is taken, please choose a new one')
    }
    const existingEmail = await UserModel.findOne({ email }).exec()
    if (existingEmail) {
      throw createHttpError(409, 'email is taken, please choose a new one')
    }
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    })
    req.session.userId = newUser._id.toString()
    res.status(200).json(newUser)
  } catch (error) {
    next(error)
  }
}

interface LoginBody {
  email?: string
  password?: string
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      throw createHttpError(400, 'Parameters missing')
    }
    const user = await UserModel.findOne({ email })
      .select('+password +email')
      .exec()
    if (!user) {
      throw createHttpError(
        401,
        'No such user, please sign up first or check your email'
      )
    }

    const isMatchPwd = await bcrypt.compare(password, user.password)
    if (!isMatchPwd) {
      throw createHttpError(401, 'Wrong password, please try agian')
    }
    req.session.userId = user._id.toString()
    // console.log('===login', req.session)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.sendStatus(204)
    }
  })
}
