const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {

  const query =   req.body.cityName
  const apiKey = "**API-KEY FROM OPEN WEATHER**"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The Weather is Currently " + weatherDescription + "</p>");
      res.write("<h1>The Temperature in " + req.body.cityName + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">")

      res.send();
    })
  })


})


app.listen(3000, function() {
  console.log("Server is Running at PORT 3000");
})
