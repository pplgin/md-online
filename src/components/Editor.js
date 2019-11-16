import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/markdown/markdown.js'

import 'codemirror/lib/codemirror.css'
import '../theme/base16-light.css'

export default class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const root = ReactDOM.findDOMNode(this);
    const textarea = root.querySelector('#editor');

    this.codeMirrorEditor = CodeMirror.fromTextArea(textarea, {
      mode: "markdown",
      theme: 'base16-light',
      viewportMargin: Infinity
    });

    this.codeMirrorEditor.on("change", _ => {
      this.props.onTextChanged({
        target: {
          value: this.codeMirrorEditor.getValue()
        }
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.markdownText !== this.props.markdownText ||
      nextProps.editMode !== this.props.editMode ||
      nextProps.readerMode !== this.props.readerMode;
  }

  componentDidUpdate() {
    if (this.props.isOpenFromDisk) {
      this.codeMirrorEditor.setValue(this.props.markdownText);
      this.props.setOpenFromDiskFinished();
    } else if (this.props.isResetToDefault) {
      this.codeMirrorEditor.setValue(this.props.markdownText);
      this.props.setResetToDefaultFinished();
    }
    this.codeMirrorEditor.setOption("theme", 'base16-light');
    this.codeMirrorEditor.refresh();
  }

  render() {
    return (
      <div className="content editor">
        <textarea id="editor" className="editor-textarea"
          onChange={this.props.onTextChanged}
          value={this.props.markdownText}>
        </textarea>
      </div>
    )
  }
}