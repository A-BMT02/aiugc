import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react'
import Header from '@/components/Header'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Blobbi protects your data. Our Privacy Policy explains what we collect, how we use it, and your rights regarding your personal information.',
  alternates: { canonical: 'https://blobbi.ai/privacy' },
}

export default function PrivacyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold mb-6">
            <Shield className="w-4 h-4" />
            Privacy & Security
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: January 16, 2025</p>
        </div>

        {/* Privacy Highlights */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <Lock className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="font-semibold mb-2">Data Encryption</h3>
            <p className="text-sm text-gray-400">Your data is encrypted in transit and at rest</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <Eye className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="font-semibold mb-2">No Selling</h3>
            <p className="text-sm text-gray-400">We never sell your personal information</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <Database className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="font-semibold mb-2">Minimal Collection</h3>
            <p className="text-sm text-gray-400">We only collect what's necessary</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <UserCheck className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="font-semibold mb-2">Your Control</h3>
            <p className="text-sm text-gray-400">You can delete your data anytime</p>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="space-y-8 text-gray-300">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold text-white mb-3 mt-6">Account Information</h3>
            <p className="mb-4">When you create an account, we collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Profile picture (if provided)</li>
              <li>Authentication credentials</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3 mt-6">Usage Information</h3>
            <p className="mb-4">We automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Device type and operating system</li>
              <li>Browser type and version</li>
              <li>IP address and location (city/country level)</li>
              <li>Pages visited and features used</li>
              <li>Time spent on the platform</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3 mt-6">Content You Create</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Uploaded images and videos</li>
              <li>Scripts and text inputs</li>
              <li>Generated videos and audio</li>
              <li>Editing history and preferences</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Provide the Service:</strong> Process your content, generate videos, and deliver features</li>
              <li><strong className="text-white">Improve the Service:</strong> Analyze usage patterns and optimize performance</li>
              <li><strong className="text-white">Communicate:</strong> Send service updates, security alerts, and support messages</li>
              <li><strong className="text-white">Billing:</strong> Process payments and manage subscriptions</li>
              <li><strong className="text-white">Security:</strong> Detect fraud and prevent abuse</li>
              <li><strong className="text-white">Legal Compliance:</strong> Comply with applicable laws and regulations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Storage and Security</h2>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6 mb-4">
              <p className="text-green-400 font-semibold mb-2">🔒 Security Measures</p>
              <p>
                We implement industry-standard security measures including encryption, secure servers, 
                regular security audits, and access controls to protect your data.
              </p>
            </div>
            <p className="mb-4">Your data is stored:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>On secure cloud servers (Supabase, AWS)</li>
              <li>With end-to-end encryption for sensitive data</li>
              <li>In compliance with GDPR and CCPA requirements</li>
              <li>With regular backups and disaster recovery</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing</h2>
            <p className="mb-4">We share your information only in these cases:</p>
            
            <h3 className="text-lg font-semibold text-white mb-3 mt-6">Service Providers</h3>
            <p className="mb-4">We work with trusted third-party services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Supabase:</strong> Database and authentication</li>
              <li><strong className="text-white">ElevenLabs:</strong> Voice synthesis</li>
              <li><strong className="text-white">Wavespeed:</strong> Video generation</li>
              <li><strong className="text-white">Payment processors:</strong> Billing and subscriptions</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3 mt-6">Legal Requirements</h3>
            <p>We may disclose information if required by law, court order, or government request.</p>

            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 mt-6">
              <p className="text-green-400 font-semibold">✓ We Never Sell Your Data</p>
              <p className="text-sm text-gray-400 mt-2">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights and Choices</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-white">Access:</strong> Request a copy of your data</li>
              <li><strong className="text-white">Correction:</strong> Update incorrect information</li>
              <li><strong className="text-white">Deletion:</strong> Delete your account and data</li>
              <li><strong className="text-white">Export:</strong> Download your content</li>
              <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing emails</li>
              <li><strong className="text-white">Object:</strong> Object to certain data processing</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:privacy@blobbi.com" className="text-green-400 hover:text-green-300">
                privacy@blobbi.com
              </a>
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
            <p className="mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze site traffic and usage</li>
              <li>Improve user experience</li>
            </ul>
            <p className="mt-4">
              You can control cookies through your browser settings. Note that disabling cookies may 
              affect functionality.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
            <p>
              Our Service is not intended for users under 18 years of age. We do not knowingly collect 
              information from children. If you believe a child has provided us with personal information, 
              please contact us immediately.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your data in accordance with 
              this Privacy Policy.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Data Retention</h2>
            <p className="mb-4">We retain your information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>For as long as your account is active</li>
              <li>As needed to provide the Service</li>
              <li>To comply with legal obligations</li>
              <li>Until you request deletion</li>
            </ul>
            <p className="mt-4">
              After account deletion, we may retain some information for legal compliance and 
              fraud prevention for up to 90 days.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant 
              changes via email or through the Service. Your continued use after changes constitutes 
              acceptance of the updated policy.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our data practices:
            </p>
            <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
              <p className="font-semibold text-white mb-4">Blobbi Privacy Team</p>
              <div className="space-y-2 text-gray-400">
                <p>Email: privacy@blobbi.com</p>
                <p>Support: support@blobbi.com</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
            <p className="text-green-400 font-semibold mb-2">Your Privacy Matters</p>
            <p className="text-sm text-gray-400">
              We're committed to protecting your privacy and being transparent about our data practices. 
              If you have any concerns, please don't hesitate to reach out.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}