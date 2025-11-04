import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from 'axios';
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import certificateRoute from "./routes/certificate.route.js";

dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials:true
}));
 
// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/certificate", certificateRoute);
 
app.post("/chat", async (req, res) => {
  try {
      const { message } = req.body;

      const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
          {
              contents: [{ parts: [{ text: message }] }]
          }
      );

      const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      res.json({ reply: botReply });
  } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to get response from Gemini API." });
  }
});

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})

