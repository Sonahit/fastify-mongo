import { FastifyInstance } from 'fastify';

export type KnexSchema = (f: FastifyInstance) => Promise<void>;
