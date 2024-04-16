'use client';

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useFormState } from 'react-dom';
import { User } from 'next-auth';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submit-button';
import { changeAvatar } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
};

export default function ChangeAvatarForm({ user }: { user: User }) {
  const changeAvatarWithEmail = changeAvatar.bind(null, user?.email as string);

  const [state, formAction] = useFormState<any>(changeAvatarWithEmail as any, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div className='border p-10 mt-10 '>
      <form action={formAction} key={state?.resetKey}>
        {state?.type === 'error' && (
          <p className='text-lg mb-2 bg-green-951 text-red-600 border-2 border-gray-300 rounded-md p-2 my-4'>{state.message}</p>
        )}
        <div className='grid gap-4'>
          <Label htmlFor='avatar'>Avatar</Label>
          <Input id='avatar' name='avatar' type='file' required />
          {state?.errors?.email && (
            <span id='email-error' className='text-red-600 text-sm'>
              {state.errors.email.join(',')}
            </span>
          )}
          <SubmitButton name='Change Avatar' variant='outline' className='' />
        </div>
      </form>
    </div>
  );
}
