const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://kuzhanthai:admin@cluster0.osfcd.mongodb.net/complaint")
.then(()=>{
   console.log("connected to mongodb")
})