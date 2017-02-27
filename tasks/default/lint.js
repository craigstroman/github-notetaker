import gulp from 'gulp';
import eslint from 'gulp-eslint';
import errorHandler from '../error';

gulp.task('lint-js', () => {
    return gulp.src( ['./src/js/app.js', '!./node_modules/**'] )
        .pipe( eslint() )
        .pipe( eslint.format() )
        .on('error', errorHandler(eslint))
        .pipe( eslint.failOnError() );
});
