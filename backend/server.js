const express = require("express");
const cors = require("cors");
const contactRoute = require("./api/contact");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;