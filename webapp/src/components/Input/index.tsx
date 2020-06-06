import * as React from 'react'
import style from './index.m.css'

export interface IInputProps {
    prefix?:string;
    placeholder?:string;
    type:string;
    onChange:()=>any;
    value?:string;
    className?:string;
    suffix?:string;
}


export default class Input extends React.Component<IInputProps,{}>{

    render(){
        const {className='',placeholder,type='text',prefix,suffix,value,onChange} = this.props;

        return <div className={style.input + " " + className}>
            {prefix &&  <img src = {prefix} alt='prefix'/>}
            <input placeholder={placeholder} type={type} onChange={onChange}
                    value = {value}/>
            {suffix && <img src = {suffix} className={style.suffix} alt='suffix'/> }
        </div>
    }
}

