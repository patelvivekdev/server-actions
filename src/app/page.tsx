import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import ServerAction from '@/../public/server-actions.png';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10 p-24'>
      <h1 className='text-4xl font-bold'>This is a demo of server actions</h1>

      <h2 className='text-2xl font-semibold'>Read more on my blog</h2>

      <div className='flex flex-col text-center gap-5'>
        <Image
          src={ServerAction}
          width={300}
          height={300}
          quality={100}
          priority={true}
          className='h-full w-full object-cover border border-gray-900'
          alt='Blog on server actions'
        />
        <Button variant='secondary'>
          <Link href='https://patelvivek.dev/blog/server-actions'>Server Actions</Link>
        </Button>
      </div>
    </main>
  );
}
