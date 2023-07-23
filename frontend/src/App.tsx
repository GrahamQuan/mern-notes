import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'

import styles from './styles/App.module.css'
import SignUpModal from './components/modal/SignUpModal'
import type { User } from './models/user'
import NavBar from './components/navbar/NavBar'
import LoginModal from './components/modal/LoginModal'
import Home from './pages/home'
import NotFound from './pages/NotFound'
import NotePage from './pages/note/Page'

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <BrowserRouter>
      <div>
        <Toaster />
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
            <Route path="/notes/:noteId" element={<NotePage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          {showSignUpModal && (
            <SignUpModal
              onDismiss={() => setShowSignUpModal(false)}
              onSignUpSuccessful={(user) => {
                setLoggedInUser(user)
                setShowSignUpModal(false)
              }}
            />
          )}
          {showLoginModal && (
            <LoginModal
              onDismiss={() => setShowLoginModal(false)}
              onLoginSuccessful={(user) => {
                setLoggedInUser(user)
                setShowLoginModal(false)
              }}
            />
          )}
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
