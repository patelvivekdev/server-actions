import AddTodo from './AddForm';
import TodoList from './TodoList';

export default async function Todo() {
  return (
    <div className='flex h-screen w-4/5 mx-auto flex-col items-center gap-10 justify-center'>
      <AddTodo />
      <TodoList />
    </div>
  );
}
