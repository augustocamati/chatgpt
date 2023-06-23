/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTable("chats", (table) => {
    table.increments("id")
    table.string("content").notNullable()
    table.string("role").notNullable()
    
    table
      .integer("user_id")
      .references("users.id")
      .notNullable()
      .onDelete("cascade")

    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.timestamp("updated_at").defaultTo(knex.fn.now())
  })

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable("chats")
