import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, Github: GithubLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available yet.");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available.");
    }
  };

  return (
    <div className="group relative w-full h-full flex">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-sky-500/20 hover:border-sky-500/20 w-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-cyan-500/5 to-teal-500/5 opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10 flex flex-col flex-grow">
          {/* Project Image */}
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={Img}
              alt={Title}
              className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="mt-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-sky-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent mb-3">
              {Title}
            </h3>

            <p className="text-gray-200/80 text-sm leading-relaxed line-clamp-3 flex-grow">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between gap-2 flex-wrap mt-auto">
              {/* GitHub Link */}
              {GithubLink ? (
                <a
                  href={GithubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/5 text-gray-200 hover:text-white transition-all duration-200 hover:scale-105 text-sm border border-white/10 hover:border-white/20"
                >
                  <Github className="w-4 h-4" />
                  <span className="font-medium">GitHub</span>
                </a>
              ) : (
                <span className="text-gray-400 text-sm">No Repo</span>
              )}

              {/* Live Demo */}
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-sky-400 hover:text-sky-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-400 text-sm">Demo Unavailable</span>
              )}

              {/* Details */}
              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500/10 to-cyan-500/10 hover:from-sky-500/20 hover:to-cyan-500/20 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500/50 border border-sky-500/20 hover:border-sky-500/40"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="absolute inset-0 border border-white/0 group-hover:border-sky-500/30 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;