CQ.Ext.ns("DtranzClientlib");
DtranzClientlib.SocialButtonWidget = CQ.Ext.extend(CQ.form.CompositeField, {

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
     * @type CQ.form.PathField
     */
    url: null,

    /**
     * @private
     * @type CQ.form.PathField
     */
    Color: null,

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
        DtranzClientlib.SocialButtonWidget.superclass.constructor.call(this, config);
    },

    //overriding CQ.Ext.Component#initComponent
    initComponent: function() {
        DtranzClientlib.SocialButtonWidget.superclass.initComponent.call(this);

        // Hidden field
        this.hiddenField = new CQ.Ext.form.Hidden({
            name: this.name
        });
        this.add(this.hiddenField);


        //url
        this.url = new CQ.form.PathField({
            cls: "customwidget-3",
            fieldLabel: "URL: ",
            fieldDescription: "Enter URL",
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
        this.add(this.url);



        //Radio selection
        this.imagetype = new CQ.form.Selection({
            type: "select",
            cls: "customwidget-5",
            fieldLabel: "Please Select Image Type: ",
            fieldDescription: "Select either image url or image css ",
            defaultValue : "Select Value",
            allowBlank: false,
            width: "200",
            options: displayOptionsTarget(),
            listeners: {
                selectionchanged: {

                    scope: this,
                    fn: this.toggle

                }

            },
            optionsProvider: this.optionsProvider
        });
        this.add(this.imagetype);



        // Image CSS
        this.imageCss = new CQ.Ext.form.TextField({
            cls: "customwidget-2",
            fieldLabel: "Image CSS:",
            fieldDescription: "Enter Image CSS",
            allowBlank: true,
            hidden: true,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.imageCss);

        // Image
        this.image = new CQ.form.PathField({
            cls: "customwidget-2",
            fieldLabel: "Image URL: ",
            fieldDescription: "Enter the image URL",
            allowBlank: true,
            hidden: true,
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


    },



    processInit: function(path, record) {
        this.image.processInit(path, record);
        this.url.processInit(path, record);
        this.imagetype.processInit(path, record);
        this.imageCss.processInit(path, record);

    },

    setValue: function(value) {
        var link = JSON.parse(value);
        this.image.setValue(link.image);
        this.url.setValue(link.url);
        this.imagetype.setValue(link.imagetype);
        this.imageCss.setValue(link.imageCss);
        this.hiddenField.setValue(value);
    },

    getValue: function() {
        return this.getRawValue();
    },

    getRawValue: function() {
        var link = {
            "image": this.image.getValue(),
            "url": this.url.getValue(),
            "imagetype": this.imagetype.getValue(),
            "imageCss": this.imageCss.getValue()
        };
        return JSON.stringify(link);
    },

    toggle: function() {

        var imageValue = this.imagetype.getValue();
        if (imageValue == 'imageurl') {
            this.imageCss.hide();
            this.imageCss.setValue("");
            this.image.show();
        }
        if (imageValue == 'imagecss') {
            this.image.hide();
            this.image.setValue("");
            this.imageCss.show();
        }
        fn: this.updateHidden

    },


        updateHidden: function() {
        this.hiddenField.setValue(this.getValue());

    }

});

function displayOptionsTarget() {
    return [{
        'text': 'Image URL',
        'value': 'imageurl'
    }, {
        'text': 'Image CSS',
        'value': 'imagecss'
    }];
}



CQ.Ext.reg('SocialButtonMultifield', DtranzClientlib.SocialButtonWidget);