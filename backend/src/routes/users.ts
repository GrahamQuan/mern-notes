import express from 'express'
import * as userControllers from '../controllers/users'
const router = express.Router()

router.get('/', userControllers.getAuthenticatedUser)
router.post('/signup', userControllers.signUp)
router.post('/login', userControllers.login)
router.post('/logout', userControllers.logout)

export default router
