var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task('styles', function() {
    gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('styleFiles', function() {
	return gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.min.css'
	])
	.pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function() {
	return browserify([
		'./js/app.module.js',
		'./js/controllers/main.controller.js',
		'./js/filters/all.filters.js'
	])
    .transform("babelify")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./dist/js/"));
});

gulp.task('concat', ['scripts'], function () {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/angular/angular.min.js',
		'dist/js/bundle.js'
	])
	.pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('iconFiles', function () {
	return gulp.src([
		'node_modules/bootstrap/fonts/*'
	])
	.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('build', ['styleFiles', 'concat', 'styles', 'iconFiles']);

//Watch task
gulp.task('default', ['styleFiles', 'concat', 'styles', 'iconFiles'], function() {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['concat']);
});