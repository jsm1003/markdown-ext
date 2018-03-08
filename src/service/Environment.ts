import * as path from 'path';
import * as vscode from 'vscode';

export default class Environment {
  private static _instance: Environment;

  private _codeBasePath: string;
  private _codeUserPath: string;
  private constructor(context: vscode.ExtensionContext) {
    this._codeBasePath = this._getCodeBasePath();
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
   * 还是不太明白他这里为什么要用 get 方法，而不是直接返回属性呢？
   * Get VSCode settings `User` path.
   */
  public get codeUserPath() {
    return this._codeUserPath;
  }

  /**
   * 获取存储文件的基地址
   * @param insiders
   */
  private _getCodeBasePath() {
    return path.join(process.env.APPDATA, 'code');
  }
}
