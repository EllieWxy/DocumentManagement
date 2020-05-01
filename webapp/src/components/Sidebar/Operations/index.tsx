import * as React from 'react'
import Operation from "./Operation";
import './index.css'
import addIcon from 'img/add.svg';
import removeIcon from 'img/remove.svg'
import saveIcon from 'img/save.svg'


export default class Operations extends React.Component<{selectedFid:string},{}>{


    render(){
        return <div className='operations'>
            <Operation icon={addIcon} class={'add'}/>
            <Operation icon={saveIcon} class={'save'}/>
            <Operation icon={removeIcon} class={'remove'}/>
            </div>

    }
}
