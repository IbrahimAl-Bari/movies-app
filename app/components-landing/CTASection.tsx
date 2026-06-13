"use client"

import { Play, ArrowRight } from "lucide-react";
import {redirect} from "next/navigation";

export function CTASection() {

  const handleclick = () => {
    redirect("/dashboard")
  }

  const handleclick2 = () => {
    redirect("/learn")
  }


  return (
      <section className="border-b-[6px] border-black px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-block -rotate-2 border-4 border-black bg-[#FF4D4D] px-6 py-3 shadow-[6px_6px_0px_0px_#000000]">
            <span className="font-black uppercase tracking-tight text-black" style={{ fontWeight: 900 }}>Limited Offer</span>
          </div>

          <h2 className="mb-6 font-black uppercase leading-none tracking-tight text-white" style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 0.9 }}>
            Ready To Start Your Cinematic Journey?
          </h2>

          <p className="mb-10 font-bold text-white/70" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Join thousands of movie lovers. Stream unlimited films for free for 30 days.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
                onClick={handleclick}
                className="flex items-center gap-2 border-[6px] border-black bg-[#FFD60A] px-10 py-5 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FF4D4D] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0px_0px_#FF4D4D]" style={{ fontWeight: 900, fontSize: '1.25rem' }}>
              <Play className="h-7 w-7 fill-current" />
              Start For Free
            </button>

            <button
                onClick={handleclick2}
                className="flex items-center gap-2 border-[6px] border-black bg-white px-10 py-5 font-black uppercase tracking-tight text-black shadow-[8px_8px_0px_0px_#FFD60A] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0px_0px_#000000]" style={{ fontWeight: 900, fontSize: '1.25rem' }}>
              Learn More
              <ArrowRight className="h-7 w-7" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <div className="border-4 border-black bg-white px-6 py-3">
              <p className="font-black uppercase text-black" style={{ fontWeight: 900 }}>
                <span style={{ fontSize: '2rem' }}>10K+</span>
                <br />
                Movies
              </p>
            </div>
            <div className="border-4 border-black bg-[#FF4D4D] px-6 py-3">
              <p className="font-black uppercase" style={{ fontWeight: 900 }}>
                <span style={{ fontSize: '2rem' }}>4K</span>
                <br />
                Quality
              </p>
            </div>
            <div className="border-4 border-black bg-[#FFD60A] px-6 py-3">
              <p className="font-black uppercase text-[#FF4D4D]" style={{ fontWeight: 900 }}>
                <span style={{ fontSize: '2rem' }}>24/7</span>
                <br />
                Streaming
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}