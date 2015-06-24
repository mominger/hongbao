@echo off 
cd E:\ladyBro0228
e:
rm -r target
rd /s/q target

##fis配置文件重命名
if exist "fis-conf-test.js" rename fis-conf.js fis-conf-prd.js & rename fis-conf-test.js fis-conf.js

fis release -mDd ./target
cd target
exit