import { Note } from '../models/note'
import fetchApi from './base'

export const getNotes = async (): Promise<Note[]> => {
  const res = await fetchApi('/api/notes', {
    method: 'GET',
  })
  return res.json()
}

export const getNoteById = async (noteId: string) => {
  const res = await fetchApi(`/api/notes/${noteId}`, {
    method: 'GET',
  })
  return res.json()
}

export type NoteInput = {
  title: string
  text?: string
}

export const createNote = async (note: NoteInput): Promise<Note> => {
  const res = await fetchApi('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  return res.json()
}

export async function deleteNote(noteId: string) {
  await fetchApi('/api/notes/' + noteId, { method: 'DELETE' })
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchApi('/api/notes/' + noteId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  return response.json()
}
