import supabase from '@/lib/supabase/private';
import { User } from 'next-auth';

export async function getTodos(user: User) {
  let { data: todos, error } = await supabase
    .from('todos')
    .select('*')

    // Filters
    .eq('email', user.email);
  return todos;
}
