"use client"

import React, {useRef} from 'react'
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)


const SeriesCase = () => {

    const container = useRef(null);

    useGSAP(() => {

        const split = SplitText.create(".fade-in", {
            type: "chars, words, lines"
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "center center",
                end: '+=2000',
                scrub: 1,
                pin: true,
                // @ts-ignore
                ease: "power3.out",

            }})
        tl
            .fromTo(".video-masked", {
                webkitMaskSize: "150%", maskSize: "150%",},

                {maskSize: "30%", webkitMaskSize: "30%",})

            .from(split.words, {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            }
        )

    } , { scope: container })

    return (
        <section ref={container}
            className="relative overflow-hidden border-b-[6px] h-screen w-screen border-black bg-[#111111] px-6 py-20">

            <div className={"h-full w-full flex justify-center items-center"}>
                <h2 className={"fade-in absolute top-20"} style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 0}}>Inclunding Your Favourite Movies</h2>
                <video className={"video-masked"} src={"/videos/video.mp4"} preload={'auto'} autoPlay muted loop playsInline />
            </div>


        </section>
    )
}
export default SeriesCase
