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
        if(this.props.node && this.props.node.child){
            const nodes = this.props.node.child.map((item:any) => {
                return <NodeTree node={item} selectId={this.props.selectedFid}/>
            })
            return <div>{nodes}</div>
        }
        else {
            return <div>当前文件树为空哦</div>
        }

    }
}
