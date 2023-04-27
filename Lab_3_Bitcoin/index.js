const express = require("express");
const app = express();
console.log(process.env);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => console.log(`This is for Bitcoin at port ${port}`));
