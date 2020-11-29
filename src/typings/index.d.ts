import { Collection, Db } from 'mongodb';
import { User, Sequence, Token, Category } from '../database/models/index';

export interface CollectionSchemas {
  categories: Category;
  sequences: Sequence;
  users: User;
  tokens: Token;
}

export type SequenceNames = 'userId';

declare module 'fastify' {
  export interface FastifyInstance {
    sequence: (name: SequenceNames) => Promise<number>;
    config: {
      key: string;
      db: string;
    };
    db: Db;
  }
}
