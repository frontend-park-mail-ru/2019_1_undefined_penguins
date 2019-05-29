#! /usr/bin/bash

ssh-keyscan -H $PRODUCTION_MACHINE_ADDRESS >> ~/.ssh/known_hosts
chmod 600 ./deployment_travis_key
cat ./deployment_travis_key
ssh -i ./deployment_travis_key -v travis@$PRODUCTION_MACHINE_ADDRESS << EOF
cd front
echo Aquiring fresh version of repo... && git checkout deployment && \
echo Pulling changes... && git pull && \
echo Restarting service... && systemctl restart penguin-front.service && \
echo Enabling service ... && systemctl enable penguin-front.service && \
echo Successfully deployed!!!
exit
EOF 