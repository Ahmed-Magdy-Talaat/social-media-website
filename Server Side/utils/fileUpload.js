import multer from "multer";
export const fileUpload = () => {
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid format. only images are allowed", { cause: 400 }));
    }
  };
  return multer({ storage: multer.diskStorage({}), fileFilter });
};
