#!/usr/bin/env node
/* eslint-disable */
// adapted based on rackt/history (MIT)
const spawn = require('child_process').spawn;
const stat = require('fs').stat;

stat('dist-modules', function(error, stat) {
  if (error || !stat.isDirectory()) {
    spawn(
      'npm',
      [
        'i',
        'lerna@^2.0.0-beta',
        'babel-cli',
        'babel-preset-es2015',
        'babel-preset-react',
        'babel-plugin-syntax-object-rest-spread',
        'babel-plugin-transform-object-rest-spread'
      ],
      {
        stdio: [0, 1, 2]
      }
    ).on('close', function(exitCode) {
      spawn('lerna', ['run', 'dist-modules'], { stdio: [0, 1, 2] });
    });
  }
});