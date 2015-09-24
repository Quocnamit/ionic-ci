#!/bin/bash

ionic state restore
node_modules/.bin/karma start test/karma.config.js
ionic build android --release --gradleArg=--no-daemon
curl -u $SAUCE_USERNAME:$SAUCE_ACCESSKEY -X POST -H "Content-Type: application/octet-stream" https://saucelabs.com/rest/v1/storage/panarasi/android-release-unsigned.apk?overwrite=true -T platforms/android/build/outputs/apk/android-release-unsigned.apk
node_modules/.bin/protractor test/protractor.conf.js  --capabilities.username=$SAUCE_USERNAME --capabilities.accesskey=$SAUCE_ACCESSKEY
curl  -H "X-HockeyAppToken:$HockeyAppToken"  -F "status=2"  -F "notify=1" -F "notes=Some new features and fixed bugs."  -F "notes_type=0" -F "ipa=@platforms/android/build/outputs/apk/android-release-unsigned.apk" https://rink.hockeyapp.net/api/2/apps/upload
