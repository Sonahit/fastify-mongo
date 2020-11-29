import { FastifyInstance } from 'fastify';
import { CollectionSchemas } from '../../typings';
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

            const db = fastify.mongo.client.db('test');
            const usersCollection = db.collection<CollectionSchemas['users']>('users');
            const user = await usersCollection.findOne({ name });

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
          const db = fastify.mongo.client.db('test');
          const tokenCol = db.collection<CollectionSchemas['tokens']>('tokens');
          const token = crypto.createHmac('sha256', fastify.config.key).update(name).digest('hex');

          await tokenCol.insertOne({
            token,
          });

          return token;
        },
      );
      done();
    },
    { prefix: '/auth' },
  );
