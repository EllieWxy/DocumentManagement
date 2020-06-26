import * as React from "react";
import Vditor from "vditor";
import removeSvg from './img/remove.svg'
import saveSvg from './img/save.svg'
import "vditor/dist/index.css";

interface IMDEditorProps {
  renderFid:string,
  content:string,
  getValue:() => any,
  saveFile:() => any,
  removeFile:() => any
}

export default class MDEditor extends React.Component<IMDEditorProps, any> {
  rootRef = React.createRef<HTMLDivElement>();
  vditor: Vditor | null = null;

  componentDidMount() {
    this.vditor = new Vditor(this.rootRef.current, {
      cache: { enable: false },
      toolbarConfig: {
        // hide: true
      },
      toolbar:["emoji", "headings", "bold", "italic", "link", "|",
        "list", "ordered-list", "check", "outdent", "indent", "|",
        "quote", "line", "code", "inline-code", "insert-before", "insert-after", "|",
        "upload", "record", "table", "|",
        "undo", "redo", "|",
        "fullscreen", "edit-mode","|",{
          // hotkey: '⌘-s',
          name: 'remove',
          tipPosition: 'ne',
          tip: '删除此文件',
          className: '',
          icon: removeSvg,
          click: () => {
            this.props.removeFile()
          }},
        {
          hotkey: 'ctrl-s',
          name: 'save',
          tipPosition: 'ne',
          tip: '保存此文件',
          className: '',
          icon: saveSvg,
          click: () => {
            this.props.saveFile()
          }}
          ],
      input: this.props.getValue,//valueOnChange
      value: this.props.content
    });
  }

  componentDidUpdate(prevProps:any){
    if(this.props.renderFid !== prevProps.renderFid){
      this.vditor.setValue(this.props.content)
    }
  }

  render() {
    return <div ref={this.rootRef} />;
  }
}
