import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import GitHub from 'next-auth/providers/github';
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from 'next-auth';

export const config = {
  providers: [GitHub,Google],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  })
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
