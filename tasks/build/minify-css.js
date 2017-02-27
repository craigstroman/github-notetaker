import cleanCSS from 'gulp-clean-css';
import gulp from 'gulp';
import rename from 'gulp-rename';

gulp.task('minify-css', () => {
  return gulp.src('./src/css/bootstrap.css')
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist/css/'));
});
