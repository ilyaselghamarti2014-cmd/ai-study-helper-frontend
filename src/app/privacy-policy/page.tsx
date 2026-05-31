import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - AI Study Helper',
  description: 'AI Study Helper Privacy Policy - Learn how we collect, use, and protect your personal information. Your privacy is our priority.',
  openGraph: {
    title: 'Privacy Policy - AI Study Helper',
    description: 'Learn how we collect, use, and protect your personal information.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              AI Study Helper ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered learning platform.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong className="text-gray-900 dark:text-white">2.1 Personal Information</strong>
              <br />
              We collect information you provide directly, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Study materials and notes you upload</li>
              <li>Chat messages and interactions with our AI</li>
            </ul>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong className="text-gray-900 dark:text-white">2.2 Automatically Collected Information</strong>
              <br />
              We automatically collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Usage patterns and interactions</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
              <li>Provide and improve our AI learning services</li>
              <li>Personalize your learning experience</li>
              <li>Process your study materials and generate content</li>
              <li>Communicate with you about our services</li>
              <li>Analyze usage patterns to improve our platform</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
              <li><strong className="text-gray-900 dark:text-white">Service Providers:</strong> Third-party services that help us operate our platform</li>
              <li><strong className="text-gray-900 dark:text-white">Google AdSense:</strong> For displaying personalized advertisements</li>
              <li><strong className="text-gray-900 dark:text-white">Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We never sell your personal information to third parties.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Cookies and Advertising</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Display personalized advertisements through Google AdSense</li>
              <li>Improve our services and user experience</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You can control cookies through your browser settings. However, disabling cookies may affect your experience on our platform.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Google AdSense</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We use Google AdSense to display advertisements on our platform. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings or the Network Advertising Initiative opt-out page.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal data</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              <strong>Email:</strong> quicklearn.ai.study.helper@gmail.com<br />
              <strong>Website:</strong> <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
