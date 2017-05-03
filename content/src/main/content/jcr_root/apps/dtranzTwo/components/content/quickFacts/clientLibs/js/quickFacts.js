CQ.Ext.ns("DtranzClientlib");
DtranzClientlib.CustomNavWidget = CQ.Ext.extend(CQ.form.CompositeField, {

    /**
* @private
* @type CQ.Ext.form.TextField
*/
hiddenField: null,





/**
* @private
* @type CQ.Ext.form.TextField
*/
mainTitle: null,

/**
* @private
* @type CQ.Ext.form.TextField
*/
description: null,


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




// MainTitle
this.mainTitle = new CQ.Ext.form.TextField({
cls: "customwidget-3",
fieldLabel: "Fact Highlight",
fieldDescription: "Enter a Fact Highlight",
allowBlank: false,
listeners: {
change: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.mainTitle);


// Description
this.description = new CQ.Ext.form.TextField({
cls: "customwidget-4",
fieldLabel: "Fact description: ",
fieldDescription: "Enter a short description",
allowBlank: false,
listeners: {
change: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.description);



},

processInit: function (path, record) {
this.mainTitle.processInit(path, record);
this.description.processInit(path, record);

},

setValue: function (value) {
var link = JSON.parse(value);
this.mainTitle.setValue(link.mainTitle);
this.description.setValue(link.description);

this.hiddenField.setValue(value);
},

getValue: function () {
return this.getRawValue();
},

getRawValue: function () {
var link = {
"mainTitle": this.mainTitle.getValue(),
"description": this.description.getValue()

};
return JSON.stringify(link);
},

updateHidden: function () {
this.hiddenField.setValue(this.getValue());
}
});

CQ.Ext.reg('mypathfieldQuick', DtranzClientlib.CustomNavWidget);


