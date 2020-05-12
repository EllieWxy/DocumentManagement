import * as React from 'react'
import Operation from "./Operation";
import style from './index.m.css'
import addIcon from 'img/add.svg';
import removeIcon from 'img/remove.svg'
import saveIcon from 'img/save.svg'


export default class Operations extends React.Component<{selectedFid:string},{}>{


    render(){
        return <div className={style.operations}>
            <Operation icon={addIcon} class='add'/>
            <Operation icon={saveIcon} class='save'/>
            <Operation icon={removeIcon} class='remove'/>
            </div>

    }
}
