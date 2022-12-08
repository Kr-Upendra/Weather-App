const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const api_key = process.env.API_KEY;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=Allahabad&appid=${api_key}&units=metric`;
  https.get(url, (response) => {
    response.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      const cloudPercentage = data.clouds.all;
      res.render("home", {
        title: "Get Weather Of Your City",
        weatherData: data,
        percentage: cloudPercentage,
      });
    });
  });
});

app.post("/", (req, res) => {
  const location = req.body.location;
  if (location === "") {
    res.render("error");
  } else {
    const api_key = process.env.API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;
    https.get(url, (response) => {
      response.on("data", (chunk) => {
        const data = JSON.parse(chunk);
        const statusCode = data.cod;
        const cloudPercentage = data.clouds.all;
        if (statusCode != 200) {
          res.render("error", {
            title: "Get Weather Of Your City",
          });
        } else {
          res.render("home", {
            title: "Get Weather Of Your City",
            weatherData: data,
            percentage: cloudPercentage,
          });
        }
      });
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
