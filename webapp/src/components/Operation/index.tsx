import * as React from 'react'
import style from './index.m.css'
interface IOperationProps {
    icon:string,
    className?:string,
    handleClick:() => any
}

export default class Operation extends React.Component<IOperationProps,{}>{

    render(){
        return <div className={this.props.className + " " + style.operation} onClick={this.props.handleClick} >
            <img src={this.props.icon}/>
        </div>
    }
}
