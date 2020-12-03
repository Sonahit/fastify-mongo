import { FastifyInstance } from 'fastify';
import { Config, PgConnectionConfig } from 'knex';
import { Client } from 'pg';
import knex from 'knex';
import fp from 'fastify-plugin';

type TConfig = Omit<Config & { connection: PgConnectionConfig }, 'client'>;
let isConnected = false;
const db = async <T extends boolean>(
  fastify: FastifyInstance,
  options: {
    async: T;
    modelsGlob: string;
    sync: boolean;
    config: T extends true ? TConfig & { connection: Function } : TConfig;
  },
  done: Function,
) => {
  const opts = options.async
    ? { ...options.config, connection: (options.config.connection as Function)() }
    : options.config;
  fastify.decorate(
    'knex',
    knex({
      ...opts,
      client: 'pg',
      pool: {
        afterCreate: function (conn: Client, dn: Function) {
          if (!isConnected) {
            isConnected = true;
            fastify.log.info('Connected to db');
          }
          dn();
        },
      },
    }),
  );
};

export default fp(db, {
  name: 'db',
  dependencies: ['config', 'env'],
});
