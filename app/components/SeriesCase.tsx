"use client"

import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)

const SeriesCase = () => {
    const container = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    useGSAP(() => {
        if (!mounted) return
        const split = SplitText.create(".series-fade-in", { type: "chars, words, lines" });
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "center center",
                end: '+=2000',
                scrub: 1,
                pin: true,
            }
        })
        tl
            .fromTo(".video-masked", { maskSize: "150%", WebkitMaskSize: "150%" }, { maskSize: "30%", WebkitMaskSize: "30%" })
            .from(split.words, { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out" })
        return () => split.revert()
    }, { scope: container, dependencies: [mounted] })

    if (!mounted) return <section className="relative overflow-hidden border-b-[6px] h-screen w-screen border-black bg-[#111111] px-6 py-20" />

    return (
        <section ref={container} className="relative overflow-hidden border-b-[6px] h-screen w-screen border-black bg-[#111111] px-6 py-20">
            <div className="h-full w-full flex justify-center items-center">
                <h2
                    className="series-fade-in absolute top-20 text-white"
                    style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 0 }}
                >
                    Including Your Favourite Movies
                </h2>
                <video className="video-masked" src="/videos/video.mp4" preload="auto" autoPlay muted loop playsInline />
            </div>
        </section>
    )
}

export default SeriesCase