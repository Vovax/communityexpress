/*global define*/

'use strict';

var Vent = require('../../Vent'),
    loader = require('../../loader');

var NavbarView = Backbone.View.extend({

    el: '#cmtyx_navbar',

    events: {
        'click .menu_button_1': 'selectLocation'
    },

    initialize: function(options) {
        this.options = options || {};
        this.page = options.page;

        this.listenTo(this.parent, 'hide', this.remove, this);

        if (!this.page) {
            throw new Error('MapHeader::Expected a page');
        }
    },

    selectLocation: function() {
        this.page.openSubview('locationList', {}, this.options);
    }

});

module.exports = NavbarView;