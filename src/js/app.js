import App from './app/index';

var app = new App();

app.init(function () {
	console.info('App started!');
	console.log(this);
});
