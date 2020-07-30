import * as React from 'react'
import {message, Modal, Tree, Input, Menu} from 'antd';
import {createFile, updateFile} from "apis/file";
import style from "./index.m.css"
import Operation from 'components/Operation'
import addIcon from "img/add.svg";
import TreeSelected from "components/TreeSelected";
import {UserContext} from 'context/userContext'

const { DirectoryTree } = Tree;
const { Search } = Input;

export interface IDrawerProps {
  selectFid: string,
  title: string,
  getDetail: (fid: string) => any,
  node: any
  handleSearch: () => any,
  search?: string
  handleContextMenu?: (e: any) => any
  menuStyle?: any
  rightClickNode: {
    rightClickFid: string,
    rightClickTitle: string
  }
  removeFile?: (title?: string, fid?: string) => any
  refreshFileTree?:()=>any,
  handleChangeTreeSelect?:(value:any)=>any,
}


interface IDrawerState {
  selectedKeys: any,
  fileName: string,
  visible:boolean,
  isAddNewFile:boolean,
  value:string,
  isRightClick:boolean,
  fatherFid:string,
  fatherHasChanged:boolean
}

export default class Drawer extends React.Component<IDrawerProps, IDrawerState> {

  static contextType = UserContext

  constructor(props: any) {
    super(props)
    this.state = {
      selectedKeys: [],
      fileName:'',
      visible:false,
      isAddNewFile:false,
      value:'',
      isRightClick:false,
      fatherFid:'',
      fatherHasChanged:false
    }
  }

  handleChangeFileName = (e: any) => {
    this.setState({fileName: e.target.value})
  }

  handleClickAddIcon = () => {
    this.setState({visible: true,fileName:'',isAddNewFile:true,isRightClick:false})
  }

  onCancel = () => {
    this.setState({visible: false});
  }
  onOk = () => {
    const that = this
    const selectFid = this.props.rightClickNode.rightClickFid
    const {fatherFid,isAddNewFile, fileName, fatherHasChanged} = this.state
    this.setState({visible: false});
    if(isAddNewFile){
      createFile({title: fileName, content:'', father: fatherFid})
        .then((res: any) => {
          if (res.message === '文章创建成功') {
            message.success('文章创建成功')
            that.props.refreshFileTree()
          } else {
            message.error(res)
          }
        })
      return
    }
    updateFile(selectFid,
      { title: fileName,
                content:undefined,
                father:fatherHasChanged?fatherFid:undefined}).then(res => {
      message.success('操作成功')
      this.props.refreshFileTree()
    })
  };

  menuHandleClick = (e: any) => {
    this.setState({isRightClick:true})
    const {key} = e
    const {rightClickFid, rightClickTitle} = this.props.rightClickNode
    if (key === 'remove') {
      this.props.removeFile(rightClickTitle, rightClickFid)
      return
    }
    this.setState({visible: true})
    if (key === 'add') {
      this.setState({fileName:'',fatherFid:rightClickFid,isAddNewFile:true,fatherHasChanged:true});
      return
    }
    if (key === 'rename') {
      this.setState({
        fileName:this.props.rightClickNode.rightClickTitle,isAddNewFile:false,fatherHasChanged:false
      });
    }
  }

  handleChangeSelectTree = (value:string) => {
    this.setState({isAddNewFile:false,fatherFid:value,fatherHasChanged:true})
    // this.props.handleChangeTreeSelect(value);
  }

  render() {
    const onSelect = (selectedKeys: any) => {
      this.props.getDetail(selectedKeys)
    };
    let isClubName = this.props.rightClickNode.rightClickFid === this.context.club.clubName
    return <div className={style.drawer}>
      <div className={style.top}>
        <Search
          placeholder="搜索..."
          onSearch={this.props.handleSearch}
          className={style.search}
        />
        <Operation icon={addIcon} className='add' handleClick={this.handleClickAddIcon.bind(this)}/>
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
        {!isClubName &&
              <Menu.Item key="remove">删除</Menu.Item>
              // <Menu.Item key="rename">重命名</Menu.Item>)
        }
        {!isClubName &&
          <Menu.Item key="rename">重命名</Menu.Item>
        }

      </Menu>
      <Modal
        title="请输入文件名"
        visible={this.state.visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        okText="确认"
        cancelText="取消"
      >
        <div>文件路径</div>
        <TreeSelected isAddNewFile={this.state.isAddNewFile} node={this.props.node}
                      selected={this.props.rightClickNode.rightClickFid || ''}
                      handleChangeTreeSelect={this.handleChangeSelectTree.bind(this)}
                      isRightClick={this.state.isRightClick}
                      fatherFid={this.state.fatherFid}/>
        <Input className={style.fileName} type='text' value={this.state.fileName} onChange={this.handleChangeFileName.bind(this)}/>
      </Modal>
    </div>
  }
}
