CQ.Ext.ns("DtranzClientlib");
DtranzClientlib.CustomNavWidget = CQ.Ext.extend(CQ.form.CompositeField, {

    /**
* @private
* @type CQ.Ext.form.TextField
*/
hiddenField: null,
 
/**
* @private
* @type CQ.form.PathField
*/
menuItem: null,
 
/**
* @private
* @type CQ.Ext.form.Checkbox
*/
flyout: null,

/**
* @private
* @type CQ.Ext.form.TextField
*/
overviewLinkText: null,
 
/**
* @private
* @type CQ.form.PathField
*/
featuredProductImage: null,

/**
* @private
* @type CQ.Ext.form.TextField
*/
featuredAreaTitle: null,

/**
* @private
* @type CQ.Ext.form.TextArea
*/
featuredAreaDescription: null,

/**
* @private
* @type CQ.form.PathField
*/
callToAction: null,

/**
* @private
* @type CQ.Ext.form.TextField
*/
callToActionText: null,

/**
* @private
* @type CQ.Ext.form.FormPanel
*/
formPanel: null,
 
constructor: function (config) {
config = config || {};
var defaults = {
"border": true,
"labelWidth": 75,
"layout": "form"

};
config = CQ.Util.applyDefaults(config, defaults);
DtranzClientlib.CustomNavWidget.superclass.constructor.call(this, config);
},
 
//overriding CQ.Ext.Component#initComponent
initComponent: function () {
DtranzClientlib.CustomNavWidget.superclass.initComponent.call(this);
 
// Hidden field
this.hiddenField = new CQ.Ext.form.Hidden({
name: this.name
});
this.add(this.hiddenField);
 
// Menu Item
this.menuItem = new CQ.form.PathField({
cls: "customwidget-1",
fieldLabel: "Menu Item: ",
fieldDescription: "Select the page to be linked from the primary menu",
allowBlank: false,
listeners: {
change: {
scope: this,
fn: this.updateHidden
},
dialogclose: {
scope: this,
fn: this.updateHidden
}

}
});
this.add(this.menuItem);
 
// Flyout
this.flyout = new CQ.Ext.form.Checkbox({
cls: "customwidget-2",
fieldLabel: "Flyout: ",
fieldDescription: "Click to generate a flyout with child links",
listeners: {
change: {
scope: this,
fn: this.updateHidden
},
check: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.flyout);

// Overview Link Text
this.overviewLinkText = new CQ.Ext.form.TextField({
cls: "customwidget-3",
fieldLabel: "Overview Link Text:",
fieldDescription: "Enter the overview text",
allowBlank: false,
listeners: {
change: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.overviewLinkText);


// Featured Product Image
this.featuredProductImage = new CQ.form.PathField({
cls: "customwidget-4",
fieldLabel: "Featured Product Image: ",
fieldDescription: "Select Feature Product Image",
allowBlank: true,
listeners: {
change: {
scope: this,
fn: this.updateHidden
},
dialogclose: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.featuredProductImage);


//Featured Area Title
this.featuredAreaTitle = new CQ.Ext.form.TextField({
cls: "customwidget-5",
fieldLabel: "Featured Area Title: ",
allowBlank: true,
listeners: {
change: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.featuredAreaTitle);

//Featured Area Description
this.featuredAreaDescription = new CQ.Ext.form.TextArea({
cls: "customwidget-6",
fieldLabel: "Featured Area Description: ",
fieldDescription: "Enter a short description",
allowBlank: true,
width      : 200,
bodyPadding: 10,
listeners: {
change: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.featuredAreaDescription);

//Call to Action
this.callToAction = new CQ.form.PathField({
cls: "customwidget-7",
fieldLabel: "Call to Action: ",
fieldDescription: "Enter url of the page or external link",
allowBlank: true,
listeners: {
change: {
scope: this,
fn: this.updateHidden
},
dialogclose: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.callToAction);

//Call to Action Text
this.callToActionText = new CQ.Ext.form.TextField({
cls: "customwidget-8",
fieldLabel: "Call to Action Text: ",
allowBlank: true,
listeners: {
change: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.callToActionText);

},

processInit: function (path, record) {
this.menuItem.processInit(path, record);
this.flyout.processInit(path, record);
this.overviewLinkText.processInit(path, record);
this.featuredProductImage.processInit(path, record);
this.featuredAreaTitle.processInit(path, record);
this.featuredAreaDescription.processInit(path, record);
this.callToAction.processInit(path, record);
this.callToActionText.processInit(path, record);
},

setValue: function (value) {
var link = JSON.parse(value);
this.menuItem.setValue(link.menuItem);
this.flyout.setValue(link.flyout);
this.overviewLinkText.setValue(link.overviewLinkText);
this.featuredProductImage.setValue(link.featuredProductImage);
this.featuredAreaTitle.setValue(link.featuredAreaTitle);
this.featuredAreaDescription.setValue(link.featuredAreaDescription);
this.callToAction.setValue(link.callToAction);
this.callToActionText.setValue(link.callToActionText);
this.hiddenField.setValue(value);
},

getValue: function () {
return this.getRawValue();
},

getRawValue: function () {
var link = {
"flyout": this.flyout.getValue(),
"menuItem": this.menuItem.getValue(),
"overviewLinkText": this.overviewLinkText.getValue(),
"featuredProductImage": this.featuredProductImage.getValue(),
"featuredAreaTitle": this.featuredAreaTitle.getValue(),
"featuredAreaDescription": this.featuredAreaDescription.getValue(),
"callToAction": this.callToAction.getValue(),
"callToActionText": this.callToActionText.getValue()
};
return JSON.stringify(link);
},

updateHidden: function () {
this.hiddenField.setValue(this.getValue());
}
});

CQ.Ext.reg('mynavpath', DtranzClientlib.CustomNavWidget);
