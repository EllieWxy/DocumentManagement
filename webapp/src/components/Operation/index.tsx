import * as React from 'react'
import style from './index.m.css'
interface IOperationProps {
    icon:string,
    className?:string
}

export default class Operation extends React.Component<IOperationProps,{}>{

    render(){
        return <div className={this.props.className + " " + style.operation} >
            <img src={this.props.icon}/>
        </div>
    }
}
