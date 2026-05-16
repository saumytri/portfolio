// Projects data from resume
export const projects = [
  {
    id: "handwritten-digit-recognition",
    Title: "Handwritten Digit Recognition",
    Description:
      "A machine learning model for real-time digit recognition using Python. Optimized preprocessing and inference pipeline for fast and accurate predictions. Designed for real-world automation use cases including banking and logistics systems.",
    TechStack: ["Python", "Machine Learning", "NumPy", "Scikit-learn"],
    Img: "/project-digit.png",
    Link: "https://github.com/RPR143",
    Github: "https://github.com/RPR143",
  },
  {
    id: "co-exist-sustainable-platform",
    Title: "Co-Exist: Sustainable Living Platform",
    Description:
      "A full-stack web platform promoting sustainable living practices. Features user authentication, personalized dashboards, and interactive UI. Created an analytics-driven dashboard to encourage data-informed decision-making.",
    TechStack: ["React.js", "Node.js", "MongoDB", "RESTful APIs"],
    Img: "/project-coexist.png",
    Link: "https://github.com/RPR143",
    Github: "https://github.com/RPR143",
  },
];

// Certificates data from resume
const certificateFiles = Array.from({ length: 31 }, (_, i) => `certificate-${i + 1}.png`);

export const certificates = certificateFiles.map((filename, index) => ({
  id: `cert-${index}`,
  Title: `Professional Certificate ${index + 1}`,
  Issuer: "Verified Issuer",
  Img: `/certificates/${filename}`,
}));
