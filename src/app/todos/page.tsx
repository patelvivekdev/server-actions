'use client';

import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addTodo } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
};

export default function TodoList() {
  const [state, formAction] = useFormState<any>(addTodo as any, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <div className='grid gap-2 text-center'>
          <h1 className='text-3xl font-bold'>Add Todo</h1>
        </div>
        <form action={formAction} key={state?.resetKey}>
          <div className='grid gap-4'>
            {state?.type === 'error' && (
              <p className='text-lg mb-2 bg-green-951 text-red-600 border-2 border-gray-300 rounded-md p-2 my-4'>
                {state.message}
              </p>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='title'>Todo</Label>
              <Input id='title' type='text' placeholder='Write your task here' name='title' required />
              {state?.errors?.title && (
                <span id='title-error' className='text-red-600 text-sm'>
                  {state.errors.title.join(',')}
                </span>
              )}
            </div>
            <SubmitButton name='Add Todo' variant='outline' className='' />
          </div>
        </form>
      </div>
    </div>
  );
}
