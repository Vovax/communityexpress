 /*global define*/

'use strict';

var Backbone = require('backbone'), 
    template = require('../../templates/signin.hbs'),
    loader = require('../../loader'),
    PopupView = require('../components/popupView'),
    favoriteActions = require('../../actions/favoriteActions'),
    h = require('../../globalHelpers');

var SigninView = PopupView.extend({

    template: template,

    username: 'input[name="username"]',
    password: 'input[name="password"]',

    initialize: function(options){

        options = options || {};

        this.callback = options.callback || function () {};

        this.renderData = {
            title: options.title
        };

        this.$el.attr('id', 'cmntyex_signin_panel');

        this.addEvents({
            'click .submit_button': 'submitForm',
            'click .signup_button': 'openSignupView'
        });
    },

    openSignupView: function() {
        this.shut();
        this.$el.on('popupafterclose', function () {
            this.parent.openSubview('signup', this.model);
        }.bind(this));
    },

    submitForm: function() {
        loader.show();
        sessionActions.startSession(this.val().username, this.val().password)
            .then(function(response){
                loader.showFlashMessage( 'successfully signed in as ' + response.username );
                setTimeout(this.callback, 1000);
                this.shut();
            }.bind(this), function(jqXHR) {
                if( jqXHR.status === 400 ) {
                    this.showLoginError();
                    loader.hide();
                }else{
                    loader.showFlashMessage(h().getErrorMessage(jqXHR, 'Error signin in'));
                }
            }.bind(this));
        return false;
    },

    showLoginError: function() {
        this.$el.find('.login_error').show();
    },

    hideLoginError: function() {
        this.$el.find('.login_error').hide();
    },

    val: function () {
        return {
            username: $(this.username).val(),
            password: $(this.password).val()
        };
    }

});

module.exports = SigninView;