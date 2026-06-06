import { Metadata } from 'next';
import { 
  MessageSquare, 
  FileText, 
  BookOpen, 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  CheckCircle,
  Sparkles,
  Target,
  Clock,
  BarChart3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features - AI Study Helper',
  description: 'Discover all the powerful features of AI Study Helper - AI-powered learning tools including document summarization, quiz generation, flashcards, and more.',
  alternates: {
    canonical: 'https://ai-study-helper-frontend-zeta.vercel.app/features',
  },
  openGraph: {
    title: 'Features - AI Study Helper',
    description: 'Discover all the powerful features of AI Study Helper.',
    type: 'website',
  },
};

export default function FeaturesPage() {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Chat Assistant',
      description: 'Get instant answers to your study questions with our intelligent AI chat assistant. Available 24/7 to help you understand complex concepts.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileText,
      title: 'PDF Summarizer',
      description: 'Upload lengthy PDFs and get concise, accurate summaries in seconds. Extract key information, main ideas, and important concepts automatically.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: BookOpen,
      title: 'Smart Flashcards',
      description: 'Generate flashcards from any topic with AI. Our spaced repetition system optimizes your learning schedule for maximum retention.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Brain,
      title: 'Quiz Generator',
      description: 'Create practice quizzes from your study materials. Choose difficulty levels and question types to test your knowledge effectively.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Our optimized AI models deliver instant results. No waiting, just learning. Get summaries, quizzes, and flashcards in seconds.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected. We prioritize your privacy and security with industry-standard security measures.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Share notes, quizzes, and study materials with classmates. Work together on group projects and study sessions.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: CheckCircle,
      title: 'OCR Technology',
      description: 'Extract text from images and scanned documents with advanced optical character recognition. Convert physical notes to digital format.',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: Sparkles,
      title: 'Multi-Language Support',
      description: 'Support for multiple languages with accurate translation and localization. Study in your preferred language.',
      color: 'from-violet-500 to-violet-600',
    },
    {
      icon: Target,
      title: 'Adaptive Learning',
      description: 'AI adapts to your learning style and pace. Get personalized recommendations and study plans tailored to your needs.',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      icon: Clock,
      title: 'Study Timer',
      description: 'Built-in Pomodoro timer and study session tracking. Manage your time effectively and maintain focus during study sessions.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Track your learning progress with detailed analytics. Visualize your improvement and identify areas that need more focus.',
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Features</h1>
          <p className="text-xl text-white/90">Powerful AI tools to transform your learning experience</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who are already learning smarter with AI Study Helper.
            </p>
            <a
              href="/register"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Get Started for Free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
