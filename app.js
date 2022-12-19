//api key
const myKey = "23c557af9d805288d5a0b1fceda6f258";

const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require("node:https");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", (req, res) => {
  let { city } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
  console.log(req.params);
  //get request made by node.js
  https
    .get(url, (response) => {
      console.log("statusCode:", response.statusCode);
      console.log("headers:", response.headers);

      response.on("data", (d) => {
        let djs = JSON.parse(d);
        console.log("djs", djs);
        res.render("weather.ejs", { djs });
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
