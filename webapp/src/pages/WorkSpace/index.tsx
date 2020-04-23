import * as React from 'react'
import Sidebar from "components/Sidebar";
import MDEditor from "components/MDEditor";
import './index.css'
import {getFileDetail} from "apis/file";

export default class WorkSpace extends React.Component<{},{fid:string,title:string,content:string}>{
    constructor(props:any){
        super(props)
        this.state = {
                fid:'',
                title:'',
                content:''

        }
    }

    changeSelected(event:any){
        this.setState({fid:event.target.id})
    }

    getAndRenderFile(event:any){
        getFileDetail(event.target.id).then(res => {
            this.setState({title:res.title,content:res.content})
        })
    }


    render(){
        return <div className='content'>
            <Sidebar title='萝依' club='红色家园' detail='option' selectFid={this.state.fid}
                     changeSelect={null} getDetail={null}/>
           <Sidebar title='fileName' club='' detail='nodes'
                    selectFid={this.state.fid} changeSelect={this.changeSelected.bind(this)}
                    getDetail={this.getAndRenderFile.bind(this)}/>
            <div className='right'>
                <MDEditor content={this.state.content}/>
            </div>
        </div>

    }
}
