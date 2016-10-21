var fs = require('fs');
var yaml = require('node-yaml');
var toMarkdown = require('to-markdown');

var cardsJson = fs.readFileSync('cards.json');

// parse the json string into an actual js object so we can work with it
var cardsObj = JSON.parse(cardsJson);

// for each string that could contain html in cardsObj, set the value to toMarkdown of that string. then go through and detect any &html syntax and convert that to unicode by replacing '&html' with String.fromCharCode(html) where 'html' is the value specified
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
      cards[keys[prop]] = toMarkdown(obj);
    }
  }
  return cards;
}

cardsObj = recurse(cardsObj);



// do stuff to cardsObj here then save to yaml file.
yaml.writeSync('out.yml', cardsObj);
