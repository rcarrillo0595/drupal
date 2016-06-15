/**
 * @file
 * Theme tasks
 */
/* eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var glob = require('glob');

//
// Path settings
//
var themeDir = '.';

// This is needed because we're not using compass-options anymore.
var paths = {
  js: themeDir + '/js',
  sass: themeDir + '/sass',
  css: themeDir + '/css'
};

var Eyeglass = require("eyeglass").Eyeglass;

var sassOptions = {outputStyle: 'expanded'};

var eyeglass = new Eyeglass(sassOptions);
eyeglass.enableImportOnce = false;

//
// Begin Gulp Tasks
//

//
// SASS Task
//
gulp.task('styles', function () {
  'use strict';
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(sass(eyeglass.sassOptions()).on('error', sass.logError))
    .pipe(prefix(["last 1 version", "> 1%", "ie 8"]))
    .pipe(gulp.dest(paths.css));
});

//
// Watch
//
gulp.task('watch', function () {
  'use strict';
  gulp.watch(paths.sass + '/**/*.scss', ['styles']);
});

/**
 * Task for running browserSync.
 */
gulp.task('browserSync', function () {
  'use strict';
  browserSync.init(null, {
    proxy: 'itm1.local.dev',
    files: [
      paths.css,
      paths.js
    ]
  });
});

//
// Theme task declaration
//
gulp.task('theme', ['styles', 'watch', 'browserSync']);

