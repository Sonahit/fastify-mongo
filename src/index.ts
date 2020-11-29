import Fastify from 'fastify';
import fmongo from 'fastify-mongodb';
import config from './plugins/config';
import db from './plugins/db';
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

const { port = 3000 } = process.env;

fastify
  .register(logger)
  .register(config)
  .register(sequence)
  .register(routes)
  .register(fmongo, {
    url: 'mongodb://root:root@127.0.0.1:27017/',
  })
  .register(db)
  .then(() => fastify.log.info(`Connected to ${fastify.db.databaseName}`));
fastify.ready(() => fastify.log.info('Loaded plugins'));
fastify.listen(port, () => fastify.log.info(`Started listening at http://127.0.0.1:${port}`));
