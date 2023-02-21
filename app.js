
const express= require("express");
const app=express();
const https= require("https");
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    var query= req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=12bc2e125ad7208430940c21630a4afd";   
    https.get(url,function(response){
      response.on("data",function(data){
        const weatherdata=JSON.parse(data)
        const temp= weatherdata.main.temp
        const weatherdesc= weatherdata.weather[0].description
        const icon=weatherdata.weather[0].icon
        const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<p>weather description of  " +query+ "  is  "+weatherdesc+"</p>");
        res.write("<h1>The temp in  "+query+ "  is "+temp+" degree celcius</h1> "); 
        res.write("<img src="+ imgURL +">");
        res.send();
      })
  })
})

 
app.listen(3000,function(){
    console.log("server is active on port 3000");
})