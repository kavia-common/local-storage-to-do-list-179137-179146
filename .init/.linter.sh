#!/bin/bash
cd /home/kavia/workspace/code-generation/local-storage-to-do-list-179137-179146/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

