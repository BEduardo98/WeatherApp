const express = require("express");
const app = express();
const weatherRoutes = require("./routes/weatherRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandlingMiddleware = require("../backend/middleware/errorHnandlingMiddleware");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/weather", weatherRoutes);

app.use(errorHandlingMiddleware);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
