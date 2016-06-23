'use strict';

var PreeTagsCollection = Backbone.Collection.extend({
	//makes collections models unique
    add : function(truck) {
    	var isDuplicated = this.any(function(_truck) { 
	        return _truck.get('displayText') === truck.get('displayText');
	    });
	    return isDuplicated ? false : Backbone.Collection.prototype.add.call(this, truck);
	},

	createQueryParams: function (type) {
		var filters = this.toJSON(),
			names = _.pluck(filters, 'value'),
			tags = names.join(',').replace(/\s/g, ''),
			queryName = type === 'tags' ? 'tag' : 'cat',
			params = {};
		params[queryName] = tags;
		return params;
	}
});
    
module.exports = PreeTagsCollection;
