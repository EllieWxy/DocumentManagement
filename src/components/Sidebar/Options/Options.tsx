import * as React from 'react'
import './Options.css'

export interface Props {
    icon : string,
    content : string
}

export default class Options extends React.Component<Props,{}>{
    render(){
        return <div className='option'>
            <svg viewBox='0 0 1024 1024' className='icon'><path d={this.props.icon}/></svg>
            <div className='content'>{this.props.content}</div>
        </div>
    }
}
