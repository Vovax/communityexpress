'use strict';

var template = require('ejs!./whoToFollow.ejs');

var WhoToFollowView = Mn.ItemView.extend({

    template: template,

    className: 'whoToFollowBlock'

});

module.exports = WhoToFollowView;
