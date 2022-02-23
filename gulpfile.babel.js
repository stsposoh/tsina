'use strict';

import {src, dest, lastRun, watch, series, parallel} from 'gulp';
import stylus from 'gulp-stylus';
import nib from 'nib';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import newer from 'gulp-newer';
import notify from 'gulp-notify';
import cleanCss from 'gulp-clean-css';
import concat from 'gulp-concat';
import gulpIf from 'gulp-if';
import fileInclude from 'gulp-file-include';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import del from 'del';
import yargs from 'yargs';
import gcmq from 'gulp-group-css-media-queries';
import imagemin from 'gulp-imagemin';
import svgSprite from 'gulp-svg-sprite';

const PRODUCTION = yargs.argv.prod;
const server = browserSync.create();

export const assets = () => {
  return src(['app/assets/**/*.*', '!app/assets/img/**/*.*'], {since: lastRun('assets')})
    .pipe(newer('dist'))
    .pipe(dest('dist'));
};

export const fInclude = () => {
  return src('app/html/**/[^_]*.html')
    //.pipe(notify("Found in file: <%= file.relative %>!"))
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'fInclude',
        message: err.message
      }))
    }))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(debug({title: 'fInclude'}))
    .pipe(dest('dist'));
};

export const stylesLibs = () => {
  return src('app/styl/libs.styl')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Styles libs',
        message: err.message
      }))
    }))
    .pipe(stylus({
      use: [nib()],
      'include css': true
    }))
    .pipe(cleanCss({compatibility:'ie8'}))
    .pipe(dest('dist/css'))
};

export const styles = () => {
  return src('app/styl/bundle.styl')
    //.pipe(notify("Found in file: <%= file.relative %>!"))
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Styles',
        message: err.message
      }))
    }))
    .pipe(gulpIf(!PRODUCTION, sourcemaps.init()))
    .pipe(debug({title: 'src'}))
    .pipe(stylus({
      use: [nib()],
      'include css': true
    }))
    .pipe(debug({title: 'stylus'}))
    .pipe(gulpIf(PRODUCTION, cleanCss({compatibility:'ie8'})))
    .pipe(gulpIf(!PRODUCTION, sourcemaps.write()))
    .pipe(gulpIf(PRODUCTION, gcmq()))
    .pipe(dest('dist/css'))
    .pipe(server.stream());
};

export const libs = () => {
  return src([
    //all js libs include here
    //empty.js it heeds if you dont use any libs
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/slick-lightbox/dist/slick-lightbox.min.js',
    'node_modules/nouislider/distribute/nouislider.min.js',
    //'node_modules/detect-it/lib/index.js',
    'node_modules/event-propagation-path/propagationPath.js',
    'node_modules/es7-array.prototype.includes/index.js',
    'node_modules/inputmask/dist/jquery.inputmask.min.js',
    'node_modules/sumoselect/jquery.sumoselect.min.js',
    'node_modules/flatpickr/dist/flatpickr.min.js',
    'node_modules/flatpickr/dist/l10n/ru.js',
  ])
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Libs',
        message: err.message
      }))
    }))
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'));
};

export const js = () => {
  return src([
    'app/js/sliders.js',
    'app/js/menus.js',
    'app/js/modals.js',
    'app/js/forms.js',
    'app/js/filters.js',
    'app/js/order.js',
    'app/js/cart.js',
    'app/js/main.js',
    'app/js/compare.js',
  ])
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'JS',
        message: err.message
      }))
    }))
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
    .pipe(concat('bundle.js'))
    //.pipe(gulpIf(PRODUCTION, uglify()))
    .pipe(dest('dist/js'))
};

export const doSvgSprite = () => {
  return src('app/assets/svg-for-sprite/*.svg')
    .pipe(svgSprite({
        mode: {
          stack: {
            sprite: "../svg-sprite.svg"
          }
        },
      }
    ))
    .pipe(dest('app/assets/img/svg/'));
};

export const images = () => {
  return src('app/assets/img/**/*.{jpg,jpeg,png,svg,gif}')
    //.pipe(gulpIf(PRODUCTION, imagemin()))
    .pipe(dest('dist/img'));
};

export const serve = (done) => {
  server.init({
    server: 'dist',
    notify: false,
    online: true, //set true if you work without an internet
    tunnel: false //set true if you want locate you project in internet (for demonstration)
    //tunnel: 'projectName' It will locate on address http://projectName.localtunnel.me
  });
  done();
};

export const reload = (done) => {
  server.reload();
  done();
};

export const removedist = () => {
  return del('dist', {force: true});
};

export const watchForChanges = () => {
  watch('app/styl/**/*', styles);
  watch('app/js/**/*.js', series(js, reload));
  watch(['app/assets/**/*.*', '!app/assets/html/**/*.*', '!app/img/**/*.*'], series(assets, reload));
  watch('app/html/**/*.html', series(fInclude, reload));
  watch('app/assets/img/**/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
  watch('app/assets/svg-for-sprite/*.svg', doSvgSprite);
};

export const dev = series(removedist, parallel(doSvgSprite, stylesLibs, styles, libs, fInclude, assets, images, js), serve, watchForChanges);
export const build = series(removedist, parallel(doSvgSprite, stylesLibs, styles, libs, fInclude, assets, images, js));
export default dev;
