import { FastifyInstance } from 'fastify';
import { KnexSchema } from './KnexSchema';

export type KnexModule = {
  schema: KnexSchema;
};
