define(['backbone'], function(Backbone) {
  "use strict";

  var Footer = Backbone.View.extend({
    el: $('#todo-footer'),

    events: {
      'click #filter-all': 'showAll',
      'click #filter-active': 'showActive',
      'click #filter-completed': 'showCompleted'
    },
    
    initialize: function() {
      this.listenTo(this.collection, 'add', this.changed, this);
      this.listenTo(this.collection, 'remove', this.changed, this);
      this.listenTo(this.collection, 'change', this.changed, this);
    },

    changed: function() {
      var uncompleted = this.collection.filter(function(item) {
        return !item.get('done');
      });

      this.$el.find('#items-left').text(uncompleted.length);
    },

    showAll: function() {
      this.options.listFilter.set('filter', 'all');
    },
    
    showActive: function() {
      this.options.listFilter.set('filter', 'active');
    },
    
    showCompleted: function() {
      this.options.listFilter.set('filter', 'completed');
    }

  });

  return Footer;
});