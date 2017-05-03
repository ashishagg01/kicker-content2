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
    headline: null,

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


    constructor: function(config) {
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
    initComponent: function() {
        DtranzClientlib.CustomNavWidget.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name: this.name
        });
        this.add(this.hiddenField);


        // Headline
        this.headline = new CQ.Ext.form.TextField({
            cls: "customwidget-1",
            fieldLabel: "Headline: ",
            fieldDescription: "Headline for Content",
            allowBlank: false,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.headline);


        //Call to Action
        this.callToAction = new CQ.form.PathField({
            cls: "customwidget-3",
            fieldLabel: "Call to Action:",
            fieldDescription: "Select Page to Link",
            allowBlank: false,
            width: "200",
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


        // Call to Action Text
        this.callToActionText = new CQ.Ext.form.TextField({
            cls: "customwidget-2",
            fieldLabel: "Call to Action Text:",
            fieldDescription: "eg. Learn More",
            allowBlank: false,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.callToActionText);


    },

    processInit: function(path, record) {
        this.headline.processInit(path, record);
        this.callToAction.processInit(path, record);
        this.callToActionText.processInit(path, record);
    },

    setValue: function(value) {
        var link = JSON.parse(value);
        this.headline.setValue(link.headline);
        this.callToAction.setValue(link.callToAction);
        this.callToActionText.setValue(link.callToActionText);
        this.hiddenField.setValue(value);
    },

    getValue: function() {
        return this.getRawValue();
    },

    getRawValue: function() {
        var link = {
            "headline": this.headline.getValue(),
            "callToAction": this.callToAction.getValue(),
            "callToActionText": this.callToActionText.getValue()
        };
        return JSON.stringify(link);
    },

    updateHidden: function() {
        this.hiddenField.setValue(this.getValue());
    }
});


CQ.Ext.reg('tickerMultifield', DtranzClientlib.CustomNavWidget);