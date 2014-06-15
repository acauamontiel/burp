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
	this.bind();
};


/**
 * Initializes the application
 */
app.init();
