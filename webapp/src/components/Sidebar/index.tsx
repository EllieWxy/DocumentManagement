import * as React from 'react'
import style from './index.m.css'

import Options from "./Options";
import {getFile} from "apis/file";

import documentIcon from 'img/document.svg'
import settingIcon from 'img/setting.svg'


export interface ISidebarProps {
    title: string,
    club: string,
    detail: string,
    changeSelect: () => any,
}


export default class Sidebar extends React.Component<ISidebarProps, {}> {


    render() {
        return <div className={style.sidebar}>

            {
                // this.props.detail == 'option' ?
                //   <div>
                //       <div className={style.information}>
                //           <div className={style.title}>{this.props.title}</div>
                //           <div className={style.club}>{this.props.club}</div>
                //       </div>
                //       <hr/>
                //   </div> : null
            }
            <div onClick={this.props.changeSelect}>
                <Options icon={documentIcon}
                         content='文档'/>
                <Options icon={settingIcon}
                         content='设置'/>
            </div>
        </div>
    }
}
