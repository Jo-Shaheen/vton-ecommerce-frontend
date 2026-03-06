/* ─────────────────────────────────────────────
   AINAI – Image Compression Utility
   Compress user-uploaded photos before VTON processing
───────────────────────────────────────────── */

import imageCompression from "browser-image-compression";

const DEFAULT_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1024,
  useWebWorker: true,
};

export async function compressImage(file, options = {}) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const compressed = await imageCompression(file, mergedOptions);
  return compressed;
}

export function createPreviewUrl(file) {
  return URL.createObjectURL(file);
}

export function revokePreviewUrl(url) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}
