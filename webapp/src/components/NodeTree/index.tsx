import * as React from 'react'
import apiGetFiles from "apis/getFile";
import Node from '../Node'
import './index.css'

interface INodeTree {
    fid:string,
    title:string,
    childNodes:any,
}

export default class NodeTree extends React.Component<INodeTree,{visible:boolean}>{

    constructor(props:any){
        super(props)
        this.state = {
            visible:false
        }
    }

    toggle(){
        this.setState({visible:!this.state.visible})
    }

    handleClick = function(fid:string){
        apiGetFiles(fid).then(res => {
            debugger
        })
    }

    render(){
        debugger
        var childNodes;
        if (this.props.childNodes) {
            childNodes = this.props.childNodes.map(function(node:any, index:any){
                return <li key={index}><NodeTree title={node.title} fid={node.fid} childNodes={node.childNodes}/></li>
            })

            let className1 = 'togglable';
            let className2 = this.state.visible ? 'togglable-down' : 'togglable-up';
            var classNameFinal = className1 + ' ' + className2;
        }

        var style;

        if (!this.state.visible) {
            style = {display: "none"};
        }

        return (
            <div>
                <h5 onClick={()=>{this.toggle()}} className={classNameFinal}>
                    {this.props.title}
                </h5>
                <ul style={style}>
                    {childNodes}
                </ul>
            </div>
        )
    }
}
