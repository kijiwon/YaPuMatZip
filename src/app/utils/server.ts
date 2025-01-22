import { createServerClient } from '@supabase/ssr'
import { Database } from '../../../database.types'
import { cookies } from 'next/headers';

export const createServerSideClient= async (serverComponent = false)=> {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies:{
        get: (key)=> cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if(serverComponent) return;
          cookieStore.set(key, value, options)
        },
        remove: (key, options) => {
          if(serverComponent) return;
          cookieStore.set(key, '', {...options, maxAge: -1}) //  maxAge: -1->쿠키 삭제
        }
      }
    }
  )
}

// RSC
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};
