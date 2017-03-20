import gulp from 'gulp';
import gutil from 'gulp-util';
import plumber from 'gulp-plumber';
import requireDir from 'require-dir';

// Pulling in all tasks from the tasks folder
requireDir('./tasks', { recurse: true });

// Define the build task.
gulp.task('build', ['minify-css', 'update-html']);
