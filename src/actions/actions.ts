'use server';
import { db } from '@/db';
import { todos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';

// =============================== addTodo ===============================
const addTodoSchema = z.object({
  title: z.string().min(3, { message: 'Must be 3 or more characters long' }),
});

export async function addTodo(email: string, uuid: string, prevState: any, formData: FormData) {
  const validatedFields = addTodoSchema.safeParse({
    title: formData.get('title'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      data: {
        title: formData.get('title') as string,
      },
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to add todo.',
    };
  }

  // if not email user is not authenticated
  if (!email) {
    return {
      type: 'redirect',
      data: {
        title: validatedFields.data.title,
      },
      message: 'Please Login again!.',
    };
  }

  try {
    const data = await db
      .insert(todos)
      .values({
        title: validatedFields.data.title,
        userId: email,
        isCompleted: false,
      })
      .returning({ id: todos.id });

    if (data.length === 0) {
      return {
        type: 'error',
        data: {
          title: validatedFields.data.title,
        },
        message: 'Database Error: Failed to add todo.',
      };
    }

    revalidatePath('/todos');
    return {
      type: 'success',
      data: {
        title: '',
      },
      message: `${validatedFields.data.title} added successfully.`,
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.log('Error', error.message);
    return {
      type: 'error',
      data: {
        title: validatedFields.data.title,
      },
      message: 'Database Error: Failed to add todo.',
    };
  }
}

// =============================== editTodo ===============================
const editTodoSchema = z.object({
  title: z.string().min(3, { message: 'Must be 3 or more characters long' }),
});

export async function editTodo(id: string, prevState: any, formData: FormData) {
  const isCompleted = formData.get('isCompleted');
  const validatedFields = editTodoSchema.safeParse({
    title: formData.get('title'),
  });

  let status = false;
  if (isCompleted === 'on') {
    status = true;
  }

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to edit todo.',
    };
  }

  try {
    const data = await db
      .update(todos)
      .set({
        title: validatedFields.data.title,
        isCompleted: status,
      })
      .where(eq(todos.id, id))
      .returning({ id: todos.id });

    if (data.length === 0) {
      return {
        type: 'error',
        message: 'Database Error: Failed to edit todo.',
      };
    }

    revalidatePath('/todos');
    return {
      type: 'success',
      message: `${validatedFields.data.title} updated successfully.`,
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.log('Error', error.message);
    return {
      type: 'error',
      message: 'Database Error: Failed to edit todo.',
    };
  }
}

// =============================== deleteTodo ===============================

export async function deleteTodo(id: string) {
  try {
    const data = await db.delete(todos).where(eq(todos.id, id)).returning({ id: todos.id });

    if (data.length === 0) {
      return {
        type: 'error',
        message: 'Database Error: Failed to delete todo.',
      };
    }
    revalidatePath('/todos');
    return {
      type: 'success',
      message: `Todo deleted successfully.`,
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.log('Error', error.message);
    return {
      type: 'error',
      message: 'Database Error: Failed to delete todo.',
    };
  }
}

// =============================== changeStatus ===============================

export async function changeStatus(id: string, isCompleted: boolean) {
  let status = false;
  if (isCompleted === false) {
    status = true;
  } else {
    status = false;
  }

  try {
    const data = await db
      .update(todos)
      .set({
        isCompleted: status,
      })
      .where(eq(todos.id, id))
      .returning({ id: todos.id });

    if (data.length === 0) {
      return {
        type: 'error',
        message: 'Database Error: Failed to change status.',
      };
    }

    revalidatePath('/todos');
    return {
      type: 'success',
      message: `Change status successfully.`,
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.log('Error', error.message);
    return {
      type: 'error',
      message: 'Database Error: Failed to delete todo.',
    };
  }
}
