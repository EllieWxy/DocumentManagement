export interface IBaseUser {
  clubs: string[]
  username: string
  password: string
}

export type TUser = Omit<IBaseUser, 'password'> & {
  uid: string
}
