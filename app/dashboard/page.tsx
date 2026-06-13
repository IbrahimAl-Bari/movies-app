import React from 'react'
import {createClient} from "@/app/utils/supabase/server";
import {redirect} from "next/navigation";

const Page = async () => {

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // RLS ensures this only returns movies belonging to the logged-in user
    const { data: movies, error } = await supabase
        .from('user_movies')
        .select('*')

    return (
        <div>Movies</div>
    )
}
export default Page
