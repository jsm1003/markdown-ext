import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import Blog from './Blog';
import Environment from './Environment';
import Toast from './Toast';

// 这就相当于一个模板，用于生成文件用的
export interface ISyncingSettings {
  /**
   * store Github personal Access Token
   */
  token: string;
  repoName: string;
  id?: string;
  owner?: string;
}

// export default class Syncing implements vscode.Disposable
export default class Syncing {
  private static _instance: Syncing;
  private _blog: Blog;
  private _env: Environment;
  private _settingsPath: string;

  private static readonly DEFAUT_SETTING: ISyncingSettings = {
    token: '',
    repoName: ''
  };

  // 单例模式其实也是用了依赖注入的原理？ 因为他在这个类的构造函数中 实例化了其他类
  private constructor(context: vscode.ExtensionContext) {
    this._blog = Blog.create(context);
    this._env = Environment.create(context);
    this._settingsPath = path.join(this._env.codeUserPath, 'issueBlog.json');
  }

  public static create(context: vscode.ExtensionContext) {
    if (!Syncing._instance) {
      Syncing._instance = new Syncing(context);
    }

    return Syncing._instance;
  }

  // 准备上传， 把需要用户输入的东西东拿过来
  public async prepareUpload() {
    const settings: ISyncingSettings = this._loadSettings();
    // 这里的逻辑不知道要怎么写一下
    let saveFlag = false;
    if (!settings.token || !settings.repoName) {
      saveFlag = true;
    }

    if (!settings.token) {
      settings.token = await Toast.showGithubTokenInputBox();
    }

    if (!settings.repoName) {
      settings.repoName = await Toast.showGithubRemoteRepoInputBox();
    }

    if (saveFlag) {
      this.saveSettings(settings);
    }

    return settings;
  }

  // 初始化设置
  public async initSettings(): Promise<void> {
    return await this.saveSettings(Syncing.DEFAUT_SETTING);
  }

  // 将设置保存到本地
  public saveSettings(settings: ISyncingSettings): Promise<void> {
    // 下面这个 promise 利用的不错， 把异步写入文件的方法用 promise 包装一下
    return new Promise((resolve, reject) => {
      const content = JSON.stringify(settings, null, 4) || '{}';
      fs.writeFile(this.settingsPath, content, err => {
        err ? reject(err) : resolve();
      });
    });
  }

  // 加载设置
  private _loadSettings(): ISyncingSettings {
    // 复制一个对象
    const settings: ISyncingSettings = { ...Syncing.DEFAUT_SETTING };

    try {
      Object.assign(settings, JSON.parse(fs.readFileSync(this.settingsPath, 'utf8')));
    } catch (err) {
      console.log(err);
    }
    // 他这里还真是个问题
    return settings;
    // 返回值这里有问题，先待定
  }

  public get settingsPath(): string {
    return this._settingsPath;
  }
}
