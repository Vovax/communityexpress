/*global define*/

'use strict';

var Vent = require('../Vent'),
    config = require('../appConfig'),
    loader = require('../loader'),
    viewFactory = require('../viewFactory'),
    PromotionModel = require('../models/promotionModel'),
    PageLayout = require('./components/pageLayout'),
    ListView = require('./components/listView'),
    TileView = require('./partials/tile_item');

var TilesView = PageLayout.extend({

    name: 'tiles',

    initialize: function(options) {
        options = options || {};
        this.tiles = options.tiles;
        this.on('show', this.onShow, this);
        this.on('hide', this.onHide, this);
    },

    renderData: function(){
        return _.extend( {});
    },

    onShow: function(){
        this.addEvents();
        this.renderTiles();

        try {
            addToHomescreen().show();
        } catch (e) {
            console.warn(' failed showing addToHomescreen');
        }
    },

    onHide: function() {
        this.$('.theme2_background').hide();
    },

    renderTiles: function() {
        _(this.tiles).each(function (rest_tiles) {
            this.rest_tiles = rest_tiles;
            var el = new ListView({
                ItemView: TileView,
                className: 'cmntyex-tile_list',
                collection: new Backbone.Collection(rest_tiles.tiles, {
                    model: PromotionModel
                }),
                dataRole: 'none',
                parent: this
            }).render().el;

            this.$('.cmntyex-tiles_placeholder').append(el);
        }.bind(this));
    }

});

module.exports = TilesView;
