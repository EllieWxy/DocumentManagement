import * as React from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import WorkSpace from './WorkSpace'
import Login from './Login'
import {UserContext} from 'components/Context'

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
    return <BrowserRouter>
      <Switch>
        <Route path="/workspace">
          <WorkSpace/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
  }
}

export default withRouter(Pages)

