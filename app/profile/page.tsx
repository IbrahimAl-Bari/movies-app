import React from 'react'
import {createClient} from "@/app/utils/supabase/server";
import {redirect} from "next/navigation";
import {ShieldX} from "lucide-react";

const Page = async () => {

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className={"w-screen h-screen"}>

            <div className={"text-white w-full text-center h-full z-2"}>
                <h3 className={"z-2 mt-28"}> Haven't Done That Yet</h3>
                <p className={"text-white/50 z-2"}>Stay Tuned In Next Commits</p>
            </div>
        </div>
    )
}
export default Page
