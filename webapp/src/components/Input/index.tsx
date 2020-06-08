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
    onSuffix?:()=>any
}


export default class Input extends React.Component<IInputProps,{}>{

    onKeyup = (event:any) => {
        if(event.keyCode === 13 && this.props.onSuffix) {
            this.props.onSuffix()
        }
    }


    render(){
        const {className='',placeholder,type='text',prefix,suffix,value,onChange,onSuffix} = this.props;

        return <div className={style.input + " " + className}>
            {prefix &&  <img src = {prefix} alt='prefix'/>}
            <input placeholder={placeholder} type={type} onChange={onChange} onKeyUp={this.onKeyup}
                    value = {value}/>
            {suffix && <img src = {suffix} className={style.suffix} alt='suffix' onClick={onSuffix}/> }
        </div>
    }
}

