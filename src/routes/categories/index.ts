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
        .get('/', {}, (req, rep) => {
          rep.send();
        })
        .get<{ Params: { id: string } }>('/:id', {}, (req, rep) => {
          const { id } = req.params;
          rep.send(id);
        });
      done();
    },
    { prefix: '/categories' },
  );
