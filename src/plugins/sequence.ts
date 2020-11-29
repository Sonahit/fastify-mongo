import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { CollectionSchemas, SequenceNames } from '../typings';

const sequence = (fastify: FastifyInstance, _: Record<string, any>, done: Function) => {
  fastify.decorate(
    'sequence',
    async (name: SequenceNames): Promise<number> => {
      const db = fastify.mongo.client.db('test');
      const seqCol = db.collection<CollectionSchemas['sequences']>('sequences');
      const sequence = await seqCol.findOne({ name });
      const seq = sequence ? sequence.seq + 1 : 0;
      sequence
        ? await seqCol.updateOne(
            {
              name,
            },
            {
              seq,
            },
          )
        : await seqCol.insertOne({
            name,
            seq,
          });
      return seq;
    },
  );
  done();
};

export default fp(sequence, {
  name: 'sequence',
});
