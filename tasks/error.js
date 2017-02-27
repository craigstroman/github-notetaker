import gulp from 'gulp';
import util from 'gulp-util';
import plumber from 'gulp-plumber';

// Handle Gulp errors.
const errorHandler = () => {
   return function plumber(error) {
        // Output an error message
        util.log(util.colors.red('Error (' + error.plugin + '): ' + error.message));
        // emit the end event, to properly end the task
        this.emit('end');
    }
};

export default errorHandler;
