import * as React from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import MDEditorDom from "../../components/MDEditor/MDEditor";

export default class WorkSpace extends React.Component{
    render(){
        return <div className='content'>
            <Sidebar title='萝依' club='红色家园' detail='option'/>
            <Sidebar title='fileName' club='' detail='nodes'/>
            <MDEditorDom/>
        </div>

    }
}
