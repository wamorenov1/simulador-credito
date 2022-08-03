const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const babel = require('gulp-babel');
const production = false; 

gulp.task('views', () => {
    return gulp.src('./src/views/*.pug')
    .pipe(pug({ pretty: production ? false : true }))
    .pipe(gulp.dest('./public'))
})

gulp.task('styles', () => {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('webp', () => {
    return gulp.src('./src/images/*')
    .pipe(webp())
    .pipe(gulp.dest('./public/images'))
})

gulp.task('imageop', () => {
    return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/images'))
})

gulp.task('default', () => {
    gulp.watch('./src/views/**/*.pug', gulp.series('views'))
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles'))
})

