import { Button } from "@/components/ui/button";
import Score from "./ScoreCard";

const Reports = ({ url, setShowReport, analysisResults }) => {
  if (!analysisResults) return <p className="text-center text-lg text-gray-700 dark:text-gray-300">Loading...</p>;

  return (
    <div className="py-6 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => setShowReport(false)}
        className="mb-4 text-gray-800 dark:text-white hover:text-blue-500 transition-all"
      >
        ← Back to Home
      </Button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 text-center md:text-left">
        Website Analysis Report
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center md:text-left mb-6">{url}</p>

      {/* Score Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Score title="Performance Score" score={analysisResults.performance_score} description="Performance Analysis" color="green" />
        <Score title="SEO Score" score={analysisResults.seo_score} description="SEO Analysis" color="amber" />
        <Score title="Accessibility Score" score={analysisResults.accessibility_score} description="Accessibility Insights" color="blue" />
      </div>

      {/* Additional Insights Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Additional Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
          <p className="text-gray-700 dark:text-gray-300"><strong>Mobile-Friendly:</strong> {analysisResults.mobile_friendly}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Security:</strong> {analysisResults.security}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Navigation:</strong> {analysisResults.navigation}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Interactive Elements:</strong> {analysisResults.interactive_elements}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Broken Links:</strong> {analysisResults.broken_links?.length || 0} detected</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Forms Present:</strong> {analysisResults.forms_present}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Total Headings:</strong> {analysisResults.total_headings}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Semantic Tags Present:</strong> {analysisResults.semantic_tags}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>External Scripts Present:</strong> {analysisResults.external_scripts}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Inline Styles:</strong> {analysisResults.uses_inline_styles}</p>
        </div>
      </div>

      {analysisResults.dynamic_suggestions?.length > 0 && (
        <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Suggestions</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {analysisResults.dynamic_suggestions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">AI Insights</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <strong>Suggestion:</strong> {analysisResults.suggestion}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          These features had the biggest influence on how your site was evaluated.
        </p>
        <img
          src={`data:image/png;base64,${analysisResults.shap_image}`}
          alt="SHAP Explanation"
          className="rounded-lg max-w-full max-h-120 object-contain border"
        />
      </div>

    </div>
  );
};

export default Reports;
