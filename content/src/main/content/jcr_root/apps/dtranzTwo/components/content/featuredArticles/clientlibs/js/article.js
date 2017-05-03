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
    Header: null,

    /**
     * @private
     * @type CQ.Ext.form.TextField
     */
    Title: null,


    /**
     * @private
     * @type CQ.form.PathField
     */
    Image: null,


    /**
     * @private
     * @type CQ.form.PathField
     */

    Article: null,
    /**
     * @private
     * @type CQ.Ext.form.Selection
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


        // Header
        this.Header = new CQ.Ext.form.TextField({
            cls: "customwidget-1",
            fieldLabel: "Header: ",
            fieldDescription: "Enter Header for the Article “eg: Green Teams ",
            allowBlank: true,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.Header);

        // Title
        this.Title = new CQ.Ext.form.TextField({
            cls: "customwidget-2",
            fieldLabel: "Title:",
            fieldDescription: "Enter Title for the Article",
            allowBlank: false,
            width: "200",
            listeners: {
                change: {
                    scope: this,
                    fn: this.updateHidden
                }
            }
        });
        this.add(this.Title);



        //Image
        this.Image = new CQ.form.PathField({
            cls: "customwidget-3",
            fieldLabel: "Image: ",
            fieldDescription: "Drop an Image or select from DAM",
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
        this.add(this.Image);

        //Article
        this.Article = new CQ.form.PathField({
            cls: "customwidget-4",
            fieldLabel: "Article: ",
            fieldDescription: "Select the page to Link to ",
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
        this.add(this.Article);

		//Color
		this.Color = new CQ.form.Selection({
            type:"select",
            cls:"customwidget-5",
            fieldLabel: "Color: ",
            fieldDescription: "Select Color ",
            allowBlank: false,
            options:displayOptionsTarget(),
            listeners: {
                selectionchanged: {
                    scope:this,
                    fn: this.updateHidden
                }
            },
            optionsProvider: this.optionsProvider
        });
        this.add(this.Color);


    },

    processInit: function(path, record) {
        this.Header.processInit(path, record);
        this.Title.processInit(path, record);
        this.Image.processInit(path, record);
        this.Article.processInit(path, record);
        this.Color.processInit(path, record);
    },

    setValue: function(value) {
        var link = JSON.parse(value);
        this.Header.setValue(link.Header);
        this.Title.setValue(link.Title);
        this.Image.setValue(link.Image);
        this.Article.setValue(link.Article);
        this.Color.setValue(link.Color);
        this.hiddenField.setValue(value);
    },

    getValue: function() {
        return this.getRawValue();
    },

    getRawValue: function() {
        var link = {
            "Header": this.Header.getValue(),
            "Title": this.Title.getValue(),
            "Image": this.Image.getValue(),
            "Article": this.Article.getValue(),
            "Color": this.Color.getValue()
        };
        return JSON.stringify(link);
    },

    updateHidden: function() {
        this.hiddenField.setValue(this.getValue());
    }
});

    function displayOptionsTarget()
        {
            return [ {
            'text': 'Blue',
            'value': 'blue'
            },{
            'text': 'Green',
            'value': 'green'
            }];
        }



CQ.Ext.reg('featuredArticleMultifield', DtranzClientlib.CustomNavWidget);