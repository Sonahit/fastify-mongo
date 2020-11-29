import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const sequence = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  fastify.decorate('config', {
    key: 'secret_key',
    db: 'test',
  });
  done();
};

export default fp(sequence, {
  name: 'config',
});
