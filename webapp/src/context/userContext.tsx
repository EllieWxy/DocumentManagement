import * as React from 'react'
import { IUserInfo } from 'apis/login'

export const UserContext = React.createContext<IUserInfo>({
  staffId: '',
  club: '',
  getClub:() => {}
})
