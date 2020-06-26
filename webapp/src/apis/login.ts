import { BASE_URL } from 'config'
import fetch from './fetch'

export interface IUserInfo {
  username: string
  uid: string
}

export default function login(username: string, password: string) {
  return fetch(`${BASE_URL}/common/login`, 'POST', {
    username,
    password
  })
}
