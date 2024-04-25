const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express();
const port = 3000;
const url = 'mongodb+srv://sarasavi:sarasavi@sarasavidrivingschool.8wcadpf.mongodb.net/?retryWrites=true&w=majority';


app.use(cors());
 // cors({
 //   origin: 'http://localhost:3000',
 //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
 //   allowedHeaders: ['Content-Type'],
 // })
 // );
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

const vehicleRouter = require("./routes/vehicle.js");

app.use("/vehicle", vehicleRouter);
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const revenueRouter = require("./routes/revenue.js");

app.use("/revenue", revenueRouter);