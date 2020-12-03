import { FastifyInstance } from 'fastify';
import schemas from './schemas';
import httpErrors from 'http-errors';

export default (fastify: FastifyInstance) =>
  schemas(fastify).register(
    (fastify, _, done) => {
      fastify
        .get<{ Querystring: { id?: number; name?: string } }>(
          '/',
          {
            schema: {
              querystring: {
                properties: {
                  id: {
                    type: 'number',
                  },
                  name: {
                    type: 'string',
                  },
                },
              },
              response: {
                '2xx': {
                  $ref: 'user#',
                },
              },
            },
          },
          async function (req, rep) {
            const {
              query: { id, name },
            } = req;

            const users = this.knex.from('users');
            const user = await users.andWhere(id && name ? { id, name } : id ? { id } : name ? { name } : {}).first();

            if (user) {
              return user;
            } else {
              rep.status(400);
              rep.send(new httpErrors.BadRequest('Такой пользователь не существует'));
            }
          },
        )
        .get<{ Params: { id: string } }>(
          '/:id',
          {
            schema: {
              params: {
                required: ['id'],
                properties: {
                  id: {
                    type: 'string',
                  },
                },
              },
            },
          },
          async function (req, rep) {
            const {
              params: { id },
            } = req;

            const users = fastify.knex.from('users');
            const user = await users.where({ id: +id }).first();

            if (!user) {
              rep.code(400).send(new httpErrors.BadRequest('Пользователь не существует'));
            }

            rep.code(200).send(user);
          },
        )
        .post<{ Body: { name: string } }>(
          '/',
          {
            schema: {
              response: {
                '2xx': {
                  $ref: 'user#',
                },
              },
              body: {
                $ref: 'user#',
              },
            },
            preHandler: async function (req, rep) {
              const {
                body: { name },
              } = req;

              const users = fastify.knex.from('users');
              const user = await users.where({ name }).first();
              if (user) {
                rep.status(400).send(new httpErrors.BadRequest('Пользователь уже существует'));
              }
            },
          },
          async function (req) {
            const {
              body: { name },
            } = req;

            const user = (await this.knex('users').insert({ name }).returning(['id', 'name']))[0];

            return user;
          },
        );
      done();
    },
    {
      prefix: '/users',
    },
  );
