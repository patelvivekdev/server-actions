'use server';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import supabase from '@/lib/supabase/private';
import { z } from 'zod';

// =============================== addTodo ===============================
const addTodoSchema = z.object({
  title: z.string().min(3, { message: 'Must be 3 or more characters long' }),
});

export async function addTodo(prevState: any, formData: FormData) {
  const validatedFields = addTodoSchema.safeParse({
    title: formData.get('title'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to add todo.',
    };
  }

  try {
    const { data, error } = await supabase.from('todos').upsert({
      title: validatedFields.data.title,
    });

    if (error) {
      console.log('Error', error);
      return {
        type: 'error',
        message: 'Database Error: Failed to send message.',
      };
    }
    revalidatePath('/todos');
    return {
      type: 'success',
      message: `${validatedFields.data.title} added successfully.`,
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.log('Error', error.message);
    return {
      type: 'error',
      message: 'Database Error: Failed to send message.',
    };
  }
}

// =============================== editTodo ===============================
const editTodoSchema = z.object({
  title: z.string().min(3, { message: 'Must be 3 or more characters long' }),
});

export async function editTodo(id: number, prevState: any, formData: FormData) {
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
      message: 'Missing Fields. Failed to add todo.',
    };
  }

  try {
    const { data, error } = await supabase.from('todos').update({ title: 'otherValue' }).eq('some_column', 'someValue').select();

    // if (error) {
    //   console.log('Error', error);
    //   return {
    //     type: 'error',
    //     message: 'Database Error: Failed to send message.',
    //   };
    // }
    revalidatePath('/todos');
    return {
      type: 'success',
      message: `${validatedFields.data.title} added successfully.`,
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.log('Error', error.message);
    return {
      type: 'error',
      message: 'Database Error: Failed to send message.',
    };
  }
}
