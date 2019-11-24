/**
 * 获取示例代码
 */
const getSampleText = (target, editor) => {
  let text = editor.getSelection();
  if (text.trim() === '') {
    text = target.dataset['sample'];
  }
  return text;
};

/**
 * 处理当前
 */
export function ItemOptionsHandle(editor, e) {
  const currentTarget = e.currentTarget;
  // 获取当前的操作事件
  const classList = currentTarget.classList;

  // title
  if (classList.contains('heading-icon')) {
    const level = currentTarget.dataset['level'];
    const cursor = editor.getCursor();
    editor.setCursor(cursor.line, 0);
    editor.replaceSelection('#'.repeat(level) + ' ');
    editor.focus();
    return;
  }

  // styling icons
  if (classList.contains('styling-icon')) {
    const modifier = currentTarget.dataset['modifier'];
    if (!editor.somethingSelected()) {
      const word = editor.findWordAt(editor.getCursor());
      editor.setSelection(word.anchor, word.head);
    }
    editor.replaceSelection(modifier + editor.getSelection() + modifier);
    editor.focus();
    return;
  }

  // <hr/>
  if (classList.contains('horizontal-rule')) {
    const cursor = editor.getCursor();
    if (cursor.ch === 0) {
      // cursor is at line start
      editor.replaceSelection('\n---\n\n');
    } else {
      editor.setCursor({ line: cursor.line }); // navigate to end of line
      editor.replaceSelection('\n\n---\n\n');
    }
    editor.focus();
    return;
  }

  // list icons
  if (classList.contains('list-icon')) {
    const prefix = currentTarget.dataset['prefix'];
    const selection = editor.listSelections()[0];
    const minLine = Math.min(selection.head.line, selection.anchor.line);
    const maxLine = Math.max(selection.head.line, selection.anchor.line);
    for (let i = minLine; i <= maxLine; i++) {
      editor.setCursor(i, 0);
      editor.replaceSelection(`\n${prefix}`);
    }
    editor.focus();
    return;
  }

  // link
  if (classList.contains('link-icon')) {
    let text = getSampleText(currentTarget, editor);
    const url = currentTarget.dataset['sampleUrl'];
    editor.replaceSelection(`\n[${text}](${url})`);
    editor.focus();
    return;
  }

  // image
  if (classList.contains('image-icon')) {
    let text = getSampleText(currentTarget, editor);
    const url = currentTarget.dataset['sampleUrl'];
    editor.replaceSelection(`\n![${text}](${url})`);
    editor.focus();
    return;
  }

  // code
  if (classList.contains('code-icon')) {
    editor.replaceSelection(`\n\`\`\`\n${editor.getSelection()}\n\`\`\`\n`);
    editor.focus();
    return;
  }

  // table
  if (classList.contains('table-icon')) {
    const sample = currentTarget.dataset['sample'];
    const cursor = editor.getCursor();
    if (cursor.ch === 0) {
      // cursor is at line start
      editor.replaceSelection(`\n${sample}\n\n`);
    } else {
      editor.setCursor({ line: cursor.line }); // navigate to line end
      editor.replaceSelection(`\n\n${sample}\n`);
    }
    editor.focus();
    return;
  }

  // match code
  if (classList.contains('math-icon')) {
    let text = getSampleText(currentTarget, editor);
    editor.replaceSelection(`\n\`\`\`katex\n${text}\n\`\`\`\n`);
    editor.focus();
    return;
  }

  if (classList.contains('mermaid-icon')) {
    let text = getSampleText(currentTarget, editor);
    editor.replaceSelection(`\n\`\`\`mermaid\n${text}\n\`\`\`\n`);
    editor.focus();
    return;
  }
}
