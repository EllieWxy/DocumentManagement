import * as React from 'react'
import './Input.css'

export interface Props {
    icons:string;
    placeholder:string;
    type:string;
}


class Input extends React.Component<Props,{}>{
    render(){
        const {icons="",placeholder,type} = this.props

        return <div className="input">
            <svg viewBox='0 0 1024 1024'><path d={icons}></path></svg>
            <input placeholder={placeholder} type={type}/>
        </div>
    }
}

export default Input
