#!/bin/bash
cd /home/kavia/workspace/code-generation/geotune-explorer-105446-d24c9c1a/frontend_web
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

