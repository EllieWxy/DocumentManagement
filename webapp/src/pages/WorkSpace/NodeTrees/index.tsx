import * as React from 'react'
import NodeTree from "components/NodeTree";

interface INodeTrees {
    node: {
        fid:string,
        title:string,
        child:any,
    }
}

export default class NodeTrees extends React.Component<INodeTrees,{selectedFid:string}>{

    constructor(props:any){
        super(props)
        this.state = {
            selectedFid:''
        }
    }

    changeSelect(event:any){
        this.setState({selectedFid:event.target.id})
    }

    render(){
        const nodes = this.props.node.child.map((item:any) => {
           return <NodeTree node={item} selectId={this.state.selectedFid}/>
        })
        return <div onClick={this.changeSelect.bind(this)}>{nodes}</div>
    }
}
