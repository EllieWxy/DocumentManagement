import * as React from 'react'
import Sidebar from "components/Sidebar";
import MDEditor from "components/MDEditor";
import style from './index.m.css'
import {getFileByID, updateFile} from "apis/file";
import PopUps from "components/PopUps";
import Drawer from "./Drawer";

interface IWorkSpace {
    fid:string,
    title:string,
    content:string,
    renderFid:string,
    select:string,
    popUpVisible:boolean
}

export default class WorkSpace extends React.Component<{},IWorkSpace>{
    constructor(props:any){
        super(props)
        this.state = {
            fid:'',
            title:'',
            content:'',
            renderFid:'',
            select :'文档',
            popUpVisible:false
        }
    }

    changeSelected(event:any){
        //切换选中文件
        if(event.target.classList.contains('node')){
            this.setState({fid:event.target.id})
            return
        }
        //保存文件
        if(this.ifHaveClass(event,'save')){
            if(this.state.renderFid === ''){
                return;
            }
            updateFile(this.state.renderFid,{title:this.state.title,content:this.state.content,father:''}).then((res: any) => {
                console.log(res)
            })
        }
        //新增文件
        if(this.ifHaveClass(event,'add')){
            this.setState({popUpVisible:true})
        }
    }

    ifHaveClass(event:any,className:string){
        if(event.target.parentElement.parentElement.classList.contains(className) ||
        event.target.parentElement.classList.contains(className)){
            return true
        }
        return false
    }

    changeFirstPage(event:any){
        //切换一级页面
        this.setState({select:event.target.innerText})
    }

    //输入的时候对content进行更新
    updateContent = function(value:any){
        this.setState({content:value})
    }

    //双击时对文件内容进行渲染
    getAndRenderFile(event:any){
       getFileByID(event.target.id).then((res: { fid: any; title: any; content: any; }) => {
            this.setState({renderFid:res.fid,title:res.title,content:res.content})
        })
    }

    //删除文件



    render(){
        let secondPage:any = <div></div>
        let rightPage:any = <div></div>
        if(this.state.select === '文档'){
            secondPage = <Drawer title={this.state.title || '无正在编辑文件'}
                                  selectFid={this.state.fid} changeSelect={this.changeSelected.bind(this)}
                                  getDetail={this.getAndRenderFile.bind(this)}/>
           rightPage =  <MDEditor renderFid={this.state.renderFid} content={this.state.content} getValue={this.updateContent.bind(this)}/>

        }

        return <div className={style.content}>
            <Sidebar title='萝依' club='红色家园' detail='option'
                     changeSelect={this.changeFirstPage.bind(this)}/>
            {secondPage}
            <div className={style.right}>
                {rightPage}
            </div>
            {/*弹窗*/}
            {/*<PopUps title='新建文件'*/}
            {/*        content='请输入文件名'*/}
            {/*        ok={function () {*/}
            {/*            console.log(this.state.value)*/}
            {/*            this.state.popUpVisible = false*/}
            {/*        }.bind(this)}*/}
            {/*        cancel={function () {*/}
            {/*            debugger*/}
            {/*            this.state.popUpVisible = false*/}
            {/*        }.bind(this)}*/}
            {/*        type='input'*/}
            {/*        visible={this.state.popUpVisible}/>*/}
        </div>

    }
}
