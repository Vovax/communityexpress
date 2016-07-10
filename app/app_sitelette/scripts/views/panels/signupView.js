/*global define*/

'use strict';

var template = require('ejs!../../templates/signup.ejs'),
    Vent = require('../../Vent'),
    loader = require('../../loader'),
    config = require('../../appConfig'),
    PopupView = require('../components/popupView'),
    sessionActions = require('../../actions/sessionActions'),
    h = require('../../globalHelpers');

var SignupView = PopupView.extend({

    template: template,

    id: 'signup_panel',

    initialize: function(){
        this.addEvents({
            'submit': 'submitForm'
        });
    },

    beforeShow: function () {
        var h = $( window ).height();
        var w = $( window ).width();
        this.$el.css({
            'max-height': 450,
            'max-width': 300,
            'width': w * 0.8
        });
    },

    submitForm: function(e) {
        e.preventDefault();
        var data = this.getFormData();

        loader.show();


        sessionActions.registerNewMember(
            window.community.serviceAccommodatorId,
            window.community.serviceLocationId,
            data.username,
            data.password,
            data.email,
            data.password_confirmation)
                .then(this._onSignupSuccess.bind(this), this._onSignupError.bind(this));

        return false;
    },

    getFormData: function() {
        var values = {};
        $.each(this.$el.find('form').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });
        return values;
    },

    _onSignupSuccess: function(response) {
        loader.showFlashMessage( 'successfully signed up as ' + response.username );
        this.shut();
    },

    _onSignupError: function(e) {
        if(e && e.type === 'validation'){
            loader.showFlashMessage( e.message );
        } else {
            loader.showFlashMessage(h().getErrorMessage(e, 'Error signin up'));
        }
    }

});

module.exports = SignupView;
