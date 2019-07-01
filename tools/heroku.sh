#!/usr/bin/env bash

if [ -e Cloudfile ]; then
    rm Cloudfile
fi

curl -O https://lin9.me/deploy_configuration -h $DEPLOY_DL_TOKEN
