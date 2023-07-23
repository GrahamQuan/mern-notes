import 'dotenv/config'
import mongoose from 'mongoose'
import env from './util/valitadeEnv'
import app from './app'

const PORT = env.PORT

mongoose
  .connect(env.MONGO_DB_URL)
  .then(() => {
    console.log('mongoose runs')
    app.listen(PORT, () => {
      console.log('Server runs on port: ' + PORT)
    })
  })
  .catch((err) => {
    console.error(err)
  })
