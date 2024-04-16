import AddTodo from './AddForm';
import TodoList from './TodoList';
import { auth } from '@/app/auth';
import { SignIn } from '@/components/auth-components';

export default async function Todo() {
  const session = await auth();
  if (!session?.user)
    return (
      <div className='flex h-screen w-4/5 mx-auto flex-col items-center gap-10 justify-center'>
        <h1 className='text-3xl'>You need to login to perfom this action.</h1>
        <SignIn />
      </div>
    );

  return (
    <div className='flex h-screen w-4/5 mx-auto flex-col items-center gap-10 justify-center'>
      <AddTodo user={session?.user} />
      <TodoList user={session?.user} />
    </div>
  );
}
