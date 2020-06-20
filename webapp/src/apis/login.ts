import { BASE_URL } from 'config'
import fetch from './fetch'

export default function login(user: string, password: string) {
  return fetch(`${BASE_URL}/common/login`, 'POST', {
    user: user,
    password: password
  })
}
