'use client';
import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';
// import { signIn, signOut } from '@/app/auth';

export function SignIn({ provider, ...props }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    // <form
    //   action={async () => {
    //     'use server';
    //     await signIn(provider);
    //   }}
    // >
    //   <Button {...props}>Sign In</Button>
    // </form>
    <Button {...props} onClick={() => signIn(provider)}>
      Sign In
    </Button>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    // <form
    //   action={async () => {
    //     'use server';
    //     await signOut();
    //   }}
    //   className='w-full'
    // >
    //   <Button variant='destructive' className='w-full' {...props}>
    //     Sign Out
    //   </Button>
    // </form>
    <Button variant='destructive' onClick={() => signOut()} className='w-full' {...props}>
      Sign Out
    </Button>
  );
}
