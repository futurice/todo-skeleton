define(['backbone'], function(Backbone) {
  "use strict";
  
  // Define Todo model
  var Item = Backbone.Model.extend({
    urlRoot: "/api/todos"
  });

  return Item;
});