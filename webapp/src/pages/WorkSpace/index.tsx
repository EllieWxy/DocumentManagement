import * as React from 'react'
import {Prompt} from 'react-router-dom';
import {message, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {getFileByID, updateFile, removeFile, getFile, searchFile} from "apis/file";
import Sidebar from "components/Sidebar";
import MDEditor from "components/MDEditor";
import Drawer from "./Drawer";
import style from './index.m.css'
import {UserContext} from 'context/userContext'

const {confirm} = Modal;

interface IWorkSpaceState {
  fid: string,
  title: string,
  renderContent: string,
  fileContent: string,
  search: string,
  node: [{
    fid: string,
    title: string,
    content: string
    children: [],
    father:string
  }],
  menu: {
    top: string,
    left: string,
    visibility: string
  },
  rightClickFid: string,
  rightClickTitle: string,
  fatherFid:string
}

export default class WorkSpace extends React.Component<{}, IWorkSpaceState> {

  static contextType = UserContext

  constructor(props: any) {
    super(props)
    this.state = {
      fid: '',
      title: '',
      renderContent: '',
      fileContent: '',
      search: '',
      node: [{
        fid: '',
        title: '',
        content: '',
        children: [],
        father:''
      }],
      menu: {
        top: '',
        left: '',
        visibility: 'hidden'
      },
      rightClickFid: '',
      rightClickTitle: '',
      fatherFid:''
    }
    getFile().then((res: any) => {
      if (res === '未登录') {
        message.error('请先进行登录')
        location.href = location.origin + '/login'
        return
      }
      this.setState({node: res})
    })

  }

  //输入的时候对content进行更新
  updateContent = function (value: any) {
    this.setState({renderContent: value})
  }

  //选中时对文件内容进行渲染
  getAndRenderFile(fid: string) {
    const that = this
    fid = fid.toString()
    if (this.state.fid !== fid) {
      if (this.state.renderContent !== this.state.fileContent) {
        confirm({
          title: `需要对文件${that.state.title}进行保存吗？`,
          icon: <ExclamationCircleOutlined/>,
          onOk() {
            that.updateFile()
            that.changeRenderFile(fid)
          },
          onCancel() {
            that.changeRenderFile(fid)
          }
        });
      } else {
        this.changeRenderFile(fid)
      }
    } else {
      this.setState({fid: '', title: '', renderContent: '', fileContent: ''})
    }
  }

  changeRenderFile(fid: string) {
    getFileByID(fid).then((res: { fid: any; title: any; content: any; }) => {
      this.setState({fid: res.fid, title: res.title, renderContent: res.content, fileContent: res.content})
    })
  }

  handleSearch = (search: string) => {
    if (search === '') {
      getFile().then((res: any) => {
        this.setState({node: res})
      })
    } else {
      searchFile(search).then(res => {
        this.setState({node: res})
      })
    }
  }

  //删除文件
  removeFile(title?: string, fid?: string) {
    if (this.state.fid === '' && !fid) {
      message.error('没有可以删除的文件');
      return;
    }
    const _fid = fid ? fid : this.state.fid
    const _title = title ? title : this.state.title
    const that = this
    confirm({
      title: `确定删除文件${_title}吗？`,
      icon: <ExclamationCircleOutlined/>,
      content: '此操作不可撤销',
      onOk() {
        removeFile(_fid).then(() => {
          that.setState({fid: '', title: '', renderContent: '', fileContent: ''})
          message.success('删除成功');
          getFile().then((res: any) => {
            that.setState({node: res})
          })
        })
      }
    });

  }

  //保存文件
  updateFile() {
    if (this.state.fid === '') {
      message.error('没有可以保存的文件');
      return;
    }
    updateFile(this.state.fid,
      {title: this.state.title, content: this.state.renderContent, father: undefined}).then(() => {
      this.setState({fileContent: this.state.renderContent})
      message.success('保存成功');
    })
  }

  //每次更新后重新获取文件
  refreshFileTree() {
    getFile().then((res: any) => {
      this.setState({node: res})
    })
  }

  //关闭浏览器时进行阻拦
  componentWillMount() {
    window.addEventListener('beforeunload', this.beforeunload);
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload);
  }

  beforeunload = (e: any) => {
    if (this.state.fileContent !== this.state.renderContent) {
      let confirmationMessage = '您还没保存文件呢，确定要离开吗？';
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    }
  }

  //右键菜单
  handleClick = () => {
    this.setState({menu: {left:'0', top:'0', visibility: 'hidden'}})
  }
  handleContextMenu = (e: any) => {
    this.setState({
      rightClickFid: e.node.fid, rightClickTitle: e.node.title,fatherFid:e.node.fid,
      menu: {left: e.event.clientX + 'px', top: e.event.clientY + 'px', visibility: 'visible'}
    })
  }

  render() {
    if(!this.context.club){
      this.context.getClub()
    }
    let contentHasChanged = Boolean(this.state.fileContent !== this.state.renderContent)
    return <div className={style.content} onClick={this.handleClick}>
      <Prompt message={() => {
        if (contentHasChanged) {
          return `您还有文件未保存，确定要离开吗？`
        }
      }}/>
      <Sidebar/>
      <Drawer title={this.state.title || '无正在编辑文件'}
              node={this.state.node}
              selectFid={this.state.fid}
              getDetail={this.getAndRenderFile.bind(this)}
              handleSearch={this.handleSearch.bind(this)}
              search={this.state.search}
              handleContextMenu={this.handleContextMenu}
              menuStyle={this.state.menu}
              rightClickNode={{
                rightClickFid: this.state.rightClickFid,
                rightClickTitle: this.state.rightClickTitle
              }}
              removeFile={this.removeFile.bind(this)}
              refreshFileTree={this.refreshFileTree.bind(this)}
              />
      <div className={style.right}>
        {this.state.title ?
          <MDEditor renderFid={this.state.fid}
                    content={this.state.renderContent}
                    getValue={this.updateContent.bind(this)}
                    removeFile={this.removeFile.bind(this)}
                    saveFile={this.updateFile.bind(this)}/>
          : null}
      </div>
    </div>

  }
}
