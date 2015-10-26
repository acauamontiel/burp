var $ = require('gulp-load-plugins')(),
	browserSync = require('browser-sync').create(),
	gulp = require('gulp'),
	nib = require('nib'),
	contentFile = require('./content.json'),
	path = require('./gulpfile.paths.js'),
	dev = true;

gulp.task('html', function () {
	return gulp.src(path.html.src)
		.pipe($.data(function (file) {
			return contentFile;
		}))
		.pipe($.jade({
			pretty: dev
		}))
		.pipe(gulp.dest(path.html.dest))
		.pipe($.size({title: 'html'}));
});

gulp.task('css', function () {
	return gulp.src(path.css.src)
		.pipe($.stylus({
			use: [nib()],
			compress: !dev,
			linenos: dev,
			errors: true,
			sourcemap: {
				inline: dev,
				sourceRoot: '../',
				basePath: 'css'
			}
		}))
		.pipe(gulp.dest(path.css.dest))
		.pipe(browserSync.stream({match: '**/*.css'}))
		.pipe($.size({title: 'css'}));
});

gulp.task('js', function () {
	return gulp.src(path.js.src)
		.pipe($.sourcemaps.init())
		.pipe($.browserify({
			transform: [
				'babelify'
			]
		}))
		.pipe($.sourcemaps.write('.'))
		.pipe($.if(!dev, $.uglify({
			preserveComments: 'some'
		})))
		.pipe(gulp.dest(path.js.dest));
});

gulp.task('img', function () {
	return gulp.src(path.img.src)
		.pipe($.newer(path.img.dest))
		.pipe($.imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.img.dest))
		.pipe($.size({title: 'img'}));
});

gulp.task('copy', function () {
	var files = [
		path.src + '*',
		path.src + 'img/**/*.svg',
		path.src + 'font/**',
		path.src + 'dependencies/**',
		'!' + path.src + 'html',
		'!' + path.src + 'css',
		'!' + path.src + 'js'
	];

	return gulp.src(files, {
		base: path.src
	})
	.pipe(gulp.dest(path.dest))
	.pipe($.size({title: 'copy'}));
});

gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: path.dest
		}
	});
});

gulp.task('watch', function () {
	gulp.watch(path.html.watch, ['html', browserSync.reload]);
	gulp.watch(path.css.watch, ['css']);
	gulp.watch(path.js.watch, ['js', browserSync.reload]);
	gulp.watch(path.img.watch, ['img', browserSync.reload]);
});

gulp.task('default', ['build', 'serve', 'watch']);
gulp.task('build', ['html', 'css', 'js', 'img', 'copy']);
gulp.task('dist', function () {
	dev = false;
	gulp.start('build');
});
