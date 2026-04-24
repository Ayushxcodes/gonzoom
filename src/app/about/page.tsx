export default function AboutPage(){
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">About Gonzoom</h1>
      <p className="text-lg text-gray-700 mb-4">Gonzoom is an independent multimedia publication focused on community-sourced reporting and evidence. We prioritize verifiable submissions, thoughtful editorial workflows, and accessible storytelling across text and audio.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Our approach</h2>
      <p className="text-sm text-gray-700">We combine journalism best practices with community contributions. Contributors can submit stories, documents, photos, and audio; editors review and verify before publication.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contribute</h2>
      <p className="text-sm text-gray-700">If you have a tip, document, or audio evidence, please <a href="/contribute" className="text-blue-600">contribute</a> — you can submit anonymously if needed.</p>
    </main>
  )
}
