import { BASE_URL } from 'config'
import fetch from '../fetch'
import { IPlatformInfo, IInitialInfo } from './model'

export * from './model'

export function getPlatformInfo(): Promise<IPlatformInfo> {
  return fetch(`${BASE_URL}/common/platformInfo`)
}

export function getUserInfo(): Promise<IPlatformInfo> {
  return fetch(`${BASE_URL}/user/userInfo`)
}

export function initialSystem(info: IInitialInfo) {
  return fetch(`${BASE_URL}/common/initial`, 'POST', info)
}
