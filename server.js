const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios"); // تأكدي من وجود هذه السطر

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, ".")));

app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    const webhookURL = "https://discordapp.com/api/webhooks/1488539839673536584/tqQdISeLM3gBZvK5lMYhWCmhKaaR7QbKqdUIrY0vK7HNheDJ-lo61wILwU1ea_77bLd9";

    try {
        await axios.post(webhookURL, {
            content: `🔔 **رسالة جديدة!**\n**الاسم:** ${name}\n**الإيميل:** ${email}\n**الرسالة:** ${message}`
        });
        console.log("✅ تمت العملية بنجاح");
        res.json({ status: "success" });
    } catch (err) {
        console.error("❌ فشل الإرسال:", err.message);
        res.status(500).json({ status: "error" });
    }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${port}`);
});