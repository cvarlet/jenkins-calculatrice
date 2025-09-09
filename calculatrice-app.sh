#!/bin/bash 

echo "********************************"
echo "CONSTRUCTION DE L'APPLICATION SUR LE PORT 3000"
docker compose up -d --build
echo "********************************"
date
