import { FastifyInstance } from 'fastify';
import httpErrors from 'http-errors';
import crypto from 'crypto';

export default (fastify: FastifyInstance) =>
  fastify.register(
    (fastify, _, done) => {
      fastify.post<{ Body: { name: string } }>(
        '/',
        {
          schema: {
            body: {
              required: ['name'],
              properties: {
                name: {
                  type: 'string',
                },
              },
              errorMessage: {
                required: {
                  name: 'Требуется имя пользователя',
                },
              },
            },
            response: {
              '2xx': {
                type: 'string',
              },
            },
          },
          preHandler: async (req, rep) => {
            const { name } = req.body;

            const users = fastify.knex.from('users');
            const user = await users.where({ name }).first();

            if (!user) {
              rep.status(400);
              rep.send(new httpErrors.BadRequest('Такой пользователь не существует'));
            }
          },
        },
        async (req): Promise<string> => {
          const {
            body: { name },
          } = req;
          const users = fastify.knex.from('users');
          const tokens = fastify.knex.from('tokens');
          const token = crypto.createHmac('sha256', fastify.config.key).update(name).digest('hex');

          await tokens.insert({
            token,
          });

          return token;
        },
      );
      done();
    },
    { prefix: '/auth' },
  );
