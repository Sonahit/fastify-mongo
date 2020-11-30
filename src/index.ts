import Fastify from 'fastify';
import fmongo from 'fastify-mongodb';
import config from './plugins/config';
import db from './plugins/db';
import env from './plugins/env';
import logger from './plugins/logger';
import sequence from './plugins/sequence';
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
  .register(sequence)
  .register(db)
  .register(routes)
  .ready(() => fastify.log.info('Loaded plugins'));
fastify.listen(process.env.port || 3000, () =>
  fastify.log.info(`Started listening at http://127.0.0.1:${process.env.port || 3000}`),
);
