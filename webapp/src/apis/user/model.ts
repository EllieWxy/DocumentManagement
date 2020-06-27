export interface IBaseUser {
  staffId: string
  club: string
  password: string
}

export type TUser = Omit<IBaseUser, 'password'>
