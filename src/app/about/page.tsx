import { Metadata } from 'next';
import { Brain, Target, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - AI Study Helper',
  description: 'Learn about AI Study Helper - your AI-powered learning companion. Discover our mission, team, and commitment to transforming education through artificial intelligence.',
  openGraph: {
    title: 'About Us - AI Study Helper',
    description: 'Learn about AI Study Helper - your AI-powered learning companion.',
    type: 'website',
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About AI Study Helper</h1>
          <p className="text-xl text-white/90">Empowering students with AI-powered learning tools</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            At AI Study Helper, we believe that every student deserves access to personalized, intelligent learning tools. Our mission is to democratize education by harnessing the power of artificial intelligence to make learning more effective, efficient, and enjoyable for everyone.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Founded in 2024, we're a team of educators, AI researchers, and technologists passionate about transforming how students learn and succeed in their academic journeys.
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <Brain className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Learning</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our advanced AI models help students summarize documents, generate quizzes, create flashcards, and get instant answers to their questions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <Target className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personalized Experience</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We adapt to each student's learning style and pace, providing customized study plans and recommendations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <Users className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Collaborative Learning</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Students can share notes, quizzes, and study materials with classmates, fostering a collaborative learning environment.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Gamification</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We make learning fun with achievements, progress tracking, and rewards to keep students motivated.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Accessibility</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We believe quality education should be accessible to everyone, regardless of their background or financial situation.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy & Security</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We take data privacy seriously. Your information is encrypted and protected, and we never sell your data to third parties.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We continuously improve our platform with the latest AI advancements to provide the best learning experience possible.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Student Success</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our ultimate goal is to help students achieve their academic goals and develop lifelong learning skills.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-white/90 mb-6">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
}
