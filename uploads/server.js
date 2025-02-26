const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Upload Image Route
app.post("/api/upload", upload.single("image"), (req, res) => {
  res.json({ success: true, imageUrl: `/uploads/${req.file.filename}` });
});
