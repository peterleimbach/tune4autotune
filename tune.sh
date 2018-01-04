#/bin/bash
# Peter Leimbach
# Date 01.01.2018
# purpose: skript for downloading profile from NS site, transform in profile files for autotune and start autotune
#
# script asumes to be called from the settings directors of myopenaps
#
# set the NightScout Site & API_SECRET before calling ns-get
export NS_SITE="https://yourNightscout.herokuapp.com"
export API_SECRET=YourAPISecret
# set the date to start from, END date will be TODAY
# Format is YYYY-MM-DD
export START_FROM="2017-12-31"
# set to US language
export LANG=en_US.utf8
# call ns-get to get the proilfe and store it in tune.json
ns-get profile.json $NS_SITE > tuneInput.json
# call the tune.js javascript which tranforms the tune.json into profile.json, pumprofile.json and autotune.json
node tune.js
# copy the json files in  ~myopenaps/settings/
cp *.json ~/myopenaps/settings/
# call autotune with the new profile loaded from NS site
oref0-autotune --dir=~/myopenaps --ns-host=$NS_SITE --start-date=$START_FROM | tail --lines=28
# unset API-SECRET & NS_SITE & START_DATE
export NS_SITE=
export API_SECRET=
export START_DATE=
# remove the .json files created earlier
rm profile.json
rm pumpprofile.json
rm autotune.json
rm tuneInput.json
# set to german language
export LANG=de_DE.UTF-8
