"use client"

import { Play, List, TvMinimalPlay  } from "lucide-react";
import React, {useRef} from "react";
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Image from "next/image";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)


export function Hero() {

  const buttonsRef = useRef(null)

  useGSAP(() => {

    gsap.from(".btn-watch", {
      boxShadow: "0px 0px 0px 0px #FF4D4D",
      duration: 0.6,
      ease: "power3.out",
    })

    gsap.from(".btn-browse", {
      boxShadow: "0px 0px 0px 0px #FFD60A",
      duration: 0.6,
      ease: "power3.out",
    })
  }, { scope: buttonsRef })

const container = useRef(null)

useGSAP(() => {
  const split = SplitText.create(".fade-in", {
    type: "chars, words, lines"
  });

  gsap.from(split.words, {
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: "power3.out"
      }
  )
  gsap.from(".paragraph", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power3.out",
  })


}, {scope: container })



  return (
    <section ref={container} className="relative overflow-hidden border-b-[6px] h-screen w-screen z-0 border-black bg-[#111111] px-6 py-20">

      <div className={"h-full z-10 w-full flex-col justify-center items-center"}>

        <h1 className="fade-in mb-7 text-center font-black uppercase text-white" style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 0.9 }}>
          Discover Your <br/> Next Favorite Movie
        </h1>

        <p className="paragraph mb-8 text-center font-bold leading-relaxed text-white/70" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          Stream thousands of blockbusters, indie gems, <br/> and cult classics. Your ultimate cinematic experience starts here.
        </p>

        <div ref={buttonsRef} className="mt-10 flex justify-center flex-wrap gap-4">
          <button
              className="btn-watch flex items-center gap-2 border-4 border-black bg-[#FFD60A] px-8 py-4 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FF4D4D] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#FF4D4D]"
              style={{ fontWeight: 900 }}>
            <TvMinimalPlay className="h-6 w-6 fill-black" />
            Watch Now
          </button>

          <button
              className="btn-browse flex items-center gap-2 border-4 border-black bg-white px-8 py-4 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FFD60A] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_#FFD60A]"
              style={{ fontWeight: 900 }}>
            <List className="h-6 w-6" />
            Browse Collection
          </button>
        </div>

      </div>


    </section>
  );
}
