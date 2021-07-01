const express = require ("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,{
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true
  })
  .then(console.log("Connected to mongodb"))
  .catch((err)=> console.log(err));
app.get("/",(req,res)=>{
  res.send("Welcome to JETPACK Blog");
})

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

let port = process.env.PORT || 5000;
app.listen(port,()=>{
  console.log("Backend Data server running")
})

