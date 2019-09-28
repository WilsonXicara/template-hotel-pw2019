var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Convert SCSS files to CSS

gulp.task('sass', ['combine-css'], function() {
    return gulp.src([
            'src/scss/*.scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Move JS Files to the src

gulp.task('js', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'src/js/jquery-migrate-3.0.1.min.js',
            'node_modules/poper.js/dist/popper.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'src/js/jquery.easing.1.3.js',
            'src/js/jquery.waypoints.min.js',
            'src/js/jquery.stellar.min.js',
            'src/js/owl.carousel.min.js',
            'src/js/jquery.magnific-popup.min.js',
            'src/js/aos.js',
            'src/js/jquery.animateNumber.min.js',
            'src/js/bootstrap-datepicker.js',
            'src/js/jquery.timepicker.min.js',
            'src/js/google-map.js',
            'src/js/main.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())     // Permite hacer la minificación de JavaScript
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

/**
 * Unir todos los archivos CSS en uno solo
 * Toma de https://stackoverflow.com/questions/37133297/combine-all-sass-files-into-a-single-file#answer-53011947
 */
gulp.task('combine-css', function() {
    // Toma todos los archivos SCSS y los combina en uno solo, en una carpeta temporal
    console.log('==> INICIANDO LA COMBINACIÓN DE ARCHIVOS SCSS');
    return gulp.src('./dist/css/*.css')               // Ruta de todos los archivos SCSS
        .pipe(concat('global-style.css'))  // Combinación en un solo archivo
        .pipe(gulp.dest('./temp/css'));    // Guardando en el directorio temporal
});

// Local server

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './dist'    // Directorio donde está el root de nuestro sitio
    });
});

gulp.watch(['src/scss/*.scss'], ['sass']);
gulp.watch(['src/js/*.js'], ['js']);
gulp.watch('dist/*.html').on('change', browserSync.reload);

// Start server on default task

gulp.task('default',['sass', 'js','serve']);