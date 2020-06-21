import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Spin } from 'antd';
import WorkSpace from './pages/WorkSpace'
import Login from './pages/Login'
import {getPlatformInfo, getUserInfo} from './apis/common'
interface IMainState {
  isLoading:boolean
}

export class Main extends React.Component<any, IMainState> {

  constructor(props:any){
    super(props)
    this.state = {
      isLoading:true
    }
    const p1 = getPlatformInfo()
    const p2 = getUserInfo()
    Promise.all([p1,p2]).then((values:any) => {
      this.setState({isLoading:false})
      if(!values[1].user && location.pathname !== '/login'){
        location.href = location.origin + '/login'
      }
      if(values[1].user && location.pathname === '/login'){
        location.href = location.origin + '/workspace'
      }
    }).catch(err => {
      console.log(err)
    })
  }

  LoginComponent = () => <Login/>
  WorkSpaceComponent = () => <WorkSpace />

  render() {
    if(this.state.isLoading){
      return <Spin size="large" />
    } else {
      return (
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={this.LoginComponent} />
              <Route path="/workspace" component={this.WorkSpaceComponent} />
              <Route path="/" component={this.WorkSpaceComponent} />
            </Switch>
          </BrowserRouter>
      )
    }
  }
}
