var gulp = require('gulp'),
	browserify = require('browserify'),
	transform = require('vinyl-transform'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync'),
	path = {},
	dev;

function setPaths () {
	path = {
		src: __dirname + '/src/',
		build: __dirname + '/build/',
		dist: __dirname + '/dist/'
	};

	path.dest = (dev) ? path.build : path.dist;

	path.js = {
		watch: path.src + 'js/**/*.js',
		src: path.src + 'js/**/app.js',
		dest: path.dest + 'js/'
	};

	path.css = {
		watch: path.src + 'css/**/*.styl',
		src: path.src + 'css/style.styl',
		dest: path.dest + 'css/'
	};

	path.html = {
		watch: path.src + 'html/**/*.jade',
		src: path.src + 'html/*.jade',
		dest: path.dest
	};

	path.img = {
		watch: path.src + 'img/**/*',
		src: path.src + 'img/**/*',
		dest: path.dest + 'img/'
	};
}

gulp.task('html', function () {
	gulp.src(path.html.src)
		.pipe(jade({
			pretty: dev
		}))
		.pipe(gulp.dest(path.html.dest));
});

gulp.task('css', function () {
	gulp.src(path.css.src)
		.pipe(stylus({
			use: [nib()],
			compress: (!dev),
			errors: true
		}))
		.pipe(gulp.dest(path.css.dest));
});

gulp.task('js', function () {
	if (dev) {
		return gulp.src(path.js.src)
			.pipe(jshint())
			.pipe(jshint.reporter(stylish))
			.pipe(transform(function(filename) {
				return browserify(filename).bundle();
			}))
			.pipe(gulp.dest(path.js.dest));
	} else {
		return gulp.src(path.js.src)
			.pipe(transform(function(filename) {
				return browserify(filename).bundle();
			}))
			.pipe(uglify())
			.pipe(gulp.dest(path.js.dest));
	}
});

gulp.task('img', function () {
	gulp.src(path.img.src)
		.pipe(imagemin())
		.pipe(gulp.dest(path.img.dest));
});

gulp.task('copy', function () {
	var files = [
		path.src + '*',
		path.src + 'img/**',
		path.src + 'font/**',
		path.src + 'dependencies/**',
		'!' + path.src + 'html',
		'!' + path.src + 'css',
		'!' + path.src + 'js'
	];

	gulp.src(files, {
		base: path.src
	})
	.pipe(gulp.dest(path.dest));
});

gulp.task('browser-sync', function () {
	browserSync.init([
		path.html.dest + '*.html',
		path.css.dest + '*.css',
		path.js.dest + '*.js',
		path.img.dest + '**/*'
	], {
		server: {
			baseDir: path.dest
		}
	});
});

gulp.task('watch', function () {
	gulp.watch([path.html.watch], ['html', browserSync.reload]);
	gulp.watch([path.css.watch], ['css', browserSync.reload]);
	gulp.watch([path.js.watch], ['js', browserSync.reload]);
	gulp.watch([path.img.watch], ['img', browserSync.reload]);
});

gulp.task('setBuild', function () {
	dev = true;
	setPaths();
});

gulp.task('setDist', function () {
	dev = false;
	setPaths();
});

gulp.task('run', ['html', 'css', 'js', 'img', 'copy']);
gulp.task('build', ['setBuild', 'run']);
gulp.task('dist', ['setDist', 'run']);
gulp.task('default', ['build', 'browser-sync', 'watch']);
