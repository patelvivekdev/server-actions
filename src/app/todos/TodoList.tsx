import { getTodos } from '@/app/db';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import ChangeStatus from './ChangeStatus';
import { User } from 'next-auth';

export default async function TodoList({ user }: { user: User }) {
  let todos = await getTodos(user);

  // sort todos with id
  if (todos != null) {
    todos = todos.sort((a, b) => a.id - b.id);
  }

  if (todos?.length === 0) {
    return <h1>No todos yet! Please add with above form.</h1>;
  }

  return (
    <div className='flex flex-row flex-wrap gap-4'>
      {todos?.map((todo) => (
        <Card key={todo.id}>
          <CardHeader>
            <CardTitle>{todo.title}</CardTitle>
            <CardDescription>Status: {todo.isCompleted ? ' Completed' : ' Not Completed'}</CardDescription>
          </CardHeader>
          <CardFooter>
            <EditForm todo={todo} />
            <ChangeStatus todo={todo} />
            <DeleteForm todo={todo} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
