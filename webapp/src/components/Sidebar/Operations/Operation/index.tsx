import * as React from 'react'
import './index.css'
interface IOperationProps {
    icon:string,
    class:string
}

export default class Operation extends React.Component<IOperationProps,{}>{

    render(){
        return <span className={this.props.class + " operation"} >
            <svg viewBox="0 0 1024 1024"><path d={this.props.icon}/></svg>
        </span>
    }
}
