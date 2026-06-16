"use client"

import {useRouter} from "next/navigation";

import React from 'react'
import {CircleArrowLeft} from "lucide-react";

const GoBack = () => {

    const router = useRouter()
    const handleclick = () => {
        router.back();
    }

    return (
        <div>
            <button
                onClick={handleclick}
                className={"text-white w-7 h-7 ml-5 mt-2 flex justify-center items-center gap-2 cursor-pointer underline mr-5"}>
                <CircleArrowLeft className={"w-7 h-7 my-auto"}/>
            </button>
        </div>
    )
}
export default GoBack
