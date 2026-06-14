"use client";

import CircularGallery from "./CircularGallery";
import { ErrorBoundary } from "./ErrorBoundary";

export function CategoriesClient({ items }: { items: any[] }) {
    return (
        <section className="border-b-[6px] border-black bg-[#111111] px-6 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <div className="mb-4 inline-block border-4 border-black bg-[#FFD60A] px-4 py-2 shadow-[4px_4px_0px_0px_#FF4D4D]">
                        <span className="font-black uppercase tracking-tight">Explore</span>
                    </div>
                    <h2 className="font-black uppercase leading-none tracking-tight text-white text-[3rem]">
                        Browse By Genre
                    </h2>
                </div>

                <div style={{ height: "500px", position: "relative" }}>
                    <ErrorBoundary>
                        <CircularGallery
                            items={items}
                            bend={1}
                            textColor="#ffffff"
                            borderRadius={0.05}
                            scrollEase={0.05}
                            scrollSpeed={2}
                        />
                    </ErrorBoundary>
                </div>
            </div>
        </section>
    );
}