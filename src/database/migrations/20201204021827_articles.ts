import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('articles')) return;
  return await knex.schema.createTable('articles', (table) => {
    table.bigIncrements('id').primary();
    table.string('name');
    table.string('description');
    table.integer('categoryId');
    table.foreign('categoryId').references('categories.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('articles'))) return;
  return await knex.schema
    .table('articles', (table) => table.dropForeign(['categoryId']))
    .then(() => knex.schema.dropTable('articles'));
}
