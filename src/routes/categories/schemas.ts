import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) =>
  fastify.addSchema({
    $id: 'category',
    required: ['name'],
    properties: {
      id: {
        type: 'number',
      },
      name: {
        type: 'string',
      },
    },
    errorMessage: {
      required: {
        name: 'Категории нужно имя',
      },
    },
  });
