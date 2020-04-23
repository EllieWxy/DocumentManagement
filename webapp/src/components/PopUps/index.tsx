import * as React from 'react'
import './index.css'

interface IPopUp {
    title:string,
    content:any,
    ok:() => any,
    cancel:() => any,
    type:string,
    visible:boolean
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

    close(){
        this.setState({style:'hidden'})
        this.render()
        this.props.cancel.bind(this)
    }

    render(){
        return <div className={'popUp ' + this.state.style}>
            <div className='title'>{this.props.title}</div>
            <div className='content'>
                {this.props.type == 'input' ?
                <input placeholder={this.props.content} onChange={this.changeValue.bind(this)}/>
                : this.props.content}
                </div>
            <div className='operation'>
                <button className='ok' onClick={this.props.ok.bind(this)}>确定</button>
                <button className='cancel' onClick={this.close.bind(this)}>取消</button>
            </div>
        </div>
    }
}
