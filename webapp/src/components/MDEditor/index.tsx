import * as React from "react";
import "./index.css";
import Vditor from "vditor";

import "vditor/dist/index.css";

interface IMDEditor {
  content:string
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
        hide: true
      }
    });
  }

  componentDidUpdate(){
    this.vditor.setValue(this.props.content)
  }

  render() {
    return <div ref={this.rootRef} />;
  }
}
