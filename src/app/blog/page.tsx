import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - AI Study Helper',
  description: 'Read the latest articles about AI-powered learning, study tips, and educational technology from AI Study Helper.',
  alternates: {
    canonical: 'https://ai-study-helper-frontend-zeta.vercel.app/blog',
  },
  openGraph: {
    title: 'Blog - AI Study Helper',
    description: 'Read the latest articles about AI-powered learning and study tips.',
    type: 'website',
  },
};

const blogPosts = [
  {
    slug: 'how-ai-is-revolutionizing-study-habits',
    title: 'How AI is Revolutionizing Study Habits in 2024',
    excerpt: 'Discover how artificial intelligence is transforming the way students learn, study, and retain information in the modern educational landscape.',
    date: '2024-05-15',
    readTime: '5 min read',
    category: 'AI & Education',
  },
  {
    slug: 'effective-flashcard-techniques',
    title: '10 Effective Flashcard Techniques for Better Retention',
    excerpt: 'Learn proven strategies to maximize your flashcard study sessions and improve long-term memory retention using spaced repetition.',
    date: '2024-05-10',
    readTime: '7 min read',
    category: 'Study Tips',
  },
  {
    slug: 'summarizing-complex-academic-papers',
    title: 'How to Summarize Complex Academic Papers Efficiently',
    excerpt: 'Master the art of summarizing lengthy research papers and academic documents with AI-powered tools and proven techniques.',
    date: '2024-05-05',
    readTime: '6 min read',
    category: 'Research Skills',
  },
  {
    slug: 'collaborative-learning-digital-age',
    title: 'The Power of Collaborative Learning in the Digital Age',
    excerpt: 'Explore how digital tools and platforms are enabling students to collaborate more effectively and learn from each other.',
    date: '2024-04-28',
    readTime: '5 min read',
    category: 'Collaboration',
  },
  {
    slug: 'ai-quiz-generation-study-prep',
    title: 'Using AI Quiz Generation for Effective Exam Preparation',
    excerpt: 'Learn how AI-generated quizzes can help you prepare for exams more effectively by identifying knowledge gaps and reinforcing learning.',
    date: '2024-04-20',
    readTime: '8 min read',
    category: 'Exam Prep',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-xl text-white/90">Insights, tips, and resources for smarter learning</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
