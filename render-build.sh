#!/usr/bin/env bash
# Clean up node_modules and lockfile to avoid Rollup bug
rm -rf node_modules package-lock.json

# Fresh install
npm install

# Build the project
npm run build