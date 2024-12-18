'use client';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import ChangeStatus from './ChangeStatus';
import { useOptimistic } from 'react';
import AddTodo from './AddForm';
import { User } from 'next-auth';
import { Todo } from '@/db/schema';

export default function TodoList({ todos, user }: { todos: Todo[]; user: User }) {
  let [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], Todo>(todos, (state, todo) => [
    ...state,
    { id: todo.id, title: todo.title, isCompleted: false },
  ]);

  return (
    <>
      <AddTodo user={user} addOptimisticTodo={addOptimisticTodo} />
      <div className='flex flex-row flex-wrap gap-4'>
        {optimisticTodos.length === 0 && <h1 className='text-3xl'>No todos found</h1>}
        {optimisticTodos?.map((optimisticTodo) => <OptimisticTodo key={optimisticTodo.id} todo={optimisticTodo} />)}
      </div>
    </>
  );
}

function OptimisticTodo({ todo }: { todo: Todo }) {
  let [optimisticTodo, addOptimisticTodo] = useOptimistic<Todo, Todo>(todo, (state, newTodo) => ({
    ...state,
    title: newTodo.title,
    isCompleted: newTodo.isCompleted,
  }));
  return (
    <Card key={optimisticTodo.id}>
      <CardHeader>
        <CardTitle>{optimisticTodo.title}</CardTitle>
        <CardDescription>Status: {optimisticTodo.isCompleted ? ' Completed' : ' Not Completed'}</CardDescription>
      </CardHeader>
      <CardFooter>
        <EditForm todo={optimisticTodo} addOptimisticTodo={addOptimisticTodo} />
        <ChangeStatus todo={optimisticTodo} addOptimisticTodo={addOptimisticTodo} />
        <DeleteForm todo={optimisticTodo} />
      </CardFooter>
    </Card>
  );
}
