import * as React from 'react'
import Sidebar from "components/Sidebar";
import MDEditor from "components/MDEditor";
import style from './index.m.css'
import {getFileByID, updateFile, removeFile, getFile, searchFile} from "apis/file";
import Drawer from "./Drawer";
import {message,Modal} from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

interface IWorkSpace {
    fid:string,
    title:string,
    content:string,
    select:string,
    popUpVisible:boolean,
    search:string,
    node:[{
        fid:string,
        title:string,
        content:string
        children:[]
    }]
}

export default class WorkSpace extends React.Component<{},IWorkSpace>{
    constructor(props:any){
        super(props)
        this.state = {
            fid:'',
            title:'',
            content:'',
            select :'文档',
            popUpVisible:false,
            search:'',
            node:[{
                fid:'',
                title:'',
                content:'',
                children:[]
            }]
        }
        getFile().then((res:any) => {
            if(res === '未登录'){
                message.error('请先进行登录')
                location.href = location.origin + '/login'
                return
            }
            this.setState({node:res})
        })
    }

    changeSelected(fid:string){
        //切换选中文件
        this.setState({fid:fid})
    }


    handleClickContent(event:any){
        //切换一级页面
        this.setState({select:'文档'})
    }
    handleClickSetting(event:any){
        //切换一级页面
        this.setState({select:'设置'})
    }

    //输入的时候对content进行更新
    updateContent = function(value:any){
        this.setState({content:value})
    }

    //选中时对文件内容进行渲染
    getAndRenderFile(fid:string){
       getFileByID(fid).then((res: { fid: any; title: any; content: any; }) => {
            this.setState({fid:res.fid,title:res.title,content:res.content})
        })
    }

    handleSuffix = ()=>{
        if(this.state.search === ''){
            getFile().then((res:any) => {
                this.setState({node:res})
            })
        } else {
            searchFile(this.state.search).then(res => {
                this.setState({node:res})
            })
        }
    }

    handleChangeSearch = (event:any) => {
        this.setState({search:event.target.value})
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
                    that.setState({fid:'',title:'',content:''})
                })
                getFile().then((res:any) => {
                    that.setState({node:res})
                })
                message.success('删除成功');
            },
            onCancel() {
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

    render(){
        let secondPage:any = <div></div>
        let rightPage:any = <div></div>
        if(this.state.select === '文档'){
            secondPage = <Drawer title={this.state.title || '无正在编辑文件'}
                                 node = {this.state.node}
                                  selectFid={this.state.fid} changeSelect={this.changeSelected.bind(this)}
                                  getDetail={this.getAndRenderFile.bind(this)}
                                handleSuffix={this.handleSuffix.bind(this)}
                                search = {this.state.search}
                                onChangeSearch={this.handleChangeSearch.bind(this)}/>
           rightPage =  <MDEditor renderFid={this.state.fid} content={this.state.content} getValue={this.updateContent.bind(this)}
                         removeFile={this.removeFile.bind(this)} saveFile={this.updateFile.bind(this)}/>

        }

        return <div className={style.content}>
            <Sidebar title='萝依' club='红色家园' detail='option'
                     onClickContent={this.handleClickContent.bind(this)}
                     onClickSetting={this.handleClickSetting.bind(this)}/>
            {secondPage}
            <div className={style.right}>
                {rightPage}
            </div>
        </div>

    }
}
