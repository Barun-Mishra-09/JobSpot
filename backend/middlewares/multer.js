import multer from "multer";

const storage = multer.memoryStorage();

// ✅ Change "file" → "profilePhoto"
export const singleUpload = multer({ storage }).single("profilePhoto");

export const multiUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);
