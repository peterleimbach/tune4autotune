// Peter Leimbach
// Date 01.01.2018
// purpose: read my profile from NS site and transform it in autotune format and create profile.json, pumpprofile.json and autotune.json
//
// read the profile file downloaded from ns-get
var fs = require("fs");
var content = fs.readFileSync("tuneInput.json");

// parse the content of this file into the variable jsonContent 
var jsonContent = JSON.parse(content)[0];
// reduce the information to the relevant store information
//
// ??? this has to be adapted to your profile name "PeterStandard" is my profile name
//
var jsonContent = jsonContent.store.PeterStandard;

// fill the attribute min_5m_carbimpact which is not in NS
jsonContent.min_5m_carbimpact = 3;

// convert the string from NS into a number
jsonContent.dia = parseInt(jsonContent.dia);

// drop some unnecessary fields
jsonContent.units = undefined;
jsonContent.startDate = undefined;
jsonContent.target_high = undefined;
jsonContent.target_low = undefined;
jsonContent.timezone = undefined;
jsonContent.carbs_hr = undefined;
jsonContent.delay = undefined;

// autosens_min, autosens_max setzen
// define autosens_min and autosens_max as suggested in the documentation 
jsonContent.autosens_min = 0.7;
jsonContent.autosens_max = 1.2;

// rename field basal into basalprofile
jsonContent.basalprofile = jsonContent.basal;
// drop the field basal
jsonContent.basal = undefined;

// for all basalprofile entries rename and recalculate fields
for (i = 0; i < jsonContent.basalprofile.length; i++){
  jsonContent.basalprofile[i].start = jsonContent.basalprofile[i].time + ":00";
  jsonContent.basalprofile[i].time= undefined; 
  jsonContent.basalprofile[i].minutes = jsonContent.basalprofile[i].timeAsSeconds / 60;
  jsonContent.basalprofile[i].timeAsSeconds= undefined; 
  jsonContent.basalprofile[i].rate = jsonContent.basalprofile[i].value;
  jsonContent.basalprofile[i].value= undefined; 
  
}

// rename carb_ratio into carbratio and move field in structure
jsonContent.carb_ratio = jsonContent.carbratio[0].value * 1;
jsonContent.carbratio = undefined;

// create isfProfile
jsonContent.isfProfile = new Object;
jsonContent.isfProfile.sensitivities = new Array(new Object);
jsonContent.isfProfile.sensitivities[0].i = 0;
jsonContent.isfProfile.sensitivities[0].start = "00:00:00";
jsonContent.isfProfile.sensitivities[0].sensitivity = jsonContent.sens[0].value * 1;
jsonContent.isfProfile.sensitivities[0].offset = 0;
jsonContent.isfProfile.sensitivities[0].x = 0;
jsonContent.isfProfile.sensitivities[0].endOffset = 1440;
jsonContent.sens = undefined;

// write JSON Object in File "profile.json"
var outfs = require("fs");
outfs.writeFile("./profile.json", JSON.stringify(jsonContent, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
});

// write JSON Object in File "pumpprofile.json"
outfs.writeFile("./pumpprofile.json", JSON.stringify(jsonContent, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
});

// write JSON Object in File "autotune.json"
outfs.writeFile("./autotune.json", JSON.stringify(jsonContent, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
});