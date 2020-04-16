import React from "react";
import ReactDOM from "react-dom";
import MDEditor from '@uiw/react-md-editor';
import './MDEditor.css'


export default function MDEditorDom() {
    const [value, setValue] = React.useState("**Hello world!!!**");
    return (
        <div className="container">
            <MDEditor
                value={value}
                onChange={setValue}
            />
            {/*<MDEditor.Markdown source={value} />*/}
        </div>
    );
}
