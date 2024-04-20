import { auth } from '@/app/auth';
import { SignIn, SignOut } from '@/components/auth-components';
import Image from 'next/image';
import ChangeAvatarForm from './ChangeAvatarForm';

export default async function PrivatePage() {
  const session = await auth();
  if (!session?.user)
    return (
      <div className='flex h-screen w-4/5 mx-auto flex-col items-center gap-10 justify-center'>
        <h1 className='text-3xl'>You must login to perform this action.</h1>
        <SignIn />
      </div>
    );

  return (
    <div className='mt-20 flex flex-col space-y-5 h-screen justify-center items-center'>
      <p>Hello {session.user.name}</p>
      <div className='space-y-5'>
        <Image src={session.user.image!} alt={session.user.name!} width={100} height={100} />
        <SignOut />
      </div>

      <ChangeAvatarForm user={session?.user} />
    </div>
  );
}
