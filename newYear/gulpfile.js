var gulp    = require('gulp');
var gutil    = require('gulp-util');
var uglify  = require('gulp-uglify');
var cssMin = require('gulp-css');
var htmlmin = require('gulp-html-minifier');

gulp.task('concat', function () {
    gulp.src('./year-end/hb/script/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./year-end/hb/script'));
});


gulp.task('cssMinfy', function(){
  return gulp.src('./year-end/hb/style/**/*.css')
    .pipe(cssMin())
    .pipe(gulp.dest('./year-end/hb/style'));
});

gulp.task('minify', function() {
  gulp.src('./year-end/hb/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./year-end/hb'))
});


gulp.task('default', ['cssMinfy','concat','minify']);