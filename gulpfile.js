// DEPENDENCIES
var gulp  = require('gulp'),
    gutil = require('gulp-util'),

    // SASS & CSS
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),

    // Errors
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),

    // SVG & PNG - Images
    svgo = require('gulp-svgo'),
    svg2png = require('gulp-svg2png'),
    svgSymbols = require('gulp-svg-symbols'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),

    rename = require('gulp-rename'),
    browserSync = require('browser-sync');


// TASKS

// Plumber Function for errors
function customPlumber() {
    return plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    });
}

// BrowserSync
gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "wp-starter.dev"
    });
});

// SASS Task
gulp.task('sass', function(){
    return gulp.src('dev/scss/style.scss')
    .pipe(customPlumber()) //custom error message from customPlumber function
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions', 'ie 8-9'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/wp-content/themes/sixheads/'))
    .pipe(browserSync.reload({
        stream: true
    }))
    .pipe(notify({ message: 'Sass task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('dev/img/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/wp-content/themes/sixheads/img/'))
    .pipe(notify({ message: 'Images task complete' }));
});

// SVG - optimise
gulp.task('svg', function () {
    gulp.src('dev/svg/*')
        .pipe(svgo())
        .pipe(gulp.dest('dist/wp-content/themes/sixheads/img/'))
        .pipe(notify({ message: 'SVG task complete' }));
});

// Create PNGs from SVG
gulp.task('makePng', function () {
    return gulp.src( 'dev/svg/**/*.svg' )
        .pipe( svg2png() )
        .pipe( gulp.dest( 'dist/wp-content/themes/sixheads/img/' ) )
});

// SVG Sprites
gulp.task('sprites', ['makePng'], function () {
    return gulp.src( 'dev/svg/**/*.svg' )
        .pipe(
            svgSymbols({
                className: '.icon--%f',
                title: false
            })
        )
        .pipe( gulp.dest( 'dist/wp-content/themes/sixheads/img/' ) )
});

// Javascript Tools


// WATCH task
gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('dev/scss/*.scss', ['sass']);
    gulp.watch('dist/wp-content/themes/sixheads/**').on('change', browserSync.reload);
});
