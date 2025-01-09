import { createServerSideClient } from '@/app/utils/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
      const supabase =await createServerSideClient();

      const {  error } =await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // user 정보 가져오기
        const {data:{user}} = await supabase.auth.getUser();
       
        if(!user){
          return NextResponse.redirect(`${origin}/auth`);
        }

        const { id, email, user_metadata } = user;
        const { name, avatar_url } = user_metadata;

        // 존재하는 user인지 확인
        const {data} = await supabase
        .from('profiles')
        .select('id')
        .eq('id', id)
        .single();


        if(!data){
          const { error} = await supabase
          .from('profiles')
          .insert({
            id,
            email,
            name,
            avatar_url
          });
   
          if(error){
            console.log('error>>>>', error)
          }
        }

        const forwardedHost = request.headers.get('x-forwarded-host');
        const isLocalEnv = process.env.NODE_ENV === 'development';
        if (isLocalEnv) { 
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      };
    }


  return NextResponse.redirect(`${origin}/auth`);
}