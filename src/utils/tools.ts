import * as vscode from 'vscode';
// import chalk from 'chalk';

// export type status = 'title' | 'warning' | 'error' | 'info';
// // vscode 没有颜色
// export default class Tools {
//   static log(content: string, type?: status) {
//     let updatedContent = '';
//     // let logPath = process.env.logPath;
//     switch (type) {
//       case 'title':
//         updatedContent = `标题: ${content}`;
//         console.log(chalk.green(`${chalk.bold(updatedContent)}`));
//         break;
//       case 'warning':
//         updatedContent = `警告: ${content}`;
//         console.log(chalk.red(`\t${chalk.bold(updatedContent)}\t`));
//         break;
//       case 'error':
//         updatedContent = `错误: ${content}`;
//         console.log(chalk.black(`\t${chalk.bgRed.bold(updatedContent)}\t`));
//         break;
//       case 'info':
//         updatedContent = `描述: ${content}`;
//         console.log(chalk.cyan(`\t${chalk.bold(updatedContent)}\t`));
//       default:
//         updatedContent = `描述: ${content}`;
//         console.log(chalk.cyan(`\t${chalk.bold(updatedContent)}\t`));
//         break;
//     }
//   }
// }

/**
 * wait some seconds
 * @param milliseconds
 * @return promise
 */
export function sleep(milliseconds: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

/**
 * Open file width VsCode
 * @param filepath Full path of file
 */
export function openFile(filepath: string) {
  vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filepath));
}
