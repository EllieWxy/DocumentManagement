import * as React from 'react'
import './Operation.css'
interface Props {
    icon:string,
    click:any
}

export default class Operation extends React.Component<Props,{}>{


    render(){
        return <span className="operation" onClick={this.props.click}>
            <svg viewBox="0 0 1024 1024"><path d={this.props.icon}/></svg>
        </span>
    }
}
