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
  }),
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name;
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
