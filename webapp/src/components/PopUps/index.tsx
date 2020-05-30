import * as React from 'react'
import style from './index.m.css'

interface IPopUp {
    title:string,
    content:any,
    ok:() => any,
    cancel:() => any,
    type:string,
    visible:boolean,
    // inputValue:string
}

export default class PopUps extends React.Component<IPopUp,{value:any,style:string,visible:boolean}>{

    constructor(props:any){
        super(props)
        this.state = {
            value:'',
            style:'',
            visible:false
        }
    }

    changeValue(event:any){
        this.setState({value:event.target.value})
    }

    // close(){
    //     this.setState({style:'hidden'})
    //     this.render()
    //     this.props.cancel.bind(this)
    // }

    render(){
        return <div className={style.popUp}>
            <div className={style.title}>{this.props.title}</div>
            <div className={style.content}>
                {this.props.type == 'input' ?
                <input placeholder={this.props.content} onChange={this.changeValue.bind(this)}
                       // value={this.props.inputValue}
                />
                : this.props.content}
                </div>
            <div className={style.operation}>
                <button className='ok' onClick={this.props.ok.bind(this)}>确定</button>
                <button className='cancel' onClick={this.props.cancel}>取消</button>
            </div>
        </div>
    }
}
