import { Button } from './ui/button';
import { signIn, signOut } from '@/app/auth';

export function SignIn({ provider, ...props }: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <Button {...props}>Sign in with GitHub</Button>
      {/* <Button onClick={() => signIn('github')}></Button> */}
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button {...props}>Sign out</Button>
    </form>
  );
}
