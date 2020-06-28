import * as React from 'react'
import {IPlatformInfo} from 'apis/common/model'

export const PlatformContext = React.createContext<IPlatformInfo>({
    version:'',
    needInitClub: false,
    needInitUser: false
})
