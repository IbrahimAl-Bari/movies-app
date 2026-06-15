import { createClient } from '@/app/utils/supabase/server'
import { redirect } from 'next/navigation'
import React from "react";
import PopularShell from "@/app/collection/components-collection/(shells)/PopularShell";
import FamilyShell from "@/app/collection/components-collection/(shells)/FamilyShell";
import InterestingShell from "@/app/collection/components-collection/(shells)/InterestingShell";
import ActionShell from "@/app/collection/components-collection/(shells)/ActionShell";
import AnimationShell from "@/app/collection/components-collection/(shells)/AnimationShell";


export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const username = user.user_metadata?.username || 'MovieFan'

    return (
        <section className="min-h-screen bg-[#111111] pb-24 px-4 md:px-8 selection:bg-[#FFD60A] selection:text-black">

            <div className="max-w-7xl mx-auto pt-12 text-center">
                    <h1 className=" text-white text-2xl md:text-5xl font-black uppercase tracking-tighter" style={{ fontWeight: 900 }}>
                        Welcome Back, {username}!
                    </h1>
            </div>

            <div className="max-w-4xl mx-auto my-6">
                <div className="h-4 border-[6px] border-black bg-[#FFD60A] shadow-[6px_6px_0px_0px_#000000]" />
            </div>

            <PopularShell />
            <InterestingShell />
            <ActionShell />
            <FamilyShell />
            <AnimationShell />
        </section>
    )
}