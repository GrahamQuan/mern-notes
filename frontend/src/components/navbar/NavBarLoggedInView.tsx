import { Button, Navbar } from 'react-bootstrap'
import { User } from '../../models/user'
import * as usersApi from '../../network/usersApi'
import { FaUserCircle } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

interface NavBarLoggedInViewProps {
  user: User
  onLogoutSuccessful: () => void
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await usersApi.logout()
      onLogoutSuccessful()
    } catch (error: any) {
      toast.error(error)
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">
        <FaUserCircle /> {user.username}
      </Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  )
}

export default NavBarLoggedInView
