export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-purple-500 to-pink-500">
      <h1 className="text-6xl font-bold text-white mb-4">
        AI UGC Video Platform
      </h1>
      <p className="text-xl text-white/80">
        Speel Competitor - Coming Soon
      </p>
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition">
          Get Started
        </button>
        <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition">
          Watch Demo
        </button>
      </div>
    </main>
  )
}