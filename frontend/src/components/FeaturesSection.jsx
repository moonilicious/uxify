import { motion } from "framer-motion";
import { ExternalLink, LineChart, Search, Settings } from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: <LineChart className="h-6 w-6 text-purple-600" />,
            title: "Performance Analysis",
            description:
                "Measure page load speed, server response time, and overall performance metrics.",
        },
        {
            icon: <Search className="h-6 w-6 text-purple-600" />,
            title: "SEO Audit",
            description:
                "Identify SEO issues and get recommendations to improve your search engine rankings.",
        },
        {
            icon: <Settings className="h-6 w-6 text-purple-600" />,
            title: "Technical Audit",
            description:
                "Detect technical issues that might be affecting your website's performance.",
        },
        {
            icon: <ExternalLink className="h-6 w-6 text-purple-600" />,
            title: "Link Analysis",
            description:
                "Analyze internal and external links to improve your website's structure.",
        },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl my-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500 dark:from-purple-500 dark:to-purple-300">
                        Comprehensive Website Analysis
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Our tool provides detailed insights into every aspect of
                        your website.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-4 p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 inline-block">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
