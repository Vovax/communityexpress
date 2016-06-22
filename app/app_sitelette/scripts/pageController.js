/*global define console*/

'use strict';

var Vent = require('./Vent'),
    communicationActions = require('./actions/communicationActions'),
    filterActions = require('./actions/filterActions'),
    saslActions = require('./actions/saslActions'),
    sessionActions = require('./actions/sessionActions'),
    promotionActions = require('./actions/promotionActions'),
    orderActions = require('./actions/orderActions'),
    galleryActions = require('./actions/galleryActions'),
    catalogActions = require('./actions/catalogActions'),
    contestActions = require('./actions/contestActions'),
    eventActions = require('./actions/eventActions'),
    ReviewsCollection = require('./collections/reviews');

var visited = {
    sasl: false,
};

var hasBeenVisited = function(page) {
    var beenVisited = visited[page];
    if (beenVisited) {
        return true;
    } else {
        visited[page] = true;
        return false;
    }
};

var getUrl = function(sasl) {

    var url = sasl.getFriendlyUrlKey();

    if ( !url ) {
        console.error( 'urlKey could not be found' );
    }

    return url;
};

module.exports = {

    root: function () {
        return $.Deferred().resolve({
            url: ''
        }).promise();
    },

    restaurant: function(options, pid) { // options is an array with either sasl or urlKey

        return saslActions.getSasl(options)
            .then(function(response) {
                return {
                    model: response,
                    user: sessionActions.getCurrentUser(),
                    isFirstTime: !hasBeenVisited('sasl'),
                    url: getUrl(response),
                    pid: pid
                };
            }, function () {
                Vent.trigger('viewChange', 'root');
            }.bind(this));

    },

    chat: function( options ) { // options is an array with either sasl or urlKey

        return saslActions.getSasl(options)
            .then(function(response) {
                return {
                    restaurant: response,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(response) + '/chat'
                };
            }, function () {
                Vent.trigger('viewChange', 'root');
            }.bind(this));

    },

    reviews: function( options ) { // options is an array with either sasl or urlKey

        return saslActions.getSasl(options)
            .then(function(response) {
                return {
                    collection: new ReviewsCollection(),
                    restaurant: response,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(response) + '/reviews'
                };
            }, function () {
                Vent.trigger('viewChange', 'root');
            }.bind(this));

    },

    promotions: function (options) {
        return this.restaurant(options[0], options[1]);
    },

    editable: function (options) {
        var itemsFn = {
            promotion: {
                activate: function (sa, sl) {
                    return promotionActions.getPromotions(sa, sl, 'APPROVED');
                },
                delete: function (sa, sl) {
                    return promotionActions.getPromotions(sa, sl, 'ACTIVE');
                }
            },
            gallery: {
                activate: function (sa, sl) {
                    return galleryActions.getApprovedThumbnails(sa, sl);
                },
                delete: function (sa, sl) {
                    return galleryActions.getActiveThumbnails(sa, sl);
                }
            }
        };

        var actionFunctions = {
            promotion: {
                activate: promotionActions.activatePromotion,
                delete: promotionActions.deActivatePromotion
            },
            gallery: {
                activate: galleryActions.activateGalleryItem,
                delete: galleryActions.deactivateGalleryItem
            }
        };

        return $.when(
            saslActions.getSasl(options.sasl),
            sessionActions.getCurrentUser(),
            itemsFn[options.item][options.action].apply(null, [options.sasl[0], options.sasl[1]])
        ).then(function (restaurant,  user, items) {
            return {
                items: items,
                user: user,
                url: getUrl(restaurant),
                restaurant: restaurant,
                action: options.action,
                actionfn: function (itemId) {
                    return actionFunctions[options.item][options.action]
                        .apply(null, [restaurant.sa(), restaurant.sl(), itemId]);
                }
            };
        });
    },

    catalog: function (options) { // options is an array with either sasl or urlKey
        var sasl;
            catalogId = options.catalogId,
            backToCatalogs = options.backToCatalogs;
        var backToCatalogs = options.backToCatalogs;
        var catalogId = options.catalogId;
        return saslActions.getSasl(options.id)
            .then(function(ret) {
                sasl = ret;
                return catalogActions.getCatalog(sasl.sa(), sasl.sl(), catalogId);
            }).then(function (catalog) {
                return {
                    sasl: sasl,
                    catalog: catalog,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '/catalog',
                    basket: catalogActions.getBasket(sasl.sa(), sasl.sl()),
                    backToCatalogs: backToCatalogs,
                    catalogId: catalogId
                };
            });
    },

    catalogs: function(options) {
        var sasl;
        var id = options;
        return saslActions.getSasl(options)
            .then(function(ret) {
                sasl = ret;
                return catalogActions.getCatalogs(sasl.sa(), sasl.sl());
            }).then(function (options) {
                if (options.data.length === 1) {
                    Vent.trigger('viewChange', 'catalog', {
                        id: id,
                        catalogId: options.data.catalogId,
                        backToCatalogs: false
                    });
                } else {
                    return {
                        sasl: sasl,
                        catalogs: options
                    };
                };
            });
    },

    posts: function (options) { // options is an array with either sasl or urlKey
        return saslActions.getSasl(options)
            .then(function (sasl) {
                return {
                    collection: new Backbone.Collection(),
                    sasl: sasl,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '/posts'
                };
            });
    },

    contests: function (options) {
        var sasl;
        return saslActions.getSasl(options)
            .then(function(ret) {
                sasl = ret;
                return contestActions.getContests(sasl.sa(), sasl.sl());
            }).then(function (contests) {
                return {
                    sasl: sasl,
                    contests: contests,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '/contests'
                };
            });
    },

    photoContest: function (options) {
        return $.when(
                contestActions.photo(options.id),
                saslActions.getSasl(options.sasl)
            ).then(function (contest, sasl) {
                return {
                    sasl: sasl,
                    model: contest,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '?t=h&u=' + contest.contestUUID
                };
            }, function (e) {
                console.error(e);
                Vent.trigger('viewChange', 'root');
                return e;
            });
    },

    pollContest: function (options) {
        return $.when(
                contestActions.poll(options.id),
                saslActions.getSasl(options.sasl)
            ).then(function (contest, sasl) {
                return {
                    sasl: sasl,
                    model: contest,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '?t=l&u=' + contest.contestUUID
                };
            }, function (e) {
                console.error(e);
                Vent.trigger('viewChange', 'root');
                return e;
            });
    },

    checkinContest: function (options) {
        return $.when(
                contestActions.checkin(options.id),
                saslActions.getSasl(options.sasl)
            ).then(function (contest, sasl) {
                return {
                    sasl: sasl,
                    model: contest,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '?t=c&u=' + contest.contestUUID
                };
            }, function (e) {
                console.error(e);
                Vent.trigger('viewChange', 'root');
                return e;
            });
    },

    aboutUs: function (options) {
        var sasl;
        return saslActions.getSasl(options)
            .then(function(ret) {
                sasl = ret;
                return saslActions.getAboutUs(sasl.sa(), sasl.sl());
            }).then(function (html) {
                return {
                    html: html,
                    sasl: sasl,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '/aboutUs'
                };
            });
    },

    order: function (options) {
        var sasl,
            cardType,
            catalogId = options.catalogId,
            backToCatalogs = options.backToCatalogs;
        return saslActions.getSasl(options.id)
            .then(function(ret) {
                sasl = ret;
                return orderActions.getCreditInfo();
            }).then(function (ret) {
                cardType = ret;
                var sa = sasl.get('serviceAccommodatorId'),
                    sl = sasl.get('serviceLocationId');
                return orderActions.getPriceAddons(sa, sl);
            }).then(function(ret) {
                return {
                    sasl: sasl,
                    cardType: cardType,
                    priceAddons: ret,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '/catalog',
                    basket: catalogActions.getBasket(sasl.sa(), sasl.sl()),
                    catalogId: catalogId,
                    backToCatalogs: backToCatalogs
                };
            });
    },

    eventActive: function(options) {
        var sasl = options.sasl;
        return saslActions.getSasl(sasl)
            .then(function(ret) {
                sasl = ret;
                return eventActions.getEvents(options);
            }).then(function (eventAttrs) {
                return {
                    sasl: sasl,
                    eventAttrs: eventAttrs,
                    user: sessionActions.getCurrentUser(),
                    url: getUrl(sasl) + '?t=e&u=' + options.id
                };
            });
    }
};
