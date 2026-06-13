"use client";

import React, {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger)

export interface CardData {
    id: number;
    title: string;
    description: string;
    color: string;
    textColor: string;
}

const card1: CardData  = {
        id: 1,
        title: "Movies",
        description:
            "Explore trending films, timeless classics, and hidden gems from every genre.",
        color: "#FF4D4D",
        textColor: "#FFFFFF",
    };
const card2: CardData  = {
        id: 2,
        title: "Series",
        description:
            "Binge-worthy shows, ongoing stories, and top-rated series curated for you.",
        color: "#FFD60A",
        textColor: "#111111",
    };
const card3: CardData  = {
        id: 3,
        title: "Blogs",
        description:
            "Read insights, reviews, and deep dives into the entertainment world.",
        color: "#FFFFFF",
        textColor: "#111111",
    };
const card4: CardData  = {
        id: 4,
        title: "Everything",
        description:
            "All movies, series, and blogs combined into one seamless experience.",
        color: "#111111",
        textColor: "#FFFFFF",
    };



interface StackCardProps {
    card: CardData;
    index: number;
    total: number;
}

function StackCard({ card, index, total }: StackCardProps) {
    return (
        <div
            className=" inset-0 top-50 rounded-[40px] m-10 overflow-hidden shadow-2xl"
            style={{
                backgroundColor: card.color,
            }}>

            <div className="relative h-full flex flex-col justify-between p-10 md:p-16">

                <div
                    className="absolute right-6 top-0 text-[10rem] md:text-[16rem] font-black opacity-10 leading-none select-none"
                    style={{ color: card.textColor }}
                >
                    {String(card.id).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                    <span
                        className="uppercase tracking-[0.35em] text-xs font-semibold"
                        style={{ color: card.textColor }}
                    >
                        Category
                    </span>

                    <h2
                        className="mt-4 text-5xl md:text-7xl font-black"
                        style={{ color: card.textColor }}
                    >
                        {card.title}
                    </h2>

                    <p
                        className="mt-6 max-w-xl text-lg leading-relaxed opacity-80"
                        style={{ color: card.textColor }}
                    >
                        {card.description}
                    </p>
                </div>

                <div className="relative mt-2 z-10">
                    <div
                        className="h-2 rounded-full"
                        style={{
                            backgroundColor:
                                card.color === "#111111"
                                    ? "rgba(255,255,255,.15)"
                                    : "rgba(17,17,17,.15)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default function StackSection() {


    return (
        <section className="relative bg-[#111111] flex items-center justify-center">

            <div className="relative mt-50 w-[90vw] max-w-6xl h-full">
                <StackCard
                    key={10}
                    card={card1}
                    index={1}
                    total={4} />

                <StackCard
                    key={20}
                    card={card2}
                    index={2}
                    total={4} />

                <StackCard
                    key={30}
                    card={card3}
                    index={3}
                    total={4} />
                <StackCard
                    key={40}
                    card={card4}
                    index={4}
                    total={4} />
            </div>
        </section>
    );
}