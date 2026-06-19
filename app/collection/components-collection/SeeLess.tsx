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
                className={"text-white max-sm:text-sm flex max-sm:mr-0 justify-center items-center gap-2 cursor-pointer underline mr-5"}>
                <CircleArrowLeft className={"w-4 max-sm:w-7 h-4 my-auto"}/>
                See Less
            </button>
        </>
    )
}
export default SeeLess
