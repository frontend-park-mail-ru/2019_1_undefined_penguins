#! /usr/bin/bash

ssh-keyscan -H $PRODUCTION_MACHINE_ADDRESS >> ~/.ssh/known_hosts
chmod 600 ./deployment_travis_key
ssh -i ./deployment_travis_key travis@$PRODUCTION_MACHINE_ADDRESS << EOF
cd front
echo Aquiring fresh version of repo... && sudo git checkout deployment && \
echo Pulling changes... && sudo git pull && \
echo Restarting service... && sudo systemctl restart penguin-front.service && \
echo Enabling service ... && sudo systemctl enable penguin-front.service && \
echo Successfully deployed!!!
exit
EOF 