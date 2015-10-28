/**
 * BURP Template
 * https://github.com/acauamontiel/burp
 *
 * Copyright 2014 - 2015 Acaua Montiel (@acauamontiel)
 * Released under the MIT license (http://acaua.mit-license.org)
 */

'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import nib from 'nib';
import contentFile from './content.json';
import path from './gulpfile.paths.js';

const $ = gulpLoadPlugins();
const server = browserSync.create();
const reload = server.reload;

var dev = true;

gulp.task('html', () =>
	gulp.src(path.html.src)
		.pipe($.data(function (file) {
			return contentFile;
		}))
		.pipe($.jade({
			pretty: dev
		}))
		.pipe(gulp.dest(path.html.dest))
		.pipe($.size({title: 'html'}))
);

gulp.task('css', () =>
	gulp.src(path.css.src)
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
		.pipe($.size({title: 'css'}))
);

gulp.task('js', () =>
	gulp.src(path.js.src)
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
		.pipe(gulp.dest(path.js.dest))
);

gulp.task('img', () =>
	gulp.src(path.img.src)
		.pipe($.newer(path.img.dest))
		.pipe($.imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.img.dest))
		.pipe($.size({title: 'img'}))
);

gulp.task('copy', () => {
	const files = [
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

gulp.task('serve', () =>
	server.init({
		server: {
			baseDir: path.dest
		}
	})
);

gulp.task('watch', function () {
	gulp.watch(path.html.watch, ['html', reload]);
	gulp.watch(path.css.watch, ['css']);
	gulp.watch(path.js.watch, ['js', reload]);
	gulp.watch(path.img.watch, ['img', reload]);
});

gulp.task('default', ['build', 'serve', 'watch']);
gulp.task('build', ['html', 'css', 'js', 'copy']);
gulp.task('dist', () => {
	dev = false;
	gulp.start('build');
});
