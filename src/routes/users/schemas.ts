import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) =>
  fastify.addSchema({
    $id: 'user',
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
        name: 'Пользователю нужно имя',
      },
    },
  });
