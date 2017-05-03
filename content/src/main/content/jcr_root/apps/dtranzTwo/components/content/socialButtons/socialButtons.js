"use strict";
use(function() {
	var CONST = {
		SOCIAL_BUTTONS: "socialButton",
        STRING_JAVA_ARRAY: "[object JavaArray]",
        STRING_JAVA_OBJECT: "[object JavaObject]",

	}
	var shareButtonArrObj = [];
	var multisocialButtons = [];
	multisocialButtons = granite.resource.properties[CONST.SOCIAL_BUTTONS];
	if (multisocialButtons != null && Object.prototype.toString.call(multisocialButtons) == CONST.STRING_JAVA_ARRAY) {
		for (i in multisocialButtons) {
			shareButtonArrObj[i] = JSON.parse(multisocialButtons[i]);
		}
	} else if (multisocialButtons != null && Object.prototype.toString.call(multisocialButtons) == CONST.STRING_JAVA_OBJECT) {
		shareButtonArrObj[0] = JSON.parse(multisocialButtons);
	}

	return shareButtonArrObj;
});