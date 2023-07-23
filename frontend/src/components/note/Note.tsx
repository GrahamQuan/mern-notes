import styles from '../../styles/Note.module.css'
import styleUtils from '../../styles/utils.module.css'
import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../../models/note'
import { formatDate } from '../../utils/formatDate'
import { MdDelete, MdEditSquare } from 'react-icons/md'

interface NoteProps {
  note: NoteModel
  onClickCard: (noteId: string) => void
  onEdit: (note: NoteModel) => void
  onDelete: (note: NoteModel) => void
  className?: string
}

const Note = ({
  note,
  onClickCard,
  onEdit,
  onDelete,
  className = '',
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note

  let createdUpdatedText: string
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt)
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt)
  }

  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => {
        onClickCard(note._id)
      }}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <div className="text-muted ms-auto">
            <MdEditSquare
              className={styles.buttons}
              onClick={() => onEdit(note)}
            />
            <MdDelete
              className={styles.buttons}
              onClick={(e: any) => {
                e.stopPropagation()
                onDelete(note)
              }}
            />
          </div>
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  )
}

export default Note
