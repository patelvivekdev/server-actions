import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  userId: text('user_id').notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('createdAt')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type selectTodo = typeof todos.$inferSelect;
export type insertTodo = typeof todos.$inferInsert;
