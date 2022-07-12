const express = require("express"); 
const https = require("https");   //to get data from api server
const bodyParser = require("body-parser"); //used to handle data from html

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/",function(req, res) {
    //console.log(req.body.city);
    const query = req.body.city;
    const appId = "5618d295167d0da154aeadad3d84c473";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+units;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn"+icon+"@2x.png"
            res.write("<h1>The temperature in " +query+ " is " +temp+ " degree celcius.</h1>");
            res.write("<h1>The weather is currently " +desc+ ".</h1>");
            res.write("<img src =" +imgURL+">");
            res.send();
        })
    });
})

app.listen(3000, function () {
    console.log("Server started at 3000 port");
});