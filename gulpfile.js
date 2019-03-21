var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var pxtounits = require('postcss-px2units');  // 解决出错时停止后续执行
var sequence = require('gulp-sequence');  // 按顺序同步执行多个任务

var lessPath = ['./miniprogram/**/**/*.less','./miniprogram/**/*.less'];
var wxssPath = ['./miniprogram/**/**/*.wxss','./miniprogram/**/*.wxss'];

gulp.task('less', function () {
  return gulp.src(lessPath)
    .pipe(plumber())
    .pipe(less())
    .pipe(rename(function (path) {
      path.extname = '.wxss';
    }))
    .pipe(gulp.dest('./miniprogram'));
});

gulp.task('wxss', function () {
  return gulp.src(wxssPath)
    .pipe(postcss([pxtounits()]))
    .pipe(gulp.dest('./miniprogram'));
});

gulp.task('fix',function (cb) {
  sequence('less','wxss')(cb);
});

gulp.task('default', function () {
  gulp.watch(lessPath, ['fix']);
});
