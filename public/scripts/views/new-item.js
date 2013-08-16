define(['backbone'], function(Backbone) {
  "use strict";

  var ENTER_KEYCODE = 13;

  function isEnter(e) {
    return ENTER_KEYCODE === e.keyCode;
  }

  function filter(filterFn, clbk) {
    return function() {
      return filterFn.apply(this, arguments) ? clbk.apply(this, arguments) : null;
    };
  }

  var NewItemView = Backbone.View.extend({
    el: $('#new-item'),

    events: {
      "keyup": 'keyup'
    },
    
    initialize: function() {
      this.listenTo(this.collection, 'add', this.addItem);
    },

    keyup: filter(isEnter, function() {
      this.collection.create({
        title: this.$el.val(),
        done: false
      });

      // Empty
      this.$el.val('');
    })
  });

  return NewItemView;
});