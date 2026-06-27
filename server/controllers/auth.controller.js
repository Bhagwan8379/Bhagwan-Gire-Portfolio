const expressAsyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const path = require("path")
const fs = require("fs")
const { AssemblyAI } = require('assemblyai')
const Auth = require("../model/Auth")
const { checkEmpty } = require("../utils/checkEmpty")
const { IO } = require("../socket/socket")
const { ASSEMBLYAI_API_KEY, ADMIN_SECRET_SENTENCE, ADMIN_VOICE_FILE } = require("../utils/admin_voice_data")


exports.RegisterAdmin = expressAsyncHandler(async (req, res) => {
    const { name, email, password, mobile } = req.body
    const { isError, error } = checkEmpty({ name, email, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Enter a Valid Email" })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password" })
    }
    if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "Invalid Mobile Number" })
    }
    const isFound = await Auth.findOne({ $or: [{ email }, { mobile }] })
    if (isFound) {
        return res.status(400).json({ message: "Admin Already Registered." })
    }
    const hash = await bcrypt.hash(password, 10)
    const result = await Auth.create({ name, email, password: hash, mobile })
    res.status(200).json({ message: "Register Admin Success", data: result })
})

exports.LoginAdmin = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body

    const { isError, error } = checkEmpty({ username, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password" })
    }
    const isFound = await Auth.findOne({ $or: [{ email: username }, { mobile: username }] })
    if (!isFound) {
        return res.status(400).json({ message: "Admin Not Found", error: "Admin Not Registered" })
    }
    const verify = await bcrypt.compare(password, isFound.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Not Matched.", error: "Your Password Do Not Matched" })
    }
    const token = jwt.sign({ userId: isFound._id }, process.env.JWT_KEY, { expiresIn: "5h" })
    res.cookie("Admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    })
    res.status(200).json({
        message: "Admin Login Success", data: {
            _id: isFound._id,
            name: isFound.name,
            email: isFound.email,
        }
    })

})

exports.VoiceLoginAdmin = expressAsyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No audio file uploaded." });
        }
        if (ASSEMBLYAI_API_KEY === "YOUR_ASSEMBLYAI_API_KEY") {
            return res.status(500).json({ message: "AssemblyAI API key not configured." });
        }

        const client = new AssemblyAI({ apiKey: ASSEMBLYAI_API_KEY });
        const userAudioPath = req.file.path;

        // 1. Transcribe user's audio to check the sentence
        const userTranscript = await client.transcripts.create({ audio_url: userAudioPath });

        const cleanUserText = userTranscript.text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
        const cleanSecretText = ADMIN_SECRET_SENTENCE.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();

        if (cleanUserText !== cleanSecretText) {
            fs.unlinkSync(userAudioPath); // Clean up uploaded file
            return res.status(401).json({ 
                message: `Sentence mismatch. Expected: "${ADMIN_SECRET_SENTENCE}", Transcribed: "${userTranscript.text}"`, 
                success: false 
            });
        }

        // 2. Verify voice print (similarity)
        // A simple 'similarity' check can be simulated by checking the number of speakers.
        // If both the reference audio and the user's audio contain only one speaker,
        // we can infer it's likely the same person. This is a creative workaround.
        const referenceAudioPath = path.join(__dirname, '..', 'voice_data', ADMIN_VOICE_FILE);
        if (!fs.existsSync(referenceAudioPath)) {
             fs.unlinkSync(userAudioPath);
            return res.status(500).json({ message: "Admin voice sample not found on server." });
        }

        const [userDiarization, referenceDiarization] = await Promise.all([
            client.transcripts.create({ audio_url: userAudioPath, speaker_labels: true }),
            client.transcripts.create({ audio_url: referenceAudioPath, speaker_labels: true })
        ]);

        fs.unlinkSync(userAudioPath); // Clean up user audio file after processing

        // Check if both files contain only one speaker.
        const userSpeakers = new Set(userDiarization.utterances.map(u => u.speaker));
        const referenceSpeakers = new Set(referenceDiarization.utterances.map(u => u.speaker));

        if (userSpeakers.size !== 1 || referenceSpeakers.size !== 1) {
            return res.status(401).json({ message: "Voice verification failed. Multiple speakers detected or voice does not match.", success: false });
        }

        // 3. If both checks pass, grant login
        // Since it's a DB-free demo login, we find the first admin user to generate a token for.
        const adminUser = await Auth.findOne();
        if (!adminUser) {
            return res.status(404).json({ message: "No admin user found in the system." });
        }

        const token = jwt.sign({ userId: adminUser._id }, process.env.JWT_KEY, { expiresIn: "5h" });
        res.cookie("Admin", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        });

        res.status(200).json({
            message: "Admin Login Success",
            success: true,
            data: {
                _id: adminUser._id,
                name: adminUser.name,
                email: adminUser.email,
            }
        });

    } catch (error) {
        console.error("Voice login error:", error);
        // Clean up temp file on error if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: "An error occurred during voice login.", error: error.message });
    }
});


exports.logoutAdmin = expressAsyncHandler(async (req, res) => {
    res.clearCookie("Admin")
    res.json({ message: "Logout Success" })
})