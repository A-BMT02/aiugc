'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'

const testimonials = [
  {
    name: "Federico Polon",
    revenue: "$2.6M/year",
    company: "Guerra Lights",
    review: "We run a fairly large ecommerce store and test a lot of creative tools. Blobbi is one of the few AI UGC platforms that actually saved us time without hurting performance. The videos feel native, not \"AI-ish\", that was our main problem we encountered while testing similar tools, but with Blobbi we were able to launch new creatives in minutes instead of days. Solid product if you're scaling ads.",
    image: "https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Federico-Image.jpg"
  },
  {
    name: "Daniel Kaspyan",
    revenue: "$2.4M/year",
    company: "Bau Shopping",
    review: "Running a serious online business means you care about speed and ROI. Blobbi gave us both. We're able to spin up multiple UGC-style ads per product, test faster, and cut creative costs significantly. It's now part of our core ad stack.",
    image: "https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Daniel-Image.png",
    badge: "Sold a brand for $10M"
  } , 
  {
    name: "Sarah Mitchell",
    title: "CMO",
    company: "Luna Skincare",
    revenue: "$3.2M/year",
    image : "https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Sarah-Image.png" ,
    review: "Before Blobbi, we'd wait 2-3 weeks for creator content. Now we test 10+ video concepts every Monday morning. Our winning ads are live by Tuesday. Speed is everything in paid social."
  }
]

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signInWithGoogle } = useAuth()
  
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  // Auto-swipe testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Show loading while checking
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // Don't show login/signup if already logged in
  if (user) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(email, password)
      router.push('/dashboard')
      
    } catch (err) {
      console.error('Login error:', err)
      
      if (err.message.includes('Invalid login credentials')) {
        setError('Invalid email or password')
      } else if (err.message.includes('Email not confirmed')) {
        setError('Please verify your email before signing in')
      } else {
        setError(err.message || 'Failed to sign in')
      }
    } finally {
      setIsLoading(false)
    }
  }

  
  // google login
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      
      const { data, error } = await signInWithGoogle()
      
      if (error) {
        console.error('❌ Sign in error:', error)
        alert('Failed to sign in: ' + error.message)
      } else {
        console.log('✅ Sign in initiated:', data)
      }
    } catch (error) {
      console.error('❌ Error:', error)
      alert('Failed to sign in: ' + error.message)
      setIsLoading(false)
    }
  }

  const goToPrevious = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const currentTestimonial = testimonials[currentTestimonialIndex]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row pt-8 lg:pt-12">
        {/* Left Side - Testimonials */}
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-green-900/20 via-black to-purple-900/20 px-6 py-8 xl:px-12 xl:py-12 flex-col justify-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10 max-w-xl mx-auto w-full">
            {/* Testimonial Content */}
            <div className="space-y-8">
              {/* Image */}
              <div className="relative">
                <div className="aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Quote Icon */}
              <div className="text-5xl text-green-500 font-serif leading-none">
                "
              </div>

              {/* Review Text */}
              <p className="text-base xl:text-lg text-gray-300 leading-relaxed">
                {currentTestimonial.review}
              </p>

              {/* Author Info */}
              <div className="space-y-2">
                <h3 className="text-xl xl:text-2xl font-bold">
                  {currentTestimonial.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                  <span className="font-medium">
                    {currentTestimonial.title ? currentTestimonial.title : `Founder, ${currentTestimonial.company}`}
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="text-green-400 font-semibold">
                    {currentTestimonial.revenue}
                  </span>
                  {currentTestimonial.badge && (
                    <>
                      <span className="text-gray-600">•</span>
                      <span className="text-xs bg-white/5 px-2 py-1 rounded-full border border-white/10">
                        {currentTestimonial.badge}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={goToPrevious}
                  className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-green-500 hover:bg-green-500/10 transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNext}
                  className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-green-500 hover:bg-green-500/10 transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Pagination Dots */}
                <div className="flex gap-2 ml-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonialIndex
                          ? 'bg-green-500 w-6'
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <img
                src="/blobbi-logo-green500-exact.png"
                alt="Blobbi"
                className="h-10 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  blobbi<span className="text-green-400">.</span>
                </h1>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back</h2>
              <p className="text-sm sm:text-base text-gray-400">Sign in to continue creating</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 sm:py-3.5 px-4 bg-white text-black rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition mb-6 text-sm sm:text-base"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="hidden sm:inline">Continue with Google</span>
                  <span className="sm:hidden">Sign in with Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">or sign in with email</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-green-500 focus:outline-none disabled:opacity-50 transition text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs sm:text-sm font-semibold">Password</label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs sm:text-sm text-green-400 hover:text-green-300 transition"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-green-500 focus:outline-none disabled:opacity-50 transition text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white disabled:opacity-50 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-green-500 focus:ring-green-500 focus:ring-offset-0 disabled:opacity-50"
                />
                <label htmlFor="remember" className="text-xs sm:text-sm text-gray-400">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-sm sm:text-base transition shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center text-xs sm:text-sm text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link href="/signup" className="text-green-400 hover:text-green-300 font-semibold transition">
                Sign up
              </Link>
            </p>

            {/* Help Text */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-center text-gray-500">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-gray-400 hover:text-gray-300 transition">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-gray-400 hover:text-gray-300 transition">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Main Content */}
    </div>
  )
}