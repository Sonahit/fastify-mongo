import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const config = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  fastify.decorate('config', {
    key: 'secret_key',
    db: 'test',
  });
  done();
};

export default fp(config, {
  name: 'config',
});
