

const express = require('express');

const app = express();

app.get("/", async (requestAnimationFrame, res) => {
    res.render("index.ejs");
});




app.listen(3000, () => {
  console.log('Listening on port 3000');
});
