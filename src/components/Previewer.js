import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight.js'

hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
const renderer = new marked.Renderer();

marked.setOptions({
  breaks: true,
  highlight: code => {
    return hljs.highlightAuto(code).value;
  }
});

renderer.link = (href, title, text) => `<a target="_blank" href="${href}">${text}</a>`;

export default class Previewer extends Component {
  constructor(props) {
    super(props);
  }

  markdownToHTML = txt => marked(txt, { renderer });

  render() {
    const htmlContent = this.markdownToHTML(this.props.markdownText);
    return (
      <div className="content previewer">
        <div id="preview"
          className="previewer-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}>
        </div>
      </div>
    )
  }
}