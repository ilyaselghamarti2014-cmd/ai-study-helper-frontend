import { Metadata } from 'next';
import Link from 'next/link';
import { Brain, Target, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - AI Study Helper',
  description: 'Learn about AI Study Helper - your AI-powered learning companion. Discover our mission, team, and commitment to transforming education through artificial intelligence.',
  alternates: {
    canonical: 'https://ai-study-helper-frontend-zeta.vercel.app/about',
  },
  openGraph: {
    title: 'About Us - AI Study Helper',
    description: 'Learn about AI Study Helper - your AI-powered learning companion.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - AI Study Helper',
    description: 'Learn about AI Study Helper - your AI-powered learning companion.',
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
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Founded in 2024, we are a team of educators, AI researchers, and technologists passionate about transforming how students learn and succeed in their academic journeys. We understand the challenges students face in today's fast-paced educational environment, and we built AI Study Helper to address these challenges head-on.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our platform is designed to help students of all ages and backgrounds achieve their academic goals. Whether you are a high school student preparing for college entrance exams, a university student managing multiple courses, or a lifelong learner seeking to acquire new skills, AI Study Helper provides the tools and support you need to succeed.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            AI Study Helper was born from a simple observation: students today have access to more information than ever before, yet they struggle more than ever to effectively learn and retain that information. The traditional one-size-fits-all approach to education does not work for everyone, and many students lack the personalized support they need to thrive.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Our founders, having experienced these challenges firsthand, set out to create a solution. They combined their expertise in artificial intelligence, educational psychology, and software development to build a platform that adapts to each student's unique learning style and needs.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Today, AI Study Helper serves thousands of students worldwide, helping them study smarter, not harder. We continue to innovate and improve our platform based on feedback from our users and the latest advances in AI technology.
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
                We believe quality education should be accessible to everyone, regardless of their background or financial situation. Our platform offers a free tier with essential features, and we keep our premium plans affordable for students.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy & Security</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We take data privacy seriously. Your information is encrypted and protected, and we never sell your data to third parties. Read our <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link> to learn more about how we protect your data.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We continuously improve our platform with the latest AI advancements to provide the best learning experience possible. Our team stays at the forefront of educational technology to ensure our users have access to cutting-edge tools.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Student Success</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our ultimate goal is to help students achieve their academic goals and develop lifelong learning skills. We measure our success by the success of our students, and we are committed to supporting them every step of the way.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Integrity</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We believe in ethical AI use and academic honesty. Our tools are designed to support learning, not to enable cheating or academic dishonesty. We encourage students to use our platform responsibly and in accordance with their institution's academic integrity policies.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Team</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            AI Study Helper is built by a diverse team of professionals passionate about education and technology. Our team includes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Researchers</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Experts in machine learning and natural language processing who develop and optimize our AI models to provide accurate and helpful educational assistance.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Educational Specialists</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Former teachers and professors who understand pedagogy and ensure our tools align with proven learning principles and educational best practices.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Software Engineers</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Skilled developers who build and maintain our platform, ensuring it is fast, reliable, and user-friendly across all devices.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customer Support</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Dedicated support staff who assist users with questions, technical issues, and feedback to ensure everyone has a positive experience with our platform.
              </p>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Commitment to You</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            We are committed to continuously improving AI Study Helper based on your feedback and the evolving needs of students. We listen to our users and regularly update our platform with new features and improvements.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            We believe in transparency and open communication. If you have questions, suggestions, or concerns, we encourage you to reach out to us through our <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact page</Link>. Your feedback helps us build a better product for everyone.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Thank you for choosing AI Study Helper as your learning companion. We are honored to be part of your educational journey, and we look forward to helping you achieve your academic goals.
          </p>
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
