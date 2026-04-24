import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function NewsletterPage(){
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h1>
        <p className="mb-4 text-sm text-slate-700">Get the week's top reporting and exclusive dispatches.</p>

        <form action="/api/newsletter" method="post" className="flex gap-2">
          <input name="email" type="email" placeholder="you@example.com" required className="flex-1 rounded border px-3 py-2" />
          <button className="rounded bg-slate-900 px-4 py-2 text-white">Subscribe</button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
