import gulp from 'gulp';
import errorHandler from '../error';
import sass from 'gulp-sass';
import sourceMaps from 'gulp-sourcemaps';

gulp.task('build-css', () => {
    return gulp.src( './src/css/scss/**/*.scss' )
        .pipe( sass() )
        .on('error', errorHandler(sass))
        .on('success', function() {
            sourceMaps.init()
        })
        .pipe(sourceMaps.write('./src/css/'))
        .pipe( sourceMaps.init() )
        .pipe( gulp.dest('./src/css/', {overwrite: true}) );
});   