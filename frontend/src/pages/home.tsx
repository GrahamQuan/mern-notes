import type { FC } from 'react'
import type { User } from '../models/user'
import NotesView from '../components/views/NotesView'
import EmptyView from '../components/views/EmptyView'
import styles from './home.module.css'
import { Container } from 'react-bootstrap'

type Props = {
  loggedInUser: User | null
}

const Home: FC<Props> = ({ loggedInUser }) => {
  return (
    <Container className={styles.page}>
      {loggedInUser ? <NotesView /> : <EmptyView />}
    </Container>
  )
}

export default Home
