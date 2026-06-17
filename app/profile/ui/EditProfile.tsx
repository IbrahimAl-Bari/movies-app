'use client'

import {useState, useActionState, useEffect} from 'react'
import { updateProfile } from '../actions'

interface Props {
    profile: any
}

export default function EditProfile({ profile }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const [state, formAction] = useActionState(updateProfile, null)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen]);

    return (
        <div>
            {/* BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#FFD60A] flex items-center justify-center border-black shadow-[4px_4px_0px_0px_#FF4D4D] border-4 font-black text-black px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
                Edit Profile
            </button>

            {/* MODAL */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="w-full max-w-md bg-[#111111] border-2 border-[#FFD60A] rounded-xl p-5"
                        onClick={(e) => e.stopPropagation()}
                    > <div className="flex items-center justify-between mb-4"> <h2 className="text-xl font-black text-white">
                        Edit Profile </h2>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-white text-xl hover:text-white/80"
                        >
                            ✕
                        </button>
                    </div>

                        <form
                            action={formAction}
                            className="space-y-3"
                        >
                            <input
                                name="username"
                                defaultValue={profile?.username}
                                placeholder="Username"
                                className="w-full p-2 bg-black border border-gray-700 rounded"
                            />

                            <textarea
                                name="bio"
                                defaultValue={profile?.bio}
                                placeholder="Bio"
                                rows={4}
                                className="w-full p-2 bg-black border border-gray-700 rounded"
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#FFD60A] text-black font-black py-2 rounded-lg"
                            >
                                Save Changes
                            </button>

                            {state?.error && (
                                <p className="text-red-400 text-sm">
                                    {state.error}
                                </p>
                            )}

                            {state?.success && (
                                <p className="text-green-400 text-sm">
                                    {state.success}, please refresh to update
                                </p>
                            )}
                        </form>
                    </div>
                </div>

)}

        </div>
    )
}