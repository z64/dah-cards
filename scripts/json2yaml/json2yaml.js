var fs = require('fs');
var yaml = require('node-yaml');
var toMarkdown = require('to-markdown');
var Entities = require('html-entities').AllHtmlEntities;

// entities.decode will allow us to decode all HTML5 entities
var entities = new Entities();

if (process.argv.length != 4) {
  console.log('Usage: node json2yaml.js <infile> <outfile>');
  process.exit(1);
}

var cardsJson = fs.readFileSync(process.argv[2]);

// parse the json string into an actual js object so we can work with it
var cardsObj = JSON.parse(cardsJson);

// for each string that could contain html in cardsObj, set the value to toMarkdown of that string. then go through and detect any html entities and decode them directly into unicode.
function recurse(cards) {
  var keys = Object.keys(cards);

  for (prop in keys) {
    // keys is an array of the keys of cards, NOT the objects themselves, so prop is referring to the index OF the key of the corresponding object.
    // NOT the key or index of the object itself!
    var obj = cards[keys[prop]];

    // check if the property is an object, if so we're going through again :^)
    if (typeof obj === 'object') {
      recurse(obj);
    } else if (typeof obj === 'string') {
      // run the string through a markdown converter and then find any &html codes and replace them with a unicode char using fromCharCode
      // make sure we're modifying the cards object itself and not the temporary object!
      obj = entities.decode(obj);
      cards[keys[prop]] = toMarkdown(obj);
    }
  }
  return cards;
}

cardsObj = recurse(cardsObj);

yaml.writeSync(process.argv[3], cardsObj);
