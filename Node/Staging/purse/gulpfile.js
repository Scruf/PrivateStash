"use strict"
const gulp = require('gulp'),
	gulp_nodemon = require('gulp-nodemon'),
	gulp_watch = require('gulp-watch'),
	gulp_concat = require('gulp-concat'),
	sourcemap = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	js_path=['app.js','./routes/**/*.js','./models/Project.js','./public/javascripts/**/*.js'];


gulp.task('default',['watch','nodemon']);

gulp.task('nodemon',()=>{
	gulp_nodemon({
		server:'app.js',
		env:{
			'NODE_ENV':'development'
		}
	})
	.on('restart');
});

//watching routes
gulp.task('lint',()=>{
	console.log('lining')
	gulp.src(js_path)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});
gulp.task('build-css',()=>{
	return gulp.src('./public/stylesheets/**/*.scss')
			.pipe(sourcemap.init())
				.pipe(sass())
			.pipe(sourcemap.write())
			.pipe(gulp.dest('./public/assets/stylesheets'));
});
gulp.task('watch',()=>{
	gulp.watch('./routes/**/*.js',['lint']);
	gulp.watch('./public/stylesheets/**/*.css',['build-css']);
});


