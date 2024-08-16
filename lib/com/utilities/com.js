import 'server-only';
import { exec as ex } from 'child_process';
import util from 'util';

const exec = util.promisify(ex);

/**
 * Calls the COM with the provided method name and JSON object.
 * @template Input
 * @template Output
 * @param {string} name
 * @param {Input | undefined} json
 * @throws {Error}
 * @returns {Promise<Output>}
 */
export default async function com(name, json = undefined) {
  // Path to the 32-bit version of PowerShell.
  const powershell =
    'C:\\Windows\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe';

  const flags = '-NoProfile -ExecutionPolicy Bypass -File';
  const script = './lib/com/utilities/com.ps1';
  const input = json ? JSON.stringify(json) : '';

  const { stdout, stderr } = await exec(
    `${powershell} ${flags} ${script} ${name} ${input}`
  );

  if (stderr) {
    throw new Error(stderr.trim());
  }

  return JSON.parse(stdout);
}
