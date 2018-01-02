#/bin/bash
# Peter Leimbach
# Date 01.01.2018
# purpose: skript for downloading profile from NS site, transform in profile files for autotune and start autotune
# 
# script asumes to be called from the settings directors of myopenaps
#
# set the API_SECRET before calling ns-get
export API_SECRET=TopSecret
# set to US language
export LANG=en_US.utf8
# call ns-get to get the proilfe and store it in tune.json
ns-get profile.json https://thisisyourappname.herokuapp.com > tuneInput.json
# call the tune.js javascript which tranforms the tune.json into profile.json, pumprofile.json and autotune.json
node tune.js
# call autotune with the new profile loaded from NS site
#oref0-autotune --dir=~/myopenaps --ns-host=https://flatliner.herokuapp.com --start-date=2017-12-09 | tail --lines=28
# unset API-SECRET
export API_SECRET=
# set to german language
export LANG=de_DE.UTF-8
