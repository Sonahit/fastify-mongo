import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable('tokens')) return;
  return await knex.schema.createTable('tokens', (table) => {
    table.bigIncrements('id').primary();
    table.string('token').unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('tokens'))) return;
  return await knex.schema.dropTable('tokens');
}
