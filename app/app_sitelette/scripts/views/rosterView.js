/*global define*/

'use strict';

var Vent = require('../Vent'), //
    loader = require('../loader'), //
    appCache = require('../appCache.js'),
    RosterBasketModel = require('../models/RosterBasketModel'), //
    CatalogBasketModel = require('../models/CatalogBasketModel'), //
    orderActions = require('../actions/orderActions'), //
    PageLayout = require('./components/pageLayout'), //
    RosterComboItemView = require('./partials/roster_combo_item.js'), //
    RosterCatalogItemView = require('./partials/roster_catalog_item.js'), //
    ListView = require('./components/listView');

var RosterView = PageLayout.extend({

    name: 'roster',

    onShow: function() {
        this.addEvents({
            'click .back': 'goBack',
            'click .order_button': 'triggerOrder',
            'click .edit_button': 'openEditPanel'
        });
        this.renderItems();
        this.listenTo(this.basket, 'reset change add remove', this.updateBasket, this);
        this.navbarView.hide(); // $('#cmtyx_navbar').fadeOut('slow');
        /* if launched from URL, hide back button*/
        if (typeof this.launchedViaURL !== 'undefined' && this.launchedViaURL === true) {
            $(this.el).find('.navbutton_back').hide();
        } else {
            $(this.el).find('.navbutton_back').show();
        }

    },

    initialize: function(options) {
        this.roster = options.roster.collection;
        this.sasl = options.sasl;
        this.basket = options.basket;
        this.backToRoster = options.backToRoster;
        this.rosterId = options.rosterId;
        this.rosterType = options.roster.data.rosterType.enumText;
        this.rosterDisplayText = options.roster.data.displayText;
        this.navbarView = options.navbarView;
        this.launchedViaURL = options.launchedViaURL;
        this.on('show', this.onShow, this);
        this.basket.on('change', this.updateBasket, this);

    },

    /*used to initialie roster_content.ejs template */
    renderData: function() {
        return {
            basket: this.basket
        };
    },

    /* used to update the roster view created originally */
    updateBasket: function() {
        var comboCount = this.basket.getComboCount();
        var nonComboCount = this.basket.getNonComboItemCount();
        this.$('#cmtyex_roster_cart_comboCount').text(comboCount + " x");
        this.$('#cmtyex_roster_cart_nonComboCount').text(nonComboCount + " x");
    },

    goBack: function() {
        this.triggerRestaurantView();
        this.navbarView.show();
    },

    triggerRestaurantView: function() {
        Vent.trigger('viewChange', 'restaurant', this.sasl.getUrlKey(), {
            reverse: true
        });
    },

    /* used for showing the flyout for combo items */
    openAddToBasketView: function(model, catalogId, catalogDisplayText) {
        this.openSubview('addToRosterBasket', model, {
            basket: this.basket,
            catalogId: catalogId,
            catalogDisplayText: catalogDisplayText
        });
    },


    triggerOrder: function() {
        this.withLogIn(function() {
            Vent.trigger('viewChange', 'roster_order', {
                id: this.sasl.getUrlKey(),
                rosterId: this.rosterId,
                backToCatalog: true, // /* This will always be true */
                backToCatalogs: this.backToCatalogs,
                /*
                 * not used by order,
                 * but passed back to
                 * catalog view
                 */
                backToRoster: true,
                launchedViaURL: this.launchedViaURL,
                navbarView: this.navbarView
            }, {
                reverse: true
            });
        }.bind(this));
    },

    openEditPanel: function() {


        this.openSubview('editRosterView', this.basket.catalogs, {
            actions: {
                removeItem: function(selected) {
                    _(selected).each(function(item) {
                        this.basket.removeItem(item);
                    }.bind(this));
                }.bind(this)
            },
            template: require('ejs!../templates/partials/edit_roster_view_item.ejs')
        });
    },


    renderItems: function() {

        switch (this.rosterType) {
            case 'COMBO':
                /*
                 * add the ul
                 */
                var $ul = $('<ul></ul>');
                _(this.roster.catalogs).each(
                    function(catalog, i) {
                        var catalogType = catalog.catalogType.enumText;
                        var catalogId = catalog.catalogId;
                        var catalogDisplayText = catalog.displayText;
                        switch (catalogType) {
                            case 'COMBO':
                                var showOneClickOrder = true;
                                _(catalog.groups).each(function(group, ii, ll) {
                                    if (_(group.unSubgroupedItems).size() > 1) {
                                        showOneClickOrder = false;
                                    }
                                });
                                if (showOneClickOrder) {
                                    var li = new RosterComboItemView({
                                        onClick: function(model) {
                                            //this.$('#cmtyex_roster_cart_summary').fadeIn('slow');
                                            this.openAddToBasketView(model, catalogId, catalogDisplayText);
                                        }.bind(this),
                                        model: catalog,
                                        parent: this
                                    }).render().el;
                                    $ul.append(li);
                                } else {
                                    var li = new RosterCatalogItemView({
                                        showCatalog: function(model) {
                                            this.triggerCatalogView(catalog, catalogId, catalogDisplayText);
                                        }.bind(this),
                                        model: catalog,
                                        parent: this
                                    }).render().el;
                                    $ul.append(li);
                                }
                                break;
                            case 'ITEMIZED':
                            case 'UNDEFINED':
                            default:

                                var li = new RosterCatalogItemView({
                                    showCatalog: function(model) {
                                        this.triggerCatalogView(catalog, catalogId, catalogDisplayText);
                                    }.bind(this),
                                    model: catalog,
                                    parent: this
                                }).render().el;
                                $ul.append(li);

                        }

                    }.bind(this));
                this.$('.cmntyex-items_placeholder').append($ul);
                break;
            case 'ITEMIZED':
            case 'UNDEFINED':
            default:
        }
    },

    triggerCatalogView: function(catalog, catalogId, catalogDisplayText) {
        /*
         did we create the catalog in our basket already? If not create it now, and set it
         in appcache for catalog dialog to fine.
         */
        var tempCatalogBasket = this.basket[catalogId];
        if (typeof tempCatalogBasket === 'undefined') {
            var catalogDetails = {
                catalogUUID: catalog.catalogId,
                catalogDisplayText: catalog.displayText,
                catalogType: catalog.catalogType.enumText,
                price: catalog.price,
                quantity: 0
            };
            tempCatalogBasket = new CatalogBasketModel();
            tempCatalogBasket.setCatalogDetails(catalogDetails);
            this.basket[catalogId] = tempCatalogBasket;
            /* push this specific catalog model to app cache */
            appCache.set(this.sasl.sa() + ':' + this.sasl.sl() + ':' + catalogId + ':catalogbasket', this.basket[catalogId]);
        }


        Vent.trigger('viewChange', 'catalog', {
            id: this.sasl.id,
            catalogId: catalogId,
            backToCatalog: true,
            backToCatalogs: false,
            backToRoster: true,
            rosterId: this.rosterId,
            launchedViaURL: this.launchedViaURL,
            navbarView: this.navbarView
        }, {
            reverse: false
        });
    }

});

module.exports = RosterView;
