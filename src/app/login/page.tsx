'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/submit-button';

import { login, githubLogin } from '@/app/actions';

const initialState = {
  message: '',
  errors: null,
};

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useFormState<any>(login as any, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      toast.success(state.message);
      router.push('/profile');
    }
    if (state.type === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='mx-auto grid w-[350px] gap-6'>
        <div className='grid gap-2 text-center'>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-balance text-muted-foreground'>Enter your email below to login to your account</p>
        </div>
        <form action={formAction}>
          <div className='grid gap-4'>
            {state?.type === 'error' && (
              <p className='text-lg mb-2 bg-green-951 text-red-600 border-2 border-gray-300 rounded-md p-2 my-4'>
                {state.message}
              </p>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' name='email' required />
              {state?.errors?.email && (
                <span id='email-error' className='text-red-600 text-sm'>
                  {state.errors.email.join(',')}
                </span>
              )}
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
                <Link href='/forgot-password' className='ml-auto inline-block text-sm underline'>
                  Forgot your password?
                </Link>
              </div>
              <Input id='password' type='password' required name='password' />
              {state?.errors?.password && (
                <span id='password-error' className='text-red-600 text-sm'>
                  {state.errors.password.join(',')}
                </span>
              )}
            </div>
            <SubmitButton name='Login' variant='outline' className='' />
          </div>
        </form>
        <form action={githubLogin}>
          <Button variant='outline' className='w-full'>
            Login with Github
          </Button>
        </form>
        <div className='mt-4 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='underline'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
