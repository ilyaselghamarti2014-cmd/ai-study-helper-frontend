import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AI Study Helper',
  description: 'AI Study Helper Terms of Service - Read our terms and conditions for using our AI-powered learning platform.',
  alternates: {
    canonical: 'https://ai-study-helper-frontend-zeta.vercel.app/terms',
  },
  openGraph: {
    title: 'Terms of Service - AI Study Helper',
    description: 'Read our terms and conditions for using our AI-powered learning platform.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - AI Study Helper',
    description: 'Read our terms and conditions for using our AI-powered learning platform.',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              By accessing and using AI Study Helper ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              AI Study Helper is an AI-powered learning platform that provides educational tools including document summarization, quiz generation, flashcard creation, and AI chat assistance. The Service is provided "as is" without warranties of any kind.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong className="text-gray-900 dark:text-white">3.1 Account Creation</strong>
              <br />
              To use certain features of the Service, you must create an account. You agree to provide accurate, current, and complete information during registration.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong className="text-gray-900 dark:text-white">3.2 Account Security</strong>
              <br />
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong className="text-gray-900 dark:text-white">3.3 Account Termination</strong>
              <br />
              We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Use the Service to harass, abuse, or harm others</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Submit content that is copyrighted without permission</li>
              <li>Use the Service for academic dishonesty or cheating</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Content and Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong className="text-gray-900 dark:text-white">5.1 Your Content</strong>
              <br />
              You retain ownership of any content you upload or create using the Service. By uploading content, you grant us a license to use, process, and store your content solely to provide the Service to you.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong className="text-gray-900 dark:text-white">5.2 AI-Generated Content</strong>
              <br />
              Content generated by our AI is provided for your personal, non-commercial use. You may not claim copyright over AI-generated content or use it for commercial purposes without explicit permission.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong className="text-gray-900 dark:text-white">5.3 Our Content</strong>
              <br />
              The Service, including its design, text, graphics, and software, is protected by intellectual property laws. You may not copy, modify, or distribute our content without prior written consent.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Your use of the Service is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the Service, you agree to the collection and use of your information as described in our Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Advertising</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The Service may display advertisements through Google AdSense. By using the Service, you agree that such advertisements are a necessary part of the Service. We are not responsible for the content of third-party advertisements.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">10. Indemnification</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You agree to indemnify and hold harmless AI Study Helper and its affiliates from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">11. Modifications to Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We reserve the right to modify, suspend, or discontinue the Service at any time without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after such modifications constitutes your acceptance of the new Terms.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which AI Study Helper is registered, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              <strong>Email:</strong> quicklearn.ai.study.helper@gmail.com<br />
              <strong>Website:</strong> <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</a>
            </p>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
            <a href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">About Us</a>
            <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
