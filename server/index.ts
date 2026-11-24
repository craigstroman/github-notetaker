import 'reflect-metadata';
import { createConnection } from 'typeorm';
import path from 'path';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

const javascript = nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

const main = async () => {
  const nodeEnv = process.env.NODE_ENV;
  const locals = {
    javascript: nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js',
  };

  const app = express();

  app.set('trust proxy', 1);

  const conn = await createConnection({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [],
  });

  await conn.runMigrations();

  app.use(
    cors({
      origin: nodeEnv === 'production' ? ['https://lireddit.craigstroman.com'] : [`http://localhost:${port}`],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  app.use(routes);

  app.use('/static', express.static('public'));

  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'pug');

  app.locals = locals;

  app.locals.javascript = javascript;

  app.locals.title = 'GitHub Note Taker';
  app.locals.description = 'A note taker for GitHub';

  app.listen(port, () => {
    console.log(`Server started on localhost:${port}`);
  });
};

main().catch((error) => {
  console.error(error);
});
