const express = require("express");
const mongoose = require("mongoose");
const courseRouter = require("./routes/courseRouter");

const app = express();
app.use(express.json());
const uri = "mongodb+srv://markedward2005_db_user:Mark2005@cluster0.n9g9tql.mongodb.net/?appName=Cluster0";

const databaseConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successful Connection to MongoDB");
  } catch (error) {
    console.log("Connection failed:", error);
  }
};

databaseConnect();

app.use("/courses", courseRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});