CQ.CustomPathFieldWidget = CQ.Ext.extend(CQ.form.CompositeField,
				{

					hiddenField : null,
					intro : null,
					title : null,
					description : null,
					callToAction : null,
					formPanel : null,

					constructor : function(config) {
						config = config || {};
						var defaults = {
							"border" : true,
							"labelWidth" : 75,
							"layout" : "form"
						};
						config = CQ.Util.applyDefaults(config, defaults);
						CQ.CustomPathFieldWidget.superclass.constructor.call(
								this, config);
					},

					// overriding CQ.Ext.Component#initComponent
					initComponent : function() {
						CQ.CustomPathFieldWidget.superclass.initComponent
								.call(this);

						// Hidden field
						this.hiddenField = new CQ.Ext.form.Hidden({
							name : this.name
						});
						this.add(this.hiddenField);

						// Intro text

						this.intro = new CQ.Ext.form.TextField({
									cls : "customwidget-1",
									fieldLabel : "Intro: ",
									fieldDescription : "Enter a short Eg: For",
									maxLength : 80,
									maxLengthText : "A maximum of 80 characters is allowed for the Intro Text.",
									allowBlank : true,
									listeners : {
										change : {
											scope : this,
											fn : this.updateHidden
										}
									}
								});
						this.add(this.intro);

						// title text

						this.title = new CQ.Ext.form.TextField({
									cls : "customwidget-2",
									fieldLabel : "title: ",
									fieldDescription : "Title Eg: Patients",
									maxLength : 80,
									maxLengthText : "A maximum of 80 characters is allowed for the title Text.",
									allowBlank : true,
									listeners : {
										change : {
											scope : this,
											fn : this.updateHidden
										}
									}
								});
						this.add(this.title);

						// description text

						this.description = new CQ.Ext.form.TextField({
									cls : "customwidget-3",
									fieldLabel : "description: ",
									fieldDescription : "Enter a short description",
									maxLength : 80,
									maxLengthText : "A maximum of 80 characters is allowed for the description Text.",
									allowBlank : true,
									listeners : {
										change : {
											scope : this,
											fn : this.updateHidden
										}
									}
								});
						this.add(this.description);

						// callToAction

						this.callToAction = new CQ.form.PathField({
							cls : "customwidget-4",
							fieldLabel : "callToAction: ",
							fieldDescription : "Select content to display",
							allowBlank : true,
							width : 225,
							listeners : {
								change : {
									scope : this,
									fn : this.updateHidden
								},
								dialogclose : {
									scope : this,
									fn : this.updateHidden
								}
							}
						});
						this.add(this.callToAction);

					},

					processInit : function(path, record) {
						this.intro.processInit(path, record);
						this.title.processInit(path, record);
						this.description.processInit(path, record);
						this.callToAction.processInit(path, record);

					},
					setValue : function(value) {
						var link = JSON.parse(value);
						this.intro.setValue(link.intro);
						this.title.setValue(link.title);
						this.description.setValue(link.description);
						this.callToAction.setValue(link.callToAction);
						this.hiddenField.setValue(value);
					},

					getValue : function() {
						return this.getRawValue();
					},

					getRawValue : function() {
						var link = {
							"intro" : this.intro.getValue(),
							"title" : this.title.getValue(),
							"description" : this.description.getValue(),
							"callToAction" : this.callToAction.getValue()

						};
						return JSON.stringify(link);
					},
					updateHidden : function() {
						this.hiddenField.setValue(this.getValue());
					}
				});
CQ.Ext.reg('contentcalloutmultifiled', CQ.CustomPathFieldWidget);