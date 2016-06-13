#!/usr/bin/env node
// adapted based on rackt/history (MIT)
var spawn = require('child_process').spawn;
var stat = require('fs').stat;

stat('dist-modules', function(error, stat) {
    if (error || !stat.isDirectory()) {
        var devInstall = spawn(
            'npm',
            [
                'i',
                'babel-cli',
                'babel-preset-es2015',
                'babel-preset-react',
                'babel-plugin-syntax-object-rest-spread',
                'babel-plugin-transform-object-rest-spread'
            ],
            {
                stdio: [0, 1, 2]
            }
        );

        devInstall.on('close', function(exitCode) {
            var transpile = spawn('npm', ['run', 'dist-modules'], { stdio: [0, 1, 2] });

            transpile.on('close', function() {
                spawn('npm', ['prune', '--production'], { stdio: [0, 1, 2] });
            });
        });
    }
});

