'use client';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { editTodo } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

const initialState = {
  message: '',
  errors: null,
};

export default function EditTodo({ todo }: { todo: any }) {
  const [open, setOpen] = useState(false);
  const id: number = todo?.id;
  const editTodoWithId = editTodo.bind(null, id);
  const [state, formAction] = useFormState<any>(editTodoWithId as any, initialState);

  useEffect(() => {
    if (state.type === 'success') {
      setOpen(false);
      toast.success(state.message);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>Make changes to your todo here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form action={formAction} key={state?.resetKey}>
          <div className='grid gap-4 py-4'>
            {state?.type === 'error' && (
              <p className='text-lg mb-2 bg-green-951 text-red-600 border-2 border-gray-300 rounded-md p-2 my-4'>
                {state.message}
              </p>
            )}
            <div className='grid gap-2'>
              <Label htmlFor='title'>Todo</Label>
              <Input id='title' defaultValue={todo.title} type='text' placeholder='Write your task here' name='title' required />
              {state?.errors?.title && (
                <span id='title-error' className='text-red-600 text-sm'>
                  {state.errors.title.join(',')}
                </span>
              )}
            </div>
            <div className='flex items-center space-x-2'>
              <Label htmlFor='isCompleted'>Statues</Label>
              <Switch id='isCompleted' name='isCompleted' defaultChecked={todo.isCompleted} />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton name='Save changes' variant='default' className='' />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
