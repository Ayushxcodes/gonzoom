"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        }) as any

        if (res?.error) {
            setError(res.error)
            return
        }

        router.push("/dashboard")
    }

    return(
        <div className="p-8 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Editor Sign In</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        className="mt-1 block w-full border rounded px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        className="mt-1 block w-full border rounded px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </div>

                {error && <div className="text-red-600">{error}</div>}

                <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">
                    Sign In
                </button>
            </form>
        </div>
    )

}
