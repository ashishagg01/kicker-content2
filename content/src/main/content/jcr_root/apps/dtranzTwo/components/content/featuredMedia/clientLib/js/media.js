CQ.CustomPathFieldWidget = CQ.Ext.extend(CQ.form.CompositeField,
				{
					hiddenField : null,
					FMvideo : null,
					FMimage : null,
					FMintro : null,
					FMtitle : null,
					FMcallToAction : null,
					FMcallToActionText : null,
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

						// Video
						this.FMvideo = new CQ.form.PathField(
								{
									cls : "customwidget-4",
									fieldLabel : "Video: ",
									fieldDescription : "Drop a Video from DAM or enter Video URL. Leave Blank to display an Image",
									allowBlank : true,
									rootPath : "/etc/designs/dtranzTwo/designs/clientBase/img/fpo",
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
						this.add(this.FMvideo);

						// Image
						this.FMimage = new CQ.form.PathField(
								{
									cls : "customwidget-4",
									fieldLabel : "Image: ",
									fieldDescription : "Drop an Image or select from DAM",
									allowBlank : false,
									rootPath : "/etc/designs/dtranzTwo/designs/clientBase/img/icons",
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
						this.add(this.FMimage);

						// Introduction

						this.FMintro = new CQ.Ext.form.TextField({
									cls : "customwidget-1",
									fieldLabel : "Intro: ",
									fieldDescription : "Enter Introduction for the Video",
									maxLength : 80,
									maxLengthText : "A maximum of 80 characters is allowed for the Intro Text.",
									allowBlank : false,
									listeners : {
										change : {
											scope : this,
											fn : this.updateHidden
										}
									}
								});
						this.add(this.FMintro);

						// Title

						this.FMtitle = new CQ.Ext.form.TextField({
									cls : "customwidget-2",
									fieldLabel : "Title: ",
									fieldDescription : "Enter Title for the Video",
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
						this.add(this.FMtitle);

						// callToAction

						this.FMcallToAction = new CQ.form.PathField({
																cls : "customwidget-4",
									fieldLabel : "callToAction: ",
									fieldDescription : "Select a resource or enter an external url",
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
						this.add(this.FMcallToAction);

						// Call To Action Text

						this.FMcallToActionText = new CQ.Ext.form.TextField({
									cls : "customwidget-3",
									fieldLabel : "description: ",
									fieldDescription : "Text to display on a Call to Action",
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
						this.add(this.FMcallToActionText);

					},

					processInit : function(path, record) {
						this.FMvideo.processInit(path, record);
						this.FMimage.processInit(path, record);
						this.FMintro.processInit(path, record);
						this.FMtitle.processInit(path, record);
						this.FMcallToAction.processInit(path, record);
						this.FMcallToActionText.processInit(path, record);

					},
					setValue : function(value) {
						var link = JSON.parse(value);
						this.FMvideo.setValue(link.FMvideo);
						this.FMimage.setValue(link.FMimage);
						this.FMintro.setValue(link.FMintro);
						this.FMtitle.setValue(link.FMtitle);
						this.FMcallToAction.setValue(link.FMcallToAction);
						this.FMcallToActionText
								.setValue(link.FMcallToActionText);
						this.hiddenField.setValue(value);
					},

					getValue : function() {
						return this.getRawValue();
					},

					getRawValue : function () {
								var link = {
							"FMvideo" : this.FMvideo.getValue(),
							"FMimage" : this.FMimage.getValue(),
							"FMintro" : this.FMintro.getValue(),
							"FMtitle" : this.FMtitle.getValue(),
							"FMcallToAction" : this.FMcallToAction.getValue(),
							"FMcallToActionText" : this.FMcallToActionText
									.getValue()
						};
						return JSON.stringify(link);
					},
					updateHidden : function() {
						this.hiddenField.setValue(this.getValue());
					}
				});
CQ.Ext.reg('customFieldFetureMedia', CQ.CustomPathFieldWidget);