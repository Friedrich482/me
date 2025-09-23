#!/bin/bash

echo "Phase 1: Build and start API..."
docker compose up -d database --remove-orphans
docker compose build api
docker compose up -d api --remove-orphans

echo "Waiting for API to be ready..."
until curl -f http://localhost:3002/health; do
  echo "Waiting for API..."
  sleep 2
done

echo "Phase 2: Build frontend apps..."
docker compose build web admin 

echo "Build complete!"