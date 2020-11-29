import { Collection } from 'mongodb';
import { User, Sequence, Token } from '../database/models/index';

export interface CollectionSchemas {
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
    };
  }
}
