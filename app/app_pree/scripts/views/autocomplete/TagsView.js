'use strict';

var template = require('ejs!./tagsTpl.ejs'),
	itemTemplate = require('ejs!./itemTpl.ejs'),
	AutocompleteView = require('./AutocompleteView'),
	TagsCollection = require('./../../models/PreeTagsCollection');

var TagsItemView = Mn.ItemView.extend({
	template: itemTemplate,

	className: 'tag-item',

	ui: {
		tag: '.remove-tag'
	},

	events: {
		'click @ui.tag': 'removeTag'
	},

	serializeData: function() {

		return {
			tag: this.model.get('value'),
			hash: this.options.tagType === 'tags' ? '#' : ''
		};
	},

	removeTag: function() {
		this.trigger('removeTag');
	}
});

var TagsCollectionView = Mn.CollectionView.extend({
	childView: TagsItemView,

	childEvents: {
    	removeTag: function(tagView) {
    		this.collection.remove(tagView.model);
    	}
    },

	childViewOptions: function() {
      return {
        tagType: this.options.type
      };
    }
});

var TagsView = Mn.LayoutView.extend({

	template: template,

	regions: {
		inputRegion: '.js-input-region',
		tagsRegion: '.js-tags-region'
	},

	ui: {
		'go' : '.go-button',
		'discard' : '.discard-button',
		'collapsibleContent': '#tags-filter-expanded',
		'toggle': '.pree_tags_close'
	},

	events: {
		'click @ui.go': 'updateFilters',
		'click @ui.discard': 'discardChanges'
	},

	arrows: {
		down: '&#x25BC;',
		up: '&#x25B2;'
	},

	serializeData: function() {
		return {
			type: this.options.type
		};
	},

	onRender: function() {
		var categoriesAutocompleteView = new AutocompleteView(this.getCategoriesAutocompleteOptions());

		this.getRegion('inputRegion').show(categoriesAutocompleteView);

		this.tagsCollection = new TagsCollection();

		var tagsCollectionView = new TagsCollectionView({
			collection: this.tagsCollection,
			type: this.options.type
		});
		this.getRegion('tagsRegion').show(tagsCollectionView);
	},

	onShow: function() {
		this.toggleCollapsible();
		//change collapse/expande arrow
		this.ui.collapsibleContent.on('shown.bs.collapse', _.bind(function() {
			this.ui.toggle.html(this.arrows.up);
		}, this));
		this.ui.collapsibleContent.on('hidden.bs.collapse', _.bind(function() {
			this.ui.toggle.html(this.arrows.down);
		}, this));
	},

	toggleCollapsible: function() {
		//looks much better with timeout
		setTimeout(_.bind(function() {
			this.ui.collapsibleContent.collapse('toggle');
		}, this), 10);
	},

	getCategoriesAutocompleteOptions: function() {
		var categories = this.options.items;
		return {
			data: categories,
			valueKey: 'displayText',
			apiKey: 'domainId',
			limit: 10,
			name: 'categories',
			callback: _.bind(function(name, model){
				this.tagsCollection.add(model);
			}, this)
		};
	},

	discardChanges: function() {
		this.tagsCollection.reset();
		this.updateFilters();
	},

	updateFilters: function() {
		this.toggleCollapsible();
		if (typeof this.options.updateFilters === 'function') {
			this.options.updateFilters(
				this.tagsCollection.createQueryParams(this.options.type));
		}
	}

});

module.exports = TagsView;
