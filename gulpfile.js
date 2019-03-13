var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var lessPath = ['./miniprogram/**/**/*.less']

gulp.task('less', function () {
  return gulp.src(lessPath)
    .pipe(plumber())
    .pipe(less())
    .pipe(rename(function (path) {
      path.extname = '.wxss';
    }))
    .pipe(gulp.dest('./miniprogram'));
});

// 静态服务器
gulp.task('default', function () {
  gulp.watch(lessPath, ['less']);
});