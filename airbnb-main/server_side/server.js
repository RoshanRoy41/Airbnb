const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs").promises; // Using promises for fs

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());
// Add this middleware to parse JSON data in the request body
app.use(express.json());

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Serve test.json
app.get("/api", async (req, res) => {
  try {
    const data = await fs.readFile("test.json", "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (err) {
    console.error("Error reading test.json:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Handle POST requests to /api
app.post("/api", upload.array("image", 5), async (req, res) => {
  try {
    // Extract data from the request
    const data = req.body;
    const files = req.files;

    // Read existing data from test.json
    const existingData = await fs.readFile("test.json", "utf8");
    const existingJsonData = JSON.parse(existingData);

    // Create a new array to store the updated data
    const updatedData = [];

    // Iterate over each uploaded image and create a new object
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Construct URLs for the uploaded images
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        file.filename
      }`;

      // Combine data with image URL and unique ID
      const newData = { ...data, id: 100 + i, download_url: imageUrl };

      // Add the new object to the updated data array
      updatedData.push(newData);
    }

    // Combine the existing data with the updated data
    const combinedData = [...existingJsonData, ...updatedData];

    // Write the combined data back to test.json
    await fs.writeFile("test.json", JSON.stringify(combinedData, null, 2));

    // Send the response
    res.json(updatedData);
  } catch (err) {
    console.error("Error handling POST request:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
