import * as React from 'react'
import style from './index.css'
interface IOperationProps {
    icon:string,
    class:string
}

export default class Operation extends React.Component<IOperationProps,{}>{

    render(){
        return <div className={this.props.class + " " + style.operation} >
            <img src={this.props.icon}/>
        </div>
    }
}
