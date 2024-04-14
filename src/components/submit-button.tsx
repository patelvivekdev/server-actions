'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

export function SubmitButton({
  name,
  className,
  variant,
}: {
  name: string;
  className: string;
  variant: 'link' | 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost' | null | undefined;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} className={className} variant={variant}>
      {pending ? 'Submitting...' : name}
    </Button>
  );
}
