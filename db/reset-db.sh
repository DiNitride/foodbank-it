#!/bin/bash
echo Warning! Removing all DB data and containers from system...
docker-compose rm -f
docker volume prune -f
rm -rf ./mount/*
echo Done, run docker-compose up to rebuild DB