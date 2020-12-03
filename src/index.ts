import Fastify from 'fastify';
import { resolve } from 'path';
import config from './plugins/config';
import db from './plugins/db';
import env from './plugins/env';
import logger from './plugins/logger';
import routes from './routes';

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true,
      jsonPointers: true,
    },
    plugins: [require('ajv-errors')],
  },
});

fastify
  .register(env)
  .register(logger)
  .register(config)
  .register(db, {
    async: true,
    sync: true,
    modelsGlob: resolve('**/*.model.ts'),
    config: {
      dialect: 'pg',
      connection: () => ({
        host: '127.0.0.1',
        port: +fastify.env.DB_PORT,
        user: fastify.env.DB_USER || '',
        password: fastify.env.DB_PASS || '',
      }),
    },
  })
  .register(routes)
  .after((err: any) => {
    if (err) {
      throw err;
    }
  })
  .ready(() => fastify.log.info('Loaded plugins'));
fastify.listen(process.env.port || 3000, () =>
  fastify.log.info(`Started listening at http://127.0.0.1:${process.env.port || 3000}`),
);
