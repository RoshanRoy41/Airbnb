const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "..")));

// Replace these values with your Mailtrap SMTP credentials
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "add6e02a680ce3",
    pass: "868ffaf2c84c1b",
  },
});

app.post("/submit-report", async (req, res) => {
  const { reason, details } = req.body;

  const mailOptions = {
    from: "your_email@gmail.com",
    to: "raadarsh3@gmail.com", // Replace with your email address
    subject: "Reported Listing Issue",
    text: `Reason: ${reason}\nDetails: ${details}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    // Redirect to homepage.html after successful report submission
    res.redirect("/homepage.html");
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Error submitting report" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
