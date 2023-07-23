import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import notesRoutes from './routes/notes'
import usersRoutes from './routes/users'
import createHttpError, { isHttpError } from 'http-errors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import env from './util/valitadeEnv'
import { authenticate } from './middleware/auth'
const app = express()

app.use(morgan('dev'))
// decode req.body json data
app.use(express.json())

app.use(
  cors({
    // front-end and back-end using different domains
    origin: env.CLIENT_DOMAIN,
    credentials: true,
  })
)

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_DB_URL,
    }),
  })
)

// app.get('/', (req, res, next) => {
//   res.send('Hello MERN')
// })

app.use('/api/users', usersRoutes)
app.use('/api/notes', authenticate, notesRoutes)

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  let errMsg = 'An unknown error occurred'
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.status
    errMsg = error.message
  }
  res.status(statusCode).json({ error: errMsg })
})

export default app
