import { BASE_URL } from 'config'
import fetch from '../fetch'
import { IPlatformInfo, IInitialInfo } from './model'
import {IUserInfo} from "../login";

export * from './model'

export function getPlatformInfo(): Promise<IPlatformInfo> {
  return fetch(`${BASE_URL}/common/platformInfo`)
}

export function getUserInfo(): Promise<IUserInfo> {
  return fetch(`${BASE_URL}/user/userInfo`)
}

export function initialSystem(info: IInitialInfo) {
  return fetch(`${BASE_URL}/common/initial`, 'POST', info)
}
