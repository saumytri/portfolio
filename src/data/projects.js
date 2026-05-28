// Projects data from Saumy Tripathi's resume
export const projects = [
  {
    id: "bike-accessories-recommendation",
    Title: "Intelligent Bike Accessories Recommendation System",
    Description:
      "Developed a content-based recommendation engine for personalized accessory suggestions based on bike specifications. Optimized ML inference pipeline with FastAPI integration for real-time predictions across product catalog. Implemented scalable architecture supporting concurrent user sessions with automated data workflows.",
    TechStack: ["Python", "FastAPI", "Machine Learning", "Pandas", "SQL"],
    Img: "project-digit.png",
    Link: "https://github.com/saumytri",
    Github: "https://github.com/saumytri",
  },
  {
    id: "handwritten-digit-recognition",
    Title: "Handwritten Digit Recognition",
    Description:
      "Built a machine learning model for real-time digit recognition using Python. Optimized preprocessing and inference pipeline for fast and accurate predictions. Designed for real-world automation use cases including banking and logistics systems.",
    TechStack: ["Python", "Machine Learning", "NumPy", "Scikit-learn"],
    Img: "project-digit.png",
    Link: "https://github.com/saumytri",
    Github: "https://github.com/saumytri",
  },
  {
    id: "co-exist-sustainable-platform",
    Title: "Co-Exist: Sustainable Living Platform",
    Description:
      "Developed a full-stack web platform promoting sustainable living practices. Implemented user authentication, personalized dashboards, and interactive UI features. Created an analytics-driven dashboard to encourage data-informed decision-making.",
    TechStack: ["React.js", "Node.js", "MongoDB", "RESTful APIs"],
    Img: "project-coexist.png",
    Link: "https://github.com/saumytri",
    Github: "https://github.com/saumytri",
  },
];

// Certificates data
const certificateFiles = Array.from({ length: 16 }, (_, i) => `c${i + 1}.png`);

export const certificates = certificateFiles.map((filename, index) => ({
  id: `cert-${index}`,
  Title: `Professional Certificate ${index + 1}`,
  Issuer: "Verified Issuer",
  Img: `certificates/${filename}`,
}));
