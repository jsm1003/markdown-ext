import * as vscode from 'vscode';

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
 * Open file with VsCode
 * @param filepath Full path of file
 */
export function openFile(filepath: string) {
  vscode.commands.executeCommand('vscode.open', vscode.Uri.file(filepath));
}
