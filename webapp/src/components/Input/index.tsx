import * as React from 'react'
import style from './index.css'

export interface IInputProps {
    prefix?:string;
    placeholder:string;
    type:string;
    changeValue:()=>any;
    value?:string;
    class?:string;
    suffix?:string
}


export default class Input extends React.Component<IInputProps,{}>{

    render(){
        const {placeholder,type} = this.props;
        const className = this.props.class || ''

        return <div className={style.input + " " + className}>
            {this.props.prefix == undefined ? null : <img src = {this.props.prefix} alt='icon'/>}
            <input placeholder={placeholder} type={type} onChange={this.props.changeValue} />
            {this.props.suffix == undefined ? null : <img src = {this.props.suffix} alt='suffix'/> }
        </div>
    }
}

