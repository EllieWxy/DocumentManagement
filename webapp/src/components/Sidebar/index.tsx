import * as React from 'react'
import style from './index.m.css'
import {FileTextOutlined,SettingOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default class Sidebar extends React.Component<{}, {}> {

    iconStyle = {fontSize:'30px',margin:'30px 20px',display:'block',color:'white'}
    render() {
        return <div className={style.sidebar}>
            <Link to="/workspace">
                <FileTextOutlined style={this.iconStyle}/>
            </Link>
            <Link to="/setting">
                <SettingOutlined style={this.iconStyle}/>
            </Link>
        </div>
    }
}
