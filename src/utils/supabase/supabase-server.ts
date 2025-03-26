import {create, createClient} from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if(!supabaseRoleKey){
    throw new Error('Role key is not allowed to be published' + supabaseRoleKey + '');
}

export function supabaseServer() {
    return createClient(supabaseURL,supabaseRoleKey, {
        auth: { persistSession: false },
    })
}

export default supabaseServer;
