//api key
const myKey = "23c557af9d805288d5a0b1fceda6f258";

const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require("node:https");

app.set("view engine", "ejs");
//app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function kToC(k) {
  return (k - 273.15).toFixed(2);
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:id", (req, res) => {
  let { id } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${myKey}`;
  console.log(req.params);
  //get request made by node.js
  https
    .get(url, (response) => {
      console.log("statusCode:", response.statusCode);
      console.log("headers:", response.headers);

      response.on("data", (d) => {
        let djs = JSON.parse(d);
        console.log("djs", djs);
        let temp = kToC(djs.main.temp);
        res.render("weather.ejs", { djs, temp });
      });
    })
    .on("error", (e) => {
      console.error(e);
    });
});

app.post("/:id", (req, res) => {
  console.log(req.body);
  let id = req.body;
  res.redirect(`/${id}`);
});

app.listen(3005, () => {
  console.log("server is running on port 3005");
});
