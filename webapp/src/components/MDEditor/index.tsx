import * as React from "react";
import Vditor from "vditor";
// @ts-ignore
// import * as icons from 'img/icons'
import removeSvg from './img/remove.svg'
import saveSvg from './img/save.svg'
import "vditor/dist/index.css";

interface IMDEditor {
  renderFid:string,
  content:string,
  getValue:()=>any
}

export default class MDEditor extends React.Component<IMDEditor, any> {
  rootRef = React.createRef<HTMLDivElement>();
  vditor: Vditor | null = null;

  constructor(props:any){
    super(props)
    this.state = {
      content:''
    }
  }

  componentDidMount() {
    this.vditor = new Vditor(this.rootRef.current, {
      cache: { enable: false },
      toolbarConfig: {
        // hide: true
      },
      toolbar:["emoji", "headings", "bold", "italic", "strike", "link", "|",
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
            alert('remove the file')
          }},
        {
          hotkey: '⌘-s',
          name: 'remove',
          tipPosition: 'ne',
          tip: '保存此文件',
          className: '',
          icon: saveSvg,
          click: () => {
            alert('remove the file')
          }}
          ],
      input: this.props.getValue //valueOnChange
    });
    console.log(removeSvg)
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
