import { IBaseClub } from '../club/model'
import { IBaseUser } from '../user/model'

export interface IPlatformInfo {
  version: string
  needInitClub: boolean
  needInitUser: boolean
}

export interface IInitialInfo {
  club: IBaseClub
  user: Omit<IBaseUser, 'clubs'>
}
