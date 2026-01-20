'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

export default function PricingSection({ handleSubscribe, loadingPlan }) {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Start Up",
      monthlyPrice: "49",
      yearlyPrice: "39",
      yearlyTotal: "468",
    //   videos: "27 videos/month",
      priceId: isYearly 
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_YEARLY 
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER_MONTHLY,
      features: ["6 Minute of Videos", "Multiple languages", "UGC Studio", "AI Editor","Multiple Actors" , "Custom Actor" , "Product Holding" , "Priority Support"]
    },
    {
      name: "Growth",
      monthlyPrice: "69",
      yearlyPrice: "59",
      yearlyTotal: "708",
    //   videos: "60 videos/month",
      priceId: isYearly 
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_YEARLY 
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_MONTHLY,
      features: ["11 Minute of Videos", "Multiple languages", "UGC Studio", "AI Editor","Multiple Actors" , "Custom Actor" ,  "Product Holding" , "Priority Support"],
      popular: true
    },
    {
      name: "Pro",
      monthlyPrice: "119",
      yearlyPrice: "99",
      yearlyTotal: "1188",
    //   videos: "125 videos/month",
      priceId: isYearly 
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY 
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
      features: ["21 Minute of Videos", "Multiple languages", "UGC Studio", "AI Editor","Multiple Actors" , "Custom Actor" ,  "Product Holding" , "Priority Support"],
    }
  ]

  return (
    <section id="pricing" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Simple Pricing.<br />
            <span className="text-green-400">No Hidden Fees.</span>
          </h2>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-semibold transition-colors ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 bg-white/10 rounded-full transition-all hover:bg-white/20"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-transform duration-300 ${
                isYearly ? 'translate-x-8' : 'translate-x-0'
              }`} />
            </button>
            
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold transition-colors ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                Yearly
              </span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative p-8 rounded-3xl border-2 transition-all hover:scale-105 ${
              plan.popular 
                ? 'bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500' 
                : 'bg-white/[0.02] border-white/10 hover:border-green-500/50'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-xl font-bold mb-2">{plan.name}</div>
              
              <div className="flex items-baseline mb-1">
                <span className="text-5xl font-black">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              
              {isYearly && (
                <div className="text-sm text-gray-400 mb-2">
                  ${plan.yearlyTotal} billed annually
                </div>
              )}
              
              <div className="text-green-400 font-semibold mb-8">{plan.videos}</div>
              
              <button
                onClick={() => handleSubscribe(plan.name, plan.priceId)}
                disabled={loadingPlan === plan.name}
                className={`block w-full py-3 rounded-full font-semibold text-center mb-8 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  plan.popular
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-500/50'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {loadingPlan === plan.name ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Get Started'
                )}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}