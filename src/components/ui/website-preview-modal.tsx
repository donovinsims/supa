"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface WebsitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  layoutId: string;
  website: {
    title: string;
    url: string;
    image: string;
  };
}

export function WebsitePreviewModal({
  isOpen,
  onClose,
  layoutId,
  website,
}: WebsitePreviewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleExternalLink = () => {
    window.parent.postMessage(
      { type: "OPEN_EXTERNAL_URL", data: { url: website.url } },
      "*"
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 lg:p-12 pointer-events-none">
            <motion.div
              layoutId={layoutId}
              className="w-full max-w-5xl h-[80vh] max-h-[800px] bg-[#1a1a1a] rounded-[16px] overflow-hidden flex flex-col shadow-2xl pointer-events-auto border border-white/10"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"
                    />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                </div>

                <span className="text-[13px] font-medium text-white/60 tracking-wide">
                  Preview
                </span>

                <div className="flex items-center gap-3">
                  <button className="text-white/40 hover:text-white/80 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleExternalLink}
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="px-4 py-2 bg-[#0f0f0f] border-b border-white/5">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-md max-w-md mx-auto">
                  <div className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-[8px] text-white/60">🔒</span>
                  </div>
                  <span className="text-[12px] text-white/50 truncate">
                    {website.url.replace(/^https?:\/\//, "")}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-auto bg-[#0a0a0a]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="w-full"
                >
                  <Image
                    src={website.image}
                    alt={website.title}
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
