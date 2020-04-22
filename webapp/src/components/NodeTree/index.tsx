import * as React from 'react'
import './index.css'

interface INodeTree {
    node: {
        fid:string,
        title:string,
        child:any,
    },
    selectId :string
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

    render(){
        let childNodes;
        if (this.props.node.child) {
            const selectFid = this.props.selectId
            childNodes = this.props.node.child.map(function(node:any, index:any){
                return <li key={index}><NodeTree node={node} selectId={selectFid}/></li>
            })

            const togglable = 'togglable';
            const upOrDown = this.state.visible ? 'togglable-down' : 'togglable-up';
            var className = togglable + ' ' + upOrDown;

        }

        let style;

        if (!this.state.visible) {
            style = {display: "none"};
        }
        if(this.props.node.fid === this.props.selectId){
            className = className + ' selected'
        }

        return (
            <div>
                <h5 onClick={()=>{this.toggle()}} className={className} id={this.props.node.fid}>
                    {this.props.node.title}
                </h5>
                <ul style={style}>
                    {childNodes}
                </ul>
            </div>
        )
    }
}
