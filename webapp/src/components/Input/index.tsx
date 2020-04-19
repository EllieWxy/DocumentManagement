import * as React from 'react'
import './index.css'

export interface IInputProps {
    icons:string;
    placeholder:string;
    type:string;
    changeValue:()=>any
}


export default class Input extends React.Component<IInputProps,{}>{

    render(){
        const {icons="",placeholder,type} = this.props

        return <div className="input">
            <svg viewBox='0 0 1024 1024'><path d={icons}></path></svg>
            <input placeholder={placeholder} type={type} onChange={this.props.changeValue}/>
        </div>
    }
}
