var config       = require('../config')
if(!config.tasks.css) return

var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../lib/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var path         = require('path');
var cssnano      = require('gulp-cssnano');
var combineMq    = require('gulp-combine-mq');
var replace      = require('gulp-replace')

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/main.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

var cssProdTask = function () {
  return gulp.src(paths.src)
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulpif(true, cssnano({autoprefixer: false})))
    .pipe(combineMq({
        beautify: false
    }))
    .pipe(gulp.dest(path.join(global.production ? config.root.dist : '', paths.dest)))
    .pipe(gulpif(!global.production, browserSync.stream()))
}

gulp.task('css-prod', cssProdTask);
module.exports = cssProdTask;
