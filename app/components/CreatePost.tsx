"use client"

import React, { useRef, useState, useTransition } from "react"
import { createFeedPost } from "@/app/lib/createPost"
import { X, Image as ImageIcon } from "lucide-react"

export default function CreatePost({ onSuccess }: { onSuccess?: () => void }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [preview, setPreview] = useState<string | null>(null)

    // Handle Image Preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
        }
    }

    const fileInputRef = useRef<HTMLInputElement>(null) // 1. Add a Ref

    // ... existing states ...

    const handleSubmit = (formData: FormData) => {
        // 2. Explicitly grab the file from the ref and add it to formData
        const file = fileInputRef.current?.files?.[0]
        if (file) {
            formData.set("image", file)
        }

        setError(null)
        startTransition(async () => {
            const result = await createFeedPost(formData)
            if (result?.error) {
                setError(result.error)
            } else {
                setPreview(null)
                formRef.current?.reset()
                onSuccess?.()
            }
        })
    }

    const [content, setContent] = useState("");
    const MAX_CHARS = 200

    return (
        <div className="w-full max-w-2xl mx-auto border-[3px] md:border-4 border-black bg-[#1a1a1a] shadow-[6px_6px_0px_0px_#FFD60A] p-4 md:p-6">

            <div className={"flex justify-between items-center"}>
                <h3 className="text-white font-black uppercase text-xl mb-4">Drop a Post</h3>
                <h4 className={` ${content.length >= MAX_CHARS ? "text-red-500" : "text-gray-400"}`}>{content.length} / {MAX_CHARS}</h4>
            </div>

            <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    name="content" rows={4} required disabled={isPending}
                    maxLength={200}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (value.length <= MAX_CHARS) {
                            setContent(value);
                        } else {
                            setContent(value.slice(0, MAX_CHARS));
                        }
                    }}
                    placeholder="What are your thoughts today?"
                    className="w-full bg-[#111111] border-2 border-black p-3 text-white font-bold resize-none focus:outline-none focus:border-[#FFD60A]"
                />

                {/* IMAGE PREVIEW AREA */}
                {preview && (
                    <div className="relative w-full h-48 border-2 border-black overflow-hidden bg-black">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => setPreview(null)}
                            className="absolute top-2 right-2 bg-[#FF4D4D] p-1 text-white border-2 border-black cursor-pointer rounded-xl"
                        >
                            <X className="w-4 h-4 text-black" />
                        </button>
                    </div>
                )}

                <label className="cursor-pointer flex items-center gap-2 text-xs font-black uppercase text-[#FFD60A] border-2 border-[#FFD60A] p-2 hover:bg-[#FFD60A] hover:text-black transition-all">
                    <ImageIcon size={16} />
                    {preview ? "Change Image" : "Attach Image"}
                    <input ref={fileInputRef} type="file" name="image" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>

                {error && <div className="bg-red-500 text-black font-black p-2 text-xs">{error}</div>}

                <button type="submit" disabled={isPending} className="bg-[#FFD60A] cursor-pointer text-black font-black uppercase py-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] active:shadow-none transition-all">
                    {isPending ? "Uploading..." : "Post"}
                </button>
            </form>
        </div>
    )
}