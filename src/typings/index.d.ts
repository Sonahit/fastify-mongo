import { Collection, Db } from 'mongodb';
import { Article } from '../database/models/Article';
import { User, Sequence, Token, Category } from '../database/models/index';

export interface CollectionSchemas {
  categories: Category;
  sequences: Sequence;
  users: User;
  tokens: Token;
  articles: Article;
}

export type SequenceNames = 'userId' | 'categoryId' | 'articleId';

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
