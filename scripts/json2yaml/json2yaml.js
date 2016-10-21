const yaml = require('node-yaml');
const fs = require('fs');

var cardsJson = fs.readFileSync('cards.json');

// parse the json string into an actual js object so we can work with it
var cardsObj = JSON.parse(cardsJson);

// do stuff to cardsObj here then save to yaml file.
yaml.writeSync('out.yml', cardsObj);
