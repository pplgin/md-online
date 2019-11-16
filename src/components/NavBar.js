import React from 'react';

export default function NavBar(props) {
  const editModeClassName = 'fas fa-pencil-alt navbar-wrapper-icon' + (props.mode === 'editor' ? ' choosen' : '');
  const readerModeClassName = 'fas fa-eye navbar-wrapper-icon' + (props.mode === 'preview' ? ' choosen' : '');
  const saveAsHTMLClassName = 'fas fa-download navbar-wrapper-icon';
  const openFromDiskClassName = 'fas fa-upload navbar-wrapper-icon';

  return (
    <nav className={`navbar ${props.readerMode || props.editMode ? 'active' : ''}`}>
      <div className="navbar-wrapper name">
        <i className="fas fa-bolt navbar-wrapper-icon"></i>
      </div>
      <div className="navbar-wrapper opts">
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
      </div>
    </nav>
  );
}
