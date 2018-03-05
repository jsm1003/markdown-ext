import * as Github from 'github';
import * as vscode from 'vscode';
import Blog from './Blog';

export interface BlogOptions {
  title: string;
  body: string;
}
// 主要管github api 相关操作
export default class IssueService {
  private static _instance: IssueService;
  private _api: Github;
  private _token!: string; // 一会儿保存的时候会用到
  private _remoteBlogRepo!: string;
  private _owner!: string;

  private constructor(token: string) {
    //  参数先不传
    this._api = new Github();

    if (token) {
      this._token = token;
      this._api.authenticate({
        token,
        type: 'oauth',
      });

      this._initialize();
    }
    // 这里要判断一下如果有 token 才会
  }

  // 初始化
  private async _initialize() {
    this._owner = await this.getOwner();
  }

  public static create(token: string): IssueService {
    if (!IssueService._instance) {
      IssueService._instance = new IssueService(token);
    }
    return IssueService._instance;
  }

  //
  public async getOwner() {
    try {
      let { data: { login } } = await this._api.users.get({});
      return login;
    } catch (err) {
      console.log(err);
    }
  }

  public async getRepo() {}

  // 创建一个仓库
  public async createRepo(remoteBlogRepo: string) {
    this._remoteBlogRepo = 'test-issue';
    // let options: Github.ReposCreateParams = {
    //   name: remoteBlogRepo,
    // };
    // let result = await this._api.repos.create(options);
    // console.log(result);
  }

  public async createIssue(blog: BlogOptions) {
    const options: Github.IssuesCreateParams = {
      owner: this._owner,
      repo: this._remoteBlogRepo,
      ...blog,
    };

    try {
      const result = await this._api.issues.create(options);
      // 创建成功后的提示消息放到这里也行， 放到外面也行
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  // 删除Issue
  public async deleteIssue() {}

  // 更新Issue
  public async updateIssue() {}
}
