import chalk from 'chalk';
import { satisfies } from 'semver';
import { engines } from './package.json';

interface IEngineType {
  node: string;
}

const requiredNodeVersion = (engines as IEngineType).node;
const actualNodeVersion = process.version;

if (!satisfies(actualNodeVersion, requiredNodeVersion)) {
  console.error(
    chalk.red(
      `Error: Your Node.js version ${chalk.bgRed(
        chalk.white(actualNodeVersion)
      )} is not compatible with this application. ` +
        `Please upgrade to version ${chalk.bgGreen(chalk.white(requiredNodeVersion))} or higher.`
    )
  );
  process.exit(1);
}
