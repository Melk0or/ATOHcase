#!/bin/bash

cd ./back

npm install

npm run build

docker compose up -d

npm run start:prod 