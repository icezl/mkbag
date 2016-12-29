请把开发包放在app文件架内:
运行mkbag start 来收集app包内结构
初始化包架构
html    ./app/
sass    ./app/sass
less    ./app/less
css     ./app/css
js      ./app/js
img     ./app/img


运行mkbag pack 来打包整个项目至dist文件夹下

pack 可选参数
-j  只打包js
-c  只打包css
-s  只打包sass
-l  只打包less
-i  只打包img
-h  只打包html
-h  打包目录地址/默认为dist文件夹下
