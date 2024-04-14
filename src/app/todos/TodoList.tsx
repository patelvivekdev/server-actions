import { getTodos } from '@/app/db';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditTodo from './EditTodo';

export default async function TodoList() {
  const todos = await getTodos();

  return (
    <div className='flex flex-row flex-wrap gap-4'>
      {todos?.map((todo) => (
        <Card key={todo.id}>
          <CardHeader>
            <CardTitle>{todo.title}</CardTitle>
            <CardDescription>{todo.isCompleted ? 'Completed' : 'Not Completed'}</CardDescription>
          </CardHeader>
          <CardFooter>
            <EditTodo todo={todo} />
            <Button className='ml-2' variant='destructive'>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
