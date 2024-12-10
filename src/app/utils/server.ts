import { createServerClient } from '@supabase/ssr'
import { Database } from '../../../database.types'
import { getCookie, setCookie} from 'cookies-next'

export async function createServerSideClient() {

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get:(key)=>getCookie(key),
        set:(key, value,options)=>{setCookie(key,value,options);},
        remove:(key, options)=> {
           setCookie(key,'',options);
        }
      },
    }
  )
}