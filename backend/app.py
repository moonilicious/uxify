from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from bs4 import BeautifulSoup
import validators
import subprocess
import json
from pymongo import MongoClient
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import shap
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB setup
MONGO_URI = "mongodb+srv://cadeshine:evangelineisclumsy@uxify.2cg30h6.mongodb.net/?retryWrites=true&w=majority&appName=uxify"
client = MongoClient(MONGO_URI)
db = client["auth_db"]
users = db["users"]
lighthouse_cache = db["lighthouse_cache"]

# ---------------------- USER AUTH ROUTES ----------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data.get("email") or not data.get("password") or not data.get("name"):
        return jsonify({"error": "Missing fields"}), 400

    if users.find_one({"email": data["email"]}):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = generate_password_hash(data["password"])

    result = users.insert_one({
        "name": data["name"],
        "email": data["email"],
        "password": hashed_password
    })

    # Include user details in the response
    return jsonify({
        "message": "User registered successfully",
        "user": {
            "name": data["name"],
            "email": data["email"]
        }
    }), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = users.find_one({"email": data["email"]})

    if user and check_password_hash(user["password"], data["password"]):
        # Include user details in the response
        return jsonify({
            "message": "Login successful",
            "user": {
                "name": user["name"],
                "email": user["email"]
            }
        }), 200
    return jsonify({"error": "Invalid credentials"}), 401

# ---------------------- WEBSITE ANALYSIS ----------------------

def analyze_website(url):
    recommendations = {}

    if not validators.url(url):
        return {"error": "Invalid URL. Please enter a valid website."}

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print("Request error:", e)
        return {"error": "Failed to fetch website. Ensure the URL is accessible."}

    soup = BeautifulSoup(response.text, "html.parser")

    # Mobile-Friendly Check
    viewport = soup.find("meta", attrs={"name": "viewport"})
    recommendations["mobile_friendly"] = "Yes" if viewport else "No"

    # Lighthouse Performance Analysis with MongoDB Caching
    lighthouse_data = None
    cache_entry = lighthouse_cache.find_one({"url": url})
    if cache_entry and "data" in cache_entry and cache_entry["timestamp"] > datetime.utcnow() - timedelta(hours=6):
        lighthouse_data = cache_entry["data"]
        print("Using cached Lighthouse data.")
    else:
        try:
            lighthouse_cmd = ["npx", "lighthouse", url, "--quiet", "--output=json", "--chrome-flags=--headless"]
            result = subprocess.run(lighthouse_cmd, capture_output=True, text=True, encoding="utf-8", shell=True)
            if result.returncode == 0 and result.stdout:
                lighthouse_data = json.loads(result.stdout)
                lighthouse_cache.update_one(
                    {"url": url},
                    {"$set": {"data": lighthouse_data, "timestamp": datetime.utcnow()}},
                    upsert=True
                )
            else:
                print("Lighthouse error:", result.stderr)
        except Exception as e:
            print("Exception in Lighthouse analysis:", e)

    if lighthouse_data:
        recommendations["performance_score"] = round(lighthouse_data["categories"]["performance"]["score"] * 100) if lighthouse_data["categories"]["performance"]["score"] else 0
        recommendations["seo_score"] = round(lighthouse_data.get("categories", {}).get("seo", {}).get("score", 0) * 100)
        recommendations["accessibility_score"] = round(lighthouse_data.get("categories", {}).get("accessibility", {}).get("score", 0) * 100)
    else:
        recommendations["performance_score"] = "Error fetching Lighthouse report"

    # Accessibility - Image alt text
    images = soup.find_all("img")
    missing_alt = [img for img in images if not img.get("alt")]
    recommendations["accessibility"] = f"{len(missing_alt)} images missing alt text." if missing_alt else "All images have alt text."

    # Navigation
    nav = soup.find("nav")
    recommendations["navigation"] = "Present" if nav else "Missing"

    # Meta Description
    meta_desc = soup.find("meta", attrs={"name": "description"})
    recommendations["content_clarity"] = meta_desc.get("content", "Missing meta description") if meta_desc else "Missing meta description"

    # HTTPS
    recommendations["security"] = "HTTPS" if url.startswith("https://") else "Not Secure (HTTP)"

    # Interactive Elements
    buttons = soup.find_all("button")
    recommendations["interactive_elements"] = f"{len(buttons)} buttons found." if buttons else "No buttons found."

    recommendations["forms_present"] = "Yes" if soup.find("form") else "No"
    recommendations["total_headings"] = len(soup.find_all(["h1", "h2", "h3"]))
    recommendations["semantic_tags"] = "Yes" if soup.find("section") or soup.find("article") else "No"
    recommendations["external_scripts"] = len([s for s in soup.find_all("script") if s.get("src")])
    recommendations["uses_inline_styles"] = "Yes" if soup.find(style=True) else "No"

    # --- Dynamic Suggestions ---
    dynamic_suggestions = []

    if recommendations["mobile_friendly"] == "No":
        dynamic_suggestions.append("Add a viewport meta tag to ensure mobile responsiveness.")
    if isinstance(recommendations["performance_score"], int) and recommendations["performance_score"] < 60:
        dynamic_suggestions.append("Improve loading time, optimize images, and minimize render-blocking resources.")
    if isinstance(recommendations.get("seo_score"), int) and recommendations["seo_score"] < 70:
        dynamic_suggestions.append("Improve meta tags, headings, and use descriptive alt text for better SEO.")
    if isinstance(recommendations.get("accessibility_score"), int) and recommendations["accessibility_score"] < 70:
        dynamic_suggestions.append("Enhance accessibility by adding ARIA labels, improving contrast, and alt texts.")
    if "images missing alt text" in recommendations["accessibility"]:
        dynamic_suggestions.append("Add alt text to all images for better accessibility.")
    if recommendations["navigation"] == "Missing":
        dynamic_suggestions.append("Ensure that the navigation bar is included for easy website navigation.")
    if "Missing meta description" in recommendations["content_clarity"]:
        dynamic_suggestions.append("Add a descriptive meta description to improve SEO and user experience.")
    if recommendations["security"] == "Not Secure (HTTP)":
        dynamic_suggestions.append("Switch to HTTPS to ensure secure connections.")
    if recommendations["interactive_elements"] == "No buttons found.":
        dynamic_suggestions.append("Consider adding interactive buttons or CTAs to improve UX.")
    if recommendations["forms_present"] == "No":
        dynamic_suggestions.append("Consider adding forms to engage users (e.g., for contact or subscriptions).")
    if recommendations["semantic_tags"] == "No":
        dynamic_suggestions.append("Use semantic HTML tags (e.g., <section>, <article>) for better structure and accessibility.")
    if recommendations["external_scripts"] == 0:
        dynamic_suggestions.append("Consider using external scripts for better performance and maintenance.")
    if recommendations["uses_inline_styles"] == "Yes":
        dynamic_suggestions.append("Move inline styles to an external stylesheet for better maintainability.")

    recommendations["dynamic_suggestions"] = dynamic_suggestions

    return recommendations

