import Link from 'next/link';
import { Button } from '@/components/ui/button';
import UserButton from './user-button';

export default async function Navbar() {
  return (
    <nav className='fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90'>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-14 items-center'>
          <Link className='flex items-center' href='/'>
            <Button size='sm'>
              <span>Server Actions</span>
            </Button>
          </Link>
          <nav className='flex items-center gap-4'>
            <Link href='/todos'>
              <Button size='sm'>Todos</Button>
            </Link>
            <UserButton />
          </nav>
        </div>
      </div>
    </nav>
  );
}
