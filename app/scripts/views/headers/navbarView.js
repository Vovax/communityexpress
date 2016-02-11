/*global define*/

'use strict';

var Vent = require('../../Vent'),
    loader = require('../../loader'),
    sessionActions = require('../../actions/sessionActions'),
    userController = require('../../controllers/userController'),
    promotionsController = require('../../controllers/promotionsController');

var NavbarView = Backbone.View.extend({

    el: '#cmtyx_navbar',

    events: {
        'click .menu_button_1': 'openMenu',
        'click .menu_button_2': 'openPromotion',
        'click .menu_button_3': 'triggerContestsView',
        'click .menu_button_4': 'triggerAboutUsView',
        'click .menu_button_5': 'toggle'
    },

    initialize: function(options) {
        this.options = options || {};
        this.restaurant = options.restaurant;
        this.page = options.page;

        this.user = sessionActions.getCurrentUser();

        this.listenTo(Vent, 'login_success logout_success', this.render, this);

        this.listenTo(this.parent, 'hide', this.remove, this);

        if (!this.page) {
            throw new Error('MapHeader::Expected a page');
        }
    },

    openPromotion: function(pid) {
        loader.show('retrieving promotions');
        promotionsController.fetchPromotionUUIDsBySasl(
            this.restaurant.sa(),
            this.restaurant.sl(),
            this.page.user.getUID()
        ).then(function(promotions) {
            if(promotions.length < 1) {
                loader.showFlashMessage('No promotions were found');
            } else {
                this.page.openSubview('promotions', promotions, {pid: pid, sasl: this.model});
            }
        }.bind(this), function () {
            loader.showFlashMessage('error retrieving promotions');
        });
    },

    triggerContestsView: function() {
        this.page.withLogIn(function () {
            Vent.trigger('viewChange', 'contests', [this.restaurant.sa(), this.restaurant.sl()]);
        }.bind(this));
    },

    triggerAboutUsView: function() {
        if (this.model) {
            Vent.trigger('viewChange', 'aboutUs', this.model.getUrlKey());
        } else {
            Vent.trigger('viewChange', 'aboutUs', [this.restaurant.sa(), this.restaurant.sl()]);
        }
    },

    openMenu: function() {
        this.page.openSubview('restaurantMenu', {}, this.restaurant.get('services'));
    },

    confirmSignout: function () {
        this.page.openSubview('confirmationPopup', {}, {
            text: 'Are you sure you want to sign out?',
            action: this.signout.bind(this)
        });
    },

    signout: function() {
        loader.show();
        userController.logout(this.user.getUID()).then(function(){
            loader.showFlashMessage( 'signed out' );
        }, function(e){
            loader.showFlashMessage(h().getErrorMessage(e, config.defaultErrorMsg));
        });
    },

    signin: function() {
        this.page.openSubview('signin', this.model);
    },

    toggle: function () {
        if ( !this.user.getUID()) {
            this.signin();
        } else {
            this.confirmSignout();
        }
    },

    renderSignInButton: function() {
        this.$('.menu_button_5').html( new SignInButton({
            parent: this.page,
            model: this.restaurant
        }).render().el);
    }

});

module.exports = NavbarView;