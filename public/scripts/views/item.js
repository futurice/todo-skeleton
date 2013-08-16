define(['backbone', 'text!partials/item.html'], function(Backbone, tmpl) {
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

  function checkmark(done) {
    return done ? '<span style="color: green">✔</span>' : '✘';
  }

  var ItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'clearfix',
    template: _.template(tmpl),

    events: {
      'click .delete': 'destroy',
      'click .checkmark': 'toggle',
      'dblclick .title': 'edit',
      'blur .edit': 'blur',
      'keyup .edit': 'keyup'
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.destroyed, this);
      this.listenTo(this.model, 'change', this.render, this);
      this.listenTo(this.options.listFilter, 'change', this.filterVisible, this);
    },

    destroy: function() {
      this.model.destroy();
    },

    destroyed: function() {
      this.remove();
    },

    edit: function() {
      this.$el.find('.title').hide();
      this.showAndFocusEdit();
    },

    filterVisible: function() {
      if(this.options.listFilter.filterFn(this.model)) {
        this.$el.show();
      } else {
        this.$el.hide();
      }
    },

    showAndFocusEdit: function() {
      var $edit = this.$el.find('.edit');
      $edit.show();
      $edit.focus();
    },

    hideEdit: function() {
      var $edit = this.$el.find('.edit');
      $edit.hide();
      this.$el.find('.title').show();
    },

    keyup: filter(isEnter, function() {
      this.blur();
    }),

    blur: function() {
      var changed = this.model.get('title') !== this.$el.find('.edit').val();

      if(changed) {
        this.model.set('title', this.$el.find('.edit').val());
        this.model.save();
      } else {
        this.hideEdit();
      }
    },

    toggle: function() {
      this.model.set('done', !this.model.get('done'));
      this.model.save();
    },

    render: function() {
      var html = this.template({
        title: this.model.get('title'),
        done: checkmark(this.model.get('done')),
        doneClass: this.model.get('done') ? 'done' : ''
      });
      this.$el.html(html);
      return this;
    }
  });

  return ItemView;
});