import React from 'react'
import {createClient} from "@/app/utils/supabase/server";
import {redirect} from "next/navigation";

const Page = async () => {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    return (
        <div>Page</div>
    )
}
export default Page
