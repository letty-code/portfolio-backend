const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// جعل السيرفر يخدم ملفات HTML, CSS, JS
app.use(express.static(path.join(__dirname, ".")));

// API endpoint للـ Contact Form
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("New contact message:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  res.json({ status: "success", text: "✅ Your message has been sent!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));