'use server';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import supabase, { nextAuthClient } from '@/lib/supabase/private';

import { redirect } from 'next/navigation';
import { z } from 'zod';

// =============================== addTodo ===============================
const addTodoSchema = z.object({
  title: z.string().min(3, { message: 'Must be 3 or more characters long' }),
});

export async function addTodo(email: string, prevState: any, formData: FormData) {
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

  // if not email user is not authenticated
  if (!email) {
    return {
      type: 'redirect',
      message: 'Please Login again!.',
    };
  }

  try {
    const { data, error } = await supabase.from('todos').upsert({
      title: validatedFields.data.title,
      email: email,
    });

    if (error) {
      console.log('Error', error);
      return {
        type: 'error',
        message: 'Database Error: Failed to add todo.',
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
      message: 'Database Error: Failed to add todo.',
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
      message: 'Missing Fields. Failed to edit todo.',
    };
  }

  try {
    const { data, error } = await supabase
      .from('todos')
      .update({ title: validatedFields.data.title, isCompleted: status })
      .eq('id', id)
      .select();

    if (error) {
      console.log('Error', error);
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

export async function deleteTodo(id: number) {
  try {
    const { error } = await supabase.from('todos').delete().eq('id', id);

    if (error) {
      console.log('Error', error);
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

export async function changeStatus(id: number, isCompleted: boolean) {
  let status = false;
  if (isCompleted === false) {
    status = true;
  } else {
    status = false;
  }

  try {
    const { error } = await supabase.from('todos').update({ isCompleted: status }).eq('id', id).select();

    if (error) {
      console.log('Error', error);
      return {
        type: 'error',
        message: 'Database Error: Failed to delete todo.',
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

// // =============================== Register ===============================
// const registerSchema = z.object({
//   email: z.string().email('Please enter valid message').min(5),
//   password: z.string().min(8, { message: 'Must be 8 or more characters long' }),
// });

// export async function register(prevState: any, formData: FormData) {
//   const validatedFields = registerSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

//   // Return early if the form data is invalid
//   if (!validatedFields.success) {
//     return {
//       type: 'error',
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to register.',
//     };
//   }

//   try {
//     let { data, error } = await supabase.auth.signUp({
//       email: validatedFields.data.email,
//       password: validatedFields.data.password,
//     });

//     if (error) {
//       console.log('Error', error);
//       return {
//         type: 'error',
//         message: 'Database Error: Failed to register.',
//       };
//     }
//     return {
//       data: data,
//       type: 'success',
//       message: 'Registration successful.',
//     };
//   } catch (error: any) {
//     console.log('Error', error.message);
//     return {
//       type: 'error',
//       message: 'Database Error: Failed to register.',
//     };
//   }
// }

// // =============================== Login ===============================
// const loginSchema = z.object({
//   email: z.string().email('Please enter valid email'),
//   password: z.string(),
// });

// export async function login(prevState: any, formData: FormData) {
//   const supabase = createClient();
//   const validatedFields = loginSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

//   // Return early if the form data is invalid
//   if (!validatedFields.success) {
//     return {
//       type: 'error',
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to login.',
//     };
//   }

//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: validatedFields.data.email,
//       password: validatedFields.data.password,
//     });
//     if (error) {
//       console.log('Error', error.message);
//       return {
//         type: 'error',
//         message: `${error.message}`,
//       };
//     }
//     return {
//       data: data,
//       type: 'success',
//       message: 'Login successful.',
//     };
//   } catch (error: any) {
//     console.log('Error', error.message);
//     return {
//       type: 'error',
//       message: 'Database Error: Failed to login.',
//     };
//   }
// }

// export async function signOut() {
//   const supabase = createClient();
//   await supabase.auth.signOut();
//   return redirect('/login');
// }

// export async function githubLogin() {
//   const supabase = createClient();

//   let { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'github',
//   });
//   console.log('github', data);
//   if (error) {
//     console.log('Error', error.message);
//     return {
//       type: 'error',
//       message: `${error.message}`,
//     };
//   }
//   if (data.url) {
//     redirect(data.url);
//   }
// }

// =============================== Change Avatar ===============================
export async function changeAvatar(email: string, prevState: any, formData: FormData) {
  const avatar = formData.get('avatar') as File;

  if (!avatar) {
    return {
      type: 'error',
      message: 'Please select an avatar',
    };
  }

  // Only images are allowed
  if (!avatar.type.includes('image')) {
    return {
      type: 'error',
      message: 'Only images are allowed',
    };
  }

  // make sure file is less than 2MB
  if (avatar.size > 2 * 1024 * 1024) {
    return {
      type: 'error',
      message: 'File size must be less than 2MB',
    };
  }

  try {
    const { data, error } = await supabase.storage.from('profile').upload(`public/${email}/${avatar.name}`, avatar, {
      upsert: true,
    });
    // data {
    //   path: 'public/patelvk2000@gmail.com/avatar.png',
    //   id: '3343e910-a65d-4091-80ed-c3a60f9d3369',
    //   fullPath: 'profile/public/patelvk2000@gmail.com/avatar.png'
    // }
    if (error) {
      console.log('Error', error.message);
      return {
        type: 'error',
        message: `${error.message}`,
      };
    }
    if (data.path) {
      const { data: avatar } = supabase.storage.from('profile').getPublicUrl(data.path);

      // change the url in User table in next-auth schema
      const { error: userDataError } = await nextAuthClient.from('users').update({ image: avatar.publicUrl }).eq('email', email);

      if (userDataError) {
        console.log('Error', userDataError);
        return {
          type: 'error',
          message: `${userDataError.message}`,
        };
      }

      revalidatePath('/');
      revalidatePath('/profile');
      return {
        type: 'success',
        message: 'Avatar changed!',
        resetKey: Date.now().toString(),
      };
    }
  } catch (error: any) {
    console.log('error', error);
    return {
      type: 'error',
      message: 'Database Error: Failed to change avatar.',
    };
  }
}
