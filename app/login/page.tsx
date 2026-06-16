'use client'

import { useState, useActionState } from 'react'
import { login } from '@/app/login/actions'
import { signup } from '@/app/signup/actions'
import { CircleAlert } from "lucide-react"

function SubmitButton({ isSignUp, pending }: { isSignUp: boolean, pending: boolean }) {
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            {pending ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>
    )
}

export default function AuthForm() {

    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const action = isSignUp ? signup : login
    const [state, formAction] = useActionState(action, null, isSignUp ? "signup" : "login")

    return (
        <section className="relative overflow-hidden border-b-[6px] h-screen w-screen z-0 border-black bg-[#111111]">
            <div className="w-full max-w-md mt-5 p-4 m-auto bg-[#FF4D4D] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_#FFD60A]">

                {/* TITLE */}
                <div className="text-center mb-8">
                    <h3 className="font-bold text-4xl text-black mb-2">
                        {isSignUp ? 'Join Our Collection' : 'Welcome Back'}
                    </h3>
                    <p className="text-black/70 text-[1rem]">
                        {isSignUp
                            ? 'Sign up to start building your watchlist.'
                            : 'Enter your details to access your Cinematix.'}
                    </p>
                </div>

                {/* GLOBAL ERROR */}
                {(state?.error || state?.fieldErrors?.terms) && (
                    <div className="w-full bg-yellow-300 flex gap-2 items-center text-black font-bold px-3 py-2 rounded-lg border-2 border-black mb-4">
                        {state?.error || (state?.fieldErrors?.terms && "You must accept Terms & Conditions")}
                        <CircleAlert className="w-5 h-5" />
                    </div>
                )}

                <form action={formAction} key={isSignUp ? 'signup' : 'login'} className="space-y-5" noValidate>

                    {/* USERNAME */}
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                className={`w-full px-4 py-3 bg-[#111111] text-white border rounded-lg transition-colors
                                ${state?.fieldErrors?.username ? 'border-red-500 placeholder-red-400' : 'border-[#FFD60A]'}`}
                                placeholder={state?.fieldErrors?.username ? 'Required field' : 'username'}
                            />
                        </div>
                    )}

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            className={`w-full px-4 py-3 bg-[#111111] text-white border rounded-lg transition-colors
                            ${state?.fieldErrors?.email ? 'border-red-500 placeholder-red-400' : 'border-[#FFD60A]'}`}
                            placeholder={state?.fieldErrors?.email ? 'Required field' : '@example.com'}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className={`w-full px-4 py-3 pr-20 bg-[#111111] text-white border rounded-lg transition-colors
                                ${state?.fieldErrors?.password ? 'border-red-500 placeholder-red-400' : 'border-[#FFD60A]'}`}
                                placeholder={state?.fieldErrors?.password ? 'Required field' : '*******'}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/70 hover:text-white"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {/* TERMS */}
                    <div className="flex items-end gap-3 ml-2">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="peer hidden"
                        />

                        <label
                            htmlFor="terms"
                            className="w-5 h-5 mt-1 border-2 border-black bg-[#111111] rounded-sm cursor-pointer flex items-center justify-center peer-checked:bg-[#FFD60A] transition"
                        >
                            <svg
                                className="hidden peer-checked:block w-3 h-3 text-black"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M16.7 5.3a1 1 0 010 1.4l-7.2 7.2a1 1 0 01-1.4 0L3.3 9.1a1 1 0 011.4-1.4l3.4 3.4 6.5-6.5a1 1 0 011.4 0z" />
                            </svg>
                        </label>

                        <label htmlFor="terms" className="text-sm text-black/80 cursor-pointer">
                            I agree to the Terms & Conditions
                        </label>
                    </div>

                    {/* BUTTON */}
                    <SubmitButton
                        isSignUp={isSignUp}
                        pending={false}
                    />
                </form>

                {/* SWITCH */}
                <div className="mt-3 text-center text-sm text-black/70">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="ml-2 text-blue-700 hover:underline"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>

            </div>
        </section>
    )
}