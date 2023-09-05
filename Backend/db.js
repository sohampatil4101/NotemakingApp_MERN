const mongoose =require("mongoose")
const connectToMongo = ()=>{ mongoose.connect("mongodb://0.0.0.0:27017/notebook",{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(()=>{
    console.log("mongodb connected successfully!!!");          
})
.catch((e)=>{
    console.log("mongo Failed");
    console.log("Error is:",e, "soham");
})
}



module.exports = connectToMongo;
