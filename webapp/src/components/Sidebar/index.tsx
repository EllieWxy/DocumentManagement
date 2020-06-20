import * as React from 'react'
import style from './index.m.css'
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
    render() {
        return <div className={style.sidebar}>
            <FileTextOutlined style={this.iconStyle} onClick={this.props.onClickContent}/>
            <SettingOutlined style={this.iconStyle} onClick={this.props.onClickSetting}/>
        </div>
    }
}
