'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import IssueService from './service/IssueService';
import Config from './service/Config';
import Syncing from './service/Syncing';
import Toast from './service/Toast';
import Blog from './service/Blog';
import { openFile } from './utils/tools';

let _isSyncing: boolean;
let _Syncing: Syncing;
let _config: Config;
let _issueService: IssueService;
let _Blog: Blog;

export function activate(context: vscode.ExtensionContext): void {
  _initGlobals(context);
  _initCommands(context);
}

function _initGlobals(context: vscode.ExtensionContext): void {
  _config = Config.create(context);
  _Syncing = Syncing.create(context);
  _Blog = Blog.create(context);

  // _issueService = IssueService.create('cac1e3d64bb50b44eafaec915ce8501b9f50ac0b');
}

function _initCommands(context: vscode.ExtensionContext): void {
  _registerCommands(context, 'IssueBlog.upload', _uploadBlog);
  _registerCommands(context, 'IssueBlog.openSettings', _openSettings);
  _registerCommands(context, 'IssueBlog.clearSettings', _clearSettings);
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
  context.subscriptions.push(
    vscode.commands.registerCommand(command, callback),
  );
}

// 主要逻辑放到这里
async function _uploadBlog() {
  // _issueService.createIssue();

  if (_isSyncing) {
    vscode.window.showInformationMessage('blog is already uploading');
    return false;
  }

  _isSyncing = true;

  /**
   * 1. 拿到 token， 实例化IssueService
   * 2. 获取本地博客文章， 和远程repo名
   * 3. 上传
   */

  let settings = await _Syncing.prepareUpload();

  _issueService = IssueService.create(settings.token);

  _issueService.createRepo(settings.repoName);

  let blogOptions = _Blog.getBlog();
  if (!blogOptions) {
    return;
  }
  await _issueService.createIssue(blogOptions);

  _isSyncing = false;
  console.log('上传成功');
}

async function _openSettings() {
  if (fs.existsSync(_Syncing.settingsPath)) {
    openFile(_Syncing.settingsPath);
  } else {
    await _Syncing.initSettings();
    openFile(_Syncing.settingsPath);
  }
}

async function _clearSettings() {
  await _Syncing.clearSettings();
}

// this method is called when your extension is deactivated
export function deactivate() {}
