import React from 'react';

export default function NavBar(props) {
  const editModeClassName = 'fa fa-pencil navbar-wrapper-icon' + (props.mode === 'editor' ? ' choosen' : '');
  const readerModeClassName = 'fa fa-eye navbar-wrapper-icon' + (props.mode === 'preview' ? ' choosen' : '');
  const saveAsHTMLClassName = 'fa fa-download navbar-wrapper-icon';
  const openFromDiskClassName = 'fa fa-upload navbar-wrapper-icon';

  return (
    <nav className={`navbar ${props.readerMode || props.editMode ? 'active' : ''}`}>
      <i
        title="Bold"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-bold styling-icon"
        data-modifier="**"
      ></i>
      <i
        title="Italic"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-italic styling-icon"
        data-modifier="*"
      ></i>
      <i
        title="Strikethrough"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-strikethrough styling-icon"
        data-modifier="~~"
      ></i>
      <i className="dividor">|</i>
      <i title="Heading 1" onClick={props.itemClick} className="navbar-wrapper-icon fa heading-icon" data-level="1">
        h1
      </i>
      <i title="Heading 2" onClick={props.itemClick} className="navbar-wrapper-icon fa heading-icon" data-level="2">
        h2
      </i>
      <i title="Heading 3" onClick={props.itemClick} className="navbar-wrapper-icon fa heading-icon" data-level="3">
        h3
      </i>
      <i title="Heading 4" onClick={props.itemClick} className="navbar-wrapper-icon fa heading-icon" data-level="4">
        h4
      </i>
      <i title="Heading 5" onClick={props.itemClick} className="navbar-wrapper-icon fa heading-icon" data-level="5">
        h5
      </i>
      <i title="Heading 6" onClick={props.itemClick} className="navbar-wrapper-icon fa heading-icon" data-level="6">
        h6
      </i>
      <i className="dividor">|</i>
      <i
        title="Horizontal rule"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-minus horizontal-rule"
      ></i>
      <i
        title="Quote"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-quote-left list-icon"
        data-prefix="> "
      ></i>
      <i
        title="Unordered list"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-list-ul list-icon"
        data-prefix="- "
      ></i>
      <i
        title="Ordered list"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-list-ol list-icon"
        data-prefix="1. "
      ></i>
      <i
        title="Incomplete task list"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-square-o list-icon"
        data-prefix="- [ ] "
      ></i>
      <i
        title="Complete task list"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-check-square-o list-icon"
        data-prefix="- [x] "
      ></i>
      <i className="dividor">|</i>
      <i
        title="Link"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-link link-icon"
        data-sample="link"
        data-sample-url="http://pplgin.xyz/"
      ></i>
      <i
        title="Image"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-image image-icon"
        data-sample="image"
        data-sample-url="http://pplgin.xyz/icon.png"
      ></i>
      <i title="Code" onClick={props.itemClick} className="navbar-wrapper-icon fa fa-code code-icon"></i>
      <i
        title="Table"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-table table-icon"
        data-sample="header 1 | header 2
---|---
row 1 col 1 | row 1 col 2
row 2 col 1 | row 2 col 2"
      ></i>
      <i className="dividor">|</i>
      <i
        title="Flowchart"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-long-arrow-right mermaid-icon"
        data-sample="graph LR
A-->B"
      ></i>
      <i
        title="Sequence diagram"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-exchange mermaid-icon"
        data-sample="sequenceDiagram
A->>B: How are you?
B->>A: Great!"
      ></i>
      <i
        title="Gantt diagram"
        onClick={props.itemClick}
        className="navbar-wrapper-icon fa fa-sliders mermaid-icon"
        data-sample="gantt
dateFormat YYYY-MM-DD
section S1
T1: 2014-01-01, 9d
section S2
T2: 2014-01-11, 9d
section S3
T3: 2014-01-02, 9d"
      ></i>
      <i className="dividor">|</i>
      <i
        className={editModeClassName}
        onClick={() => props.onToggleMode(props.mode !== 'editor' ? 'editor' : '')}
        title="Edit mode"
      ></i>
      <i
        className={readerModeClassName}
        onClick={() => props.onToggleMode(props.mode !== 'preview' ? 'preview' : '')}
        title="Reader mode"
      ></i>
      {/*<i className={saveAsHTMLClassName} onClick={props.onSaveAsHTML} title="Save as HTML"></i><i className={openFromDiskClassName} onClick={props.onOpenFromDisk} title="Open from Disk"></i>*/}
    </nav>
  );
}
