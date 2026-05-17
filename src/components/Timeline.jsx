import React, { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

// Experience data - Saumy Tripathi - Reverse Chronological Order
const experienceData = [
  {
    id: "01",
    year: "Aug 2024 – May 2025",
    duration: "9 mos",
    title: "Machine Learning Engineer",
    institution: "VendorsKart Pvt. Ltd.",
    description:
      "Built scalable data preprocessing pipelines using Python, Pandas, and SQL for automated product handling. Designed and deployed real-time ML prediction APIs using FastAPI with optimized service latency. Collaborated with cross-functional teams to integrate ML models into production systems. Improved model performance by tuning hyperparameters and feature engineering techniques.",
  },
];

// Education data - Saumy Tripathi - Reverse Chronological Order
const educationData = [
  {
    id: "01",
    year: "July 2025 – Present",
    duration: "Ongoing",
    title: "M.Tech in Artificial Intelligence",
    institution: "NIT Agartala, Tripura",
    description:
      "Pursuing a Master of Technology in Artificial Intelligence, deepening expertise in advanced ML algorithms, deep learning, and AI systems engineering.",
  },
  {
    id: "02",
    year: "July 2020 – July 2024",
    duration: "4 yrs",
    title: "B.Tech in Computer Science & Engineering",
    institution: "United College of Engineering and Management, Prayagraj",
    description:
      "Built a strong foundation in data structures, algorithms, software engineering, and object-oriented programming. Graduated with hands-on project experience in ML and web development.",
  },
  {
    id: "03",
    year: "April 2019 – April 2020",
    duration: "1 yr",
    title: "Intermediate (NIOS)",
    institution: "Shree Mahaprabhu Public School",
    description: "Completed Intermediate with focus on science and mathematics.",
  },
  {
    id: "04",
    year: "April 2017 – April 2018",
    duration: "1 yr",
    title: "High School (CBSE)",
    institution: "Shree Mahaprabhu Public School",
    description: "Completed secondary education with a strong academic foundation in CBSE curriculum.",
  },
];

const TimelineNode = ({ item, index, isVisible, theme }) => {
  const isPurple = theme === "purple";
  const colorText = isPurple ? "text-violet-400" : "text-fuchsia-400";
  const colorBg = isPurple ? "bg-violet-500" : "bg-fuchsia-500";
  const colorBorder = isPurple ? "border-violet-400/30" : "border-fuchsia-400/30";
  const colorGlow = isPurple
    ? "shadow-[0_0_15px_rgba(139,92,246,0.8)]"
    : "shadow-[0_0_15px_rgba(217,70,239,0.8)]";
  const badgeColors = isPurple
    ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
    : "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20";
  const gradientBg = isPurple ? "from-violet-500/5 to-transparent" : "from-fuchsia-500/5 to-transparent";

  return (
    <div
      className={`relative flex items-start w-full transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Node Number Label */}
      <div
        className={`absolute left-0 w-[40px] text-center font-bold text-sm md:text-base transition-colors duration-500 ${
          isVisible ? colorText : "text-slate-700"
        }`}
      >
        {item.id}
      </div>

      {/* Timeline Orb */}
      <div className="absolute left-[32px] mt-1.5 flex items-center justify-center">
        <div
          className={`w-4 h-4 rounded-full z-10 transition-all duration-500 flex items-center justify-center ${
            isVisible
              ? `bg-gradient-to-br from-white to-transparent ${colorGlow}`
              : "bg-slate-800 border border-slate-600"
          }`}
        >
          {isVisible && (
            <div className={`w-2 h-2 ${colorBg} rounded-full animate-pulse`} />
          )}
        </div>
        {/* Outer glowing ring */}
        {isVisible && (
          <div className={`absolute w-8 h-8 rounded-full border ${colorBorder} animate-[ping_3s_ease-in-out_infinite] z-0`} />
        )}
      </div>

      {/* Content Card */}
      <div className="ml-[70px] flex-1 pb-10 pr-2">
        <div
          className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
            isVisible ? "shadow-[0_0_20px_rgba(0,0,0,0.2)]" : "shadow-none"
          }`}
        >
          {/* Card subtle glow background */}
          {isVisible && (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientBg} rounded-2xl pointer-events-none`} />
          )}

          {/* Category Badge & Year */}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs md:text-sm">
            <span className={`px-3 py-1 rounded-full font-semibold uppercase tracking-wider border ${badgeColors}`}>
              {item.year}
            </span>
            {item.duration && (
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                {item.duration}
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
            {item.title}
          </h3>
          <h4 className={`text-sm md:text-base font-medium mb-3 ${colorText}`}>
            {item.institution}
          </h4>
          <p className="text-slate-300/80 leading-relaxed text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const TimelineColumn = ({ title, data, icon: Icon, theme }) => {
  const containerRef = useRef(null);
  const [visibleNodes, setVisibleNodes] = useState(new Set());
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));
            setVisibleNodes((prev) => new Set(prev).add(index));
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const nodes = containerRef.current.querySelectorAll(".timeline-node-container");
    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        setLineHeight(100);
        return;
      }

      const scrollFraction = scrollTop / maxScroll;
      const startPercentage = (clientHeight * 0.5 / scrollHeight) * 100;
      const percentage = startPercentage + scrollFraction * (100 - startPercentage);

      setLineHeight(percentage);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const isPurple = theme === "purple";
  const gradientLine = isPurple ? "from-violet-400 via-purple-400" : "from-fuchsia-400 via-pink-400";
  const iconColor = isPurple ? "text-violet-400" : "text-fuchsia-400";

  return (
    <div className="flex flex-col h-[600px] w-full">
      {/* Column Header */}
      <div className={`flex items-center gap-3 mb-6 sticky top-0 bg-[#07050f]/90 backdrop-blur-md z-20 py-4 px-2`}>
        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>

      {/* Scrollable Timeline Area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto pr-2 sm:pr-4 custom-scrollbar relative"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="relative min-h-full pb-8">
          {/* Background line */}
          <div className="absolute left-[40px] top-2 bottom-2 w-0.5 bg-slate-800/50" />

          {/* Animated colored line */}
          <div
            className={`absolute left-[40px] top-2 w-0.5 transition-all duration-300 ease-out z-0 bg-gradient-to-b ${gradientLine} to-transparent`}
            style={{ height: `${lineHeight}%` }}
          />

          {/* Nodes */}
          <div className="relative z-10 pt-2">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="timeline-node-container"
                data-index={index}
              >
                <TimelineNode
                  item={item}
                  index={index}
                  isVisible={visibleNodes.has(index)}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  return (
    <section className="relative py-20 bg-[#07050f] overflow-hidden min-h-screen" id="Experience">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-fuchsia-500/5 rounded-full blur-[100px] top-1/4 -left-20" />
        <div className="absolute w-96 h-96 bg-violet-500/5 rounded-full blur-[100px] bottom-1/4 -right-20" />
      </div>

      <div className="container mx-auto px-[5%] relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] inline-block mb-4">
            Professional Journey
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            A comprehensive track record of my academic milestones and professional experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 w-full max-w-7xl mx-auto">
          {/* Left Column: Education */}
          <TimelineColumn
            title="My Education"
            data={educationData}
            icon={GraduationCap}
            theme="fuchsia"
          />

          {/* Right Column: Experience */}
          <TimelineColumn
            title="My Experience"
            data={experienceData}
            icon={Briefcase}
            theme="purple"
          />
        </div>
      </div>
    </section>
  );
};

export default Timeline;
