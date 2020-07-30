import * as React from 'react'
import {TreeSelect, message} from 'antd';

interface ITreeSelectedProps {
  node:any,
  selected:string,
  isAddNewFile:boolean,
  handleChangeTreeSelect:(value:any)=>any,
  isRightClick:boolean,
  fatherFid:string
}

interface ITreeSelectedState {
  value:string,
  valueMap:any,
  treeData:any
}

export default class TreeSelected extends React.Component<ITreeSelectedProps,ITreeSelectedState>{

  constructor(props:any){
    super(props)
    this.state = {
      value:'',
      valueMap:{},
      treeData:{}
    }
    this.loops(this.props.node)
  }

  onChange = (value:string)=> {
    if(value === this.props.selected){
      message.error('选择无效，禁止套娃')
      return
    }
    this.setState({ value:this.state.valueMap[value].path});
    this.props.handleChangeTreeSelect(value)
  };

  componentDidMount(): void {
    const {selected, isAddNewFile, isRightClick}= this.props
    if(!isRightClick){
      return
    }
    const fid = isAddNewFile ? selected : this.state.valueMap[selected].father
    this.setState({ value : this.state.valueMap[fid].path});
  }

  loops = (list:any, parent?:any) => {
    return (list || []).map(({ children, title,fid, father} : any) => {
      const path = parent ? parent + title + '/' : title + '/'
      const node = (this.state.valueMap[fid] = {
        path,
        title,
        children,
        value:fid,
        father
      });
      node.children = this.loops(children, path);
      return node;
    });
  }

  componentDidUpdate(prevProps:any){
    const {selected,isAddNewFile,isRightClick} = this.props
    if(prevProps.isRightClick && !isRightClick){  //点击新建按钮
      this.setState({value:undefined})
      return
    }
    if(selected === prevProps.selected && isAddNewFile === prevProps.isAddNewFile){
      return
    }
    const fid = isAddNewFile ? selected : this.state.valueMap[selected].father
    this.setState({ value : this.state.valueMap[fid].path});
  }

  render(){
    const treeData = this.loops(this.props.node);
    return <TreeSelect
      style={{ width: '100%' }}
      value={this.state.value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={this.onChange}
      treeData={treeData}
    >
    </TreeSelect>
  }
}
