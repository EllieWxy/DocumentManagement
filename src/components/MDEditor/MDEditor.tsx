import React from "react";
import ReactDOM from "react-dom";
import MDEditor from '@uiw/react-md-editor';
import './MDEditor.css'
import  '../pen/src/pen.js'
import '../pen/src/markdown.js'
import '../pen'

declare var Pen:any

export default function MDEditorDom() {
    debugger
    // const pen = new Pen("#editor");
    debugger
    // console.log(pen)

    return <div id="editor"></div>

    // const [value, setValue] = React.useState("**Hello world!!!**");
    // return (
    //     <div className="container">
    //         <MDEditor
    //             value={value}
    //             onChange={setValue}
    //         />
    //         {/*<MDEditor.Markdown source={value} />*/}
    //     </div>
    // );
    return
}
