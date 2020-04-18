import * as React from 'react'
import Options from "./Options/Options";
import './Sidebar.css'
import Operations from "./Operations/Operations";

export interface Props {
    title : string,
    club : string,
    detail: string
}

export default class Sidebar extends React.Component<Props,{}>{


    render(){
        return <div className='sidebar'>
            <div className='information'>
                <div className='title'>{this.props.title}</div>
                <div className='club'>{this.props.club}</div>
            </div>
            <hr className='line'/>
            {this.props.detail == 'option' ?
                <div>
                    <Options icon='M640 170.666667H256v682.666666h512V298.666667h-128V170.666667zM256 85.333333h426.666667l170.666666 170.666667v597.333333a85.333333 85.333333 0 0 1-85.333333 85.333334H256a85.333333 85.333333 0 0 1-85.333333-85.333334V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334z m85.333333 384h341.333334v85.333334H341.333333v-85.333334z m0 170.666667h341.333334v85.333333H341.333333v-85.333333z'
                             content='文档'/>
                    <Options icon='M439.594667 85.333333h144.810666a70.4 70.4 0 0 1 70.101334 60.970667l5.802666 44.8a17.066667 17.066667 0 0 0 8.192 12.458667l38.058667 22.528a17.066667 17.066667 0 0 0 15.146667 1.109333l46.848-19.2a71.082667 71.082667 0 0 1 88.021333 29.226667l72.405333 122.069333c18.218667 30.72 10.069333 69.973333-18.688 91.221333l-45.184 33.408a17.066667 17.066667 0 0 0-6.912 13.696v28.757334a17.066667 17.066667 0 0 0 6.912 13.696l45.226667 33.408c28.714667 21.205333 36.864 60.458667 18.645333 91.221333l-72.405333 122.026667a71.082667 71.082667 0 0 1-88.021333 29.226666l-46.848-19.2a17.066667 17.066667 0 0 0-15.146667 1.152l-38.058667 22.528a17.066667 17.066667 0 0 0-8.192 12.501334l-5.802666 44.8A70.4 70.4 0 0 1 584.405333 938.666667h-144.810666a70.4 70.4 0 0 1-70.101334-60.970667l-5.802666-44.8a17.066667 17.066667 0 0 0-8.192-12.458667l-38.058667-22.528a17.066667 17.066667 0 0 0-15.146667-1.109333l-46.848 19.2a71.082667 71.082667 0 0 1-88.021333-29.226667l-72.405333-122.069333a69.290667 69.290667 0 0 1 18.688-91.221333l45.184-33.408a17.066667 17.066667 0 0 0 6.912-13.696v-28.757334a17.066667 17.066667 0 0 0-6.912-13.696l-45.226667-33.408a69.290667 69.290667 0 0 1-18.645333-91.221333l72.405333-122.026667a71.082667 71.082667 0 0 1 88.021333-29.226666l46.848 19.2a17.066667 17.066667 0 0 0 15.146667-1.152l38.058667-22.528a17.066667 17.066667 0 0 0 8.192-12.501334l5.802666-44.8A70.4 70.4 0 0 1 439.594667 85.333333z m1.024 130.688a75.818667 75.818667 0 0 1-36.821334 55.466667l-51.712 30.464a76.970667 76.970667 0 0 1-67.925333 4.906667l-35.328-14.336a17.066667 17.066667 0 0 0-21.077333 7.04L178.645333 381.738667a17.066667 17.066667 0 0 0 4.565334 22.528l33.066666 24.277333c19.541333 14.293333 31.018667 36.906667 31.018667 61.013333v44.885334c0 24.106667-11.52 46.72-31.018667 61.013333l-33.066666 24.277333a17.066667 17.066667 0 0 0-4.565334 22.528l49.066667 82.176a17.066667 17.066667 0 0 0 21.12 7.04l35.328-14.336a76.970667 76.970667 0 0 1 67.925333 4.906667l51.712 30.421333c20.224 11.946667 33.792 32.384 36.821334 55.509334l4.010666 30.506666a17.066667 17.066667 0 0 0 16.896 14.848h100.949334a17.066667 17.066667 0 0 0 16.896-14.848l4.010666-30.506666c2.986667-23.125333 16.597333-43.605333 36.821334-55.466667l51.712-30.464a76.970667 76.970667 0 0 1 67.925333-4.906667l35.328 14.336a17.066667 17.066667 0 0 0 21.077333-7.04l49.109334-82.176a17.066667 17.066667 0 0 0-4.565334-22.528l-33.066666-24.277333a75.648 75.648 0 0 1-31.018667-61.013333v-44.885334c0-24.106667 11.52-46.72 31.018667-61.013333l33.066666-24.277333a17.066667 17.066667 0 0 0 4.565334-22.528l-49.066667-82.176a17.066667 17.066667 0 0 0-21.12-7.04l-35.328 14.336c-22.186667 9.045333-47.317333 7.210667-67.925333-4.906667l-51.712-30.421333a75.818667 75.818667 0 0 1-36.821334-55.509334l-4.010666-30.506666A17.066667 17.066667 0 0 0 562.474667 170.666667h-100.949334a17.066667 17.066667 0 0 0-16.896 14.848l-4.010666 30.506666zM682.666667 512a42.666667 42.666667 0 0 1-85.333334 0 85.333333 85.333333 0 1 0-85.333333 85.333333 42.666667 42.666667 0 0 1 0 85.333334 170.666667 170.666667 0 1 1 170.666667-170.666667z'
                             content='设置'/>
                </div> :
                this.props.detail == 'nodes' ? <div><Operations/><hr/></div> : <div></div>}
         </div>
    }
}
