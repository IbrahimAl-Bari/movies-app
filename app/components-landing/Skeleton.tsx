import React from "react";
import { cn } from "@/app/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "rect" | "circle" | "text";
}

export function Skeleton({ className, variant = "rect" }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-white/10",
                variant === "circle" && "rounded-full",
                variant === "rect" && "rounded-none",
                variant === "text" && "rounded-sm",
                className
            )}
        />
    );
}

export function BoardSkeleton() {
    return (
        <div className="relative w-full h-175 overflow-hidden bg-[#0f0f12] flex items-center justify-center">
            <div className="absolute inset-0 bg-[#111111]" />
            <div className="text-center z-10">
                <Skeleton variant="text" className="h-12 w-64 mx-auto mb-4" />
                <Skeleton variant="text" className="h-4 w-32 mx-auto" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="w-45 h-60 rounded-[10px] border-r-10 border-b-10 border-black bg-white/5"
                    />
                ))}
            </div>
        </div>
    );
}

export function CategoriesSkeleton() {
    return (
        <section className="border-b-[6px] border-black bg-[#111111] px-6 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="text-center mb-8">
                    <Skeleton className="h-10 w-32 mx-auto mb-4 border-4 border-black" />
                    <Skeleton variant="text" className="h-12 w-64 mx-auto" />
                </div>
                <div className="h-125 relative">
                    <Skeleton className="h-full w-full" />
                </div>
            </div>
        </section>
    );
}