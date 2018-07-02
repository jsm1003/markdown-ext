import * as vscode from 'vscode';
import * as Github from '@octokit/rest';

export default class Blog {
  private static _instance: Blog;
  // private _document: vscode.TextDocument;
  private constructor(context: vscode.ExtensionContext) {}

  public static create(context: vscode.ExtensionContext): Blog {
    if (!Blog._instance) {
      Blog._instance = new Blog(context);
    }
    return Blog._instance;
  }

  // 获取整篇博客内容
  public getBlog() {
    // 获取文件内容这里的编写方法可以看看其他一些插件的实现 比如 code runner
    let editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }

    // 获取正文
    let docText = editor.document.getText();

    if (docText) {
      console.log(docText);
      if (!docText.startsWith('# ')) {
        vscode.window.showInformationMessage('请输入文章标题');
        return;
      }

      let matchedTitle = docText.match(/#\s.*/);
      if (matchedTitle) {
        let title = matchedTitle[0];
        let body = docText.split(title)[1];
        return { title, body };
      }
    }
  }

  // 获取博客标题
  public getBlogTitle() {}

  // 获取博客正文
  public getBlogBody() {}

  // 获取博客标签
  public getBlogLabel() {}
}
