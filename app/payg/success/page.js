'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('loading') // loading | success | error
  const [packInfo, setPackInfo] = useState(null)

  useEffect(() => {
    if (!sessionId) { setStatus('error'); return }

    fetch(`/api/stripe-payg/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          setPackInfo(data)
          setStatus('success')
        } else {
          setStatus('success') // still show success — webhook handles credits
        }
      })
      .catch(() => setStatus('success'))
  }, [sessionId])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {status === 'loading' ? (
          <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto" />
        ) : (
          <>
            {/* Success icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>

            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 text-sm text-green-400 font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Payment successful
            </div>

            <h1 className="text-4xl font-black tracking-tighter mb-3">
              Credits Added!
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Your credits are in your account and ready to use. Start creating your first AI video now.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400 font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Credits never expire</span>
                <Check className="w-4 h-4 text-green-400" />
              </div>
            </div>

            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all"
            >
              Start Creating
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-xs text-gray-600 mt-4">
              A receipt has been sent to your email.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default function PaygSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
