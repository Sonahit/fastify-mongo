import { FastifyInstance } from 'fastify';
import { CollectionSchemas } from '../../typings';
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
          const catColl = fastify.db.collection<CollectionSchemas['categories']>('categories');
          const cursor = catColl.find();
          const cats = await cursor.toArray();
          return cats;
        })
        .get<{ Params: { id: string } }>('/:id', {}, (req, rep) => {
          const { id } = req.params;
          rep.send(id);
        });
      done();
    },
    { prefix: '/categories' },
  );
