#! /usr/bin/env node

'use strict';

const pckgJson = require('../package.json');
const program = require('commander');
const chalk = require('chalk');
const execa = require('execa');
const path = require('path');
const ora = require('ora');
const fs = require('fs');

const modules = [
  'eslint@3',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
  'stylelint',
  'stylelint-config-standard',
  'stylelint-order',
];

program.version(pckgJson.version, '-v, --version');

program
  .command('init')
  .description('init eslint with airbnb style')
  .action(() => {
    // Start spinner
    const spinner = ora().start();
    spinner.color = 'cyan';
    spinner.text = chalk.cyan('Installing');

    // Copy files
    fs.readdirSync(path.join(__dirname, 'files')).forEach((file) => {
      fs.writeFileSync(file.replace('.txt', ''), fs.readFileSync(path.join(__dirname, 'files', file), 'utf-8'));
    });

    // Install dependencies
    execa.shell('test -f "package.json" || npm init -y')
      .then(() => execa.shell([
        'npm',
        'install',
        ...modules,
        '--save-dev',
      ].join(' ')))
      .then(() => {
        spinner.stop();

        // Inject npm scripts
        const pckg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

        pckg.scripts.eslint = 'node_modules/.bin/eslint resources/assets/js/app.js';
        pckg.scripts.stylelint = 'node_modules/.bin/stylelint resources/assets/sass/**/*.scss';
        delete pckg.scripts.test;
        pckg.scripts.test = 'npm run eslint && npm run stylelint';

        fs.writeFileSync('package.json', JSON.stringify(pckg, null, 2));

        console.log(chalk.green('Successfully installed'));
      })
      .catch((error) => {
        console.log(error);
        spinner.stop();
      });
  });

program.parse(process.argv);
