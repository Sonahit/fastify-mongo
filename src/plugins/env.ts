import { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import fp from 'fastify-plugin';

const env = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  dotenv.config();
  fastify.decorate('env', process.env);
  done();
};

export default fp(env, {
  name: 'env',
});
