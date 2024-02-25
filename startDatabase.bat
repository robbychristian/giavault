@echo off
net session >nul 2>&1 && goto :Run || powershell -ex bypass -c start -verb runas '%0'
:Run

cd "/Program Files/MongoDB/Server/7.0/bin"
mongod --dbpath "C:/Program Files/MongoDB/Server/7.0/data/" --port 27017