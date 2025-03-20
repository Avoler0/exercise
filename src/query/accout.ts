import {SupabaseClient} from "@supabase/supabase-js";
import axios from "axios";

export function getAccounts(supabase:SupabaseClient){
    return supabase.from('accounts').select('*')
}


export async function getAccountByLogin(email:string,password:string,memory:boolean){
    try{
        const res = await axios.post('/api/login', { email:email, password:password,memory:memory});

        return res.data;
    } catch(error){
        return null;
    }

}
