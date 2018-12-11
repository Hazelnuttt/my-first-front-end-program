var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    autoprefixer = require('gulp-autoprefixer');

//sass
gulp.task('sass', function(cb) {
  setTimeout(function(){
    sass('./public/styles/**/*.scss')
    .on('error',sass.logError)
    .pipe(gulp.dest('./public/styles'))
    cb();
  });

});
// Styles
gulp.task('styles',['sass'], function() {
  return gulp.src('./public/styles/**/*.css')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android>=4'))
    .pipe(gulp.dest('./public/dist/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/dist/styles'))
});
// Scripts
gulp.task('scripts', function() {
  return gulp.src('./public/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/js'))
});
// Images
gulp.task('images', function() {
  return gulp.src('./public/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true,multipass: true }))
    .pipe(gulp.dest('./public/dist/img'))
});
// Html
gulp.task('html',function(){
  return gulp.src('./public/**/*.html')
    .pipe(htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true,//压缩页面CSS
    }))
    .pipe(gulp.dest('./public/dist/html'))
});
// Default task
gulp.task('default', function() {
  gulp.start('styles', 'scripts','html','images');
});
// Watch
gulp.task('watch', function() {
  gulp.watch('./public/styles/**/*.scss', ['sass']);
});
 //connect
 gulp.task('serve',function(){
   connect.server({
     root: 'public',
     livereload: true
   });
   gulp.watch('./public/**/*.*',['reload']);
 });
 gulp.task('reload',function(){
   gulp.src('./public/hello.html')
    .pipe(connect.reload());
 });
