import * as React from 'react'
import Sidebar from "components/Sidebar";
import MDEditor from "components/MDEditor";
import './index.css'
import {getFileDetail, saveFile} from "apis/file";

export default class WorkSpace extends React.Component<{},{fid:string,title:string,content:string,renderFid:string}>{
    constructor(props:any){
        super(props)
        this.state = {
            fid:'',
            title:'',
            content:'',
            renderFid:''

        }
    }

    changeSelected(event:any){
        //切换选中文件
        if(event.target.classList.contains('node')){
            this.setState({fid:event.target.id})
            return
        }
        //保存文件
        if(event.target.parentElement.parentElement.classList.contains('save') ||
            event.target.parentElement.classList.contains('save')){
            if(this.state.renderFid === ''){
                return;
            }
            saveFile(this.state.renderFid,this.state.title,this.state.content).then(res => {
                console.log(res)
            })
        }
    }

    //输入的时候对content进行更新
    updateContent = function(value:any){
        this.setState({content:value})
    }

    //双击时对文件内容进行渲染
    getAndRenderFile(event:any){
        getFileDetail(event.target.id).then(res => {
            this.setState({renderFid:res.fid,title:res.title,content:res.content})
        })
    }


    render(){
        return <div className='content'>
            <Sidebar title='萝依' club='红色家园' detail='option' selectFid={this.state.fid}
                     changeSelect={null} getDetail={null}/>
           <Sidebar title={this.state.title || '无正在编辑文件'} club='' detail='nodes'
                    selectFid={this.state.fid} changeSelect={this.changeSelected.bind(this)}
                    getDetail={this.getAndRenderFile.bind(this)}/>
            <div className='right'>
                <MDEditor renderFid={this.state.renderFid} content={this.state.content} getValue={this.updateContent.bind(this)}/>
            </div>
        </div>

    }
}
