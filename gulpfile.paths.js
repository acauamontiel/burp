var path = {
	src: __dirname + '/src/',
	dest: __dirname + '/build/'
};

path.html = {
	watch: path.src + 'html/**/*.jade',
	src: path.src + 'html/*.jade',
	dest: path.dest
};

path.css = {
	watch: path.src + 'css/**/*.styl',
	src: path.src + 'css/style.styl',
	dest: path.dest + 'css/'
};

path.js = {
	watch: path.src + 'js/**/*.js',
	src: path.src + 'js/*.js',
	dest: path.dest + 'js/'
};

path.img = {
	watch: [
		path.src + 'img/**/*.jpg',
		path.src + 'img/**/*.png',
		path.src + 'img/**/*.gif'
	],
	src: [
		path.src + 'img/**/*.jpg',
		path.src + 'img/**/*.png',
		path.src + 'img/**/*.gif'
	],
	dest: path.dest + 'img/'
};

module.exports = path;
