import * as React from 'react';
import { App } from './App';
import WorkSpace from "./pages/WorkSpace";
import Login from "./pages/Login";

export interface IMainProps
{
    app: App; // Reference to our App.ts class
}

export class Main extends React.Component<IMainProps, {login:boolean}>
{
    constructor(props: IMainProps)
    {
        super(props);
        this.state = {
            login:false
        }
    }

    handleLogin(){
        this.setState({login:true})
    }

    public render(): JSX.Element
    {
        return (
            this.state.login ? <WorkSpace/> : <Login login={this.handleLogin.bind(this)}/>

        );

    }
}
