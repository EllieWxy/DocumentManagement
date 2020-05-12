import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Main } from './Main';
import 'components/common.m.css'


export class App
{
    constructor()
    {
        this.render();
    }

    private render(): void
    {

        ReactDOM.render(React.createElement(Main), document.getElementById("app"));

    }
}

new App();
