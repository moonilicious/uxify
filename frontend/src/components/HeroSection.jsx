import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function HeroSection({ url, setUrl, handleSubmit, isAnalyzing }) {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.2),transparent_40%)]"></div>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="rgba(147, 51, 234, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500 dark:from-purple-500 dark:to-purple-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Analyze Your Website with AI-Powered Insights
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Get comprehensive analysis and actionable recommendations to improve
          your website's performance, SEO, and user experience.
        </motion.p>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-grow">
              <Input
                type="url"
                placeholder="Enter your website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 pl-4 pr-12 text-lg rounded-lg border-2 border-purple-200 focus:border-purple-500 dark:border-gray-700 dark:focus:border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)] dark:shadow-[0_0_15px_rgba(168,85,247,0.1)] dark:text-white"
              />
              <Globe className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button
              type="submit"
              className="h-14 px-8 text-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze My Website
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </motion.div>

        <motion.div
          className="mt-8 text-sm text-gray-500 dark:text-gray-400 flex justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span>No credit card required</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>Free analysis for any website</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>Almost Instant results</span>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
