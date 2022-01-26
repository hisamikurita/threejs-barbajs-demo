const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');
const eslint = require('gulp-eslint');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const gulpData = require('gulp-data');
const fs = require('fs');
const concat = require('gulp-concat');
const webpackStream = require('webpack-stream');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

const pathRooting = {
  local: {
    pathPrefix: '',
    siteUrl: 'http://localhost:8080'
  },
  staging: {
    pathPrefix: '',
    siteUrl: ''
  },
  production: {
    pathPrefix: '',
    siteUrl: 'https://hisamikurita.github.io/threejs-barbajs-demo/dist'
  }
};

const srcPath = {
  html: './src/views',
  assets: './src/assets',
  css: './src/assets/css',
  js: './src/assets/js',
  svg: './src/assets/svg',
  images: './src/assets/images'
};

const distPath = {
  root: './dist',
  assets: './dist/assets',
  css: './dist/assets/css',
  js: './dist/assets/js',
  svg: './dist/assets/svg',
  images: './dist/assets/images'
};

const _pathRooting = pathRooting[process.env.TARGET_SERVER];

const gulpMode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: false
});

function taskHTML() {
  return gulp
    .src([`${srcPath.html}/**/*.pug`, `!${srcPath.html}/**/_*.pug`])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(gulpData(() => JSON.parse(fs.readFileSync('./src/variables.json'))))
    .pipe(
      pug({
        basedir: srcPath.html,
        locals: {
          // キャッシュされたルートパスを返す
          $cachedRoutePath: (path = '') => _pathRooting.pathPrefix + path + '?id=' + Date.now(),

          // ルートパスを返す
          $routePath: (path = '') => _pathRooting.pathPrefix + path,

          // フルパスを返す
          $fullPath: (path = '') => _pathRooting.siteUrl + _pathRooting.pathPrefix + path
        }
      })
    )
    .pipe(gulp.dest(distPath.root));
}

function taskCSS() {
  return gulp
    .src(['node_modules/ress/dist/ress.min.css', `${srcPath.css}/app.styl`])
    .pipe(gulpMode.development(sourcemaps.init()))
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(stylus({
      compress: true
    }))
    .pipe(concat('app.css'))
    .pipe(gulpMode.development(sourcemaps.write()))
    .pipe(gulp.dest(distPath.css));
}

function taskJS() {
  return gulp
    .src(`${srcPath.js}/**/*.js`)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(
      webpackStream({
        entry: [`${srcPath.js}/lib.js`, `${srcPath.js}/constants.js`, `${srcPath.js}/app.js`],
        output: {
          path: `${__dirname}/dist/asstes/js`,
          filename: 'app.js'
        },
        mode: process.env.NODE_ENV,
        module: {
          rules: [{
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ['raw-loader', 'glslify-loader']
          }, ]
        }
      })
    )
    .pipe(gulp.dest(distPath.js));
}

function taskImage() {
  return gulp
    .src(`${srcPath.images}/**/*.{png,jpg}`)
    .pipe(
      gulpMode.production(
        imagemin([
          pngquant({
            quality: [0.65, 0.8],
            speed: 1
          }),
          mozjpeg({
            quality: 65
          })
        ])
      )
    )
    .pipe(gulp.dest(distPath.images));
}

function taskWebp() {
  return gulp
    .src(`${srcPath.images}/**/*.{png,jpg}`)
    .pipe(gulpMode.production(webp({
      quality: 65
    })))
    .pipe(gulp.dest(distPath.images));
}

function taskSVG() {
  return gulp
    .src(`${srcPath.svg}/**/*.svg`)
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [{
            removeDimensions: true
          }]
        })
      ])
    )
    .pipe(gulp.dest(distPath.svg));
}

/*
gulp4において、gulp.watchが動かない問題があるので、browserSyncで監視している
https://github.com/gulpjs/vinyl/issues/105
https://github.com/gulpjs/gulp/issues/2193
*/
function taskWatch(done) {
  browserSync.init({
    server: distPath.root,
    files: [
      `${distPath.root}/**/*.html`,
      `${distPath.css}/**/*.css`,
      `${distPath.js}/**/*.js`,
      {
        match: [`${srcPath.html}/**/*.pug`],
        fn: function (event, file) {
          taskHTML();
          console.log('🛠 ' + event, file);
        }
      },
      {
        match: [`${srcPath.css}/**/*.styl`],
        fn: function (event, file) {
          taskCSS();
          console.log('🛠 ' + event, file);
        }
      },
      {
        match: [`${srcPath.js}/**/*.js`],
        fn: function (event, file) {
          taskJS();
          console.log('🛠 ' + event, file);
        }
      },
      {
        match: [`${srcPath.js}/**/*.vert`],
        fn: function (event, file) {
          taskJS();
          console.log('🛠 ' + event, file);
        }
      },
      {
        match: [`${srcPath.js}/**/*.frag`],
        fn: function (event, file) {
          taskJS();
          console.log('🛠 ' + event, file);
        }
      }
    ],
    port: 8080,
    open: true
  });

  done();
}

function taskClean() {
  return del([distPath.root]);
}

exports.default = gulp.series(taskClean, gulp.parallel(taskHTML, taskCSS, taskJS, taskImage, taskWebp, taskSVG), taskWatch);

exports.production = gulp.series(taskClean, gulp.parallel(taskHTML, taskCSS, taskJS, taskImage, taskWebp, taskSVG));