import { FastifyInstance } from 'fastify';
import { User } from '../../database/models';
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
          async (req, rep) => {
            const {
              query: { id, name },
            } = req;

            const db = fastify.mongo.client.db('test');
            const usersCollection = db.collection<User>('users');
            const user = await usersCollection.findOne(id && name ? { id, name } : id ? { id } : name ? { name } : {});

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
          async (req, rep) => {
            const {
              params: { id },
            } = req;

            const db = fastify.mongo.client.db('test');
            const usersCollection = db.collection<User>('users');
            const user = await usersCollection.findOne({ id: +id });
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
            preHandler: async (req, rep) => {
              const {
                body: { name },
              } = req;

              const db = fastify.mongo.client.db('test');
              const usersCollection = db.collection<User>('users');
              const user = await usersCollection.findOne({ name });
              if (user) {
                rep.status(400).send(new httpErrors.BadRequest('Пользователь уже существует'));
              }
            },
          },
          async (req) => {
            const {
              body: { name },
            } = req;

            const db = fastify.mongo.client.db('test');
            const usersCollection = db.collection<User>('users');
            const user = {
              id: await fastify.sequence('userId'),
              name,
            };
            await usersCollection.insertOne(user);

            return user;
          },
        );
      done();
    },
    {
      prefix: '/users',
    },
  );
