import multer from "multer"
import path from "path"
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const publicPath = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }
    cb(null, publicPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({
    storage: storage
})

export {upload};