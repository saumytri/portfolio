import React, { useState } from "react";
import {
  Modal,
  IconButton,
  Box,
  Backdrop,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Certificate = ({ ImgSertif, title, issuer }) => {
  const [open, setOpen] = useState(false);

  // Fallback card when no image is provided
  const hasFallback = !ImgSertif || ImgSertif.includes("cert-python") || ImgSertif.includes("cert-google") || ImgSertif.includes("cert-training");

  const FallbackCard = () => (
    <div
      className="w-full h-[240px] rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 flex flex-col gap-3 cursor-pointer hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1 group"
      onClick={() => setOpen(true)}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform duration-300">
        <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm leading-tight">{title || "Certificate"}</h3>
        <p className="text-gray-400 text-xs mt-1">{issuer || "Professional Certification"}</p>
      </div>
      <div className="mt-auto pt-2 border-t border-white/5">
        <span className="text-xs text-sky-400 font-medium flex items-center gap-1">
          <FullscreenIcon sx={{ fontSize: 14 }} />
          View Details
        </span>
      </div>
    </div>
  );

  if (hasFallback) {
    return (
      <>
        <FallbackCard />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 300, sx: { backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(5px)" } }}
          sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              position: "relative",
              maxWidth: "500px",
              width: "90%",
              bgcolor: "rgba(2, 12, 20, 0.95)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
              borderRadius: 3,
              p: 4,
              outline: "none",
            }}
          >
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", right: 12, top: 12, color: "white" }}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <Box sx={{ width: 56, height: 56, borderRadius: 2, background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(6,182,212,0.2))", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(14,165,233,0.3)" }}>
                <svg style={{ width: 28, height: 28, color: "#38bdf8" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Box>
              <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
                {title || "Certificate"}
              </Typography>
              <Typography sx={{ color: "#94a3b8", fontSize: 14 }}>
                Issued by: <span style={{ color: "#38bdf8" }}>{issuer || "Certification Authority"}</span>
              </Typography>
              <Typography sx={{ color: "#64748b", fontSize: 12, mt: 1 }}>
                This certificate verifies professional competency in the subject area.
              </Typography>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <Box component="div" sx={{ width: "100%" }}>
      {/* Thumbnail Container */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          height: "240px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
            "& .overlay": { opacity: 1 },
            "& .hover-content": { transform: "translate(-50%, -50%)", opacity: 1 },
            "& .certificate-image": { filter: "contrast(1.05) brightness(1) saturate(1.1)" },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0,0,0,0.1)",
              zIndex: 1,
            },
          }}
        >
          <img
            className="certificate-image"
            src={ImgSertif}
            alt={title || "Certificate"}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
              transition: "filter 0.3s ease",
            }}
            onClick={() => setOpen(true)}
          />
        </Box>

        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            opacity: 0,
            transition: "all 0.3s ease",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={() => setOpen(true)}
        >
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              opacity: 0,
              transition: "all 0.4s ease",
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            <FullscreenIcon sx={{ fontSize: 40, mb: 1, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }} />
            <Typography variant="h6" sx={{ fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
              View Certificate
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="certificate-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300, sx: { backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(5px)" } }}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: 0, padding: 0 }}
      >
        <Box sx={{ position: "relative", width: "auto", maxWidth: "90vw", maxHeight: "90vh", m: 0, p: 0, outline: "none" }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 16, top: 16, color: "white", zIndex: 1, padding: 1, "&:hover": { transform: "scale(1.1)" } }}
            size="large"
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>
          <img
            src={ImgSertif}
            alt={title ? `${title} Certificate Full View` : "Certificate Full View"}
            style={{ display: "block", maxWidth: "100%", maxHeight: "90vh", margin: "0 auto", objectFit: "contain" }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;
