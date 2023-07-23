import { useForm } from 'react-hook-form'
import { User } from '../../models/user'
import type { SignupType } from '../../network/usersApi'
import * as usersApi from '../../network/usersApi'
import { Button, Form, Modal } from 'react-bootstrap'
import TextInputField from '../form/TextInputField'
import styleUtils from '../../styles/utils.module.css'
import { ConflictError } from '../../network/httpErrors'
import { toast } from 'react-hot-toast'

interface SignUpModalProps {
  onDismiss: () => void
  onSignUpSuccessful: (user: User) => void
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupType>()

  async function onSubmit(credentials: SignupType) {
    try {
      const newUser = await usersApi.signUp(credentials)
      onSignUpSuccessful(newUser)
      toast.success('success')
    } catch (error: any) {
      if (error instanceof ConflictError) {
        toast.error(error.message)
      } else {
        toast.error(error)
      }
    }
  }

  return (
    <Modal show onHide={onDismiss} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.email}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styleUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal
