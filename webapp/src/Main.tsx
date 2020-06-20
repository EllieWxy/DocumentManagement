import * as React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import WorkSpace from "./pages/WorkSpace";
import Login from "./pages/Login";

export class Main extends React.Component<{}, {}> {

    handleLogin() {
        location.href = location.origin + '/workspace'
    }

    LoginComponent = () => <Login login={this.handleLogin.bind(this)}/>
    WorkSpaceComponent = () => <WorkSpace/>


    render() {
        return (
          <BrowserRouter>
              <Switch>
                  <Route path="/login" component={this.LoginComponent}/>
                  <Route path="/workspace" component={this.WorkSpaceComponent}/>
                  <Route path="/" component={this.WorkSpaceComponent}/>
              </Switch>
          </BrowserRouter>

        );

    }
}
