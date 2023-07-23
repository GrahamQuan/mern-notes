import { cleanEnv } from 'envalid'
import { port, str } from 'envalid/dist/validators'

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_DB_URL: str(),
  SESSION_SECRET: str(),
  CLIENT_DOMAIN: str(),
})
