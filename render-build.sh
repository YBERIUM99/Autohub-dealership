#!/bin/bash
# Exit on error
set -o errexit

# Install dependencies
npm install

# Build project
npm run build