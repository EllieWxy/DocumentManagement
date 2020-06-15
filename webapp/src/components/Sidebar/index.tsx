import * as React from 'react'
import style from './index.m.css'
import Options from "./Options";
import documentIcon from 'img/document.svg'
import settingIcon from 'img/setting.svg'
import {FileTextOutlined,SettingOutlined} from '@ant-design/icons'

export interface ISidebarProps {
    title: string,
    club: string,
    detail: string,
    onClickContent: () => any,
    onClickSetting: () => any,
}


export default class Sidebar extends React.Component<ISidebarProps, {}> {

    iconStyle = {fontSize:'30px',margin:'30px 20px',display:'block'}
    //每一个设置一个onClick
    render() {
        return <div className={style.sidebar}>
            <FileTextOutlined style={this.iconStyle} onClick={this.props.onClickContent}/>
            <SettingOutlined style={this.iconStyle} onClick={this.props.onClickSetting}/>
        </div>
    }
}
