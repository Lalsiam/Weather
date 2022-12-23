const express = require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
var port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.listen(port || process.env.PORT,()=>
{
    console.log("Server is running on port: "+ port)
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.post('/',(req,res)=>{
    const query=req.body.cityname;
    const apikey="cf34dd97651ffbf9a30e5b822c9620d8";
    const unit = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+apikey+"&units="+unit;
    https.get(url,(response)=>{
        console.log(response.statusCode)
        response.on('data',(data1)=>{
            const json=JSON.parse(data1);
            const temp=json.main.temp;
            const descrip =json.weather[0].description;
            const icon=json.weather[0].icon;
            var image="https://openweathermap.org/img/wn/"+icon+"@2x.png";
             res.write("<h1>The temperature in "+query +" is: "+ String(temp)+"</h1>")
            res.write("<h2>The weather is: " + descrip+"</h2><br>")
            res.write("<img src ="+image+">");
            console.log(descrip)
            res.send()
    })
})
})

