import type mongoose from 'mongoose'

declare module 'express-session' {
  interface SessionData {
    userId: string
  }
}
