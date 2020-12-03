import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const config = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  fastify.decorate('config', {
    key: 'secret_key',
  });
  fastify.log.info('Loaded config');
  done();
};

export default fp(config, {
  name: 'config',
});
