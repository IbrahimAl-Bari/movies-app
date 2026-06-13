import { Navigation } from "@/app/components-landing/Navigation";
import Hero from "@/app/components-landing/Hero";
import Categories from "@/app/components-landing/Categories";
import { Footer } from "@/app/components-landing/Footer";
import ShowCase from "@/app/components-landing/ShowCase";
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import {CTASection} from "@/app/components-landing/CTASection";
import SeriesCase from "@/app/components-landing/SeriesCase";
import Board from "@/app/components-landing/Board";
import Stack from "@/app/components-landing/Stack";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)

export default async function App() {

  return (
    <div className="min-h-screen bg-[#111111]">
        <Navigation />
        <Hero />
        <ShowCase />
        <SeriesCase />
        <Board />
        <Categories />
        <Stack />
        <CTASection />
        <Footer />
    </div>
  );
}