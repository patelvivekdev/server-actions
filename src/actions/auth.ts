import { signIn, signOut } from '@/app/(auth)/auth';

export async function SignIn() {
  await signIn('github', { redirectTo: '/dashboard' });
}

export async function SignOut() {
  await signOut();
}
