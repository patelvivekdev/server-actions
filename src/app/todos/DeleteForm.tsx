'use client';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';

import { deleteTodo } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
};

export default function DeleteForm({ todo }: { todo: any }) {
  let deleteTodoWithId = deleteTodo.bind(null, todo.id);
  const [state, formAction] = useFormState<any>(deleteTodoWithId as any, initialState);

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
      <SubmitButton name='Delete' variant='destructive' className='ml-2' />
    </form>
  );
}
