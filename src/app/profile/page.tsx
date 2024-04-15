import { auth } from '@/app/auth';
import { SignIn, SignOut } from '@/components/auth-components';

export default async function PrivatePage() {
  const session = await auth();
  if (!session?.user)
    return (
      <div className='flex h-screen w-4/5 mx-auto flex-col items-center gap-10 justify-center'>
        <h1 className='text-3xl'>You need to login to perfom this action.</h1>
        <SignIn />
      </div>
    );

  return (
    <div className='mt-20 flex flex-col h-screen justify-center items-center'>
      <p>Hello {session.user.email}</p>
      <SignOut className='' />
    </div>
  );
}
