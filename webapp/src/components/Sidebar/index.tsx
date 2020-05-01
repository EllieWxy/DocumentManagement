import * as React from 'react'
import Options from "./Options";
import './index.css'
import Operations from "./Operations";
import NodeTrees from "pages/WorkSpace/NodeTrees";
import {getFile} from "apis/file";
import documentIcon from 'img/document.svg'
import settingIcon from 'img/setting.svg'

export interface ISidebarProps {
    title : string,
    club : string,
    detail: string,
    changeSelect : () => any,
    getDetail:() => any,
    selectFid:string
}

interface node {
    title:string,
    fid:string,
    child:[any] | []
}

export default class Sidebar extends React.Component<ISidebarProps,{node:node}>{

    constructor(props:any){
        super(props);
        this.state = {
            node:{
                title:'',
                fid:'',
                child:[]
            },
        }
        if(this.props.detail == 'nodes'){
            getFile().then((res: any) => {
                debugger
                this.setState({node:res})
                this.render()
            })
        }
    }

    render(){
        return <div className='sidebar'>
            <div className='top'></div>
            <div className='information'>
                <div className='title'>{this.props.title}</div>
                <div className='club'>{this.props.club}</div>
            </div>
            <hr className='line'/>
            {this.props.detail == 'option' ?
                <div onClick={this.props.changeSelect}>
                    <Options icon={documentIcon}
                           content='文档'/>
                    <Options icon={settingIcon}
                           content='设置'/>
                </div> :
                this.props.detail == 'nodes' ?
                    <div onClick={this.props.changeSelect} onDoubleClick={this.props.getDetail}>
                        <Operations selectedFid={this.props.selectFid}/><hr/>
                    <NodeTrees node={this.state.node}
                               selectedFid={this.props.selectFid}/></div>
                    : ''}
         </div>
    }
}
