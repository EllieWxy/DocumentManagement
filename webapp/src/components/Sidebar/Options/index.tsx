import * as React from 'react'
import './index.css'

export interface IOptionsProps {
    icon : string,
    content : string
}

export default class Options extends React.Component<IOptionsProps,{}>{
    render(){
        return <div className='option'>
            <svg viewBox='0 0 1024 1024' className='icon'><path d={this.props.icon}/></svg>
            <div className='content'>{this.props.content}</div>
        </div>
    }
}
