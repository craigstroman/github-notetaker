import app from './app';
import config from 'config';
import debug from 'debug';
import { createServer } from 'http';
import models from './models/index';

require('dotenv').config();

/**
 * Get PORT from environment and store in Express.
 */
let port = 0;

if (process.env.NODE_ENV === 'development') {
  port = 3000;
} else if (process.env.NODE_ENV === 'production') {
  port = 49153;
}

app.set('port', port);

const ws = createServer(app);

models.sequelize.sync().then(() => {
  ws.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });

  ws.on('error', onError);
  ws.on('listening', onListening);
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = ws.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('MERNjs:app')('Listening on ' + bind + ' in ' + app.get('env') + ' env');
}
