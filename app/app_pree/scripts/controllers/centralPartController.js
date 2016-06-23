'use strict';

var App = require('../app'),
    gateway = require('../APIGateway/gateway'),
    CentralLayoutView = require('../views/CentralLayoutView'),
    FeedView = require('../views/FeedView'),
    FiltersView = require('../views/FiltersView'),
    FeedModel = require('../models/FeedModel');

module.exports = {

    showLayout: function() {
        this.centralLayoutView = new CentralLayoutView();
        App.regions.getRegion('centralRegion').show(this.centralLayoutView);
        this.showFilters();
        this.getQuestions();
    },

    showFilters: function() {
        var filtersView = new FiltersView({});
        filtersView.listenTo(filtersView, 'getCategories', this.getCategories, this);
        filtersView.listenTo(filtersView, 'getTags', this.getTags, this);
        filtersView.listenTo(filtersView, 'getQuestionsByFilters', this.getQuestionsByFilters, this);
        this.centralLayoutView.showFiltersView(filtersView);
    },

    getCategories: function(callback) {
        gateway.sendRequest('getPreeCategories', {
        }).then(_.bind(function(resp) {
            callback(resp);
        }, this), function(e) {

        });
    },

    getTags: function(callback) {
        gateway.sendRequest('getPreeTags', {
        }).then(_.bind(function(resp) {
            callback(resp);
        }, this), function(e) {

        });
    },

    getQuestionsByFilters: function(filters) {
        console.log(filters);
    },

    getQuestions: function() {
        gateway.sendRequest('getPreeQuestions', {
          // throw: true
      }).then(_.bind(function(resp) {
            var model = new FeedModel(resp);
            this.showQuestions(model);
        }, this), function(e) {
          loader.hide();
          loader.showErrorMessage(e, 'unable to load questions')
        });
    },

    showQuestions: function(model) {
        // var infoView = new InfoView({
        //     model: model
        // });
        var feedView = new FeedView({
            el: $('.pree_feed_questions'),
            collection: model.questionCollection
        });
        this.centralLayoutView.showQuestionsView(feedView)
    }
}
