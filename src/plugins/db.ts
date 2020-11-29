import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const db = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  fastify.decorate('db', fastify.mongo.client.db(fastify.config.db));
  done();
};

export default fp(db, {
  name: 'db',
  dependencies: ['config', 'fastify-mongodb'],
});
