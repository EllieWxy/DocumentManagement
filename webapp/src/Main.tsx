import * as React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {App} from './App';
import WorkSpace from "./pages/WorkSpace";
import Login from "./pages/Login";

export interface IMainProps {
    app: App; // Reference to our App.ts class
}

export class Main extends React.Component<IMainProps, {}> {
    constructor(props: IMainProps) {
        super(props);
    }

    handleLogin() {
        location.href = location.origin + '/workspace'
    }

    LoginComponent = () => <Login login={this.handleLogin.bind(this)}/>
    WorkSpaceComponent = () => <WorkSpace/>


    public render(): JSX.Element
    {
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
