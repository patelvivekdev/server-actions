import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignIn, SignOut } from './auth-components';
import { auth } from '@/app/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className='fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90'>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-14 items-center'>
          <Link className='flex items-center' href='/'>
            <span>/</span>
          </Link>
          <nav className='flex items-center gap-2 sm:gap-4'>
            <Link href='/todos'>
              <Button size='sm'>Todos</Button>
            </Link>
            {!session?.user ? (
              <SignIn size='sm' />
            ) : (
              <>
                <Link href='/profile'>
                  <Button size='sm'>Profile</Button>
                </Link>
                <SignOut size='sm' variant='destructive' />
                <Avatar className='w-10 h-10 rounded-full border border-red-500'>
                  {session.user.image && (
                    <AvatarImage
                      src={session.user.image ?? 'https://source.boringavatars.com/beam/120'}
                      alt={session.user.name ?? ''}
                    />
                  )}
                  <AvatarFallback>{session.user.email}</AvatarFallback>
                </Avatar>
              </>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
}
