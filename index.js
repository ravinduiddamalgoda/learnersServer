const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express();
const port = 3000;
const url = 'mongodb+srv://sarasavi:sarasavi@sarasavidrivingschool.8wcadpf.mongodb.net/?retryWrites=true&w=majority';

//socket.io server packages
const http = require('http').createServer(app);
const { Server } = require('socket.io');

const QuizRoute = require("./src/routes/Quiz.route");
const userRouter = require("./src/routes/User.route");
const chatRouter = require("./src/routes/Chat.route");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function connectDB(url , connectionParams){
    
  await mongoose.connect(url , connectionParams);
  
  // console.log("DB Connected");
}

connectDB(url , {}).then(()=>{

  console.log("Database Connected");
  app.listen(port , ()=>{
      console.log("Listening on port 3000");
  });
}).catch((err)=>{
  console.error('Connection Error',err);
})

app.use("/quiz", QuizRoute);
app.use("/login", userRouter);
app.use("/chat", chatRouter)


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

