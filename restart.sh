#!/bin/bash
git pull
lsof -i:8888 | grep node|  awk '{ print  "kill -9 " $2 }'|sh
export PATH=/root/.nvm/versions/node/v8.12.0/bin:$PATH
npm run start  > logs/`date +"%Y-%m-%d%H%M%S".log` 2>&1 &
echo "success"