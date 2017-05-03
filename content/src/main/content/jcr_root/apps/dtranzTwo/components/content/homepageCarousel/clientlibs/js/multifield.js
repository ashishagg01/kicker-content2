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
    image: null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    lightIntro: null,

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
     * @type CQ.form.PathField
     */

    previewThumbnail: null,
    /**
     * @private
     * @type CQ.Ext.form.TextField
     */

    previewTitle: null,

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

        // Image
        this.image = new CQ.form.PathField({
            cls: "customwidget-1",
            fieldLabel: "Image: ",
            fieldDescription: "Image in Carousel",
            allowBlank: false,
            rootPath : "/content/dam",
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

        // LightIntro
        this.lightIntro = new CQ.Ext.form.TextField({
            cls: "customwidget-2",
            fieldLabel: "Light Intro: ",
            fieldDescription: "Enter Introduction above the Title ",
            allowBlank: true,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.lightIntro);

        // MainTitle
        this.mainTitle = new CQ.Ext.form.TextField({
            cls: "customwidget-3",
            fieldLabel: "Main Title:",
            fieldDescription: "Enter Title",
            allowBlank: true,
            width: "200",
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
            fieldLabel: "Description: ",
            fieldDescription: "Enter Description",
            allowBlank: true,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.description);


        //CallToAction
        this.callToAction = new CQ.form.PathField({
            cls: "customwidget-5",
            fieldLabel: "Call to Action: ",
            fieldDescription: "Select Page",
            allowBlank: true,
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

        //CallToActionText
        this.callToActionText = new CQ.Ext.form.TextField({
            cls: "customwidget-6",
            fieldLabel: "Call to Action Text: ",
            fieldDescription: "Enter the Text on the CTA Eg: Learn More",
            allowBlank: true,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.callToActionText);

        //PreviewThumbnail
        this.previewThumbnail = new CQ.form.PathField({
            cls: "customwidget-7",
            fieldLabel: "Preview Thumbnail: ",
            fieldDescription: "Select a thumbnail for current slide",
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
        this.add(this.previewThumbnail);

        //PreviewTitle
        this.previewTitle = new CQ.Ext.form.TextField({
            cls: "customwidget-8",
            fieldLabel: "Preview Title: ",
            fieldDescription: "Enter title for the current slide",
            allowBlank: true,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.previewTitle);

    },

    processInit: function(path, record) {
        this.image.processInit(path, record);
        this.lightIntro.processInit(path, record);
        this.mainTitle.processInit(path, record);
        this.description.processInit(path, record);
        this.callToAction.processInit(path, record);
        this.callToActionText.processInit(path, record);
        this.previewThumbnail.processInit(path, record);
        this.previewTitle.processInit(path, record);
    },

    setValue: function(value) {
        var link = JSON.parse(value);
        this.image.setValue(link.image);
        this.lightIntro.setValue(link.lightIntro);
        this.mainTitle.setValue(link.mainTitle);
        this.description.setValue(link.description);
        this.callToAction.setValue(link.callToAction);
        this.callToActionText.setValue(link.callToActionText);
        this.previewThumbnail.setValue(link.previewThumbnail);
        this.previewTitle.setValue(link.previewTitle);
        this.hiddenField.setValue(value);
    },

    getValue: function() {
        return this.getRawValue();
    },

    getRawValue: function() {
        var link = {
            "image": this.image.getValue(),
            "lightIntro": this.lightIntro.getValue(),
            "mainTitle": this.mainTitle.getValue(),
            "description": this.description.getValue(),
            "callToAction": this.callToAction.getValue(),
            "callToActionText": this.callToActionText.getValue(),
            "previewThumbnail": this.previewThumbnail.getValue(),
            "previewTitle": this.previewTitle.getValue()
        };
        return JSON.stringify(link);
    },

    updateHidden: function() {
        this.hiddenField.setValue(this.getValue());
    }
});

CQ.Ext.reg('multifieldpanel', DtranzClientlib.CustomNavWidget);