import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/generate", async (req, res) => {
    const { briefart, angaben } = req.body;

    const prompt = `
Erstelle einen professionellen "${briefart}"-Brief basierend auf folgenden Angaben:
${angaben}

Der Brief soll klar, höflich und formal sein.
`;

    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Du bist ein KI-Briefgenerator namens Briefmeister." },
                { role: "user", content: prompt }
            ]
        });

        const result = completion.choices[0].message.content;

        res.json({ brief: result });

    } catch (error) {
        res.json({ brief: "Fehler beim Generieren 😕" });
    }
});

app.listen(3000, () => console.log("Server läuft"));
