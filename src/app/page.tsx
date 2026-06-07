'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { 
  Brain, 
  MessageSquare, 
  FileText, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">AI Study Helper</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</Link>
              <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Blog</Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">About</Link>
              <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Login</Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">AI-Powered Learning Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your Learning
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                With AI Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              Experience the future of education with AI-powered study tools. Summarize documents, 
              generate quizzes, create flashcards, and get instant help from our AI assistant.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: MessageSquare,
                title: 'AI Chat Assistant',
                description: 'Get instant answers to your questions with our intelligent AI chat assistant.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: FileText,
                title: 'PDF Summarizer',
                description: 'Automatically summarize lengthy PDFs and extract key information in seconds.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: BookOpen,
                title: 'Smart Flashcards',
                description: 'Generate flashcards from any topic with spaced repetition for better retention.',
                color: 'from-pink-500 to-pink-600',
              },
            ].map((feature, index) => (
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
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Powerful AI tools designed to enhance your learning experience and boost your academic performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Get instant results with our optimized AI models. No waiting, just learning.',
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description: 'Your data is encrypted and protected. We prioritize your privacy and security.',
              },
              {
                icon: Users,
                title: 'Collaborative',
                description: 'Share notes, quizzes, and study materials with classmates and friends.',
              },
              {
                icon: Brain,
                title: 'Adaptive Learning',
                description: 'AI adapts to your learning style and pace for personalized education.',
              },
              {
                icon: CheckCircle,
                title: 'OCR Technology',
                description: 'Extract text from images and scanned documents with advanced OCR.',
              },
              {
                icon: Sparkles,
                title: 'Multi-Language',
                description: 'Support for multiple languages with accurate translation and localization.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How AI Study Helper Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started in minutes and transform your study sessions with our AI-powered tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Your Content',
                description: 'Upload PDFs, documents, or enter text that you want to study. Our AI supports multiple file formats.',
              },
              {
                step: '2',
                title: 'AI Processing',
                description: 'Our advanced AI analyzes your content, extracts key information, and generates study materials.',
              },
              {
                step: '3',
                title: 'Interactive Learning',
                description: 'Engage with quizzes, flashcards, and summaries tailored to your learning style.',
              },
              {
                step: '4',
                title: 'Track Progress',
                description: 'Monitor your learning progress and identify areas that need more focus.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Students Choose AI Study Helper
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of students who have improved their grades and study efficiency with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Save Time, Learn More
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Traditional study methods can be time-consuming and inefficient. AI Study Helper automates repetitive tasks like summarization, flashcard creation, and quiz generation, allowing you to focus on understanding and retention rather than preparation.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our AI-powered tools can process hundreds of pages of content in seconds, extracting the most important information and presenting it in an easy-to-digest format. This means you can cover more material in less time while maintaining high comprehension levels.
              </p>
              <Link href="/blog/how-ai-is-revolutionizing-study-habits">
                <Button variant="link" className="text-blue-600 dark:text-blue-400">
                  Learn how AI is transforming education <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Personalized Learning Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Every student learns differently. Our AI adapts to your individual learning style, pace, and preferences to create a truly personalized study experience. Whether you're a visual learner, prefer text-based content, or learn best through practice questions, AI Study Helper customizes its output accordingly.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Track your progress over time, identify knowledge gaps, and receive targeted recommendations for improvement. Our intelligent system learns from your interactions and continuously optimizes the learning materials to match your needs.
              </p>
              <Link href="/features">
                <Button variant="link" className="text-blue-600 dark:text-blue-400">
                  Explore all features <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real feedback from students who have transformed their learning with AI Study Helper.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                role: 'University Student',
                text: 'AI Study Helper has completely changed how I prepare for exams. The quiz generation feature is incredible - it helps me identify exactly what I need to focus on.',
              },
              {
                name: 'James K.',
                role: 'High School Senior',
                text: 'I used to spend hours making flashcards. Now I just upload my notes and get perfect flashcards instantly. My grades have improved significantly.',
              },
              {
                name: 'Emily R.',
                role: 'Graduate Student',
                text: 'The PDF summarizer saves me so much time when researching. I can quickly understand complex papers and focus on the most relevant information.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              The Future of Education is Here
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Artificial intelligence is revolutionizing education by providing personalized, efficient, and effective learning tools. AI Study Helper harnesses the power of cutting-edge AI technology to help students study smarter, not harder.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our platform combines natural language processing, machine learning, and cognitive science principles to create an intelligent study companion that adapts to your unique learning needs. Whether you're preparing for exams, writing research papers, or trying to master a new subject, AI Study Helper provides the tools and support you need to succeed.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Key features include our AI-powered document summarization that can process hundreds of pages in seconds, intelligent quiz generation that creates practice questions based on your actual study materials, and smart flashcard systems that use spaced repetition algorithms to optimize memory retention.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Privacy and security are paramount at AI Study Helper. All your data is encrypted, and we never share your personal information with third parties. Our platform is designed to be accessible to students of all backgrounds, with affordable pricing options and a commitment to making quality education tools available to everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Ready to experience the future of learning? Join thousands of students who have already transformed their academic journey with AI Study Helper. <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up today</Link> and start studying smarter.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who are already learning smarter with AI Study Helper.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
