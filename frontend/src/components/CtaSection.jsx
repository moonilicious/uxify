import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Cta = () => {
    return (
        <section className="py-20">
            <motion.div
                className="max-w-4xl mx-auto text-center p-10 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold mb-4">
                    Optimize Your Website Now
                </h2>
                <p className="text-lg mb-8 text-purple-100">
                    Get a comprehensive analysis of your website and start
                    improving your online presence today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="h-12 px-8 bg-white text-purple-600 hover:bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        Start Free Analysis
                    </Button>
                    <Button
                        variant="outline"
                        className="h-12  px-8 border-white text-black hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                        Compare Reports
                    </Button>
                </div>
            </motion.div>
        </section>
    );
};

export default Cta;
