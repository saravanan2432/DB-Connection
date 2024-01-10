const express = require('express')
const app = express()
const port = 6500
const bodyparser=require('body-parser')
const urlencoded=bodyparser.urlencoded({extended:false})

const { MongoClient, ServerApiVersion}=require("mongodb")
const url="mongodb+srv://user2024:i4zEATVpEPdIIcRg@cluster0.sran9qf.mongodb.net/?retryWrites=true&w=majority"

const client=new MongoClient(url,{useNewUrlparser:true,useUnifiedTopology:true,serverApi:ServerApiVersion.v1})

app.get('/', (req, res)=>{
res.sendFile(__dirname + "/index.html")
})

  //=========================ADD Users - FindOne ============================

app.post("/adduser",urlencoded,(req,response)=>{
    var username=req.body.user
    var password=req.body.psw                                     
    var mobno=parseInt(req.body.num1)                                  ////NEED CODE ALREADY EXIST-----------
  
client.connect(err=>{
    const collection=client.db("Username").collection("Password");
    collection.insertOne({Name:username,Password:password,Mobile:mobno}).then((res)=>{
        console.log("Insert Successfully")
        console.log(res)
        response.send("<h4><font color='red'><center>Insert Successfully</center><font></h4>")
    }).catch((err)=>{
        console.log("error something")
        console.log(err)
    })
})

})
  //=========================Get Users - FindOne ============================

app.post("/getuser",urlencoded,(req,response)=>{
    var getmob=parseInt(req.body.num2)
      
client.connect(err=>{
    const collection=client.db("Username").collection("Password");
    collection.findOne({Mobile:getmob}).then((res)=>{
        console.log(res)
        if(res!==null){
        response.send(res)  }    
        else{
            response.send("The following user : <font color=red>"+getmob+"</font>  is not found") 
        } 
    
    }).catch((err)=>{
        console.log(err)
           
    })
})
})

  //=========================Get Users - FindALL ============================

  app.get("/getAlluser",urlencoded,(req,response)=>{
      
client.connect(err=>{
    const collection=client.db("Username").collection("Password");
    collection.find().toArray().then((res)=>{
        console.log(res)
        response.send(res)       
    
    }).catch((err)=>{
        console.log("error something")
        console.log(err)
    })
})
})
 

//============================Update User -- ======================

app.post("/newupdateuser",urlencoded,(req,response)=>{
    var umobno=parseInt(req.body.num3)
    var uname=req.body.olduser
    var upassword=req.body.oldpsw
    
client.connect(err=>{
    const collection=client.db("Username").collection("Password");
    var change={Mobile:umobno}
    var newdata={$set:{Name:uname,Password:upassword}}
    collection.updateMany(change,newdata).then((res)=>{                     
        console.log("Updated")
        console.log(res)

     response.send("<h4><font color='red'><center>Update Successfully</center><font></h4>")
    }).catch((err)=>{
        console.log("error something")
        console.log(err)
    })
})

})


app.post("/deleteuser",urlencoded,(req,response)=>{
    var getmob=parseInt(req.body.num2)
      
client.connect(err=>{
    const collection=client.db("Username").collection("Password");
    collection.deleteOne({Mobile:getmob}).then((res)=>{
        console.log(res)
        response.send("Data is Deleted Successfully") 
        }).catch((err)=>{
        console.log(err)
           
    })
})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
