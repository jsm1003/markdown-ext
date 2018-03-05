import * as path from 'path';
import * as vscode from 'vscode';

export default class Environment {
  private static _instance: Environment;

  private _codeBasePath: string;
  private _codeUserPath: string;
  private _isInsiders: boolean;

  private constructor(context: vscode.ExtensionContext) {
    this._isInsiders = context.extensionPath.includes('insider');
    this._codeBasePath = this._getCodeBasePath(this._isInsiders);

    // 最终地址应该就是这里 C:\Users\huiji015\AppData\Roaming\Code\User
    this._codeUserPath = path.join(this._codeBasePath, 'User');
    console.log(this.codeUserPath);
  }

  public static create(context: vscode.ExtensionContext) {
    if (!Environment._instance) {
      Environment._instance = new Environment(context);
    }

    return Environment._instance;
  }

  /**
   * Get VSCode settings `User` path.
   */
  public get codeUserPath() {
    return this._codeUserPath;
  }

  /**
   * 获取存储文件的基地址
   * @param insiders
   */
  private _getCodeBasePath(insiders: boolean) {
    // 先不考虑 跨平台
    let basePath: string = '/var/local';
    return path.join(basePath, this._isInsiders ? 'code - Insiders' : 'code');
  }
}
