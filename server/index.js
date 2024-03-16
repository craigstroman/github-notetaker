const path = require('path');
const dotenv = require('dotenv');
const { sequelize } = require('./database.js');
const { app } = require('./app.js');

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '../.env') });

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

const ws = app;

sequelize
  .sync()
  .then(() => {
    console.log(`Databases loaded.`);

    ws.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });

    ws.on('error', onError);
    ws.on('listening', onListening);
  })
  .catch((err) => {
    console.log('There was errors: ');
    console.log(err);
  });

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
