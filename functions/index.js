const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
// Initialize Stripe with the secret key from environment config
const stripe = require("stripe")(functions.config().stripe.secret);
const nodemailer = require("nodemailer");

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  // Wrap the logic in cors to allow requests from your frontend
  return cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const { bookingId, amount, name, email } = req.body;

      // Create the Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Hotel Booking",
                description: `Booking for ${name}`,
              },
              unit_amount: Math.round(amount * 100), // Convert dollars to cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        // Replace with your actual deployed frontend URL or localhost for testing
        success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5173/",
        client_reference_id: bookingId,
        customer_email: email,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });
});

exports.sendBookingConfirmation = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap, context) => {
    const booking = snap.data();

    // Configure email transporter
    // Use functions.config() to store sensitive credentials in production
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: functions.config().gmail?.email || "your-email@gmail.com",
        pass: functions.config().gmail?.password || "your-app-password",
      },
    });

    const mailOptions = {
      from: '"The Ashbourne" <noreply@ashbourne.com>',
      to: booking.email,
      subject: "Booking Request Received - The Ashbourne",
      html: `
        <div style="font-family: serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4a0404;">The Ashbourne</h1>
          <p>Dear ${booking.name},</p>
          <p>Thank you for your booking request. We are currently processing your reservation for the <strong>${booking.floor}</strong>.</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <p><strong>Check-in:</strong> ${booking.checkin}</p>
            <p><strong>Check-out:</strong> ${booking.checkout}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            <p><strong>Total Price:</strong> $${booking.pricing.totalPrice}</p>
          </div>

          <p>We will notify you once your booking is fully confirmed.</p>
          <p>Warm regards,<br/>The Ashbourne Team</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent to", booking.email);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });
