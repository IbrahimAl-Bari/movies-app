"use client"

import React from 'react'
import { ShieldX } from "lucide-react";
import {useRouter} from "next/navigation";

const NotFound = () => {

    const router = useRouter()

    function handleclick () {
        router.push("/")
    }

    return (
        <div className={"w-screen h-screen"}>

            <pre className={"absolute text-center w-full leading-normal text-[20rem] max-md:text-[15rem] max-sm:text-[10rem]  -z-10 text-red-300/20"}>404</pre>

                <div className={"text-white w-full text-center h-full z-2"}>
                    <ShieldX className={"w-20 h-20 text-[#FF4D4D] mx-auto m-6 mt-28 z-2"}/>
                    <h3 className={"z-2"}> You Missed The Way</h3>
                    <p className={"text-white/50 z-2"}>lets you get back home bt clicking the button below </p>

                    <button
                        onClick={handleclick}
                        className="inline-block border-4 m-10 border-black bg-[#FF4D4D] rounded-2xl px-12 py-3 font-black tracking-tight text-black shadow-[3px_3px_0px_0px_#FFFFFF] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#FFD60A]">
                        Home
                    </button>
                </div>
        </div>
    )
}
export default NotFound
