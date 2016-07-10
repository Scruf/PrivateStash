"use strict"
const gulp = require('gulp'),
	rename = require('gulp-rename'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	minify_css = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	mocha_phantom = require('gulp-mocha-phantomjs');

gulp.task('lint-client',()=>{
	return gulp.src('./client/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
});
gulp.task('lint-test',()=>{
	return gulp.src('/test/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
});
gulp.task('browserify-client',['lint-client'], ()=>{
	return gulp.src('client/index.js')
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(rename('car-finder.js'))
		.pipe(gulp.dest('build'))
		.pipe(gulp.dest('public/javascripts'));
})
gulp.task('browserify-test', ['lint-test'],()=>{
	return gulp.src('test/client/index.js')
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(rename('client-test.js'))
		.pipe(gulp.dest('build'))
})
gulp.task('watch',()=>{
	gulp.watch('client/**/*.js',['browserify-client'])
	gulp.watch('test/client/**/*.js',['browserify-test'])
})