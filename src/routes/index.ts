import { FastifyInstance } from 'fastify';
import usersRoute from './users';
import catRoute from './categories';
import authRoute from './auth';
import fp from 'fastify-plugin';

export default fp(
  (fastify: FastifyInstance, _: any, done: Function) => {
    authRoute(fastify);
    usersRoute(fastify);
    catRoute(fastify);
    done();
  },
  {
    name: 'router',
    dependencies: ['db', 'config', 'env'],
  },
);
