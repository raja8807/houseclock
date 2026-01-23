@echo off
rmdir /s /q node_modules
del package-lock.json
npm install
npx expo start -c
