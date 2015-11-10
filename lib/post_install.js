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
        exec('npm i babel@5.x');
        exec('npm run dist-modules');
    }
});
