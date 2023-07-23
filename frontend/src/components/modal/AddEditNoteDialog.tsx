import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Note } from '../../models/note'
import { NoteInput } from '../../network/notesApi'
import * as NotesApi from '../../network/notesApi'
import TextInputField from './../form/TextInputField'
import toast from 'react-hot-toast'

interface AddEditNoteDialogProps {
  noteToEdit: Note | null
  onDismiss: () => void
  onNoteSaved: (note: Note) => void
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || '',
      text: noteToEdit?.text || '',
    },
  })

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
      } else {
        noteResponse = await NotesApi.createNote(input)
      }
      onNoteSaved(noteResponse)
      toast.success('success')
      onDismiss()
    } catch (error: any) {
      toast.error(error?.message || error)
    }
  }

  return (
    <Modal show onHide={onDismiss} centered>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? 'Edit note' : 'Add note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.title}
          />

          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          {noteToEdit ? 'Update and save' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteDialog
