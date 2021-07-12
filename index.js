const express = require("express");
const request = require("request-promise");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());

const generateUrl = apiKey => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.get("/", (req, res) => {
  res.send("Welcome to Amazon web scraper api");
});

app.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  const {apiKey} = req.query

  // query amazon website
  try {
    const response = await request(
      `${generateUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.get("/product/:productId/reviews", async (req, res) => {
    const { productId } = req.params;
    const {apiKey} = req.query

    // query amazon website
    try {
      const response = await request(
        `${generateUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`
      );
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  });

  app.get("/product/:productId/offers", async (req, res) => {
    const { productId } = req.params;
    const {apiKey} = req.query

    // query amazon website
    try {
      const response = await request(
        `${generateUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`
      );
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  });

  app.get("/search/:search", async (req, res) => {
    const { search } = req.params;
    const {apiKey} = req.query
  
    // query amazon website
    try {
      const response = await request(
        `${generateUrl(apiKey)}&url=https://www.amazon.com/s?k=${search}`
      );
      res.json(JSON.parse(response));
    } catch (error) {
      res.json(error);
    }
  });

app.listen(port, () => console.log(`server running on ${port}`));
