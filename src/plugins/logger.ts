import fastify, { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

const logger = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  fastify.addHook('onRoute', (route) => {
    fastify.log.info(`Registered route ${route.prefix} ${route.routePath}`);
  });
  done();
};

export default fp(logger, {
  name: 'logger',
});
