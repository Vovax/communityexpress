'use strict';

module.exports = {

    init: function() {
        $('<div/>', {
            class: 'loader col-xs-4 col-xs-offset-4'
        }).appendTo('body');
        $('<div/>', {
            class: 'loader-img'
        }).appendTo('.loader');
        $('<p/>', {class: 'loader-text'}).appendTo('.loader');
    },

    show: function(text) {
        this.init();
        $('.loader').css('display', 'block');
        $('.loader-text').text(text);
    },

    showErrorMessage: function(err, msg) {
        if (err.status == 400) {
            this.showFlashMessage(err.responseJSON.error.message);
        } else {
            this.showFlashMessage(msg);
        }
    },

    showFlashMessage: function(msg, options){

        var self = this;

        if( _(msg).isObject() ){
            options = msg;
            msg = null;
        } else {
            options = options || {};
        };

        var text = msg || options.msg || 'finished loading';

        this.show(text);
        setTimeout(self.hide, 3000);
    },

    hide: function() {
        $('.loader').remove();
    }
}