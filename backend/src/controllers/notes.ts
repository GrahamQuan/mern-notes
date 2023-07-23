import { RequestHandler } from 'express'
import NotesModel from '../models/notes'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import { assertIsDefined } from '../util/assertIsDefined'

export const getNotes: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId
  try {
    // throw new Error('error.....')
    const notes = await NotesModel.find({ userId }).exec()
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
}

export const getNodeById: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId
  const authUserId = req.session.userId
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'invalid note id')
    }
    if (!noteId) {
      throw createHttpError(404, 'note not found')
    }
    const note = await NotesModel.findById(noteId).exec()
    if (!note) {
      throw createHttpError(404, 'Note not found')
    }
    if (!note.userId!.equals(authUserId!)) {
      throw createHttpError(401, 'You cannot access this note')
    }
    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}

type CreateNoteBody = {
  title?: string
  text?: string
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody
> = async (req, res, next) => {
  const authUserId = req.session.userId
  const title = req.body.title
  const text = req.body.text
  try {
    if (!title) {
      throw createHttpError(400, 'title is required')
    }
    const newNote = await NotesModel.create({ userId: authUserId, title, text })
    // 201 means something created succssfully
    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
}

type UpdateParams = {
  noteId?: string
}

type UpdateNoteBody = {
  title?: string
  text?: string
}

export const updateNoteById: RequestHandler<
  UpdateParams,
  unknown,
  UpdateNoteBody
> = async (req, res, next) => {
  const noteId = req.params.noteId
  const { title, text } = req.body
  try {
    if (!noteId || !mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'invalid note id')
    }

    // (1)
    // const updatedMessage = await NotesModel.updateOne(
    //   { _id: noteId },
    //   {
    //     $set: {
    //       title,
    //       text,
    //     },
    //   }
    // )

    // (2)
    const note = await NotesModel.findById(noteId).exec()
    if (!note) {
      throw createHttpError(404, 'note not found')
    }
    note.title = title
    note.text = text
    const updatedNote = await note.save()

    res.status(200).json(updatedNote)
  } catch (error) {
    next(error)
  }
}

type DeleteNoteParams = {
  noteId?: string
}

export const deleteNoteById: RequestHandler<DeleteNoteParams> = async (
  req,
  res,
  next
) => {
  const noteId = req.params.noteId
  try {
    if (!noteId || !mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'invalid note id')
    }
    await NotesModel.deleteOne({ _id: noteId })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
