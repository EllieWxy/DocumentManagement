import * as React from 'react'
import {message,Modal} from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Prompt } from 'react-router-dom';
import {getFileByID, updateFile, removeFile, getFile, searchFile} from "apis/file";
import Sidebar from "components/Sidebar";
import MDEditor from "components/MDEditor";
import Drawer from "./Drawer";
import style from './index.m.css'

const { confirm } = Modal;

interface IWorkSpace {
    fid:string,
    title:string,
    renderContent:string,
    fileContent:string,
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
            renderContent:'',
            fileContent:'',
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

    //输入的时候对content进行更新
    updateContent = function(value:any){
        this.setState({renderContent:value})
    }

    //选中时对文件内容进行渲染
    getAndRenderFile(fid:string){
        const that = this
        fid = fid.toString()
        if(this.state.renderContent !== this.state.fileContent){
            confirm({
                title: `需要对文件${that.state.title}进行保存吗？`,
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    that.updateFile()
                    that.changeRenderFile(fid)
                },
                onCancel(){
                    that.changeRenderFile(fid)
                }
            });
        } else {
            this.changeRenderFile(fid)
        }
    }

    changeRenderFile(fid:string){
        getFileByID(fid).then((res: { fid: any; title: any; content: any; }) => {
            this.setState({fid:res.fid,title:res.title,renderContent:res.content,fileContent:res.content})
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
        if(this.state.fid === ''){
            message.error('没有可以删除的文件');
            return;
        }
        const that = this
        confirm({
            title: `确定删除文件${that.state.title}吗？`,
            icon: <ExclamationCircleOutlined />,
            content: '此操作不可撤销',
            onOk() {
                removeFile(that.state.fid).then(() => {
                    that.setState({fid:'',title:'',renderContent:'',fileContent:''})
                })
                getFile().then((res:any) => {
                    that.setState({node:res})
                })
                message.success('删除成功');
            }
        });

    }

    //保存文件
    updateFile(){
        if(this.state.fid === ''){
            message.error('没有可以保存的文件');
            return;
        }
        updateFile(this.state.fid,
            {title:this.state.title,content:this.state.renderContent,father:undefined}).then(() =>{
                this.setState({fileContent:this.state.renderContent})
            message.success('保存成功');
        })
    }

    //每次更新后重新获取文件
    updateFileTree(){
        getFile().then((res:any) => {
            this.setState({node:res})
        })
    }

    //关闭浏览器时进行阻拦
    componentWillMount(){
        window.addEventListener('beforeunload',this.beforeunload);
    }
    componentWillUnmount () {
        window.removeEventListener('beforeunload', this.beforeunload);
    }
    beforeunload = (e:any)=>{
        if(this.state.fileContent !== this.state.renderContent){
            let confirmationMessage = '您还没保存文件呢，确定要离开吗？';
            (e || window.event).returnValue = confirmationMessage;
            return confirmationMessage;
        }
    }

    render(){
        let contentHasChanged = Boolean(this.state.fileContent !== this.state.renderContent)
        return <div className={style.content}>
            <Prompt message={() => {
               if(contentHasChanged){
                   return `您还有文件未保存，确定要离开吗？`
               }
            }} />
            <Sidebar/>
            <Drawer title={this.state.title || '无正在编辑文件'}
                    node = {this.state.node}
                    selectFid={this.state.fid}
                    getDetail={this.getAndRenderFile.bind(this)}
                    handleSuffix={this.handleSuffix.bind(this)}
                    search = {this.state.search}
                    onChangeSearch={this.handleChangeSearch.bind(this)}
                    getFiles={this.updateFileTree.bind(this)}/>
            <div className={style.right}>
                {this.state.title ?
                    <MDEditor renderFid={this.state.fid}
                              content={this.state.renderContent}
                              getValue={this.updateContent.bind(this)}
                              removeFile={this.removeFile.bind(this)}
                              saveFile={this.updateFile.bind(this)}/>
                              : null}
            </div>
        </div>

    }
}
