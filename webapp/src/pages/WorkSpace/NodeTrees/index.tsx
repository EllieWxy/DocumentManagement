import * as React from 'react'
import NodeTree from "components/NodeTree";

interface INodeTrees {
    node: {
        fid:string,
        title:string,
        child:any,
    }
    selectedFid:string
}

export default class NodeTrees extends React.Component<INodeTrees,{}>{

    constructor(props:any){
        super(props)
    }

    render(){
        const nodes = this.props.node.child.map((item:any) => {
           return <NodeTree node={item} selectId={this.props.selectedFid}/>
        })
        return <div>{nodes}</div>
    }
}
