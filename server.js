const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, ".")));

// API endpoint لـ Contact Form
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    const webhookURL = "https://discordapp.com/api/webhooks/1488539839673536584/tqQdISeLM3gBZvK5lMYhWCmhKaaR7QbKqdUIrY0vK7HNheDJ-lo61wILwU1ea_77bLd9";

    const discordPayload = {
        content: `🔔 **رسالة جديدة من المحفظة!**\n**الاسم:** ${name}\n**الإيميل:** ${email}\n**الرسالة:** ${message}`
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordPayload)
        });

        if (response.ok) {
            console.log(`✅ Message from ${name} sent to Discord.`);
            res.json({ status: "success" });
        } else {
            throw new Error("Discord Webhook failed");
        }
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ status: "error", message: "Failed to send message" });
    }
});

// Start the server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
});