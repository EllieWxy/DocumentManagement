import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Spin} from 'antd'
import {getPlatformInfo, getUserInfo} from './apis/common'
import {IUserInfo} from './apis/login'
import {IPlatformInfo} from 'apis/common/model'
import Pages from './pages'
import {UserContext} from 'context/userContext'
import {PlatformContext} from "context/platformContext";
import 'antd/dist/antd.css';
import style from 'components/common.m.css'

interface IMainState {
    isLoading: boolean
    userInfo: IUserInfo
    platformInfo: IPlatformInfo
}

export class Main extends React.Component<any, IMainState> {
    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: true,
            userInfo: {
                staffId: '',
                club: ''
            },
            platformInfo: {
                version: '',
                needInitClub: false,
                needInitUser: false
            }
        }
        const p1 = getPlatformInfo()
        const p2 = getUserInfo().catch(err=>{return new Error(err.message)})
        Promise.all([p1, p2])
            .then((values: any) => {
                this.setState({platformInfo: values[0], isLoading: false, userInfo: values[1]})
            })
            .catch(err => {
                console.log(err)
                this.setState({isLoading: false})
            })
    }

    render() {
        if (this.state.isLoading) {
            return <Spin className={style.globalLoading} size="large"/>
        }
        return (
            <PlatformContext.Provider value={this.state.platformInfo}>
                <UserContext.Provider value={this.state.userInfo}>
                    <BrowserRouter>
                        <Pages/>
                    </BrowserRouter>
                </UserContext.Provider>
            </PlatformContext.Provider>
        )
    }
}
