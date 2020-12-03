import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('users')) return;

  return await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').primary();
    table.string('name').unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) return;
  return await knex.schema.dropTable('users');
}
