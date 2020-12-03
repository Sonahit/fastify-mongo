import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { padLeft } from '../utils/strings';

const logger = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  let minLength = 0;
  fastify.addHook('onRoute', (route) => {
    if (minLength < route.method.length) {
      minLength = route.method.length;
    }
    route.routePath &&
      fastify.log.info(
        `Registered route ${padLeft(route.method as string, minLength)} ${route.prefix} ${route.routePath}`,
      );
  });
  done();
};

export default fp(logger, {
  name: 'logger',
});
