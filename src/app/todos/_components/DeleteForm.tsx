'use client';
import { toast } from 'sonner';
import { useActionState, useEffect } from 'react';

import { deleteTodo } from '@/actions/actions';
import { Todo } from '@/db/schema';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function DeleteForm({ todo }: { todo: Todo }) {
  let deleteTodoWithId = deleteTodo.bind(null, todo.id);
  const [state, formAction, isPending] = useActionState(deleteTodoWithId, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
    }

    if (state.type === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Button type='submit' disabled={isPending} className='ml-2' variant='destructive'>
        {isPending ? 'Deleting ...' : 'Delete'}
      </Button>
    </form>
  );
}
