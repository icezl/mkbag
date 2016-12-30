请下载git包使用
https://github.com/icezl/mkbag.git


新建一个app文件夹在根目录
复制前端代码进app文件夹
运行node ./bin/mkbag start 来开启开发模式

目前文件架构只支持以下方式
html    ./app/
sass    ./app/sass
less    ./app/less
css     ./app/css
js      ./app/js
img     ./app/img


运行node ./bin/mkbag start pack 来打包整个项目至dist文件夹下

pack 可选参数
-j  只打包js
-c  只打包css
-s  只打包sass
-l  只打包less
-i  只打包img
-h  只打包html
-h  打包目录地址/默认为dist文件夹下
