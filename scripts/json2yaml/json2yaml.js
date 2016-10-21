var fs = require('fs');
var yaml = require('node-yaml');
var toMarkdown = require('to-markdown');

var cardsJson = fs.readFileSync('cards.json');

// parse the json string into an actual js object so we can work with it
var cardsObj = JSON.parse(cardsJson);

// for each string that could contain html in cardsObj, set the value to toMarkdown of that string. then go through and detect any &html syntax and convert that to unicode by replacing '&html' with String.fromCharCode(html) where 'html' is the value specified

// do stuff to cardsObj here then save to yaml file.
yaml.writeSync('out.yml', cardsObj);
