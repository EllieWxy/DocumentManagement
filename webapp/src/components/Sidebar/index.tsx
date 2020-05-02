import * as React from 'react'
import style from './index.css'

import Options from "./Options";
import Operations from "./Operations";
import Input from 'components/Input'
import NodeTrees from "pages/WorkSpace/NodeTrees";
import {getFile} from "apis/file";

import documentIcon from 'img/document.svg'
import settingIcon from 'img/setting.svg'
import searchIcon from 'img/search.svg'


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

export default class Sidebar extends React.Component<ISidebarProps,{node:node,searchValue:string}>{

    constructor(props:any){
        super(props);
        this.state = {
            node:{
                title:'',
                fid:'',
                child:[]
            },
            searchValue:''
        }
        if(this.props.detail == 'nodes'){
            getFile().then((res: any) => {
                this.setState({node:res})
                this.render()
            })
        }
    }

    changeSearchValue = (event:any) => {
        this.setState({
            searchValue:event.target.value
        })
    }


    render(){
        return <div className={style.sidebar}>
            {this.props.detail == 'nodes'?
                <div className={style.top}>
                    <Input placeholder='search...' type='text' class='hasBack' changeValue={this.changeSearchValue.bind(this)}
                            suffix={searchIcon}/>
                </div> : null
            }
            {
                this.props.detail == 'nodes' ?
                    <div className={style.leftSide}>
                        <Operations selectedFid={this.props.selectFid}/>
                    </div> : null
            }
            {
                this.props.detail == 'option' ?
                  <div>
                      <div className={style.information}>
                          <div className={style.title}>{this.props.title}</div>
                          <div className={style.club}>{this.props.club}</div>
                      </div>
                      <hr/>
                  </div> : null
            }

            {this.props.detail == 'option' ?
                <div onClick={this.props.changeSelect}>
                    <Options icon={documentIcon}
                           content='文档'/>
                    <Options icon={settingIcon}
                           content='设置'/>
                </div> :
                this.props.detail == 'nodes' ?
                    <div onClick={this.props.changeSelect} onDoubleClick={this.props.getDetail} className={style.nodeTree}>
                        <div className={style.title}>{this.props.title}</div>
                    <NodeTrees node={this.state.node}
                               selectedFid={this.props.selectFid}/></div>
                    : ''}
         </div>
    }
}
