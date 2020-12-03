import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('categories')) return;
  return await knex.schema.createTable('categories', (table) => {
    table.bigIncrements('id').primary();
    table.string('name');
  });
}

export async function down(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('categories'))) return;
  return await knex.schema.dropTable('categories');
}
