/**
* @class CQ.CustomPathFieldWidget
* @extends CQ.form.CompositeField
* This is a custom path field with link text and target
* @param {Object} config the config object
*/
/**
* @class Ejst.CustomWidget
* @extends CQ.form.CompositeField
* This is a custom widget based on {@link CQ.form.CompositeField}.
* @constructor
* Creates a new CustomWidget.
* @param {Object} config The config object
*/
CQ.CustomPathFieldWidget = CQ.Ext.extend(CQ.form.CompositeField, {
/**
* @private
* @type CQ.Ext.form.TextField
*/
hiddenField: null,
/**
* @private
* @type CQ.Ext.form.TextField
*/
linkText: null,
/**
* @private
* @type CQ.Ext.form.TextField
*/
linkURL: null,

/**
* @private
* @type CQ.Ext.form.TextField
*/
image: null,
/**
* @private
* @type CQ.Ext.form.CheckBox
*/
openInNewWindow: null,
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
//"columns":6
};
config = CQ.Util.applyDefaults(config, defaults);
CQ.CustomPathFieldWidget.superclass.constructor.call(this, config);
},
//overriding CQ.Ext.Component#initComponent
initComponent: function () {
CQ.CustomPathFieldWidget.superclass.initComponent.call(this);
// Hidden field
this.hiddenField = new CQ.Ext.form.Hidden({
name: this.name
});
this.add(this.hiddenField);


this.linkText = new CQ.Ext.form.TextField({
cls: "customwidget-1",
fieldLabel: "Link Text: ",
maxLength: 80,
maxLengthText: "A maximum of 80 characters is allowed for the Link Text.",
allowBlank: false,
listeners: {
change: {
scope: this,
fn: this.updateHidden
}
}
});
this.add(this.linkText);


this.linkURL = new CQ.form.PathField({
cls: "customwidget-2",
fieldLabel: "Link URL: ",
allowBlank: false,
width: 225,
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
this.add(this.linkURL);



this.image = new CQ.form.PathField({
cls: "customwidget-3",
fieldLabel: "Link Image: ",
allowBlank: false,
rootPath:"/etc/designs/dtranzTwo/designs",
width: 225,
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
this.add(this.image);

// Link openInNewWindow
this.openInNewWindow = new CQ.Ext.form.Checkbox({
cls: "customwidget-4",
boxLabel: "New window",
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
this.add(this.openInNewWindow);
},
processInit: function (path, record) {
this.linkText.processInit(path, record);
this.linkURL.processInit(path, record);
this.image.processInit(path, record);
this.openInNewWindow.processInit(path, record);
},
setValue: function (value) {
var link = JSON.parse(value);
this.linkText.setValue(link.text);
this.linkURL.setValue(link.url);
    this.image.setValue(link.image);
this.openInNewWindow.setValue(link.openInNewWindow);
this.hiddenField.setValue(value);
},
getValue: function () {
return this.getRawValue();
},
getRawValue: function () {
var link = {
"url": this.linkURL.getValue(),
"text": this.linkText.getValue(),
    "image": this.image.getValue(),
"openInNewWindow": this.openInNewWindow.getValue()
};
return JSON.stringify(link);
},
updateHidden: function () {
this.hiddenField.setValue(this.getValue());
}
});
CQ.Ext.reg('myImagepathfield', CQ.CustomPathFieldWidget);