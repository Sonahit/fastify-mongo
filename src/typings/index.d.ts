import Knex from 'knex';
import { Tables } from 'knex/types/tables';

import { Category, Token, User, Article } from '../database/models';

declare module 'knex' {
  export interface Tables {
    users: User;
    categories: Category;
    articles: Article;
    tokens: Token;
  }
}

declare module 'fastify' {
  export interface FastifyInstance {
    knex: Knex<Tables>;
    env: Record<string, string>;
    config: {
      key: string;
    };
  }
}
