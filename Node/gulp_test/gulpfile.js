"use strict"
const gulp = require('gulp'),
	gulp_util = require('gulp-util'),
	gulp_sass = require('gulp-sass'),
	gulp_jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat');

gulp.task('default', ['watch']);
gulp.task('jshint', ()=>{
	return gulp.src('source/javcascript/**/*.js')
		.pipe(gulp_jshint())
		.pipe(gulp_jshint.reporter('jshint-stylish'));
});
gulp.task('build-css',()=>{
	return gulp.src('source/scss/**/*.scss')
			.pipe(sourcemaps.init())
				.pipe(sass())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('public/assets/stylesheets'));
});
gulp.task('build-js',()=>{
	return gulp.src('source/javcascript/**/*.js')
		.pipe(sourcemaps.init())
			 .pipe(concat('bundle.js'))
			 	.pipe(gulp_util.env.type === 'production' ? uglify() : gulp-util.noop())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('public/assets/javcascript/**/*.js'))
});
gulp.task('watch',()=>{
	gulp.watch('source/javcascript/**/*.js',['jshint','build-js']);
	gulp.watch('source/scss/**/*.scss',['build-css']);

});

