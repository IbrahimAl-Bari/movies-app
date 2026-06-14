'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { login } from '@/app/login/actions'
import { signup } from '@/app/signup/actions'

function SubmitButton({ isSignUp }: { isSignUp: boolean }) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            {pending ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </button>
    )
}

export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false)

    return (
        <section className={"relative overflow-hidden border-b-[6px] h-screen w-screen z-0 border-black bg-[#111111]"}>
            <div className="w-full max-w-md mt-5 p-4 m-auto bg-[#FF4D4D] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_#FFD60A]">
                <div className="text-center mb-8">
                    <h3 className="font-bold text-4xl text-black mb-2">
                        {isSignUp ? 'Join Our Collection' : 'Welcome Back'}
                    </h3>
                    <p className="text-black/70" style={{fontSize: "1rem"}}>
                        {isSignUp
                            ? 'Sign up to start building your watchlist.'
                            : 'Enter your details to access your Cinematix.'}
                    </p>
                </div>


                <form action={isSignUp ? signup : login} className="space-y-5">

                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-black mb-1" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required={isSignUp}
                                className="w-full px-4 py-3 bg-[#111111] text-black border border-[#FFD60A] rounded-lg focus:outline-none focus:border-white transition-colors"
                                placeholder="username"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#FFD60A] rounded-lg focus:outline-none focus:border-white transition-colors"
                            placeholder="@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#FFD60A] rounded-lg focus:outline-none focus:border-white transition-colors"
                            placeholder="*******"
                        />
                    </div>

                    <div className="pt-2">
                        <SubmitButton isSignUp={isSignUp} />
                    </div>
                </form>

                <div className="mt-3 text-center text-sm text-black/70">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="ml-2 text-blue-700 hover:underline focus:outline-none"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </section>
    )
}