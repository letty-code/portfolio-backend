// server.js
import express from "express"; // استخدمي ES Module
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// خدمة الملفات الثابتة (HTML, CSS, JS, Images)
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
app.use(express.static(path.join(__dirname, ".")));

// API Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("New contact message:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // مثال لإرسال Webhook Discord (اختياري لاحقًا)
  /*
  try {
    await fetch("DISCORD_WEBHOOK_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: New message from ${name} (${email}):\n${message},
      }),
    });
  } catch (err) {
    console.error("Discord webhook error:", err);
  }
  */

  res.json({ status: "success", text: "✅ Your message has been sent!" });
});

// تشغيل السيرفر
app.listen(PORT, () => console.log(Server running on port ${PORT}));