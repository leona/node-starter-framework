#!/bin/bash
#read -p "Commit description: " desc
git add --all && \
#git commit -m "$desc" && \
git commit -m "update" && \
git push origin master
send ""
send ""