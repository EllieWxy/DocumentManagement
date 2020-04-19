import * as React from 'react';
import { App } from './App';
import Sidebar from "./components/Sidebar/Sidebar";
import MDEditorDom from "./components/MDEditor/MDEditor";
import WorkSpace from "./pages/WorkSpace";

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
