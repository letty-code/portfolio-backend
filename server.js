// server.js

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, ".")));

// API endpoint للـ Contact Form
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // عرض البيانات في الـ terminal / console
  console.log("New contact message:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // الرد على العميل
  res.json({ status: "success", text: "✅ Your message has been sent!" });
  
});

// Start the server
app.listen(port,"0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});