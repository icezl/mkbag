编辑目录 ./app
输出目录 ./dist

sass,less必须要放进./app/sass ./app/less

使用流程:
命令行至根目录
运行  npm install    安装插件
运行  node ./bin/mkbag start    进入编辑模式

实际看到的效果为dist内文件展示

文件监控只做了增改配置,如有删除文件,直接删除dist文件夹
重新运行start命令,也可以手动至dist包内删除


单纯打包 运行 node ./bin/mkbag pack


