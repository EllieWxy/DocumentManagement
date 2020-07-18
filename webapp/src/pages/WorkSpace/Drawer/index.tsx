import * as React from 'react'
import {message,Modal,Tree,Input,Menu} from 'antd';
import { ExclamationCircleOutlined,SearchOutlined } from '@ant-design/icons';
import {createFile} from "apis/file";
import Operation from "components/Operation";
import addIcon from "img/add.svg";
import style from "./index.m.css"

const { confirm } = Modal;
const { DirectoryTree } = Tree;

export interface IDrawerProps {
    selectFid:string,
    title:string,
    getDetail:(fid:string) => any,
    node:any
    handleSuffix:() => any,
    search?:string
    onChangeSearch:()=>any,
    getFiles?:() => any,
    handleContextMenu?:(e:any)=>any
    menuStyle:any
    menuHandleClick?:(e:any)=>any
}

interface IDrawerState {
    newFileName:string,
    selectedKeys:any,

}

export default class Drawer extends React.Component<IDrawerProps,IDrawerState>{

    constructor(props:any){
        super(props)
        this.state = {
            newFileName : '',
            selectedKeys: [],
        }
    }

    changeFileName = (event:any) => {
        this.setState({
            newFileName:event.target.value
        })
    }

    handleClickAdd = ()=>{
        const that = this
        const fileFather = this.props.title === '无正在编辑文件' ? 'redhome' : this.props.title;
        const fidFather = this.props.selectFid || undefined
        confirm({
            title: `请输入文件名`,
            icon: <ExclamationCircleOutlined />,
            content:
              <div>
                  确定创建{fileFather}的子文件
                  <Input type='text' placeholder='新建文件' onChange={that.changeFileName.bind(that)}/>
              </div>,
            onOk() {
                createFile({title:that.state.newFileName,content:'',father:fidFather})
                    .then((res:any) => {
                        if(res.message === '文章创建成功'){
                            message.success('文章创建成功')
                            that.props.getFiles()
                        } else {
                            message.error(res)
                        }
                    })
            }
        });
    }

    render(){
        const onSelect = (selectedKeys:any) => {
            this.props.getDetail(selectedKeys)
        };

        return <div className={style.drawer}>
            <div className={style.top}>
                <Input size="large" placeholder="搜索" className={style.search}
                       suffix={<SearchOutlined />} onChange={this.props.onChangeSearch}/>
                <Operation icon={addIcon} className='add' handleClick={this.handleClickAdd.bind(this)}/>
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
            <Menu className={style.menu} style={this.props.menuStyle} onClick={this.props.menuHandleClick}>
                <Menu.Item key="add">新建</Menu.Item>
                <Menu.Item key="remove">删除</Menu.Item>
                <Menu.Item key="rename">重命名</Menu.Item>
            </Menu>
        </div>
    }
}
