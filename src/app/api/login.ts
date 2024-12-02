import { createSupabaseBrowserClient } from "../lib/client/supabase";

const supabase = createSupabaseBrowserClient();

export async function signInWithGoogle(location:string){ 
   const {data,error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options:{
        redirectTo:`${window.location.origin}/auth/callback`,
        queryParams:{
            access_type:'offline',
            prompt: 'consent'
        }
    }
   });
   if(error) console.log('google login error:',error.message); 

}

export async function signInWithKakao(location:string){ 
   const {data,error} = await supabase.auth.signInWithOAuth({
    provider:'kakao',
    options:{
        redirectTo:`${window.location.origin}/auth/callback`,
    }
   });
   if(error) console.log('kakao login error:',error.message);
    
   
}

export async function signOut(){
    const {error} =await supabase.auth.signOut();
    if(error) console.log(error);
}