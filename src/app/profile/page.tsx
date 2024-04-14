import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { signOut } from '../actions';
import { Button } from '@/components/ui/button';

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className='mt-20 flex flex-col h-screen justify-center items-center'>
      <p>Hello {data.user.email}</p>
      <form action={signOut}>
        <Button variant="outline">Logout</Button>
      </form>
    </div>
  );
}
