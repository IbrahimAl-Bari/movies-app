import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { Footer } from "./components/Footer";
import ShowCase from "@/app/components/ShowCase";
import gsap from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import {CTASection} from "@/app/components/CTASection";
import SeriesCase from "@/app/components/SeriesCase";
import Board from "@/app/components/Board";
import Stack from "@/app/components/Stack";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP)

export default function App() {
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