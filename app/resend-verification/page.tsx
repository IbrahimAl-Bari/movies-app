'use client'

import { useState } from 'react'
import { MailCheck, CircleAlert, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ResendVerificationPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const res = await fetch(
                '/api/auth/resend-verification',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            )

            const data = await res.json()

            if (data.error) {
                setError(data.error)
            } else {
                setSuccess(
                    'Verification email sent! Check your inbox.'
                )
            }
        } catch {
            setError('Something went wrong.')
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
                        <MailCheck size={34} />
                    </div>

                    <h1 className="text-4xl font-bold text-black">
                        Verify Your Email
                    </h1>

                    <p className="text-black/70 mt-2">
                        Didn't receive the email? We'll send a new one.
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
                            required
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="@example.com"
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
                            : 'Resend Verification'}
                    </button>
                </form>
            </div>
        </section>
    )
}