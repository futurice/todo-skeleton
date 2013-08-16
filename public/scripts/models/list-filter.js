define(['backbone'], function(Backbone) {
  "use strict";
  
  var filters = {
    all: function() {
      return true;
    },

    active: function(item) {
      return !item.get('done');
    },

    completed: function(item) {
      return !!item.get('done');
    }
  };

  // Define Todo model
  var ListFilter = Backbone.Model.extend({
    
    filterFn: function(item) {
      var fn = filters[this.get('filter')] || filters.all;
      return fn(item);
    }
  });

  return ListFilter;
});