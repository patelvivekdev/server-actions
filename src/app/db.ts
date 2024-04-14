import supabase from '@/lib/supabase/private';

export async function getTodos() {
  let { data: todos, error } = await supabase.from('todos').select('*');
  return todos;
}
