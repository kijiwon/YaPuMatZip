
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const redirect_url = `${origin}${next}stadium`;
console.log('>>code', code)
  if (code) {
    const supabase =await createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    );
    const { error } =await supabase.auth.exchangeCodeForSession(code);
    console.log('>>error',error)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) { 
        return NextResponse.redirect(redirect_url);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(redirect_url);
      }
    };
  }


  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}