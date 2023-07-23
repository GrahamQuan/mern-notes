import { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { MdDelete, MdEditSquare, MdHome } from 'react-icons/md'

import styles from './styles.module.css'
import type { Note } from '../../models/note'
import { getNoteById, deleteNote } from '../../network/notesApi'
import { formatDate } from '../../utils/formatDate'
import AddEditNoteDialog from '../../components/modal/AddEditNoteDialog'

const NotePage = () => {
  const { noteId } = useParams()
  const navigate = useNavigate()
  const [showEditModel, setShowEditModel] = useState(false)
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)

  const Empty = (
    <>
      <p>No such note</p>
      <p>
        <MdHome />
        <Link to="/">Back to home</Link>
      </p>
    </>
  )

  if (!noteId) {
    return Empty
  }

  const fetchNote = async () => {
    try {
      setLoading(true)
      const res: Note = await getNoteById(noteId)
      setNote(res)
      setLoading(false)
    } catch (error: any) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await deleteNote(noteId)
      navigate({
        pathname: '/',
      })
      toast.success('success')
    } catch (error: any) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNote()
    return () => {}
  }, [])

  if (loading) {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }

  if (!note) {
    return Empty
  }

  const { title, text, createdAt, updatedAt } = note

  let createdUpdatedText: string
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt)
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt)
  }

  return (
    <Container className={styles.page}>
      <h2>{title}</h2>
      <p>{createdUpdatedText}</p>
      <p className={styles.text}>{text}</p>
      <div className={styles.buttonsGroup}>
        <div>
          <MdEditSquare
            className={styles.button}
            onClick={() => setShowEditModel(true)}
          />
        </div>
        <div>
          <MdDelete
            className={styles.button}
            onClick={(e: any) => {
              e.stopPropagation()
              onDelete()
            }}
          />
        </div>
      </div>
      {showEditModel && (
        <AddEditNoteDialog
          noteToEdit={note}
          onDismiss={() => setShowEditModel(false)}
          onNoteSaved={() => fetchNote()}
        />
      )}
    </Container>
  )
}

export default NotePage
