'use client'

import React, { useState } from 'react'
import { CircleAlert, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (data.error) {
                setError(data.error)
            } else {
                setSuccess(
                    'Password reset email sent! Check your inbox and spam folder.'
                )
            }
        } catch {
            setError('Something went wrong. Please try again.')
        }

        setLoading(false)
    }

    return (
        <section className="relative overflow-hidden border-b-[6px] pb-10 w-screen min-h-screen border-black bg-[#111111] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#FF4D4D] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_#FFD60A] p-5">

                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-black font-bold hover:underline mb-6"
                >
                    <ArrowLeft size={18} />
                    Back to Login
                </Link>

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-[#FFD60A] border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={34} />
                    </div>

                    <h2 className="text-4xl font-bold text-black">
                        Forgot Password?
                    </h2>

                    <p className="text-black/70 mt-2">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>

                {error && (
                    <div className="bg-yellow-300 border-2 border-black rounded-lg p-3 font-bold text-black mb-4 flex items-center justify-between">
                        {error}
                        <CircleAlert size={18} />
                    </div>
                )}

                {success && (
                    <div className="bg-green-400 border-2 border-black rounded-lg p-3 font-bold text-black mb-4">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="@example.com"
                            required
                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#FFD60A] rounded-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition disabled:bg-gray-400"
                    >
                        {loading
                            ? 'Sending...'
                            : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </section>
    )
}