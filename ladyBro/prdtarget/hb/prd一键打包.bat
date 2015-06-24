@echo off 
cd D:\tanwenbin\FED\code\hongbao\ladyBro
d:

if exist "fis-conf-prd.js" rename fis-conf.js fis-conf-test.js & rename fis-conf-prd.js fis-conf.js

fis release -ompDd ./prdtarget/hb
exit