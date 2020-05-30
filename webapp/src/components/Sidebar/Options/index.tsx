import * as React from 'react'
import style from './index.m.css'

export interface IOptionsProps {
    icon : string,
    content : string
}

export default class Options extends React.Component<IOptionsProps,{}>{
    render(){
        return <div data-id={this.props.content} className={style.option}>
            <img data-id={this.props.content} className={style.icon} src={this.props.icon}/>
        </div>
    }
}
