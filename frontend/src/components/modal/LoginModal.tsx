import { useForm } from 'react-hook-form'
import { User } from '../../models/user'
import type { SignupType } from '../../network/usersApi'
import * as UsersApi from '../../network/usersApi'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TextInputField from './../form/TextInputField'
import styleUtils from '../../styles/utils.module.css'
import { UnauthorizedError } from '../../network/httpErrors'
import { toast } from 'react-hot-toast'

interface LoginModalProps {
  onDismiss: () => void
  onLoginSuccessful: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupType>()

  async function onSubmit(credentials: SignupType) {
    try {
      const user = await UsersApi.login(credentials)
      onLoginSuccessful(user)
      toast.success('success')
    } catch (error: any) {
      if (error instanceof UnauthorizedError) {
        toast.error(error.message)
      } else {
        toast.error(error)
      }
    }
  }

  return (
    <Modal show onHide={onDismiss} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="email"
            label="Email"
            type="text"
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
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
