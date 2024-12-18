'use client';
import { toast } from 'sonner';
import { startTransition, useActionState, useEffect } from 'react';
import { changeStatus } from '@/actions/actions';
import { Todo } from '@/db/schema';
import { Button } from '@/components/ui/button';

const initialState = {
  type: '',
  message: '',
  errors: null,
};

export default function ChangeStatus({ todo, addOptimisticTodo }: { todo: Todo; addOptimisticTodo: (todo: Todo) => void }) {
  const changeStatusWithId = () => changeStatus(todo?.id, todo?.isCompleted);
  const [state, formAction, isPending] = useActionState(changeStatusWithId, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
    }

    if (state.type === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  const handleAddTodo = async () => {
    startTransition(async () => {
      formAction();
      addOptimisticTodo({
        id: todo.id,
        title: todo.title,
        isCompleted: !todo.isCompleted,
      });
    });
  };

  return (
    <form action={handleAddTodo}>
      <Button type='submit' disabled={isPending} className='ml-2' variant='default'>
        {isPending ? 'Changing ...' : 'Change status'}
      </Button>
    </form>
  );
}
