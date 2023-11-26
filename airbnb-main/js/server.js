const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe");
const result = require('dotenv').config();
if (result.error) {
  console.error("Error loading .env file:", result.error);
}

const stripeApiKey = 'sk_test_51NBah3SCiitsZmnXPxDqZvEFVupZe8OsEoc1ApdLNeQF0BWN7yIzkITnZNdqINNY7kEDypwcm2Sq24bGaroya5ak00p6Mywvpu';


// Initialize the Stripe module with your private key
const stripeInstance = stripe(stripeApiKey);

if (!stripeApiKey) {
    
    console.log(stripeApiKey);
    console.log("Environment variables:", process.env);
  console.error("Please provide a valid Stripe API key.");
  process.exit(1);
}

const stripeClient = stripe(stripeApiKey);

app.use(express.json());
app.use(cors());



app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.dates.map((date) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${date.checkinDate}  to  ${date.checkoutDate}`,
            },
            unit_amount: 500, // Set to 0 to indicate no specific price
          },
          quantity:1 ,
        };
      }),
      success_url: "http://127.0.0.1:5501/confirmation_page.html",
      cancel_url: "http://127.0.0.1:5501/client/cancel.html",
    });

    console.log("Session created:", session);
    res.json({ url: session.url });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
