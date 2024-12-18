'use client';
import { toast } from 'sonner';
import { startTransition, useActionState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addTodo } from '@/actions/actions';
import { User } from 'next-auth';
import { Button } from '@/components/ui/button';
import { Todo } from '@/db/schema';

const initialState = {
  type: '',
  message: '',
  data: {
    title: '',
  },
  errors: undefined,
  resetKey: undefined,
};

export default function AddTodo({ user, addOptimisticTodo }: { user: User; addOptimisticTodo: (todo: Todo) => void }) {
  const UUID = crypto.randomUUID();
  const addTodoWithEmail = addTodo.bind(null, user?.userId as string);
  const addTodoWithUUID = addTodoWithEmail.bind(null, UUID as string);

  const [state, formAction, isPending] = useActionState(addTodoWithUUID, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
    }
    if (state.type === 'redirect') {
      toast.success(state.message);
    }
  }, [state]);

  const handleAddTodo = async (formData: FormData) => {
    const title = formData.get('title') as string;

    startTransition(async () => {
      formAction(formData);
      addOptimisticTodo({
        id: UUID,
        title,
        isCompleted: false,
      });
    });
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <div className='grid gap-2 text-center'>
          <h1 className='text-3xl font-bold'>Add Todo</h1>
        </div>
        <form action={handleAddTodo} key={state?.resetKey}>
          <div className='grid gap-4'>
            {state?.type === 'error' && (
              <p className='text-lg mb-2 bg-green-951 text-zinc-700 border-red-600  border-2 rounded-md p-2 my-4'>
                {state.message}
              </p>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='title'>Todo</Label>
              <Input
                id='title'
                type='text'
                placeholder='Write your task here'
                name='title'
                required
                disabled={isPending}
                defaultValue={state.data?.title}
              />
              {state?.errors?.title && (
                <span id='title-error' className='text-red-600 text-sm'>
                  {state.errors.title.join(',')}
                </span>
              )}
            </div>
            <Button type='submit' disabled={isPending} variant='outline'>
              {isPending ? 'Submitting...' : 'Add Todo'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
