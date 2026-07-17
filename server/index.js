const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js");
const eventRoutes = require("./routes/events.js");
const bookingRoutes = require("./routes/booking.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(cors());
// app.request('/api/bookings', require('./routes/booking'));

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
 }).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
