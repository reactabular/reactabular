#!/usr/bin/env node
// adapted based on rackt/history (MIT)
var execSync = require('child_process').execSync;
var stat = require('fs').stat;

if (!execSync) {
    execSync = require('sync-exec');
}

function exec(command) {
    execSync(command, {
        stdio: [0, 1, 2]
    });
}

stat('dist-modules', function(error, stat) {
    if (error || !stat.isDirectory()) {
        exec('npm i babel-cli babel-preset-es2015 babel-preset-react babel-plugin-syntax-object-rest-spread babel-plugin-transform-object-rest-spread');
        exec('npm run dist-modules');
    }
});
