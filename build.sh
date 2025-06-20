#!/bin/bash

echo "---- Custom Azure Build Script ----"

# Optional: clean existing artifacts
rm -rf node_modules pnpm-lock.json

# Safe install even with peer conflicts
npm install --legacy-peer-deps

# Optional: run build if you have TypeScript or bundler
echo $(node -v)
npx tsc

# Start the app
npm start
