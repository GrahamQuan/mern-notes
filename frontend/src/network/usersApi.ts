import { User } from '../models/user'
import fetchApi from './base'

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchApi('/api/users', { method: 'GET' })
  return response.json()
}

export type SignupType = {
  username: string
  email: string
  password: string
}

export const signUp = async (data: SignupType): Promise<User> => {
  const res = await fetchApi('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const login = async (
  data: Omit<SignupType, 'username'>
): Promise<User> => {
  const res = await fetchApi('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const logout = async () => {
  await fetchApi('/api/users/logout', {
    method: 'POST',
  })
}
