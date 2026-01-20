'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, Sparkles, Zap, Globe, Users, Wand2, Video, ArrowRight, Check, Loader2, Star, Shield, Rocket } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { loadStripe } from '@stripe/stripe-js'
import { getSupabase } from '@/lib/supabase'
import PricingSection from '@/components/PricingSection'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Home() {
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubscribe = async (planName: string, priceId: string) => {
    if (!user) {
      window.location.href = '/signup'
      return
    }

    try {
      setLoadingPlan(planName)

      const supabase = getSupabase()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        alert('Please log in to subscribe')
        window.location.href = '/login'
        return
      }

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId,
          planName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      const stripe = await stripePromise
      
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      alert(error instanceof Error ? error.message : 'Failed to start checkout')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/blobbi-logo-green500-exact.png"
              alt="Blobbi"
              className="h-10 md:h-12 object-contain"
            />
            <span className="text-2xl md:text-3xl font-black tracking-tight">
              blobbi<span className="text-green-400">.</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-green-400 transition">Features</a>
            <a href="#pricing" className="text-sm hover:text-green-400 transition">Pricing</a>
            <a href="#how-it-works" className="text-sm hover:text-green-400 transition">How It Works</a>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard" className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm hover:text-green-400 transition">
                  Sign In
                </Link>
                <Link href="/signup" className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all">
                  Try Free
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center pt-20">
          {/* Blobbi mascot floating */}
          <div className="absolute -top-10 -right-10 hidden lg:block animate-bounce">
            <img
              src="/blobbi-logo-green500-exact.png"
              alt="Blobbi"
              className="h-24 object-contain opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm">Production-Ready Videos in Minutes</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
            AI Video Creation<br />
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              for Brands
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your product marketing with AI avatars that showcase items naturally. 
            Perfect for social media advertising, e-commerce, and brand storytelling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all flex items-center gap-2">
              Begin Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-lg hover:bg-white/5 transition-all">
              Sign In
            </Link>
          </div>

          {/* Video Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Ads/boy_e-commerce-ad.mp4' ,
              'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Ads/boy-day-in-life-ad.mp4' ,
              'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Ads/boy-supplement-ad.mp4' ,
              'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Ads/girl_makeup_ad.mp4',
            ].map((videoUrl, i) => (
              <div key={i} className="aspect-[9/16] rounded-2xl border border-white/10 hover:border-green-500/50 transition-all hover:scale-105 relative overflow-hidden group">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs text-left">Example {i + 1}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 pt-20 border-t border-white/10">
            <div>
              <div className="text-4xl font-black text-green-400 mb-2">15K+</div>
              <div className="text-sm text-gray-400">Happy Creators</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green-400 mb-2">180s</div>
              <div className="text-sm text-gray-400">Average Creation Time</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green-400 mb-2">98%</div>
              <div className="text-sm text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Blobbi in corner */}
          <div className="absolute top-10 right-10 hidden xl:block opacity-30">
            <img
              src="/blobbi-logo-green500-exact.png"
              alt="Blobbi"
              className="h-32 object-contain"
            />
          </div>

          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Everything You Need.<br />
              <span className="text-green-400">Nothing You Don't.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional video creation tools designed for speed and quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: "UGC Studio",
                description: "Select an actor, add your product and get a full ad video in minutes."
              },
              {
                icon: Wand2,
                title: "Add Your Product",
                description: "Make AI avatars naturally hold, wear or interact with your product."
              },
              {
                icon: Users,
                title: "Actor Library",
                description: "Choose from realistic AI actors to suit every audience."
              },
              {
                icon: Sparkles,
                title: "AI Clone",
                description: "Create unlimited content with a clone that matches your look."
              },
              {
                icon: Zap,
                title: "AI Editor",
                description: "Customize backgrounds, lighting, and framing with no post production needed."
              },
              {
                icon: Globe,
                title: "Multi-Language Support",
                description: "Create content in multiple languages with native-sounding voiceovers and localization."
              },
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl hover:border-green-500/50 transition-all hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-white/[0.02] relative">
        <div className="max-w-6xl mx-auto">
          {/* Blobbi mascot */}
          <div className="absolute -bottom-10 left-10 hidden lg:block">
            <img
              src="/blobbi-logo-green500-exact.png"
              alt="Blobbi"
              className="h-40 object-contain opacity-40"
            />
          </div>

          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Your Video Creation<br />
              <span className="text-green-400">Workflow Simplified</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Avatar",
                description: "Pick a digital presenter from our curated collection or customize your own",
                image: "https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Steps/Step1.png",
                aspectRatio: "aspect-square"
              },
              {
                step: "02",
                title: "Customize Your Scene",
                description: "Use Magic Edit to transform the actor, background, and visual elements with simple prompts",
                image: "https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Steps/Step2.png",
                aspectRatio: "aspect-video"
              },
              {
                step: "03",
                title: "Generate & Export",
                description: "Write your script, generate your video, and download it ready for any platform",
                image: "https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Steps/Step3.png",
                aspectRatio: "aspect-[9/16]"
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4">{item.step}</div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 rounded-3xl p-8 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-xl font-black mb-6">
                    {i + 1}
                  </div>
                  
                  {/* Step Image */}
                  <div className={`${item.aspectRatio} w-full mb-6 rounded-xl overflow-hidden border border-white/10 bg-gray-900`}>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection
        handleSubscribe={handleSubscribe} 
        loadingPlan={loadingPlan} 
      />

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Blobbi cheerleader */}
          <div className="absolute -top-5 right-0 hidden md:block animate-pulse">
            <img
              src="/blobbi-logo-green500-exact.png"
              alt="Blobbi"
              className="h-28 object-contain"
            />
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/50 rounded-3xl p-12 md:p-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              Start Creating Today<br />
              <span className="text-green-400">Join Thousands of Creators</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Transform your content strategy with AI-powered video creation that actually works
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/blobbi-logo-green500-exact.png"
                  alt="Blobbi"
                  className="h-8 object-contain"
                />
                <span className="text-xl font-black tracking-tight">
                  blobbi<span className="text-green-400">.</span>
                </span>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered video creation for modern brands and creators.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#features" className="hover:text-green-400 transition">Features</a></div>
                <div><a href="#pricing" className="hover:text-green-400 transition">Pricing</a></div>
                <div><a href="#how-it-works" className="hover:text-green-400 transition">How It Works</a></div>
              </div>
            </div>

            {/* <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-green-400 transition">Documentation</a></div>
                <div><a href="#" className="hover:text-green-400 transition">Tutorials</a></div>
                <div><a href="#" className="hover:text-green-400 transition">Support</a></div>
              </div>
            </div> */}

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="/policy" className="hover:text-green-400 transition">Privacy Policy</a></div>
                <div><a href="/terms" className="hover:text-green-400 transition">Terms of Service</a></div>
                {/* <div><a href="#" className="hover:text-green-400 transition">Contact Us</a></div> */}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-center gap-3 text-sm text-gray-400">
            <img
              src="/blobbi-logo-green500-exact.png"
              alt="Blobbi"
              className="h-5 object-contain opacity-60"
            />
            <span>© 2025 Blobbi. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}