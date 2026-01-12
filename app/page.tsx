'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Play, Sparkles, Zap, Globe, Users, Wand2, Video, ArrowRight, Check, Star } from 'lucide-react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter">
            UGC<span className="text-cyan-400">AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-cyan-400 transition">Features</a>
            <a href="#pricing" className="text-sm hover:text-cyan-400 transition">Pricing</a>
            <a href="#demo" className="text-sm hover:text-cyan-400 transition">Demo</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm hover:text-cyan-400 transition">
              Login
            </Link>
            <Link href="/signup" className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">Generate Videos in Under 3 Minutes</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
            Create AI Videos<br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              That Feel Real
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Generate lifelike influencer-style videos where AI avatars hold and talk about your products. 
            Ready for TikTok, Reels, and Meta ads instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-2">
              Start Creating Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-lg hover:bg-white/5 transition-all flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Video Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2">
                    <Play className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-left">Sample Video {i}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 pt-20 border-t border-white/10">
            <div>
              <div className="text-4xl font-black text-cyan-400 mb-2">10K+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-400 mb-2">2.5min</div>
              <div className="text-sm text-gray-400">Avg Generation Time</div>
            </div>
            <div>
              <div className="text-4xl font-black text-cyan-400 mb-2">$1M+</div>
              <div className="text-sm text-gray-400">Revenue Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Powerful Features.<br />
              <span className="text-cyan-400">Simple to Use.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to create stunning UGC videos that convert
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: "UGC Studio",
                description: "Generate full ad videos in minutes with AI actors holding your products"
              },
              {
                icon: Users,
                title: "Actor Library",
                description: "Choose from 100+ realistic AI avatars or create your own"
              },
              {
                icon: Wand2,
                title: "Magic Editor",
                description: "Customize backgrounds, lighting, and framing with no post-production"
              },
              {
                icon: Globe,
                title: "35+ Languages",
                description: "Reach global audiences with multilingual voiceovers and subtitles"
              },
              {
                icon: Zap,
                title: "AI Clone",
                description: "Create unlimited content with a clone that matches your look and voice"
              },
              // {
              //   icon: Sparkles,
              //   title: "Skin Enhancer",
              //   description: "Fix overly smooth AI skin for perfect realism in every frame"
              // }
            ].map((feature, i) => (
              <div key={i} className="group p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl hover:border-cyan-500/50 transition-all hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
      <section className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Create Videos in<br />
              <span className="text-cyan-400">3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Select Actor",
                description: "Choose from our library or generate a custom AI avatar"
              },
              {
                step: "02",
                title: "Write Script",
                description: "AI helps you create high-converting ad scripts instantly"
              },
              {
                step: "03",
                title: "Generate Video",
                description: "Get your realistic UGC video in under 3 minutes"
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4">{item.step}</div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 rounded-3xl p-8 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xl font-black mb-6">
                    {i + 1}
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
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Simple Pricing.<br />
              <span className="text-cyan-400">No Hidden Fees.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "49",
                videos: "27 videos/month",
                features: ["100 images", "35+ languages", "UGC Studio", "AI Avatar Generator", "Product Holding"]
              },
              {
                name: "Growth",
                price: "99",
                videos: "60 videos/month",
                features: ["200 images", "35+ languages", "UGC Studio", "AI Clone", "Magic Editor", "Priority Support"],
                popular: true
              },
              {
                name: "Pro",
                price: "139",
                videos: "125 videos/month",
                features: ["350 images", "35+ languages", "All Features", "Unlimited AI Clones", "White Label", "API Access"]
              }
            ].map((plan, i) => (
              <div key={i} className={`relative p-8 rounded-3xl border-2 transition-all hover:scale-105 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500' 
                  : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/50'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-xl font-bold mb-2">{plan.name}</div>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-black">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <div className="text-cyan-400 font-semibold mb-8">{plan.videos}</div>
                
                <Link href="/signup" className={`block w-full py-3 rounded-full font-semibold text-center mb-8 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}>
                  Get Started
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-3xl p-12 md:p-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              Ready to Create<br />
              <span className="text-cyan-400">Something Amazing?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators and brands using AI to scale their content
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all">
              Start Free Trial
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
              <div className="text-2xl font-black tracking-tighter mb-4">
                UGC<span className="text-cyan-400">AI</span>
              </div>
              <p className="text-sm text-gray-400">
                Create realistic AI videos for TikTok, Reels, and Meta ads in minutes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-cyan-400 transition">Features</a></div>
                <div><a href="#" className="hover:text-cyan-400 transition">Pricing</a></div>
                <div><a href="#" className="hover:text-cyan-400 transition">Demo</a></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-cyan-400 transition">About</a></div>
                <div><a href="#" className="hover:text-cyan-400 transition">Blog</a></div>
                <div><a href="#" className="hover:text-cyan-400 transition">Careers</a></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#" className="hover:text-cyan-400 transition">Privacy</a></div>
                <div><a href="#" className="hover:text-cyan-400 transition">Terms</a></div>
                <div><a href="#" className="hover:text-cyan-400 transition">Contact</a></div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            © 2024 UGC AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}