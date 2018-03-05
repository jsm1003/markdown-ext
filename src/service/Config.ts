import * as vscode from 'vscode';

// 单例模式基本操作
export default class Config {
  private static _instance: Config;

  private constructor(context: vscode.ExtensionContext) {}

  public static create(context: vscode.ExtensionContext) {
    if (!Config._instance) {
      Config._instance = new Config(context);
    }
    return Config._instance;
  }
}
