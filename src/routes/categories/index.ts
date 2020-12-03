import { FastifyInstance } from 'fastify';

import schemas from './schemas';

export default (fastify: FastifyInstance) =>
  schemas(fastify).register(
    (fastify, _, done) => {
      fastify
        .post<{ Body: { name: string } }>(
          '/',
          {
            schema: {
              body: {
                $ref: 'category#',
              },
            },
          },
          (req, rep) => {
            const { name } = req.body;
            rep.send(name);
          },
        )
        .get('/', async (req, rep) => {
          const categories = await fastify.knex.from('categories').select();
          return categories;
        })
        .get<{ Params: { id: string } }>('/:id', {}, (req, rep) => {
          const { id } = req.params;
          rep.send(id);
        });
      done();
    },
    { prefix: '/categories' },
  );
