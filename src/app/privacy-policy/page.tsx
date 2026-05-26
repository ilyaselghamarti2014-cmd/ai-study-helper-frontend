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
              This website uses cookies and third-party services like Google AdSense to display ads and improve user experience.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We may collect limited data such as cookies and usage information for advertising purposes.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              You can disable cookies in your browser settings.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions, contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
