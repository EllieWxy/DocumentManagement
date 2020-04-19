import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Main } from './Main';
import Center from './pages/Login/Center/Center'
import Sidebar from "./components/Sidebar/Sidebar";
import './components/common.css'
import MDEditorDom from './components/MDEditor/MDEditor'


export class App
{
    constructor()
    {
        this.render();
    }

    private render(): void
    {
        // ReactDOM.render(React.createElement(Center), document.getElementById("app"));
        // ReactDOM.render(React.createElement(Sidebar), document.getElementById("app"));
        // ReactDOM.render(React.createElement(Sidebar), document.getElementById("app"));
        ReactDOM.render(React.createElement(Main), document.getElementById("app"));

    }
}

new App();
