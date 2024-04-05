const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");

// Montage routes
app.use("/api", apiRoutes);
app.use("/user", userRoutes);
