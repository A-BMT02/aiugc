'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)


  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#0f1419] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4">
            Join 1,000+ businesses{' '}
            <span className="text-gray-400">going viral with AI avatars</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Quote Icon */}
            <div className="text-6xl md:text-7xl text-blue-500 font-serif leading-none">
              "
            </div>

            {/* Review Text */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
              {currentTestimonial.review}
            </p>

            {/* Author Info */}
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                {currentTestimonial.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-gray-400">
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
                    <span className="text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {currentTestimonial.badge}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/10 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-blue-500 hover:bg-blue-500/10 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Pagination Dots */}
              <div className="flex gap-2 ml-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-blue-500 w-8'
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
    </section>
  )
}