def build_feature_vector_from_analysis(analysis):
    return pd.DataFrame([{
        "Mobile Responsiveness": 1 if analysis["mobile_friendly"] == "Yes" else 0,
        "Search Functionality": 1 if "search" in analysis.get("navigation", "").lower() else 0,
        "Animation and Transitions": 1 if int(analysis["performance_score"]) > 70 else 0,
        "Visual Hierarchy": 1,  # Stub (until automated)
        "Gestures and Touch Controls": 1,  # Stub
        "Typography": 1,  # Stub
        "Accessibility": int(analysis["accessibility_score"]),
        "Layout": 1 if analysis["navigation"] == "Present" else 0,
        "CTA (Call to Action) Buttons": 1 if "button" in analysis["interactive_elements"].lower() else 0,
        "Loading Speed": int(analysis["performance_score"]),
        "Social_Media_Integration": 0,  # Stub
        "Scrolling_Behavior": 1,  # Stub
        "Personalization": 0,  # Stub
        "Feedback and Error Messages": 0,  # Stub
        "Forms and Input Fields": 0,  # Stub
        "Images and Multimedia": 1,  # Stub
        "Color Scheme": 1,  # Stub
    }])

def analyze_with_kmeans_and_shap(real_analysis):
    df = pd.read_csv("dataset.csv")
    X = df.select_dtypes(include='number')

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    kmeans = KMeans(n_clusters=3, random_state=42)
    kmeans.fit(X_scaled)

    # Convert analysis result to vector
    user_vector = build_feature_vector_from_analysis(real_analysis)
    # Align with dataset columns
    user_vector = user_vector[X.columns]
    user_scaled = scaler.transform(user_vector)

    label = int(kmeans.predict(user_scaled)[0])

    explainer = shap.KernelExplainer(kmeans.predict, X_scaled)
    shap_values = explainer.shap_values(user_scaled, nsamples=100)

    shap.summary_plot(shap_values, user_vector, plot_type="bar", show=False)
    buf = BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    shap_img = base64.b64encode(buf.read()).decode('utf-8')
    plt.close()

    suggestions = {
        0: "Improve layout and speed for a better experience.",
        1: "Focus on SEO, accessibility, and responsiveness.",
        2: "Your UX is strong. Keep improving with more features."
    }

    return {
        "cluster_label": label,
        "shap_image": shap_img,
        "suggestion": suggestions.get(label, "Keep improving user experience.")
    }

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    result = analyze_website(url)
    cluster_result = analyze_with_kmeans_and_shap(result)
    result.update(cluster_result)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
