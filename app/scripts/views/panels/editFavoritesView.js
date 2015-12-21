/*global define*/

'use strict';

var template = require('ejs!../../templates/editFavorites.ejs'),
    loader = require('../../loader'),
    PanelView = require('../components/panelView'),
    ListView = require('../components/listView'),
    EditFavoriteItem = require('../partials/edit_favorite_item'),
    h = require('../../globalHelpers');

var EditFavoritesView = PanelView.extend({

    template: template,

    addedEvents: {
        'click .back_button': 'openSettings',
        'click .cmntyex-button-edit': 'toggleEditable',
        'click .cmntyex-button-cancel': 'toggleEditable',
        'click .cmntyex-button-done': 'removeSelected'
    },

    initialize: function (options){

        options = options || {};

        this.itemTemplate = options.template;

        this.actions = options.actions;

        this.$el.attr({'id': 'cmntyex_edit_favorites_panel'});

        this.addEvents(this.addedEvents);

        this.collection.each(function (model) {
            model.set({
                'editable': true,
                'selected': false
            });
        });

    },

    render: function (update) {
        //prevent jqm panel widget from breaking when updated
        var container = update ? this.$('.ui-panel-inner') : this.$el;
        var editable = this.collection.length > 0 ? this.collection.at(0).get('editable') : false;
        container.html(this.template({ editable: editable }));
        container.find('.cmntyex-list_container').html(new ListView({
            collection: this.collection,
            ItemView: EditFavoriteItem,
            ItemViewOptions: {
                template: this.itemTemplate
            },
            parent: this
        }).render().el);
        return this;
    },

    toggleEditable: function () {
        this.collection.each(function (model) {
            model.set('editable', !model.get('editable'));
        });
        this._update();
    },

    removeSelected: function () {
        loader.show('deleting items');
        var selected = this.collection.where({selected: true});
        $.when(this.actions.removeItem(selected))
            .then(function () {
                this.toggleEditable();
                loader.hide();
            }.bind(this), function () {
                loader.showFlashMessage(h().getErrorMessage(e, 'error deleting favorites'));
            });
    },

    _update: function () {
        this.render(true);
        this.enhance();
    }

});

module.exports = EditFavoritesView;
