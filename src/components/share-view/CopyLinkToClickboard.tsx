"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CopyLinkToClipboard: React.FC<{
  domain?: string;
}> = ({ domain }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = () => {
    if (!domain) {
      setError("No link available to copy.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    navigator.clipboard
      .writeText(domain)
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

  return (
    <div className="relative">
      <Button onClick={copyToClipboard} disabled={!domain}>
        Share Link
      </Button>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="absolute sm:w-[400px] w-[80%] text-sm sm:text-base py-4 px-4 rounded-xl bg-darkgrey text-lightgrey left-1/2 -translate-x-1/2 bottom-10 z-[9999] flex items-center justify-center gap-2"
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
};

export default CopyLinkToClipboard;
