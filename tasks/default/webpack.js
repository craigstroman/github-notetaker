import gulp from 'gulp';
import webpack from 'webpack-stream';
import errorHandler from '../error';

gulp.task('webpack', ['lint-js'], () => {
  const webpackConfig = require('../../webpack.config.js');

    return gulp.src('./src/js/app.js', {base: './src/js'})
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('./src/js'));
});
