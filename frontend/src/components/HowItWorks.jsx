import { motion } from "framer-motion";
import { Globe, Lightbulb, Search } from "lucide-react";

export function HowItWorksSection() {
    const steps = [
        {
            icon: <Globe className="h-10 w-10 text-purple-600" />,
            title: "Enter Your Website URL",
            description:
                "Simply paste your website address into our analyzer tool.",
        },
        {
            icon: <Search className="h-10 w-10 text-purple-600" />,
            title: "Get In-Depth Analysis",
            description:
                "Our AI scans your website and generates a comprehensive report.",
        },
        {
            icon: <Lightbulb className="h-10 w-10 text-purple-600" />,
            title: "Improve with AI Insights",
            description:
                "Receive actionable recommendations to enhance your website.",
        },
    ];

    return (
        <section className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500 dark:from-purple-500 dark:to-purple-300">
                    How It Works
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Our powerful website analysis tool provides you with
                    actionable insights in just three simple steps.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-4 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
