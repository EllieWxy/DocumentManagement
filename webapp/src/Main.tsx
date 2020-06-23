import * as React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Spin} from 'antd';
import WorkSpace from './pages/WorkSpace'
import Login from './pages/Login'
import {getPlatformInfo, getUserInfo} from './apis/common'

interface IMainState {
    isLoading: boolean
    userInfo: {
        user:string,
        sid:string
    }
}

export const UserContext = React.createContext<{user:string,sid:string}>({user:'',sid:''})

export class Main extends React.Component<any, IMainState> {

    constructor(props: any) {
        super(props)
        this.state = {
            isLoading: true,
            userInfo: {
                user:'',
                sid:''
            }
        }
        const p1 = getPlatformInfo()
        const p2 = getUserInfo()
        Promise.all([p1, p2]).then((values: any) => {
            if (values[1].user && location.pathname === '/login') {
                location.href = location.origin + '/workspace'
            }
            this.setState({isLoading: false, userInfo: values[1]})
        }).catch(err => {
            this.setState({isLoading: false})
            if (err.message === '未登录' && location.pathname !== '/login') {
                location.href = location.origin + '/login'
            }
            console.log(err)
        })
    }

    LoginComponent = () => <Login/>
    WorkSpaceComponent = () => <WorkSpace/>

    render() {
        if (this.state.isLoading) {
            return <Spin size="large"/>
        } else {
            return (
                <UserContext.Provider value={this.state.userInfo}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/login" component={this.LoginComponent}/>
                            <Route path="/workspace" component={this.WorkSpaceComponent}/>
                            <Route path="/" component={this.WorkSpaceComponent}/>
                        </Switch>
                    </BrowserRouter>
                </UserContext.Provider>
            )
        }
    }
}
