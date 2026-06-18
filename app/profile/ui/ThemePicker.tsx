"use client"

import {useEffect, useState, useTransition} from "react"
import { useRouter } from "next/navigation"
import { themes } from "@/app/lib/themes"
import { setTheme } from "@/app/lib/theme"
import { Check } from "lucide-react"

type Props = {
    userId: string
    currentTheme: string
}

export default function ThemePicker({
                                        userId,
                                        currentTheme,
                                    }: Props) {
    const router = useRouter()

    const [selected, setSelected] = useState(currentTheme)
    const [isPending, startTransition] = useTransition()

    const handleThemeChange = async (themeKey: string) => {
        setSelected(themeKey)

        startTransition(async () => {
            await setTheme(userId, themeKey)
            router.refresh()
        })
    }

    useEffect(() => {
        setSelected(currentTheme)
    }, [currentTheme])

    return (
        <div className="mt-5">
            <h3 className="font-black mb-3 text-sm uppercase tracking-wide">
                Profile Theme
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(themes).map(([key, theme]) => (
                    <button
                        key={key}
                        disabled={isPending}
                        onClick={() => handleThemeChange(key)}
                        className={`
                            relative overflow-hidden rounded-xl border-2
                            transition-all duration-200 hover:scale-[1.03]
                            ${selected === key
                            ? "border-white"
                            : "border-white/10"}
                        `}
                    >
                        {/* Banner Preview */}
                        <div
                            className="h-10"
                            style={{
                                background: `linear-gradient(90deg, ${theme.bannerFrom}, ${theme.bannerTo})`,
                            }}
                        />

                        {/* Card Preview */}
                        <div
                            className="p-3"
                            style={{
                                backgroundColor: theme.surface,
                            }}
                        >
                            <div className="flex gap-1 mb-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: theme.accent,
                                    }}
                                />

                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: theme.accent2,
                                    }}
                                />
                            </div>

                            <p
                                className="text-xs font-bold capitalize"
                                style={{
                                    color: theme.text,
                                }}
                            >
                                {key}
                            </p>
                        </div>

                        {selected === key && (
                            <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                                <Check size={14} />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}