import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className='fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90'>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='flex justify-between h-14 items-center'>
          <Button size='sm'>
            <Link className='flex items-center' href='/'>
              <span>Server Actions</span>
            </Link>
          </Button>
          <nav className='flex items-center gap-4'>
            <Button size='sm'>
              <Link className='font-medium flex items-center text-sm transition-colors hover:underline' href='/todos'>
                Todos
              </Link>
            </Button>
            <Button size='sm'>Sign up</Button>
          </nav>
        </div>
      </div>
    </nav>
  );
}
