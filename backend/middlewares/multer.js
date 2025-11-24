import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const mime = file.mimetype;
  const isImage = mime.startsWith("image/");
  const isPdf = mime === "application/pdf";
  if (isImage || isPdf) cb(null, true);
  else cb(new Error("Unsupported file type"), false);
};

const limits = { fileSize: 10 * 1024 * 1024 };

export const singleUpload = multer({ storage, fileFilter, limits }).single(
  "file"
);

export const uploadProfileFields = multer({ storage, fileFilter, limits }).fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);
