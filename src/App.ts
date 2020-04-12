import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Main } from './Main';
import Input from './components/Center/Input/Input'
import Center from './components/Center/Center'

export class App
{
    constructor()
    {
        this.render();
    }

    private render(): void
    {
        ReactDOM.render(React.createElement(Center), document.getElementById("app"));

    }
}

new App();
