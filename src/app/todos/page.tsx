import TodoList from './_components/TodoList';
import { auth } from '@/app/(auth)/auth';
import { GithubSignIn } from '@/components/auth-components';
import { getTodos } from '@/db/todos';

export default async function Todo() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className='flex h-screen w-4/5 mx-auto flex-col items-center gap-10 justify-center'>
        <h1 className='text-3xl'>You must login to perform this action.</h1>
        <div className='flex gap-4'>
          <GithubSignIn />
        </div>
      </div>
    );
  }

  // Fetch todos
  let todos = await getTodos(session.user.userId);

  return (
    <div className='flex h-screen w-4/5 mx-auto flex-col items-center gap-10 justify-center'>
      <TodoList todos={todos} user={session.user} />
    </div>
  );
}
