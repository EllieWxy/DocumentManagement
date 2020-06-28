import * as React from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import {UserContext} from 'context/userContext'
import {PlatformContext} from "context/platformContext";
import WorkSpace from './WorkSpace'
import Login from './Login'
import Setting from './Setting'
import Initial from "./Initial";

class Pages extends React.Component<any,{}>{

  static contextType = UserContext

  componentWillMount(){
   if(this.context.user && location.pathname !== '/workspace'){
      this.props.history.push('/workspace')
    } else if(!this.context.user && location.pathname !== '/login') {
      this.props.history.push('/login')
    }
  }

  render () {
    return <PlatformContext.Consumer>
        {platformInfo => {
            if(platformInfo.needInitClub || platformInfo.needInitUser) {
              return <Initial/>
            }
          return <BrowserRouter>
              <Switch>
              <Route path="/workspace">
                <WorkSpace/>
              </Route>
              <Route path="/setting">
                <Setting/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
            </Switch>
            </BrowserRouter>}}
    </PlatformContext.Consumer>
  }
}

export default withRouter(Pages)

