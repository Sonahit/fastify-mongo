import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import httpErrors from 'http-errors';
import fp from 'fastify-plugin';
import { parseToken } from '../utils/strings';

const auth = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  fastify.decorate('auth', (req: FastifyRequest, rep: FastifyReply) => {
    const token = parseToken(req.headers.authorization);
    if (!token) {
      const code = 401;
      rep.code(code);
      throw new httpErrors[code]('Not authorized');
    }
  });
  done();
};

export default fp(auth, {
  name: 'auth',
});
