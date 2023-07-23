import { Container, Nav, Navbar } from 'react-bootstrap'
import { User } from '../../models/user'
import NavBarLoggedInView from './NavBarLoggedInView'
import NavBarLoggedOutView from './NavBarLoggedOutView'
import { Link, useNavigate } from 'react-router-dom'

interface NavBarProps {
  loggedInUser: User | null
  onSignUpClicked: () => void
  onLoginClicked: () => void
  onLogoutSuccessful: () => void
}

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) => {
  const navigate = useNavigate()

  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Link to="/">
          <Navbar.Brand>Notes App</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessful={() => {
                  onLogoutSuccessful()
                  navigate({
                    pathname: '/',
                  })
                }}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
