//connections
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

//mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Log Mongo Queries
mongoose.set("debug", true);

//port
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
