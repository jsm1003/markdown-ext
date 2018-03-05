'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import IssueService from './service/IssueService';
import Config from './service/Config';
import Syncing from './service/Syncing';
import Toast from './service/Toast';
import Blog from './service/Blog';

let _isSyncing: boolean;
let _Syncing: Syncing;
let _config: Config;
let _issueService: IssueService;
let _Blog: Blog;

export function activate(context: vscode.ExtensionContext) {
  _initGlobals(context);
  _initCommands(context);
}

function _initGlobals(context: vscode.ExtensionContext) {
  _config = Config.create(context);
  _Syncing = Syncing.create(context);
  _Blog = Blog.create(context);
}

function _initCommands(context: vscode.ExtensionContext): void {
  _registerCommands(context, 'issueBlog.upload', _uploadBlog);
  _registerCommands(context, 'issueBlog.openSettings', _openSettings);
}

/**
 * Vscode's registerCommand Wrapper.
 * @param context
 * @param command
 * @param callback
 */
function _registerCommands(
  context: vscode.ExtensionContext,
  command: string,
  callback: (...args: any[]) => any,
): void {
  // 类似与观察者模式
  context.subscriptions.push(vscode.commands.registerCommand(command, callback));
}

// 主要逻辑放到这里
async function _uploadBlog() {
  // 如果正在上传，就取消掉, 这一块的逻辑看能不能包装一下子，
  // _issueService.createIssue();

  if (_isSyncing) {
    vscode.window.showInformationMessage('blog is already uploading');
    return false;
  }

  _isSyncing = true;

  /**
   * 1. 拿到 token， ， 实例化IssueService
   * 2. 获取本地博客文章， 和远程repo名
   * 3. 上传
   */

  let settings = await _Syncing.prepareUpload();
  let repoName = await Toast.showGithubRemoteRepoInputBox();
  _issueService = IssueService.create(settings.token);
  // 先象征性的试一次
  // 关联已有 repo

  // 这里的判断再想一下
  if (!repoName) {
    return;
  }
  await _issueService.createRepo(repoName);

  let blogOptions = _Blog.getBlog();

  if (!blogOptions) {
    return;
  }
  await _issueService.createIssue(blogOptions);

  _isSyncing = false;
  console.log('上传成功');

  // const api =
}

async function _openSettings() {}

// this method is called when your extension is deactivated
export function deactivate() {}
