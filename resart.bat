@echo off
set curlCount=1

echo ">>>>start kill old process"
ssh root@mingmac.com "lsof -i:8888 | grep java|  awk '{ print  \"kill -9 \" $2 }'|sh"
echo ">>>>process kill success"

