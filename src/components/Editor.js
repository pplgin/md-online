import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/markdown/markdown.js';

import 'codemirror/lib/codemirror.css';
import '../theme/base16-light.css';

export default class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.MirrorEditor = CodeMirror.fromTextArea(this.editor, {
      mode: 'markdown',
      theme: 'base16-light',
      viewportMargin: Infinity
    });

    this.MirrorEditor.on('change', _ => {
      this.props.onTextChanged({
        target: {
          value: this.MirrorEditor.getValue()
        }
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.markdownText !== this.props.markdownText ||
      nextProps.editMode !== this.props.editMode ||
      nextProps.readerMode !== this.props.readerMode
    );
  }

  componentDidUpdate() {
    if (this.props.isOpenFromDisk) {
      this.MirrorEditor.setValue(this.props.markdownText);
      this.props.setOpenFromDiskFinished();
    } else if (this.props.isResetToDefault) {
      this.MirrorEditor.setValue(this.props.markdownText);
      this.props.setResetToDefaultFinished();
    }
    this.MirrorEditor.setOption('theme', 'base16-light');
    this.MirrorEditor.refresh();
  }

  render() {
    return (
      <div className="content editor">
        <textarea
          ref={t => (this.editor = t)}
          className="editor-textarea"
          onChange={this.props.onTextChanged}
          value={this.props.markdownText}
        ></textarea>
      </div>
    );
  }
}
