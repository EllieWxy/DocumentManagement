import * as React from 'react'
import Sidebar from "components/Sidebar";
import MDEditor from "components/MDEditor";
import style from './index.m.css'
import {getFileByID, updateFile, removeFile, getFile} from "apis/file";
import Drawer from "./Drawer";
import {message,Modal} from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface IWorkSpace {
    fid:string,
    title:string,
    content:string,
    renderFid:string,
    select:string,
    popUpVisible:boolean,
    node:{
        fid:string,
        title:string,
        content:string
        child:[]
    }
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
            popUpVisible:false,
            node:{
                fid:'',
                title:'',
                content:'',
                child:[]
            }
        }
        getFile().then((res:any) => {
            this.setState({node:res})
        })
    }

    changeSelected(event:any){
        //切换选中文件
        if(event.target.classList.contains('node')){
            this.setState({fid:event.target.id})
            return
        }
        //新增文件

    }


    changeFirstPage(event:any){
        //切换一级页面
        this.setState({select:event.target.dataset.id})
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
    removeFile(){
        const that = this
        confirm({
            title: `确定删除文件${that.state.title}吗？`,
            icon: <ExclamationCircleOutlined />,
            content: '此操作不可撤销',
            onOk() {
                removeFile(that.state.fid).then((res:any) => {
                    that.setState({renderFid:'',title:'',content:''})
                })
                getFile().then((res:any) => {
                    that.setState({node:res})
                })
                message.success('删除成功');
            },
            onCancel() {
                debugger
                console.log('Cancel');
            },
        });

    }
    //保存文件
    updateFile(){
        updateFile(this.state.fid,
            {title:this.state.title,content:this.state.content,father:undefined}).then((res:any) =>{
            message.success('保存成功');
        })
    }

    //添加文件


    render(){
        let secondPage:any = <div></div>
        let rightPage:any = <div></div>
        if(this.state.select === '文档'){
            secondPage = <Drawer title={this.state.title || '无正在编辑文件'}
                                 node = {this.state.node}
                                  selectFid={this.state.fid} changeSelect={this.changeSelected.bind(this)}
                                  getDetail={this.getAndRenderFile.bind(this)}/>
           rightPage =  <MDEditor renderFid={this.state.renderFid} content={this.state.content} getValue={this.updateContent.bind(this)}
                         removeFile={this.removeFile.bind(this)} saveFile={this.updateFile.bind(this)}/>

        }

        return <div className={style.content}>
            <Sidebar title='萝依' club='红色家园' detail='option'
                     changeSelect={this.changeFirstPage.bind(this)}/>
            {secondPage}
            <div className={style.right}>
                {rightPage}
            </div>
        </div>

    }
}
