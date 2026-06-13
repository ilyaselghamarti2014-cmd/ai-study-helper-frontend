import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - AI Study Helper',
  description: 'Frequently Asked Questions about AI Study Helper. Find answers to common questions about our AI-powered learning platform.',
  alternates: {
    canonical: 'https://ai-study-helper-frontend-zeta.vercel.app/faq',
  },
  openGraph: {
    title: 'FAQ - AI Study Helper',
    description: 'Find answers to common questions about our AI-powered learning platform.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - AI Study Helper',
    description: 'Find answers to common questions about our AI-powered learning platform.',
  },
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is AI Study Helper?',
      answer: 'AI Study Helper is an AI-powered learning platform designed to help students study more effectively. Our tools include document summarization, quiz generation, flashcard creation, and an AI chat assistant to help you learn smarter.',
    },
    {
      question: 'Is AI Study Helper free to use?',
      answer: 'Yes, AI Study Helper offers a free tier with access to basic features. We also offer premium plans with advanced features and higher usage limits for students who need more powerful tools.',
    },
    {
      question: 'How does the AI summarization work?',
      answer: 'Our AI uses advanced natural language processing to analyze your documents and extract key information, main ideas, and important concepts. It then generates a concise summary that helps you understand the content quickly.',
    },
    {
      question: 'Can I use AI Study Helper for any subject?',
      answer: 'Absolutely! AI Study Helper works across all subjects including mathematics, science, history, literature, languages, and more. Our AI is trained on diverse educational content to support various fields of study.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we take data security seriously. Your information is encrypted and protected. We never sell your personal data to third parties. For more details, please read our Privacy Policy.',
    },
    {
      question: 'How accurate are the AI-generated quizzes?',
      answer: 'Our AI generates quizzes based on the content you provide, ensuring relevance and accuracy. While the AI is highly accurate, we always recommend reviewing the generated content for educational purposes.',
    },
    {
      question: 'Can I share my study materials with classmates?',
      answer: 'Yes, AI Study Helper includes collaboration features that allow you to share notes, quizzes, and study materials with classmates. This makes group study sessions more effective.',
    },
    {
      question: 'Does AI Study Helper work on mobile devices?',
      answer: 'Yes, AI Study Helper is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can study anywhere, anytime.',
    },
    {
      question: 'How do the flashcards work?',
      answer: 'Our flashcard system uses spaced repetition algorithms to optimize your learning. The AI can generate flashcards from your notes, and the system schedules reviews based on your performance to maximize retention.',
    },
    {
      question: 'What file formats can I upload?',
      answer: 'AI Study Helper supports various file formats including PDF, DOCX, TXT, and image files for OCR processing. This flexibility allows you to work with materials from different sources.',
    },
    {
      question: 'Can I export my study materials?',
      answer: 'Yes, you can export your summaries, flashcards, and study plans in various formats. This allows you to use your materials offline or share them with others.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team through the Contact page on our website, or email us at support@aistudyhelper.com. We typically respond within 24 hours.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Find answers to common questions about AI Study Helper
          </p>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="p-6 pt-0">
                  <p className="text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-white/90 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </a>
          </div>

          {/* Additional Resources */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Learn More</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="/about" className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">About Us</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Learn about our mission and team.</p>
              </a>
              <a href="/blog" className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Blog</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Read educational articles and study tips.</p>
              </a>
              <a href="/features" className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Features</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Explore all our AI-powered learning tools.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
