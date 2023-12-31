import { useEffect, useState } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { Note as NoteModel } from '../../models/note'
import * as NotesApi from '../../network/notesApi'
import styles from '../../styles/NotesPage.module.css'
import styleUtils from '../../styles/utils.module.css'
import AddEditNoteDialog from './../modal/AddEditNoteDialog'
import Note from '../note/Note'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const NotesView = () => {
  const navigate = useNavigate()

  const [notes, setNotes] = useState<NoteModel[]>([])
  const [notesLoading, setNotesLoading] = useState(true)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

  async function loadNotes() {
    try {
      setShowNotesLoadingError(false)
      setNotesLoading(true)
      const notes = await NotesApi.getNotes()
      setNotes(notes)
    } catch (error) {
      console.error(error)
      setShowNotesLoadingError(true)
    } finally {
      setNotesLoading(false)
    }
  }

  useEffect(() => {
    loadNotes().catch((err) => console.log(err))
  }, [])

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id))
    } catch (error: any) {
      toast.error(error)
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            className={styles.note}
            onClickCard={(noteId: string) => {
              navigate(`/notes/${noteId}`)
            }}
            onEdit={setNoteToEdit}
            onDelete={deleteNote}
          />
        </Col>
      ))}
    </Row>
  )

  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}
        </>
      )}
      {showAddNoteDialog && (
        <AddEditNoteDialog
          noteToEdit={null}
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false)
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            )
            setNoteToEdit(null)
          }}
        />
      )}
    </>
  )
}

export default NotesView
