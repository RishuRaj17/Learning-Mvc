const express = require("express");
const empRouter = require("./routes/routing")
const app = express();
const {connectMongoDb} = require("./connection");

const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/rishu")
.then(console.log("Database Connected!"))
.catch((err)=>console.log("Error Occured!: ",err));

app.use(express.urlencoded({extended:false}));
app.use("/api/emp", empRouter);

app.listen(PORT,()=>console.log("Server Created!"));