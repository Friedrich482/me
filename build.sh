#!/bin/bash

echo "Phase 1: Build and start API..."
BUILDKIT_PROGRESS=plain docker compose up -d database --remove-orphans
BUILDKIT_PROGRESS=plain docker compose build api
BUILDKIT_PROGRESS=plain docker compose up -d api --remove-orphans

echo "Waiting for API to be ready..."
until curl -f http://localhost:3002/health; do
  echo "Waiting for API..."
  sleep 2
done

echo "Phase 2: Build frontend apps..."
BUILDKIT_PROGRESS=plain docker compose build web admin 

echo "Build complete!"