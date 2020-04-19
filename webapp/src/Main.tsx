import * as React from 'react';
import { App } from './App';
import WorkSpace from "./pages/WorkSpace";
import Login from "./pages/Login";

export interface IMainProps
{
    app: App; // Reference to our App.ts class
}

export class Main extends React.Component<IMainProps, {}>
{
    constructor(props: IMainProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {

        return (
            <WorkSpace/>
        );

    }
}
