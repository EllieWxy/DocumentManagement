import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Spin} from 'antd';
import {getPlatformInfo, getUserInfo} from './apis/common'
import Pages from './pages'
import style from 'components/common.m.css'
import {UserContext} from 'components/Context'
import {IUserInfo} from "./apis/login";

interface IMainState{
    isLoading: boolean,
    userInfo : IUserInfo
}

export class Main extends React.Component<any, IMainState> {

    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: true,
            userInfo: {
                user:'',
                sid:''
            },
        }
        const p1 = getPlatformInfo()
        const p2 = getUserInfo()
        Promise.all([p1, p2]).then((values: any) => {
            this.setState({isLoading: false, userInfo: values[1]})
        }).catch(err => {
            console.log(err)
            this.setState({isLoading: false})
        })
    }

    render() {
        if (this.state.isLoading) {
            return <Spin className={style.globalLoading} size="large"/>
        } else {
            return (
                <UserContext.Provider value={this.state.userInfo}>
                    <BrowserRouter>
                        <Pages />
                    </BrowserRouter>
                </UserContext.Provider>
            )
        }
    }
}

