import * as React from 'react'
import Input from "components/Input";
import style from "./index.m.css"
import NodeTrees from "../NodeTrees";
import searchIcon from "img/search.svg";

import Operation from "components/Operation";
import addIcon from "img/add.svg";

import {message,Modal} from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {createFile} from "apis/file";

const { confirm } = Modal;

export interface IDrawer {
    selectFid:string,
    title:string,
    changeSelect:() => any,
    getDetail:() => any,
    node:any
}

interface node {
    title:string,
    fid:string,
    child:[any] | []
}

export default class Drawer extends React.Component<IDrawer,{searchValue:string,newFileName:string}>{

    constructor(props:any){
        super(props)
        this.state = {
            searchValue : '',
            newFileName : ''
        }
    }

    changeSearchValue = (event:any) => {
        this.setState({
            searchValue:event.target.value
        })
    }

    changeFileName = (event:any) => {
        this.setState({
            newFileName:event.target.value
        })
    }

    drawerClick = (event:any)=>{
        const that = this
        //添加新文件
        if(event.target.classList.contains('add') || event.target.parentElement.classList.contains('add')){
            confirm({
                title: `请输入文件名`,
                icon: <ExclamationCircleOutlined />,
                content: <Input type='text' placeholder='新建文件' changeValue={that.changeFileName.bind(that)}/>,
                onOk() {
                    createFile({title:that.state.newFileName,content:'',father:that.props.selectFid})
                        .then((res:any) => {
                            message.success('创建文件成功')
                        })
                }
            });
        }
    }

    render(){
        return <div onClick={this.drawerClick} className={style.drawer}>
            <div className={style.top}>
                <Input placeholder='search...' type='text' class='hasBack' changeValue={this.changeSearchValue.bind(this)}
                       suffix={searchIcon} value={this.state.searchValue}/>
                <Operation icon={addIcon} class='add'/>
            </div>
            <div onClick={this.props.changeSelect} onDoubleClick={this.props.getDetail} className={style.nodeTree}>
                <div className={style.title}>{this.props.title}</div>
                <hr/>
                <NodeTrees node={this.props.node}
                           selectedFid={this.props.selectFid}/></div>
        </div>
    }
}
