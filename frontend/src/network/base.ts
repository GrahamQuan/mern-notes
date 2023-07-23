import { UnauthorizedError, ConflictError } from './httpErrors'

const BASE_URL = import.meta.env.VITE_BASE_URL as string

const fetchApi = async (routes: string, init?: RequestInit) => {
  const response = await fetch(`${BASE_URL}${routes}`, {
    ...init,
    credentials: 'include', // send cookie
  })
  if (response.ok) {
    return response
  } else {
    const errorBody = await response.json()
    const errorMessage = errorBody.error
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage)
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage)
    } else {
      throw Error(
        'Request failed with status: ' +
          response.status +
          ' message: ' +
          errorMessage
      )
    }
  }
}

export default fetchApi
