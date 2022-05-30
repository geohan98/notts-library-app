const express = require("express");

// Database
const db = require("./config/database");

// Test DB
db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Error:" + err));

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/book", require("./routes/book"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On PORT: ${PORT}`));
