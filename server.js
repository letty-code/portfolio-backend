const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch"); // npm install node-fetch@2
const app = express();
const PORT = process.env.PORT || 3000;

const DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1488539839673536584/tqQdISeLM3gBZvK5lMYhWCmhKaaR7QbKqdUIrY0vK7HNheDJ-lo61wILwU1ea_77bLd9";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, ".")));

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const discordData = {
    content: 'New Contact Message**\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}'
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordData)
    });

    res.json({ status: "success", text: "✅ Your message has been sent!" });
  } catch (err) {
    console.error("Error sending to Discord:", err);
    res.status(500).json({ status: "error", text: "❌ Failed to send message." });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
