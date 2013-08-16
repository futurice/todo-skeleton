define(['backbone', 'models/item'], function(Backbone, Item) {
  "use strict";

  // Define List collection
  var List = Backbone.Collection.extend({
    model: Item,
    url: "/api/todos"
  });

  return List;
});