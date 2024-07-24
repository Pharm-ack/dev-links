import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

import { useState } from "react";
import { genUploader } from "uploadthing/client";
import {
  INTERNAL_DO_NOT_USE__fatalClientError,
  UploadThingError,
} from "@uploadthing/shared";

// Define types for the options and response
interface UploadOptions {
  headers?: Record<string, string>;
  skipPolling?: boolean;
  onUploadProgress?: (progress: number) => void;
  onClientUploadComplete?: (res: any) => void;
  onUploadError?: (error: UploadThingError) => void;
  input?: any;
}

interface UploadHook {
  startUpload: (files: File[], input?: any) => Promise<any | void>;
  isUploading: boolean;
  uploadProgress: number;
}

export const createUploadThingHook = ({ url }: { url: string }) => {
  const uploadFiles = genUploader({
    url,
    package: "@uploadthing/solid",
  });

  return (endpoint: string, opts?: UploadOptions): UploadHook => {
    const [isUploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const startUpload = async (
      files: File[],
      input?: any
    ): Promise<any | void> => {
      setUploading(true);
      setUploadProgress(0);

      try {
        const res = await uploadFiles(endpoint, {
          headers: opts?.headers,
          files,
          skipPolling: opts?.skipPolling,
          onUploadProgress: ({
            progress,
          }: {
            file: string;
            progress: number;
          }) => {
            setUploadProgress(progress);
          },
        });

        opts?.onClientUploadComplete?.(res);
        return res;
      } catch (e) {
        let error: UploadThingError;
        if (e instanceof UploadThingError) {
          error = e;
        } else {
          error = INTERNAL_DO_NOT_USE__fatalClientError(e as Error);
          console.error(
            "Something went wrong. Please contact UploadThing and provide the following cause:",
            error.cause
          );
        }
        opts?.onUploadError?.(error);
        return;
      } finally {
        setUploading(false);
      }
    };

    return {
      startUpload,
      isUploading,
      uploadProgress,
    };
  };
};
