import React from "react";

const Footer = () => {
    return (
        <footer className="mt-20 py-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    UiAnalyzer
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
