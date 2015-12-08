/*global define*/

var Backbone = require('backbone'),
    sessionActions = require('../../actions/sessionActions'),
    ContentView = require('./contentView'),
    ToolbarView = require('./toolbarView'),
    SigninView = require('../panels/signinView'),
    NotificationPanel = require('../panels/notificationView'),
    viewFactory = require('../../viewFactory'),
    loader = require('../../loader'),
    configurationActions = require('../../actions/configurationActions'),
    h = require('../../globalHelpers');


var T_PATH = '../../templates/';

var PageView = function(options) {

    options = options || {};
    this.user = options.user;

    this.inheritedEvents = [];

    Backbone.View.call(this, options);

    this.contentView = options.contentView || new ContentView ({ template: require('../../templates/content/' + this.name + '_content.hbs') });
    if ( options.headerView ) {
        this.headerView = new options.headerView(_.extend(options.headerData, {
            page: this
        }));
        this.navBarView = new options.navBarView(_.extend(options.navBarData, {
            page: this
        }));
    } else {
        this.headerView = new ToolbarView ({ template: require('../../templates/toolbars/' + this.name + '_header.hbs') });
    }

    this.listenTo(this.contentView, 'show', this._onPageShow, this);
    this.listenTo(this.contentView, 'beforehide', this._onPageBeforeHide, this);
    this.listenTo(this.contentView, 'hide', this._onPageHide, this);
    this.listenTo(this, 'openPanel', this._onOpenPanel, this);

};

_.extend(PageView.prototype, Backbone.View.prototype, {

    pageEvents: {
            'click .menu_button_1' : 'openSettings'
        },

    el: '#cmtyx_landingView',

    openSettings: function() {
        this.openSubview('restaurantMenu', {}, this.model.get('services'));
        // this.hideMoreButton();;
        // this.openSubview('options', configurationActions.getConfigurations());
    },

    closeChildren: function() {
        this.trigger('close:all');
    },

    withLogIn: function (callback) {
        if (this.requireLogIn(callback)) {
            callback();
        }
    },

    loginFromIOS: function (callback) {
        window.iosCallback = function (uid, username) {
            sessionActions.setUser(uid, username);
            callback();
        };
        return "window.iosCallback";
    },

    requireLogIn: function(callback) {
        var conf = configurationActions.getConfigurations();
        var view;
        if(this.user.getUID()) {
            return true;
        } else if (conf.get('embedded')) {
            window.iosJavascriptLogin(this.loginFromIOS(callback));
        } else {
            view = new SigninView({
                parent: this,
                model: this.model || this.restaurant || this.sasl,
                title: 'Sign in Required',
                callback: callback
            });
            this.renderSubview(view);
            view.open();
            return false;
        }
    },

    _data: function() {

        if (_(this.renderData).isFunction()) {
            return this.renderData();
        }

        return this.renderData || {};

    },

    _onOpenPanel: function(viewName) {
        this.settings.openPanel(viewName);
    },

    getPageElement: function() {
        return this.contentView.$el;
    },

    events: function() {
        var e = this.pageEvents;

        _(this.inheritedEvents).each(function(events) {
            e = _.extend(e, events);
        });

        return e;
    },

    addEvents: function(eventObj) {
        var events = _.extend( {}, eventObj, this.pageEvents );
        this.delegateEvents(events);
    },

    renderSubview: function(view) {
        this.contentView.$el.append(view.render().el);
        view.enhance();
    },

    renderContent: function() {
        this.$el.append(this.contentView.render( this._data() ).el);
        return this.contentView;
    },

    renderToolbars: function() {
        this.$el.append( this.navBarView.render(this._data()).el );
        this.$el.append( this.headerView.render(this._data()).el );
    },

    openOverlay: function (name, options) {
        return $.when(viewFactory.create(name, options))
            .then(function (view) {
                this.contentView.$el.append( view.render().el );
                view.enhance();
                setTimeout(view.open.bind(view),50); // a little hack to enhance the opening animation
                return view;
            }.bind(this));
    },

    openSubview: function(viewname, callbackfn, options) {
        options = options || {};
        var self = this, callback;

        if(!$.isFunction(callbackfn)){
            callback = function () { return callbackfn; };
        } else {
            callback = callbackfn;
        }

        loader.show('loading ' + viewname);
        return $.when(
            callback()
        ).then(function(viewmodel){
            var view = viewFactory.create(viewname, viewmodel, self, options);
            self.contentView.$el.append( view.render().el );
            view.enhance();
            loader.hide();
            setTimeout(view.open.bind(view),50); // a little hack to enhance the opening animation
            return view;
        },function(e){
            loader.showFlashMessage(h().getErrorMessage(e, 'Error opening ' + viewname));
        });
    },

    _onPageBeforeHide: function() {
        this.trigger('beforehide');
        this.undelegateEvents();
    },

    _onPageShow: function() {
        this.renderToolbars();
        this.trigger('show');
    },

    _onPageHide: function() {
        this.trigger('hide');
        this.headerView.remove();
        this.navBarView.remove();
        this.close();
    },

    close: function() {
        this.closeChildren();
        this.undelegateEvents();
        this.stopListening();
    }

});

PageView.extend = Backbone.View.extend;

module.exports = PageView;
