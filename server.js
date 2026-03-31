// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch"); // تأكدي من تثبيتها: npm install node-fetch@2

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, ".")));

// API endpoint للـ Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("New contact message:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  // مثال: إرسال إلى Discord webhook (اختياري)
  // const webhookURL = "ضع رابط Webhook هنا";
  // try {
  //   await fetch(webhookURL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       content: `New contact message:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
  //     })
  //   });
  // } catch (err) {
  //   console.error("Failed to send Discord webhook:", err);
  // }

  res.json({ status: "success", text: "✅ Your message has been sent!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});