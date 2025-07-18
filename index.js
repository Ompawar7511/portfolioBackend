const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const app = express();
app.use(cors({
  origin:
    "https://portfolio-frontend-zviu.onrender.com/send-email",
  methods:['GET','POST'],
  credentials:true
}
  ));
app.use(express.json());
const emailId=process.env.EMAIL_USER;
const pass=process.env.EMAIL_PASS;

// 🔐 Setup Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailId,        // ✅ Your Gmail
    pass: pass,           // ✅ Use Gmail App Password
  },
});

// 📬 POST route to send email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name , !email , !message) {
    return res.status(400).send({ error: "All fields are required" });
  }

  const mailOptions = {
    from: "dreamdev87@gmail.com",
    to: "dreamdev87@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    text: `You have a new contact form submission:\n\n +
          Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).send({ error: "Failed to send email" });
  }
});

// ▶️ Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
