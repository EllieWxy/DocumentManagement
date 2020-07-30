import { BASE_URL } from 'config'
import fetch from './fetch'

export interface IUserInfo {
  staffId: string
  club: string,
  getClub:any
}

export default function login(staffId: string, password: string) {
  return fetch(`${BASE_URL}/common/login`, 'POST', {
    staffId,
    password
  })
}
