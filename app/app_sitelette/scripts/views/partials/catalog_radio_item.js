/*global define*/

'use strict';

var template  = require('ejs!../../templates/partials/catalog-radio-item.ejs'),   //
    h = require('../../globalHelpers'), Vent = require('../../Vent');

var CatalogRadioItemView = Backbone.View.extend({
    tagName: 'li',
    className : 'cmntyex-catalog-item',

    template : template,
      
    events : {
        'click' : 'changeInBusketView'
    },

    changeInBusketView : function() {
        this.onClick();
    },

    initialize : function(options) {
        this.onClick = function() {
            options.onClick(this.model);
        }.bind(this);
        
        this.color = options.color;
        this.radio_group_name="";
        this.catalog_radio_item_name =null;//options.catalog-radio-item-name;
        this.catalog_radio_item_id = null;//options.catalog-radio-item-id; 
        this.catalog_radio_item_checked = null;//options.catalog-radio-item-checked;
       
    },

    render : function() {
       
        var tempModel=_.extend({}, this.model.attributes, {
            color: this.color,
            catalog_radio_item_name :'testName',
            catalog_radio_item_id :this.model.attributes.uUID,
            catalog_radio_item_label :this.model.attributes.itemName 
          });
        
        var htmlToAdd=this.template(tempModel);
        
        
        this.$el.append(htmlToAdd);
         
         
        return this;
    }
});

module.exports = CatalogRadioItemView;
