/*global define*/

'use strict';
var CatalogBasketModel = require('../models/CatalogBasketModel'); //

var RosterBasketModel = Backbone.Model.extend({

  // model : CatalogBasketModel,

  initialize: function(options) {
    /*
    * options must be null, otherwise, it will try to add items in the
    * collection from option
    */
    this.prices = new Backbone.Model();
    //this.collection={};
    this.catalogs = new Backbone.Collection();
  },



  rosterId: null,

  rosterDisplayText: null,

  /*
  * we save the uUID also, so that we can scan by groupId and find the uUID
  * maybe we can just use the 'id'?
  */
  uUID: null,
  rosterType: null,

  //    add : function(n) {
  //        var curr = this.get('quantity');
  //        this.set('quantity', curr + (n || 1));
  //    },

  /* catalog uuid */
  idAttribute: 'uUID',

  setRosterDetails: function(rosterDetails) {
    this.idAttribute = rosterDetails.rosterUUID;
    this.rosterId = rosterDetails.rosterUUID;
    this.rosterDisplayText = rosterDetails.rosterDisplayText;
    this.rosterType = rosterDetails.rosterType;
  },




  addCatalog: function(catalog, count, catalogId, catalogDisplayText) {
    // console.log("BasketModel:addItem::"+item.get('itemName')+",
    // "+groupId+", "+catalogId);
    //var xxx=
    //this.catalogs.add(catalog);
    //his.catalogs.remove(catalogId);


    var catalogModel = this.catalogs.get(catalog.catalogId);
    if (catalogModel) {
      var quantity = catalogModel.get('quantity');
      quantity = quantity + count;
      catalogModel.set('quantity', quantity);
    } else {
      /*
      * create item options, pass groupId, catalogId
      */
      var catalogDetails = _.extend({}, {
        catalogUUID: catalog.catalogId,
        catalogDisplayText: catalog.displayText,
        catalogType: catalog.catalogType.enumText,
        quantity: count || 1,
        price: catalog.price,
        catalog: catalog,
        itemName: "",
        itemType: 'COMBO'
      });

      /*
      * create basketItem model
      * REMEMBER: This is a collection, so no arguments. set them later.
      */

      var catalogModel = new CatalogBasketModel();
      catalogModel.setCatalogDetails(catalogDetails);
      catalogModel.groups = catalog.groups;

      /*
      * add the itemModel to the collection
      */
      this.catalogs.add(catalogModel);
    }
    this.dumpCartToConsole();
    this.trigger('change');
  },

  //removeCatalog: function(catalog) {
  //    this.remove(catalogs.get(catalog.catalogId));
  //},

  getNumOf: function(catalog) {
    var model = this.get(catalog.get('uUID'));
    if (model) {
      return model.quantity;
    } else {
      return 0;
    }
  },


  count: function() {
    /* we return the sum of combos and ala-la-care items */
    var comboCount = this.getComboCount();
    var nonComboCount = this.getNonComboItemCount();
    return comboCount + nonComboCount;
  },
  reset: function() {

  },
  getItems: function(sasl) {
    var orderItems = [];
    var intraOrderAssociationIndex=0;

    this.catalogs.each(function(catalog, tt, ee) {
      intraOrderAssociationIndex++;
      if (typeof catalog.quantity === 'undefined') {
        /* COMBO orders, just get the catalog price */
        //totalPrice=totalPrice+(catalog.get('price')*catalog.get('quantity')) ;
        var catalogId = catalog.id;
        _(catalog.get('groups')).each(function(group, indexd, listd) {
          var groupId = group.groupId;
          _(group.unSubgroupedItems).each(function(item, index, list) {
            var orderItem = {
              serviceAccommodatorId: sasl.sa(),
              serviceLocationId: sasl.sl(),
              priceId: item.priceId,
              itemId: item.itemId,
              groupId: groupId,
              catalogId: catalogId,
              itemVersion: item.itemVersion,
              quantity: catalog.get('quantity'), //item.quantity,
              intraOrderAssociationTag:catalogId+intraOrderAssociationIndex
            };
            orderItems.push(orderItem);
            //console.log('orderItems : '+_(orderItems).size());
          });
        });
      } else {
        console.log("From " + catalog.catalogId + ", type:" + catalog.catalogType);
        /* A la carte (ITEMZIED) catalog items. NOTE: model = item */
        _(catalog.models).each(function(item, index, list) {
          var orderItem = {
            serviceAccommodatorId: sasl.sa(),
            serviceLocationId: sasl.sl(),
            priceId: item.get('priceId'),
            itemId: item.get('itemId'),
            groupId: item.get('groupId'),
            catalogId: item.get('catalogId'),
            itemVersion: item.get('itemVersion'),
            quantity: item.get('quantity'),
            intraOrderAssociationTag:item.get('catalogId')+intraOrderAssociationIndex
          };
          orderItems.push(orderItem);
          //console.log('orderItems : '+_(orderItems).size());
        });
      }
    });
    //console.log('FINAL: orderItems : '+_(orderItems).size());
    return orderItems;
  },


  dumpCartToConsole: function() {
    console.log("************----- current RosterBasketModel --------");
    this.catalogs.each(function(catalog, index, list) {
      if (typeof catalog.catalogType !== 'undefined') { //catalog.get('catalogType')==='COMBO'){
        catalog.dumpCartToConsole();
      } else {
        var quantity = catalog.get('quantity');
        var catalogName = catalog.get('catalogDisplayText');
        var catalogId = catalog.get('catalogId');
        console.log("*** Combo " + catalogName + ":[" + quantity + "] @ " + catalog.get('price'));
      }
    });
    console.log("*************---------------------------");
  },


  removeItem: function(item) {
    console.log("removeItem:" + item);
    switch(item.get('rosterEntryType')){
      case 'ITEMIZED':
      /* find the catalog */
      _(this.catalogs.models).each(function(catalog,ii,ll){
        if(catalog.id===item.get('catalogId')){
          /* this is a catalogbasketmodel, so we can remove the model from it. */
          catalog.remove(item.get('uUID'));
          catalog.dumpCartToConsole();
        }
      });
      this.trigger('change');
      break;

      case 'COMBO':
      /* find the index in the models */
      var indexToRemove = -1;
      var index=0;
      var catalogIdToRemove =  item.get('catalogId');
      _(this.catalogs.models).each(function(catalog,ii,ll){

        if(catalog.id===catalogIdToRemove){
          indexToRemove=index;
        }else{

        }
        index++;
      });
      if(indexToRemove!==-1){
        this.catalogs.models.splice(indexToRemove,1);
      }else{
        console.log("didn't find catalog ");
      }
      this.dumpCartToConsole();
      this.trigger('change');
      break;

    }
  },

  removeAllItems: function() {
    this.catalogs.reset();
  },

  isComboGroupRepresented: function(groupId) {

    var itemId;
    this.each(function(item, index, list) {
      if (item.itemType === 'COMBO') {
        if (item.groupId === groupId) {
          itemId = item.id;
        }
      }
    });
    return itemId;
  },

  hasCombo: function() {
    var comboCount = _(this.getComboCatalogs()).size();
    if (comboCount > 0) {
      return true;
    } else {
      return false;
    }
    // var hasCombo = false;
    // this.each(function(item, index, list) {
    // if (hasCombo === false && item.itemType === 'COMBO') {
    // hasCombo = true;
    // }
    // ;
    // });
    // return hasCombo;
  },

  getComboCatalogs: function() {
    var comboCatalogsArray = {};
    this.catalogs.each(function(item, index, list) {
      if (item.itemType === 'COMBO') {
        if (!_(comboCatalogsArray).has(item.catalogId)) {
          comboCatalogsArray[item.catalogId] = {
            catalogDisplayText: item.catalogDisplayText,
            price: item.get('price')
          };
        } else {
          /* update the price */
          var tmpObj = comboCatalogsArray[item.catalogId];
          var tmpPrice = tmpObj.price;
          var newPrice = tmpPrice + item.get('price');
          tmpObj.price = newPrice;
          comboCatalogsArray[item.catalogId] = tmpObj;
        }
      };
    });
    return comboCatalogsArray;
  },

  /* TODO */
  getComboPrice: function() {
    var comboPrice = 0;
    this.each(function(item, index, list) {
      if (item.itemType === 'COMBO') {
        comboPrice = comboPrice + item.get('price');
      };
    });
    return comboPrice;
  },

  getTotalPrice: function() {
    var totalPrice = 0;

    this.catalogs.each(function(catalog, index, list) {
      if (typeof catalog.quantity !== 'undefined') {
        /* A la carte (ITEMZIED) catalog items */
        _(catalog.models).each(function(model, index, list) {
          console.log(model.itemName + " : " + model.get('quantity') + ' at $ ' + model.get('price'));
          totalPrice = totalPrice + (model.get('quantity') * model.get('price'));
        });
      } else {
        /* COMBO orders, just get the catalog price */
        totalPrice = totalPrice + (catalog.get('price') * catalog.get('quantity'));
      }
    });
    return totalPrice;
  },

  getComboCount: function() {
    var count = 0;
    this.catalogs.each(function(catalog, index, list) {
      if (typeof catalog.quantity !== 'undefined') {
        if (catalog.catalogType === 'COMBO') {
          /* these are combo groups coming via the catalogMenu,
          so we add an entire catalog for every entry and count
          the number of entries. */
          count = count + 1;
        }
      } else {
        if (catalog.get('catalogType') === 'COMBO') {
          count = count + catalog.get('quantity');
        }
      }
    });
    return count;
  },

  getNonComboItemCount: function() {
    var count = 0;
    this.catalogs.each(function(catalog, index, list) {
      var ctype = catalog.get('catalogType');
      var ctype2 = catalog.catalogType;


      if (catalog.catalogType === 'UNDEFINED' || catalog.catalogType==='ITEMIZED') {
        catalog.each(function(item, index, list) {
          count = count + item.get('quantity');
          console.log(catalog.id+' item: '+item.itemName+" quantity["+item.get('quantity')+"]");
        });
      } else {

      }
    });

    return count;
  }

});

module.exports = RosterBasketModel;
