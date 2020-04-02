const express = require("express");
const apicache = require("apicache");
const cors = require("cors");
const { httpClient } = require("./helpers");
require("dotenv/config");

const cache = apicache.middleware;
const app = express();
const port = process.env.PORT || 3000;

app.use(cache("5 minutes"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to GEOAPIY REST API!"
  });
});

app.get("/api/v1/forward-geocoding", (req, res) => {
  httpClient({
    method: "get",
    url: `/v1/geocode/search?text=${req.query.location}&apiKey=${process.env.GEOAPIFY_KEY}`
  }).then(response => {
    res.json({
      payload: response.data
    });
  });
});

app.get("/api/v1/reverse-geocoding", (req, res) => {
  httpClient({
    method: "get",
    url: `/v1/geocode/reverse?lat=${req.query.y}&lon=${req.query.x}&apiKey=${process.env.GEOAPIFY_KEY}`
  }).then(response => {
    res.json({
      payload:response.data
    });

  }).catch(function(error){
    res.json({
      payload:error
    })
  });
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
