'use client'

import {useEffect, useState} from 'react'
import { createClient } from '@/app/utils/supabase/client'
import { CircleAlert } from 'lucide-react'

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault()

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const supabase = createClient()

            const { error } = await supabase.auth.updateUser({
                password,
            })

            if (error) {
                setError(error.message)
            } else {
                setSuccess('Password updated successfully!')

                setTimeout(() => {
                    window.location.href = '/'
                }, 3000)
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="w-screen min-h-screen bg-[#111111] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[#FF4D4D] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_#FFD60A] p-5">

                <h2 className="text-3xl font-bold text-black mb-6">
                    Set New Password
                </h2>

                {error && (
                    <div className="bg-yellow-300 border-2 border-black p-3 font-bold mb-4 flex justify-between">
                        {error}
                        <CircleAlert />
                    </div>
                )}

                {success && (
                    <div className="bg-green-400 border-2 border-black p-3 font-bold mb-4">
                        {success}, you will directed to home in 3 seconds
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="New password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-[#111111] text-white border border-[#FFD60A] rounded-lg"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full py-3 bg-white text-black font-bold rounded-lg"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </section>
    )
}