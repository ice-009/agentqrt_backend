const Handlebars = require('handlebars');

Handlebars.registerHelper('get', function(array, index) {
  return array[index];
});