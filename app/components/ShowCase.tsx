"use client"

import React, { useRef } from 'react'
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Image from "next/image"

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)

const ShowCase = () => {

    const x = 200
    const y = 500

    const container = useRef(null)

    useGSAP(() => {

        const split = new SplitText(".fade-in", { type: "words" })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=2000",
                pin: true,
                scrub: 1,
                // @ts-ignore
                ease: "power3.out",
            }
        })

        tl
            .from(split.words, {
                y: 30,
                opacity: 0,
                stagger: 0.1,
            })
            // Images enter after text, staggered sequentially
            .from(".avengers", {
                y: 40,
                opacity: 0,
                willChange: "transform, opacity",
            },)


            .from(".shaw", {
                y: 40,
                opacity: 0,
                ease: "power3.out",
                willChange: "transform, opacity",
            },)


            .to(".shaw", {
                y: -40,
                opacity: 0,
            })

            .to(".avengers", {
                y: -40,
                opacity: 0,
            })

            .from(".obsession", {
                y: 40,
                opacity: 0,
                willChange: "transform, opacity",
            }, "<")


            .from(".mando", {
                y: 40,
                opacity: 0,
                willChange: "transform, opacity",
            }, ">")


            .to(".obsession", {
                y: -40,
                opacity: 0,
            })

            .from(".hail", {
                y: 40,
                opacity: 0,
                willChange: "transform, opacity",
            }, ">")


            .to(".mando", {
                y: -40,
                opacity: 0,
            })


            .to(".hail", {
                y: -40,
                opacity: 0,
            })
        // Cleanup on unmount — prevents duplicate splits on re-render
        return () => split.revert()

    }, { scope: container })

    return (
        <section
            ref={container}
            className="relative overflow-hidden border-b-[6px] h-screen w-screen border-black bg-[#111111] px-6 py-20">
            <div className="w-full h-full flex justify-center items-center">

                {/* Text sits above images */}
                <h1
                    className="fade-in mb-3 text-center font-black uppercase text-white relative z-20"
                    style={{ fontSize: '6rem', fontWeight: 900, lineHeight: 1.2 }}
                >
                    Browse & <br /> Review and <br /> Watch
                </h1>

                {/* Images layer behind text */}
                <div className="showcase h-full w-full absolute z-10" style={{ perspective: '800px' }}>
                    <Image
                        className="avengers absolute right-10 top-10"
                        src="/avengers.jpg"
                        alt="Avengers movie poster"
                        width={x}
                        height={y}
                        style={{ willChange: 'transform, opacity' }}
                    />
                    <Image
                        className="hail absolute top-10 left-150"
                        src="/hail.jpg"
                        alt="Hail Caesar movie poster"
                        width={x}
                        height={y}
                        style={{ willChange: 'transform, opacity' }}
                    />
                    <Image
                        className="mando absolute right-70 bottom-10"
                        src="/mando.jpg"
                        alt="The Mandalorian poster"
                        width={x}
                        height={y}
                        style={{ willChange: 'transform, opacity' }}
                    />
                    <Image
                        className="obsession absolute left-70 top-10"
                        src="/obsession.jpg"
                        alt="Obsession movie poster"
                        width={x}
                        height={y}
                        style={{ willChange: 'transform, opacity' }}
                    />
                    <Image
                        className="shaw absolute left-10 bottom-10"
                        src="/shaw.jpg"
                        alt="Shaw Brothers movie poster"
                        width={x}
                        height={y}
                        style={{ willChange: 'transform, opacity' }}
                    />
                </div>

            </div>
        </section>
    )
}

export default ShowCase