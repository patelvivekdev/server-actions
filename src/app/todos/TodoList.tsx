import { getTodos } from '@/app/db';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditTodo from './EditTodo';
import { SubmitButton } from '@/components/submit-button';
import DeleteForm from './DeleteForm';

export default async function TodoList() {
  let todos = await getTodos();

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
            <EditTodo todo={todo} />
            <SubmitButton name='Change status' variant='default' className='ml-2' />
            <DeleteForm todo={todo} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
