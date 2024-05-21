const express = require("express");
const UserAuthRouter = require("./routes/UserAuthRouter");
const booksRoute = require("./routes/booksRoute");
const dbConnect = require("./lib/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
require("dotenv").config();

// Connect to the database
dbConnect();

// Routes
app.use("/user", UserAuthRouter);
app.use("/books", booksRoute);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
