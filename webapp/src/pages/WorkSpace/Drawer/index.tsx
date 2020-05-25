import * as React from 'react'
import Input from "components/Input";
import style from "./index.m.css"
import NodeTrees from "../NodeTrees";
import searchIcon from "img/search.svg";

import {getFile} from "apis/file";
import Operation from "components/Operation";
import addIcon from "img/add.svg";

export interface IDrawer {
    selectFid:string,
    title:string,
    changeSelect:() => any,
    getDetail:() => any
}

interface node {
    title:string,
    fid:string,
    child:[any] | []
}

export default class Drawer extends React.Component<IDrawer,{searchValue:string,node:node}>{

    constructor(props:any){
        super(props)
        this.state = {
            searchValue : '',
            node:{
                title:'',
                fid:'',
                child:[]
            }
        }
        getFile().then((res: any) => {
            this.setState({node: res})
            this.render()
        })
    }

    changeSearchValue = (event:any) => {
        this.setState({
            searchValue:event.target.value
        })
    }


    render(){
        return <div className={style.drawer}>
            <div className={style.top}>
                <Input placeholder='search...' type='text' class='hasBack' changeValue={this.changeSearchValue.bind(this)}
                       suffix={searchIcon} value={this.state.searchValue}/>
                <Operation icon={addIcon} class='add'/>
            </div>
            <div onClick={this.props.changeSelect} onDoubleClick={this.props.getDetail} className={style.nodeTree}>
                <div className={style.title}>{this.props.title}</div>
                <hr/>
                <NodeTrees node={this.state.node}
                           selectedFid={this.props.selectFid}/></div>
        </div>
    }
}
