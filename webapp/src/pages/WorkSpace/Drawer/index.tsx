import * as React from 'react'
import {message, Modal, Tree, Input, Menu} from 'antd';
import {createFile, updateFile} from "apis/file";
import style from "./index.m.css"

const {DirectoryTree} = Tree;
const { Search } = Input;

export interface IDrawerProps {
  selectFid: string,
  title: string,
  getDetail: (fid: string) => any,
  node: any
  handleSearch: () => any,
  search?: string
  getFiles?: () => any,
  handleContextMenu?: (e: any) => any
  menuStyle?: any
  rightClickNode: {
    rightClickFid: string,
    rightClickTitle: string
  }
  removeFile?: (title?: string, fid?: string) => any
  updateFileTree?:()=>any
}

interface IDrawerState {
  selectedKeys: any,
  fileName: string,
  visible:boolean,
  isAddNewFile:boolean
}

export default class Drawer extends React.Component<IDrawerProps, IDrawerState> {

  constructor(props: any) {
    super(props)
    this.state = {
      selectedKeys: [],
      fileName:'',
      visible:false,
      isAddNewFile:false
    }
  }

  handleChangeFileName = (e: any) => {
    this.setState({fileName: e.target.value})
  }

  //新建文件
  showModalForNewFile = () => {
    this.setState({
      visible: true,fileName:'',isAddNewFile:true
    });
  }

  //重命名文件
  showModal = () => {
    this.setState({
      visible: true,fileName:this.props.rightClickNode.rightClickTitle,isAddNewFile:false
    });
  };
  onCancel = () => {
    this.setState({
      visible: false,
    });
  }

  onOk = () => {
    const that = this
    const fid = this.props.rightClickNode.rightClickFid
    this.setState({
      visible: false,
    });
    if(this.state.isAddNewFile){
      createFile({title: that.state.fileName, content:'', father: fid})
        .then((res: any) => {
          if (res.message === '文章创建成功') {
            message.success('文章创建成功')
            that.props.getFiles()
          } else {
            message.error(res)
          }
        })
      return
    }
    updateFile(fid, {title: this.state.fileName,content:undefined,father:undefined}).then(res => {
      message.success(res)
      this.props.updateFileTree()
    })
  };

  menuHandleClick = (e: any) => {
    const {key} = e
    const {rightClickFid, rightClickTitle} = this.props.rightClickNode
    if (key === 'remove') {
      this.props.removeFile(rightClickTitle, rightClickFid)
      return
    }
    if (key === 'add') {
      this.showModalForNewFile()
      return
    }
    if (key === 'rename') {
      this.showModal()
    }
  }

  render() {
    const onSelect = (selectedKeys: any) => {
      this.props.getDetail(selectedKeys)
    };

    return <div className={style.drawer}>
      <div className={style.top}>
        <Search
          placeholder="搜索..."
          onSearch={this.props.handleSearch}
          className={style.search}
        />
      </div>
      <div className={style.nodeTree}>
        <div className={style.title}>{this.props.title}</div>
        <hr/>
        {this.props.node.length > 0 ?
          <DirectoryTree className={style.tree}
                         selectedKeys={[this.props.selectFid]}
                         onSelect={onSelect}
                         treeData={this.props.node}
                         onRightClick={this.props.handleContextMenu.bind(this)}
          /> : <div>这里空空如也诶</div>}
      </div>
      <Menu className={style.menu} style={this.props.menuStyle} onClick={this.menuHandleClick}>
        <Menu.Item key="add">新建</Menu.Item>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="rename">重命名</Menu.Item>
      </Menu>
      <Modal
        title="请输入文件名"
        visible={this.state.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        okText="确认"
        cancelText="取消"
      >
        {this.state.isAddNewFile ?
          <div>确定创建{this.props.rightClickNode.rightClickTitle}的子文件吗？</div>
        : null}
        <Input type='text' value={this.state.fileName} onChange={this.handleChangeFileName.bind(this)}/>
      </Modal>
    </div>
  }
}
