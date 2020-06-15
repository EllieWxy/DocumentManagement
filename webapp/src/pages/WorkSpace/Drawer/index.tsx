import * as React from 'react'
import {message,Modal,Tree} from 'antd';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Input from "components/Input";
import Operation from "components/Operation";
import searchIcon from "img/search.svg";
import addIcon from "img/add.svg";
import {createFile} from "apis/file";
import style from "./index.m.css"

const { confirm } = Modal;

export interface IDrawer {
    selectFid:string,
    title:string,
    changeSelect:() => any,
    getDetail:(fid:string) => any,
    node:any
    handleSuffix:() => any,
    search?:string
    onChangeSearch:()=>any
}

export default class Drawer extends React.Component<IDrawer,{newFileName:string}>{

    constructor(props:any){
        super(props)
        this.state = {
            newFileName : ''
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
        confirm({
            title: `请输入文件名`,
            icon: <ExclamationCircleOutlined />,
            content:
              <div>
                  确定创建{fileFather}的子文件
                  <Input type='text' placeholder='新建文件' onChange={that.changeFileName.bind(that)}/>
              </div>,
            onOk() {
                createFile({title:that.state.newFileName,content:'',father:that.props.selectFid})
                    .then((res:any) => {
                        if(res === '创建文件成功'){
                            message.success('创建文件成功')
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
                <Input placeholder='search...' type='text' className='hasBack' onChange={this.props.onChangeSearch}
                       suffix={searchIcon} value={this.props.search} onSuffix={this.props.handleSuffix}/>
                <Operation icon={addIcon} className='add' handleClick={this.handleClickAdd.bind(this)}/>
            </div>
            <div onClick={this.props.changeSelect} className={style.nodeTree}>
                <div className={style.title}>{this.props.title}</div>
                <hr/>
                {this.props.node.length > 0 ?
                    <Tree
                    onSelect={onSelect}
                    treeData={this.props.node}
                /> : <div>这里空空如也诶</div>}

            </div>
        </div>
    }
}
