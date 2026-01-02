"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, MoreHorizontal } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

interface WebsitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  websiteUrl: string;
  title: string;
  layoutId: string;
}

export function WebsitePreviewModal({
  isOpen,
  onClose,
  websiteUrl,
  title,
  layoutId,
}: WebsitePreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  const handleReload = useCallback(() => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      setIsLoading(true);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const displayUrl = websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-[420px] h-[85vh] max-h-[800px] bg-neutral-950 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 pointer-events-auto border border-neutral-800/50 flex flex-col"
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 32,
              }}
            >
              <div className="flex-1 relative bg-neutral-900 m-2 mt-3 rounded-t-2xl overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 z-10">
                    <span className="text-neutral-500 text-sm tracking-wide">Loading preview</span>
                  </div>
                )}
                <iframe
                  key={iframeKey}
                  src={websiteUrl}
                  title={title}
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>

              <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 m-2 mt-0 mb-3 rounded-b-2xl rounded-t-xl">
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-neutral-300 text-sm font-medium tracking-tight truncate max-w-[180px]">
                    {displayUrl}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReload}
                    className="p-2.5 hover:bg-neutral-800 rounded-full transition-colors"
                    aria-label="Reload"
                  >
                    <RotateCw className={`w-4 h-4 text-neutral-400 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={onClose}
                    className="p-2.5 hover:bg-neutral-800 rounded-full transition-colors"
                    aria-label="More options"
                  >
                    <MoreHorizontal className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
