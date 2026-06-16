
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Suspense} from "react";
import Loading from "@/app/loading";
import {Navigation} from "@/app/components/Navigation";
import {Footer} from "@/app/components/Footer";

export const metadata: Metadata = {
    title: {
        default: "Cinematix",
        template: "%s | Cinematix",
    },
    description:
        "Discover movies, explore trailers, and find your next favorite film with Cinematix.",
    keywords: [
        "movies",
        "films",
        "cinema",
        "trailers",
        "watch movies",
        "movie database",
    ],
    creator: "ibrahim",

    openGraph: {
        title: "Cinematix",
        description:
            "Discover movies, explore trailers, and find your next favorite film.",
        url: "https://your-domain.com",
        siteName: "Cinematix",
        type: "website",
    },

    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`h-full antialiased`}>
        <body className="min-h-full flex flex-col">

        <main className="relative overflow-hidden">
            <Navigation />
            <Suspense fallback={<Loading />}>
                {children}
                <Footer />
            </Suspense>
        </main>


        </body>
        </html>
    );
}