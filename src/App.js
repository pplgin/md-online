import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Storage from './libs/storage';
import { ItemOptionsHandle } from './libs/item-utils';
import NavBar from './components/NavBar';
import Editor from './components/Editor';
import Previewer from './components/Previewer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.mapThemeLoaded = {};
    this.storage = new Storage('localStorage');
    this.state = {
      showList: true,
      workspaceType: 'both',
      isOpenFromDisk: false,
      markdownText: this.storage.markdownText || this.props.defaultText
    };

    this.onTextChanged = this.onTextChanged.bind(this);
    this.onOpenFromDisk = this.onOpenFromDisk.bind(this);
    this.onEditorScroll = this.onEditorScroll.bind(this);
    this.onPreviewScroll = this.onPreviewScroll.bind(this);
    this.setOpenFromDiskFinished = this.setOpenFromDiskFinished.bind(this);
  }

  setOpenFromDiskFinished() {
    this.setState({
      isOpenFromDisk: false
    });
  }

  onSaveAsHTML() {
    // const content = markdownToHTML(this.state.markdownText);
    // const fileName = 'export.html';
    // if (navigator.msSaveBlob) {
    //   // IE
    //   navigator.msSaveBlob(new Blob([content], { type: 'text/html;charset=utf-8;' }), fileName);
    // } else {
    //   const a = document.createElement('a');
    //   a.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(content);
    //   a.download = fileName;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // }
  }

  onOpenFromDisk() {
    const input = document.body.appendChild(document.createElement('input'));
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.md, .txt');

    input.addEventListener('change', ({ target }) => {
      if (target.files && target.files[0]) {
        const fileReader = new FileReader();
        fileReader.onload = ({ target }) => {
          const text = target.result;
          this.storage.markdownText = text;

          this.setState({
            markdownText: text,
            isOpenFromDisk: true
          });
          document.body.removeChild(input);
        };
        fileReader.readAsText(target.files[0]);
      }
    });
    input.click();
  }

  onTextChanged({ target }) {
    const text = target.value;
    this.storage.markdownText = text;
    this.setState({
      markdownText: text
    });
  }

  componentDidMount() {
    const root = ReactDOM.findDOMNode(this);
    this.previewElm = root.querySelector('#preview');
    this.editorElm = root.querySelector('.CodeMirror-vscrollbar');

    if (this.previewElm) this.previewElm.addEventListener('scroll', this.onPreviewScroll);
    if (this.editorElm) this.editorElm.addEventListener('scroll', this.onEditorScroll);
  }

  onPreviewScroll() {
    this.editorElm.removeEventListener('scroll', this.onEditorScroll);
    this.editorElm.scrollTop = this.previewElm.scrollTop;

    window.clearTimeout(this.isPreviewScrolling);
    this.isPreviewScrolling = setTimeout(() => {
      this.editorElm.addEventListener('scroll', this.onEditorScroll);
    }, 33);
  }

  onEditorScroll() {
    this.previewElm.removeEventListener('scroll', this.onPreviewScroll);
    this.previewElm.scrollTop = this.editorElm.scrollTop;

    window.clearTimeout(this.isEditorScrolling);
    this.isEditorScrolling = setTimeout(() => {
      this.previewElm.addEventListener('scroll', this.onPreviewScroll);
    }, 33);
  }

  onToggleList = () => {
    this.setState({
      showList: !this.state.showList
    });
  };

  onToggleMode = type => this.setState({ workspaceType: type });

  itemClick = e => ItemOptionsHandle(this.editorRef.MirrorEditor, e);

  render() {
    const { workspaceType } = this.state;
    return (
      <div className={`workspace ${workspaceType}`}>
        <div className={`ws-content`}>
          <NavBar
            itemClick={this.itemClick}
            themes={this.props.themes}
            mode={workspaceType}
            onToggleMode={this.onToggleMode}
            onSaveAsHTML={this.onSaveAsHTML}
            onOpenFromDisk={this.onOpenFromDisk}
            onToggleList={this.onToggleList}
          />
          <div className="ws-content-bd">
            {workspaceType !== 'preview' && (
              <Editor
                ref={t => (this.editorRef = t)}
                markdownText={this.state.markdownText}
                isOpenFromDisk={this.state.isOpenFromDisk}
                onTextChanged={this.onTextChanged}
                setResetToDefaultFinished={this.setResetToDefaultFinished}
              />
            )}
            {workspaceType !== 'editor' && <Previewer markdownText={this.state.markdownText} />}
          </div>
        </div>
      </div>
    );
  }
}
