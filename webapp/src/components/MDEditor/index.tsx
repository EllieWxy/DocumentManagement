import * as React from "react";
import "./index.css";
import Vditor from "vditor";

import "vditor/dist/index.css";

export default class MDEditor extends React.Component<any, any> {
  rootRef = React.createRef<HTMLDivElement>();
  vditor: Vditor | null = null;

  componentDidMount() {
    this.vditor = new Vditor(this.rootRef.current, {
      cache: { enable: false },
      toolbarConfig: {
        hide: true
      }
    });
  }

  render() {
    return <div ref={this.rootRef} />;
  }
}
