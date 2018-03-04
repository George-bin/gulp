'use strict';

/*
*1、Less编译 压缩 合并
*2、Js合并 压缩 混淆
*3、img复制
*4、html压缩
*/

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');

var less = require('gulp-less');

var cssnano = require('gulp-cssnano');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');

var htmlmin = require('gulp-htmlmin')

var browserSync = require('browser-sync');

var reload = browserSync.reload;


// 1、Less编译 压缩（合并没必要，一般预处理CSS都可以打包）
gulp.task('style', function() {
	// 这里是在执行style任务时，自动执行
	gulp.src (['src/css/*less', '!src/css/_*.less'])
	    .pipe(less())
	    .pipe(cssnano())
	    .pipe(gulp.dest('dist/css/'))
	    .pipe(reload({
			stream: true
		}));
});

// 2、Js合并 压缩 混淆
gulp.task('script', function() {
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'))
	.pipe(reload({
		stream: true
	}));
});

// 3、img复制
gulp.task('img', function() {
	gulp.src('src/img/*.*')
	.pipe(gulp.dest('dist/img/'))
	.pipe(reload({
		stream: true
	}));
});


// 4、html压缩
gulp.task('html', function() {
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist/'))
	.pipe(reload({
		stream: true
	}));
});


// 自动化
gulp.task('serve', function() {
    browserSync({
		server: {
			baseDir: ['dist']
		},
		
	}, function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/css/*.less', ['style']);
	gulp.watch('src/js/*.js', ['script']);
	gulp.watch('src/img/*.js', ['img']);
	gulp.watch('src/*.html', ['html']);
	
})
