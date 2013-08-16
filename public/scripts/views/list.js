define(['backbone', 'views/item'], function(Backbone, ItemView) {
  "use strict";

  var ListView = Backbone.View.extend({
    el: $('#todo-list'),
    
    initialize: function() {
      this.listenTo(this.collection, 'add', this.addItem, this);
    },

    addItem: function(item) {
      var itemView = new ItemView({
        model: item,
        listFilter: this.options.listFilter
      });
      this.$el.append(itemView.el);
      itemView.render();
    }
  });

  return ListView;
});