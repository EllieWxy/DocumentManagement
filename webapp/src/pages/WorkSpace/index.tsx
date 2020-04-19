import * as React from 'react'
import Sidebar from "components/Sidebar";
import MDEditor from "components/MDEditor";

export default class WorkSpace extends React.Component{
    render(){
        return <div className='content'>
            <Sidebar title='萝依' club='红色家园' detail='option'/>
            <Sidebar title='fileName' club='' detail='nodes'/>
            <MDEditor/>
        </div>

    }
}
