import { FastifyInstance } from 'fastify';
import fastifyMongodb from 'fastify-mongodb';
import fp from 'fastify-plugin';

const db = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  fastify
    .register(fastifyMongodb, {
      url: `mongodb://${fastify.env.DB_USER}:${fastify.env.DB_PASS}@127.0.0.1:27017/`,
    })
    .register(
      fp((fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
        fastify.decorate('db', {
          getter() {
            return fastify.mongo.client.db(fastify.config.db);
          },
        });
        done();
      }),
    );
  done();
};

export default fp(db, {
  name: 'db',
  dependencies: ['config', 'env'],
});
