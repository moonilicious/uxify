import { useState, useEffect } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import Dashboard from "./components/dashboard";
import HeroSection from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorks";
import Features from "./components/FeaturesSection";
import Cta from "./components/CtaSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Reports from "./components/ReportDashboard";


export default function App() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [darkMode, setDarkMode] = useState("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme || savedTheme === "system") {
        setDarkMode(e.matches);
      }
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    if (!url.startsWith("http")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/analyze", { url });
      console.log("API Response:", response.data); // Debugging
      setAnalysisResults(response.data);
      setShowReport(true);
    } catch (err) {
      console.error("Error fetching analysis:", err);
      setError("Error analyzing website");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        darkMode ? "dark bg-gray-900" : "bg-white"
      )}
    >
      <div className="container mx-auto px-4 py-8">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/"
            element={
              !showReport ? (
                <>
                  <HeroSection
                    url={url}
                    setUrl={setUrl}
                    handleSubmit={handleSubmit}
                    isAnalyzing={isAnalyzing}
                  />
                  <HowItWorksSection />
                  <Features />
                  <Cta />
                </>
              ) : (
                <Reports url={url} setShowReport={setShowReport} analysisResults={analysisResults} />
              )
            }
          />
        </Routes>

        {window.location.pathname === "/" && <Footer />}
      </div>
    </div>
  );
}
