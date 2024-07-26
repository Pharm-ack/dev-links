"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import IconArrowRight from "@/components/svg/IconArrowRight";

interface CopyLinkToClipboardProps {
  url: string;
  isShareButton?: boolean;
  platformName?: string;
  platformIcon?: React.ReactNode;
  brandColor?: string;
}

const CopyLinkToClipboard: React.FC<CopyLinkToClipboardProps> = ({
  url,
  isShareButton = false,
  platformName,
  platformIcon,
  brandColor,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!url) {
      setError("No link available to copy.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        setError("Failed to copy link. Please try again.");
        setTimeout(() => setError(null), 3000);
      });
  };

  if (isShareButton) {
    return (
      <div className="relative">
        <Button className="text-white" onClick={copyToClipboard} disabled={!url}>
          Share Link
        </Button>
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="absolute sm:w-[400px] w-[70%] text-sm sm:text-base py-4 px-4 rounded-xl bg-gray-700 text-gray-300 right-1/3 -translate-x-1/3 bottom-3 z-[9999] flex items-center justify-center gap-2"
            >
              <Image
                alt="link icon"
                height={20}
                width={20}
                src={"/assets/images/icon-link.svg"}
              />
              <span>The link has been copied to your clipboard!</span>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="absolute sm:w-[400px] w-[80%] text-sm sm:text-base py-4 px-4 rounded-xl bg-red-100 border border-red-400 text-red-700 left-1/2 -translate-x-1/2 sm:bottom-10 bottom-5 z-[9999] flex items-center justify-center gap-2"
            >
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={copyToClipboard}
        style={{ backgroundColor: brandColor }}
        className="relative flex items-center gap-2 w-full text-white fill-white rounded-md px-3 py-2"
      >
        {platformIcon}
        <span className="ml-8">{platformName}</span>
        <IconArrowRight color="fill-white ml-auto" />
      </button>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="absolute bottom-4 right-1/2 transform -translate-x-1/3 bg-gray-700 text-gray-300 py-2 px-4 rounded-md z-50"
          >
            Link copied to clipboard!
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 py-2 px-4 rounded-md z-50"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CopyLinkToClipboard;
