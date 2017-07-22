#!/bin/bash
port=80
remote_folder_path=web
log_file="log.txt"
cd $remote_folder_path
if [[ -n "$port" ]]; then
    echo "Start build docker container...." >> ${log_file}
    docker build -t nfq/test .
    docker kill $(docker ps -aqf "name=nfq-test")
    docker rm $(docker ps -aqf "name=nfq-test")
    docker run --name nfq-test -p 80:3000 -d nfq/test 
else
    echo "argument error" >> ${log_file}
fi