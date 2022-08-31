#!/bin/bash
docker build -t rbueno/express .
docker push rbueno/express

ssh deploy@$DEPLOY_SERVER << EOF
docker pull rbueno/express
docker stop api-boilerplate || true
docker rm api-boilerplate || true
docker rmi rbueno/express:current || true
docker tag rbueno/express:latest rbueno/express:current
docker run -d --restart always --name api-boilerplate -p 3000:3000 rbueno/express:current
EOF
