import gulp from 'gulp';
import htmlReplace from 'gulp-html-replace';

gulp.task('update-html', ['minify-css'],  () => {
  gulp.src('./src/index.html', {base: './src'})
    .pipe(htmlReplace({
      'css': '/css/styles.min.css',
      'js': '/js/main.min.js',
    }))
    .pipe(gulp.dest('./dist/'));
});
