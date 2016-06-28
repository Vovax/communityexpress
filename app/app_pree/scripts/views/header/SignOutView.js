'use strict';

var template = require('ejs!./signOut.ejs');

var SignOutView = Mn.ItemView.extend({
    template: template,

    className: 'modal fade signout',

    ui: {
        signout: '.confirmation_button'
    },

    events: {
        'click @ui.signout': 'performAction'
    },

    serializeData: function() {
        return {
            text: this.options.text
        };
    },

    onShow: function() {
        this.$el.modal();
    },

    performAction: function() {
        this.$el.modal('hide');
        this.$el.on('hidden.bs.modal', function() {
            this.options.action();
        }.bind(this));
    }
});

module.exports = SignOutView;
