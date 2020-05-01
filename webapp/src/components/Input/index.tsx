import * as React from 'react'
import './index.css'

export interface IInputProps {
    icons?:string;
    placeholder:string;
    type:string;
    changeValue:()=>any
}


export default class Input extends React.Component<IInputProps,{}>{ //加个value

    render(){
        const {icons="",placeholder,type} = this.props;

        return <div className="input">
            <img src = {icons} alt='icon'/>
            <input placeholder={placeholder} type={type} onChange={this.props.changeValue}/>
        </div>
    }
}

