const ex = require("express");
const app = ex();
require("dotenv").config();
const mongoose = require("mongoose");
app.use(ex.json());
const userApp = require("./routes/userRoute");
// cors
const cors = require("cors");
app.use(cors());
// body parser
app.use(ex.urlencoded({ extended: true }));

const workoutRoutes = require("./routes/workoutRoutes");
// cookie parser

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("DB CONNECcted");

    app.listen(process.env.PORTNO, () => {
      console.log(`Server is running on port ${process.env.PORTNO}` );
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.use("/user", userApp);
app.use("/workouts", workoutRoutes);

