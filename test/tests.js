'use strict';

const { describe, it, before, after } = require('mocha');
const execa = require('execa');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

describe('Guesthouse Test Suite', () => {
  let files;

  before((done) => {
    execa.shell('mkdir xo && cd xo/ && node ../src/index.js init')
      .then(() => {
        files = fs.readdirSync(path.join(__dirname, '../xo'));
        done();
      })
      .catch(() => done());
  });

  it('should create .editorconfig', () => {
    expect(files.indexOf('.editorconfig') === -1).to.eql(true);
  });

  it('should create .eslintrc.js', () => {
    expect(files.indexOf('.eslintrc.js') === -1).to.eql(false);
  });

  it('should create node_modules', () => {
    expect(files.indexOf('node_modules') === -1).to.eql(false);
  });

  it('should create package.json', () => {
    expect(files.indexOf('package.json') === -1).to.eql(false);
  });

  it('should create .stylelintrc', () => {
    expect(files.indexOf('.stylelintrc') === -1).to.eql(false);
  });

  it('should create .travis.yml', () => {
    expect(files.indexOf('.travis.yml') === -1).to.eql(false);
  });

  after((done) => {
    execa.shell('rm -rf xo/')
      .then(() => done())
      .catch(() => done());
  });
});
