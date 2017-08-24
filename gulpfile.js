var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var autoprefix = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', ['imagemin', 'styles', 'js'], function() {
  gulp.watch('src/styles/*.css', function() {
    gulp.run('styles');
  });
  gulp.src(['src/partials/**/*']).pipe(gulp.dest('dist/partials/'));
  gulp.src(['src/*.js']).pipe(gulp.dest('dist/'));
  gulp.src(['src/*.html']).pipe(gulp.dest('dist/'));
});

gulp.task('imagemin', function() {
  var img_src = 'src/images/**/*',
    img_dest = 'dist/images';
  gulp.src(img_src)
    .pipe(imagemin())
    .pipe(gulp.dest(img_dest));
});

gulp.task('styles', function() {
  gulp.src(['src/styles/*.css'])
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/styles/'))
});

gulp.task('js', function() {
  gulp.src(['src/scripts/*.js'])
    .pipe(concat('script.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/scripts/'));
});