import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16 lg:py-20 mt-20">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400">Last updated: January 16, 2025</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8 text-gray-300">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Blobbi ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Service.
            </p>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of the Service after 
              changes constitutes acceptance of the modified terms.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Blobbi is an AI-powered platform that allows users to create user-generated content (UGC) 
              videos using artificial intelligence technology. The Service includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>AI avatar selection and customization</li>
              <li>Voice synthesis and text-to-speech</li>
              <li>Video generation with lip-sync technology</li>
              <li>Image editing and enhancement tools</li>
              <li>Product placement and background editing</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
            <p className="mb-4">
              To use certain features of the Service, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Content and Usage Rights</h2>
            <p className="mb-4">
              <strong className="text-white">Your Content:</strong> You retain ownership of any content you upload 
              to the Service. By uploading content, you grant us a license to process, store, and use it to provide 
              the Service.
            </p>
            <p className="mb-4">
              <strong className="text-white">Generated Content:</strong> You own the videos and content generated 
              through the Service. However, you are responsible for ensuring your use of generated content complies 
              with applicable laws and third-party rights.
            </p>
            <p className="mb-4">
              <strong className="text-white">Prohibited Uses:</strong> You may not use the Service to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Create deepfakes or misleading content</li>
              <li>Violate any person's rights (privacy, publicity, intellectual property)</li>
              <li>Generate illegal, harmful, or offensive content</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in fraud or deceptive practices</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Payment and Subscriptions</h2>
            <p className="mb-4">
              Some features of the Service may require payment. By subscribing:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You agree to pay all applicable fees</li>
              <li>Subscriptions auto-renew unless canceled</li>
              <li>Refunds are provided according to our refund policy</li>
              <li>We may change pricing with 30 days notice</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              The Service, including its design, features, and underlying technology, is protected by copyright, 
              trademark, and other intellectual property laws. You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Copy, modify, or distribute our software</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Remove any copyright or proprietary notices</li>
              <li>Use our trademarks without permission</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer of Warranties</h2>
            <p className="mb-4">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Uninterrupted or error-free operation</li>
              <li>Accuracy or reliability of generated content</li>
              <li>Fitness for any particular purpose</li>
              <li>Freedom from viruses or harmful components</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL 
              LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
            <p className="mb-4">
              We may suspend or terminate your access to the Service:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>If you violate these Terms</li>
              <li>If you engage in fraudulent activity</li>
              <li>For any other reason with notice</li>
            </ul>
            <p className="mt-4">
              You may terminate your account at any time through your account settings.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="font-semibold text-white">Blobbi Support</p>
              <p className="text-gray-400 mt-2">Email: support@blobbi.com</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500 text-center">
            By using Blobbi, you acknowledge that you have read and understood these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  )
}