import Fastify from 'fastify';
import fmongo from 'fastify-mongodb';
import config from './plugins/config';
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
  .ready(() => console.log('Loaded plugins'));

fastify.listen(port, () => console.log(`Started listening at http://127.0.0.1:${port}`));
