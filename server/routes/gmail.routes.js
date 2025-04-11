const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

let tokens = null;

// STEP 1: Google Auth URL
router.get("/login", (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/gmail.readonly"],
    });
    res.redirect(authUrl);
});

// STEP 2: Google OAuth callback
router.get("/callback", async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens: t } = await oAuth2Client.getToken(code);
        tokens = t;
        res.redirect(`${process.env.LOCAL_SERVER}/emails`);
    } catch (err) {
        res.status(500).json({ message: "Auth failed", error: err.message });
    }
});

// STEP 3: Fetch Emails
router.get("/emails", async (req, res) => {
    try {
        if (!tokens) return res.status(401).json({ message: "Unauthorized" });

        oAuth2Client.setCredentials(tokens);
        const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

        const response = await gmail.users.messages.list({ userId: "me", maxResults: 5 });
        const emails = await Promise.all(response.data.messages.map(async (msg) => {
            const fullEmail = await gmail.users.messages.get({ userId: "me", id: msg.id });
            const subject = fullEmail.data.payload.headers.find(h => h.name === "Subject")?.value;
            return {
                subject: subject || "No Subject",
                snippet: fullEmail.data.snippet,
            };
        }));

        res.json(emails);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch emails", error: err.message });
    }
});

module.exports = router;



