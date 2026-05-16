import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ];

  useEffect(() => {
    let currentScroll = 0;
    let requestId;

    const handleScroll = () => {
      const newScroll = window.pageYOffset;
      currentScroll = newScroll;

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        const initialPos = initialPositions[index];
        const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340;
        const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40;
        const x = initialPos.x + xOffset;
        const y = initialPos.y + yOffset;
        blob.style.transform = `translate(${x}px, ${y}px)`;
        blob.style.transition = "transform 1.4s ease-out";
      });

      requestId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0">
        {/* Blob 1 — Sky Blue */}
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-sky-500 rounded-full mix-blend-screen filter blur-[128px] opacity-30 md:opacity-15"
        />
        {/* Blob 2 — Cyan */}
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[128px] opacity-30 md:opacity-15 hidden sm:block"
        />
        {/* Blob 3 — Teal/Blue */}
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[128px] opacity-25 md:opacity-10"
        />
        {/* Blob 4 — Sky */}
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-sky-400 rounded-full mix-blend-screen filter blur-[128px] opacity-15 md:opacity-8 hidden sm:block"
        />
      </div>
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e908_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e908_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
};

export default AnimatedBackground;
