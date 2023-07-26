import express from 'express'
import * as NotesControllers from '../controllers/notes'

// router ≈ small app
const router = express.Router()

router.get('/', NotesControllers.getNotes)
router.get('/:noteId', NotesControllers.getNodeById)
router.post('/', NotesControllers.createNote)
router.patch('/:noteId', NotesControllers.updateNoteById)
router.delete('/:noteId', NotesControllers.deleteNoteById)

export default router
