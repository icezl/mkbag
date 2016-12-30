#!/usr/bin/env node

var myCommand = require('../lib'),
    fs = require('fs'),
    pkg = fs.readFileSync(__dirname.replace(/bin/, '') + 'package.json'),
    version = JSON.parse(pkg).version;

var yargs = require('yargs')
    .version(function() {
        return version;
    })
    .usage('mkbag <command> [options]')
    .option('v', {
        alias: 'version'
    })
    .command('start', '设置当前目录为开发路径')
    .command('pack', '打包当前目录文件')
    .example('mkbag start', '在当前目录转换为开发环境')
    .example('mkbag pack [options] [address]', '在当前目录打包文件'),
    argv = yargs.argv,
    command = argv._[0];

if (command === 'start') {
    myCommand.start();
} else if (command === 'pack') {
    yargs.reset()
        .option('s', {
            alias: 'sass',
            describe: '转换sass'
        })
        .option('l', {
            alias: 'less',
            describe: '转换less'
        })
        .option('c', {
            alias: 'css',
            describe: '转换css'
        })
        .option('j', {
            alias: 'js',
            describe: '转换js'
        })
        .option('i', {
            alias: 'img',
            describe: '转换img'
        })
        .option('m', {
            alias: 'html',
            describe: '转换html'
        })
        .option('p', {
            alias: 'path',
            describe: '输出目录'
        })
        .usage('mkbag pack [option] [address]')
        .example('mkbag pack', '打包当前目录下所有文件')
        .example('mkbag pack -c', '只打包当前目录下的css文件')
        .example('mkbag pack -s', '只打包当前目录下的sass文件')
        .example('mkbag pack -l', '只打包当前目录下的less文件')
        .example('mkbag pack -j', '只打包当前目录下的js文件')
        .example('mkbag pack -i', '只打包当前目录下的img文件')
        .example('mkbag pack -m', '只打包当前目录下的html文件')
        .example('mkbag pack -p ./output', '指定打包输出目录')
        .example('mkbag pack -s -p ./output', '只打包当前目录下的sass文件到output文件夹')
        .help("h")
        .alias("h", "help")
        .argv

    myCommand.pack(yargs.argv);

} else {
    yargs.showHelp();
}
