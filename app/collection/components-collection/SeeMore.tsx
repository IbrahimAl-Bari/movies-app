"use client"

import React from 'react'
import {CircleArrowRight} from "lucide-react";
import {redirect} from "next/navigation";

// @ts-ignore
const SeeMore = ({ url }) => {

    const handleclick = () => {
        redirect(url)
    }

    return (
        <>
            <button
                onClick={handleclick}
                className={"text-white flex justify-center items-center gap-2 cursor-pointer underline"}>
                See More
                <CircleArrowRight className={"w-4 h-4 my-auto"}/>
            </button>
        </>
    )
}
export default SeeMore
