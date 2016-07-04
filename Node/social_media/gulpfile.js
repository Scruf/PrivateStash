"use strict"
const gulp = require('gulp'),
	gulp_nodemon = require('gulp-nodemon'),
	gulp_watch =  require('gulp-watch'),
	gulp_concat = require('gulp-concat'),
	gulp_jshint = require('gulp-jshint'),
	gulp_livereload = require('gulp-livereload');

gulp.task('default',['watch','nodemon']);

gulp.task('nodemon',()=>{
	gulp_nodemon({
		server:'app.js',
		env:{
			'NODE_ENV':'development'
		}
	})
	.on('restart')
});
gulp.task('lint', ()=>{
	gulp.src(['app.js'])
		.pipe(gulp-jshint())
		.pipe(gulp.reporter('default'))
});

gulp.task('watch',()=>{
	gulp.watch('app.js', ['lint']);
});