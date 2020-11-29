import { FastifyInstance } from 'fastify';
import usersRoute from './users';
import catRoute from './categories';
import authRoute from './auth';

export default (fastify: FastifyInstance, _: any, done: Function) => {
  authRoute(fastify);
  usersRoute(fastify);
  catRoute(fastify);
  done();
};
