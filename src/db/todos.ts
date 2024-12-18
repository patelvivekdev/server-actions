import { eq } from 'drizzle-orm';
import { db } from '.';
import { todos } from './schema';

export const getTodos = async (userId: string) => {
  const data = await db
    .select({
      id: todos.id,
      title: todos.title,
      isCompleted: todos.isCompleted,
    })
    .from(todos)
    .where(eq(todos.userId, userId));
  return data;
};
