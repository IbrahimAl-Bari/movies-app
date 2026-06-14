"use client"

import React from 'react'
import {CircleArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";

interface SeeLessProps {
    url: string;
}

const SeeLess = ({ url }: SeeLessProps) => {
    const router = useRouter();

    const handleclick = () => {
        router.push(url);
    }

    return (
        <>
            <button
                onClick={handleclick}
                className={"text-white flex justify-center items-center gap-2 cursor-pointer underline"}>
                <CircleArrowLeft className={"w-4 h-4 my-auto"}/>
                See Less
            </button>
        </>
    )
}
export default SeeLess
