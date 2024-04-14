'use client';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import { SubmitButton } from '@/components/submit-button';
import { changeStatus } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
};

export default function ChangeStatus({ todo }: { todo: any }) {
  let changeStatusWithId = changeStatus.bind(null, todo?.id);
  changeStatusWithId = changeStatusWithId.bind(null, todo?.isCompleted);
  const [state, formAction] = useFormState<any>(changeStatusWithId as any, initialState);

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
      <SubmitButton name='Change status' variant='default' className='ml-2' />
    </form>
  );
}
