/**
 * Main application namespace
 * @namespace app
 */
var app = window.app || {};


/**
 * Main bind method
 * @memberof app
 */
app.bind = function () {
	'use strict';

	// Document ready
	document.onreadystatechange = function (e) {
		if (document.readyState === 'complete') {
			document.body.className = 'loaded';
		}
	};
};


/**
 * Main init method
 * @memberof app
 */
app.init = function () {
	'use strict';

	this.bind();
};


/**
 * Initializes the application
 */
app.init();
