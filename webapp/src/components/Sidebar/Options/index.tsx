import * as React from 'react'
import style from './index.m.css'

export interface IOptionsProps {
    icon : string,
    content : string
}

export default class Options extends React.Component<IOptionsProps,{}>{
    render(){
        return <div className={style.option}>
            <img className={style.icon} src={this.props.icon}/>
            {/*<div className={style.content}>{this.props.content}</div>*/}
        </div>
    }
}
