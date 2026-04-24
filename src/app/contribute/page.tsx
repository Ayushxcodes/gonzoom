import { notFound } from "next/navigation"
import React from "react"
import ContributeForm from "@/components/forms/ContributeForm"
import Link from "next/link"
export default function ContributePage(){
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-4">Contribute</h1>
            <p className="mb-6 text-sm text-slate-600">Choose how you'd like to help reporting.</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
                <Link href="/contribute#open" className="block border p-6 rounded">
                    <h3 className="font-semibold">I want to contribute openly</h3>
                    <p className="text-sm text-gray-600 mt-2">Add your name and contact so we can follow up.</p>
                </Link>

                <Link href="/anonymous-submit" className="block border p-6 rounded">
                    <h3 className="font-semibold">I need to submit anonymously</h3>
                    <p className="text-sm text-gray-600 mt-2">No name or contact required — submit a secure tip.</p>
                </Link>
            </div>

            <section id="open">
                <h2 className="text-xl font-semibold mb-4">Open Contribution</h2>
                <ContributeForm />
            </section>
        </main>
    )
}

