import * as vscode from 'vscode';
import IssueService from './IssueService';

// 这里的问题还是不太明白
const openUrl = require('opn');

// toast 主要管的功能就是 弹出框、提示信息等
const Toast = {
  status(message: string, hideAfterTimeout?: number): void {
    if (hideAfterTimeout) {
      vscode.window.setStatusBarMessage('');
      vscode.window.setStatusBarMessage(message, hideAfterTimeout);
    } else {
      vscode.window.setStatusBarMessage(message);
    }
  },

  statusInfo(message: string): void {
    this.status(message, 4000);
  },

  statusError(message: string): void {
    this.status(message, 8000);
  },

  statusFatal(message: string): void {
    this.status(message, 12000);
  },

  async showGithubTokenInputBox() {
    const placeholder = 'Enter GitHub Personal Access Token.';
    const options: vscode.InputBoxOptions = {
      ignoreFocusOut: true,
      password: false,
      placeholder,
      prompt: 'Used for upload blog',
    };

    // 这里的输入情况判断还没有处理
    openUrl('https://github.com/settings/tokens');
    let value = await vscode.window.showInputBox(options);

    if (value) {
      const token = value.trim();
      return token;
    } else {
      throw new Error('无效的 token.');
    }
  },

  //
  async showGithubRemoteRepoInputBox() {
    // 这里判断一下，是否创建一个新的 repo ，或者关联已有repo, 直接新建一个仓库
    const placeholder = 'Enter remote repo name';
    const options: vscode.InputBoxOptions = {
      ignoreFocusOut: true,
      password: false,
      placeholder,
      prompt: '用于提交issue用',
    };

    try {
      let value = await vscode.window.showInputBox(options);
      // 先注释
      if (value) {
        return value;
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default Toast;
